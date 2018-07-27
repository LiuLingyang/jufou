package com.meetup

class AlbumController extends AbstractController {

	def albumService

	def beforeInterceptor = [action: this.&_updatePermission,
			only: ["rest_create", "rest_delete", "rest_update"]]

	def _updatePermission() {
		long userId = this._getUserId()
		if (actionName.endsWith("delete") || actionName.endsWith("update")) {
			if (this.userService.isUpdateAlbumPermitted(
					userId, params.aid)) {
				return true
			}
		}
		if (actionName.endsWith("create")) {
//			if (this.userService.isAttendGroupOrMeeting(userId,
//					params.gid.toLong(), params.mid ? params.mid.toLong() : 0L)) {
			if (this.userService.isGroupManagerOrCreator(userId,
					params.gid.toLong())) {
				return true
			}
		}
		this._response(Const.PERMISSION_DENIED)
		return false
	}

	// 组织相册列表
	def list() {
		def model = this._common(params.gname)
		this._render(view: "list", model: this._model(model))
	}

	// 相册相片列表
	def show() {
		def model = this._common(params.gname)
		model.album = this.albumService.getAlbum(params.second)
		this._render(view: "show", model: this._model(model))
	}

	// 获取组织或活动的相册列表
	def rest_list() {
		def callable = {
			if (params.gid) {
				group {
					eq("id", params.gid.toLong())
				}
			}
			if (params.mid) {
				meeting {
					eq("id", params.mid.toLong())
				}
			}
		}
		def total = this.albumService.countAlbums(callable)
		def albums = this.albumService.listAlbums(callable, params.offset,
				params.limit, params.sort, params.order)
		this._response(Const.SUCCESS, [total: total, list: albums])
	}

	// 创建相册
	def rest_create() {
		Album album = new Album(params)
		this.albumService.createAlbum(album, params.mid, params.gid)
		this._response(Const.SUCCESS, album)
	}

	// 删除相册
	def rest_delete() {
		Album album = this.albumService.deleteAlbum(params.aid, request)
		this._response(Const.SUCCESS, album)
	}

	// 更新相册
	def rest_update() {
		Album album = this.albumService.updateAlbum(
				params.aid, params.pid, true, 0, params.name)
		this._response(Const.SUCCESS, album)
	}

}
