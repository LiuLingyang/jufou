package com.meetup

import org.springframework.transaction.annotation.Transactional

@Transactional
class CommentService extends AbstractService {

	def messageService

	def photoService

	def eventService

	@Transactional(readOnly = true)
	def getComment(commentId) {
		return Comment.findById(commentId)
	}

	@Transactional(readOnly = true)
	def countComments(callable, type) {
		return type == Meeting.class ? MComment.createCriteria().count(callable)
				: (type == Photo.class ? PComment.createCriteria().count(callable)
				: SComment.createCriteria().count(callable))
	}

	@Transactional(readOnly = true)
	def listComments(callable, type, offset = null,
					 limit = null, sort = null, order = null) {
		def args = this._criteriaArgs(offset, limit, sort, order)
		return type == Meeting.class ? MComment.createCriteria().list(args, callable)
				: (type == Photo.class ? PComment.createCriteria().list(args, callable)
				: SComment.createCriteria().list(args, callable))
	}

	def deleteComment(cid, request) {
		Comment comment = Comment.findById(cid)
		comment.delete()
		if (comment.image) {
			this.photoService.deletePhoto(comment.imageId, request)
		}
		def target = null
		if (comment instanceof MComment) {
			target = Meeting.lock(comment.meetingId)
		}
		if (comment instanceof PComment) {
			target = Photo.lock(comment.photoId)
		}
		if (comment instanceof SComment) {
			target = Share.lock(comment.shareId)
		}
		target.commentCount -= 1
		target.save()
		return comment
	}

	def deleteComments(target, request) {
		def callable = {
			if (target instanceof Photo) {
				photo {
					eq("id", target.id)
				}
			}
			if (target instanceof Share) {
				share {
					eq("id", target.id)
				}
			}
		}
		def comments = this.listComments(callable, target.getClass())
		comments?.each { comment ->
			comment.delete()
			if (comment.image) {
				this.photoService.deletePhoto(comment.imageId, request)
			}
		}
		target.lock()
		target.commentCount -= comments.size()
		target.save()
		return target
	}

	def saveComment(comment) {
		comment.save()
	}

	private _messageComment(poster, target) {
		if (!(target instanceof Meeting)) {
			return
		}
		def mdata = [:]
		mdata.homepage = target.group.homepage
		mdata.mid = target.id
		mdata.title = target.title
		this.messageService.writeMessage(Const.MESSAGE_TYPE_MEETING_COMMENT,
				mdata, mdata.mid, poster.id)
		def edata = [:]
		edata.putAll(mdata)
		edata.uid = poster.id
		edata.nickname = poster.nickname
		if (poster.thumbnail) {
			edata.portrait = poster.thumbnail
		}
		this.eventService.createEvent(target.groupId,
				Const.EVENT_TYPE_MEETING_COMMENT, edata)
	}

//	private _album(comment) {
//		if (comment instanceof MComment) {
//			return this.albumService.createAlbum4Comment(comment.meeting)
//		}
//		if (comment instanceof PComment) {
//			return this.albumService.createAlbum4Comment(comment.photo)
//		}
//		return null
//	}
//
//	private _photo(comment, realPath, file) {
//		Album album = this._album(comment)
//		return album ? this.photoService.createPhoto(album.id,
//				comment.posterId, realPath, file) : null
//	}

	def createComment(comment, target) {
		if (!comment) {
			return
		}
		if (comment instanceof MComment) {
			comment.meeting = target
		}
		if (comment instanceof PComment) {
			comment.photo = target
		}
		if (comment instanceof SComment) {
			comment.share = target
		}

		comment.save()

		target.lock()
		target.commentCount += 1
		target.save()

		this._messageComment(comment.poster, target)
	}

}
