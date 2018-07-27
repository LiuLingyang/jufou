package com.meetup

class UContact extends Contact {

	static belongsTo = [owner: User]

	static constraints = {
		owner(index: "Owner_Idx")
	}

}
