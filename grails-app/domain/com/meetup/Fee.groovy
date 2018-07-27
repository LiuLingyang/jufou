package com.meetup

class Fee {

	Meeting meeting

	int type

	String desc

	String item

	static mapping = {
		desc(type: "text", column: "`desc`")
		item(type: "text")
	}

	static constraints = {
		type(range: Const.FEE_FREE..Const.FEE_CHARGE, index: "Fee_Idx")
		desc(nullable: true)
		item(nullable: true)
	}

}
