package com.meetup

class Token {

	String secret

	int type

	long createTime

	static belongsTo = [user: User]

	static constraints = {
		user(index: "User_Idx")
		type(range: Const.TOKEN_ACTIVATE..Const.TOKEN_GCM, index: "Type_Idx")
		secret(index: "Secret_Idx")
		createTime(index: "Time_Idx")
	}

	def beforeInsert = {
		createTime = new Date().time
	}

}
