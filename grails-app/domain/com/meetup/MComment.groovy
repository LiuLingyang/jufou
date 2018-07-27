package com.meetup

class MComment extends Comment {

	static belongsTo = [meeting: Meeting]

	static constraints = {
//		Comment.constraints.delegate = delegate
		meeting(index: "Meeting_Idx")
	}

}
