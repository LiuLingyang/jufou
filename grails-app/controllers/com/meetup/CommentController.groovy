package com.meetup

class CommentController extends AbstractController {

	def commentService

	def shareService

	def beforeInterceptor = [action: this.&_commentPermission,
			only: ["rest_add", "rest_reply", "rest_commentable"]]

	private _commentPermission() {
		if (!params.type) {
			return true
		}
		int type = params.type.toInteger()
		long groupId = 0L
		long meetingId = 0L
		if (type == 1) {
			def target = this.meetingService.getMeeting(params.oid)
			groupId = target.groupId
			meetingId = target.id
		}
		if (type == 2) {
			def target = this.photoService.getPhoto(params.oid)
			groupId = target.album.groupId
			meetingId = target.album.meeting ? target.album.meetingId : 0L
		}
		if (type == 3) {
			def target = this.shareService.getShare(params.oid)
			groupId = target.groupId
		}
//		if (this.userService.isAttendGroupOrMeeting(
//				this._getUserId(), groupId, meetingId)) {
			return true
//		}
		this._response(Const.PERMISSION_DENIED)
		return false
	}

//	private _comment(reply) {
//		long userId = this._getUserId()
//		User poster = User.findById(userId)
//		Comment comment = params.type.toInteger() == 1 ?
//			new MComment(poster: poster) : new PComment(poster: poster)
//		comment.content = params.content
//		comment.replied = reply ? User.findById(params.pid) : null
//		def target = params.type.toInteger() == 1 ?
//			Meeting.findById(params.oid) : Photo.findById(params.oid)
//		target.addToComments(comment)
//		target.commentCount = target.comments.size()
//		target.save(flush: true)
//		this._messageComment(poster, target)
//		this._validate_response(target, comment, null)
//	}

	private _comment(reply) {
//		def file = reply ? null : request.getFile("image")
//		if (file) {
//			// 文件超出大小
//			if (file.empty || file.size > Const.PHOTO_MAX_SIZE) {
//				this._response(Const.FILE_EXCEED_SIZE)
//				return
//			}
//			if (!Const.IMAGE_TYPES.contains(
//					ImageUtil.getImageFormatName(file))) {
//				this._response(Const.UNSUPPORTED_FILE_TYPE)
//				return
//			}
//		}
		int type = params.type.toInteger()
		Comment comment = type == 1 ? new MComment() : (type == 2 ?
				new PComment() : new SComment())
		comment.poster = this._getUser()
		comment.content = this._filterWords(params.content)
		comment.replied = reply ? this.commentService.getComment(params.pid) : null
		comment.image = !reply ? (params.pid ? Photo.findById(params.pid) : null) : null
		this.commentService.createComment(comment, this._target(comment, params.oid))
		this._response(Const.SUCCESS, comment)
	}

	private _target(comment, targetId) {
		return comment instanceof MComment ? Meeting.findById(targetId)
				: (comment instanceof PComment ? Photo.findById(targetId)
				: Share.findById(targetId))
	}

	def rest_commentable() {
		this._response(Const.SUCCESS)
	}

	def rest_add() {
		this._comment(false)
	}

	def rest_reply() {
		this._comment(true)
	}

	def rest_list() {
		int itype = params.type.toInteger()
		Class type = itype == 1 ? Meeting.class : (itype == 2 ?
				Photo.class : Share.class)
		long id = params.oid.toLong()
		def callable = {
			if (type == Meeting.class) {
				meeting {
					eq("id", id)
				}
			}
			if (type == Photo.class) {
				photo {
					eq("id", id)
				}
			}
			if (type == Share.class) {
				share {
					eq("id", id)
				}
			}
		}
		def total = this.commentService.countComments(callable, type)
		def comments = this.commentService.listComments(callable, type,
				params.offset, params.limit, params.sort, params.order)
		this._response(Const.SUCCESS, [total: total, list: comments])
	}

//	def rest_delete() {
//		Comment comment = Comment.findById(params.cid)
//		def target = null
//		if (comment instanceof MComment) {
//			target = comment.meeting
//		}
//		if (comment instanceof PComment) {
//			target = comment.photo
//		}
//		target.removeFromComments(comment)
//		target.commentCount -= 1
//		target.save(flush: true)
//		this._validate_response(target, comment, null)
//	}

	def rest_delete() {
		if (this.userService.isDeleteCommentPermitted(
				this._getUserId(), params.cid)) {
			Comment comment = this.commentService.deleteComment(params.cid, request)
			this._response(Const.SUCCESS, comment)
		} else {
			this._response(Const.PERMISSION_DENIED)
		}
	}

}
