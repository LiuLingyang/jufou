package com.meetup

class Invite {

	String invitee

	long inviteTime

	long acceptTime

	static belongsTo = [inviter: User]

	static mapping = {
		tablePerHierarchy(false)
	}

	static constraints = {
		inviter(index: "Inviter_Idx")
		invitee(index: "Invitee_Idx")
	}

	def beforeInsert = {
		inviteTime = new Date().time
	}

}
