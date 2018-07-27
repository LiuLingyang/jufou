package com.meetup

import org.apache.commons.lang.StringUtils
import org.hibernate.Criteria
import org.springframework.transaction.annotation.Transactional

class MeetingService extends AbstractService {

	def messageService

	def contactService

	def tagService

	def eventService

	def commentService

	def questionService

	def attendanceService

	def photoService

	def inviteService

	def gradeService

	def templateService

	def smsService

	def groupService

	def applicationService

	def userService

	@Transactional(readOnly = true)
	def listMeetings(callable, offset = null,
					 limit = null, sort = null, order = null) {
		if (sort && this.configService.getSortProperties().containsKey(sort)) {
			Criteria criteria = Meeting.createCriteria().buildCriteria(callable)
			this._buildCriteria(criteria, offset, limit, sort, order)
			return criteria.list()
		}
		def args = this._criteriaArgs(offset, limit, sort, order)
		return Meeting.createCriteria().list(args, callable)
	}

	@Transactional(readOnly = true)
	def countMeetings(callable, distinct = false) {
		if (distinct) {
			return Meeting.createCriteria().get(callable)
		} else {
			return Meeting.createCriteria().count(callable)
		}
	}

	@Transactional(readOnly = true)
	def getMeeting(meetingId, tag = false) {
		Meeting meeting = Meeting.findById(meetingId)
		if (!meeting) {
			return null
		}
		if (tag) {
			meeting.group.customTag = this.tagService.getGroupCustomTag(meeting.groupId)
		}
		return meeting
	}

	@Transactional(readOnly = true)
	def getFee(meetingId, feeId) {
		if (meetingId) {
			return Meeting.findById(meetingId).fee
		}
		if (feeId) {
			return Fee.findById(feeId)
		}
		return null
	}

	@Transactional(readOnly = true)
	def getRepeat(meetingId, repeatId) {
		if (meetingId) {
			return Meeting.findById(meetingId).repeat
		}
		if (repeatId) {
			return Repeat.findById(repeatId)
		}
		return null
	}

	@Transactional
	def saveMeeting(meeting) {
		meeting.save()
	}

	private _messageCreate(meeting, group) {
		def data = [:]
		data.name = group.name
		data.homepage = group.homepage
		data.logo = group.thumbnail
		data.mid = meeting.id
		data.title = meeting.title
		this.messageService.writeMessage(Const.MESSAGE_TYPE_MEETING_CREATE,
				data, group.id, meeting.organizerId)
	}

//	private _setMeetingEndTime(meeting) {
//		if (meeting.endTime > 0L) {
//			return
//		}
//		Calendar calendar = new Date(meeting.startTime).toCalendar()
//		calendar.set(Calendar.HOUR_OF_DAY, 0)
//		calendar.set(Calendar.MINUTE, 0)
//		calendar.set(Calendar.SECOND, 0)
//		calendar.set(Calendar.MILLISECOND, 0)
//		calendar.add(Calendar.DATE, 1)
//		meeting.endTime = calendar.getTimeInMillis() - 1
//	}

	private _messageApply(meeting) {
		def data = [:]
		data.homepage = meeting.group.homepage
		data.name = meeting.group.name
		data.title = meeting.title
		data.mid = meeting.id
		this.messageService.writeMessage(Const.MESSAGE_TYPE_MEETING_APPLY,
				data, meeting.group.ownerId, meeting.organizerId)
	}

	@Transactional
	def createMeeting(meeting, params, request) {
//		this._setMeetingEndTime(meeting)
		def tags = params.tag?.split(",")?.toList()?.unique()
		def ques = params.question?.split("\n")?.toList()?.unique()
		this.tagService.setMeetingTags(meeting, tags)
		this.questionService.setMeetingQuestions(meeting, ques)
		meeting.save()
		this._clipCover(meeting.id, params, request)
		if (meeting.state != Const.STATE_NORMAL) {
			this.applicationService.createApplication(new MApplication(meeting: meeting))
			this._messageApply(meeting)
			return
		}
		Group group = this.groupService.updateMeetingCount(meeting.groupId, 1)
		this._messageCreate(meeting, group)
	}

	@Transactional
	def cancelMeeting(meetingId, canceled) {
		Meeting meeting = Meeting.lock(meetingId)
		int state = meeting.state
		meeting.state = canceled ? Const.STATE_DISMISS : Const.STATE_NORMAL
		meeting.save()
		Group group = Group.lock(meeting.groupId)
		if (state == Const.STATE_NORMAL && canceled) {
			group.meetingCount -= 1
		}
		if (state == Const.STATE_DISMISS && !canceled) {
			group.meetingCount += 1
		}
		group.save()
		this._messageCancel(state, canceled, meeting, group)
		return meeting
	}

	@Transactional
	def deleteMeeting(meetingId) {
		Meeting meeting = Meeting.findById(meetingId)
		meeting.delete()
		Group group = Group.lock(meeting.groupId)
		group.meetingCount -= 1
		group.save()
		return meeting
	}

	private _messageCancel(state, canceled, meeting, group) {
		if (state != Const.STATE_NORMAL || !canceled) {
			return
		}
		def data = [:]
		data.homepage = group.homepage
		data.mid = meeting.id
		data.title = meeting.title
		this.messageService.writeMessage(Const.MESSAGE_TYPE_MEETING_CANCEL,
				data, meeting.id, meeting.organizerId)
	}

	private _messageUpdate(meeting, group) {
		if (meeting.state != Const.STATE_NORMAL) {
			return
		}
		def data = [:]
		data.homepage = group.homepage
		data.mid = meeting.id
		data.title = meeting.title
		this.messageService.writeMessage(Const.MESSAGE_TYPE_MEETING_UPDATE,
				data, meeting.id, meeting.organizerId)
	}

	@Transactional
	def updateMeeting(meetingId, params) {
		Meeting meeting = Meeting.lock(meetingId)
		AppUtil.merge(meeting, params)
		meeting.save()
		return meeting
	}

	@Transactional
	def updatePhotoCount(meetingId, count) {
		if (!meetingId) {
			return null
		}
		Meeting meeting = Meeting.lock(meetingId)
		meeting.photoCount += count
		meeting.save()
		return meeting
	}

	private _getParams(params, keyword) {
		return params.findAll { entry ->
			entry.key.startsWith(keyword)
		}?.collectEntries { entry ->
			new AbstractMap.SimpleEntry(StringUtils.uncapitalize(
					entry.key.substring(keyword.length())), entry.value)
		}
	}

	private _setMeetingFee(meeting, feeParams) {
		if (feeParams?.size() > 0) {
			if (meeting.fee) {
				AppUtil.merge(meeting.fee, feeParams)
				meeting.fee.save()
			} else {
				meeting.fee = new Fee(feeParams)
			}
		} else {
			meeting.fee = null
		}
	}

	private _setMeetingRepeat(meeting, repeatParams) {
		if (repeatParams?.size() > 0) {
			if (meeting.repeat) {
				AppUtil.merge(meeting.repeat, repeatParams)
				meeting.repeat.save()
			} else {
				meeting.repeat = new Repeat(repeatParams)
			}
		} else {
			meeting.repeat = null
		}
	}

	def setMeetingExt(meeting, params) {
		def feeParams = this._getParams(params, "fee")
		this._setMeetingFee(meeting, feeParams)

		def repeatParams = this._getParams(params, "repeat")
		this._setMeetingRepeat(meeting, repeatParams)
	}

	protected _updateTarget(targetId, params) {
		return this.updateMeeting(targetId, params)
	}

	@Transactional
	def updateMeeting(meetingId, userId, params, draft, request) {
		params.remove("state")

		Meeting meeting = Meeting.lock(meetingId)

		// must add this line of code, or error
//		meeting.organizer

		int ostate = meeting.state
		AppUtil.merge(meeting, params)

		def nTags = params.tag?.split(",")?.toList()?.unique()
		this.tagService.setMeetingTags(meeting, nTags)

		def nQues = params.question?.split("\n")?.toList()?.unique()
		this.questionService.setMeetingQuestions(meeting, nQues)

		this.setMeetingExt(meeting, params)

		meeting.message = params.message.toInteger() > 0

		int nstate = ostate
		if (draft) {
			nstate = Const.STATE_DRAFT
		} else {
			if (ostate == Const.STATE_APPLY_REFUSED) {
				nstate = Const.STATE_APPLY_PENDING
			} else if (ostate == Const.STATE_DRAFT) {
				if(this.userService.isGroupCreator(userId, meeting.groupId)) {
					nstate = Const.STATE_NORMAL
				} else {
					nstate = Const.STATE_APPLY_PENDING
				}
			}
		}
		meeting.state = nstate
//		this._setMeetingEndTime(meeting)
		meeting.save()

		this._clipCover(meetingId, params, request)

//		int nstate = meeting.state
		if (ostate == nstate) {
			this._messageUpdate(meeting, meeting.group)
		} else {
			if (nstate == Const.STATE_NORMAL) {
				// 草稿/提议 -》 发布
				Group group = this.groupService.updateMeetingCount(meeting.groupId, 1)
				this._messageCreate(meeting, group)
			}
			if (ostate == Const.STATE_NORMAL) {
				// 发布 -》 草稿/提议
				this.groupService.updateMeetingCount(meeting.groupId, -1)
			}
			if (ostate == Const.STATE_APPLY_REFUSED && meeting.application) {
				this.applicationService.updateApplication(meeting.application.id,
						[applyTime: System.currentTimeMillis()])
				this._messageApply(meeting)
			}
		}

		return meeting
	}

	private _messageReply(meeting, attendance, modified) {
		if (!meeting.message) {
			return
		}
		def data = [:]
		data.uid = attendance.attendeeId
		data.nickname = attendance.attendee.nickname
		data.homepage = meeting.group.homepage
		data.mid = meeting.id
		data.title = meeting.title
		def edata = [:]
		edata.putAll(data)
		if (attendance.attendee.thumbnail) {
			edata.portrait = attendance.attendee.thumbnail
		}
		modified.each { k, v ->
			if (k == null) {
				data.action = edata.action = attendance.state == Const.MEETING_ATTEND_STATE_SIGNED
				this.messageService.writeMessage(Const.MESSAGE_TYPE_MEETING_REPLY,
						data, meeting.id, data.uid)
				this.eventService.createEvent(meeting.groupId,
						Const.EVENT_TYPE_MEETING_REPLY, edata)
			} else if (k instanceof Boolean) {
				data.action = edata.action = v
				this.messageService.writeMessage(
						Const.MESSAGE_TYPE_MEETING_REPLY_UPDATE, data,
						meeting.id, data.uid)
				this.eventService.createEvent(meeting.groupId,
						Const.EVENT_TYPE_MEETING_REPLY_UPDATE, edata)
			} else if (k instanceof Integer) {
				data.oldCount = k
				data.newCount = v
				this.messageService.writeMessage(
						Const.MESSAGE_TYPE_MEETING_REPLY_PARTER_UPDATE, data,
						meeting.id, data.uid)
			}
		}
	}

	@Transactional
	def replyMeeting(meeting, attendee, isInvited, invitee, params) {
		MAttendance attendance = MAttendance.findByMeetingAndAttendee(
				meeting, attendee)
		boolean update = attendance ? true : false
		int observer = 0
		int state = params.remove("state").toInteger()
		if (attendance) {
//			attendance = MAttendance.lock(attendance.id)
			observer = attendance.observer
			attendance.lock()
			AppUtil.merge(attendance, params)
		} else {
			attendance = new MAttendance(params)
			attendance.attendee = attendee
			attendance.meeting = meeting
			attendance.state = Const.MEETING_ATTEND_STATE_NOREPLY
		}
		def modified = [:]
		if ([Const.MEETING_ATTEND_STATE_SIGNED,
			 Const.MEETING_ATTEND_STATE_ACCEPTED].contains(attendance.state)) {
			if (state <= 0) {
				modified.put(true, false)
//				attendance.observer = 0
			} else if (observer != attendance.observer) {
				modified.put(observer, attendance.observer)
			}
		} else {
			if (state > 0) {
				modified.put(attendance.state == Const.
						MEETING_ATTEND_STATE_NOREPLY ? null : false, true)
			}
//			else {
//				attendance.observer = 0
//			}
		}
		if (isInvited) {
			attendance.invited = isInvited
		}
		attendance.state = state > 0 ? Const.MEETING_ATTEND_STATE_SIGNED :
				Const.MEETING_ATTEND_STATE_REFUSE
		boolean check = true
		modified?.each { k, v ->
			if (k != null && k instanceof Boolean && k && !v) {
				check = false
			}
		}
		int grade = attendance.grade
		if (grade > 0 && !check) {
			attendance.grade = 0
		}
		attendance.save()
//		meeting = Meeting.lock(meeting.id)
		meeting.lock()
		modified?.each { k, v ->
			if (k == null) {
				meeting.joinCount += 1 + attendance.observer
			} else if (k instanceof Boolean) {
				if (k && !v) {
					meeting.joinCount -= 1 + observer
					if (grade > 0) {
						meeting.gradeTotal -= grade
						meeting.graderCount -= 1
					}
				}
				if (!k && v) {
					meeting.joinCount += 1 + attendance.observer
				}
			} else if (k instanceof Integer) {
				meeting.joinCount -= k - v
			}
		}
		meeting.save()

		// must add this line of code, or error
//		meeting.organizer

		if (StringUtils.isNotBlank(params.content)) {
			Comment comment = new MComment(poster: attendee,
					content: params.content)
			this.commentService.createComment(comment, meeting)
		}
		if (!update && isInvited) {
			this.inviteService.acceptInvite(invitee, meeting)
		}
		// 消息通知
		this._messageReply(meeting, attendance, modified)
		return attendance
	}

	@Transactional(readOnly = true)
	def exportMembers(meetingId, type, output) {
		def contacts = []
		MAttendance.createCriteria().list {
			meeting {
				eq("id", meetingId)
			}
			inList("state", [Const.MEETING_ATTEND_STATE_SIGNED,
							Const.MEETING_ATTEND_STATE_ACCEPTED])
			/*or {
				gt("role", Const.ROLE_MEMBER)
				inList("state", [Const.MEETING_ATTEND_STATE_ACCEPTED,
								 Const.MEETING_ATTEND_STATE_SIGNED,
								 Const.MEETING_ATTEND_STATE_REFUSE,
								 Const.MEETING_ATTEND_STATE_NOREPLY])
			}*/
		}?.each { attendance ->
			User member = attendance.attendee
			Contact contact = new GContact(name: member.nickname,
					mobile: member.mobile ? member.mobile : "",
					email: member.email ? member.email : "",
					qq: member.realname ? member.realname : "" ,
					company: member.company ? member.company : "")
			contacts += contact
		}
		this.contactService.exports(contacts, type, output)
	}

	@Transactional(readOnly = true)
	def exportAnswers(meetingId, type, output) {
		def results = []
		def questions = []
		def qIdx=0;
		MAttendance.createCriteria().list {
			meeting {
				eq("id", meetingId)
			}
			inList("state", [Const.MEETING_ATTEND_STATE_SIGNED,
							Const.MEETING_ATTEND_STATE_ACCEPTED])
			/*or {
				gt("role", Const.ROLE_MEMBER)
				inList("state", [Const.MEETING_ATTEND_STATE_ACCEPTED,
								 Const.MEETING_ATTEND_STATE_SIGNED,
								 Const.MEETING_ATTEND_STATE_REFUSE,
								 Const.MEETING_ATTEND_STATE_NOREPLY])
			}*/
		}?.each { attendance ->
			def result = [nickname:attendance.attendee.nickname,attendTime:attendance.attendTime];
			def ansStr=[];
			def ansList=attendance.answers;
			def i=0;
			attendance.answers.each {answer->
				ansStr+=answer.answer;
				if(i==qIdx){
					questions+=answer.question.question;
					qIdx++;
				}
				i++;
			}
			for(;i<5;i++){
				ansStr+="";
			}
			result.put('answers',ansStr);
			results+=result;
		}
		for(;qIdx<5;qIdx++){
			questions+="";
		}
		this.contactService.exportanswers(questions,results, type, output)
	}
	
	private _messageJoin(meeting, attendance, userId) {
		def data = [:]
		data.homepage = meeting.group.homepage
		data.mid = meeting.id
		data.title = meeting.title
		data.count = attendance.observer
		this.messageService.writeMessage(Const.MESSAGE_TYPE_MEETING_JOIN,
				data, attendance.attendeeId, userId)
		if (StringUtils.isBlank(attendance.attendee.mobile) ||
				attendance.state != Const.MEETING_ATTEND_STATE_ACCEPTED) {
			return
		}
		String content = this.templateService.mergeTemplate(
				[meeting: meeting], "sms/signup.ftl")
		this.smsService.sendSms(attendance.attendee.mobile, content)
	}

	@Transactional
	def checkApply(attendanceId, check, userId) {
		MAttendance attendance = MAttendance.lock(attendanceId)
		attendance.state = check ? Const.MEETING_ATTEND_STATE_ACCEPTED :
				Const.MEETING_ATTEND_STATE_REFUSED
		int grade = attendance.grade
		if (grade > 0 && !check) {
			attendance.grade = 0
		}
		attendance.save()
		Meeting meeting = Meeting.lock(attendance.meetingId)
		if (check) {
			meeting.joinCount += 1 + attendance.observer
		} else {
			meeting.joinCount -= 1 + attendance.observer
			if (grade > 0) {
				meeting.gradeTotal -= grade
				meeting.graderCount -= 1
			}
		}
		meeting.save()
		this._messageJoin(meeting, attendance, userId)
		return attendance
	}

	@Transactional(readOnly = true)
	def countUpcoming(groupId) {
		return this.countMeetings({
			group {
				eq("id", groupId)
			}
			gt("startTime", System.currentTimeMillis())
			eq("state", Const.STATE_NORMAL)
		})
	}

	def reviseJoinCount() {
		int total = 0
		def callable = { besum, meetingId ->
			if (besum) {
				projections {
					sum("observer")
				}
			}
			meeting {
				eq("id", meetingId)
			}
			inList("state", [Const.MEETING_ATTEND_STATE_SIGNED,
							 Const.MEETING_ATTEND_STATE_ACCEPTED])
		}
		Meeting.list().each { item ->
			int count = this.attendanceService.countAttendances(
					callable.curry(false, item.id), Meeting.class)
			def observer = this.attendanceService.listAttendances(
					callable.curry(true, item.id), Meeting.class)
			count += observer[0] ? observer[0] : 0
			if (item.joinCount != count) {
				log.error("revise joinCount of Meeting " + item.id
						+ ", from " + item.joinCount + " to " + count)
				Meeting.withTransaction { status ->
					try {
						if (!item.isAttached()) {
							item.attach()
						}
						item.joinCount = count
						this.saveMeeting(item)
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

	def reviseCommentCount() {
		int total = 0
		Meeting.list().each { item ->
			int count = this.commentService.countComments({
				meeting {
					eq("id", item.id)
				}
			}, Meeting.class)
			if (item.commentCount != count) {
				log.error("revise commentCount of Meeting " + item.id
						+ ", from " + item.commentCount + " to " + count)
				Meeting.withTransaction { status ->
					try {
						if (!item.isAttached()) {
							item.attach()
						}
						item.commentCount = count
						this.saveMeeting(item)
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

	def revisePhotoCount() {
		int total = 0
		Meeting.list().each { item ->
			int count = this.photoService.countPhotos({
				album {
					meeting {
						eq("id", item.id)
					}
				}
			})
			if (item.photoCount != count) {
				log.error("revise photoCount of Meeting " + item.id
						+ ", from " + item.photoCount + " to " + count)
				Meeting.withTransaction { status ->
					try {
						if (!item.isAttached()) {
							item.attach()
						}
						item.photoCount = count
						this.saveMeeting(item)
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

	def reviseGrade() {
		int total = 0
		Meeting.list().each { item ->
			def result = this.gradeService.countGrade(item.id)
			if (item.graderCount != result[0] || item.gradeTotal != result[1]) {
				if (item.graderCount != result[0]) {
					log.error("revise graderCount of Meeting " + item.id
							+ ", from " + item.graderCount + " to " + result[0])
				}
				if (item.gradeTotal != result[1]) {
					log.error("revise gradeTotal of Meeting " + item.id
							+ ", from " + item.gradeTotal + " to " + result[1])
				}
				Meeting.withTransaction { status ->
					try {
						if (!item.isAttached()) {
							item.attach()
						}
						item.graderCount = result[0]
						item.gradeTotal = result[1]
						this.saveMeeting(item)
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
