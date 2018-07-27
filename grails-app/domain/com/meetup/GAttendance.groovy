package com.meetup

class GAttendance extends Attendance {

	String portrait

	String bio

	static hasOne = [settings: PSettings]

	static belongsTo = [group: Group]

	static hasMany = [votes: Vote]

	static mapping = {
//		Attendance.mapping.delegate = delegate
		bio(type: "text")
	}

	static constraints = {
//		Attendance.constraints.delegate = delegate
		portrait(nullable: true)
		bio(nullable: true)
		/**
		 * 0 - 请求加入
		 * 1 - 请求被接受
		 * 2 - 请求被拒绝
		 */
		state(range: Const.GROUP_ATTEND_STATE_SUBMIT..Const.GROUP_ATTEND_STATE_REFUSE)
		group(index: "Attendance_Idx")
		settings(nullable: true)
	}

}
