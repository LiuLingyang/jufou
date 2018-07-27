package com.meetup

abstract class Application {

	String refuse

	long applyTime

	long auditTime

	static mapping = {
		refuse(type: "text")
		tablePerHierarchy(false)
	}

	static constraints = {
		refuse(nullable: true)
	}

	def beforeInsert = {
		applyTime = new Date().time
	}

}
