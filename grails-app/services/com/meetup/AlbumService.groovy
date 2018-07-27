package com.meetup

import org.springframework.transaction.annotation.Transactional

//@Transactional(rollbackFor = RuntimeException.class)
class AlbumService extends AbstractService {

//	static transactional = true

	def groupService

	def meetingService

	def photoService

	def quotaService

	@Transactional(readOnly = true)
	def getAlbum(aid) {
		return Album.findById(aid)
	}

	@Transactional(readOnly = true)
	def getAlbumByName(name) {
		return Album.findByName(name)
	}

	@Transactional(readOnly = true)
	def getAlbumByMeeting(meetingId) {
		return Album.createCriteria().get {
			meeting {
				eq("id", meetingId)
			}
		}
	}

	@Transactional(readOnly = true)
	def countAlbums(callable) {
		return Album.createCriteria().count(callable)
	}

	@Transactional(readOnly = true)
	def listAlbums(callable, offset = null, limit = null,
				   sort = null, order = null) {
		def args = this._criteriaArgs(offset, limit, sort, order)
		return Album.createCriteria().list(args, callable)
	}

	@Transactional
	def saveAlbum(album) {
//		if (!album.save()) {
//			this._throwErrors(album)
//		}
		album.save()
	}

	@Transactional
	def createAlbum(album, meetingId, groupId, allowDuplicate = true) {
		if (meetingId) {
			Meeting meeting = Meeting.findById(meetingId)
			album.meeting = meeting
			album.group = meeting.group
		}
		if (!album.group) {
			album.group = Group.findById(groupId)
		}
		if (!allowDuplicate) {
			Album exist = album.meeting ? Album.findByMeetingAndName(album.meeting,
					album.meeting.title) : Album.findByGroupAndName(
					album.group, album.group.name)
			if (exist) {
				return exist
			}
		}
		album.save()
		return album
	}

	@Transactional
	def createAlbum4Comment(commented) {
		Album album = null
		Meeting meeting = null
		Group group = null
		if (commented instanceof Meeting) {
			meeting = commented
			group = meeting.group
			album = Album.findByMeetingAndName(meeting, meeting.title)
		}
		if (commented instanceof Photo) {
			album = commented.album
			meeting = album.meeting
			group = album.group
			album = meeting ? Album.findByMeetingAndName(meeting, meeting.title) :
					Album.findByGroupAndName(group, group.name)
		}
		if (commented instanceof Share) {
			group = commented.group
			album = Album.findByGroupAndName(group, group.name)
		}
		if (!album) {
			album = new Album(name: meeting ? meeting.title : group.name)
			this.createAlbum(album, meeting ? meeting.id : null, group.id)
		}
		return album
	}

	@Transactional
	def updateAlbum(albumId, photoId, force, count = 0, name = null) {
		Album album = Album.lock(albumId)
		boolean isUpdate = false
		if (photoId && (force || !album.coverUrl)) {
			album.coverUrl = Photo.findById(photoId).thumbnailURL
			isUpdate = true
		}
		if (name) {
			album.name = name
			isUpdate = true
		}
		if (count != 0) {
			album.photoCount += count
			isUpdate = true
		}
		if (isUpdate) {
			album.save()
		}
		return album
	}

	@Transactional
	def deleteAlbum(albumId, request) {
		Album album = Album.lock(albumId)
		if (!album) {
			return null
		}
		def urls = []
		album.photos?.each { photo ->
			urls += photo.originalURL + photo.thumbnailURL
			photo.delete()
		}
		album.delete()
		urls += album.coverUrl
		urls.unique().each {
			it && this.hdfsService.delete(it, request)
		}
		if (urls.contains(album.group.lastThumbnail)) {
			this.groupService.updateLastPhoto(album.groupId)
		}
		this.meetingService.updatePhotoCount(album.meetingId,
				0 - album.photoCount)
		this.quotaService.updatePhotoUploaded(album.group.quotaId, 0 - album.photoCount)
		return album
	}

	def revisePhotoCount() {
		int total = 0
		Album.list().each { item ->
			int count = this.photoService.countPhotos({
				album {
					eq("id", item.id)
				}
			})
			if (item.photoCount != count) {
				log.error("revise photoCount of Album " + item.id
						+ ", from " + item.photoCount + " to " + count)
				Album.withTransaction { status ->
					try {
						if (!item.isAttached()) {
							item.attach()
						}
						item.photoCount = count
						this.saveAlbum(item)
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
