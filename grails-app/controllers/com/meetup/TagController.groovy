package com.meetup

class TagController extends AbstractController {

	def tagService

	def beforeInterceptor = [action: this.&_creatorPermission, only: ["rest_group"]]

	private _creatorPermission() {
		if (this.userService.isGroupManagerOrCreator(this._getUserId(), params.gid.toLong())) {
			return true
		}
		this._response(Const.PERMISSION_DENIED)
		return false
	}

	// 获取推荐标签
	def rest_rec() {
		def tags = []
		if (params.gid) {
			tags = this.tagService.getRecommendGroupTags(params.gid)
		}
		if (params.mid) {
			tags = this.tagService.getRecommendMeetingTags(params.mid)
		}
		this._response(Const.SUCCESS, tags.size() < 10 ? tags : tags[0..<10])
	}

	// 设置组织标签
	def rest_group() {
		def nTags = params.tag?.split(",")?.toList()?.unique()
		def tags = this.tagService.saveGroupTags(params.gid, nTags)
		this._response(Const.SUCCESS, tags)
	}

	// 取使用标签的组织数量
	def rest_groupcount() {
		int count = this.groupService.countGroups({
			tags {
				eq("name", params.tag)
			}
			eq("state", Const.STATE_NORMAL)
		})
		this._response(Const.SUCCESS, count)
	}

	// 取使用标签的组织
	def rest_groups() {
		def callable = {
			tags {
				eq("name", params.tag)
			}
			eq("state", Const.STATE_NORMAL)
		}
		int total = this.groupService.countGroups(callable)
		def groups = this.groupService.listGroups(callable,
				params.offset, params.limit, params.sort, params.order)
		this._response(Const.SUCCESS, [total: total, list: groups])
	}

	// 取使用标签的活动数量
	def rest_meetingcount() {
		int count = this.meetingService.countMeetings({
			tags {
				eq("name", params.tag)
			}
			eq("state", Const.STATE_NORMAL)
		})
		this._response(Const.SUCCESS, count)
	}

	// 取使用标签的活动
	def rest_meetings() {
		def callable = {
			tags {
				eq("name", params.tag)
			}
			eq("state", Const.STATE_NORMAL)
		}
		int total = this.meetingService.countMeetings(callable)
		def meetings = this.meetingService.listMeetings(callable,
				params.offset, params.limit, params.sort, params.order)
		this._response(Const.SUCCESS, [total: total, list: meetings])
	}

}
