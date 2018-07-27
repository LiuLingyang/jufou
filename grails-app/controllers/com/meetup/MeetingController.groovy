package com.meetup

import grails.converters.JSON
import org.springframework.beans.BeanUtils

class MeetingController extends AbstractController {

	def contactService

	def questionService

	def tagService

	def gradeService

	def applicationService

	def beforeInterceptor = [action: this.&_meetingPermission,
							 only  : ["rest_cancel", "_updateMeeting", "rest_updateReply",
									  "_saveMeeting", "create", "rest_delete", "rest_grade",
									  "rest_approve", "rest_proposals"]]

//	private _creatorPermission() {
//		long userId = this._getUserId()
//		if (actionName == "create") {
//			Group group = this.groupService.getGroupByHomepage(params.gname)
//			if (this.userService.isGroupManagerOrCreator(userId, group.id)) {
//				return true
//			}
//			forward(controller: "group", action: "index")
//		} else if (actionName.startsWith("_save")) {
//			long groupId = params.gid.toLong()
//			if (params.draft) {
//				if (this.userService.isAttendGroupOrMeeting(userId, groupId, 0L)) {
//					return true
//				}
//			} else {
//				if (this.userService.isGroupManagerOrCreator(userId, groupId)) {
//					return true
//				}
//			}
//			this._response(Const.PERMISSION_DENIED)
//		} else if (actionName.endsWith("_grade")) {
//			if (this.userService.isAttendGroupOrMeeting(userId, 0L, params.mid.toLong())) {
//				return true
//			}
//			this._response(Const.PERMISSION_DENIED)
//		} else {
//			Meeting meeting = this.meetingService.getMeeting(params.mid)
//			if (this.userService.isGroupManagerCreatorOrMeetingCreator(
//					userId, meeting.groupId, meeting.id)) {
//				return true
//			}
//			this._response(Const.PERMISSION_DENIED)
//		}
//		return false
//	}

	private _meetingPermission() {
		long userId = this._getUserId()
		if (actionName == "create") {
			Group group = this.groupService.getGroupByHomepage(params.gname)
			if (this.userService.isAttendGroupOrMeeting(userId, group.id, 0L)) {
				return true
			}
			forward(controller: "group", action: "index")
		} else if (actionName.startsWith("_save") || actionName.endsWith("_proposals")) {
			if (this.userService.isAttendGroupOrMeeting(userId, params.gid.toLong(), 0L)) {
				return true
			}
			this._response(Const.PERMISSION_DENIED)
		} else if (actionName.endsWith("_grade")) {
			if (this.userService.isAttendGroupOrMeeting(userId, 0L, params.mid.toLong())) {
				return true
			}
			this._response(Const.PERMISSION_DENIED)
		} else {
			Meeting meeting = this.meetingService.getMeeting(params.mid)
			if (actionName.endsWith("_updateReply")) {
				if (this.userService.isGroupManagerCreatorOrMeetingCreator(
						userId, meeting.groupId, meeting.id)) {
					return true
				}
			} else if (actionName.endsWith("_approve")) {
				if (this.userService.isGroupCreator(userId, meeting.groupId)) {
					return true
				}
			} else {
				if (this.userService.isGroupOrMeetingCreator(
						userId, meeting.groupId, meeting.id)) {
					return true
				}
			}
			this._response(Const.PERMISSION_DENIED)
		}
		return false
	}

	def create() {
		def model = this._common(params.gname)
		model = this._categories(model)
		this._render(view: "create", model: this._model(model))
	}

	def show() {
		def model = this._model(params.second)
		model.refuseList = this.attendanceService.listAttendances({
			meeting {
				eq("id", model.meeting.id)
			}
			inList("state", [Const.MEETING_ATTEND_STATE_REFUSE,
							 Const.MEETING_ATTEND_STATE_REFUSED])
		}, Meeting.class)*.attendee
		model.attendList = this.attendanceService.listAttendances({
			meeting {
				eq("id", model.meeting.id)
			}
			inList("state", [Const.MEETING_ATTEND_STATE_SIGNED,
							 Const.MEETING_ATTEND_STATE_ACCEPTED])
		}, Meeting.class)
		long userId = this._getUserId()
		model.state = this._state(model.meeting.id, userId)
		model.attendable = this._attendable(params.second)[0]
		String[] ss = null
		if (this._checkInviteCookie()) {
			ss = this._parseInviteCookies(true)
			if (!ss) {
				this._clearInvite(false)
				redirect(controller: "error", action: "handle500",
						params: [code : Const.TOKEN_EXPIRED_OR_DAMAGED,
								 error: AppUtil.encodeAsGBK(this.grailsApplication.config.
										 app.error.msg.invite.cookie.damaged)])
				return
			}
		}
		model.isInvited = ss && userId > 0L ? (this._isInvited(ss[0].toLong(),
				model.meeting.groupId) || this.attendanceService.getMeetingAttendance(
				model.meeting.id, userId)?.invited) : false
		this._render(view: "show", model: model)
	}

//	def share() {
//		this._render(view: "share", model:
//				[group: this.groupService.getGroupByHomepage(params.gname)],
//				meeting: this.meetingService.getMeeting(params.third))
//	}

	private _isInvited(inviterId, groupId) {
//		User user = this._getUser()
//		return (ss[1] == user.email || ss[1] == user.mobile) &&
//				this.groupService.checkRole(groupId, ss[0].toLong(),
//						[Const.ROLE_CREATOR, Const.ROLE_MANAGER])
//		return this.groupService.checkRole(groupId, inviterId,
//				[Const.ROLE_CREATOR, Const.ROLE_MANAGER])
		return this.userService.isGroupManagerOrCreator(inviterId, groupId)
	}

	private _model(String meetingId, boolean full = true) {
		def model = this._common(params.gname)
		Meeting meeting = this.meetingService.getMeeting(meetingId)
		model.meeting = meeting
		if (full) {
			model.tags = this.tagService.listMeetingTags([meeting.id])
			model.questions = this.questionService.listMeetingQuestions(meeting.id)
			model.fee = meeting.fee
			model.repeat = meeting.repeat
		}
		return this._model(model)
	}

	def update() {
		this._render(view: "update", model:
				this._categories(this._model(params.third)))
	}

	def copy() {
		this._render(view: "copy", model:
				this._categories(this._model(params.third)))
	}

	def reply() {
		def model = this._model(params.third, false)
		MAttendance attendance = this.attendanceService.
				getMeetingAttendance(model.meeting.id, this._getUserId())
		model.reply = attendance.state
		this._render(view: "reply", model: model)
	}

	// 活动回复列表
	def answer() {
		def model = this._common(params.gname)
		model.meeting = this.meetingService.getMeeting(params.third)
		this._render(view: "answer", model: this._model(model))
	}

	// 打印活动参与者列表
	//def print() {
	//	def model = [meeting: this.meetingService.getMeeting(params.third)]
	//	model.attendList = this.attendanceService.listAttendances({
	//		meeting {
	//			eq("id", model.meeting.id)
	//		}
	//		inList("state", [Const.MEETING_ATTEND_STATE_SIGNED,
	//						 Const.MEETING_ATTEND_STATE_ACCEPTED])
	//	}, Meeting.class)*.attendee
	//	this._render(view: "print", model: this._model(model))
	//}

	// 打印活动参与者列表
	def print() {
		def model = [meeting: this.meetingService.getMeeting(params.third)]
		def a = this.attendanceService.listAttendances({
			meeting {
				eq("id", model.meeting.id)
			}
			inList("state", [Const.MEETING_ATTEND_STATE_SIGNED,
							 Const.MEETING_ATTEND_STATE_ACCEPTED])
		}, Meeting.class)
		model.observerList = a*.observer
		model.attendList = a*.attendee
		model.answersList= a*.answers
		this._render(view: "print", model: this._model(model))
	}

	def detail() {
		Meeting meeting = this.meetingService.getMeeting(params.third)
		this._render(view: "detail", model: [meeting: meeting])
	}

	def weixin() {
		Meeting meeting = this.meetingService.getMeeting(params.third)
		this._render(view: "weixin", model: [meeting: meeting,
											 fee    : meeting.fee, repeat: meeting.repeat])
	}

//	def rest_list() {
////        def now = new Date()
////        def start = new Date(year : now.year, month: now.month, date: now.date)
////        def end = start + 24 * 60 * 60 * 1000L - 1
//		def meetings = Meeting.createCriteria().list {
//			if (params.gid) {
//				group {
//					eq("id", params.gid.toLong())
//				}
//			}
//			if (params.upcoming) {
//				gt("startTime", System.currentTimeMillis())
//			}
//			if (params.started) {
//				lt("startTime", System.currentTimeMillis())
//				gt("endTime", System.currentTimeMillis())
//			}
//			if (params.completed) {
//				lt("endTime", System.currentTimeMillis())
//			}
//		}
//		this._response(Const.SUCCESS, [total: meetings.size(), list: meetings.sort { meeting ->
//			if (params.upcoming) {
//				meeting.startTime - System.currentTimeMillis()
//			}
//			if (params.started) {
//				System.currentTimeMillis() - meeting.startTime
//			}
//			if (params.completed) {
//				System.currentTimeMillis() - meeting.endTime
//			}
//		}])
//	}

	private _filterDetails() {
		return this._filterRichText("details")
	}

	private _saveMeeting(state) {
		if (!this._filterDetails()) {
			this._response(Const.XSS_ATTACK)
			return
		}
		Meeting meeting = new Meeting(params)
		Group group = this.groupService.getGroup(params.gid)
		meeting.group = group
		User organizer = this._getUser()
		meeting.organizer = organizer
		MAttendance attendance = new MAttendance(attendee: organizer,
				state: Const.MEETING_ATTEND_STATE_SIGNED)
		attendance.role = Const.ROLE_CREATOR
		meeting.addToAttendances(attendance)
		meeting.joinCount = 1

		meeting.message = params.message.toInteger() > 0
		meeting.state = state

		this.meetingService.setMeetingExt(meeting, params)
		this.meetingService.createMeeting(meeting, params, request)
		this._response(Const.SUCCESS, meeting)
	}

	// 创建活动
	def rest_create() {
		int state = this.userService.isGroupCreator(this._getUserId(),
				params.gid.toLong()) ? Const.STATE_NORMAL : Const.STATE_APPLY_PENDING
		this._saveMeeting(state)
	}

	// 活动存为草稿
	def rest_draft() {
		if (params.mid) {
			this._updateMeeting(true)
		} else {
			this._saveMeeting(Const.STATE_DRAFT)
		}
	}

	// 取消活动
	def rest_cancel() {
		this._response(Const.SUCCESS, this.meetingService.
				cancelMeeting(params.mid, params.canceled?.toBoolean()))
	}

	def rest_delete() {
		this.meetingService.deleteMeeting(params.mid)
		this._response(Const.SUCCESS)
	}

	private _updateMeeting(draft) {
		if (!this._filterDetails()) {
			this._response(Const.XSS_ATTACK)
			return
		}
		this._position()
		Meeting meeting = this.meetingService.updateMeeting(
				params.mid, this._getUserId(), params, draft, request)
		this._response(Const.SUCCESS, meeting)
	}

	// 更新活动
	def rest_update() {
		this._updateMeeting(false)
	}

	// 搜索活动
	def rest_search() {
		long userId = this._getUserId()
		Date date = params.time ? Date.parse("yyyy-MM-dd", params.time) : null
		Date startDate = params.startTime ?
				Date.parse("yyyy-MM-dd", params.startTime) : null
		Date endDate = params.endTime ?
				Date.parse("yyyy-MM-dd", params.endTime) : null
		params.tag = params.tag ? params.tag : (params.gid ?
				this.tagService.getGroupCustomTag(params.gid.toLong()) : null)
		def groupIds = this._customGroupIds(params.tag, true)
		def meetingIds = params.keyword ? this.meetingService.listMeetings({
			projections {
				distinct("id")
			}
			tags {
				like("name", "%" + params.keyword + "%")
			}
		}) : null
		def area = this._buildDistanceArea()
		def callable = { count, category ->
			projections {
				if (count) {
					countDistinct("id")
				} else {
					if (area) {
						sqlProjection("distinct this_.id as mid, " + String.format(
								Const.DISTANCE_COMPUTATION, "this_.latitude",
								"this_.longitude", params.latitude.toDouble(),
								params.longitude.toDouble(), Const.EARTH_RADIUS) +
								" as distance" + this._buildDistanceSql(params.sort,
								Meeting.class), ["mid", "distance"], [LONG, DOUBLE])
					} else {
						distinct("id")
						this.configService.getSortProperties(params.sort)?.each { prop ->
							property(prop)
						}
					}
				}
			}
			if (area) {
				between("latitude", area[0], area[2])
				between("longitude", area[1], area[3])
			}
			if (!category && params.category) {
				eq("category", params.category)
			}
			if (params.province) {
				eq("province", params.province)
			}
			if (params.city) {
				eq("city", params.city)
			}
			if (params.area) {
				eq("area", params.area)
			}
			if (params.time) {
				lt("startTime", date.next().time)
				or {
					and {
						le("endTime", 0L)
						between("startTime", date.time, date.next().time - 1)
					}
					gt("endTime", date.time)
				}
			}
			if (params.startTime) {
				lt("startTime", endDate.next().time)
			}
			if (params.endTime) {
				or {
					and {
						le("endTime", 0L)
						between("startTime", startDate.time, endDate.next().time - 1)
					}
					gt("endTime", startDate.time)
				}
			}
			if (params.keyword) {
				or {
					like("title", "%" + params.keyword + "%")
					if (meetingIds?.size() > 0) {
						inList("id", meetingIds)
					}
				}
			}
			group {
//				if (params.category) {
//					inList("id", this.groupService.
//							getGroupByCategory(params.category)*.id)
//				}
				if (params.tag) {
					inList("id", groupIds?.size() > 0 ? groupIds : [0L])
				}
				or {
					eq("viewPermission", Const.VIEW_BY_ALL)
					and {
						eq("viewPermission", Const.VIEW_BY_MEMBER)
						attendances {
							attendee {
								eq("id", userId)
							}
							eq("state", Const.GROUP_ATTEND_STATE_ACCEPTED)
						}
					}
				}
			}
			eq("state", Const.STATE_NORMAL)
//			resultTransformer(Criteria.DISTINCT_ROOT_ENTITY)
		}
		int total = this.meetingService.countMeetings(callable.curry(true, false), true)
		def mids = this.meetingService.listMeetings(callable.curry(false, false),
				params.offset, params.limit, params.sort, params.order)
		def meetings = this._buildDistinct(mids, !!area)
		this._computeDistance(meetings)
		mids = area ? this.meetingService.listMeetings(callable.curry(false, true)) :
				this.meetingService.listMeetings(callable.curry(false, true))
		def categories = this.meetingService.listMeetings({
			projections {
				count("id")
				groupProperty("category")
			}
			inList("id", mids?.size() > 0 ? mids.collect {
				it instanceof Object[] ? it[0] : it
			} : [0L])
		})?.collectEntries {
			new AbstractMap.SimpleEntry(it[1], it[0])
		}
		def result = [total: total, list: meetings, count: categories]
		if (this._userAgent() == Const.USER_AGENT_PC) {
			def attendees = meetings.collectEntries { item ->
				new AbstractMap.SimpleEntry(item.id,
						this.attendanceService.
								listAttendances({
									meeting {
										eq("id", item.id)
									}
									inList("state", [Const.MEETING_ATTEND_STATE_SIGNED,
													 Const.MEETING_ATTEND_STATE_ACCEPTED])
								}, Meeting.class, 0, 5, "attendTime", "desc")*.attendee)
			}
			result.map = attendees
		}
		if (this._userAgent() == Const.USER_AGENT_MOBILE) {
//			def states = [:]
//			meetings.each { meeting ->
//				int state = this._state(meeting.id, userId)
//				states.put(meeting.id, state)
//			}
			result.state = this._states(meetings*.id, userId)
		}
		this._response(Const.SUCCESS, this._simplify(result))
	}

	def _getMeetingsByTime(gids, startDate, endDate) {
		def meetings = this.meetingService.listMeetings({
			group {
				inList("id", gids?.size() > 0 ? gids : [0L])
			}
			if (startDate) {
				lt("startTime", endDate.time)
				or {
					and {
						le("endTime", 0L)
						between("startTime", startDate.time, endDate.time - 1)
					}
					ge("endTime", startDate.time)
				}
			} else {
				ge("startTime", endDate.time)
			}
			eq("state", Const.STATE_NORMAL)
		}, null, null, "startTime", "asc")
		this._computeDistance(meetings)
		return meetings
	}

	private _getAttendedGroupIds(userId) {
		return this.attendanceService.listAttendances({
			attendee {
				eq("id", userId)
			}
			group {
				eq("state", Const.STATE_NORMAL)
			}
		}, Group.class)*.groupId
	}

	// 获取用户所在组织的活动列表
	def rest_getGroupMeetings() {
		def gids = params.gid ? [params.gid.toLong()] :
				this._getAttendedGroupIds(this._getUserId())
		def result = [:]
		Date date = Date.parse("yyyy-MM-dd", params.day ?
				params.day : new Date().format("yyyy-MM-dd"))
		def dayMeetings = this._getMeetingsByTime(gids, date, date.next())
		String today = new Date().format("yyyy-MM-dd")
		result.put(today == params.day ? "today" : params.day, dayMeetings)
		if (today == params.day) {
			Date startDate = date.minus(date.getAt(Calendar.DAY_OF_WEEK) - 1)
			Date endDate = startDate.plus(7)
			def weekMeetings = this._getMeetingsByTime(gids, startDate, endDate)
			result.put("week", weekMeetings)

			Calendar calendar = date.toCalendar()
			calendar.set(Calendar.DAY_OF_MONTH, 1)
			startDate = calendar.getTime()
			calendar.add(Calendar.MONTH, 1)
			endDate = calendar.getTime()

			def monthMeetings = this._getMeetingsByTime(gids, startDate, endDate)
			result.put("month", monthMeetings)

			def laterMeetings = this._getMeetingsByTime(gids, null, endDate)
			result.put("later", laterMeetings)
		}
		this._response(Const.SUCCESS, result)
	}

	// 获取用户所在组织的已经结束的活动列表
	def rest_getEndedGroupMeetings() {
		def gids = this._getAttendedGroupIds(this._getUserId())
		Date date = Date.parse("yyyy-MM-dd", params.day)
		def meetings = this.meetingService.listMeetings({
			group {
				inList("id", gids?.size() > 0 ? gids : [0L])
			}
			or {
				and {
					le("endTime", 0L)
					lt("startTime", date.time)
				}
				between("endTime", 1L, date.time - 1)
			}
			eq("state", Const.STATE_NORMAL)
		}, null, null, "endTime", "desc")
		this._computeDistance(meetings)
		this._response(Const.SUCCESS, meetings)
	}

	// 获取用户参加的活动
	def rest_getAttendedMeetings() {
		def callable = {
			attendances {
				attendee {
					eq("id", this._getUserId())
				}
				inList("state", [Const.MEETING_ATTEND_STATE_SIGNED,
								 Const.MEETING_ATTEND_STATE_ACCEPTED])
			}
			eq("state", Const.STATE_NORMAL)
		}
		int total = this.meetingService.countMeetings(callable)
		def meetings = this.meetingService.listMeetings(callable,
				params.offset, params.limit, params.sort, params.order)
		this._computeDistance(meetings)
		this._response(Const.SUCCESS, [total: total, list: meetings])
	}

	// 获取活动参与者列表
	def rest_attendees() {
		def callable = {
			meeting {
				eq("id", params.mid.toLong())
			}
			if (params.type?.toInteger() == 0) {
				inList("state", [Const.MEETING_ATTEND_STATE_SIGNED,
								 Const.MEETING_ATTEND_STATE_ACCEPTED])
			}
			if (params.type?.toInteger() == 1) {
				inList("state", [Const.MEETING_ATTEND_STATE_REFUSED,
								 Const.MEETING_ATTEND_STATE_REFUSE])
			}
		}
		int total = this.attendanceService.countAttendances(
				callable, Meeting.class)
		def attendances = this.attendanceService.listAttendances(
				callable, Meeting.class, params.offset, params.limit,
				params.sort, params.order)
		this._response(Const.SUCCESS, [total: total, list: attendances])
	}

	// 获取当前登录用户的活动参与信息
	def rest_attendee() {
		MAttendance attendance = this.attendanceService.getMeetingAttendance(
				params.mid.toLong(), this._getUserId())
		this._response(Const.SUCCESS, attendance)
	}

	def rest_attended() {
		def mids = params.mids?.split(",").toList().collect { meetingId ->
			meetingId?.toLong()
		}
		this._response(Const.SUCCESS, this._states(mids, this._getUserId()))
	}

	private _attendable(Meeting meeting) {
		long userId = this._getUserId()
		if (userId <= 0L) {
			return [Const.NOT_LOGINED, false]
		}
		MAttendance mattendance = this.attendanceService.
				getMeetingAttendance(meeting.id, userId)
		if (mattendance?.state == Const.MEETING_ATTEND_STATE_REFUSED) {
			return [Const.REPLY_FORBIDDEN, false]
		}
		GAttendance gattendance = this.attendanceService.getGroupAttendanceByStates(
				meeting.groupId, userId, [Const.GROUP_ATTEND_STATE_ACCEPTED])
		if (meeting.joinPermission == Const.JOIN_BY_MEMBER && !gattendance) {
			return [Const.NOT_GROUP_MEMBER, false]
		}
		boolean isInvited = false
		if (meeting.joinPermission == Const.JOIN_BY_MEMBER_INVITE && !gattendance) {
			if (!mattendance || !mattendance.invited) {
				if (!this._checkInviteCookie()) {
					return [Const.PERMISSION_DENIED, false]
				}
				String[] ss = this._parseInviteCookies(true)
				if (!ss) {
					return [Const.TOKEN_EXPIRED_OR_DAMAGED, false]
				}
				if (!this._isInvited(ss[0].toLong(), meeting.groupId)) {
					return [Const.PERMISSION_DENIED, false]
				}
			}
			isInvited = true
		}
		return [Const.SUCCESS, isInvited]
	}

	private _attendable(String meetingId) {
		Meeting meeting = this.meetingService.getMeeting(meetingId)
//		if (meeting.state == Const.STATE_DISMISS) {
//			return [Const.MEETING_CANCELED, meeting]
//		}
		if (meeting.state == Const.STATE_SIGNUP_STOPPED) {
			return [Const.SIGNUP_STOPPED, meeting]
		}
		if (meeting.joinLimit > 0 && meeting.joinCount >= meeting.joinLimit) {
			return [Const.JOIN_LIMIT_BEYOND, meeting]
		}
		if (meeting.signupStartTime != 0 &&
				System.currentTimeMillis() < meeting.signupStartTime) {
			return [Const.SIGNUP_NOT_STARTED, meeting]
		}
		if (meeting.signupEndTime != 0 &&
				System.currentTimeMillis() > meeting.signupEndTime) {
			return [Const.SIGNUP_ENDED, meeting]
		}
		int state = this._attendable(meeting)[0]
		if (state < 0) {
			return [state > -100 ? Const.NOT_INVITED : state, meeting]
		}
		return [Const.SUCCESS, meeting]
	}

	def rest_attendable() {
		def result = this._attendable(params.mid)
		if (result[0] < 0) {
			this._response(result[0])
			return
		}
		int state = this._state(params.mid.toLong(), this._getUserId())
		this._response(Const.SUCCESS, [signupEndTime: result[1].signupEndTime,
									   joinRemaining: result[1].joinLimit - result[1].joinCount,
									   state        : state])
	}

	// 获取组织的活动列表
	def rest_list() {
//		long time = System.currentTimeMillis()
//		def callable = { count ->
//			group {
//				eq("id", params.gid.toLong())
//			}
//			if (params.type.toInteger() == 0) {
//				or {
//					ge("startTime", time)
//					and {
//						lt("startTime", time)
//						gt("endTime", time)
//					}
//					and {
//						le("endTime", 0L)
//						between("startTime", this._getMeetingEndTime(0L) + 1, time - 1)
//					}
//				}
//			}
//			if (params.type.toInteger() == 1) {
//				or {
//					between("endTime", 1L, time - 1)
//					and {
//						le("endTime", 0L)
//						le("startTime", this._getMeetingEndTime(0L))
//					}
//				}
//			}
//			eq("state", params.type.toInteger() == 2 ?
//				Const.STATE_DRAFT : Const.STATE_NORMAL)
//			if (!count) {
//				order("top", "desc")
//				order(params.sort ? params.sort : "startTime",
//						params.order ? params.order : "desc")
//			}
//		}
		long groupId = params.gid.toLong()
//		String tag = this.tagService.getGroupCustomTag(groupId)
//		def groupIds = tag ? this._customGroupIds(tag, true) : [groupId]
		int type = params.type.toInteger()
		int total = this.meetingService.countMeetings(
				this._listGroupMeetingCallable(groupId, type))
		def meetings = this.meetingService.listMeetings(
				this._listGroupMeetingCallable(groupId, type),
				params.offset, params.limit, params.sort, params.order)
		this._computeDistance(meetings)
		def result = [total: total, list: meetings]
		if (this._userAgent() == Const.USER_AGENT_PC) {
			def attendees = meetings.collectEntries { item ->
				def attendances = this.attendanceService.listAttendances({
					meeting {
						eq("id", item.id)
					}
					inList("state", [Const.MEETING_ATTEND_STATE_SIGNED,
									 Const.MEETING_ATTEND_STATE_ACCEPTED])
				}, Meeting.class, 0, 5, "attendTime", "asc")
				new AbstractMap.SimpleEntry(item.id, attendances*.attendee)
			}
			result.map = attendees
			result.state = this._states(meetings*.id, this._getUserId())
		}
		this._response(Const.SUCCESS, this._simplify(result))
	}

	def rest_proposals() {
		long groupId = params.gid.toLong()
		long userId = this._getUserId()
		def callable = {
			group {
				eq("id", groupId)
			}
			if (!this.userService.isGroupCreator(userId, groupId)) {
				organizer {
					eq("id", userId)
				}
			}
			inList("state", [Const.STATE_APPLY_PENDING, Const.STATE_APPLY_REFUSED])
		}
		int total = this.meetingService.countMeetings(callable)
		def meetings = this.meetingService.listMeetings(callable, params.offset,
				params.limit, params.sort, params.order)
		this._response(Const.SUCCESS, this._simplify([total: total, list: meetings]))
	}

	def rest_approve() {
		Meeting meeting = this.meetingService.getMeeting(params.mid)
		if (!meeting.application) {
			this._response(Const.APPLICATION_NOT_EXIST)
			return
		}
		this.applicationService.approveMeetingApplication(meeting.application.id,
				params.state.toInteger() <= 0, params.reason, this._getUser())
		this._response(Const.SUCCESS, meeting)
	}

	// 活动置顶
	def rest_top() {
		Meeting meeting = this.meetingService.updateMeeting(
				params.mid, [top: params.topped.toInteger() > 0])
		this._response(Const.SUCCESS, meeting)
	}

	// 回复活动
	def rest_reply() {
		Meeting meeting = this.meetingService.getMeeting(params.mid)
		if (meeting.state == Const.STATE_SIGNUP_STOPPED) {
			this._response(Const.SIGNUP_STOPPED)
			return
		}
		if ((meeting.signupStartTime != 0 &&
				System.currentTimeMillis() < meeting.signupStartTime)
				|| (meeting.signupEndTime != 0 &&
				System.currentTimeMillis() > meeting.signupEndTime)) {
			this._response(Const.SIGNUP_TIME_BEYOND)
			return
		}
		if (params.state.toInteger() > 0 && meeting.joinLimit > 0
				&& meeting.joinCount >= meeting.joinLimit) {
			this._response(Const.JOIN_LIMIT_BEYOND)
			return
		}
		def attendable = this._attendable(meeting)
		if (attendable[0] < 0) {
			this._response(attendable[0] == Const.NOT_GROUP_MEMBER ?
					Const.PERMISSION_DENIED : attendable[0])
			return
		}

		if (params.state.toInteger() > 0 && ((meeting.observerLimit > 0 &&
				params.observer.toInteger() > meeting.observerLimit) ||
				(meeting.joinLimit > 0 &&
						meeting.joinCount + params.observer.toInteger()
						> meeting.joinLimit))) {
			this._response(Const.OBSERVER_LIMIT_BEYOND)
			return
		}

		MAttendance mattendance = this.meetingService.replyMeeting(meeting,
				this._getUser(), attendable[1], this._getInvitee(), params)
		this._clearInvite()
		this._response(Const.SUCCESS, mattendance)
	}

	private _state(meetingId, userId) {
		if (userId <= 0L) {
			return Const.MEETING_ATTEND_STATE_NOREPLY
		}
		def attendance = this.attendanceService.getMeetingAttendance(meetingId, userId)
		return attendance ? attendance.state : Const.MEETING_ATTEND_STATE_NOREPLY
	}

	private _states(meetingIds, userId) {
		def attendances = this.attendanceService.getMeetingAttendances(meetingIds, userId)
		def states = attendances?.collectEntries { attendance ->
			new AbstractMap.SimpleEntry(
					attendance.meetingId, attendance.state)
		}
		(meetingIds - attendances*.meetingId).each { meetingId ->
			states.put(meetingId, Const.MEETING_ATTEND_STATE_NOREPLY)
		}
		return states
	}

	private _buildDistinct(mids, distance = false) {
		def mmap = this.meetingService.listMeetings({
			inList("id", mids?.size() > 0 ? mids.collect {
				it instanceof Object[] ? it[0] : it
			} : [0L])
		})?.collectEntries { meeting ->
			new AbstractMap.SimpleEntry(meeting.id, meeting)
		}
		return distance ? this._buildDistance(mids, mmap) :
				this._buildEntities(mids, mmap)
	}

	// 取当前登录用户指定 时间/类型 即将开始/已经结束 的活动列表
	def rest_host() {
		long userId = this._getUserId()
//		def groupIds = null
//		if (params.gid) {
//			groupIds = [params.gid.toLong()]
//		} else if (params.filter?.toInteger() != 1) {
//			groupIds = this.groupService.listGroups({
//				projections {
//					distinct("id")
//				}
//				attendances {
//					attendee {
//						eq("id", userId)
//					}
//					eq("state", Const.GROUP_ATTEND_STATE_ACCEPTED)
//				}
//				eq("state", Const.STATE_NORMAL)
//			})
//		}
//		long time = params.time ? Date.parse("yyyy-MM-dd", params.time).time :
//			System.currentTimeMillis()
//		def callable = { count ->
//			projections {
//				if (count) {
//					countDistinct("id")
//				} else {
//					distinct("id")
//					if (params.sort) {
//						property(params.sort)
//					}
//				}
//			}
//			if (params.filter?.toInteger() == 0) {
//				if (params.gid) {
//					group {
//						inList("id", groupIds)
//					}
//				} else {
//					or {
//						group {
//							inList("id", groupIds)
//						}
//						attendances {
//							attendee {
//								eq("id", userId)
//							}
//						}
//					}
//				}
//			}
//			if (params.filter?.toInteger() == 1) {
//				attendances {
//					attendee {
//						eq("id", userId)
//					}
//					inList("state", [Const.MEETING_ATTEND_STATE_SIGNED,
//							Const.MEETING_ATTEND_STATE_ACCEPTED])
//				}
//			}
//			if (params.filter?.toInteger() == 2) {
//				or {
//					not {
//						attendances {
//							attendee {
//								eq("id", userId)
//							}
//						}
//					}
//					attendances {
//						attendee {
//							eq("id", userId)
//						}
//						eq("state", Const.MEETING_ATTEND_STATE_NOREPLY)
//					}
//				}
//			}
//			if (params.filter?.toInteger() > 0 && groupIds) {
//				group {
//					inList("id", groupIds)
//				}
//			}
//			if (params.type?.toInteger() == 0) {
//				or {
//					ge("startTime", time)
//					and {
//						lt("startTime", time)
//						gt("endTime", time)
//					}
//					if (!params.time) {
//						and {
//							le("endTime", 0L)
//							between("startTime",
//									this._getMeetingEndTime(0L) + 1, time - 1)
//						}
//					}
//				}
//			}
//			if (params.type?.toInteger() == 1) {
//				or {
//					between("endTime", 1L, time - 1)
//					and {
//						le("endTime", 0L)
//						le("startTime", params.time ?
//							time - 1 : this._getMeetingEndTime(0L))
//					}
//				}
//			}
//			eq("state", Const.STATE_NORMAL)
//		}
//		int total = this.meetingService.countMeetings(callable.curry(true), true)
		def callable = this._listHostMeetingCallable(
				params.filter?.toInteger(), params.type?.toInteger(), userId,
				params.gid?.toLong(), params.time, params.sort)
		int total = this.meetingService.countMeetings(callable.curry(true), true)
//			def mids = this.meetingService.listMeetings(callable.curry(false))
//			meetings = this.meetingService.listMeetings({
//				inList("id", mids)
//			}, params.offset, params.limit, params.sort, params.order)
		def mids = this.meetingService.listMeetings(callable.curry(false),
				params.offset, params.limit, params.sort, params.order)
		def meetings = this._buildDistinct(mids)
		this._computeDistance(meetings)
		def result = [total: total, list: meetings]
		if (this._userAgent() == Const.USER_AGENT_PC) {
			def relationships = meetings*.group.unique { group ->
				group.id
			}?.collectEntries { group ->
				int relationship = this.groupService.relationship(group.id, userId)
				new AbstractMap.SimpleEntry(group.id, relationship)
			}
			result.relation = relationships
//			def states = [:]
//			meetings.each { meeting ->
//				int state = this._state(meeting.id, userId)
//				states.put(meeting.id, state)
//			}
			result.state = this._states(meetings*.id, userId)
		}
		this._response(Const.SUCCESS, this._simplify(result))
	}

	// 导出活动成员
	def rest_export() {
		Meeting meeting = this.meetingService.getMeeting(params.mid)
		String filename = this.contactService.getFilename(
				meeting.title + "活动会员", params.type)
		if (!filename) {
			this._response(Const.UNKNOWN_FORMAT)
			return
		}
		response.setContentType("application/octet-stream")
		response.setHeader("Content-disposition", "attachment;filename="
				+ new String(filename.getBytes("UTF-8"), "iso8859-1"))
		this.meetingService.exportMembers(meeting.id, params.type,
				response.getOutputStream())
	}

	// 导出活动成员问题答案
	def rest_exportanswers() {
		Meeting meeting = this.meetingService.getMeeting(params.mid)
		String filename = this.contactService.getFilename(
				meeting.title + "会员问题答案", params.type)
		if (!filename) {
			this._response(Const.UNKNOWN_FORMAT)
			return
		}
		response.setContentType("application/octet-stream")
		response.setHeader("Content-disposition", "attachment;filename="
				+ new String(filename.getBytes("UTF-8"), "iso8859-1"))
		this.meetingService.exportAnswers(meeting.id, params.type,
				response.getOutputStream())
	}

	// 停止回复活动
	def rest_stopReply() {
		Meeting meeting = this.meetingService.updateMeeting(
				params.mid, [state: Const.STATE_SIGNUP_STOPPED])
		this._response(Const.SUCCESS, meeting)
	}

	// 恢复回复活动
	def rest_resumeReply() {
		Meeting meeting = this.meetingService.updateMeeting(
				params.mid, [state: Const.STATE_NORMAL])
		this._response(Const.SUCCESS, meeting)
	}

	// 管理员修改回复信息
	def rest_updateReply() {
		MAttendance attendance = this.attendanceService.
				getMeetingAttendance(params.mid.toLong(), params.uid.toLong())
		int state = attendance.state
		boolean check = false
		if (![Const.MEETING_ATTEND_STATE_ACCEPTED,
			  Const.MEETING_ATTEND_STATE_SIGNED].contains(state)
				&& params.state.toInteger() == 1) {
			Meeting meeting = this.meetingService.getMeeting(params.mid)
			if (meeting.joinLimit > 0
					&& meeting.joinCount >= meeting.joinLimit) {
				this._response(Const.JOIN_LIMIT_BEYOND)
				return
			}
			if ((meeting.observerLimit > 0 &&
					attendance.observer > meeting.observerLimit) ||
					(meeting.joinLimit > 0 &&
							meeting.joinCount + attendance.observer
							> meeting.joinLimit)) {
				this._response(Const.OBSERVER_LIMIT_BEYOND)
				return
			}
			check = true
		}
		if ([Const.MEETING_ATTEND_STATE_ACCEPTED,
			 Const.MEETING_ATTEND_STATE_SIGNED].contains(state)
				&& params.state.toInteger() == 0) {
			check = false
		}
		attendance = this.meetingService.checkApply(attendance.id,
				check, this._getUserId())
		this._response(Const.SUCCESS, attendance)
	}

	// 取活动详情
	def rest_get() {
		Meeting meeting = this.meetingService.getMeeting(params.mid, true)
		if (!meeting) {
			this._response(Const.MEETING_NOT_EXIST)
			return
		}
		if (this._userAgent() == Const.USER_AGENT_MOBILE && !params.details) {
			Meeting simplified = new Meeting()
			BeanUtils.copyProperties(meeting, simplified, ["details"].toArray(new String[0]))
			meeting = simplified
		}
		this._response(Const.SUCCESS, this._isUpdatedSince(meeting) ? [meeting                                         : meeting,
																	   tags                                            : this.tagService.
																			   listMeetingTags([meeting.id]), questions:
																			   this.questionService.
																					   listMeetingQuestions(
																							   meeting.id)] : null)
	}

	// 回复活动问题
	def rest_answer() {
		MAttendance attendance = this.attendanceService.
				getMeetingAttendance(params.mid.toLong(), this._getUserId())
		this.questionService.answerQuestion(attendance, JSON.parse(params.answer))
		this._response(Const.SUCCESS, attendance)
	}

	def rest_fee() {
		this._response(Const.SUCCESS, this.meetingService.getFee(
				params.mid, params.fid))
	}

	def rest_repeat() {
		this._response(Const.SUCCESS, this.meetingService.getRepeat(
				params.mid, params.rid))
	}

	def rest_grade() {
		def result = this.gradeService.grade(params.mid.toLong(), this._getUserId(),
				params.grade.toInteger())
		this._response(result[0] ? Const.SUCCESS : Const.FAIL, result[1])
	}

	def rest_graded() {
		MAttendance attendance = this.attendanceService.getMeetingAttendanceByStates(
				params.mid.toLong(), this._getUserId(), [Const.MEETING_ATTEND_STATE_SIGNED,
														 Const.MEETING_ATTEND_STATE_ACCEPTED])
		this._response(Const.SUCCESS, [graded: attendance?.grade > 0])
	}

}
