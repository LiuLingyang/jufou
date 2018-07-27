package com.meetup

abstract class Settings {

	boolean meetingCreate

	boolean meetingUpdate

	boolean meetingJoin

	boolean meetingComment

	boolean photoUpload

	boolean memberJoin

	boolean memberExit

	User user

	static constraints = {
		user(index: "User_Idx", nullable: true)
	}

	static mapping = {
		discriminator(column: "agent")
	}

}
