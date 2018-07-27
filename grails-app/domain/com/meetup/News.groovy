package com.meetup

class News {

	String subject

	String content

	String digest

	String figure

	String cover

	String author

	long createTime

	long updateTime

	static belongsTo = [group: Group]

	static searchable = {
		all(termVector: "yes")
	}

	static mapping = {
		digest(type: "text")
		content(type: "text")
	}

	static constraints = {
		subject(blank: false)
		group(index: "Group_Idx")
		content(blank: false)
		digest(nullable: true)
		figure(nullable: true)
		cover(nullable: true)
		author(nullable: true)
	}

	def beforeInsert = {
		createTime = new Date().time
	}

	def beforeUpdate = {
		updateTime = new Date().time
	}

}
