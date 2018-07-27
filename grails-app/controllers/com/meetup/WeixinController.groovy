package com.meetup

import org.codehaus.groovy.grails.web.json.JSONObject

class WeixinController extends AbstractController {

	def weixinService

	def rest_developer() {
		String token = this.grailsApplication.config.
				app.weixin.developer.token
		String signature = [token, params.timestamp, params.nonce].
				sort().join("").encodeAsSHA1()
		this._response((signature == params.signature ?
				params.echostr : false.toString()))
	}

	def rest_authorize() {
		if (this._getUserId() > 0L) {
			redirect(uri: params.redirectUrl)
		} else {
			String url = this.weixinService.authorize(ProofUtil.genProofCode(4),
					params.redirectUrl)
			redirect(uri: url)
		}
	}

	def rest_redirect() {
		if (params.code) {
			this._response(Const.SUCCESS, params.code)
		} else {
			this._response(Const.FAIL)
		}
	}

	def rest_accessToken() {
		Binding binding = this.weixinService.accessToken(params.code)
		if (!binding) {
			this._response(Const.FAIL)
			return
		}
		this._response(Const.SUCCESS, binding)
	}

	def rest_refreshToken() {
		Binding binding = this.weixinService.refreshToken(params.openid)
		this._response(Const.SUCCESS, binding)
	}

	def rest_userInfo() {
		JSONObject user = this.weixinService.userInfo(params.openid)
		if (user) {
			this._response(Const.SUCCESS, user)
		} else {
			this._response(Const.FAIL)
		}
	}

	def rest_access() {
		String url = params.redirectUrl
		if (params.code) {
			User user = this.weixinService.access(params.code)
			if (user) {
				this._initLogin(user, true)
			}
		}
		if (!url) {
			url = !params.code || params.code == "authdeny" ? "/login/" : "/home/"
		}
		redirect(uri: url)
	}

}
