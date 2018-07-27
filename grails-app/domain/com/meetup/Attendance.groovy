package com.meetup

abstract class Attendance {

	long attendTime

	int role = Const.ROLE_MEMBER

	int state

	boolean invited

	SortedSet answers
	
	static belongsTo = [attendee: User]

	static hasMany = [answers: Answer]

	static mapping = {
//		answers(batchSize: 10, sort: "id", order: "asc")
		tablePerHierarchy(false)
	}

	static constraints = {
		role(range: Const.ROLE_MEMBER..Const.ROLE_COCREATOR)
		attendee(index: "Attendance_Idx")
	}

	def beforeInsert = {
		attendTime = new Date().time
	}

//	def beforeUpdate = {
//		attendTime = new Date().time
//	}

}
