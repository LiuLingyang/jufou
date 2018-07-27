package com.meetup

class GContact extends Contact {

	static belongsTo = [group: Group]

	static constraints = {
		group(index: "Group_Idx")
	}

}
