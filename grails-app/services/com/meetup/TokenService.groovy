package com.meetup

import org.apache.commons.lang.StringUtils
import org.springframework.transaction.annotation.Transactional

import javax.annotation.Resource

class TokenService extends AbstractService {

	@Resource
	def shortLinkService

	private long expireTime = 0L

	public void init() {
		this.expireTime = this.grailsApplication.config.
				app.token.expireTime.toInteger() * Const.TIME_HOUR
	}

	@Transactional(readOnly = true)
	def listTokens(callable, offset = null, limit = null,
				   sort = null, order = null) {
		def args = this._criteriaArgs(offset, limit,
				sort ? sort : "createTime", order ? order : "asc")
		return Token.createCriteria().list(args, callable)
	}

	@Transactional
	def saveToken(token) {
		token.save()
	}

	@Transactional(readOnly = true)
	def getToken(secret) {
		return Token.createCriteria().get {
			eq("secret", secret)
			gt("createTime", System.currentTimeMillis() - this.expireTime)
		}
	}

	private _deleteShortLink(token) {
		if (token.type != Const.TOKEN_INVITE) {
			return
		}
		String url = AppUtil.buildInviteUrl(token.secret)
		this.shortLinkService.deleteBySkeleton(url)
	}

	@Transactional
	def deleteToken(secret) {
		if (StringUtils.isBlank(secret)) {
			return null
		}
		Token token = Token.findBySecret(secret)
		if (!token) {
			return null
		}
		this._deleteShortLink(token)
		token.delete()
		return token
	}

	@Transactional
	def deleteTokens(userId, type) {
		this.listTokens({
			user {
				eq("id", userId)
			}
			eq("type", type)
		})?.each { token ->
			this._deleteShortLink(token)
			token.delete()
		}
	}

	def deleteTokens() {
		this.listTokens({
			lt("createTime", System.currentTimeMillis() - this.expireTime)
			ne("type", Const.TOKEN_APNS)
			ne("type", Const.TOKEN_APNS_ENT)
			ne("type", Const.TOKEN_GCM)
		})?.each { token ->
			Token.withTransaction { status ->
				try {
					if (!token.isAttached()) {
						token.attach()
					}
					this._deleteShortLink(token)
					token.delete()
				} catch (Exception ex) {
					ex.printStackTrace()
					status.setRollbackOnly()
				}
			}
		}
	}

}
