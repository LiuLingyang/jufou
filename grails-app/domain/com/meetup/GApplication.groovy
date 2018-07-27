package com.meetup

class GApplication extends Application {

	Group group

	String contact

	String means

	String reason

	static mapping = {
		reason(type: "text")
	}

	static constraints = {
		group(index: "Group_Idx")
		contact(blank: false)
		means(blank: false)
		reason(blank: false)
	}

}
