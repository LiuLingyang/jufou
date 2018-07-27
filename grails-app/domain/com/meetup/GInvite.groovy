package com.meetup

class GInvite extends Invite {

	static belongsTo = [group: Group]

	static constraints = {
		group(index: "Group_Idx")
	}

}
