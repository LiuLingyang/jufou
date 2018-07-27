package com.meetup

class Vote {

	long attendanceId
	
	String choice

	long createTime

	static belongsTo = [survey: Survey]

	static mapping = {
		choice(type: "text")
	}

	static constraints = {
		choice(blank: false)
		survey(index: "Vote_Idx")
		attendanceId(index: "Vote_Idx")
	}

	def beforeInsert = {
		createTime = new Date().time
	}

}
