package com.meetup

class MApplication extends Application {

	Meeting meeting

	static constraints = {
		meeting(index: "Meeting_Idx")
	}

}
