package com.meetup

import org.apache.commons.lang.StringUtils

class PermissionFilters {

	def dependsOn = [NotFoundFilters]

	def groupService

	def meetingService

	def albumService

	def photoService

	def questionService

	def userService

	def hdfsService

	def configService

	def grailsApplication

	def newsService

	def voteService

	def shareService

	private _getUserId(session) {
		return session.user ? session.user.id : 0L
	}

	private _getGroup(params, meeting) {
		Group group = meeting?.group
		if (!group && params.gname) {
			group = this.groupService.getGroupByHomepage(params.gname)
		}
		if (!group && params.gid) {
			group = this.groupService.getGroup(params.gid)
		}
		if (!group && params.aid) {
			group = this.albumService.getAlbum(params.aid)?.group
		}
		if (!group && params.pid) {
			group = this.photoService.getPhoto(params.pid)?.album?.group
		}
		if (!group && params.qid) {
			Question question = this.questionService.getQuestion(params.qid)
			if (question instanceof GQuestion) {
				group = question?.group
			}
		}
		if (!group && params.nid) {
			group = this.newsService.getNews(params.nid)?.group
		}
		if (!group && params.sid) {
			if (params.controller == "vote") {
				group = this.voteService.getSurvey(params.sid)?.group
			}
			if (params.controller == "share") {
				group = this.shareService.getShare(params.sid)?.group
			}
		}
		return group
	}

	private _getMeeting(params) {
		Meeting meeting = null
		if (params.gname) {
			if (params.first && params.first == "meeting") {
				if (params.second && params.second ==~ /^[1-9]\d*$/) {
					meeting = this.meetingService.getMeeting(params.second)
				}
				if (params.third && params.third ==~ /^[1-9]\d*$/) {
					meeting = this.meetingService.getMeeting(params.third)
				}
			}
		}
		if (!meeting && params.mid) {
			meeting = this.meetingService.getMeeting(params.mid)
		}
		if (!meeting && params.aid) {
			meeting = this.albumService.getAlbum(params.aid)?.meeting
		}
		if (!meeting && params.pid) {
			meeting = this.photoService.getPhoto(params.pid)?.album?.meeting
		}
		if (!meeting && params.qid) {
			Question question = this.questionService.getQuestion(params.qid)
			if (question instanceof MQuestion) {
				meeting = question?.meeting
			}
		}
		if (!meeting && params.fid) {
			meeting = this.meetingService.getFee(null, params.fid)?.meeting
		}
		if (!meeting && params.rid && params.controller == "meeting") {
			meeting = this.meetingService.getRepeat(null, params.rid)?.meeting
		}
		return meeting
	}

	private _viewPermission(response, params, userId) {
		Meeting meeting = this._getMeeting(params)
		if (meeting?.state == Const.STATE_DISMISS &&
				!this.userService.isGroupManagerCreatorOrMeetingCreator(
						userId, meeting?.groupId, meeting?.id)) {
			response.sendRedirect(AppUtil.buildRequestUrl("error", "handle500",
					[code: Const.MEETING_CANCELED, error: AppUtil.encodeAsGBK(
							this.grailsApplication.config.
									app.error.msg.meeting.canceled)]))
			return false
		}
//		if (meeting?.state == Const.STATE_DRAFT &&
//				!this.userService.isMeetingCreator(userId, meeting?.id)) {
//			response.sendRedirect(AppUtil.buildRequestUrl("error", "handle500",
//					[code: Const.PERMISSION_DENIED, error: AppUtil.encodeAsGBK(
//							this.grailsApplication.config.
//									app.error.msg.permission.denied)]))
//			return false
//		}
		if ([Const.STATE_DRAFT, Const.STATE_APPLY_PENDING, Const.STATE_APPLY_REFUSED]
				.contains(meeting?.state) && !this.userService.isGroupOrMeetingCreator(
				userId, meeting?.groupId, meeting?.id)) {
			response.sendRedirect(AppUtil.buildRequestUrl("error", "handle500",
					[code: Const.PERMISSION_DENIED, error: AppUtil.encodeAsGBK(
							this.grailsApplication.config.
									app.error.msg.permission.denied)]))
			return false
		}
		Group group = this._getGroup(params, meeting)
		if (group?.state == Const.STATE_DISMISS) {
			response.sendRedirect(AppUtil.buildRequestUrl("error", "handle500",
					[code: Const.GROUP_DISMISSED, error: AppUtil.encodeAsGBK(
							this.grailsApplication.config.
									app.error.msg.group.dismissed)]))
			return false
		}
		if ([Const.STATE_APPLY_PENDING, Const.STATE_APPLY_REFUSED].contains(
				group?.state) && !this.userService.isGroupCreator(userId, group?.id) &&
				!this.userService.isAdministrator(userId)) {
			response.sendRedirect(AppUtil.buildRequestUrl("error", "handle500",
					[code: Const.PERMISSION_DENIED, error: AppUtil.encodeAsGBK(
							this.grailsApplication.config.
									app.error.msg.permission.denied)]))
			return false
		}
		if (params.controller == "group" && params.action == "index") {
			return true
		}
		if (this.userService.isViewGroupPermitted(userId, group)) {
			return true
		}
		response.sendRedirect(AppUtil.buildRequestUrl("error", "handle500",
				[code: Const.PERMISSION_DENIED, error: AppUtil.encodeAsGBK(
						this.grailsApplication.config.
								app.error.msg.group.view.by.member)]))
		return false
	}

	private _viewHdfs(response, params, userId, url) {
		if (this.hdfsService.isOriginal(url)) {
			url = this.hdfsService.parseUrl(url)
			def finder = (url =~ /^\/photo\/[1-9]\d*\/[1-9]\d*\//)
			if (finder.find()) {
				long groupId = url.split("/")[2].toLong()
				if (groupId > 0L) {
					params.gid = groupId
					return this._viewPermission(response, params, userId)
				}
			}
		}
		return true
	}

	private _viewMessage(response, params, userId) {
		if (this.userService.isViewMessagePermitted(userId, params.rid)) {
			return true
		}
		response.sendRedirect(AppUtil.buildRequestUrl("error", "handle500",
				[code: Const.PERMISSION_DENIED, error: AppUtil.encodeAsGBK(
						this.grailsApplication.config.
								app.error.msg.permission.denied)]))
		return false
	}

	def filters = {

		permission(controllerExclude: 'admin', action: '*') {
			before = {
				if (!controllerName) {
					return true
				}
				def actions = this.configService.getPermissionExcludeActions().
						get(StringUtils.capitalize(controllerName))
				if (!actions) {
					actions = this.configService.getPermissionIncludeActions().
							get(StringUtils.capitalize(controllerName))
					if (!actions || !actions.contains(actionName)) {
						return true
					}
				} else {
					if (actions.contains(actionName)) {
						return true
					}
				}
				long userId = this._getUserId(session)
				if (controllerName == "hdfs") {
					return this._viewHdfs(response, params, userId, request.forwardURI)
				} else if (controllerName == "message") {
					return this._viewMessage(response, params, userId)
				} else {
					return this._viewPermission(response, params, userId)
				}
			}
		}

	}

}
