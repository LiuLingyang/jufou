package com.meetup

import org.apache.commons.lang.StringUtils

class NotFoundFilters {

	def dependsOn = [AuthFilters]

	def groupService

	def meetingService

	def albumService

	def photoService

	def userService

	def attendanceService

	def questionService

	def grailsApplication

	def shortLinkService

	def messageService

	def voteService

	def newsService

	def shareService

	def notfoundMap = [:]

	private _init() {
		if (this.notfoundMap.size() > 0) {
			return
		}
		this.notfoundMap.put(Group.class, this.grailsApplication.config.
				app.error.msg.group.not.found)
		this.notfoundMap.put(Meeting.class, this.grailsApplication.config.
				app.error.msg.meeting.not.found)
		this.notfoundMap.put(Album.class, this.grailsApplication.config.
				app.error.msg.album.not.found)
		this.notfoundMap.put(Photo.class, this.grailsApplication.config.
				app.error.msg.photo.not.found)
		this.notfoundMap.put(User.class, this.grailsApplication.config.
				app.error.msg.user.not.found)
		this.notfoundMap.put(ShortLink.class, this.grailsApplication.config.
				app.error.msg.stub.not.found)
		this.notfoundMap.put(Object.class, this.grailsApplication.config.
				app.error.msg.page.not.found)
		this.notfoundMap.put(Survey.class, this.grailsApplication.config.
				app.error.msg.survey.not.found)
		this.notfoundMap.put(News.class, this.grailsApplication.config.
				app.error.msg.news.not.found)
	}

	private _meeting(meetingId, group, userId) {
		Meeting meeting = this.meetingService.getMeeting(meetingId)
		return meeting && meeting.groupId == group.id && (meeting.state != Const.STATE_DISMISS
				|| this.userService.isGroupManagerCreatorOrMeetingCreator(
				userId, group.id, meeting.id))
	}

	private _album(albumId, group) {
		Album album = this.albumService.getAlbum(albumId)
		return album?.groupId == group.id
	}

	private _photo(photoId, group) {
		Photo photo = this.photoService.getPhoto(photoId)
		return photo?.album?.groupId == group.id
	}

	private _user(userId, group) {
		User user = this.userService.getUser(userId)
		return user && this.attendanceService.getGroupAttendance(group.id, user.id)
	}

	private _survey(surveyId, group) {
		Survey survey = this.voteService.getSurvey(surveyId)
		return survey?.groupId == group.id
	}

	private _news(newsId, group) {
		News news = this.newsService.getNews(newsId)
		return news?.groupId == group.id
	}

	private _getUserId(session) {
		return session.user ? session.user.id : 0L
	}

	private _notfound(params, request) {
		long userId = this._getUserId(request.session)
		Group group = null
		if (params.gname) {
			group = this.groupService.getGroupByHomepage(params.gname)
			if (!group || group.state == Const.STATE_DISMISS) {
				return Group.class
			}
		}
		if (params.second && params.second ==~ /^[1-9]\d*$/) {
			if (params.first == "album" && !this._album(params.second, group)) {
				return Album.class
			}
			if (params.first == "meeting" && !this._meeting(params.second, group, userId)) {
				return Meeting.class
			}
			if (params.first == "photo" && !this._photo(params.second, group)) {
				return Photo.class
			}
			if (params.first == "member" && !this._user(params.second, group)) {
				return User.class
			}
			if (params.first == "vote" && !this._survey(params.second, group)) {
				return Survey.class
			}
			if (params.first == "news" && !this._news(params.second, group)) {
				return News.class
			}
		}
		if (params.third && params.third ==~ /^[1-9]\d*$/) {
			if (params.first == "meeting" && !this._meeting(params.third, group, userId)) {
				return Meeting.class
			}
			if (params.first == "member" && !this._user(params.third, group)) {
				return User.class
			}
			if (params.first == "vote" && !this._survey(params.third, group)) {
				return Survey.class
			}
			if (params.first == "news" && !this._news(params.third, group)) {
				return News.class
			}
		}
		String domain = request.getHeader("Host")
		if (!domain) {
			return null
		}
		String serverDomain = this.grailsApplication.config.app.server.domain
		String stubDomain = this.grailsApplication.config.app.stub.domain
		if (params.controller == "user" && params.action == "stub"
				&& AppUtil.isShortLink(params.stub)) {
			if (serverDomain != stubDomain && this._isDomain(domain, serverDomain)) {
				return Object.class
			}
			if (this._isDomain(domain, stubDomain) && !this.shortLinkService.
					getSkeletonLink(params.stub)) {
				return ShortLink.class
			}
//			return Object.class
		} else {
//			if (!this._isDomain(domain, this.grailsApplication.config.
//					app.server.domain)) {
//				return Object.class
//			}
			if (serverDomain != stubDomain && this._isDomain(domain, stubDomain)) {
				return Object.class
			}
		}
		return null
	}

	private _notfound(params) {
		if (params.uid && !this.userService.getUser(params.uid)) {
			return Const.USER_NOT_EXIST
		}
		if (params.gid && !this.groupService.getGroup(params.gid)) {
			return Const.GROUP_NOT_EXIST
		}
		if (params.mid && !this.meetingService.getMeeting(params.mid)) {
			return Const.MEETING_NOT_EXIST
		}
		if (params.aid && !this.albumService.getAlbum(params.aid)) {
			return Const.OBJECT_NOT_EXIST
		}
		if (params.pid && !this.photoService.getPhoto(params.pid)) {
			return Const.OBJECT_NOT_EXIST
		}
		if (params.qid && !this.questionService.getQuestion(params.qid)) {
			return Const.OBJECT_NOT_EXIST
		}
		if (params.fid && !this.meetingService.getFee(null, params.fid)) {
			return Const.OBJECT_NOT_EXIST
		}
		if (params.rid && ((params.controller == "meeting" &&
				!this.meetingService.getRepeat(null, params.rid) ||
				(params.controller == "message" &&
						!this.messageService.getMessage(params.rid))))) {
			return Const.OBJECT_NOT_EXIST
		}
		if (params.sid && ((params.controller == "vote" && !this.voteService.getSurvey(params.sid))
				|| (params.controller == "share" && !this.shareService.getShare(params.sid)))) {
			return Const.OBJECT_NOT_EXIST
		}
		if (params.nid && !this.newsService.getNews(params.nid)) {
			return Const.OBJECT_NOT_EXIST
		}
		return Const.SUCCESS
	}

	private _isDomain(source, target) {
		return source == target || source?.indexOf(target) >= 0 ||
				target?.indexOf(source) >= 0
	}

	def filters = {

		notfound(controller: '*', action: '*') {
			before = {
				this._init()
				if (actionName?.startsWith("rest_")) {
					int code = this._notfound(params)
					if (code > 0) {
						return true
					} else {
						response.sendRedirect(AppUtil.buildRequestUrl(
								"error", "handle500", [code: code]))
						return false
					}
				}
				def notfound = this._notfound(params, request)
				if (!notfound) {
					return true
				}
				response.sendRedirect(AppUtil.buildRequestUrl("error",
						"handle404", [error: AppUtil.encodeAsGBK(
						this.notfoundMap.get(notfound))], true))
				return false
			}
		}

	}

}
