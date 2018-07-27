package com.meetup

class Receipt {

	boolean readed

	String client

	static belongsTo = [receiver: User, message: Message]

	static constraints = {
		receiver(index: "Receiver_Idx")
		client(inList: [Const.USER_AGENT_PC, Const.USER_AGENT_MOBILE])
		message(index: "Message_Idx")
	}

}
