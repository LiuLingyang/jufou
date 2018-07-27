package com.meetup

import grails.converters.JSON
import org.springframework.transaction.annotation.Transactional

import javax.annotation.Resource
import java.util.concurrent.RejectedExecutionException

class EventService extends AbstractService {

	@Resource
	def templateService

	@Resource
	def taskExecutor

//	private Map<Integer, String> eventMap = new HashMap<Integer, String>()

	def eventMap = [:]

	class EventTask implements Runnable {

		Event event

		EventTask(Event event) {
			this.event = event
		}

		public void run() {
			_doCreate(event)
		}

	}

	private boolean _doCreate(event) {
		Event.withTransaction { status ->
			try {
				event.save()
			} catch (Exception ex) {
				ex.printStackTrace()
				status.setRollbackOnly()
				return false
			}
		}
		return true
	}

	@Transactional(readOnly = true)
	def listEvents(callable, offset = null,
				   limit = null, sort = null, order = null) {
		def args = this._criteriaArgs(offset, limit, sort, order)
		return Event.createCriteria().list(args, callable)
	}

	@Transactional(readOnly = true)
	def countEvents(callable) {
		return Event.createCriteria().count(callable)
	}

	public void init() {
		this.eventMap.put(Const.EVENT_TYPE_GROUP_JOIN,
				this.grailsApplication.config.app.event.group.join.template)
		this.eventMap.put(Const.EVENT_TYPE_MEETING_REPLY,
				this.grailsApplication.config.app.event.meeting.reply.template)
		this.eventMap.put(Const.EVENT_TYPE_MEETING_REPLY_UPDATE,
				this.grailsApplication.config.app.event.meeting.reply.update.template)
		this.eventMap.put(Const.EVENT_TYPE_MEETING_COMMENT,
				this.grailsApplication.config.app.event.meeting.comment.template)
		this.eventMap.put(Const.EVENT_TYPE_PHOTO_UPLOAD,
				this.grailsApplication.config.app.event.photo.upload.template)
	}

	public boolean createEvent(long groupId, int type, Map data) {
		return this.createEvent(Group.findById(groupId), type, data)
	}

	public boolean createEvent(Group group, int type, Map data) {
		data.time = System.currentTimeMillis()
		String content = data as JSON
		Event event = new Event(group: group, type: type,
				content: content, template: this.eventMap.get(type))
		try {
			this.taskExecutor.execute(new EventTask(event))
		} catch (RejectedExecutionException ex) {
			return false
		}
		return true
	}

	public void reconstructEvents(events) {
		events.each { event ->
			this.reconstructEvent(event)
		}
	}

	public void reconstructEvent(event) {
		def json = JSON.parse(event.content)
		event.body = this.templateService.mergeTemplate(json,
				"event/" + event.template + ".ftl")
	}

}
