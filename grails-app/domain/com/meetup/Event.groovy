package com.meetup

class Event {

	long createTime

	String content

	String template

	String body

	int type

	static belongsTo = [group: Group]

	static transients = ["body"]

	static mapping = {
		content(type: "text")
		body(type: "text")
	}

	static constraints = {
		group(index: "Group_Idx")
		type(index: "Type_Idx")
	}

	def beforeInsert = {
		createTime = new Date().time
	}

}
