package com.meetup

class PSettings extends Settings {

	GAttendance attendance

	static mapping = {
		discriminator("pc")
	}

	static constraints = {
		attendance(index: "Attendance_Idx", nullable: true)
	}

}
