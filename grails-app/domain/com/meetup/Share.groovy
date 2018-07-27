package com.meetup

class Share {

	String title

	String content

	Photo image

	int commentCount

	long pubishTime

	static searchable = [only: ['title', 'content']]

	static belongsTo = [group: Group, publisher: User]

	static hasMany = [comments: SComment]

	static mapping = {
		content(type: "text")
	}

	static constraints = {
		image(nullable: true)
		group(index: "Group_Idx")
		publisher(index: "Publisher_Idx")
	}

	def beforeInsert = {
		pubishTime = new Date().time
	}

	def beforeUpdate = {
		pubishTime = new Date().time
	}

}
