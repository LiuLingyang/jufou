package com.meetup
import grails.converters.JSON
import org.codehaus.groovy.grails.web.json.JSONObject
import org.springframework.transaction.annotation.Transactional

class BindingService extends AbstractService {

	class Share {

		String key

		String secret

		String redirect

		String access

		String revoke

		String share

		int length

	}

	private Share sina = null

	private Share tencent = null

	private Share renren = null

	private String accessTokenParams = null

	private String refreshTokenParams = null

	private String revokeTokenParams = null

	public void init() {
		this.accessTokenParams = this.grailsApplication.config.app.binding.token.access.params
		this.refreshTokenParams = this.grailsApplication.config.app.binding.token.refresh.params
		this.revokeTokenParams = this.grailsApplication.config.app.binding.token.revoke.params

		String sinaUrl = this.grailsApplication.config.app.binding.sina.url
		this.sina = new Share(key: this.grailsApplication.config.app.binding.sina.app.key,
				secret: this.grailsApplication.config.app.binding.sina.app.secret,
				redirect: this.grailsApplication.config.app.binding.sina.app.redirect,
				access: String.format(this.grailsApplication.config.
						app.binding.sina.token.access, sinaUrl),
				revoke: String.format(this.grailsApplication.config.
						app.binding.sina.token.revoke, sinaUrl),
				share: String.format(this.grailsApplication.config.
						app.binding.sina.share.url, sinaUrl) + this.grailsApplication.config.
						app.binding.sina.share.params,
				length: this.grailsApplication.config.
						app.binding.sina.share.length.toInteger())

		this.tencent = new Share(key: this.grailsApplication.config.app.binding.tencent.app.key,
				secret: this.grailsApplication.config.app.binding.tencent.app.secret,
				redirect: this.grailsApplication.config.app.binding.tencent.app.redirect,
				access: String.format(this.grailsApplication.config.app.binding.tencent.token.access,
						this.grailsApplication.config.app.binding.tencent.url))

		String renrenUrl = this.grailsApplication.config.app.binding.renren.url
		this.renren = new Share(key: this.grailsApplication.config.app.binding.renren.app.key,
				secret: this.grailsApplication.config.app.binding.renren.app.secret,
				redirect: this.grailsApplication.config.app.binding.renren.app.redirect,
				access: String.format(this.grailsApplication.config.
						app.binding.renren.token.access, renrenUrl),
				share: String.format(this.grailsApplication.config.
						app.binding.renren.share.url, renrenUrl) + this.grailsApplication.config.
						app.binding.renren.share.params,
				length: this.grailsApplication.config.
						app.binding.renren.share.length.toInteger())
	}

	@Transactional
	def saveBinding(binding) {
		binding.save()
	}

	@Transactional(readOnly = true)
	def getBinding(account, type) {
		return Binding.findByAccountAndType(account, type)
	}

	@Transactional(readOnly = true)
	def getBindingByOpenId(openId, type, account = null) {
		if (account) {
			return Binding.findByAccountAndOpenIdAndType(account, openId, type)
		} else {
			return Binding.findByOpenIdAndType(openId, type)
		}
	}

	@Transactional(readOnly = true)
	def listBindings(callable) {
		return Binding.createCriteria().list(callable)
	}

	private _revokeUrl(oauth, token) {
		return oauth.revoke + String.format(this.revokeTokenParams, token)
	}

	private _accessUrl(oauth, code) {
		if (!oauth.redirect.startsWith("http://")) {
			oauth.redirect = String.format(oauth.redirect, AppUtil.baseUrl())
		}
		return oauth.access + String.format(this.accessTokenParams,
				oauth.key, oauth.secret, code, oauth.redirect)
	}

	private _refreshUrl(oauth, refresh, secret = false) {
		return oauth.access + String.format(this.refreshTokenParams, oauth.key,
				secret ? oauth.secret : "", refresh)
	}

	private _parse(result, plain = false) {
		if (plain) {
			JSONObject json = new JSONObject()
			result.split("&").each { entry ->
				int index = entry.indexOf("=")
				String key = entry.substring(0, index)
				String value = entry.substring(index + 1)
				json.put(key, value)
			}
			return json
		}
		return JSON.parse(result)
	}

	def accessSinaToken(code, user) {
		String url = this._accessUrl(this.sina, code)
		String result = HttpUtil.executeRequest(url, false)
		JSONObject json = this._parse(result)
		if (json.has("error_code")) {
			log.error(url + ": " + result)
			return null
		}
		json.remove("remind_in")
		String openId = json.remove("uid").toString()
		Binding binding = this.getBindingByOpenId(openId, Const.BINDING_TYPE_SINA, user)
		if (!binding) {
			binding = new Binding(type: Const.BINDING_TYPE_SINA, account: user, openId: openId)
		}
		binding.access = json.remove("access_token")
		binding.expireTime = System.currentTimeMillis() + (json.remove("expires_in") - 60) * 1000
		binding.ext = json.toString()
		this.saveBinding(binding)
		return binding
	}

	def revokeSinaToken(token) {
		String url = this._revokeUrl(this.sina, token)
		String result = HttpUtil.executeRequest(url, false)
		JSONObject json = this._parse(result)
		if (json.has("error_code")) {
			log.error(url + ": " + result)
			return false
		}
		if (json.get("result")?.toBoolean()) {
			return true
		}
		return false
	}

	private _updateTencentToken(binding, json, ext) {
		binding.access = json.remove("access_token")
		binding.expireTime = System.currentTimeMillis() + (json.remove("expires_in") - 60) * 1000
		binding.refresh = json.remove("refresh_token")
		binding.ext = ext
		this.saveBinding(binding)
	}

	def accessTencentToken(code, openid, openkey, user) {
		String url = this._accessUrl(this.tencent, code)
		String result = HttpUtil.executeRequest(url, true)
		JSONObject json = this._parse(result, true)
		if (json.has("errorCode")) {
			log.error(url + ": " + result)
			return null
		}
		String openId = json.remove("openid").toString()
		Binding binding = this.getBindingByOpenId(openId, Const.BINDING_TYPE_TENCENT, user)
		if (!binding) {
			binding = new Binding(type: Const.BINDING_TYPE_TENCENT, account: user, openId: openId)
		}
		this._updateTencentToken(binding, json, ([openkey: openkey] as JSON).toString())
		return binding
	}

	def refreshTencentToken(binding) {
		String url = this._refreshUrl(this.tencent, binding.refresh)
		String result = HttpUtil.executeRequest(url, true)
		JSONObject json = this._parse(result, true)
		if (json.has("errorCode")) {
			log.error(url + ": " + result)
			return null
		}
		JSONObject ext = JSON.parse(binding.ext)
		ext.put("name", json.remove("name"))
		this._updateTencentToken(binding, json, ext.toString())
		return binding
	}

	private _updateRenrenToken(binding, json) {
		binding.access = json.remove("access_token")
		binding.expireTime = System.currentTimeMillis() + (json.remove("expires_in") - 60) * 1000
		binding.refresh = json.remove("refresh_token")
		binding.ext = json.toString()
		this.saveBinding(binding)
	}

	def accessRenrenToken(code, user) {
		String url = this._accessUrl(this.renren, code)
		String result = HttpUtil.executeRequest(url, false)
		JSONObject json = this._parse(result)
		if (json.has("error_code")) {
			log.error(url + ": " + result)
			return null
		}
		String openId = json.get("user").remove("id").toString()
		Binding binding = this.getBindingByOpenId(openId, Const.BINDING_TYPE_RENREN, user)
		if (!binding) {
			binding = new Binding(type: Const.BINDING_TYPE_RENREN, account: user, openId: openId)
		}
		this._updateRenrenToken(binding, json)
		return binding
	}

	def refreshRenrenToken(binding) {
		String url = this._refreshUrl(this.renren, binding.refresh, true)
		String result = HttpUtil.executeRequest(url, false)
		JSONObject json = this._parse(result)
		if (json.has("error_code")) {
			log.error(url + ": " + result)
			return null
		}
		this._updateRenrenToken(binding, json)
		return binding
	}

	def getType(source) {
		int type = 0
		switch (source) {
			case this.sina.key:
				type = Const.BINDING_TYPE_SINA
				break
			case this.tencent.key:
				type = Const.BINDING_TYPE_TENCENT
				break
			case this.renren.key:
				type = Const.BINDING_TYPE_RENREN
				break
		}
		return type
	}

	@Transactional
	def cancelBindingByOpenId(openId, type) {
		this.getBindingByOpenId(openId, type)?.delete()
	}

	@Transactional
	def cancelBinding(binding) {
		boolean flag = false
		switch (binding.type) {
			case Const.BINDING_TYPE_SINA:
				flag = this.revokeSinaToken(binding.access)
				break
			case Const.BINDING_TYPE_TENCENT:
				break
			case Const.BINDING_TYPE_RENREN:
				break
		}
		if (flag) {
			binding.delete()
		}
	}

	private _shareParams(object, type) {
		int length = 0
		switch (type) {
			case Const.BINDING_TYPE_SINA:
				length = this.sina.length
				break
			case Const.BINDING_TYPE_TENCENT:
				length = this.tencent.length
				break
			case Const.BINDING_TYPE_RENREN:
				length = this.renren.length
				break
		}
		def params = [:]
		if (object instanceof Group) {
			params.url = AppUtil.baseUrl() + "/" + object.homepage
			params.title = object.name
			params.content = object.description ? HtmlUtil.getBrief(
					object.description, length) : ""
			params.imageUrl = object.logo ? AppUtil.baseUrl() + object.logo : ""
		}
		if (object instanceof Meeting) {
			params.url = AppUtil.baseUrl() + "/" + object.group.homepage + "/meeting/" + object.id
			params.title = object.title
			params.content = object.details ? HtmlUtil.getBrief(
					object.details, length) : ""
			params.imageUrl = object.cover ? AppUtil.baseUrl() + object.cover : ""
			params.subtitle = object.group.name
		}
		params.lat = object.latitude
		params.long = object.longitude
		return params
	}

	private _shareUrl(binding, object, message) {
		String url = null
		def params = this._shareParams(object, binding.type)
		switch (binding.type) {
			case Const.BINDING_TYPE_SINA:
				url = String.format(this.sina.share, binding.access,
						URLEncoder.encode(params.content, Const.DEFAULT_ENCODING),
						params.url, params.lat, params.long)
				break
			case Const.BINDING_TYPE_TENCENT:
				break
			case Const.BINDING_TYPE_RENREN:
				url = String.format(this.renren.share, binding.access,
						message ? message : "", params.title, params.imageUrl,
						params.content, params.subtitle, params.url)
				break
		}
		return url
	}

	def share(binding, object, message) {
		String url = this._shareUrl(binding, object, message)
		String result = HttpUtil.executeRequest(url, false)
		JSONObject json = this._parse(result)
		boolean flag = true
		if (json.has("error_code") || json.has("error")) {
			flag = false
			log.error(url + ": " + result)
		}
		return [flag, json]
	}

}
