package com.meetup

class GQuota {

	Group group

	int smsLimit

	int smsUsed

	int photoLimit

	int photoUploaded

	static constraints = {
		smsUsed(validator: { val, obj ->
			if (obj.smsLimit > 0) {
				val <= obj.smsLimit
			} else {
				true
			}
		})
		photoUploaded(validator: { val, obj ->
			if (obj.photoLimit > 0) {
				val <= obj.photoLimit
			} else {
				true
			}
		})
	}

}
