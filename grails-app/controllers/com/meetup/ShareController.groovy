package com.meetup

class ShareController extends AbstractController {

	def shareService

	def beforeInterceptor = [action: this.&_updatePermission, only: ["create",
																	 "rest_create", "rest_delete", "rest_update", "update"]]

	private _updatePermission() {
		long userId = this._getUserId()
		if (actionName.endsWith("create")) {
			Group group = params.gname ? this.groupService.getGroupByHomepage(params.gname)
					: this.groupService.getGroup(params.gid)
			if (this.userService.isAttendGroupOrMeeting(userId, group.id, 0L)) {
				return true
			}
		} else {
			long publisherId = this.shareService.getShare(params.sid ? params.sid
					: params.third).publisherId
			if (publisherId == userId) {
				return true
			}
		}
		if (actionName.startsWith("rest_")) {
			this._response(Const.PERMISSION_DENIED)
		} else {
			forward(controller: "group", action: "index")
		}
		return false
	}

	def list() {
		def model = this._common(params.gname)
		this._render(view: "list", model: this._model(model))
	}

	def create() {
		def model = this._common(params.gname)
		this._render(view: "create", model: this._model(model))
	}

	def update() {
		def model = this._common(params.gname)
		model.share = this.shareService.getShare(params.third)
		this._render(view: "update", model: this._model(model))
	}

	def show() {
		def model = this._common(params.gname)
		model.share = this.shareService.getShare(params.second)
		this._render(view: "show", model: this._model(model))
	}

	def rest_create() {
		Share share = new Share(params)
		share.publisher = this._getUser()
		share.image = Photo.findById(params.pid)
		share.group = this.groupService.getGroup(params.gid)
		this.shareService.createShare(share)
		this._response(Const.SUCCESS, share)
	}

	def rest_update() {
		Share share = this.shareService.updateShare(params.sid, params, request)
		this._response(Const.SUCCESS, share)
	}

	def rest_delete() {
		Share share = this.shareService.deleteShare(params.sid, request)
		this._response(Const.SUCCESS, share)
	}

	def rest_get() {
		Share share = this.shareService.getShare(params.sid)
		this._response(Const.SUCCESS, share)
	}

	def rest_list() {
		long groupId = params.gid ? params.gid.toLong() : 0L
		long userId = params.gid ? 0L : this._getUserId()
		int total = this.shareService.countShares(groupId, userId)
		def shares = this.shareService.listShares(groupId, userId,
				params.offset, params.limit, params.sort, params.order)
		this._response(Const.SUCCESS, [total: total, list: shares])
	}

}
