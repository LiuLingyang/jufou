package com.meetup

class User {

	String username

	String nickname

	String email

	String mobile

	String password

	String province

	String city

	String area

	long birthday

	/**
	 * 0 - 女
	 * 1 - 男
	 */
	int gender

	String bio

	String portrait

	String thumbnail

	/**
	 * 0 - 未激活
	 * 1 - 激活
	 */
	int state

	long lastLoginTime

	boolean hidden

	long createTime

	long updateTime

	int role = Const.USER_ROLE_PUBLIC

	String realname

	String company

//	Settings settings

	static hasMany = [attendances: Attendance, comments: Comment,
			smessages: Message, rmessages: Receipt, groups: Group,
			meetings: Meeting, tokens: Token, invites: Invite,
			bindings: Binding, footprints: Footprint, contacts: UContact,
			shares: Share]

//	static mappedBy = [comments: "poster", messages: "receiver"]

	static hasOne = [psettings: PSettings, msettings: MSettings, quota: UQuota]

	static constraints = {
		username(unique: true, blank: false, index: "Name_Idx")
		nickname(blank: false)
		email(nullable: true, email: true, index: "Email_Idx")
		mobile(nullable: true, index: "Mobile_Idx",
				validator: { val -> !val || val ==~ /^\d{1,}$/ })
		role(index: "Role_Idx")
		password(blank: false)
		gender(range: Const.GENDER_PRIVARY..Const.GENDER_FEMALE)
		portrait(nullable: true)
		thumbnail(nullable: true)
		state(range: Const.USER_STATE_INACTIVE..Const.USER_STATE_ACTIVE)
		bio(nullable: true)
		province(nullable: true)
		city(nullable: true)
		area(nullable: true)
		psettings(nullable: true)
		msettings(nullable: true)
		quota(nullable: true)
		realname(nullable: true)
		company(nullable: true)
	}

	static mapping = {
//		attendances(batchSize: 10, sort: "id", order: "asc")
//		attendances(batchSize: 10) // for tablePerHierarchy(false)
//		comments(batchSize: 10, sort: "id", order: "asc")
//		comments(batchSize: 10)
//		smessages(batchSize: 10, sort: "id", order: "asc")
//		rmessages(batchSize: 10, sort: "id", order: "asc")
		bio(type: "text")
	}

	def beforeValidate = {
		if (!username) {
			if (email) {
				username = email
			} else if (mobile) {
				username = mobile
			}
		}
	}

	def beforeInsert = {
		createTime = new Date().time
	}

	def beforeUpdate = {
		updateTime = new Date().time
	}

}
