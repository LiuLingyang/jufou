package com.meetup

class EventController extends AbstractController {

	def eventService

//	def rest_recent() {
//		def events = params.gid ? Event.findAllByGroup(Group.findById(params.gid),
//				[offset: params.offset, max: params.limit,
//						sort: "createTime", order: "desc"]) :
//			Event.listOrderByCreateTime(max: params.limit, order: "desc")
//		this._response(Const.SUCCESS, events)
//	}

	def rest_list() {
		def callable = {
			if (params.gid) {
				group {
					eq("id", params.gid.toLong())
				}
			}
			if (params.type) {
				between("type", params.type.toInteger() * 10,
						(params.type.toInteger() + 1) * 10)
			}
		}
		int total = this.eventService.countEvents(callable)
		def events = this.eventService.listEvents(callable,
				params.offset, params.limit, "createTime", "desc")
		this.eventService.reconstructEvents(events)
		this._response(Const.SUCCESS, [total: total, list: events])
	}

	def rest_recent() {
		def callable = {
			between("createTime",
					params.startTime.toLong(), params.endTime.toLong())
			if (params.type) {
				between("type", params.type.toInteger() * 10,
						(params.type.toInteger() + 1) * 10)
			}
		}
		int total = this.eventService.countEvents(callable)
		def events = this.eventService.listEvents(callable,
				params.offset, params.limit, "createTime", "desc")
		this.eventService.reconstructEvents(events)
		this._response(Const.SUCCESS, [total: total, list: events])
	}

}
