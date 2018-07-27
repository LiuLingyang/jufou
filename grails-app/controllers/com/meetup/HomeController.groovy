package com.meetup

class HomeController extends AbstractController {

	def eventService

	def meetingService

	def updateService

	def index() {
		def groups = this.groupService.listDistinctGroups({
			this.configService.getSortProperties("hot")?.each { prop ->
				order(prop, prop == "createTime" ? "asc" : "desc")
			}
			eq("state", Const.STATE_NORMAL)
			maxResults(10)
		})
		def recStartTimes = groups.collectEntries { item ->
			def meetings = this.meetingService.listMeetings({
				group {
					eq("id", item.id)
				}
				gt("startTime", System.currentTimeMillis())
			}, 0, 1, "startTime", "asc")
			new AbstractMap.SimpleEntry(item.id,
					meetings.size() == 0 ? 0 : meetings[0].createTime)
		}
		def events = this.eventService.listEvents({}, 0, 10,
				"createTime", "desc")
		def groupCount = this.groupService.countGroups({
			eq("state", Const.STATE_NORMAL)
		})
		def meetingCount = this.meetingService.countMeetings({
			eq("state", Const.STATE_NORMAL)
		})
		this._render(view: "index", model: this._model([
				recGroups: groups, recStartTimes: recStartTimes, events: events,
				groupCount: groupCount, meetingCount: meetingCount]))
//        if (request.getSession(true).user) {
//            forward(action: "main")
//        } else {
//            this._render(view: "index", model: this._model([name: "测试"]))
//        }
	}

//    def gate() {
//        if (session.user) {
//            redirect(action: "main")
//        } else {
//            redirect(action: "index")
//        }
//    }

	def rest_category() {
		this._response(Const.SUCCESS, Const.GROUP_CATEGORIES)
	}

	def download() {
		def model = [:]
		model.android = this.updateService.getNextUpdate(
				Const.USER_AGENT_ANDROID)?.url
		model.ios = this.updateService.getNextUpdate(
				Const.USER_AGENT_IOS)?.url
		this._render(view: "download", model: this._model(model))
	}

	private _url(url) {
		if (url.startsWith("http://") || url.startsWith("https://")) {
			return url
		}
		return AppUtil.baseUrl() + url
	}

	def app() {
//		if (params.plist != null) {
//			String plist = this.templateService.mergeTemplate([baseUrl:
//					AppUtil.baseUrl(), downloadUrl: this.updateService.
//					getNextUpdate(Const.USER_AGENT_IOS)?.url], "app/ios.ftl")
//			render(contentType: "text/xml", text: plist)
//			return
//		}
		String ua = this._userAgent(request, true)
		if (![Const.USER_AGENT_IOS, Const.USER_AGENT_ANDROID].contains(ua)) {
			this._response(Const.ILLEGAL_REQUEST)
			return
		}
//		if (ua == Const.USER_AGENT_IOS) {
//			String url = String.format(this.grailsApplication.config.
//					app.ios.download.url, AppUtil.baseUrl())
//			response.sendRedirect(url)
//			return
//		}
		Update update = this.updateService.getNextUpdate(ua)
		if (!update) {
			this._response(Const.ILLEGAL_REQUEST)
			return
		}
		response.sendRedirect(this._url(update.url))
	}

}
