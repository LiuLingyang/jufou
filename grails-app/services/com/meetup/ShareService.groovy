package com.meetup

import org.springframework.transaction.annotation.Transactional

class ShareService extends AbstractService {

	def commentService

	def photoService

	@Transactional
	def updateShare(shareId, params, request) {
		Share share = Share.lock(shareId)
		if (params.pid && params.pid.toLong() != share.image?.id) {
			if (share.image) {
				this.photoService.deletePhoto(share.imageId, request)
			}
			share.image = Photo.findById(params.pid)
		}
		AppUtil.merge(share, params)
		share.save()
		return share
	}

	@Transactional
	def saveShare(share) {
		share.save()
	}

	@Transactional
	def createShare(share) {
		this.saveShare(share)
	}

	@Transactional(readOnly = true)
	def listShares(groupId, userId, offset = null,
				   limit = null, sort = "publishTime", order = "desc") {
		def args = this._criteriaArgs(offset, limit, sort, order)
		return Share.createCriteria().list(args, this._callable(groupId, userId))
	}

	private _callable(groupId, userId) {
		def callable = {
			if (groupId > 0L) {
				group {
					eq("id", groupId)
				}
			}
			if (userId > 0L) {
				publisher {
					eq("id", userId)
				}
			}
		}
		return callable
	}

	@Transactional(readOnly = true)
	def countShares(groupId, userId) {
		return Share.createCriteria().count(this._callable(groupId, userId))
	}

	@Transactional(readOnly = true)
	def getShare(shareId) {
		return Share.findById(shareId)
	}

	@Transactional
	def deleteShare(shareId, request) {
		Share share = Share.findById(shareId)
		if (!share) {
			return null
		}
		this.commentService.deleteComments(share, request)
		share.delete()
		if (share.image) {
			this.photoService.deletePhoto(share.imageId, request)
		}
		return share
	}

	def reviseCommentCount() {
		int total = 0
		Share.list().each { item ->
			int count = this.commentService.countComments({
				share {
					eq("id", item.id)
				}
			}, Share.class)
			if (item.commentCount != count) {
				log.error("revise commentCount of Share " + item.id
						+ ", from " + item.commentCount + " to " + count)
				Share.withTransaction { status ->
					try {
						if (!item.isAttached()) {
							item.attach()
						}
						item.commentCount = count
						this.saveShare(item)
					} catch (Exception ex) {
						ex.printStackTrace()
						status.setRollbackOnly()
					}
				}
				total++
			}
		}
		return total
	}

}
