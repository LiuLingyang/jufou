package com.meetup

abstract class Tag {

    String name

	static searchable = [only: 'name']

	static mapping = {
		tablePerHierarchy(false)
	}

    static constraints = {
        name(blank: false, index: "Tag_Idx")
    }

}
