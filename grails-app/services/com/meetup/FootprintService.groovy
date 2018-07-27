package com.meetup

import org.springframework.transaction.annotation.Transactional

@Transactional
class FootprintService extends AbstractService {

	@Transactional(readOnly = true)
	def listFootprints(callable, offset = null, limit = null,
					   sort = "timestamp", order = "asc") {
		def args = this._criteriaArgs(offset, limit, sort, order)
		return Footprint.createCriteria().list(args, callable)
	}

	@Transactional(readOnly = true)
	def countFootprints(callable) {
		return Footprint.createCriteria().count(callable)
	}

	def saveFootprint(footprint) {
		footprint.save()
	}

	def createFootprint(footprint) {
		this.saveFootprint(footprint)
	}

}
