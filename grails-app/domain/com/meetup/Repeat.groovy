package com.meetup

class Repeat {

	Meeting meeting

	/**
	 * 0 - 不重复
	 * 1 - 天重复
	 * 2 - 周重复
	 * 3 - 月重复
	 */
	int type

	String ext

	int interval

	long endTime

	static mapping = {
		table "`REPEAT`"
		interval(column: "`interval`")
	}

	static constraints = {
		type(range: Const.REPEAT_NO..Const.REPEAT_MONTH, index: "Repeat_Idx")
		ext(nullable: true)
	}

}
