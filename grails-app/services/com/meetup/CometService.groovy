package com.meetup

import javax.annotation.Resource
import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.atomic.AtomicInteger

class CometService extends AbstractService {

	class Comet {

		AtomicInteger count

		long timestamp

	}

	private Map<String, Comet> requestMap = new ConcurrentHashMap<String, Comet>()

	private Map<String, Object> responseMap = new ConcurrentHashMap<String, Object>()

	@Resource
	def tokenService

	@Resource
	def apnsService

	public void init() {
		long offlineTime = Eval.me(this.grailsApplication.config.
				app.comet.offline.time)
		new Timer(true).schedule(new TimerTask() {
			public void run() {
				requestMap.each { k, v ->
					if (v?.count.intValue() <= 0 && System.currentTimeMillis()
							- v?.timestamp > offlineTime) {
						requestMap.remove(k)
//						responseMap.remove(k)
					}
				}
			}
		}, 0, offlineTime)
	}

	private _generateKey(userId, ua) {
		return userId + "_" + ua
	}

	def addRequest(userId, ua) {
		String key = this._generateKey(userId, ua)
		Comet comet = this.requestMap.get(key)
		if (comet) {
			comet.count.incrementAndGet()
			comet.timestamp = System.currentTimeMillis()
		} else {
			this.requestMap.put(key, new Comet(count: new AtomicInteger(1),
					timestamp: System.currentTimeMillis()))
		}
	}

	def removeRequest(userId, ua) {
		String key = this._generateKey(userId, ua)
		Comet comet = this.requestMap.get(key)
		if (!comet) {
			return
		}
		if (comet.count.decrementAndGet().intValue() <= 0) {
			this.responseMap.remove(key)
			comet.timestamp = System.currentTimeMillis()
		}
	}

	def addResponse(userId, ua, response) {
		def uas = ua == Const.USER_AGENT_PC ? [ua] : (ua == Const.USER_AGENT_MOBILE ?
			[Const.USER_AGENT_IOS, Const.USER_AGENT_ANDROID] : null)
		uas?.each {
			String key = this._generateKey(userId, it)
			if (this.requestMap.containsKey(key)) {
				this.responseMap.put(key, response)
				if (it != Const.USER_AGENT_PC) {
					def types = it == Const.USER_AGENT_IOS ?
						[Const.TOKEN_APNS, Const.TOKEN_APNS_ENT] :
						(it == Const.USER_AGENT_ANDROID ?
							[Const.TOKEN_GCM] : [0])
					def tokens = this.tokenService.listTokens({
						user {
							eq("id", userId)
						}
						inList("type", types)
					}, 0, 1, "createTime", "desc")
					if (tokens?.size() > 0) {
						this.apnsService.push(tokens[0].secret,
								tokens[0].type, response)
					}
				}
			}
		}
	}

	def getResponse(userId, ua) {
		String key = this._generateKey(userId, ua)
		Comet comet = this.requestMap.get(key)
		if (!comet || comet.count.intValue() <= 0) {
			return null
		}
		return this.responseMap.get(key)
	}

}
