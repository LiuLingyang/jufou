package com.meetup

class Survey {

	String title

	int type

	String description

	String items

	long startTime

	long endTime

	int voterCount

	long createTime

	long updateTime

	String result

	static transients = ["result"]

	static belongsTo = [group: Group]

	static hasMany = [votes: Vote]

	static mapping = {
		description(type: "text")
		items(type: "text")
	}

	static constraints = {
		type(range: Const.SURVEY_TYPE_SINGLE_CHOICE..Const.SURVEY_TYPE_GRADE, index: "Type_Idx")
		title(blank: false)
		description(blank: false)
		items(blank: false)
		group(index: "Group_Idx")
		startTime(index: "Time_Idx")
		endTime(index: "Time_Idx")
		voterCount(validator: { val, obj ->
			val >= 0 //&& val <= obj.group.memberCount
		})
	}

	def beforeInsert = {
		createTime = new Date().time
	}

	def beforeUpdate = {
		updateTime = new Date().time
	}

}
