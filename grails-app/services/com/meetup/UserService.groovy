package com.meetup

import org.apache.commons.lang.StringUtils
import org.springframework.transaction.annotation.Transactional

class UserService extends AbstractService {

	def encryptService

	def mailService

	def smsService

	def albumService

	def groupService

	def meetingService

	def photoService

	def attendanceService

	def shortLinkService

	def commentService

	def templateService

	def tokenService

	def inviteService

	def quotaService

	def messageService

	def weixinService

//	private Lock lock = new ReentrantLock()

	@Transactional(readOnly = true)
	def getUser(userId) {
		return User.findById(userId)
	}

	@Transactional(readOnly = true)
	def getUserByName(username) {
		return User.findByUsername(username)
	}

	@Transactional(readOnly = true)
	def getUserByMobile(mobile) {
		return User.findByMobile(mobile)
	}

	@Transactional(readOnly = true)
	def getUserByEmail(email) {
		return User.findByEmail(email)
	}

	@Transactional(readOnly = true)
	def listDistinctUsers(callable) {
		return User.createCriteria().listDistinct(callable)
	}

	@Transactional(readOnly = true)
	def countUsers(callable) {
		return User.createCriteria().count(callable)
	}

	@Transactional(readOnly = true)
	def listUsers(callable, offset = null, limit = null,
				  sort = null, order = null) {
		def args = this._criteriaArgs(offset, limit, sort, order)
		return User.createCriteria().list(args, callable)
	}

	def sendActivateEmail(user) {
		// 下发激活邮件
		String token = user.id + "|" + user.email + "|" + System.currentTimeMillis()
		token = this.encryptService.encryptWithDES(token)
		String url = AppUtil.buildActivateUrl(token)
		String fromAlias = this.grailsApplication.config.app.mail.from.alias
		String subject = this.grailsApplication.config.app.user.activate.mail.subject
		boolean flag = this.mailService.sendMail(fromAlias, subject, user.email,
				"email/activate.ftl", [username: user.username, url: url])
		if (flag) {
			this.tokenService.saveToken(new Token(user: user, secret: token,
					type: Const.TOKEN_ACTIVATE))
		}
		return flag
	}

	private _createAttached(user) {
		if (!user.psettings) {
			user.psettings = new PSettings(meetingUpdate: true, meetingJoin: true)
		}
		if (!user.msettings) {
			user.msettings = new MSettings()
		}
		if (!user.quota) {
			user.quota = new UQuota(groupLimit: this.grailsApplication.config.
					app.user.quota.group.toInteger())
		}
		user.save()
//		new PSettings(meetingUpdate: true, meetingJoin: true, user: user).save()
//		new MSettings(user: user).save()
	}

	@Transactional
	def createUser(user, invited = false) {
		if (user.state <= Const.USER_STATE_INACTIVE) {
			user.state = invited ? Const.USER_STATE_ACTIVE : (user.email ?
					Const.USER_STATE_INACTIVE : Const.USER_STATE_ACTIVE)
		}
		user.save()
		if (user.state == Const.USER_STATE_ACTIVE) {
			this._createAttached(user)
			return true
		} else {
			this.sendActivateEmail(user)
			return false
		}
	}

	@Transactional
	def updateUser(userId, params) {
		User user = User.lock(userId)
		AppUtil.merge(user, params)
		user.save()
		return user
	}

	@Transactional
	def resetPassword(secret, password) {
		User user = this._verifyToken(secret)
		if (!user) {
			return null
		}
		user = this.updateUser(user.id, [password: password])
//			this.tokenService.deleteToken(secret)
		this.tokenService.deleteTokens(user.id, Const.TOKEN_RETRIEVE)
		return user
	}

	@Transactional
	def uploadPortrait(userId, request, file, path) {
		String portrait = this._upload(file, request, path, "user", userId)
//		String thumbnail = this._upload(file, realPath, "user",
//				userId + Const.IMAGE_THUMBNAIL_SUFFIX, this.grailsApplication.
//				config.app.user.portrait.thumbnail)
		return this._updatePortrait(userId, request, portrait)
	}

	private _updatePortrait(userId, request, portrait, thumbnail = null) {
		User user = User.findById(userId)
		def urls = [user.portrait]
		def params = [portrait: portrait]
		if (thumbnail) {
			urls += user.thumbnail
			params.thumbnail = thumbnail
		}
		user = this.updateUser(userId, params)
		urls?.each { url ->
			url && this.hdfsService.delete(url, request)
		}
		return user
	}

	@Transactional
	def clipPortrait(userId, request, pos) {
		User user = User.findById(userId)
		if (pos) {
			def cliped = this._clip(user.portrait, request, [this.grailsApplication.config.
																	 app.user.portrait.original, this.grailsApplication.
																	 config.app.user.portrait.thumbnail], pos)
			user = this._updatePortrait(userId, request, cliped[0], cliped[1])
		}
		return user
	}

	def retrievePassword(user) {
//		String password = ProofUtil.genToken(6)
//		User user = this.updateUser(userId, [password: password.encodeAsMD5()])
		String token = user.id + "|" + user.email + "|" + System.currentTimeMillis()
		token = this.encryptService.encryptWithDES(token)
		String url = AppUtil.buildRetrieveUrl(token)
		String fromAlias = this.grailsApplication.config.app.mail.from.alias
		String subject = this.grailsApplication.config.app.user.retrieve.mail.subject
		boolean flag = this.mailService.sendMail(fromAlias, subject, user.email,
				"email/password.ftl", [url: url])
		if (flag) {
			this.tokenService.saveToken(new Token(user: user, secret: token,
					type: Const.TOKEN_RETRIEVE))
		}
		return flag
	}

	private _buildInviteToken(inviter, invitee, target) {
		// 下发激活邮件
		String token = inviter + "|" + invitee + "|" + target.getClass().
				getSimpleName() + "|" + target.id + "|" + System.currentTimeMillis()
		return this.encryptService.encryptWithDES(token)
	}

	private _saveInvite(inviter, invitee, target) {
		Invite invite = null
		if (target instanceof Group) {
			invite = new GInvite(group: target)
		}
		if (target instanceof Meeting) {
			invite = new MInvite(meeting: target)
		}
		if (!invite) {
			return
		}
		invite.inviter = inviter
		invite.invitee = invitee
		this.inviteService.saveInvite(invite)
	}

	private _inviteByEmails(user, emails, target, content) {
		String fromAlias = this.grailsApplication.config.
				app.mail.from.alias
		String subject = this.grailsApplication.config.
				app.user.invite.mail.subject
		String template = null
		def data = [content: content]
		if (target instanceof Group) {
			subject += new String(("组织[" + target.name + "]").getBytes("gbk"), "iso-8859-1")
			template = "invite/group.ftl"
			data.group = target
		}
		if (target instanceof Meeting) {
			subject += new String(("活动[" + target.title + "]").getBytes("gbk"), "iso-8859-1")
			template = "invite/meeting.ftl"
			data.group = target.group
			data.meeting = target
		}
		def failedEmails = []
		def invitedEmails = this.inviteService.listInvites(
				target, emails)*.invitee
		emails?.findAll { email ->
			StringUtils.isNotBlank(email) && !invitedEmails.contains(email)
		}?.each { email ->
			String token = this._buildInviteToken(user.id, email, target)
			data.url = AppUtil.buildInviteUrl(token)
			boolean flag = this.mailService.sendMail(fromAlias, subject,
					email, template, data)
			if (flag) {
				this._saveInvite(user, email, target)
				this.tokenService.saveToken(new Token(user: user, secret: token,
						type: Const.TOKEN_INVITE))
			} else {
				failedEmails += email
			}
		}
		return [failedEmails, invitedEmails]
	}

	private _inviteByMobiles(user, mobiles, target, content) {
		String template = null
		def data = [user: user, content: content]
		if (target instanceof Group) {
			template = "sms/group.ftl"
			data.group = target
		}
		if (target instanceof Meeting) {
			template = "sms/meeting.ftl"
			data.group = target.group
			data.meeting = target
		}
		String domain = this.grailsApplication.config.app.stub.domain
		def failedMobiles = []
		def invitedMobiles = this.inviteService.listInvites(
				target, mobiles)*.invitee
		int limit = data.group.quota.smsLimit
		int size = 0
		boolean insuf = false
		mobiles?.findAll { mobile ->
			StringUtils.isNotBlank(mobile) && !invitedMobiles.contains(mobile)
		}?.each { mobile ->
			if (data.group.quota.smsUsed + size > limit) {
				failedMobiles += mobile
				insuf = true
			} else {
				String token = this._buildInviteToken(user.id, mobile, target)
				String url = AppUtil.buildInviteUrl(token)
				data.stub = String.format(
						this.grailsApplication.config.app.mobile.invite.stub,
						domain, this.shortLinkService.genStubLink(url))
				String message = this.templateService.mergeTemplate(
						data, template)
				if (size <= 0) {
					size = this._smsNumber(message)
				}
				if (data.group.quota.smsUsed + size > limit) {
					this.shortLinkService.deleteByStub(data.stub)
					insuf = true
				} else {
					boolean flag = this.smsService.sendSms(mobile, message)
					if (flag) {
						this._saveInvite(user, mobile, target)
						this.tokenService.saveToken(new Token(user: user, secret: token,
								type: Const.TOKEN_INVITE))
						this.quotaService.updateSmsUsed(data.group.quotaId, size).smsUsed
					} else {
						this.shortLinkService.deleteByStub(data.stub)
						failedMobiles += mobile
					}
				}
			}
		}
		return [failedMobiles, invitedMobiles, insuf]
	}

	private _smsNumber(message) {
		int standard = Eval.me(this.grailsApplication.config.
				app.sms.standard.length)
		int length = AppUtil.length(message) + this.smsService.getSignatureLength()
		if (length % standard == 0) {
			return (int) (length / standard)
		} else {
			return (int) (length / standard) + 1
		}
	}

	private _invite(user, emails, mobiles, target, content) {
		def es = this._inviteByEmails(user, emails, target, content)
		def ms = this._inviteByMobiles(user, mobiles, target, content)
		return [es[0], ms[0], es[1] + ms[1], ms[2]]
	}

	def inviteAttendGroup(user, groupId, emails, mobiles, content) {
		Group group = Group.findById(groupId)
		return this._invite(user, emails, mobiles, group, content)
	}

	def inviteAttendMeeting(user, meetingId, emails, mobiles, content) {
		Meeting meeting = Meeting.findById(meetingId)
		return this._invite(user, emails, mobiles, meeting, content)
	}

	private _verifyToken(secret) {
		if (!this.tokenService.getToken(secret)) {
			return null
		}
		String decryped = this.encryptService.decryptWithDES(secret)
		String[] ss = decryped.split("\\|");
		if (!ss || ss.length != 3) {
			return null
		}
		long id = Long.parseLong(ss[0])
		String email = ss[1]
		User user = User.findById(id)
		if (user.email != email) {
			return null
		}
		return user
	}

	@Transactional
	def activateUser(secret) {
		User user = this._verifyToken(secret)
		if (!user) {
			return null
		}
		user = this.updateUser(user.id, [state: Const.USER_STATE_ACTIVE])
		this._createAttached(user)
//			this.tokenService.deleteToken(secret)
		this.tokenService.deleteTokens(user.id, Const.TOKEN_ACTIVATE)
		return user
	}

	@Transactional(readOnly = true)
	def isDeletePhotoPermitted(userId, photoId) {
		Photo photo = this.photoService.getPhoto(photoId)
		return !photo || photo.uploaderId == userId ||
				this.isGroupManagerOrCreator(userId, photo.album.groupId)
//				this.attendanceService.
//				getGroupAttendanceByRoles(photo.album.groupId, userId,
//						[Const.ROLE_CREATOR, Const.ROLE_MANAGER])
	}

	@Transactional(readOnly = true)
	def isUpdateAlbumPermitted(userId, albumId) {
		Album album = this.albumService.getAlbum(albumId)
//		return this.attendanceService.getGroupAttendanceByRoles(
//				album.groupId, userId, [Const.ROLE_CREATOR, Const.ROLE_MANAGER]) ||
		return !album || this.isGroupManagerOrCreator(userId, album.groupId) ||
				(album.meeting ? this.isMeetingCreator(userId, album.meetingId) : false)
	}

	@Transactional(readOnly = true)
	def isDeleteCommentPermitted(userId, commentId) {
		Comment comment = this.commentService.getComment(commentId)
		long groupId = comment instanceof MComment ? comment.meeting.groupId
				: (comment instanceof PComment ? comment.photo.album.groupId
				: comment.share.groupId)
		return comment.posterId == userId ||
				this.isGroupManagerOrCreator(userId, groupId)
//				this.attendanceService.
//				getGroupAttendanceByRoles(groupId, userId,
//						[Const.ROLE_CREATOR, Const.ROLE_MANAGER])
	}

	@Transactional(readOnly = true)
	def isAttendGroupOrMeeting(userId, groupId, meetingId) {
		if (groupId > 0L && this.attendanceService.getGroupAttendanceByStates(
				groupId, userId, [Const.GROUP_ATTEND_STATE_ACCEPTED])) {
			return true
		}
		if (meetingId > 0L && this.attendanceService.getMeetingAttendanceByStates(
				meetingId, userId, [Const.MEETING_ATTEND_STATE_SIGNED,
									Const.MEETING_ATTEND_STATE_ACCEPTED])) {
			return true
		}
		return false
	}

	@Transactional(readOnly = true)
	def isGroupOrMeetingCreator(userId, groupId, meetingId) {
		if (groupId > 0L && this.isGroupCreator(userId, groupId)) {
			return true
		}
		if (meetingId > 0L && this.isMeetingCreator(userId, meetingId)) {
			return true
		}
		return false
	}

	@Transactional(readOnly = true)
	def isGroupManagerCreatorOrMeetingCreator(userId, groupId, meetingId) {
		if (groupId > 0L && this.isGroupManagerOrCreator(userId, groupId)) {
			return true
		}
		if (meetingId > 0L && this.isMeetingCreator(userId, meetingId)) {
			return true
		}
		return false
	}

	@Transactional(readOnly = true)
	def isGroupManagerOrCreator(userId, groupId) {
		if (this.attendanceService.getGroupAttendanceByRoles(
				groupId, userId, [Const.ROLE_CREATOR, Const.ROLE_COCREATOR, Const.ROLE_MANAGER])) {
			return true
		}
		return false
	}

	@Transactional(readOnly = true)
	def isGroupCreator(userId, groupId) {
		if (this.attendanceService.getGroupAttendanceByRoles(
				groupId, userId, [Const.ROLE_CREATOR, Const.ROLE_COCREATOR])) {
			return true
		}
		return false
	}

	@Transactional(readOnly = true)
	def isMeetingCreator(userId, meetingId) {
		if (this.attendanceService.getMeetingAttendanceByRoles(
				meetingId, userId, [Const.ROLE_CREATOR, Const.ROLE_COCREATOR])) {
			return true
		}
		return false
	}

	@Transactional(readOnly = true)
	def isViewGroupPermitted(userId, group) {
		if (!group) {
			return true
		}
		if (group.state == Const.STATE_DISMISS) {
			return false
		} else if ([Const.STATE_APPLY_PENDING, Const.STATE_APPLY_REFUSED]
				.contains(group.state)) {
			if (this.isGroupCreator(userId, group.id)) {
				return true
			}
		} else {
			if (group.viewPermission == Const.VIEW_BY_ALL) {
				return true
			}
			if (group.viewPermission == Const.VIEW_BY_MEMBER) {
				if (userId > 0L && this.attendanceService.getGroupAttendanceByStates(
						group.id, userId, [Const.GROUP_ATTEND_STATE_ACCEPTED])) {
					return true
				}
			}
		}
		return false
	}

	@Transactional(readOnly = true)
	def isPrivatePermitted(senderId, receiverId) {
		if (senderId == receiverId) {
			return false
		}
		def callable = { sender, gids = null ->
			projections {
				distinct("id")
			}
			if (!sender) {
				inList("id", gids?.size() > 0 ? gids : [0L])
			}
			attendances {
				attendee {
					eq("id", sender ? senderId : receiverId)
				}
				eq("state", Const.GROUP_ATTEND_STATE_ACCEPTED)
			}
		}
		def groupIds = this.groupService.listGroups(callable.curry(true))
		if (!groupIds || groupIds.size() <= 0) {
			return false
		}
		return this.groupService.listGroups(callable.curry(false, groupIds))?.size() > 0
	}

	@Transactional(readOnly = true)
	def isAdministrator(userId) {
		return User.findById(userId)?.role == Const.USER_ROLE_ADMIN
	}

	@Transactional(readOnly = true)
	def isViewMessagePermitted(userId, id, isReceiver = true) {
		if (!id || id <= 0L) {
			return false
		}
		def message = this.messageService.getMessage(id, isReceiver)
		if (isReceiver) {
			return message?.receiverId == userId
		} else {
			return message?.senderId == userId
		}
	}

	def isWeixinAccount(username) {
		return username.endsWith(Const.WEIXIN_USER_SUFFIX)
	}

}
