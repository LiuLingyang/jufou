package com.meetup

abstract class Contact {

	String name

	String mobile

	String email

	String qq

	String company

	boolean registered

	static transients = ["registered"]

	static mapping = {
		tablePerHierarchy(false)
	}

	static constraints = {
		name(blank: false, index: "Contact_Idx")
		email(blank: true, email: true, index: "Contact_Idx")
		mobile(blank: true, validator: { val -> !val || val ==~ /^\d{1,}$/ },
				index: "Contact_Idx")
		qq(nullable: true, blank: true, index: "Contact_Idx")
		company(nullable: true, blank: true, index: "Contact_Idx")
	}

}
