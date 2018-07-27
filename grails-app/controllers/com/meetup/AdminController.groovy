package com.meetup

class AdminController extends AbstractController {

	static defaultAction = "login"

	def quotaService

	def applicationService

	def tagService

	def beforeInterceptor = [action: this.&_adminPermission, except:
			["login", "rest_login"]]

	def login() {
		this._render(view: "login", model: null)
	}

	def index() {
		this._render(view: "index", model: null)
	}

	def group() {
		this._render(view: "group", model: null)
	}

	def rest_login() {
		User user = this.userService.getUserByName(params.username)
		if (!user || user.password != params.password) {
			this._response(Const.FAIL)
			return
		}
		this._initLogin(user)
		this._response(Const.SUCCESS)
	}

	def rest_logout() {
		this._clearLogin()
		this._response(Const.SUCCESS)
	}

	def rest_users() {
		def callable = {
			if (params.state) {
				eq("state", params.state.toInteger())
			}
			if (params.role && params.role.toInteger() != Const.USER_ROLE_ADMIN) {
				eq("role", params.role.toInteger())
			}
			ne("role", Const.USER_ROLE_ADMIN)
		}
		int total = this.userService.countUsers(callable)
		def users = this.userService.listUsers(callable, params.offset,
				params.limit, params.sort, params.order)
		this._response(Const.SUCCESS, [total: total, list: users])
	}

	def rest_user() {
		User user = this.userService.getUserByName(params.username)
		if (!user) {
			user = this.userService.getUserByEmail(params.username)
		}
		if (!user) {
			user = this.userService.getUserByMobile(params.username)
		}
		if (!user) {
			this._response(Const.USER_NOT_EXIST)
		} else {
			this._response(Const.SUCCESS, user)
		}
	}

	def rest_activate() {
		User user = this.userService.updateUser(
				params.uid, [state: Const.USER_STATE_ACTIVE])
		this._response(Const.SUCCESS, user)
	}

	def rest_auth() {
		User user = this.userService.updateUser(
				params.uid, [role: Const.USER_ROLE_AUTHED])
		this._response(Const.SUCCESS, user)
	}

	def rest_userQuota() {
		User user = this.userService.getUser(params.uid)
		UQuota quota = this.quotaService.updateUserQuota(user.quotaId,
				[groupLimit: params.groupLimit])
		this._response(Const.SUCCESS, quota)
	}

	def rest_groups() {
		def callable = {
			if (params.state) {
				eq("state", params.state.toInteger())
			}
		}
		int total = this.groupService.countGroups(callable)
		def groups = this.groupService.listGroups(callable, params.offset,
				params.limit, params.sort, params.order)
		this._response(Const.SUCCESS, [total: total, list: groups])
	}

	def rest_group() {
		Group group = this.groupService.getGroup(params.group)
		if (!group) {
			group = this.groupService.getGroupByHomepage(params.group)
		}
		if (!group) {
			group = this.groupService.getGroupByName(params.group)
		}
		if (!group) {
			this._response(Const.GROUP_NOT_EXIST)
		} else {
			this._response(Const.SUCCESS, group)
		}
	}

	def rest_groupQuota() {
		Group group = this.groupService.getGroup(params.gid)
		GQuota quota = this.quotaService.updateGroupQuota(group.quotaId,
				[smsLimit: params.smsLimit, photoLimit: params.photoLimit])
		this._response(Const.SUCCESS, quota)
	}

	def rest_application() {
		Group group = this.groupService.getGroup(params.gid)
		this._response(Const.SUCCESS, group.application)
	}

	def rest_approve() {
		Group group = this.groupService.getGroup(params.gid)
		if (!group.application) {
			this._response(Const.APPLICATION_NOT_EXIST)
			return
		}
		String tag = params.tag
		if (params.sub?.toInteger() == 1) {
			tag += "#" + Const.SUB_GROUP_TAG
		} else {
			if (this._isCustomTagUsed(tag, group.id)) {
				this._response(Const.CUSTOM_TAG_USED)
				return
			}
		}
		this.applicationService.approveGroupApplication(group.application.id,
				params.state.toInteger() <= 0, params.reason, tag, this._getUser())
		this._response(Const.SUCCESS, group)
	}

	private _isCustomTagUsed(tag, groupId) {
		Group group = this.groupService.getGroupByCustomTag(tag)
		if (!group || group.id == groupId) {
			return false
		}
		return true
	}

	def rest_groupTag() {
		String tag = params.tag
		if (params.sub) {
			tag += "#" + params.sub
		} else {
			if (this._isCustomTagUsed(tag, params.gid.toLong())) {
				this._response(Const.CUSTOM_TAG_USED)
				return
			}
		}
		def tags = this.tagService.saveGroupTags(params.gid,
				[Const.CUSTOM_GROUP_TAG + tag])
		this._response(Const.SUCCESS, tags)
	}

}
