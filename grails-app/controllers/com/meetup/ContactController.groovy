package com.meetup

class ContactController extends AbstractController {

	def contactService

	def beforeInterceptor = [action: this.&_contactPermission, except: []]

	private _contactPermission() {
		long userId = this._getUserId()
		if (actionName.endsWith("_list")) {
			if (!params.gid || this.userService.isAttendGroupOrMeeting(
					userId, params.gid.toLong(), 0L)) {
				return true
			}
		} else if (actionName.endsWith("_update") || actionName.endsWith("_delete")) {
			if (params.cid) {
				Contact contact = this.contactService.getContact(params.cid)
				if (contact instanceof GContact) {
					if (this.userService.isGroupManagerOrCreator(
							userId, ((GContact) contact).groupId)) {
						return true
					}
				} else {
					if (((UContact) contact).ownerId == userId) {
						return true
					}
				}
			}
		} else {
			if (!params.gid || this.userService.isGroupManagerOrCreator(
					userId, params.gid.toLong())) {
				return true
			}
		}
		this._response(Const.PERMISSION_DENIED)
		return false
	}

	// 导入通讯录
	def rest_import() {
		def file = request.getFile("contact")
		if (!file.inputStream || file.empty || file.size > Eval.me(
				this.grailsApplication.config.app.contacts.maxSize)) {
			// 文件超出大小
			this._response(Const.FILE_EXCEED_SIZE)
			return
		}
		if (!this.grailsApplication.config.app.contacts.types.split(";").
				toList().contains(ImageUtil.getImageFormatName(file))) {
			this._response(Const.UNSUPPORTED_FILE_TYPE)
			return
		}
		def target = params.gid ? this.groupService.getGroup(params.gid) : this._getUser()
		int result = this.contactService.imports(target, file, request, "/contact")
		if (result >= 0) {
			this._response(Const.SUCCESS, result)
		} else {
			this._response(result)
		}
	}

	// 导出通讯录
	def rest_export() {
		def target = params.gid ? this.groupService.getGroup(params.gid) : this._getUser()
		def contacts = this.contactService.listContactsByTarget(target,
				[sort: "name", order: "asc"])
		String filename = (target instanceof Group ? "组织[" + target.name + "]_"
				: "个人") + "通讯录_" + new Date().format("yyyy-MM-dd")
		filename = this.contactService.getFilename(filename, params.type)
		if (!filename) {
			this._response(Const.UNKNOWN_FORMAT)
			return
		}
		response.setContentType("application/octet-stream")
		response.setHeader("Content-disposition", "attachment;filename="
				+ new String(filename.getBytes("UTF-8"), "iso8859-1"))
		this.contactService.exports(contacts, params.type, response.getOutputStream())
	}

	def rest_create() {
		def target = params.gid ? this.groupService.getGroup(params.gid) : this._getUser()
		def contact = target instanceof Group ? new GContact(params) : new UContact(params)
		if (contact instanceof GContact) {
			contact.group = target
		} else {
			contact.owner = target
		}
		this.contactService.saveContact(contact)
		this._response(Const.SUCCESS, contact)
	}

	def rest_update() {
		Contact contact = this.contactService.updateContact(params.cid, params)
		this._response(Const.SUCCESS, contact)
	}

	def rest_delete() {
		Contact contact = this.contactService.deleteContact(params.cid)
		this._response(Const.SUCCESS, contact)
	}

	def rest_list() {
		Class type = params.gid ? Group.class : User.class
		def callable = {
			if (type == Group.class) {
				group {
					eq("id", params.gid.toLong())
				}
			}
			if (type == User.class) {
				owner {
					eq("id", this._getUserId())
				}
			}
			if (params.keyword) {
				like("name", "%" + params.keyword + "%")
			}
		}
		int total = this.contactService.countContacts(callable, type)
		def contacts = this.contactService.listContacts(
				callable, type, params.offset, params.limit, "name", "asc")
		this._response(Const.SUCCESS, [total: total, list: contacts])
	}

}
