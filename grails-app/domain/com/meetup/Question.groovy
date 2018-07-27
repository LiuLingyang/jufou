package com.meetup

abstract class Question {

    String question

	static hasMany = [answers: Answer]

    static constraints = {
        question(blank: false)
    }

	static mapping = {
//		sort(question: "asc")
//		answers(batchSize: 10, sort: "id", order: "asc")
		tablePerHierarchy(false)
	}

}
