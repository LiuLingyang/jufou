package com.meetup

class Binding {

	int type

	String access

	String openId

	long expireTime

	String ext

	String refresh

	static belongsTo = [account: User]

	static mapping = {
		ext(type: "text")
	}

	static constraints = {
		account(index: "Account_Idx", nullable: true)
		openId(index: "Open_Idx")
		type(range: Const.BINDING_TYPE_SINA..Const.BINDING_TYPE_WEIXIN, index: "Type_Idx")
		refresh(nullable: true)
	}

}
