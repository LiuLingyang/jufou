package com.meetup

import grails.converters.JSON
import org.hibernate.Criteria
import org.springframework.transaction.annotation.Transactional

class GroupService extends AbstractService {

	def messageService

	def contactService

	def photoService

	def eventService

	def attendanceService

	def questionService

	def meetingService

	def inviteService

	def quotaService

	def praiseService

	def tagService

	@Transactional(readOnly = true)
	def listGroups(callable, offset = null, limit = null,
				   sort = null, order = null) {
		if (sort && this.configService.getSortProperties().containsKey(sort)) {
			Criteria criteria = Group.createCriteria().buildCriteria(callable)
			this._buildCriteria(criteria, offset, limit, sort, order)
			return criteria.list()
		}
		def args = this._criteriaArgs(offset, limit, sort, order)
		return Group.createCriteria().list(args, callable)
	}

	@Transactional(readOnly = true)
	def listDistinctGroups(callable) {
		return Group.createCriteria().listDistinct(callable)
	}

	@Transactional(readOnly = true)
	def countGroups(callable, distinct = false) {
		if (distinct) {
			return Group.createCriteria().get(callable)
		} else {
			return Group.createCriteria().count(callable)
		}
	}

	@Transactional(readOnly = true)
	def getGroupByHomepage(homepage) {
		return Group.findByHomepage(homepage)
	}

	@Transactional(readOnly = true)
	def getGroupByName(name) {
		return Group.findByNameLike("%" + name + "%")
	}

	@Transactional(readOnly = true)
	def getGroupByCustomTag(tag) {
		return Group.createCriteria().get {
			tags {
				eq("name", Const.CUSTOM_GROUP_TAG + tag)
			}
		}
	}

	@Transactional(readOnly = true)
	def getGroupByCategory(category) {
		return Group.findByCategory(category)
	}

	@Transactional(readOnly = true)
	def getGroup(groupId, tag = false) {
		Group group = Group.findById(groupId)
		if (!group) {
			return null
		}
		if (tag) {
			group.customTag = this.tagService.getGroupCustomTag(group.id)
		}
		return group
	}

	@Transactional
	def saveGroup(group) {
		group.save()
	}

	@Transactional
	def createGroup(group) {
		this.saveGroup(group)
//		this.quotaService.updateGroupCreated(group.owner.quotaId, 1)
	}

	@Transactional
	def updateGroup(groupId, params) {
		Group group = Group.lock(groupId)
		AppUtil.merge(group, params)
		group.save()
		return group
	}

	private _messageDismiss(group) {
		def data = [:]
		data.homepage = group.homepage
		data.name = group.name
		this.messageService.writeMessage(Const.MESSAGE_TYPE_GROUP_DISMISS,
				data, group.id, group.ownerId)
	}

	@Transactional
	def dismissGroup(groupId) {
		int state = Group.findById(groupId).state
		Group group = this.updateGroup(groupId, [state: Const.STATE_DISMISS])
		if (state == Const.STATE_NORMAL) {
			this.quotaService.updateGroupCreated(group.owner.quotaId, -1)
		}
		this._messageDismiss(group)
		return group
	}

	@Transactional
	def updateLogo(groupId, request, logo, path) {
		String original = this._upload(logo, request, path, "group", groupId)
//		String thumbnail = this._upload(logo, realPath, "group",
//				groupId + Const.IMAGE_THUMBNAIL_SUFFIX, this.grailsApplication.
//				config.app.group.logo.thumbnail)
		return this._updateLogo(groupId, request, original)
	}

	private _updateLogo(groupId, request, logo, thumbnail = null) {
		Group group = Group.findById(groupId)
		def urls = [group.logo]
		def params = [logo: logo]
		if (thumbnail) {
			urls += group.thumbnail
			params.thumbnail = thumbnail
		}
		group = this.updateGroup(groupId, params)
		urls?.each { url ->
			url && this.hdfsService.delete(url, request)
		}
		return group
	}

	@Transactional
	def clipLogo(groupId, request, pos) {
		Group group = Group.findById(groupId)
		if (pos) {
			def cliped = this._clip(group.logo, request, [this.grailsApplication.config.
					app.group.logo.original, this.grailsApplication.
					config.app.group.logo.thumbnail], pos)
			group = this._updateLogo(groupId, request, cliped[0], cliped[1])
		}
		return group
	}

	def updateLastPhoto(groupId) {
		def photos = this.photoService.listPhotos({
			album {
				group {
					eq("id", groupId)
				}
			}
		}, 0, 1, "uploadTime", "desc")
		String lastThumbnail = photos && photos.size() > 0 ? photos[0].thumbnailURL : null
		String lastPhoto = photos && photos.size() > 0 ? photos[0].originalURL : null
		return this.updateGroup(groupId, [lastThumbnail: lastThumbnail,
				lastPhoto: lastPhoto?.replace(this.hdfsService.getContextPath(),
						this.hdfsService.getThumbnailContextPath())])
	}

	def relationship(groupId, userId) {
		// 非会员
		int relationship = 0
		GAttendance attendance = this.attendanceService.getGroupAttendance(groupId, userId)
		if (!attendance) {
			return relationship
		}
		if (attendance.state == Const.GROUP_ATTEND_STATE_ACCEPTED) {
			// 1, 2, 3
			relationship = attendance.role
		} else {
			relationship = attendance.state == Const.GROUP_ATTEND_STATE_SUBMIT ? -1 : -2
		}
		return relationship
	}

//	@Transactional
	def kickout(groupId, userId, actorId, cause = null) {
		if (this.checkRole(groupId, userId, [Const.ROLE_CREATOR, Const.ROLE_COCREATOR])) {
			return null
		}
		GAttendance attendance = this.attendanceService.deleteGroupAttendance(
				groupId, userId)
		if (userId == actorId) {
			this._messageExit(Group.findById(groupId), userId, cause)
		}
		return attendance
	}

	def checkRole(groupId, userId, roles) {
		GAttendance attendance = this.attendanceService.
				getGroupAttendance(groupId, userId)
		return roles.contains(attendance.role)
	}

	private _messageExit(group, userId, cause) {
		def data = [:]
		data.homepage = group.homepage
		data.name = group.name
		data.nickname = User.findById(userId).nickname
		data.cause = cause
		this.messageService.writeMessage(Const.MESSAGE_TYPE_GROUP_EXIT,
				data, group.id, userId)
	}

	private _messageCheck(group, attendance, userId, cause) {
		def data = [:]
		data.homepage = group.homepage
		data.name = group.name
		def mdata = [:]
		mdata.putAll(data)
		mdata.reply = attendance.state == Const.GROUP_ATTEND_STATE_ACCEPTED ? 1 : 0
		mdata.welcome = group.welcome
		mdata.cause = cause
		this.messageService.writeMessage(Const.MESSAGE_TYPE_GROUP_JOIN_CHECK,
				mdata, attendance.attendeeId, userId)
		if (attendance.state != Const.GROUP_ATTEND_STATE_ACCEPTED) {
			return
		}
		def edata = [:]
		edata.putAll(data)
		edata.uid = attendance.attendeeId
		if (attendance.attendee.thumbnail) {
			edata.portrait = attendance.attendee.thumbnail
		}
		edata.nickname = attendance.attendee.nickname
		edata.time = attendance.attendTime
		this.eventService.createEvent(group, Const.EVENT_TYPE_GROUP_JOIN, edata)
	}

	@Transactional
	def checkApply(attendanceId, check, userId, cause) {
		GAttendance attendance = GAttendance.lock(attendanceId)
		attendance.state = check ? Const.GROUP_ATTEND_STATE_ACCEPTED :
				Const.GROUP_ATTEND_STATE_REFUSE
		attendance.save()
		Group group = Group.lock(attendance.groupId)
		if (check) {
			group.memberCount += 1
		}
//		if (state < 0) {
//			group.memberCount -= 1
//		}
		group.save()
		this._messageCheck(group, attendance, userId, cause)
		return attendance
	}

	@Transactional(readOnly = true)
	def exportMembers(groupId, type, output) {
		def contacts = []
		GAttendance.createCriteria().list {
			group {
				eq("id", groupId)
			}
			or {
				gt("role", Const.ROLE_MEMBER)
				eq("state", Const.GROUP_ATTEND_STATE_ACCEPTED)
			}
		}?.each { attendance ->
			User member = attendance.attendee
			Contact contact = new GContact(name: member.nickname,
					mobile: member.mobile ? member.mobile : "",
					email: member.email ? member.email : "")
			contacts += contact
		}
		this.contactService.exports(contacts, type, output)
	}

	@Transactional(readOnly = true)
	def exportAnswers(groupId, type, output) {
		def results = []
		def questions = []
		def qIdx=0;
		GAttendance.createCriteria().list {
			group {
				eq("id", groupId)
			}
			or {
				gt("role", Const.ROLE_MEMBER)
				eq("state", Const.GROUP_ATTEND_STATE_ACCEPTED)
			}
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

	@Transactional(readOnly = true)
	def validateHomepage(homepage) {
		return !Group.findByHomepage(homepage) &&
				AppUtil.isValidHomepage(homepage)
	}

	private _messageJoin(group, user) {
		def mdata = [:]
		mdata.homepage = group.homepage
		mdata.name = group.name
		this.messageService.writeMessage(Const.MESSAGE_TYPE_GROUP_JOIN,
				mdata, group.id, user.id)
//		def edata = [:]
//		edata.putAll(mdata)
//		edata.uid = user.id
//		if (user.thumbnail) {
//			edata.portrait = user.thumbnail
//		}
//		edata.nickname = user.nickname
//		this.eventService.createEvent(group.id, Const.EVENT_TYPE_GROUP_JOIN, edata)
	}

	@Transactional
	def joinGroup(attendance, answer, update, invitee) {
		if (answer) {
//			JSON.parse(params.answer).each { k, v ->
//				attendance.addToAnswers(new Answer(
//						question: Question.findById(k), answer: v))
//			}
			this.questionService.answerQuestion(
					attendance, JSON.parse(answer), false)
		}
		attendance.save()
		if (!update) {
			if (attendance.invited) {
				this.inviteService.acceptInvite(invitee, attendance.group)
			}
			this._messageJoin(attendance.group, attendance.attendee)
		}
	}

	@Transactional
	def updatePraiseCount(groupId, count) {
		Group group = Group.lock(groupId)
		group.praiseCount += count
		group.save()
		return group
	}

	@Transactional
	def updateMemberCount(groupId, count) {
		Group group = Group.lock(groupId)
		group.memberCount += count
		group.save()
		return group
	}

	@Transactional
	def updateMeetingCount(groupId, count) {
		Group group = Group.lock(groupId)
		group.meetingCount += count
		group.save()
		return group
	}

	@Transactional(readOnly = true)
	def getGroupMenus(groupId) {
		if (!Const.MOBILE_GROUP_MENUS) {
			return null
		}
		Group group = Group.findById(groupId)
		String indexes = group.menus
		if (!indexes) {
			String tag = this.tagService.getGroupCustomTag(groupId)
			if (!tag) {
				return null
			}
			int index = tag.indexOf("#")
			if (index < 0) {
				return null
			}
			indexes = this.getGroupByCustomTag(tag.substring(0, index))?.menus
		}
		if (!indexes) {
			return null
		}
		def menus = []
		indexes?.split(";")?.toList() { index ->
			menus += Const.MOBILE_GROUP_MENUS[index.toInteger()]
		}
		return menus.join(";")
	}

	def reviseMemberCount() {
		int total = 0
		Group.list().each { item ->
			int count = this.attendanceService.countAttendances({
				group {
					eq("id", item.id)
				}
				eq("state", Const.GROUP_ATTEND_STATE_ACCEPTED)
			}, Group.class)
			if (item.memberCount != count) {
				log.error("revise memberCount of Group " + item.id
						+ ", from " + item.memberCount + " to " + count)
				Group.withTransaction { status ->
					try {
						if (!item.isAttached()) {
							item.attach()
						}
						item.memberCount = count
						this.saveGroup(item)
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

	def reviseMeetingCount() {
		int total = 0
		Group.list().each { item ->
			int count = this.meetingService.countMeetings({
				group {
					eq("id", item.id)
				}
				eq("state", Const.STATE_NORMAL)
			})
			if (item.meetingCount != count) {
				log.error("revise meetingCount of Group " + item.id
						+ ", from " + item.meetingCount + " to " + count)
				Group.withTransaction { status ->
					try {
						if (!item.isAttached()) {
							item.attach()
						}
						item.meetingCount = count
						this.saveGroup(item)
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

	def revisePraiseCount() {
		int total = 0
		Group.list().each { item ->
			int count = this.praiseService.countPraises(item.id)
			if (item.praiseCount != count) {
				log.error("revise praiseCount of Group " + item.id
						+ ", from " + item.praiseCount + " to " + count)
				Group.withTransaction { status ->
					try {
						if (!item.isAttached()) {
							item.attach()
						}
						item.praiseCount = count
						this.saveGroup(item)
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
