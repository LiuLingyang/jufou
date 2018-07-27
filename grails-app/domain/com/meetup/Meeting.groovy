package com.meetup

class Meeting {

	String title

	long startTime

	long endTime

	long createTime

	long updateTime

	String province

	String city

	String area

	String address

	String addressTip

	double latitude

	double longitude

	double distance

//    boolean memberOnly

	String details

	String digest

	String figure

	/**
	 * 0 - 所有人可见
	 * 1 - 仅会员可见
	 */
//	int viewPermission

	/**
	 * 0 - 所有会员
	 * 1 - 只有组织者
	 */
//    int editPermission

	/**
	 * 0 - 所有人
	 * 1 - 仅会员
	 * 2 - 会员加邀请
	 */
	int joinPermission

	long signupStartTime

	long signupEndTime

	int joinLimit

	int joinCount

	int observerLimit

	// 当有会员参加时是否通知组织者
	boolean message

	boolean top

	int commentCount

	int photoCount

	String cover

	/**
	 * -1 - 活动已取消
	 * 0 - 活动正常状态
	 * 1 - 草稿
	 */
	int state = Const.STATE_APPLY_PENDING

	String category

	int gradeTotal

	int graderCount

	static transients = ["distance"]

	static hasMany = [tags: MTag, attendances: MAttendance, albums: Album,
			comments: MComment, questions: MQuestion, invites: MInvite]

	static hasOne = [fee: Fee, repeat: Repeat, application: MApplication]

	static belongsTo = [group: Group, organizer: User]

	static searchable = {
//		only = ['title', 'details']
		all(termVector: "yes")
	}

	static mapping = {
//		tags(batchSize: 10)
//		attendances(batchSize: 10, sort: "id", order: "asc")
//		attendances(batchSize: 10)
//		albums(batchSize: 10, sort: "id", order: "asc")
//		comments(batchSize: 10, sort: "id", order: "asc")
//		comments(batchSize: 10)
//		questions(batchSize: 10, sort: "id", order: "asc")
//		questions(batchSize: 10)
		digest(type: "text")
		details(type: "text")
	}

	def beforeInsert = {
		createTime = new Date().time
	}

	def beforeUpdate = {
		updateTime = new Date().time
	}

	static constraints = {
		title(blank: false)
		group(index: "Group_Idx")
		organizer(index: "Organizer_Idx")
		category(blank: false, index: "Ctg_Idx")
		address(blank: false)
		details(nullable: true)
		digest(nullable: true)
		figure(nullable: true)
//		viewPermission(range: Const.VIEW_BY_ALL..Const.VIEW_BY_MEMBER)
		joinPermission(range: Const.JOIN_BY_ALL..Const.JOIN_BY_MEMBER_INVITE)
		startTime(index: "Time_Idx")
		endTime(index: "Time_Idx")
		state(range: Const.STATE_APPLY_REFUSED..Const.STATE_SIGNUP_STOPPED, index: "State_Idx")
		joinCount(validator: { val, obj ->
			if (obj.joinLimit > 0) {
				val <= obj.joinLimit
			} else {
				true
			}
		})
//        editPermission(inList: [1, 2])
		latitude(index: "Geo_Idx")
		longitude(index: "Geo_Idx")
		fee(nullable: true)
		repeat(nullable: true)
		cover(nullable: true)
		gradeTotal(validator: { val, obj ->
			val >= 0 && val <= 5 * obj.graderCount
		})
		graderCount(validator: { val, obj ->
			val >= 0 && val <= obj.joinCount
		})
		application(nullable: true)
	}

}
