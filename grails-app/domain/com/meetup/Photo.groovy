package com.meetup

class Photo {

	String thumbnailURL

	String originalURL

	long uploadTime

	int commentCount

	User uploader

	static hasMany = [comments: PComment]

	static belongsTo = [album: Album]

	static constraints = {
		thumbnailURL(nullable: true)
		originalURL(nullable: true)
		album(index: "Album_Idx")
		uploader(index: "Uploader_Idx")
	}

//	static mapping = {
//		comments(batchSize: 10)
//	}

	def beforeInsert = {
		uploadTime = new Date().time
	}

}
