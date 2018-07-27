package com.meetup

class MQuestion extends Question {

    static belongsTo = [meeting: Meeting]

	static constraints = {
		meeting(index: "Meeting_Idx")
	}

}
