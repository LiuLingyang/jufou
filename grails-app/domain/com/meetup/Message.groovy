package com.meetup

class Message {

	/**
	 * 1 - 活动
	 * 2 - 评论
	 * 3 - 系统消息
	 */
	int type

	String title

	String content

	String body

//	boolean readed

	String template

//	String client

	long createTime

	User sender

	boolean deleted

	static hasMany = [receipts: Receipt]

	static transients = ["title", "body"]

	static mapping = {
//		receipts(batchSize: 10, sort: "id", order: "asc")
		content(type: "text")
		body(type: "text")
	}

	static searchable = {
		only = ["title", "body"]
	}

	static constraints = {
		template(nullable: true)
		type(index: "Type_Idx")
		sender(nullable: true, index: "Sender_Idx")
		receipts(nullable: true)
//		receivers(index: "Receiver_Idx")
	}

	def beforeInsert = {
		createTime = new Date().time
	}

}
