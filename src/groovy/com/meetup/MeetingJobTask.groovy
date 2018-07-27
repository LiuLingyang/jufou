package com.meetup

import org.apache.commons.lang.StringUtils
import org.springframework.beans.BeanUtils

import javax.annotation.Resource

/**
 * Created with IntelliJ IDEA.
 * User: zjulyy
 * Date: 12-11-22
 * Time: 下午4:49
 * To change this template use File | Settings | File Templates.
 */
class MeetingJobTask {

	@Resource
	def meetingService

	@Resource
	def tagService

	@Resource
	def questionService

	@Resource
	def sessionFactory

	private int _intervalDay(long startTime, long endTime) {
		return (endTime - startTime) % Const.TIME_DAY == 0 ?
			(endTime - startTime).intdiv(Const.TIME_DAY) :
			(endTime - startTime).intdiv(Const.TIME_DAY) + 1
	}

	private _handleRepeatMeeting(meeting, tags, ques) {
		Meeting.withTransaction { status ->
			try {
//				meeting.save()
//				Group group = Group.lock(meeting.groupId)
//				group.meetingCount += 1
//				group.save()
				this.meetingService.createMeeting(meeting, tags, ques)
			} catch (Exception ex) {
				ex.printStackTrace()
				status.setRollbackOnly()
			}
		}
	}

	public void doMeetingJob() {
		def meetings = this.meetingService.listMeetings({
			repeat {
				gt("type", 0)
				or {
					le("endTime", 0L)
					gt("endTime", System.currentTimeMillis())
				}
			}
			eq("state", Const.STATE_NORMAL)
//			order("repeat.type", "asc")
			order("startTime", "asc")
//			fetchMode("tags", FetchMode.JOIN)
		})
		meetings.each { meeting ->
			boolean isRepeat = false
			long currentTime = System.currentTimeMillis()
			Date future = new Date(currentTime + this._intervalDay(
					meeting.createTime, meeting.startTime) * Const.TIME_DAY)
			Repeat repeat = this.meetingService.getRepeat(meeting.id)
			def days = StringUtils.isBlank(repeat.ext) ? null :
				repeat.ext.split(",")?.toList()?.collect {
					it.trim().toInteger()
				}
			switch (repeat.type) {
				case Const.REPEAT_DAY:
					isRepeat = true
					break
				case Const.REPEAT_WEEK:
					if ((currentTime.intdiv(Const.TIME_WEEK) - meeting.createTime.intdiv(Const.TIME_WEEK))
							% repeat.interval == 0
							&& days.isCase(future.getAt(Calendar.DAY_OF_WEEK))) {
						isRepeat = true
					}
					break
				case Const.REPEAT_MONTH:
					Date date = new Date(meeting.startTime)
					if (((future.getAt(Calendar.YEAR) - date.getAt(Calendar.YEAR)) * 12
							+ future.getAt(Calendar.MONTH) - date.getAt(Calendar.MONTH))
							% repeat.interval == 0
							&& future.getAt(Calendar.WEEK_OF_MONTH) == days[0]
							&& future.getAt(Calendar.DAY_OF_WEEK) == days[1]) {
						isRepeat = true
					}
					break
			}
			if (isRepeat) {
				long interval = (future.getTime().intdiv(Const.TIME_DAY) -
						meeting.startTime.intdiv(Const.TIME_DAY)) * Const.TIME_DAY
				Meeting repeatMeeting = new Meeting()
				BeanUtils.copyProperties(meeting, repeatMeeting,
						["id", "startTime", "endTime", "repeat", "signupStartTime",
								"signupEndTime", "joinCount", "commentCount", "tags",
								"questions", "attendances", "albums", "comments",
								"invites", "fee"].toArray(new String[0]))
//				this.questionService.listMeetingQuestions(
//						meeting.id)*.question?.each { question ->
//					repeatMeeting.addToQuestions(new MQuestion(question: question))
//				}
//				meeting.tags?.each { tag ->
//				this.tagService.listMeetingTags([meeting.id])?.each { tag ->
//					repeatMeeting.addToTags(tag)
//				}
				def tags = this.tagService.listMeetingTags([meeting.id])*.name
				def ques = this.questionService.listMeetingQuestions(
						meeting.id)*.question
				repeatMeeting.startTime = meeting.startTime + interval
				repeatMeeting.endTime = meeting.endTime > 0 ?
					meeting.endTime + interval : meeting.endTime
				repeatMeeting.signupStartTime = meeting.signupStartTime + interval
				repeatMeeting.signupEndTime = meeting.signupEndTime > 0 ?
					meeting.signupEndTime + interval : meeting.signupEndTime
				repeatMeeting.repeat = new Repeat()
				Fee fee = new Fee()
				BeanUtils.copyProperties(
						this.meetingService.getFee(meeting.id), fee)
				repeatMeeting.fee = fee
				this._handleRepeatMeeting(repeatMeeting, tags, ques)
			}
		}
	}

}
