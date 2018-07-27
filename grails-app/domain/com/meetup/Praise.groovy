package com.meetup

class Praise {

	User favorer

	static belongsTo = [group: Group]

	static constraints = {
		favorer(index: "Praise_Idx")
		group(index: "Praise_Idx")
	}

}
