package com.meetup

import org.apache.commons.lang.StringUtils
import org.springframework.transaction.annotation.Transactional

@Transactional
class ApplicationService extends AbstractService {

	def groupService

	def meetingService

	def messageService

	def quotaService

	def tagService

	def saveApplication(application) {
		application.save()
	}

	def createApplication(application) {
		this.saveApplication(application)
	}

	def updateApplication(applicationId, params) {
		Application application = Application.lock(applicationId)
		AppUtil.merge(application, params)
		application.save()
		return application
	}

	@Transactional(readOnly = true)
	def getApplication(applicationId) {
		return Application.findById(applicationId)
	}

	private _messageGroupApprove(group, application, actor) {
		def data = [:]
		data.homepage = group.homepage
		data.name = group.name
		data.state = group.state
		data.reason = application.refuse
		this.messageService.writeMessage(Const.MESSAGE_TYPE_GROUP_APPLY_AUTH,
				data, group.ownerId, actor.id)
	}

	private _messageMeetingApprove(meeting, application, actor) {
		def data = [:]
		data.homepage = meeting.group.homepage
		data.title = meeting.title
		data.state = meeting.state
		data.mid = meeting.id
		data.reason = application.refuse
		this.messageService.writeMessage(Const.MESSAGE_TYPE_MEETING_APPLY_AUTH,
				data, meeting.organizerId, actor.id)
	}

	def approveGroupApplication(applicationId, refuse, reason, tag, actor) {
		Application application = this.updateApplication(applicationId,
				[refuse: reason, auditTime: System.currentTimeMillis()])
		Group group = this.groupService.getGroup(application.groupId)
		int oldState = group.state
		int newState = refuse ? Const.STATE_APPLY_REFUSED : Const.STATE_NORMAL
		int count = 0
		if (oldState == Const.STATE_NORMAL && newState == Const.STATE_APPLY_REFUSED) {
			count = -1
		}
		if ([Const.STATE_APPLY_PENDING, Const.STATE_APPLY_REFUSED].contains(oldState)
				&& newState == Const.STATE_NORMAL) {
			count = 1
		}
		group = this.groupService.updateGroup(group.id, [state: newState])
		if (count != 0) {
			this.quotaService.updateGroupCreated(group.owner.quotaId, count)
		}
		if (StringUtils.isNotBlank(tag)) {
			this.tagService.setGroupCustomTag(group, Const.CUSTOM_GROUP_TAG + tag)
		}
		this._messageGroupApprove(group, application, actor)
		return application
	}

	def approveMeetingApplication(applicationId, refuse, reason, actor) {
		Application application = this.updateApplication(applicationId,
				[refuse: reason, auditTime: System.currentTimeMillis()])
		int state = refuse ? Const.STATE_APPLY_REFUSED : Const.STATE_NORMAL
		Meeting meeting = this.meetingService.updateMeeting(application.meetingId,
				[state: state])
		if (!refuse) {
			this.groupService.updateMeetingCount(meeting.groupId, 1)
		}
		this._messageMeetingApprove(meeting, application, actor)
		return application
	}

//	@Transactional(readOnly = true)
//	def getApplicationByGroup(groupId) {
//		return Application.createCriteria().get {
//			group {
//				eq("id", groupId)
//			}
//		}
//	}

}
