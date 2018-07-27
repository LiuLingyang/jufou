package com.meetup

class MInvite extends Invite {

	static belongsTo = [meeting: Meeting]

    static constraints = {
		meeting(index: "Meeting_Idx")
    }

}
