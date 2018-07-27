package com.meetup

class SComment extends Comment {

	static belongsTo = [share: Share]

	static constraints = {
		share(index: "Share_Idx")
	}

}
