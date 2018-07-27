package com.meetup

class UQuota {

	User user

	int groupLimit

	int groupCreated

	static constraints = {
		groupCreated(validator: { val, obj ->
			if (obj.groupLimit > 0) {
				val <= obj.groupLimit
			} else {
				true
			}
		})
	}

}
