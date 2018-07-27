package com.meetup

class MAttendance extends Attendance {

	int observer

	String content

	int grade

	static belongsTo = [meeting: Meeting]

	static constraints = {
//		Attendance.constraints.delegate = delegate
		content(nullable: true, blank: true)
		grade(range: 0..5)
		/**
		 * 0 - 未回复
		 * 1 - 回复不参加
		 * 2 - 回复参加
		 * 3 - 管理员修改： 不参加 -》 参加
		 * 4 - 管理员修改： 参加 -》 不参加
		 */
		state(range:
				Const.MEETING_ATTEND_STATE_NOREPLY..Const.MEETING_ATTEND_STATE_REFUSED)
		meeting(index: "Attendance_Idx")
		observer(validator: { val, obj ->
			if (obj.meeting.observerLimit > 0) {
				val <= obj.meeting.observerLimit
			} else {
				true
			}
		})
	}

}
