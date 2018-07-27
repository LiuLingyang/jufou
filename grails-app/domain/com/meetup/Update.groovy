package com.meetup

class Update {

	String type

	String release

	String client

	String url

	String notes

	long size

	boolean force

	long releaseTime

	static mapping = {
		table "`UPDATE`"
		force(column: "`force`")
		release(column: "`release`")
		notes(type: "text")
	}

    static constraints = {
		type(index: "Update_Idx")
		release(index: "Update_Idx")
		client(index: "Update_Idx")
		url(nullable: true)
		notes(nullable: true)
    }

	def beforeInsert = {
		releaseTime = new Date().time
	}

}
