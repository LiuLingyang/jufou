package com.meetup

abstract class Comment {

	Comment replied

	String content

	Photo image

	long postTime

	static searchable = [only: 'content']

	static belongsTo = [poster: User]

	static mapping = {
		content(type: "text")
		tablePerHierarchy(false)
	}

    static constraints = {
		image(nullable: true)
		replied(nullable: true)
		poster(index: "Poster_Idx")
    }

	def beforeInsert = {
		postTime = new Date().time
	}

	def beforeUpdate = {
		postTime = new Date().time
	}

}
