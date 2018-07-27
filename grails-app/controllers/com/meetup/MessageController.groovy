package com.meetup

class MessageController extends AbstractController {

	def messageService

	def userService

	def beforeInterceptor = [action: this.&_managerPermission, only: ["rest_inform"]]

	private _managerPermission() {
		if (this.userService.isGroupManagerCreatorOrMeetingCreator(this._getUserId(),
				params.gid ? params.gid.toLong() : 0L,
				params.mid ? params.mid.toLong() : 0L)) {
			return true
		}
		this._response(Const.PERMISSION_DENIED)
		return false
	}

	private _messages(callable, isReceiver = true, order = "desc") {
		int total = this.messageService.countMessages(callable, isReceiver)
		def receipts = this.messageService.listMessages(callable, isReceiver,
				params.offset, params.limit, isReceiver ?
			"message.createTime" : "createTime", order)
		this.messageService.reconstructMessages(receipts, isReceiver)
		return this._simplify([total: total, list: receipts])
	}

	// 取消息列表
	def rest_list() {
		int type = params.type.toInteger()
		boolean sent = params.sent ? true : false
		long userId = this._getUserId()
		def callable = {
			if (sent) {
				if (type < 10) {
					or {
						between("type", type * 10, (type + 1) * 10)
						between("type", type * 100, (type + 1) * 100)
					}
				} else {
					eq("type", type)
				}
				eq("deleted", false)
				sender {
					eq("id", userId)
				}
			} else {
				message {
					if (type < 10) {
						or {
							between("type", type * 10, (type + 1) * 10)
							between("type", type * 100, (type + 1) * 100)
						}
					} else {
						eq("type", type)
					}
					eq("deleted", false)
				}
				receiver {
					eq("id", userId)
				}
				eq("client", this._userAgent())
			}
		}
		this._response(Const.SUCCESS, this._messages(callable, !sent))
	}

	// 取群通知消息列表
	def rest_getInformList() {
		long userId = this._getUserId()
		def callable = {
			if (params.type.toInteger() == 0) {
				receiver {
					eq("id", userId)
				}
				message {
					inList("type", [Const.MESSAGE_TYPE_INFORM_GROUP,
							Const.MESSAGE_TYPE_INFORM_MEETING])
					eq("deleted", false)
				}
				eq("client", this._userAgent())
			}
			if (params.type.toInteger() == 1) {
				sender {
					eq("id", userId)
				}
				inList("type", [Const.MESSAGE_TYPE_INFORM_GROUP,
						Const.MESSAGE_TYPE_INFORM_MEETING])
				eq("deleted", false)
			}
		}
		this._response(Const.SUCCESS, this._messages(callable,
				params.type.toInteger() == 0))
	}

	// 取私信列表
//	def rest_getPrivateList() {
//		if (params.sid && params.rid) {
//			this._response(Const.ILLEGAL_REQUEST)
//			return
//		}
//		long userId = this._getUserId()
//		String ua = this._userAgent()
//		def callable = {
//			if (!params.group) {
//				receiver {
//					if (params.rid) {
//						eq("id", params.rid.toLong())
//					} else {
//						eq("id", userId)
//					}
//				}
//				message {
//					eq("type", Const.MESSAGE_TYPE_PRIVATE)
//					eq("deleted", false)
//					if (params.sid || params.rid) {
//						sender {
//							eq("id", params.sid ? params.sid.toLong() : userId)
//						}
//					}
//				}
//				eq("client", ua)
//			} else {
//				if (params.group.toInteger() > 0) {
//					projections {
//						max("id")
//						groupProperty("receiver")
//					}
//					message {
//						eq("type", Const.MESSAGE_TYPE_PRIVATE)
//						eq("deleted", false)
//						sender {
//							eq("id", userId)
//						}
//					}
//					eq("client", ua)
//				} else {
//					projections {
//						max("id")
//						groupProperty("sender")
//					}
//					eq("type", Const.MESSAGE_TYPE_PRIVATE)
//					eq("deleted", false)
//					receipts {
//						receiver {
//							eq("id", userId)
//						}
//						eq("client", ua)
//					}
//				}
//			}
//		}
//		if (!params.group) {
//			this._response(Const.SUCCESS, this._messages(callable))
//		} else {
//			boolean isReceiver = params.group.toInteger() > 0
//			def ids = this.messageService.listMessages(callable, isReceiver).collect { it[0] }
//			def receipts = this._messages(isReceiver ? {
//				inList("id", ids)
//			} : {
//				message {
//					inList("id", ids)
//				}
//				receiver {
//					eq("id", userId)
//				}
//				eq("client", ua)
//			})
//			this._response(Const.SUCCESS, receipts)
//		}
//	}

	// 取私信列表
	def rest_getPrivateList() {
		long userId = this._getUserId()
		String ua = this._userAgent()
		def callable = {
			if (params.uid) {
				receiver {
					inList("id", [userId, params.uid.toLong()])
				}
				message {
					eq("type", Const.MESSAGE_TYPE_PRIVATE)
					eq("deleted", false)
					sender {
						inList("id", [userId, params.uid.toLong()])
					}
				}
				eq("client", ua)
			} else {
//				if (receipt) {
//					projections {
//						max("id")
//						groupProperty("receiver")
//					}
//					message {
//						eq("type", Const.MESSAGE_TYPE_PRIVATE)
//						eq("deleted", false)
//						sender {
//							eq("id", userId)
//						}
//					}
//					eq("client", ua)
//				} else {
//					projections {
//						max("id")
//						groupProperty("sender")
//					}
//					eq("type", Const.MESSAGE_TYPE_PRIVATE)
//					eq("deleted", false)
//					receipts {
//						receiver {
//							eq("id", userId)
//						}
//						eq("client", ua)
//					}
//				}
				projections {
					max("id")
					message {
						sender {
							groupProperty("id")
						}
					}
					receiver {
						groupProperty("id")
					}
				}
				message {
					eq("type", Const.MESSAGE_TYPE_PRIVATE)
					eq("deleted", false)
				}
				or {
					message {
						sender {
							eq("id", userId)
						}
					}
					receiver {
						eq("id", userId)
					}
				}
				eq("client", ua)
			}
		}
		if (params.uid) {
			this._response(Const.SUCCESS, this._messages(
					callable, true, "asc"))
		} else {
//			def msgIds = this.messageService.listMessages(
//					callable.curry(false), false)?.collect { it[0] }
			def recIds = this.messageService.listMessages(
					callable)?.unique { a, b ->
				this._unique(a[1], a[2]) <=> this._unique(b[1], b[2])
			}?.collect { it[0] }
			def receipts = this._messages({
//				or {
				inList("id", recIds?.size() > 0 ? recIds : [0L])
//					message {
//						inList("id", msgIds?.size() > 0 ? msgIds : [0L])
//					}
//				}
			})
			this._response(Const.SUCCESS, receipts)
		}
	}

	private _unique(senderId, receiverId) {
		return [senderId, receiverId].sort().join(":")
	}

	def rest_delete() {
		long[] mids = params.mids?.split(",")?.toList()?.collect {
			it.trim().toLong()
		}
		int count = this.messageService.deleteMessages(this._getUserId(), mids)
		this._response(Const.SUCCESS, count)
	}

	def rest_read() {
		long[] mids = params.mids?.split(",")?.toList()?.collect {
			it.trim().toLong()
		}
		int count = this.messageService.readMessages(this._getUserId(), mids)
		this._response(Const.SUCCESS, count)
	}

	def rest_new() {
		def counts = [:]
		int total = 0
		this.messageService.listMessages({
			receiver {
				eq("id", this._getUserId())
			}
			message {
				eq("deleted", false)
			}
			eq("readed", false)
			eq("client", this._userAgent())
		})?.each { receipt ->
			int type = receipt.message.type
			this._count(counts, type)
			this._count(counts, (int) (type / 10))
			this._count(counts, (int) (type / 100))
			total++
		}
		counts.put(0, total)
		this._response(Const.SUCCESS, counts)
	}

	private _count(counts, type) {
		if (type == 0) {
			return
		}
		def count = counts.get(type)
		counts.put(type, count ? count + 1 : 1)
	}

	// 群通知会员
	def rest_inform() {
		def data = [:]
		data.title = params.title
		data.content = params.content
		long userId = this._getUserId()
		int result = Const.FAIL
		if (params.gid) {
			result = this.messageService.informGroupMembers(
					params.gid, userId, data)
		}
		if (params.mid) {
			result = this.messageService.informMeetingMembers(
					params.mid, userId, data)
		}
		this._response(result)
	}

	// 发消息给某个会员
	def rest_private() {
		long senderId = this._getUserId()
		long receiverId = params.uid.toLong()
		if(!this.userService.isPrivatePermitted(senderId, receiverId)) {
			this._response(Const.RECEIVER_INVALID)
			return
		}
		boolean flag = this.messageService.writeMessage(
				Const.MESSAGE_TYPE_PRIVATE, [content: params.content],
				receiverId, senderId)
		this._response(flag ? Const.SUCCESS : Const.FAIL)
	}

	def rest_get() {
		Receipt receipt = this.messageService.readMessage(params.rid)
		this.messageService.reconstructMessage(receipt)
		this._response(Const.SUCCESS, receipt.message)
	}

}
