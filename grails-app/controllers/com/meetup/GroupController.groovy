package com.meetup

class GroupController extends AbstractController {

	def contactService

	def questionService

	def praiseService

	def quotaService

	def applicationService

	def tagService

	def beforeInterceptor = [action: this.&_creatorPermission,
							 only  : ["rest_update*", "rest_addQuestion", "rest_deleteQuestion",
									  "rest_dismiss", "rest_role", "rest_kickout", "rest_create",
									  "create", "rest_check", "basicSetting", "memberSetting",
									  "privacySetting", "tagSetting", "themeSetting", "rest_clipLogo",
									  "rest_export", "rest_apply", "rest_cocreate"]]

	private _creatorPermission() {
		User user = this._getUser()
		if (actionName.endsWith("Setting")) {
			Group group = this.groupService.getGroupByHomepage(params.gname)
			if (this.userService.isGroupManagerOrCreator(user.id, group.id)) {
				return true
			}
			forward(action: "index")
		} else if (actionName.endsWith("create")) {
//			if (user.role == Const.USER_ROLE_AUTHED &&
//					user.quota.groupCreated < user.quota.groupLimit) {
			if (user.quota.groupCreated < user.quota.groupLimit) {
				return true
			}
			if (actionName.startsWith("rest_")) {
				this._response(Const.PERMISSION_DENIED)
			} else {
				forward(action: "competence")
			}
		} else {
			long groupId = params.gid ? params.gid.toLong() : (params.qid ?
					this.questionService.getQuestion(params.qid).groupId : 0L)
			if (this.groupService.checkRole(groupId, user.id,
					actionName.endsWith("check") || actionName.endsWith("export")
							|| actionName.endsWith("Logo") || actionName.endsWith("Question") ?
							[Const.ROLE_CREATOR, Const.ROLE_COCREATOR, Const.ROLE_MANAGER] : [Const.ROLE_CREATOR, Const.ROLE_COCREATOR])) {
				return true
			}
			this._response(Const.PERMISSION_DENIED)
		}
		return false
	}

	def index() {
		def model = this._common(params.gname)
		if (!this.userService.isViewGroupPermitted(this._getUserId(), model.group)) {
			forward(action: "about")
			return
		}
		model.photos = this.photoService.listPhotos({
			album {
				group {
					eq("id", model.group.id)
				}
			}
//			fetchMode("album", FetchMode.EAGER)
		}, 0, 2, "uploadTime", "desc")
//		model.user = this._getUser()
		model.joinCount = this.attendanceService.countAttendances({
			group {
				eq("id", model.group.id)
			}
			eq("state", Const.GROUP_ATTEND_STATE_SUBMIT)
		}, Group.class)
//		def callable = { tobe ->
//			group {
//				eq("id", model.group.id)
//			}
//			if (tobe) {
//				or {
//					ge("startTime", time)
//					and {
//						lt("startTime", time)
//						gt("endTime", time)
//					}
//					and {
//						le("endTime", 0L)
//						between("startTime", this._getMeetingEndTime(0L) + 1, time - 1)
//					}
//				}
//			} else {
//				or {
//					between("endTime", 1L, time - 1)
//					and {
//						le("endTime", 0L)
//						le("startTime", this._getMeetingEndTime(0L))
//					}
//				}
//			}
//			eq("state", Const.STATE_NORMAL)
//		}
		model.tobeCount = this.meetingService.countMeetings(
				this._listGroupMeetingCallable(model.group.id, 0))
		model.endedCount = this.meetingService.countMeetings(
				this._listGroupMeetingCallable(model.group.id, 1))
		this._render(view: "home", model: this._model(model))
	}

	def create() {
		this._render(view: "create", model: this._model(this._categories(null)))
	}

	def search() {
		this._render(view: "search", model: this._model(this._categories(null)))
	}

	def invite() {
		def model = this._common(params.gname)
		if (params.second) {
			model.meeting = this.meetingService.getMeeting(params.second)
		}
		GQuota quota = this.quotaService.getGroupQuota(model.group.quotaId)
		model.smsRemaining = quota.smsLimit - quota.smsUsed
		this._render(view: "invite", model: this._model(model))
	}

	def member() {
		boolean update = params.second == "update"
		def model = this._common(params.gname)
		long memberId = update ? params.third.toLong() : params.second.toLong()
		model.member = this.groupService.relationship(model.group.id, memberId)
//		User attendee = this._getUser(update ? params.third : params.second)
//		GAttendance attendance = GAttendance.findByGroupAndAttendee(model.group, attendee, [fetch: [attendee: "eager"]])
		model.attendance = this.attendanceService.getGroupAttendance(model.group.id, memberId)
//		model.attendee = attendee
//		model.attendance = attendance
//		model.questions = []
//		model.answers = []
//		model.group.questions?.sort { question ->
//			question.id
//		}.each { question ->
//			model.questions += question.question
//			Answer answer = attendance.answers?.find { answer ->
//				answer.question.id == question.id
//			}
//			model.answers += answer?.answer
//		}
		this._render(view: "member/" + (update ? "update" : "card"),
				model: this._model(model))
	}

	def members() {
		def model = this._common(params.gname)
		Group group = model.group
		model.allCount = group.memberCount
		model.adminCount = group.attendances.count { attendance ->
			attendance.role == Const.ROLE_MANAGER ||
				attendance.role == Const.ROLE_COCREATOR ||
					attendance.role == Const.ROLE_CREATOR
		}
		model.joinCount = group.attendances.count { attendance ->
			attendance.state == Const.GROUP_ATTEND_STATE_SUBMIT
		}
		model.banCount = group.attendances.count { attendance ->
			attendance.state == Const.GROUP_ATTEND_STATE_REFUSE
		}
		this._render(view: "members", model: this._model(model))
	}

	def photo() {
		this._render(view: "photo", model: this._model(null))
	}

	def setting() {
		def model = this._common(params.gname)
		this._render(view: "setting", model: this._model(model))
	}

	def join() {
		def model = this._common(params.gname)
//		GAttendance attendance = this.attendanceService.
//				getGroupAttendance(model.group.id, this._getUserId())
//		model.attendance = attendance
		this._render(view: "join", model: this._model(model))
	}

	def inform() {
		def model = this._common(params.gname)
		if (params.second) {
			model.meeting = this.meetingService.getMeeting(params.second)
		}
		this._render(view: "inform", model: this._model(model))
	}

	def about() {
		def model = this._common(params.gname)
		this._render(view: "about", model: this._model(model))
	}

	def basicSetting() {
		def model = this._common(params.gname)
		model = this._categories(model)
		this._render(view: "setting/basic", model: this._model(model))
	}

	def memberSetting() {
		def model = this._common(params.gname)
		model.questions = this.questionService.listGroupQuestions(
				model.group.id)
		this._render(view: "setting/member", model: this._model(model))
	}

	def privacySetting() {
		def model = this._common(params.gname)
		this._render(view: "setting/privacy", model: this._model(model))
	}

	def tagSetting() {
		def model = this._common(params.gname)
		model.tags = this.tagService.listGroupTags([model.group.id])
		this._render(view: "setting/tag", model: this._model(model))
	}

	def themeSetting() {
		def model = this._common(params.gname)
		this._render(view: "setting/theme", model: this._model(model))
	}

	def messageSetting() {
		def model = this._common(params.gname)
		GAttendance attendance = this.attendanceService.
				getGroupAttendance(model.group.id, this._getUserId())
		model.setting = attendance.settings ? attendance.settings :
				attendance.attendee.psettings
		this._render(view: "setting/message", model: this._model(model))
	}

	def competence() {
		this._render(view: "competence", model: this._model(null))
	}

//	def share() {
//		Group group = this.groupService.getGroupByHomepage(params.gname)
//		this._render(view: "share", model: [group: group])
//	}

	def apply() {
		def model = this._common(params.gname)
		model.apply = model.group.application
		this._render(view: "apply", model: this._model(model))
	}

	def detail() {
		Group group = this.groupService.getGroupByHomepage(params.gname)
		this._render(view: "detail", model: [group: group])
	}

	def contact() {
		def model = this._common(params.gname)
		this._render(view: "contact", model: this._model(model))
	}

	def sub() {
		def model = this._common(params.gname)
		this._render(view: "sub", model: this._model(model))
	}

	// 创建组织
	def rest_create() {
		User owner = this._getUser()
		if (owner.quota.groupCreated >= owner.quota.groupLimit) {
			this._response(Const.GROUP_QUOTA_BEYOND)
			return
		}
		if (this.groupService.getGroupByHomepage(params.homepage)) {
			this._response(Const.GROUP_EXIST)
			return
		}
		params.description = this._filterWords(params.description)
		Group group = new Group(params)
		group.owner = owner
		GAttendance attendance = new GAttendance(attendee: owner,
				state: Const.GROUP_ATTEND_STATE_ACCEPTED)
		attendance.role = Const.ROLE_CREATOR
		group.addToAttendances(attendance)
		group.memberCount = 1
		group.quota = new GQuota(smsLimit: this.grailsApplication.config.
				app.group.quota.sms.toInteger(), photoLimit: this.grailsApplication.config.
				app.group.quota.sms.toInteger())
//		group.save(flush: true)
		this.groupService.createGroup(group)
		this._response(Const.SUCCESS, group)
	}

	// 更新组织基本信息
	def rest_update() {
		this._position()
		params.description = this._filterWords(params.description)
		Group group = this.groupService.updateGroup(params.gid, params)
		this._response(Const.SUCCESS, group)
	}

//	// 添加组织档案问题
//	def rest_addQuestion() {
//		GQuestion question = new GQuestion(params)
//		Group group = Group.findById(params.gid)
//		group.addToQuestions(question).save(flush: true)
//		this._validate_response(group, question, null)
//	}

	// 添加组织档案问题
	def rest_addQuestion() {
		GQuestion question = new GQuestion(params)
		this.questionService.saveGroupQuestion(question, params.gid)
		this._response(Const.SUCCESS, question)
	}

	// 更新组织档案问题
	def rest_updateQuestion() {
		GQuestion question = new GQuestion(params)
		this.questionService.updateGroupQuestion(params.qid, question)
		this._response(Const.SUCCESS, question)
	}

//	// 删除组织档案问题
//	def rest_deleteQuestion() {
//		Group group = Group.findById(params.gid)
//		GQuestion question = GQuestion.findById(params.qid)
//		group.attendances?.each { attendance ->
//			attendance.answers = attendance.answers.findAll {
//				it.question.id != question.id
//			}
//		}
//		group.questions = group.questions.findAll {
//			it.id != question.id
//		}
//		group.save(flush: true)
//		this._validate_response(group, null, null)
//	}

	// 删除组织档案问题
	def rest_deleteQuestion() {
		Question question = this.questionService.deleteQuestion(params.qid)
		this._response(Const.SUCCESS, question)
	}

	def rest_apply() {
		GApplication application = new GApplication(params)
		application.group = this.groupService.getGroup(params.gid)
		this.applicationService.createApplication(application)
		this._response(Const.SUCCESS, application)
	}

	def rest_updateApplication() {
		Group group = this.groupService.getGroup(params.gid)
		if (!group.application) {
			this._response(Const.APPLICATION_NOT_EXIST)
			return
		}
		Application application = this.applicationService.updateApplication(group.application.id, params)
		this._response(Const.SUCCESS, application)
	}

	// 搜索组织
	def rest_search() {
		def groupIds = !params.tag ? (params.keyword ? this.groupService.listGroups({
			projections {
				distinct("id")
			}
			tags {
				like("name", "%" + params.keyword + "%")
			}
		}) : null) : this._customGroupIds(params.tag)
		def area = this._buildDistanceArea()
		def callable = { count, category ->
			projections {
				if (count) {
					countDistinct("id")
				} else {
					if (area) {
						sqlProjection("distinct this_.id as gid, " + String.format(
								Const.DISTANCE_COMPUTATION, "this_.latitude",
								"this_.longitude", params.latitude.toDouble(),
								params.longitude.toDouble(), Const.EARTH_RADIUS) +
								" as distance" + this._buildDistanceSql(params.sort,
								Group.class), ["gid", "distance"], [LONG, DOUBLE])
					} else {
						distinct("id")
						this.configService.getSortProperties(params.sort)?.each { prop ->
							property(prop)
						}
					}
				}
			}
			if (area) {
				between("latitude", area[0], area[2])
				between("longitude", area[1], area[3])
			}
			if (params.province) {
				eq("province", params.province)
			}
			if (params.city) {
				eq("city", params.city)
			}
			if (params.area) {
				eq("area", params.area)
			}
			if (params.section) {
				eq("section", params.section)
			}
			if (!category && params.category) {
				eq("category", params.category)
			}
			if (params.tag) {
				inList("id", groupIds?.size() > 0 ? groupIds : [0L])
				if (params.keyword) {
					like("name", "%" + params.keyword + "%")
				}
			} else if (params.keyword) {
				or {
					like("name", "%" + params.keyword + "%")
					if (groupIds?.size() > 0) {
						inList("id", groupIds)
					}
//					tags {
//						like("name", "%" + params.keyword + "%")
//					}
				}
			}
			eq("state", Const.STATE_NORMAL)
//			resultTransformer(Criteria.DISTINCT_ROOT_ENTITY)
		}
		int total = this.groupService.countGroups(callable.curry(true, false), true)
		def gids = this.groupService.listGroups(callable.curry(false, false),
				params.offset, params.limit, params.sort, params.order)
		def groups = this._buildDistinct(gids, !!area)
		this._computeDistance(groups)
		gids = area ? this.groupService.listGroups(callable.curry(false, true)) :
				this.groupService.listGroups(callable.curry(false, true))
		def categories = this.groupService.listGroups({
			projections {
				count("id")
				groupProperty("category")
			}
			inList("id", gids?.size() > 0 ? gids.collect {
				it instanceof Object[] ? it[0] : it
			} : [0L])
		})?.collectEntries {
			new AbstractMap.SimpleEntry(it[1], it[0])
		}
		def upcomings = groups?.collectEntries { group ->
			new AbstractMap.SimpleEntry(group.id,
					this.meetingService.countUpcoming(group.id))
		}
		this._response(Const.SUCCESS, this._simplify(
				[total   : total, list: groups, count: categories,
				 upcoming: upcomings]))
	}

	// 加入组织
	def rest_join() {
		User attendee = this._getUser()
		Group group = this.groupService.getGroup(params.gid)
		if ((group.submitIntro && !params.intro) ||
				(group.submitAnswer && !params.answer)) {
			this._response(Const.MISSING_INFORM)
			return
		}
		GAttendance attendance = this.attendanceService.
				getGroupAttendance(params.gid.toLong(), this._getUserId())
		if (params.update?.toBoolean()) {
			if (!attendance) {
				this._response(Const.NOT_JOINED)
				return
			}
//			def answers = [] + attendance.answers
//			answers.each { answer ->
//				attendance.removeFromAnswers(answer)
//				answer.delete()
//			}
		} else {
			if (attendance) {
				this._response(Const.ALREADY_JOINED)
				return
			}
			long inviter = 0L
			if (this._checkInviteCookie()) {
				String[] ss = this._parseInviteCookies(true)
				if (!ss) {
					this._response(Const.TOKEN_EXPIRED_OR_DAMAGED)
					return
				}
//				if (ss[1] == attendee.email || ss[1] == attendee.mobile) {
				inviter = ss[0].toLong()
//				}
			}
			boolean isInvited = group.owner.id == inviter
			int state = isInvited ? Const.GROUP_ATTEND_STATE_ACCEPTED :
					Const.GROUP_ATTEND_STATE_SUBMIT
			attendance = new GAttendance(attendee: attendee, group: group,
					state: state, invited: isInvited)
		}
//		def file = request.getFile("portrait")
//		if (file && (file.empty || file.size > Const.PHOTO_MAX_SIZE)) {
//			// 文件超出大小
//			this._response(Const.FILE_EXCEED_SIZE, null)
//			return
//		}
//		if (!file) {
//			attendance.portrait = params.portrait2
//		}
		attendance.bio = params.intro ? params.intro : null
		this.groupService.joinGroup(attendance, params.answer,
				params.update?.toBoolean(), this._getInvitee())
		this._clearInvite()
		this._response(Const.SUCCESS, attendance)
//		if (file) {
//			String url = this._upload(file, "/portrait", "gattendance", attendance.id)
//			attendance = GAttendance.lock(attendance.id)
//			attendance.portrait = url
//			attendance.save()
//		}
	}

	// 获取某个用户加入的组织
	def rest_getJoinList() {
		long userId = params.uid.toLong()
		def callable = {
			attendances {
				attendee {
					eq("id", userId)
				}
				eq("state", Const.GROUP_ATTEND_STATE_ACCEPTED)
			}
			eq("state", Const.STATE_NORMAL)
			owner {
				ne("id", userId)
			}
		}
		int total = this.groupService.countGroups(callable)
		def groups = this.groupService.listGroups(callable,
				params.offset, params.limit, params.sort, params.order)
		this._computeDistance(groups)
		def relationships = this._relationships(groups, userId)
		this._response(Const.SUCCESS, this._simplify(
				[total: total, list: groups, relation: relationships]))
	}

	// 获取某个组织成员所在的其他组织
	def rest_getMemberJoinList() {
		Group group = this.groupService.getGroup(params.gid)
		def attendeeIds = this._members(group.id)
		def callable = { count ->
			projections {
				if (count) {
					countDistinct("id")
				} else {
					distinct("id")
					this.configService.getSortProperties(params.sort)?.each { prop ->
						property(prop)
					}
				}
			}
			attendances {
				attendee {
//					inList("id", group.attendances?.collect { attendance ->
//						attendance.attendee.id
//					})
					inList("id", attendeeIds?.size() > 0 ? attendeeIds : [0L])
				}
				eq("state", Const.GROUP_ATTEND_STATE_ACCEPTED)
			}
			ne("id", group.id)
			eq("state", Const.STATE_NORMAL)
		}
		int total = this.groupService.countGroups(callable.curry(true), true)
		// 官方文档说listDistinct在分页情况下可能会有问题
//		def groups = criteria.listDistinct {
//			attendances {
//				attendee {
//					inList("id", group.attendances?.collect { attendance ->
//						attendance.attendee.id
//					})
//				}
//			}
//			ne("id", group.id)
//			order(params.sort, params.order)
//			firstResult(params.offset.toInteger())
//			maxResults(params.limit.toInteger())
//		}
		def gids = this.groupService.listGroups(callable.curry(false),
				params.offset, params.limit, params.sort, params.order)
		def groups = this._buildDistinct(gids)
		this._computeDistance(groups)
		this._response(Const.SUCCESS, this._simplify([total: total, list: groups]))
	}

	private _buildDistinct(gids, distance = false) {
		def gmap = this.groupService.listGroups({
			inList("id", gids?.size() > 0 ? gids.collect {
				it instanceof Object[] ? it[0] : it
			} : [0L])
		})?.collectEntries { group ->
			new AbstractMap.SimpleEntry(group.id, group)
		}
		return distance ? this._buildDistance(gids, gmap) :
				this._buildEntities(gids, gmap)
	}

	// 获取组织成员列表
	def rest_members() {
		def callable = {
			group {
				eq("id", params.gid.toLong())
			}
			if (params.role?.toInteger() == 0) {
				or {
					inList("role", [Const.ROLE_CREATOR, Const.ROLE_COCREATOR, Const.ROLE_MANAGER])
					and {
						eq("role", Const.ROLE_MEMBER)
						eq("state", Const.GROUP_ATTEND_STATE_ACCEPTED)
					}
				}
			}
			if (params.role?.toInteger() == 1) {
				inList("role", [Const.ROLE_CREATOR, Const.ROLE_COCREATOR, Const.ROLE_MANAGER])
			}
			if (params.role?.toInteger() == 2) {
				eq("role", Const.ROLE_MEMBER)
				eq("state", Const.GROUP_ATTEND_STATE_SUBMIT)
			}
			if (params.role?.toInteger() == 3) {
				eq("role", Const.ROLE_MEMBER)
				eq("state", Const.GROUP_ATTEND_STATE_REFUSE)
			}
			if (params.keyword) {
				attendee {
					or {
						like("username", "%" + params.keyword + "%")
						like("nickname", "%" + params.keyword + "%")
					}
				}
			}
		}
		int total = this.attendanceService.countAttendances(
				callable, Group.class)
		def attendances = this.attendanceService.listAttendances(
				callable, Group.class, params.offset, params.limit,
				params.sort, params.order)
		this._response(Const.SUCCESS, [total: total, list: (params.thumbnail ?
				attendances*.attendee*.thumbnail : attendances)])
	}

	// 设置加入组织条件
	def rest_updateJoinSetting() {
		Group group = this.groupService.updateGroup(params.gid,
				[submitIntro : params.submitIntro,
				 submitAnswer: params.submitAnswer,
				 welcome     : params.welcome])
		this._response(Const.SUCCESS, group)
	}

	// 更新组织隐私设置
	def rest_updatePrivacy() {
		Group group = this.groupService.updateGroup(params.gid,
				[viewPermission: params.viewPermission])
		this._response(Const.SUCCESS, group)
	}

	// 更新组织logo
	def rest_updateLogo() {
		def file = request.getFile("logo")
		if (!file.inputStream || file.empty || file.size > Const.PHOTO_MAX_SIZE) {
			// 文件超出大小
			this._response(Const.FILE_EXCEED_SIZE)
			return
		}
		if (!Const.IMAGE_TYPES.contains(ImageUtil.getImageFormatName(file))) {
			this._response(Const.UNSUPPORTED_FILE_TYPE)
			return
		}
		Group group = this.groupService.updateLogo(params.gid, request,
				file, "/portrait")
		this._response(Const.SUCCESS, group)
	}

	// 获取某个用户创建的组织列表
	def rest_getCreateList() {
		def callable = {
			owner {
				eq("id", params.uid ? params.uid.toLong() : this._getUserId())
			}
			eq("state", Const.STATE_NORMAL)
		}
		int total = this.groupService.countGroups(callable)
		def groups = this.groupService.listGroups(callable,
				params.offset, params.limit, params.sort, params.order)
		this._computeDistance(groups)
		this._response(Const.SUCCESS, [total: total, list: groups])
	}

	def rest_getApplyList() {
		def callable = {
			owner {
				eq("id", this._getUserId())
			}
			if (params.state) {
				eq("state", params.state.toInteger())
			} else {
				inList("state", [Const.STATE_APPLY_REFUSED, Const.STATE_APPLY_PENDING])
			}
		}
		int total = this.groupService.countGroups(callable)
		def groups = this.groupService.listGroups(callable,
				params.offset, params.limit, params.sort, params.order)
		def applications = groups?.findAll { group ->
			group?.application
		}?.collectEntries { group ->
			new AbstractMap.SimpleEntry(group.id, group.application)
		}
		this._response(Const.SUCCESS, [total: total, list: groups, map: applications])
	}

	// 获取某个用户的组织列表
	def rest_list() {
		long userId = params.uid.toLong()
		def groupIds = params.tag ? this.groupService.listGroups({
			projections {
				distinct("id")
			}
			tags {
				like("name", Const.CUSTOM_GROUP_TAG + params.tag + "#%")
			}
		}) : null
		def callable = {
			attendances {
				attendee {
					eq("id", userId)
				}
				eq("state", Const.GROUP_ATTEND_STATE_ACCEPTED)
			}
			if (params.tag) {
				inList("id", groupIds?.size() > 0 ? groupIds : [0L])
			}
			if (params.gid) {
				ne("id", params.gid.toLong())
			}
			eq("state", Const.STATE_NORMAL)
		}
		int total = this.groupService.countGroups(callable)
		def groups = this.groupService.listGroups(callable,
				params.offset, params.limit, params.sort, params.order)
		this._computeDistance(groups)
		def relationships = this._relationships(groups, userId)
		this._response(Const.SUCCESS, this._simplify([total: total,
													  list : groups, relation: relationships]))
	}

	private _relationships(groups, userId) {
		return groups?.collectEntries { group ->
			int relationship = this.groupService.relationship(group.id, userId)
			new AbstractMap.SimpleEntry(group.id, relationship)
		}
	}

	private _kickout(groupId, userId, actorId, cause = null) {
		GAttendance attendance = this.groupService.kickout(groupId,
				userId, actorId, cause)
		if (attendance) {
			this._response(Const.SUCCESS, attendance)
		} else {
			this._response(Const.ROLE_DISMATCH)
		}
	}

	// 退出组织
	def rest_exit() {
		long userId = this._getUserId()
		this._kickout(params.gid.toLong(), userId, userId, params.cause)
	}

	// 踢出组织
	def rest_kickout() {
		this._kickout(params.gid.toLong(), params.uid.toLong(), this._getUserId())
	}

	// 加为/取消管理员
	def rest_role() {
		GAttendance attendance = this.attendanceService.
				getGroupAttendance(params.gid.toLong(), params.uid.toLong())
		if (!attendance || attendance.state != Const.GROUP_ATTEND_STATE_ACCEPTED) {
			this._response(Const.STATE_DISMATCH)
			return
		}
		int role = params.role.toInteger() > 0 ?
				Const.ROLE_MANAGER : Const.ROLE_MEMBER
		attendance = this.attendanceService.updateAttendanceRole(
				attendance.id, role, this._getUser())
		this._response(Const.SUCCESS, attendance)
	}

	// 加为/取消共同创建者
	def rest_cocreate() {
		GAttendance attendance = this.attendanceService.
				getGroupAttendance(params.gid.toLong(), params.uid.toLong())
		if (!attendance || attendance.state != Const.GROUP_ATTEND_STATE_ACCEPTED) {
			this._response(Const.STATE_DISMATCH)
			return
		}
		int role = params.role.toInteger() > 0 ?
				Const.ROLE_COCREATOR : Const.ROLE_MEMBER
		attendance = this.attendanceService.updateAttendanceRole(
				attendance.id, role, this._getUser())
		this._response(Const.SUCCESS, attendance)
	}

	// 允许/拒绝加入组织
	def rest_check() {
		GAttendance attendance = this.attendanceService.
				getGroupAttendance(params.gid.toLong(), params.uid.toLong())
		if (attendance.role != Const.ROLE_MEMBER) {
			this._response(Const.ROLE_DISMATCH)
			return
		}
		this._response(Const.SUCCESS, this.groupService.checkApply(
				attendance.id, params.role.toInteger() > 0,
				this._getUserId(), params.cause))
	}

	// 解散组织
	def rest_dismiss() {
		Group group = this.groupService.dismissGroup(params.gid)
		this._response(Const.SUCCESS, group)
	}

	// 导出组织成员
	def rest_export() {
		Group group = this.groupService.getGroup(params.gid)
		String filename = this.contactService.getFilename(
				group.name + "组织会员", params.type)
		if (!filename) {
			this._response(Const.UNKNOWN_FORMAT)
			return
		}
		response.setContentType("application/octet-stream")
		response.setHeader("Content-disposition", "attachment;filename="
				+ new String(filename.getBytes("UTF-8"), "iso8859-1"))
		this.groupService.exportMembers(group.id, params.type,
				response.getOutputStream())
	}

	// 导出组织成员问题答案
	def rest_exportanswers() {
		Group group = this.groupService.getGroup(params.gid)
		String filename = this.contactService.getFilename(
				group.name + "会员问题答案", params.type)
		if (!filename) {
			this._response(Const.UNKNOWN_FORMAT)
			return
		}
		response.setContentType("application/octet-stream")
		response.setHeader("Content-disposition", "attachment;filename="
				+ new String(filename.getBytes("UTF-8"), "iso8859-1"))
		this.groupService.exportAnswers(group.id, params.type,
				response.getOutputStream())
	}

	// 验证组织的域名是否合法
	def rest_homepage() {
		boolean flag = this.groupService.validateHomepage(params.homepage)
		this._response(flag ? Const.SUCCESS : Const.FAIL)
	}

	// 取组织详情
	def rest_get() {
		Group group = params.gid ? this.groupService.getGroup(params.gid, true)
				: this.groupService.getGroupByCustomTag(params.tag)
		if (!group) {
			this._response(Const.GROUP_NOT_EXIST)
			return
		}
		this._response(Const.SUCCESS, this._isUpdatedSince(group) ?
				[group    : group, tags: this.tagService.listGroupTags([group.id]),
				 questions: this.questionService.listGroupQuestions(group.id),
				 menus    : this.groupService.getGroupMenus(group.id)] : null)
	}

	def rest_relation() {
		int relationship = this.groupService.relationship(
				params.gid.toLong(), this._getUserId())
		this._response(Const.SUCCESS, relationship)
	}

	// 获取当前登录用户的组织参与信息
	def rest_attendee() {
		GAttendance attendance = this.attendanceService.getGroupAttendance(
				params.gid.toLong(), this._getUserId())
		this._response(Const.SUCCESS, attendance)
	}

	def rest_clipLogo() {
		Group group = this.groupService.getGroup(params.gid)
		if (!group.logo) {
			this._response(Const.GROUP_LOGO_ABSENT)
			return
		}
		group = this.groupService.clipLogo(params.gid, request, this._clipPos())
		this._response(Const.SUCCESS, group)
	}

	def rest_praize() {
		def result = this.praiseService.praize(params.gid, this._getUserId(),
				!params.re || params.re?.toInteger() > 0)
		this._response(result[0] ? Const.SUCCESS : Const.FAIL, result[1])
	}

	def rest_praized() {
		Praise praise = this.praiseService.getPraise(params.gid.toLong(),
				this._getUserId())
		this._response(Const.SUCCESS, [praized: praise != null])
	}

	def rest_menus() {
		def menus = []
		params.menus?.split(";")?.toList()?.each { menu1 ->
			int i = 0
			Const.MOBILE_GROUP_MENUS?.each { menu2 ->
				i++
				if (menu1 == menu2) {
					menus += i
				}
			}
		}
		Group group = this.groupService.updateGroup(params.gid, [menus: menus.join(";")])
		this._response(Const.SUCCESS, group)
	}

}
