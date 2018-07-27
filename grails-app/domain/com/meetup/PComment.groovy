package com.meetup

class PComment extends Comment {

	static belongsTo = [photo: Photo]

	static constraints = {
//		Comment.constraints.delegate = delegate
		photo(index: "Photo_Idx")
	}

}
