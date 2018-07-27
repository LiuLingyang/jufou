package com.meetup

import org.springframework.transaction.annotation.Transactional

@Transactional
class GradeService extends AbstractService {

	def meetingService

	def attendanceService

	def _grade(meeting) {
		if (meeting.graderCount <= 0) {
			return 0
		}
		BigDecimal b = new BigDecimal(meeting.gradeTotal)
		return b.setScale(2, BigDecimal.ROUND_HALF_UP).floatValue()
	}

	def grade(meetingId, userId, grade) {
		MAttendance attendance = this.attendanceService.getMeetingAttendance(
				meetingId, userId)
		Meeting meeting = this.meetingService.getMeeting(meetingId)
		if (!attendance || attendance.grade > 0) {
			return [false, this._grade(meeting)]
		}
		attendance.lock()
		attendance.grade = grade
		this.attendanceService.saveAttendance(attendance)
		meeting.lock()
		meeting.graderCount += 1
		meeting.gradeTotal += grade
		this.meetingService.saveMeeting(meeting)
		return [true, this._grade(meeting)]
	}

	@Transactional(readOnly = true)
	def countGrade(meetingId) {
		int gradeTotal = 0
		int graderCount = 0
		this.attendanceService.listAttendances({
			meeting {
				eq("id", meetingId)
			}
			inList("state", [Const.MEETING_ATTEND_STATE_SIGNED,
					Const.MEETING_ATTEND_STATE_ACCEPTED])
		}, Meeting.class)?.each { attendance ->
			if (attendance.grade > 0) {
				graderCount += 1
				gradeTotal += attendance.grade
			}
		}
		return [graderCount, gradeTotal]
	}

}
