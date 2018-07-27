package com.meetup

import java.text.SimpleDateFormat

class ParamsFilters {

	def filters = {

		params(controller: '*', action: '*') {
			before = {
				String timestamp = new SimpleDateFormat("HH:mm:ss:SSS")
						.format(System.currentTimeMillis())
				println "[" + timestamp + "] DEBUG Parameters of request: [" +
						request.getMethod().toUpperCase() + "] " + request.forwardURI
				params?.each { k, v ->
					println(k + ": " + v)
				}
			}
		}

	}

}
