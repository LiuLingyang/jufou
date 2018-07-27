package com.meetup

class ShortLink {

	String stub

	String skeleton

	long createTime

	static constraints = {
		stub(unique: true, index: "Stub_Idx")
		skeleton(index: "Skeleton_Idx")
	}

	def beforeInsert = {
		createTime = new Date().time
	}

}

