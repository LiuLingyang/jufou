package com.meetup

class PhotoController extends AbstractController {

	def albumService

	def shareService

	def beforeInterceptor = [action: this.&_updatePermission,
			only: ["rest_delete", "rest_move", "rest_create", "rest_uploadable"]]

	private _updatePermission() {
		long userId = this._getUserId()
		if (actionName.endsWith("move")) {
			if (this.userService.isDeletePhotoPermitted(userId, params.pid)
					&& this.userService.isUpdateAlbumPermitted(userId, params.aid)) {
				return true
			}
		}
		if (actionName.endsWith("delete")) {
			if (this.userService.isDeletePhotoPermitted(userId, params.pid)) {
				return true
			}
		}
		if (actionName.endsWith("create") || actionName.endsWith("uploadable")) {
			if (this._uploadPermission()) {
				return true
			}
		}
		this._response(Const.PERMISSION_DENIED)
		return false
	}

	private _uploadPermission() {
		long groupId = 0L
		long meetingId = 0L
		if (params.aid) {
			Album album = this.albumService.getAlbum(params.aid)
			groupId = album.groupId
			meetingId = album.meeting ? album.meetingId : 0L
		} else {
			if (params.mid) {
				meetingId = params.mid.toLong()
				groupId = this.meetingService.getMeeting(meetingId).groupId
			}
			if (params.pid) {
				Album album = this.photoService.getPhoto(params.pid).album
				groupId = album.groupId
				meetingId = album.meeting ? album.meetingId : 0L
			}
			if (params.sid) {
				Share share = this.shareService.getShare(params.sid)
				groupId = share.groupId
			}
			if (params.gid) {
				groupId = params.gid.toLong()
			}
		}
		if (this.userService.isAttendGroupOrMeeting(
				this._getUserId(), groupId, meetingId)) {
			return true
		}
//		redirect(controller: "error", action: "handle500",
//				params: [code: Const.PERMISSION_DENIED,
//						error: AppUtil.encodeAsGBK(this.grailsApplication.config.
//								app.error.msg.comment.permission.denied)])
		return false
	}

	// 相片详情
	def show() {
		def model = this._common(params.gname)
		Photo photo = this.photoService.getPhoto(params.second)
		model.album = photo.album
		model.photo = photo
		this._render(view: "show", model: this._model(model))
	}

	def rest_uploadable() {
		this._response(Const.SUCCESS)
	}

	// 获取相册的相片列表
	def rest_list() {
		def callable = {
			album {
				if (params.aid) {
					eq("id", params.aid.toLong())
				} else if (params.mid) {
					meeting {
						eq("id", params.mid.toLong())
					}
				}
			}
		}
		int total = this.photoService.countPhotos(callable)
		def photos = this.photoService.listPhotos(callable,
				params.offset, params.limit, params.sort, params.order)
		this._response(Const.SUCCESS, [total: total, list: photos])
	}

//	def rest_recent() {
//		def photos = Photo.createCriteria().list(max: 6) {
//			album {
//				if (params.gid) {
//					group {
//						eq("id", params.gid.toInteger())
//					}
//				}
//				if (params.mid) {
//					meeting {
//						eq("id", params.mid.toInteger())
//					}
//				}
//			}
//			order("uploadTime", "desc")
//		}
//		this._response(Const.SUCCESS, [total: photos.size(), list: photos])
//	}

	// 上传相片
	def rest_create() {
		def file = request.getFile("file")
		if (!file.inputStream || file.empty ||
				file.size > Const.PHOTO_MAX_SIZE) {
			// 文件超出大小
			this._response(Const.FILE_EXCEED_SIZE)
			return
		}
		if (!Const.IMAGE_TYPES.contains(
				ImageUtil.getImageFormatName(file))) {
			this._response(Const.UNSUPPORTED_FILE_TYPE)
			return
		}
		if (!params.aid) {
			if (params.mid) {
				Meeting meeting = this.meetingService.getMeeting(params.mid)
				params.aid = this.albumService.createAlbum4Comment(meeting).id
			}
			if (params.pid) {
				Photo photo = this.photoService.getPhoto(params.pid)
				params.aid = this.albumService.createAlbum4Comment(photo).id
			}
			if (params.sid) {
				Share share = this.shareService.getShare(params.sid)
				params.aid = this.albumService.createAlbum4Comment(share).id
			}
			if (params.gid) {
				Group group = this.groupService.getGroup(params.gid)
				Album album = new Album(name: group.name)
				params.aid = this.albumService.createAlbum(album, null,
						params.gid, false).id
			}
		}
		Group group = this.albumService.getAlbum(params.aid).group
		if (group.quota.photoUploaded >= group.quota.photoLimit) {
			this._response(Const.PHOTO_QUOTA_BEYOND)
			return
		}
		Photo photo = this.photoService.createPhoto(params.aid,
				this._getUserId(), request, "/photo", file)
		this._response(Const.SUCCESS, photo)
	}

	// 删除相片
	def rest_delete() {
		Photo photo = this.photoService.deletePhoto(params.pid, request)
		this._response(Const.SUCCESS, photo)
	}

	// 移动相片
	def rest_move() {
		Photo photo = this.photoService.movePhoto(params.pid, params.aid)
		this._response(Const.SUCCESS, photo)
	}

	// 上传图片
	def rest_upload() {
		def file = request.getFile("file")
		if (!file.inputStream || file.empty ||
				file.size > Const.PHOTO_MAX_SIZE) {
			// 文件超出大小
			this._response(Const.FILE_EXCEED_SIZE)
			return
		}
		if (!Const.IMAGE_TYPES.contains(
				ImageUtil.getImageFormatName(file))) {
			this._response(Const.UNSUPPORTED_FILE_TYPE)
			return
		}
		def urls = this.photoService.uploadPhoto(file, request, "/photo",
				"0/0", System.currentTimeMillis(), params.thumbnail?.toInteger() <= 0)
		this._response(Const.SUCCESS, urls)
	}

}