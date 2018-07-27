package com.meetup

class Footprint {

	String source

	String page

	long timestamp

	static belongsTo = [user: User]

	static constraints = {
		user(index: "User_Idx")
		source(inList: [Const.USER_AGENT_PC, Const.USER_AGENT_ANDROID,
				Const.USER_AGENT_IOS], index: "Src_Idx")
		timestamp(index: "Time_Idx")
	}

	def beforeInsert = {
		timestamp = new Date().time
	}

}
