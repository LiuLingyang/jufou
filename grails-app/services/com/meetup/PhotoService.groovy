package com.meetup

import org.springframework.transaction.annotation.Transactional

class PhotoService extends AbstractService {

	def messageService

	def groupService

	def eventService

	def meetingService

	def commentService

	def quotaService

	def albumService

	@Transactional(readOnly = true)
	def getPhoto(pid) {
		return Photo.findById(pid)
	}

	@Transactional
	def savePhoto(photo) {
		photo.save()
	}

	@Transactional(readOnly = true)
	def listPhotos(callable, offset, limit, sort, order) {
		def args = this._criteriaArgs(offset, limit, sort, order)
		return Photo.createCriteria().list(args, callable)
	}

	@Transactional(readOnly = true)
	def countPhotos(callable) {
		return Photo.createCriteria().count(callable)
	}

	private _messageUpload(album, photo, group, user) {
		def mdata = [:]
		mdata.homepage = album.group.homepage
		if (album.meeting) {
			mdata.mid = album.meetingId
			mdata.title = album.meeting.title
		} else {
			mdata.title = album.group.name
		}
		mdata.count = 1
		if (album.meeting) {
			this.messageService.writeMessage(Const.MESSAGE_TYPE_MEETING_PHOTO_UPLOAD,
					mdata, album.meetingId, user.id)
		} else {
			this.messageService.writeMessage(Const.MESSAGE_TYPE_GROUP_PHOTO_UPLOAD,
					mdata, album.groupId, user.id)
		}
		def edata = [:]
		edata.putAll(mdata)
		edata.remove("count")
		edata.uid = user.id
		edata.nickname = user.nickname
		edata.pid = photo.id
		if (user.thumbnail) {
			edata.portrait = user.thumbnail
		}
		this.eventService.createEvent(group, Const.EVENT_TYPE_PHOTO_UPLOAD, edata)
	}

	@Transactional
	def createPhoto(albumId, userId, request, root, file) {
		User user = User.findById(userId)
		Album album = Album.findById(albumId)
		Photo photo = new Photo(uploader: user, album: album)
		this.savePhoto(photo)
		String original = this._upload(file, request, root, album.groupId +
				"/" + album.id, photo.id + Const.IMAGE_ORIGINAL_SUFFIX,
				this.grailsApplication.config.app.photo.original)
		photo.originalURL = original
		String thumbnail = this._upload(file, request, root, album.groupId +
				"/" + album.id, photo.id + Const.IMAGE_THUMBNAIL_SUFFIX,
				this.grailsApplication.config.app.photo.thumbnail)
		photo.thumbnailURL = thumbnail
		this.savePhoto(photo)
		this.albumService.updateAlbum(albumId, photo.id, false, 1)
		Group group = this.groupService.updateGroup(album.groupId,
				[lastThumbnail: photo.thumbnailURL, lastPhoto:
						photo.originalURL?.replace(
								this.hdfsService.getContextPath(),
								this.hdfsService.getThumbnailContextPath())])
		this.meetingService.updatePhotoCount(album.meeting?.id, 1)
		this.quotaService.updatePhotoUploaded(group.quotaId, 1)
		this._messageUpload(album, photo, group, user)
		return photo
	}

	@Transactional
	def uploadPhoto(file, request, root, path, name, onlyOriginal = false) {
		String original = this._upload(file, request, root, path,
				name + Const.IMAGE_ORIGINAL_SUFFIX,
				this.grailsApplication.config.app.photo.original)
		def images = [original: original]
		if (!onlyOriginal) {
			String thumbnail = this._upload(file, request, root, path,
					name + Const.IMAGE_THUMBNAIL_SUFFIX,
					this.grailsApplication.config.app.photo.thumbnail)
			images.thumbnail = thumbnail
		}
		return images
	}

	@Transactional
	def deletePhoto(photoId, request) {
		Photo photo = Photo.findById(photoId)
		if (!photo) {
			return null
		}
		this.commentService.deleteComments(photo, request)
		photo.delete()
		def urls = [photo.originalURL] + photo.thumbnailURL
		urls.unique().each { url ->
			this.hdfsService.delete(url, request)
		}
		Album album = Album.lock(photo.albumId)
		if (urls.contains(album.coverUrl)) {
			album.coverUrl = null
		}
		album.photoCount -= 1
		album.save()
		if (urls.contains(album.group.lastThumbnail)) {
			this.groupService.updateLastPhoto(album.groupId)
		}
		this.meetingService.updatePhotoCount(album.meetingId, -1)
		this.quotaService.updatePhotoUploaded(album.group.quotaId, -1)
		return photo
	}

	@Transactional
	def movePhoto(photoId, albumId) {
		Photo photo = Photo.findById(photoId)
		long fromAlbumId = photo.albumId
		photo.album = Album.findById(albumId)
		photo.save()
		Album from = Album.lock(fromAlbumId)
		if (from.coverUrl == photo.thumbnailURL) {
			from.coverUrl = null
		}
		from.photoCount -= 1
		from.save()
		this.meetingService.updatePhotoCount(from.meeting?.id, -1)
		Album to = Album.lock(albumId)
		if (!to.coverUrl) {
			to.coverUrl = photo.thumbnailURL
		}
		to.photoCount += 1
		to.save()
		this.meetingService.updatePhotoCount(to.meeting?.id, 1)
		return photo
	}

	def reviseCommentCount() {
		int total = 0
		Photo.list().each { item ->
			int count = this.commentService.countComments({
				photo {
					eq("id", item.id)
				}
			}, Photo.class)
			if (item.commentCount != count) {
				log.error("revise commentCount of Photo " + item.id
						+ ", from " + item.commentCount + " to " + count)
				Photo.withTransaction { status ->
					try {
						if (!item.isAttached()) {
							item.attach()
						}
						item.commentCount = count
						this.savePhoto(item)
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
