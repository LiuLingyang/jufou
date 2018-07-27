package com.meetup

import grails.converters.JSON
import org.codehaus.groovy.grails.web.json.JSONObject
import org.springframework.transaction.annotation.Transactional

import javax.annotation.Resource

class WeixinService extends AbstractService {

	@Resource
	def bindingService

	@Resource
	def userService

	class Step {

		String url

		String params

		String redirect

	}

	private Step authorize = null

	private Step accessToken = null

	private Step refreshToken = null

	private Step userInfo = null

	private String openUrl = null

	private String apiUrl = null

	private String key = null

	private String secret = null

//	private String accountSuffix = null

	public void init() {
		this.openUrl = this.grailsApplication.config.app.weixin.open.url
		this.key = this.grailsApplication.config.app.weixin.auth.key
		this.secret = this.grailsApplication.config.app.weixin.auth.secret

		this.authorize = new Step(url: this.grailsApplication.config.app.weixin.auth.authorize.url,
				params: this.grailsApplication.config.app.weixin.auth.authorize.params,
				redirect: String.format(this.grailsApplication.config.app.weixin.auth.authorize.redirect,
						this.grailsApplication.config.app.server.domain))

		this.apiUrl = this.grailsApplication.config.app.weixin.api.url

		this.accessToken = new Step(url: this.grailsApplication.config.app.weixin.auth.accessToken.url,
				params: this.grailsApplication.config.app.weixin.auth.accessToken.params)

		this.refreshToken = new Step(url: this.grailsApplication.config.app.weixin.auth.refreshToken.url,
				params: this.grailsApplication.config.app.weixin.auth.refreshToken.params)

		this.userInfo = new Step(url: this.grailsApplication.config.app.weixin.auth.userInfo.url,
				params: this.grailsApplication.config.app.weixin.auth.userInfo.params)

//		this.accountSuffix = this.grailsApplication.config.app.weixin.account.suffix
	}

	def authorize(state, redirectUrl) {
		String redirect = this.authorize.redirect + (redirectUrl ?
				"?redirectUrl=" + URLEncoder.encode(redirectUrl,
						Const.DEFAULT_ENCODING) : "")
		String url = this.openUrl + this.authorize.url + String.format(
				this.authorize.params, this.key, URLEncoder.encode(
				redirect, Const.DEFAULT_ENCODING), state)
		return url
	}

//	def accountSuffix() {
//		return this.accountSuffix
//	}

	@Transactional
	def accessToken(code) {
		if (!code || code == "authdeny") {
			log.error("invalid access code: " + code)
			return null
		}
		String url = this.apiUrl + this.accessToken.url + String.format(
				this.accessToken.params, this.key, this.secret, code)
		String result = HttpUtil.executeRequest(url, false)
		JSONObject json = JSON.parse(result)
		if (json.has("errcode")) {
			log.error(url + ": " + result)
			return null
		}
		String openId = json.remove("openid").toString()
		Binding binding = this._getBinding(openId)
		if (!binding) {
			binding = new Binding(type: Const.BINDING_TYPE_WEIXIN, openId: openId)
		}
		this._updateToken(binding, json)
		return binding
	}

	@Transactional
	def access(code) {
		Binding binding = this.accessToken(code)
		return this._user(binding)
	}

	private _updateToken(binding, json) {
		binding.access = json.remove("access_token")
		binding.expireTime = System.currentTimeMillis() + (json.remove("expires_in") - 60) * 1000
		binding.refresh = json.remove("refresh_token")
		binding.ext = json.toString()
		this.bindingService.saveBinding(binding)
	}

	private _getBinding(openId) {
		int index = openId.indexOf(Const.WEIXIN_USER_SUFFIX)
		if (index > 0) {
			openId = openId.substring(0, index)
		}
		return this.bindingService.getBindingByOpenId(openId,
				Const.BINDING_TYPE_WEIXIN)
	}

	@Transactional
	def refreshToken(openId) {
		Binding binding = this._getBinding(openId)
		String url = this.apiUrl + this.refreshToken.url + String.format(
				this.refreshToken.params, this.key, binding.refresh)
		String result = HttpUtil.executeRequest(url, false)
		JSONObject json = JSON.parse(result)
		if (json.has("errcode")) {
			log.error(url + ": " + result)
			return null
		}
		this._updateToken(binding, json)
		return binding
	}

	private _user(binding) {
		JSONObject json = this._userInfo(binding)
		if (!json) {
			return null
		}
		json.username = json.remove("openid").toString() + Const.WEIXIN_USER_SUFFIX
		json.password = "".encodeAsMD5()
		json.gender = json.remove("sex").toInteger()
		json.portrait = json.remove("headimgurl")
		json.thumbnail = json.portrait
//		json.bio = json.remove("privilege").toString()
		json.state = Const.USER_STATE_ACTIVE
		json.nickname = AppUtil.encodeAsUTF8(json.nickname)
		json.country = AppUtil.encodeAsUTF8(json.country)
		json.province = AppUtil.encodeAsUTF8(json.province)
		json.city = AppUtil.encodeAsUTF8(json.city)
		User user = this.userService.getUserByName(json.username)
		if (!user) {
			user = new User(json)
			this.userService.createUser(user)
			binding.account = user
			this.bindingService.saveBinding(binding)
		} else {
			user = this.userService.updateUser(user.id, json)
		}
		return user
	}

	@Transactional
	def refresh(openId) {
		Binding binding = this._getBinding(openId)
		if (System.currentTimeMillis() <= binding.expireTime) {
			return binding.account
		}
		binding = this.refreshToken(openId)
		return this._user(binding)
	}

	def userInfo(openId) {
		Binding binding = this._getBinding(openId)
		return this._userInfo(binding)
	}

	private _userInfo(binding) {
		if (!binding) {
			return null
		}
		String url = this.apiUrl + this.userInfo.url + String.format(
				this.userInfo.params, binding.access, binding.openId)
		String result = HttpUtil.executeRequest(url)
		JSONObject json = JSON.parse(result)
		if (json.has("errcode")) {
			log.error(url + ": " + result)
			return null
		}
		return json
	}

}
