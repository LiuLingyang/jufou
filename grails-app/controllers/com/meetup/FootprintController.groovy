package com.meetup

class FootprintController extends AbstractController {

	def footprintService

	def rest_create() {
		if (!params.source) {
			params.source = this._userAgent(request, true)
		}
		Footprint footprint = new Footprint(params)
		footprint.user = this._getUser()
		this.footprintService.createFootprint(footprint)
		this._response(Const.SUCCESS, footprint)
	}

	def rest_list() {
		def callable = {
			user {
				eq("id", this._getUserId())
			}
		}
		int total = this.footprintService.countFootprints(callable)
		def footprints = this.footprintService.listFootprints(callable,
				params.offset, params.limit, params.sort, params.order)
		this._response(Const.SUCCESS, [total: total, list: footprints])
	}

}
