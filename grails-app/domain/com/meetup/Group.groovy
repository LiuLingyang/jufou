package com.meetup

class Group {

	String name

	String category

	String description

	String memberCall

	String province

	String city

	String area

	String section

	String address

	double latitude

	double longitude

	double distance

	String homepage

//    boolean offline

	/**
	 * 0  - 只有组织者能加入新的活动
	 * 11 - 活动可由组织会员建议发起，只要有一个组织者通告活动，活动即被通告
	 * 12 - 活动可由组织会员建议发起，当有一个组织者通告活动，或者有三个成员加入活动时，活动即被通告
	 * 13 - 只要有一个组织会员建议发起活动，该活动即被通告
	 */
//    int announceMode

	long createTime

	long updateTime

//    String sCreateTime

	int memberCount

	int meetingCount

	int praiseCount

	String logo

	String thumbnail

	String lastThumbnail

	String lastPhoto

	/**
	 * 主体模板
	 * 0 - 系统默然模板
	 */
	int template

	/**
	 * 提交个人简介要求
	 */
	boolean submitIntro

	/**
	 * 包含个人头像要求
	 */
	boolean submitPortrait

	/**
	 * 回答问题要求
	 */
	boolean submitAnswer

	String welcome

	/**
	 * 0 - 任何人可访问
	 * 1 - 只有组织成员可访问
	 */
	int viewPermission

	/**
	 * 0 - 解散
	 * 1 - 正常
	 */
	int state = Const.STATE_APPLY_PENDING

	String customTag

	String menus

	static transients = ["distance", "customTag"]

	static hasMany = [meetings: Meeting, tags: GTag, attendances: GAttendance,
			questions: GQuestion, albums: Album, events: Event, invites: GInvite,
			praises: Praise, surveys: Survey, contacts: GContact, news: News,
			shares: Share]

	static hasOne = [quota: GQuota, application: GApplication]

	static belongsTo = [owner: User]

	static searchable = {
//		only = ['name', 'category', 'description']
		all(termVector: "yes")
	}

//    static embedded = ['site']

	static mapping = {
		table "`GROUP`"
//		version(false)
//		meetings(batchSize: 10, sort: "id", order: "asc")
//		meetings(batchSize: 10, sort: "startTime", order: "asc")
//		batchSize 10
//		tags(batchSize: 10)
//		attendances(batchSize: 10, sort: "id", order: "asc")
//		attendances(batchSize: 10)
//		questions(batchSize: 10, sort: "id", order: "asc")
//		questions(batchSize: 10)
//		albums(batchSize: 10, sort: "id", order: "asc")
//		events(batchSize: 10, sort: "id", order: "asc")
		description(type: "text")
		welcome(type: "text")
	}

	def beforeInsert = {
		createTime = new Date().time
	}

	def beforeUpdate = {
		updateTime = new Date().time
	}

	static constraints = {
		name(blank: false, index: "Name_Idx")
		category(blank: false, index: "Ctg_Idx")
		homepage(unique: true, blank: false,
//				validator: { val -> !(val ==~ /^[a-z\.]+$/ || val.length() <= 6) },
				validator: { val -> AppUtil.isValidHomepage(val) },
				index: "Homepage_Idx")
//        announceMode(inList: [0, 11, 12, 13])
		section(nullable: true)
		address(nullable: true)
		description(blank: false)
		logo(nullable: true)
		thumbnail(nullable: true)
		owner(index: "Owner_Idx")
		welcome(nullable: true)
		viewPermission(range: Const.JOIN_BY_ALL..Const.JOIN_BY_MEMBER)
		state(range: Const.STATE_APPLY_REFUSED..Const.STATE_NORMAL, index: "State_Idx")
		latitude(index: "Geo_Idx")
		longitude(index: "Geo_Idx")
		lastThumbnail(nullable: true)
		lastPhoto(nullable: true)
//		quota(unique: true)
		application(nullable: true)
		createTime(index: "Time_Idx")
		memberCount(index: "MemberCount_Idx")
		menus(nullable: true)
	}

//    static transients = ['sCreateTime']

}
