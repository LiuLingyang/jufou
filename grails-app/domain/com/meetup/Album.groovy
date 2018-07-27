package com.meetup

class Album {

	String name

	String coverUrl

	int photoCount

	long createTime

	long updateTime

	static hasMany = [photos: Photo]

	static belongsTo = [group: Group, meeting: Meeting]

	static searchable = [only: 'name']

	static constraints = {
		name(blank: false)
		coverUrl(nullable: true)
//		group(nullable: true)
		group(index: "Group_Idx")
		meeting(nullable: true, index: "Meeting_Idx")
	}

//	static mapping = {
//		photos(batchSize: 10, sort: "id", order: "asc")
//	}

	def beforeInsert = {
		createTime = new Date().time
	}

	def beforeUpdate = {
		updateTime = new Date().time
	}

}
