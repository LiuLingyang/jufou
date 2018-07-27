package com.meetup

class AtmosphereService {

	static transactional = false

	static atmosphere = [mapping: "/atmosphere/*"]

	def onRequest = { event ->
	}

	def onStateChange = { event ->
	}

}
