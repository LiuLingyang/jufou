package com.meetup

import grails.converters.JSON
import org.springframework.transaction.annotation.Transactional

import javax.annotation.Resource
import java.util.concurrent.RejectedExecutionException

class MessageService extends AbstractService {

	enum Receiver {
		GROUP_MEMBER, MEETING_MEMBER, GROUP_MANAGER, MEETING_MANAGER, PRIVATE
	}

	class RoughMessage {

		int type

		Map data

		long receiverId

		long senderId

	}

	class MessageTask implements Runnable {

		Object message

		MessageTask(Object message) {
			this.message = message
		}

		public void run() {
			_doWrite(message)
		}

	}

	@Resource
	def templateService

	@Resource
	def groupService

	@Resource
	def meetingService

	@Resource
	def attendanceService

	@Resource
	def taskExecutor

	@Resource
	def cometService

	@Resource
	def userService

//	private Map<Integer, List> messageHandlerMap = new HashMap<Integer, List>()

	def messageHandlerMap = [:]

//	private BlockingQueue msgQueue = new LinkedBlockingQueue()

	def needSenderTypes = [Const.MESSAGE_TYPE_INFORM_GROUP,
			Const.MESSAGE_TYPE_INFORM_MEETING,
			Const.MESSAGE_TYPE_PRIVATE]

	private boolean _insertMessage(int type, Map data, String template,
								   Map receipts, long senderId) {
		String content = data as JSON
		User sender = this.needSenderTypes.contains(type) ?
			User.findById(senderId) : null
		Message message = new Message(type: type, content: content,
				template: template, sender: sender)
		receipts?.each { receiverId, ua ->
			def clients = ua ? [ua] :
				[Const.USER_AGENT_PC, Const.USER_AGENT_MOBILE]
			clients.each { client ->
				Receipt receipt = new Receipt(client: client,
						receiver: User.findById(receiverId))
				message.addToReceipts(receipt)
			}
		}
//		this.msgQueue.add(message)
		try {
			this.taskExecutor.execute(new MessageTask(message))
		} catch (RejectedExecutionException ex) {
			return false
		}
		return true
	}

	private boolean _deliverToGroupMembers(gid, senderId, type,
										   data, template, flag) {
//		Group.findById(gid, [fetch: [attendances: "eager"]])
		def receipts = this.attendanceService.listAttendances({
			group {
				eq("id", gid)
			}
			attendee {
				ne("id", senderId)
			}
			eq("state", Const.GROUP_ATTEND_STATE_ACCEPTED)
		}, Group.class)?.findAll {
			!flag || ((it.settings && it.settings[flag]) ||
					(!it.settings && it.attendee.psettings[flag])) ||
					it.attendee.msettings[flag]
		}?.collectEntries {
			String ua = flag ? this._receiptAgent(
					(it.settings && it.settings[flag]) ||
							(!it.settings && it.attendee.psettings[flag]),
					it.attendee.msettings[flag]) : null
			new AbstractMap.SimpleEntry(it.attendeeId, ua)
		}
		return this._insertMessage(type, data, template, receipts, senderId)
	}

	private boolean _deliverToGroupManagers(gid, senderId, type, data, template) {
		def receipts = this.attendanceService.listAttendances({
			group {
				eq("id", gid)
			}
			attendee {
				ne("id", senderId)
			}
			inList("role", [Const.ROLE_CREATOR, Const.ROLE_COCREATOR, Const.ROLE_MANAGER])
		}, Group.class)?.collectEntries {
			new AbstractMap.SimpleEntry(it.attendeeId, null)
		}
		return this._insertMessage(type, data, template, receipts, senderId)
	}

	private boolean _deliverToMeetingMembers(mid, senderId, type, data, template, flag) {
		def mattendances = this.attendanceService.listAttendances({
			meeting {
				eq("id", mid)
			}
			attendee {
				ne("id", senderId)
			}
			inList("state", [Const.MEETING_ATTEND_STATE_ACCEPTED,
					Const.MEETING_ATTEND_STATE_SIGNED])
		}, Meeting.class)
//		Map<Long, GAttendance> map = new HashMap<Long, GAttendance>()
		Meeting meeting = Meeting.findById(mid)
		def attendeeIds = mattendances*.attendeeId
		def map = this.attendanceService.listAttendances({
			group {
				eq("id", meeting.groupId)
			}
			attendee {
				inList("id", attendeeIds?.size() > 0 ? attendeeIds : [0L])
			}
			eq("state", Const.GROUP_ATTEND_STATE_ACCEPTED)
		}, Group.class)?.collectEntries {
			new AbstractMap.SimpleEntry(it.attendeeId, it)
		}
		def receipts = mattendances?.findAll {
			def attendance = map.get(it.attendeeId)
			!flag || (attendance && ((attendance.settings &&
					attendance.settings[flag]) || (!attendance.settings &&
					attendance.attendee.psettings[flag]))) || it.attendee.msettings[flag]
		}?.collectEntries {
			def attendance = map.get(it.attendeeId)
			String ua = flag ? this._receiptAgent(attendance && ((attendance.settings &&
					attendance.settings[flag]) || (!attendance.settings &&
					attendance.attendee.psettings[flag])), it.attendee.msettings[flag]) : null
			new AbstractMap.SimpleEntry(it.attendeeId, ua)
		}
		return this._insertMessage(type, data, template, receipts, senderId)
	}

	private boolean _deliverToMeetingManagers(mid, senderId, type, data, template) {
		def receipts = this.attendanceService.listAttendances({
			meeting {
				eq("id", mid)
			}
			attendee {
				ne("id", senderId)
			}
			inList("role", [Const.ROLE_CREATOR, Const.ROLE_COCREATOR])
		}, Meeting.class)?.collectEntries {
			new AbstractMap.SimpleEntry(it.attendeeId, null)
		}
		return this._insertMessage(type, data, template, receipts, senderId)
	}

	private String _receiptAgent(web, mobile) {
		if (web & mobile) {
			return null
		}
		if (web) {
			return Const.USER_AGENT_PC
		}
		if (mobile) {
			return Const.USER_AGENT_MOBILE
		}
		throw new IllegalStateException()
	}

	private boolean _deliverToPrivate(receiverId, senderId, type, data, template, flag) {
//		data.sender = senderId
		User receiver = this.userService.getUser(receiverId)
		String ua = flag ? this._receiptAgent(receiver.psettings[flag],
				receiver.msettings[flag]) : null
		def receipts = [:]
		receipts.put(receiverId, ua)
		return this._insertMessage(type, data, template, receipts, senderId)
	}

	private boolean _handleRoughMessage(message) {
		def handler = this.messageHandlerMap.get(message.type)
//		boolean participate = false
//		if (SessionFactoryUtils.isDeferredCloseActive(this.sessionFactory)) {
//			participate = true
//		} else {
//			SessionFactoryUtils.initDeferredClose(this.sessionFactory)
//		}
//		try {
		switch (handler[0]) {
			case Receiver.GROUP_MEMBER:
				return this._deliverToGroupMembers(message.receiverId, message.senderId,
						message.type, message.data, handler[1], handler[2])
			case Receiver.MEETING_MEMBER:
				return this._deliverToMeetingMembers(message.receiverId, message.senderId,
						message.type, message.data, handler[1], handler[2])
			case Receiver.GROUP_MANAGER:
				return this._deliverToGroupManagers(message.receiverId, message.senderId,
						message.type, message.data, handler[1])
			case Receiver.MEETING_MANAGER:
				return this._deliverToMeetingManagers(message.receiverId, message.senderId,
						message.type, message.data, handler[1])
			case Receiver.PRIVATE:
				return this._deliverToPrivate(message.receiverId, message.senderId,
						message.type, message.data, handler[1], handler[2])
			default:
				return false
		}
//		} finally {
//			if (!participate) {
//				SessionFactoryUtils.processDeferredClose(this.sessionFactory)
//			}
//		}
	}

	private boolean _handleMessage(message) {
		Message.withTransaction { status ->
			try {
				message.save()
			} catch (Exception ex) {
				ex.printStackTrace()
				status.setRollbackOnly()
				return false
			}
		}
		message.receipts?.each { receipt ->
			this.cometService.addResponse(receipt.receiver.id,
					receipt.client, [id: receipt.id, type: message.type])
		}
		return true
	}

	public boolean writeMessage(int type, Map data, long receiverId,
								long senderId) {
		RoughMessage roughMessage = new RoughMessage(type: type, data: data,
				receiverId: receiverId, senderId: senderId)
//		return this.msgQueue.add(roughMessage)
		try {
			this.taskExecutor.execute(new MessageTask(roughMessage))
		} catch (RejectedExecutionException ex) {
			return false
		}
		return true
	}

	public void init() {
		this.messageHandlerMap.put(Const.MESSAGE_TYPE_MEETING_CREATE,
				[Receiver.GROUP_MEMBER, this.grailsApplication.config.
						app.message.meeting.create.template, "meetingCreate"])
		this.messageHandlerMap.put(Const.MESSAGE_TYPE_MEETING_COMMENT,
				[Receiver.MEETING_MEMBER, this.grailsApplication.config.
						app.message.meeting.comment.template, "meetingComment"])
		this.messageHandlerMap.put(Const.MESSAGE_TYPE_GROUP_PHOTO_UPLOAD,
				[Receiver.GROUP_MEMBER, this.grailsApplication.config.
						app.message.photo.upload.template, "photoUpload"])
		this.messageHandlerMap.put(Const.MESSAGE_TYPE_MEETING_PHOTO_UPLOAD,
				[Receiver.MEETING_MEMBER, this.grailsApplication.config.
						app.message.photo.upload.template, "photoUpload"])
		this.messageHandlerMap.put(Const.MESSAGE_TYPE_GROUP_JOIN,
				[Receiver.GROUP_MEMBER, this.grailsApplication.config.
						app.message.group.join.template, "memberJoin"])
		this.messageHandlerMap.put(Const.MESSAGE_TYPE_GROUP_EXIT,
				[Receiver.GROUP_MEMBER, this.grailsApplication.config.
						app.message.group.exit.template, "memberExit"])
		this.messageHandlerMap.put(Const.MESSAGE_TYPE_GROUP_JOIN_CHECK,
				[Receiver.PRIVATE, this.grailsApplication.config.
						app.message.group.join.check.template, null])
		this.messageHandlerMap.put(Const.MESSAGE_TYPE_GROUP_SET_MANAGER,
				[Receiver.PRIVATE, this.grailsApplication.config.
						app.message.group.set.manager.template, null])
		this.messageHandlerMap.put(Const.MESSAGE_TYPE_MEETING_CANCEL,
				[Receiver.MEETING_MEMBER, this.grailsApplication.config.
						app.message.meeting.cancel.template])
		this.messageHandlerMap.put(Const.MESSAGE_TYPE_GROUP_DISMISS,
				[Receiver.GROUP_MEMBER, this.grailsApplication.config.
						app.message.group.dismiss.template])
		this.messageHandlerMap.put(Const.MESSAGE_TYPE_GROUP_APPLY_AUTH,
				[Receiver.PRIVATE, this.grailsApplication.config.
						app.message.group.apply.auth.template, null])
		this.messageHandlerMap.put(Const.MESSAGE_TYPE_MEETING_APPLY,
				[Receiver.PRIVATE, this.grailsApplication.config.
						app.message.meeting.apply.template, null])
		this.messageHandlerMap.put(Const.MESSAGE_TYPE_MEETING_APPLY_AUTH,
				[Receiver.PRIVATE, this.grailsApplication.config.
						app.message.meeting.apply.auth.template, null])
		this.messageHandlerMap.put(Const.MESSAGE_TYPE_MEETING_REPLY,
				[Receiver.MEETING_MANAGER, this.grailsApplication.config.
						app.message.meeting.reply.template])
		this.messageHandlerMap.put(Const.MESSAGE_TYPE_MEETING_UPDATE,
				[Receiver.MEETING_MEMBER, this.grailsApplication.config.
						app.message.meeting.update.template, "meetingUpdate"])
		this.messageHandlerMap.put(Const.MESSAGE_TYPE_MEETING_REPLY_UPDATE,
				[Receiver.MEETING_MANAGER, this.grailsApplication.config.
						app.message.meeting.reply.update.template])
		this.messageHandlerMap.put(Const.MESSAGE_TYPE_MEETING_REPLY_PARTER_UPDATE,
				[Receiver.MEETING_MANAGER, this.grailsApplication.config.
						app.message.meeting.reply.partner.update.template])
		this.messageHandlerMap.put(Const.MESSAGE_TYPE_MEETING_JOIN,
				[Receiver.PRIVATE, this.grailsApplication.config.
						app.message.meeting.join.template, "meetingJoin"])
		this.messageHandlerMap.put(Const.MESSAGE_TYPE_INFORM_GROUP,
				[Receiver.GROUP_MEMBER, null, null])
		this.messageHandlerMap.put(Const.MESSAGE_TYPE_INFORM_MEETING,
				[Receiver.MEETING_MEMBER, null, null])
		this.messageHandlerMap.put(Const.MESSAGE_TYPE_PRIVATE,
				[Receiver.PRIVATE, null, null])

//		new Thread() {
//			public void run() {
//				while (true) {
//					try {
//						_doWrite(msgQueue.take())
//					} catch (Exception ex) {
//						ex.printStackTrace()
//					}
//				}
//			}
//		}.start()
	}

	private boolean _doWrite(message) {
		if (message instanceof RoughMessage) {
			return this._handleRoughMessage(message)
		}
		if (message instanceof Message) {
			return this._handleMessage(message)
		}
		return false
	}

	public void reconstructMessages(entities, isReceiver = true) {
		entities.each { entity ->
			this.reconstructMessage(entity, isReceiver)
		}
	}

	public void reconstructMessage(entity, isReceiver = true) {
		Message message = isReceiver ? entity.message : entity
		def json = JSON.parse(message.content)
		if (message.template && entity.client) {
			String body = this.templateService.mergeTemplate(
					json.put("ua", entity.client),
					"message/" + message.template + ".ftl")
			if (entity.client == Const.USER_AGENT_MOBILE) {
				body = HtmlUtil.getPlainText(body)
			}
			message.body = body
		} else {
			message.title = json.has("title") ? json.get("title") : null
			message.body = json.get("content")
//			message.sender = json.has("sender") ? User.findById(json.get("sender")) : null
		}
	}

	@Transactional(readOnly = true)
	def countMessages(callable, isReceiver = true) {
		if (isReceiver) {
			return Receipt.createCriteria().count(callable)
		} else {
			return Message.createCriteria().count(callable)
		}
	}

	@Transactional(readOnly = true)
	def listMessages(callable, isReceiver = true, offset = null,
					 limit = null, sort = null, order = null) {
		def args = this._criteriaArgs(offset, limit, sort, order)
		if (isReceiver) {
			return Receipt.createCriteria().list(args, callable)
		} else {
			return Message.createCriteria().list(args, callable)
		}
	}

	@Transactional(readOnly = true)
	def getMessage(id, isReceiver = true) {
		if (isReceiver) {
			return Receipt.findById(id)
		} else {
			return Message.findById(id)
		}
	}

	@Transactional
	def deleteMessages(userId, messageIds) {
		int count = 0
		Message.createCriteria().list {
			sender {
				eq("id", userId)
			}
			inList("id", messageIds?.size() > 0 ? messageIds : [0L])
		}.each { message ->
			message.deleted = true
			message.save()
		}
		this.listMessages({
			receiver {
				eq("id", userId)
			}
			message {
				inList("id", messageIds?.size() > 0 ? messageIds : [0L])
			}
		}).each { receipt ->
			receipt.delete()
		}
		Message.createCriteria().list {
			inList("id", messageIds?.size() > 0 ? messageIds : [0L])
		}.each { message ->
			if (message.deleted && message.receipts.size() == 0) {
				message.delete()
				count++
			}
		}
		return count
	}

	@Transactional
	def readMessages(userId, messageIds) {
		int count = 0
		this.listMessages({
			receiver {
				eq("id", userId)
			}
			message {
				inList("id", messageIds?.size() > 0 ? messageIds : [0L])
			}
		}).each { receipt ->
			if (!receipt.readed) {
				receipt.readed = true
				receipt.save()
				count++
			}
		}
		return count
	}

	@Transactional
	def readMessage(receiptId) {
		Receipt receipt = Receipt.findById(receiptId)
		receipt.readed = true
		receipt.save()
		return receipt
	}

	def informGroupMembers(groupId, userId, data) {
//		GAttendance attendance = this.attendanceService.
//				getGroupAttendance({
//					group {
//						eq("id", groupId)
//					}
//					attendee {
//						eq("id", userId)
//					}
//					gt("role", Const.ROLE_MANAGER)
//				})
//		if (!attendance) {
//			return Const.PERMISSION_DENIED
//		}
		Group group = Group.findById(groupId)
		data.ghomepage = group.homepage
		data.gname = group.name
		data.glogo = group.logo
		return this.writeMessage(Const.MESSAGE_TYPE_INFORM_GROUP,
				data, group.id, userId) ? Const.SUCCESS : Const.FAIL
	}

	def informMeetingMembers(meetingId, userId, data) {
//		MAttendance attendance = this.attendanceService.
//				getMeetingAttendance({
//					meeting {
//						eq("id", meetingId)
//					}
//					attendee {
//						eq("id", userId)
//					}
//					eq("role", Const.ROLE_CREATOR)
//				})
//		if (!attendance) {
//			return Const.PERMISSION_DENIED
//		}
		Meeting meeting = Meeting.findById(meetingId)
		data.ghomepage = meeting.group.homepage
		data.mname = meeting.title
		data.mid = meeting.id
		return this.writeMessage(Const.MESSAGE_TYPE_INFORM_MEETING,
				data, meeting.id, userId) ? Const.SUCCESS : Const.FAIL
	}

}
