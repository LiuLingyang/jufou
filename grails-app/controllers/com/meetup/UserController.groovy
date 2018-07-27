package com.meetup

import com.netease.is.image.CheckCode_a
import org.apache.hadoop.io.IOUtils

import javax.servlet.http.HttpServletResponse

class UserController extends AbstractController {

//    def beforeInterceptor = [action: this.&_method, except: ['home', 'password', 'regist', 'login', 'setting', 'profile', 'group', 'message', 'rest_captcha']]

	def smsService

	def tagService

	def templateService

	def shortLinkService

	def beforeInterceptor = [action: this.&_loginPermission, only: ["rest_portrait",
			"rest_clipPortrait"]]

	private _loginPermission() {
		if (!this._isPostMethod() || this._getUserId() > 0L) {
			return true
		}
		response.sendError(HttpServletResponse.SC_UNAUTHORIZED)
		return false
	}

	def home() {
		long userId = this._getUserId()
		def groups = this.groupService.listGroups({
			attendances {
				attendee {
					eq("id", userId)
				}
			}
			eq("state", Const.STATE_NORMAL)
		})
		def model = [attendedGroup: groups]
		model.tags = this.tagService.listGroupTags(groups*.id)*.name.unique()
		this._model(model)
		model.host = this.userService.getUser(userId)
//		model.tobeCount = this.meetingService.countMeetings(
//				this._listHostMeetingCallable(0, 0, userId).curry(true), true)
//		model.endedCount = this.meetingService.countMeetings(
//				this._listHostMeetingCallable(0, 1, userId).curry(true), true)
		this._render(view: "home", model: model)
	}

	// 激活用户账号
	def regist() {
		this._render(view: "regist", model: this._model(null))
	}

	def login() {
		this._render(view: "login", model: this._model(null))
	}

	def setting() {
		User user = this._getUser()
		this._render(view: "setting", model: this._model([user: user]))
	}

	def group() {
		User user = this._getUser()
		this._render(view: "group", model: this._model([user: user]))
	}

	def message() {
		this._render(view: "message", model: this._model(null))
	}

	def retrieve() {
		this._render(view: "password", model: this._model(null))
	}

//	def password() {
//		this._render(view: "password", model: this._model([token: params.s]))
//	}

	def activate() {
		this._render(view: "activate", model: this._model(null))
	}

	def react() {
		this._render(view: "react", model: this._model(null))
	}

	def profile() {
		User user = this._getUser()
		this._render(view: "profile", model: this._model([user: user]))
	}

	def contact() {
		this._render(view: "contact", model: this._model(null))
	}

	def reset() {
		this._render(view: "reset", model: this._model([token: params.s]))
	}

	def stub() {
		redirect(uri: this.shortLinkService.getSkeletonLink(params.stub))
//		if (url) {
//			redirect(uri: url)
//		} else {
//			redirect(controller: "error", action: "handle500",
//					params: [code: Const.ILLEGAL_REQUEST,
//							error: AppUtil.encodeAsGBK(this.grailsApplication.config.
//									app.error.msg.stub.not.found)])
//		}
	}

	private _getInviteRedirectUrl(invitee, type, targetId) {
		if (this._userAgent() == Const.USER_AGENT_MOBILE) {
			if (type == Group.class.getSimpleName()) {
				return String.format(this.grailsApplication.config.
						app.group.mobile.invite.redirect, targetId, invitee)
			}
			if (type == Meeting.class.getSimpleName()) {
				return String.format(this.grailsApplication.config.
						app.meeting.mobile.invite.redirect, targetId, invitee)
			}
		}
		if (this._userAgent() == Const.USER_AGENT_PC) {
			if (type == Group.class.getSimpleName()) {
				Group group = this.groupService.getGroup(targetId)
				return String.format(this.grailsApplication.config.
						app.group.web.invite.redirect, group.homepage)
			}
			if (type == Meeting.class.getSimpleName()) {
				Meeting meeting = this.meetingService.getMeeting(targetId)
				return String.format(this.grailsApplication.config.
						app.meeting.web.invite.redirect,
						meeting.group.homepage, targetId)
			}
		}
		return null
	}

	def rest_redirectInvite() {
		String[] ss = this._parseInviteCookies()
		if (!ss) {
			this._clearInvite(false)
			redirect(controller: "error", action: "handle500",
					params: [code: Const.TOKEN_EXPIRED_OR_DAMAGED,
							error: AppUtil.encodeAsGBK(this.grailsApplication.config.
									app.error.msg.invite.cookie.damaged)])
			return
		}
		this._clearLogin()
		response.addCookie(CookieUtil.makeCookie(
				Const.COOKIE_INVITED_USER, ss[1], Const.DOMAIN, -1, false))
		response.addCookie(CookieUtil.makeCookie(
				Const.COOKIE_INVITE_TOKEN, params.s, Const.DOMAIN, -1))
		String url = this._getInviteRedirectUrl(ss[1], ss[2], ss[3])
		redirect(uri: url)
	}

	def rest_activate() {
		User user = this.userService.activateUser(params.s)
//		if (!user) {
//			this._response(Const.FAIL, null)
//			return
//		}
		if (!user) {
			this._clearLogin()
//			redirect(uri: "/login/")
			redirect(controller: "error", action: "handle500",
					params: [code: Const.TOKEN_EXPIRED_OR_DAMAGED,
							error: AppUtil.encodeAsGBK(this.grailsApplication.config.
									app.error.msg.activate.url.damaged)])
		} else {
			this._initLogin(user, false)
			redirect(controller: "user", action: "setting")
		}
	}

	// 登录
	def rest_login() {
		if (this._userAgent() == Const.USER_AGENT_PC && (!params.captcha
				|| params.captcha.toLowerCase() != session.captcha)) {
			this._response(Const.CAPTCHA_ERROR)
			return
		}
		def result = this._checkUser(params.username, params.password)
		if (result[0] < 0) {
			this._response(result[0])
			return
		}
		this._initLogin(result[1], params.saveLogin)
		this._response(Const.SUCCESS, result[1])
//        redirect(controller: ,action: ,params: [])
	}

	private _checkUser(username, password) {
		User user = this.userService.getUserByName(username)
//		if (username ==~ /^\d{1,}$/) {
//			user = User.findByMobile(username)
//		} else if (username ==~ /^[\w-\.]+@(?:[\w-]+\.)+[a-z]{2,6}$/) {
//			user = User.findByEmail(username)
//		} else {
//			user = User.findByUsername(username)
//		}
		if (!user) {
			return [Const.USER_NOT_EXIST, null]
		}
		if (user.password != password) {
			return [Const.USER_PWD_ERROR, null]
		}
		if (user.state == Const.USER_STATE_INACTIVE) {
			return [Const.USER_INACTIVE, null]
		}
		return [Const.SUCCESS, user]
	}

//    def rest_check() {
//        def result = this._checkUser(params.username, params.password)
//        if (result[0] < 0) {
//            this._response(result[0], null)
//            return
//        }
//        this._setSession(result[1])
//        this._setCookie(result[1], params.saveLogin)
//        this._response(Const.SUCCESS, null)
//    }

	private _invalid() {
		String ua = this._userAgent()
		return (ua == Const.USER_AGENT_PC && (!params.captcha
				|| (params.captcha.toLowerCase() != session.captcha
				&& params.captcha.toLowerCase() != LocalCache.getCaptcha(params.mobile)))) ||
				(ua == Const.USER_AGENT_MOBILE && params.mobile
						&& (!params.captcha || params.captcha.toLowerCase()
						!= LocalCache.getCaptcha(params.mobile)))
	}

	def rest_validate() {
		this._response(this._invalid() ? Const.CAPTCHA_ERROR : Const.SUCCESS)
	}

	// 注册
	def rest_regist() {
		boolean isInvite = this._checkInviteCookie()
		if (isInvite && !this._parseInviteCookies(true)) {
			this._response(Const.TOKEN_EXPIRED_OR_DAMAGED)
			return
		}
		if (!params.email && !params.mobile) {
			this._response(Const.EMAIL_MOBILE_NULL)
			return
		}
		if (!isInvite && this._invalid()) {
			this._response(Const.CAPTCHA_ERROR)
			return
		}
		if (!params.username) {
			params.username = params.email ? params.email : params.mobile
		}
		User user = this.userService.getUserByName(params.username)
		if (user) {
			if (user.state == Const.USER_STATE_INACTIVE) {
				this._response(Const.USER_INACTIVE)
			} else {
				this._response(Const.USER_EXIST)
			}
			return
		}
		if (params.email) {
			user = this.userService.getUserByEmail(params.email)
			if (user) {
				if (user.state == Const.USER_STATE_INACTIVE) {
					this._response(Const.USER_INACTIVE)
				} else {
					this._response(Const.EMAIL_EXIST)
				}
				return
			}
		}
		if (params.mobile) {
			user = this.userService.getUserByMobile(params.mobile)
			if (user) {
				if (user.state == Const.USER_STATE_INACTIVE) {
					this._response(Const.USER_INACTIVE)
				} else {
					this._response(Const.MOBILE_EXIST)
				}
				return
			}
		}
		this._address()
		params.remove("state")
		params.remove("role")
		user = new User(params)
		if (this.userService.createUser(user, isInvite)) {
			this._initLogin(user, false)
		}
		this._response(Const.SUCCESS, user)
//        redirect(controller: ,action: ,params: [])
	}

	private _address() {
		if (params.province || params.city || params.area) {
			return
		}
		IpTable iptable = this.ipTableService.lookup(request.getRemoteAddr())
		params.province = iptable?.province
		params.city = iptable?.city
		params.area = iptable?.district
	}

	// 退出
	def rest_logout() {
		this._clearLogin()
//		if (!params.redirect || params.redirect.toInteger() > 0) {
//			redirect(uri: "/")
//		} else {
		this._response(Const.SUCCESS)
//		}
	}

	// 发送验证码
	def rest_sendCaptcha() {
		if (params.v) {
			User user = this.userService.getUserByName(params.mobile)
			if (!user) {
				user = this.userService.getUserByMobile(params.mobile)
			}
			if (params.v.toInteger() > 0 && user) {
				this._response(Const.USER_EXIST)
				return
			}
			if (params.v.toInteger() < 0 && !user) {
				this._response(Const.USER_NOT_EXIST)
				return
			}
		}
//		int rcode = Const.SUCCESS
//            if (params.mobile ==~ /1\d{10}/) {
//		String key = params.mobile + "@" + request.remoteAddr
		if (!LocalCache.validateCaptchaSentFrequency(request.remoteAddr)) {
			this._response(Const.CAPTCHA_SENT_FREQUENT)
			return
		}
		String captcha = ProofUtil.genProofCode(4,
				this._userAgent() == Const.USER_AGENT_MOBILE)
		String content = this.templateService.mergeTemplate(
				[captcha: captcha], "sms/captcha.ftl")
		def flag = this.smsService.sendSms(params.mobile, content)
		if (flag) {
			LocalCache.setCaptcha(params.mobile, captcha)
		}
		this._response(flag ? Const.SUCCESS : Const.FAIL)
//            } else {
//                rcode = Const.BAD_PARAMS
//            }
//		this._response(rcode, rcode > 0 ? session.captcha : null)
	}

	// 获取验证码
	def rest_captcha() {
		// 禁止图像缓存,使得单击验证码可以刷新验证码图片
		response.setHeader("Pragma", "nocache")
		response.setHeader("Cache-Control", "private,no-cache,no-store")
		response.setDateHeader("Expires", 0)
		response.setContentType("image/jpeg")

		CheckCode_a img = new CheckCode_a()
		img.setCodeLength(4, 4)
		img.setOutputSize(25, 80)
//			img.setCodeAppearance(CheckCode_a.CodeAppearance_EachUni)
		img.setCodeAppearance(CheckCode_a.CodeAppearance_Normal)
		img.setCodeAppearance(1)
		img.setEasyLevel(1)
		String captcha = ProofUtil.genProofCode(4)
		// 将生成的验证码的值放到session中去
		session.captcha = captcha
		// 将图片以流的形式输出
		IOUtils.copyBytes(img.createCAPTCHA(captcha),
				response.getOutputStream(), 4096, true)
//			this._writeImage(img.createCAPTCHA(captcha), response.getOutputStream())
	}

//    def captcha() {
//        if (params.phone) {
//            int rcode = Const.SUCCESS
//            if (params.phone ==~ /1\d{10}/) {
//                String captcha = ProofUtil.genProofCode(6)
////                LocalCache.addCache(params.phone, captcha)
//                // 将生成的验证码的值放到session中去
//                session.captcha = captcha
//            } else {
//                rcode = Const.BAD_PARAMS
//            }
//            this._response(rcode, rcode > 0 ? session.captcha : null)
//        } else {
//            // 禁止图像缓存,使得单击验证码可以刷新验证码图片
//            _response.setHeader("Pragma", "nocache")
//            _response.setHeader("Cache-Control", "private,no-cache,no-store")
//            _response.setDateHeader("Expires", 0)
//            _response.setContentType("image/jpeg")
//
//            BufferedImage bim = new BufferedImage(70, 20,
//                    BufferedImage.TYPE_INT_RGB)
//            Graphics2D gc = bim.createGraphics()
//            gc.setFont(new Font("Times New Roman", Font.PLAIN, 18))
//            // 设置图片填充颜色
//            gc.setColor(Color.yellow)
//            gc.fillRect(0, 0, 70, 20)
//            // 设置边框颜色
//            gc.setColor(Color.pink)
//            gc.drawRect(0, 0, 69, 19)
//            // 产生4位随机数
//            Random rand = new Random()
//            // 设置干扰线颜色
//            gc.setColor(Color.cyan)
//            for (int j = 0; j < 30; j++) {
//                int x = rand.nextInt(70)
//                int y = rand.nextInt(20)
//                int x1 = rand.nextInt(6)
//                int y1 = rand.nextInt(6)
//                // 往图片里面画干扰线
//                gc.drawLine(x, y, x + x1, y + y1)
//            }
//
//            String captcha = ProofUtil.genProofCode(4)
//            for (int i = 0; i < 4; i++) {
//                // 将生成的验证码写入到图片中去
//                String str = captcha.charAt(i)
//                // 设置字体颜色
//                gc.setColor(new Color(20 + rand.nextInt(110), 20 + rand
//                        .nextInt(110), 20 + rand.nextInt(110)))
//                gc.drawString(str, i * 10 + 20, 15)
//            }
//            // 将生成的验证码的值放到session中去
//            session.captcha = captcha
//            // 将图片以流的形式输出
//            ServletOutputStream sos = _response.getOutputStream()
//            ImageIO.write(bim, "jpg", sos)
//            sos.close()
//        }
//    }

	// 更新用户基本信息
	def rest_profile() {
//        if (params.mobile && params.captcha) {
//            if (session.captcha != params.captcha) {
//                this._response(Const.CAPTCHA_ERROR, null)
//                return
//            }
//        }
//        if (params.opassword && params.password && user.password != params.opassword) {
//            // 密码错误
//            this._response(Const.USER_PWD_ERROR, null)
//            return
//        }
//        user.merge(params)
//        user.nickname = params.nickname
//        user.province = params.province
//        user.city = params.city
//		  user.area = params.area
//        user.gender = params.gender.toInteger()
//        user.birthday = params.birthday
//        user.bio = params.bio
		params.remove("password")
		this._address()
		User user = this.userService.updateUser(this._getUserId(), params)
		session.user.nickname = user.nickname
		this._response(Const.SUCCESS, user)
	}

	// 上传用户头像
	def rest_portrait() {
//		if (this._isPostMethod()) {
		def file = request.getFile("portrait")
		if (!file.inputStream || file.empty || file.size > Eval.me(
				this.grailsApplication.config.app.portrait.maxSize)) {
			// 文件超出大小
			this._response(Const.FILE_EXCEED_SIZE)
			return
		}
		if (!Const.IMAGE_TYPES.contains(
				ImageUtil.getImageFormatName(file))) {
			this._response(Const.UNSUPPORTED_FILE_TYPE)
			return
		}
		User user = this.userService.uploadPortrait(
				this._getUserId(), request, file, "/portrait")
		session.user.portrait = user.thumbnail
		this._response(Const.SUCCESS, user)
//		}
	}

	def rest_thumbnail() {
		User user = this.userService.getUser(params.uid)
		if (user?.thumbnail) {
			redirect(uri: user.thumbnail)
		} else {
			this._response(Const.PHOTO_LINK_NULL)
		}
	}

	def rest_clipPortrait() {
		User user = this._getUser()
		if (!user.portrait) {
			this._response(Const.USER_PORTRAIT_ABSENT)
			return
		}
		user = this.userService.clipPortrait(user.id, request, this._clipPos())
		this._response(Const.SUCCESS, user)
	}

	// 找回密码
	def rest_retrieve() {
		if (this._userAgent() == Const.USER_AGENT_PC && (!params.captcha
				|| params.captcha.toLowerCase() != session.captcha)) {
			this._response(Const.CAPTCHA_ERROR)
			return
		}
		User user = this.userService.getUserByEmail(params.email)
		if (!user) {
			this._response(Const.EMAIL_NOT_EXIST)
			return
		}
		boolean flag = this.userService.retrievePassword(user)
		this._response(flag ? Const.SUCCESS : Const.EMAIL_SENT_FAIL)
	}

	// 更改密码
	def rest_password() {
//        if (!params.captcha || params.captcha != session.captcha) {
//            this._response(Const.CAPTCHA_ERROR, null)
//            return
//        }
		User user = this._getUser()
		if (!params.oldPassword || !params.password
				|| user.password != params.oldPassword) {
			// 密码错误
			this._response(Const.USER_PWD_ERROR)
			return
		}
		this.userService.updateUser(user.id, [password: params.password])
		this._response(Const.SUCCESS)
	}

	// 重置密码
	def rest_reset() {
		if (params.token && !this.userService.resetPassword(
				params.token, params.password)) {
			this._response(Const.TOKEN_EXPIRED_OR_DAMAGED)
			return
		}
		if (params.mobile) {
			if (!params.captcha || params.captcha.toLowerCase()
					!= LocalCache.getCaptcha(params.mobile)) {
				this._response(Const.CAPTCHA_ERROR)
				return
			}
			User user = this.userService.getUserByMobile(params.mobile)
			this.userService.updateUser(user.id, [password: params.password])
		}
		this._response(Const.SUCCESS)
	}

	// 绑定手机号码
	def rest_mobile() {
		long userId = this._getUserId()
		User user = this.userService.getUserByMobile(params.mobile)
		if (user && user.id != userId) {
			this._response(Const.MOBILE_EXIST)
			return
		}
		if (!params.captcha || params.captcha.toLowerCase()
				!= LocalCache.getCaptcha(params.mobile)) {
			this._response(Const.CAPTCHA_ERROR)
			return
		}
		user = this.userService.updateUser(userId, [mobile: params.mobile])
		this._response(Const.SUCCESS, user.mobile)
	}

	def rest_iplookup() {
		IpTable iptable = this.ipTableService.lookup(request.getRemoteAddr())
		this._response(Const.SUCCESS, iptable)
	}

	// 邀请参加组织或活动
	def rest_invite() {
		def emails = params.email?.split(",")?.toList()
		def mobiles = params.mobile?.split(",")?.toList()
		def result = null
		User user = this._getUser()
		String content = this._filterWords(params.content)
		if (params.gid) {
			if (!this.userService.isGroupManagerOrCreator(
					user.id, params.gid.toLong())) {
				this._response(Const.PERMISSION_DENIED)
				return
			}
			result = this.userService.inviteAttendGroup(user,
					params.gid, emails, mobiles, content)
		}
		if (params.mid) {
			Meeting meeting = this.meetingService.getMeeting(params.mid)
			if (!this.userService.isGroupManagerCreatorOrMeetingCreator(
					user.id, meeting.groupId, meeting.id)) {
				this._response(Const.PERMISSION_DENIED)
				return
			}
			result = this.userService.inviteAttendMeeting(user,
					params.mid, emails, mobiles, content)
		}
		if (!result) {
			this._response(Const.ILLEGAL_REQUEST)
			return
		}
		this._response(result[0].size() + result[1].size() == 0 ?
				Const.SUCCESS : Const.FAIL, [email: result[0].join(", "),
				mobile: result[1].join(", "), invited: result[2].join(", "),
				insuf: result[3]])
	}

	// 取用户基本信息
	def rest_get() {
		if (params.uids) {
			def uids = params.uids.split(",").toList().collect {
				userId -> userId?.toLong()
			}?.unique()
			def users = this.userService.listUsers({
				inList("id", uids?.size() > 0 ? uids : [0L])
			})
			this._response(Const.SUCCESS, [list: users])
		} else {
			long userId = params.uid ? params.uid.toLong() : this._getUserId()
			User user = this._getUser(userId)
			if (!user) {
				this._response(Const.USER_NOT_EXIST)
				return
			}
			this._response(Const.SUCCESS, this._isUpdatedSince(user) ? user : null)
		}
	}

	// 重新发送激活邮件
	def rest_resendemail() {
		if (this._userAgent() == Const.USER_AGENT_PC && (!params.captcha
				|| params.captcha.toLowerCase() != session.captcha)) {
			this._response(Const.CAPTCHA_ERROR)
			return
		}
		boolean invalid = false
		User user = this._getUser()
		if (!user) {
			user = this.userService.getUserByEmail(params.email)
		} else {
			if (user.email != params.email) {
				invalid = true
			}
		}
		if (!user) {
			invalid = true
		}
		if (invalid) {
			this._response(Const.EMAIL_NOT_EXIST)
			return
		}
		boolean flag = this.userService.sendActivateEmail(user)
		this._response(flag ? Const.SUCCESS : Const.FAIL, params.email)
	}

	def rest_hideJoinedGroup() {
		User user = this.userService.updateUser(this._getUserId(),
				[hidden: params.hidden.toBoolean()])
		this._response(Const.SUCCESS, user)
	}

	def rest_check() {
		String[] ss = this._parseInviteCookies(true)
		if (!ss) {
			this._response(Const.TOKEN_EXPIRED_OR_DAMAGED)
			return
		}
		if (ss[1].indexOf("@") > 0) {
			this._response(this.userService.getUserByEmail(ss[1]) ?
					Const.SUCCESS : Const.USER_NOT_EXIST)
		} else {
			this._response(this.userService.getUserByMobile(ss[1]) ?
					Const.SUCCESS : Const.USER_NOT_EXIST)
		}
	}

	def rest_exist() {
		User user = this.userService.getUserByName(params.username)
		this._response(user ? (user.state == Const.USER_STATE_INACTIVE ?
				Const.USER_INACTIVE : Const.USER_EXIST) : Const.USER_NOT_EXIST)
	}

	def rest_addToken() {
		Token token = new Token(user: this._getUser(), secret: params.token)
		String ua = this._userAgent(request, true)
		if (ua == Const.USER_AGENT_IOS) {
			token.type = params.ent ? Const.TOKEN_APNS_ENT : Const.TOKEN_APNS
		}
		if (ua == Const.USER_AGENT_ANDROID) {
			token.type = Const.TOKEN_GCM
		}
		if (token.type == 0) {
			this._response(Const.ILLEGAL_REQUEST)
			return
		}
		this.tokenService.saveToken(token)
		this._response(Const.SUCCESS, token)
	}

	def rest_deleteToken() {
		this._response(Const.SUCCESS,
				this.tokenService.deleteToken(params.token))
	}

	def rest_isPrivateAllowed() {
		boolean flag = this.userService.isPrivatePermitted(this._getUserId(),
				params.uid.toLong())
		this._response(flag ? Const.SUCCESS : Const.RECEIVER_INVALID)
	}

	def rest_session() {
		this._response(Const.SUCCESS, this._getUserId() > 0L)
	}

}
