package com.meetup

import com.netease.security.xssdefender.filter.XSSFilter
import grails.converters.JSON
import grails.gorm.DetachedCriteria
import grails.util.GrailsUtil
import org.apache.commons.lang.StringUtils

import javax.servlet.http.HttpServletResponse

abstract class AbstractController {

	static defaultAction = "index"

	def groupService

	def ipTableService

	def userService

	def photoService

	def meetingService

	def marshaller

	def encryptService

	def attendanceService

	def tokenService

	def sessionFactory

	def configService

	def wordFilterService

	def xssFilter

	protected _userAgent(req = request, sub = false) {
		String agent = Const.USER_AGENT_PC
		String ua = req.getHeader("X-User-Agent")?.toLowerCase()
		if (ua?.indexOf("android") > -1) {
			agent = Const.USER_AGENT_ANDROID
		}
		if (ua?.indexOf("iphone") > -1 || ua?.indexOf("ipad") > -1) {
			agent = Const.USER_AGENT_IOS
		}
//		ua = req.getHeader("HTTP_USER_AGENT")?.toLowerCase()
//		if (ua?.indexOf("android") > -1) {
//			agent = Const.USER_AGENT_ANDROID
//		}
//		if (ua?.indexOf("iphone") > -1) {
//			agent = Const.USER_AGENT_IOS
//		}
		ua = req.getHeader("User-Agent")?.toLowerCase()
		if (ua?.indexOf("android") > -1) {
			agent = Const.USER_AGENT_ANDROID
		}
		if (ua?.indexOf("iphone") > -1 || ua?.indexOf("ipad") > -1) {
			agent = Const.USER_AGENT_IOS
		}
		return agent == Const.USER_AGENT_PC ? agent :
				(sub ? agent : Const.USER_AGENT_MOBILE)
	}

	protected _render(Map args, boolean deep = false) {
		JSON.use(deep ? "deep" : "default")
		render(args)
	}

	protected _response(String rdata) {
		render(contentType: "text/plain", text: rdata)
	}

	protected _response(int rcode, rdata = null, boolean deep = false) {
		JSON.use(deep ? "deep" : "default")
		if (rdata != null) {
//		if (rcode > 0 && rdata != null) {
//			render(contentType: "text/json") {
//				code = rcode
//				result = rdata
//			}
			render(contentType: "text/plain",
					text: [code: rcode, result: rdata] as JSON)
		} else {
//			render(contentType: "text/json") {
//				code = rcode
//			}
			render(contentType: "text/plain",
					text: [code: rcode] as JSON)
		}
	}

	protected _validate_response(model, rsuccess, rfail, boolean deep = false) {
		if (model.hasErrors()) {
			model.errors.allErrors.each {
				println it
			}
			this._response(Const.FAIL, rfail, deep)
		} else {
			this._response(Const.SUCCESS, rsuccess, deep)
		}
	}

//	protected _response(int rcode, rdata) {
//		if (rcode > 0 && rdata) {
//			render(contentType: "text/json") {
//				code = rcode
//				result = rdata
//			}
//		} else {
//			render(contentType: "text/json") {
//				code = rcode
//			}
//		}
//	}
//
//	protected _response(model, rsuccess, rfail) {
//		if (model.hasErrors()) {
//			model.errors.allErrors.each {
//				println it
//			}
//			this._response(Const.FAIL, rfail)
//		} else {
//			this._response(Const.SUCCESS, rsuccess)
//		}
//	}

	protected _method() {
		if (!this._isPostMethod()) {
			response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED)
			return false
		}
		return true
	}

	protected _isPostMethod() {
		return request.getMethod().toUpperCase() == "POST"
	}

	protected _simplify(model) {
//		return this._userAgent() == Const.USER_AGENT_PC ?
//			model : this.marshaller.marshalMobile(model)
		return this.marshaller.marshalUserAgent(model, this._userAgent())
	}

//	protected _upload(file, url, path, name, local = false) {
//		String filename = file.originalFilename
//		String filesuffix = filename.substring(filename.lastIndexOf("."))
//		if (this.hdfsService.isWindows() || local) {
//			path = request.getRealPath(url) + File.separator + path
//			path += (path.endsWith(File.separator) ? "" : File.separator) +
//					name + filesuffix
//		} else {
//			path = url + File.separator + path
//			path += (path.endsWith(File.separator) ? "" : File.separator) +
//					(name + filesuffix + "@" +
//							System.currentTimeMillis()).encodeAsMD5()
//		}
//		path = this.hdfsService.upload(file, path, local)
//		return path.substring(path.indexOf(url))
//	}

	protected _model(Map model) {
		if (!model) {
			model = [:]
		}
		model.env = GrailsUtil.environment
//		model.env = Environment.getCurrent().getName()
//		model.host = request.getSession(true).user
		model.host = session.user
		model.json = new JsonUtil()
		model.date = new DateUtil()
		model.iptable = this.ipTableService.lookup(request.getRemoteAddr())
		return model
	}

	protected _getUserId() {
		return session.user ? session.user.id : 0L
	}

	protected _getUser(userId = this._getUserId()) {
		return this.userService.getUser(userId)
	}

	protected _members(groupId) {
		def callable = {
			group {
				eq("id", groupId)
			}
			eq("state", Const.GROUP_ATTEND_STATE_ACCEPTED)
		}
		return this.attendanceService.listAttendances(callable,
				Group.class)*.attendeeId
	}

	protected _common(gname) {
		def model = [group: this.groupService.getGroupByHomepage(gname)]
//        model.createTime = new Date(group.createTime).format("yyyy年MM月dd日")
		model.relationship = this.groupService.relationship(
				model.group.id, this._getUserId())
		def attendeeIds = this._members(model.group.id)
		model.otherGroups = this.groupService.listDistinctGroups({
			attendances {
				attendee {
					inList("id", attendeeIds?.size() > 0 ? attendeeIds : [0L])
				}
				eq("state", Const.GROUP_ATTEND_STATE_ACCEPTED)
			}
			ne("id", model.group.id)
			eq("state", Const.STATE_NORMAL)
			this.configService.getSortProperties("hot")?.each { prop ->
				order(prop, prop == "createTime" ? "asc" : "desc")
			}
			maxResults(5)
		})
		model.photoCount = this.photoService.countPhotos({
			album {
				group {
					eq("id", model.group.id)
				}
			}
		})
		model.upcomingCount = this.meetingService.countUpcoming(
				model.group.id)
		model.pastCount = this.meetingService.countMeetings {
			group {
				eq("id", model.group.id)
			}
			or {
				between("endTime", 1L, System.currentTimeMillis() - 1)
				and {
					le("endTime", 0L)
					le("startTime", this._getMeetingEndTime(0L))
				}
			}
			eq("state", Const.STATE_NORMAL)
		}
		return model
	}

	protected _getMeetingEndTime(time) {
		Calendar calendar = new Date(time > 0L ?
				time : System.currentTimeMillis()).toCalendar()
		calendar.set(Calendar.HOUR_OF_DAY, 0)
		calendar.set(Calendar.MINUTE, 0)
		calendar.set(Calendar.SECOND, 0)
		calendar.set(Calendar.MILLISECOND, 0)
		if (time > 0L) {
			calendar.add(Calendar.DATE, 1)
		}
		return calendar.getTimeInMillis() - 1
	}

//	protected _writeImage(is, os) {
//		byte[] buf = new byte[1024]
//		int read = 0
//		try {
//			while ((read = is.read(buf)) != -1) {
//				os.write(buf, 0, read);
//			}
//			os.flush()
//		} finally {
//			os.close()
//			is.close()
//		}
//	}

	protected _buildCriteria(targetClass, callable) {
		return new DetachedCriteria(targetClass).build(callable)
	}

	protected _buildDistanceArea() {
		if (!params.distance || !params.latitude || !params.longitude) {
			if (params.sort == "distance") {
				params.sort = null
			}
			return null
		}
		long distance = params.distance.toLong()
		if (distance <= 0) {
			distance = Eval.me(this.grailsApplication.config.
					app.search.default.distance)
		}
		double latitude = params.latitude.toDouble()
		double longitude = params.longitude.toDouble()
		return MapUtil.getAround(latitude, longitude, distance)
	}

	protected _buildDistance(distances, map) {
		def entities = []
		distances.each { distance ->
			def entity = map.get(distance[0])
			entity.distance = distance[1]
			entities += entity
		}
		return entities
	}

	protected _buildDistanceSql(sort, clazz) {
		def props = this.configService.getSortProperties(sort)
		if (!props) {
			return ""
		}
		String sql = ""
		props.each { prop ->
			sql += ", this_." + TypeUtil.getTableColumn(this.sessionFactory,
					clazz, prop)
		}
		return sql
	}

	protected _buildEntities(instances, map) {
		def entities = []
		instances.each { instance ->
			def key = instance instanceof Object[] ? instance[0] : instance
			entities += map.get(key)
		}
		return entities
	}

	protected _computeDistance(entities) {
		if (!params.latitude || !params.longitude) {
			return
		}
		entities.each { entity ->
			if (entity.distance <= 0.0d &&
					(entity.latitude > 0.0d || entity.longitude > 0.0d)) {
				entity.distance = MapUtil.getDistance(entity.latitude,
						entity.longitude, params.latitude.toDouble(),
						params.longitude.toDouble())
			}
		}
	}

//	protected _params() {
//		params.each { k, v ->
//			println k + ": " + v
//		}
//	}

	protected _parseInviteCookies(validate = false) {
		String token = CookieUtil.getCookieValue(request, Const.COOKIE_INVITE_TOKEN)
		if (!token) {
			token = params.s
		}
		if (!this.tokenService.getToken(token)) {
			return null
		}
		String decryped = this.encryptService.decryptWithDES(token)
		String[] ss = decryped?.split("\\|")
		if (!ss || ss.length != 5) {
			return null
		}
		if (!validate) {
			return ss
		}
		String invitee = CookieUtil.getCookieValue(request, Const.COOKIE_INVITED_USER)
		if (!invitee) {
			invitee = params.username
		} else if (invitee.startsWith("\"") && invitee.endsWith("\"")) {
			invitee = invitee.substring(1, invitee.length() - 1)
		}
		return ss[1] != invitee ? null : ss
	}

	protected _checkInviteCookie() {
		return this._getInvitee() && this._getInviteToken()
	}

	protected _getInvitee() {
		return CookieUtil.getCookieValue(request, Const.COOKIE_INVITED_USER)
	}

	protected _getInviteToken() {
		return CookieUtil.getCookieValue(request, Const.COOKIE_INVITED_USER)
	}

	protected _clearInvite(delete = true) {
		response.addCookie(CookieUtil.makeCookieExpire(Const.COOKIE_INVITED_USER, "", Const.DOMAIN))
		response.addCookie(CookieUtil.makeCookieExpire(Const.COOKIE_INVITE_TOKEN, "", Const.DOMAIN))
		if (delete) {
			String token = this._getInviteToken()
			this.tokenService.deleteToken(token)
		}
	}

	protected _isUpdatedSince(target) {
		if (this._userAgent() == Const.USER_AGENT_PC) {
			return true
		}
		return params.updateTime ? target.updateTime >
				params.updateTime.toLong() : true
	}

	protected _categories(model) {
		if (!model) {
			model = [:]
		}
		model.categories = Const.GROUP_CATEGORIES
		return model
	}

	protected _position() {
		if (params.latitude?.toDouble() <= 0.0d &&
				params.longitude?.toDouble() <= 0.0d) {
			params.remove("latitude")
			params.remove("longitude")
		}
	}

	protected _listGroupMeetingCallable(groupId, type) {
		long time = System.currentTimeMillis()
		def callable = {
			group {
				eq("id", groupId)
			}
			if (type == 0) {
				or {
					ge("startTime", time)
					and {
						lt("startTime", time)
						gt("endTime", time)
					}
					and {
						le("endTime", 0L)
						between("startTime", this._getMeetingEndTime(0L) + 1, time - 1)
					}
				}
			}
			if (type == 1) {
				or {
					between("endTime", 1L, time - 1)
					and {
						le("endTime", 0L)
						le("startTime", this._getMeetingEndTime(0L))
					}
				}
			}
			if (type == 2) {
				eq("state", Const.STATE_DRAFT)
			} else {
				inList("state", [Const.STATE_NORMAL, Const.STATE_SIGNUP_STOPPED])
			}
		}
		return callable
	}

	protected _listHostMeetingCallable(filter, type, userId, groupId = null,
									   stime = null, sort = null) {
		def groupIds = groupId ? [groupId] :
				(filter != 1 ? this.groupService.listGroups({
					projections {
						distinct("id")
					}
					attendances {
						attendee {
							eq("id", userId)
						}
						eq("state", Const.GROUP_ATTEND_STATE_ACCEPTED)
					}
					eq("state", Const.STATE_NORMAL)
				}) : null)
		def meetingIds = filter == 2 ? this.meetingService.listMeetings({
			projections {
				distinct("id")
			}
			group {
				inList("id", groupIds?.size() > 0 ? groupIds : [0L])
			}
			attendances {
				attendee {
					eq("id", userId)
				}
			}
		}) : null
		long time = stime ? Date.parse("yyyy-MM-dd", stime).time :
				System.currentTimeMillis()
		def callable = { count ->
			projections {
				if (count) {
					countDistinct("id")
				} else {
					distinct("id")
					this.configService.getSortProperties(sort)?.each { prop ->
						property(prop)
					}
				}
			}
			if (filter == 0) {
				if (groupId) {
					group {
						inList("id", groupIds?.size() > 0 ? groupIds : [0L])
					}
				} else {
					or {
						group {
							inList("id", groupIds?.size() > 0 ? groupIds : [0L])
						}
						attendances {
							attendee {
								eq("id", userId)
							}
						}
					}
				}
			}
			if (filter == 1) {
				attendances {
					attendee {
						eq("id", userId)
					}
					inList("state", [Const.MEETING_ATTEND_STATE_SIGNED,
									 Const.MEETING_ATTEND_STATE_ACCEPTED])
				}
			}
			if (filter == 2) {
				or {
//					not {
//						attendances {
//							attendee {
//								eq("id", userId)
//							}
//						}
//					}
					not {
						inList("id", meetingIds?.size() > 0 ? meetingIds : [0L])
					}
					attendances {
						attendee {
							eq("id", userId)
						}
						eq("state", Const.MEETING_ATTEND_STATE_NOREPLY)
					}
				}
			}
			if (filter > 0 && groupIds) {
				group {
					inList("id", groupIds?.size() > 0 ? groupIds : [0L])
				}
			}
			if (type == 0) {
				or {
					ge("startTime", time)
					and {
						lt("startTime", time)
						gt("endTime", time)
					}
					if (!stime) {
						and {
							le("endTime", 0L)
							between("startTime",
									this._getMeetingEndTime(0L) + 1, time - 1)
						}
					}
				}
			}
			if (type == 1) {
				or {
					between("endTime", 1L, time - 1)
					and {
						le("endTime", 0L)
						le("startTime", stime ?
								time - 1 : this._getMeetingEndTime(0L))
					}
				}
			}
			eq("state", Const.STATE_NORMAL)
		}
		return callable
	}

	protected _clipPos() {
		return !params.left || !params.top || !params.width || !params.height ?
				null : [params.left.toInteger(), params.top.toInteger(),
						params.width.toInteger(), params.height.toInteger()].
				toArray(new Integer[0])
	}

	protected _adminPermission() {
		if (this._getUser().role == Const.USER_ROLE_ADMIN) {
			return true
		}
		redirect(controller: "error", action: "handle500",
				params: [code : Const.PERMISSION_DENIED,
						 error: AppUtil.encodeAsGBK(this.grailsApplication.config.
								 app.error.msg.user.not.administrator)])
		return false
	}

	protected _setLastLoginTime(user) {
		this.userService.updateUser(user.id,
				[lastLoginTime: System.currentTimeMillis()])
	}

	protected _initLogin(user, saveLogin = false) {
		this._setSession(user)
		this._setCookie(user, saveLogin)
		this._setLastLoginTime(user)
	}

	protected _clearLogin() {
		response.addCookie(CookieUtil.makeCookieExpire(Const.COOKIE_SESSION, "", Const.DOMAIN))
		response.addCookie(CookieUtil.makeCookieExpire(Const.COOKIE_PERSIST, "", Const.DOMAIN))
		log.error("invalidate session for url: " + request.forwardURI)
		session.invalidate()
	}

	protected _setSession(user) {
		if (!session.user) {
			session.user = [username: user.username, id: user.id,
							nickname: user.nickname, portrait: user.thumbnail]
		}
	}

	protected _setCookie(user, saveLogin = false) {
		UserCredential suc = this.encryptService.encryptSessionCredential(
				user.username, user.id, Const.FLAG_NEW)
		response.addCookie(CookieUtil.makeCookie(
				suc.key, suc.value, Const.DOMAIN, -1))
		if (saveLogin) {
			UserCredential puc = this.encryptService.
					encryptPersistentCredential(user.username, user.id)
			response.addCookie(CookieUtil.makeCookie(
					puc.key, puc.value, Const.DOMAIN, Eval.me(
					this.grailsApplication.config.app.cookie.persist.expireTime)))
		}
	}

	protected _filterWords(content) {
		return StringUtils.isBlank(content) ? content : this.wordFilterService.
				filterHtml(content, (char) '*').getFilteredContent()
	}

	protected _isLegalWords(content) {
		if (StringUtils.isBlank(content)) {
			return true
		}
		WordFilterService.FilteredResult result = this.wordFilterService.filterHtml(content, (char) '*')
		return result.level == 0 && !result.badWords
	}

	protected _customGroupIds(tag, sub = false) {
		if (!tag) {
			return null
		}
		String customTag = Const.CUSTOM_GROUP_TAG + tag
		return this.groupService.listGroups({
			projections {
				distinct("id")
			}
			tags {
				if (sub) {
					inList("name", [customTag, customTag + "#" + Const.SUB_GROUP_TAG])
				} else {
					eq("name", customTag)
				}
			}
		})
	}

	protected _filterRichText(key) {
		if (StringUtils.isBlank(params[key])) {
			return true
		}
		try {
			String content = HtmlUtil.repairHtml(params[key])
			params[key] = this.xssFilter.getFilteredHTML(content,
					XSSFilter.TYPE_NORMAL_HTML)
		} catch (Exception ex) {
			return false
		}
		params[key] = this._filterWords(params[key])
		params.digest = HtmlUtil.getBrief(params[key], this.grailsApplication.config.
				app.abstract.length.toInteger())
		params.figure = HtmlUtil.getFirstImageSrc(params[key])
		return true
	}

}
