package com.meetup

class NewsController extends AbstractController {

	def newsService

	def beforeInterceptor = [action: this.&_updatePermission, except: ["list",
			"rest_get", "rest_list", "show"]]

	private _updatePermission(groupId) {
//		if (actionName.indexOf("create") > -1 || actionName.indexOf("update") > -1
//				|| actionName.indexOf("delete") > -1) {
		if (this.userService.isGroupManagerOrCreator(this._getUserId(), groupId)) {
			return true
		}
//		}
//		else {
//			if (this.userService.isAttendGroupOrMeeting(userId, groupId, 0L)) {
//				return true
//			}
//		}
		return false
	}

	private _updatePermission() {
		if (!actionName.startsWith("rest_")) {
			Group group = this.groupService.getGroupByHomepage(params.gname)
			if (this._updatePermission(group.id)) {
				return true
			}
			forward(controller: "group", action: "index")
		} else {
			long groupId = params.gid ? params.gid.toLong() : (params.nid ?
					this.newsService.getNews(params.nid).groupId : 0L)
			if (this._updatePermission(groupId)) {
				return true
			}
			this._response(Const.PERMISSION_DENIED)
		}
		return false
	}

	def list() {
		def model = this._common(params.gname)
		this._render(view: "list", model: this._model(model))
	}

	def create() {
		def model = this._common(params.gname)
		this._render(view: "create", model: this._model(model))
	}

	def update() {
		def model = this._common(params.gname)
		model.news = this.newsService.getNews(params.third)
		this._render(view: "update", model: this._model(model))
	}

	def show() {
		def model = this._common(params.gname)
		model.news = this.newsService.getNews(params.second)
		this._render(view: "show", model: this._model(model))
	}

	private _filterContent() {
		return this._filterRichText("content")
	}

	def rest_create() {
		if (!this._filterContent()) {
			this._response(Const.XSS_ATTACK)
			return
		}
		News news = new News(params)
		Group group = this.groupService.getGroup(params.gid)
		news.group = group
		this.newsService.createShare(news, params, request)
		this._response(Const.SUCCESS, news)
	}

	def rest_update() {
		if (!this._filterContent()) {
			this._response(Const.XSS_ATTACK)
			return
		}
		News news = this.newsService.updateNews(params.nid, params, request)
		this._response(Const.SUCCESS, news)
	}

	def rest_delete() {
		News news = this.newsService.deleteNews(params.nid, request)
		this._response(Const.SUCCESS, news)
	}

	def rest_get() {
		News news = this.newsService.getNews(params.nid)
		this._response(Const.SUCCESS, news)
	}

	def rest_list() {
		long groupId = params.gid.toLong()
		int total = this.newsService.countNews(groupId)
		def news = this.newsService.listNews(groupId,
				params.offset, params.limit, params.sort, params.order)
		this._response(Const.SUCCESS, [total: total, list: news])
	}

}
