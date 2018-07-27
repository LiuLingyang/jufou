package com.meetup

class BindingController extends AbstractController {

	def bindingService

	def beforeInterceptor = [action: this.&_initRedirectUri, except:
			["rest_cancel", "rest_sns", "rest_delete"]]

	private _initRedirectUri() {
		if (!actionName.startsWith("rest_") && !params.code) {
			def error = this._error(params.error_code, params.error_uri,
					params.error, params.error_description)
			this._render(view: "error", model: [error: error])
			return false
		}
		return true
	}

	private _error(code, uri, msg, description) {
		return [code: code, uri: uri, msg: msg, descriptoin: description]
	}

	def sina() {
		Binding binding = this.bindingService.accessSinaToken(params.code, this._getUser())
		this._render(view: "sina", model: [binding: binding])
	}

	def tencent() {
		Binding binding = this.bindingService.accessTencentToken(params.code,
				params.openid, params.openkey, this._getUser())
		this._render(view: "tencent", model: [binding: binding])
	}

	def renren() {
		Binding binding = this.bindingService.accessRenrenToken(params.code, this._getUser())
//		?error=access_denied&error_description=The+end-user+or+authorization+server+denied+the+request.&error_uri=http%3a%2f%2fgraph.renren.com%2foauth%2ferror%3ferror%3daccess_denied%26error_description%3dThe%2Bend-user%2Bor%2Bauthorization%2Bserver%2Bdenied%2Bthe%2Brequest
		this._render(view: "renren", model: [binding: binding])
	}

	def rest_refresh() {
		Binding binding = null
		User user = this._getUser()
		int type = params.type.toInteger()
		if ([Const.BINDING_TYPE_TENCENT, Const.BINDING_TYPE_RENREN].contains(type)) {
			binding = this.bindingService.getBinding(user, type)
			if (!binding) {
				this._response(Const.USER_NOT_BINDING)
				return
			}
			if (type == Const.BINDING_TYPE_TENCENT) {
				binding = this.bindingService.refreshTencentToken(binding)
			}
			if (type == Const.BINDING_TYPE_RENREN) {
				binding = this.bindingService.refreshRenrenToken(binding)
			}
		}
		if (!binding) {
			this._response(Const.FAIL)
		} else {
			this._response(Const.SUCCESS, binding)
		}
	}

	def rest_cancel() {
		int type = this.bindingService.getType(params.source)
		if (type == 0) {
			this._response(Const.ILLEGAL_REQUEST)
			return
		}
		this.bindingService.cancelBindingByOpenId(params.uid, type)
		this._response(Const.SUCCESS)
	}

	def rest_sns() {
		def bindings = this.bindingService.listBindings({
			account {
				eq("id", this._getUserId())
			}
		})
		this._response(Const.SUCCESS, bindings)
	}

	def rest_delete() {
		Binding binding = this.bindingService.getBinding(this._getUser(),
				params.type.toInteger())
		if (!binding) {
			this._response(Const.USER_NOT_BINDING)
			return
		}
		this.bindingService.cancelBinding(binding)
		this._response(Const.SUCCESS)
	}

	def rest_share() {
		Binding binding = this.bindingService.getBinding(this._getUser(),
				params.type.toInteger())
		if (!binding) {
			this._response(Const.USER_NOT_BINDING)
			return
		}
		def object = params.gid ? this.groupService.getGroup(params.gid) :
				(params.mid ? this.meetingService.getMeeting(params.mid) : null)
		if (!object) {
			this._response(Const.ILLEGAL_REQUEST)
			return
		}
		def result = this.bindingService.share(binding, object, params.content)
		this._response(result[0] ? Const.SUCCESS : Const.FAIL, result[1])
	}

}
