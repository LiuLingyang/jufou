package com.meetup

class GQuestion extends Question {

    boolean publish

    static belongsTo = [group: Group]

	static constraints = {
		group(index: "Group_Idx")
	}

}
