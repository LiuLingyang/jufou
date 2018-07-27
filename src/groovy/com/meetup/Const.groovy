package com.meetup

class Const {

	static final String COOKIE_SESSION = "MU_S"

	static final String COOKIE_PERSIST = "MU_P"

	static final String COOKIE_INVITED_USER = "MU_IU"

	static final String COOKIE_INVITE_TOKEN = "MU_IT"

	static final int USER_ROLE_PUBLIC = 0

	static final int USER_ROLE_AUTHED = 100

	static final int USER_ROLE_ADMIN = 10000

	/**
	 * 标识认证是依据用户名密码进行的
	 */
	static final int FLAG_NEW = 0

	/**
	 * 标识认证是通过凭证交换进行的
	 */
	static final int FLAG_EXCHANGE = 1

	// 错误码
	static final int SUCCESS = 1

	static final int FAIL = -1

	static final int CAPTCHA_ERROR = -2

	static final int PERMISSION_DENIED = -3

	static final int FILE_EXCEED_SIZE = -4

	static final int UNSUPPORTED_FILE_TYPE = -5

	static final int XSS_ATTACK = -6

	static final int CAPTCHA_SENT_FREQUENT = -7

	static final int ILLEGAL_REQUEST = -8

	static final int TOKEN_EXPIRED_OR_DAMAGED = -9

	static final int EMAIL_SENT_FAIL = -10

	static final int UNKNOWN_FORMAT = -11

	static final int ILLEGAL_WORDS = -12

	static final int OBJECT_NOT_EXIST = -13

	static final int GROUP_NOT_EXIST = -201

	static final int GROUP_EXIST = -202

	static final int MISSING_INFORM = -203

	static final int NOT_JOINED = -204

	static final int ALREADY_JOINED = -205

	static final int ROLE_DISMATCH = -206

	static final int STATE_DISMATCH = -207

	static final int PHOTO_QUOTA_BEYOND = -208

	static final int GROUP_DISMISSED = -209

	static final int GROUP_LOGO_ABSENT = -210

	static final int APPLICATION_NOT_EXIST = -211

	static final int CUSTOM_TAG_USED = -212

	static final int MEETING_NOT_EXIST = -301

	static final int SIGNUP_TIME_BEYOND = -302

	static final int JOIN_LIMIT_BEYOND = -303

	static final int OBSERVER_LIMIT_BEYOND = -304

	static final int REPLY_FORBIDDEN = -305

	static final int MEETING_CANCELED = -306

	static final int SIGNUP_NOT_STARTED = -307

	static final int SIGNUP_ENDED = -308

	static final int NOT_GROUP_MEMBER = -309

	static final int NOT_INVITED = -310

	static final int SIGNUP_STOPPED = -311

	static final int PHOTO_LINK_NULL = -401

	static final int RECEIVER_INVALID = -501

	static final int EMAIL_MOBILE_NULL = -101

	static final int USER_EXIST = -102

	static final int EMAIL_EXIST = -103

	static final int MOBILE_EXIST = -104

	static final int USER_NOT_EXIST = -105

	static final int USER_PWD_ERROR = -106

	static final int USER_INACTIVE = -107

	static final int EMAIL_NOT_EXIST = -108

	static final int GROUP_QUOTA_BEYOND = -109

	static final int NOT_LOGINED = -110

	static final int USER_PORTRAIT_ABSENT = -111

	static final int USER_NOT_BINDING = -112

	static final int VOTE_TIME_BEYOND = -601

	static final int ALREADY_VOTED = -602

	// 对象属性常量
	static final int USER_STATE_INACTIVE = 0

	static final int USER_STATE_ACTIVE = 1

//	static final int USER_STATE_WEIXIN = 2

	static final int GENDER_PRIVARY = 0

	static final int GENDER_MALE = 1

	static final int GENDER_FEMALE = 2

	static final int TOKEN_ACTIVATE = 1

	static final int TOKEN_RETRIEVE = 2

	static final int TOKEN_INVITE = 3

	static final int TOKEN_APNS = 4

	static final int TOKEN_APNS_ENT = 5

	static final int TOKEN_GCM = 6

//    static final int TAG_GROUP = 1
//
//    static final int TAG_MEETING = 2

	static String DOMAIN = null

	static String URL_ROOT = null

	static String CONTEXT_PATH = null

//	static final int EXPIRE_PERSIST = Eval.me(ApplicationHolder.
//			getApplication().config.app.cookie.persist.expireTime)

//	static final long EXPIRE_CACHE = Eval.me(ApplicationHolder.
//			getApplication().config.app.cache.expireTime)

//	static final long PORTRAIT_MAX_SIZE = Eval.me(ApplicationHolder.
//			getApplication().config.app.portrait.maxSize)

//	static final long PHOTO_MAX_SIZE = Eval.me(ApplicationHolder.
//			getApplication().config.app.photo.maxSize)

//	static final long CONTACTS_MAX_SIZE = Eval.me(ApplicationHolder.
//			getApplication().config.app.contacts.maxSize)

//	static final List<String> IMAGE_TYPES = ApplicationHolder.
//			getApplication().config.app.image.types.split(";").toList()

//	static final List<String> CONTACTS_TYPES = ApplicationHolder.
//			getApplication().config.app.contacts.types.split(";").toList()

//	static final int BROWSER_CACHE_EXPIRE_DATE = ApplicationHolder.
//			getApplication().config.app.browser.cache.expire.date.toInteger()

	static final String DEFAULT_ENCODING = "utf-8"

	static final int ROLE_MEMBER = 1

	static final int ROLE_MANAGER = 2

	static final int ROLE_CREATOR = 3

	static final int ROLE_COCREATOR = 4

	static final int REPEAT_NO = 0

	static final int REPEAT_DAY = 1

	static final int REPEAT_WEEK = 2

	static final int REPEAT_MONTH = 3

	static final int FEE_FREE = 0

	static final int FEE_AA = 1

	static final int FEE_CHARGE = 2

	static final int MEETING_ATTEND_STATE_NOREPLY = 0

	static final int MEETING_ATTEND_STATE_REFUSE = 1

	static final int MEETING_ATTEND_STATE_SIGNED = 2

	static final int MEETING_ATTEND_STATE_ACCEPTED = 3

	static final int MEETING_ATTEND_STATE_REFUSED = 4

	static final int GROUP_ATTEND_STATE_SUBMIT = 0

	static final int GROUP_ATTEND_STATE_ACCEPTED = 1

	static final int GROUP_ATTEND_STATE_REFUSE = 2

	static final int VIEW_BY_ALL = 0

	static final int VIEW_BY_MEMBER = 1

	static final int JOIN_BY_ALL = 0

	static final int JOIN_BY_MEMBER = 1

	static final int JOIN_BY_MEMBER_INVITE = 2

	static final int STATE_APPLY_REFUSED = -3

	static final int STATE_APPLY_PENDING = -2

	static final int STATE_DISMISS = -1

	static final int STATE_NORMAL = 0

	static final int STATE_DRAFT = 1

	static final int STATE_SIGNUP_STOPPED = 2

	static final long TIME_HOUR = 60 * 60 * 1000L

	static final long TIME_DAY = 24 * TIME_HOUR

	static final long TIME_WEEK = 7 * TIME_DAY

//	static final int SMS_LENGTH = Eval.me(ApplicationHolder.getApplication().config.
//			app.sms.standard.length)

	static final String DEFAULT_SET = "默认分组"

	static final int MESSAGE_TYPE_MEETING_CREATE = 11

	static final int MESSAGE_TYPE_MEETING_COMMENT = 21

	static final int MESSAGE_TYPE_GROUP_PHOTO_UPLOAD = 22

	static final int MESSAGE_TYPE_MEETING_PHOTO_UPLOAD = 23

	static final int MESSAGE_TYPE_MEETING_REPLY = 31

	static final int MESSAGE_TYPE_MEETING_UPDATE = 32

	static final int MESSAGE_TYPE_MEETING_REPLY_UPDATE = 33

	static final int MESSAGE_TYPE_MEETING_REPLY_PARTER_UPDATE = 34

	static final int MESSAGE_TYPE_MEETING_JOIN = 35

	static final int MESSAGE_TYPE_GROUP_JOIN = 36

	static final int MESSAGE_TYPE_GROUP_EXIT = 37

	static final int MESSAGE_TYPE_GROUP_JOIN_CHECK = 38

	static final int MESSAGE_TYPE_GROUP_SET_MANAGER = 39

	static final int MESSAGE_TYPE_MEETING_CANCEL = 310

	static final int MESSAGE_TYPE_GROUP_DISMISS = 311

	static final int MESSAGE_TYPE_GROUP_APPLY_AUTH = 312

	static final int MESSAGE_TYPE_MEETING_APPLY = 313

	static final int MESSAGE_TYPE_MEETING_APPLY_AUTH = 314

	static final int MESSAGE_TYPE_INFORM_GROUP = 41

	static final int MESSAGE_TYPE_INFORM_MEETING = 42

	static final int MESSAGE_TYPE_PRIVATE = 51

	static final int EVENT_TYPE_GROUP_JOIN = 11

	static final int EVENT_TYPE_MEETING_REPLY = 21

	static final int EVENT_TYPE_MEETING_REPLY_UPDATE = 22

	static final int EVENT_TYPE_MEETING_COMMENT = 23

	static final int EVENT_TYPE_PHOTO_UPLOAD = 31

	static final String AUTH_APPLIED = "auth_applied"

	static final String USER_AGENT_PC = "pc"

	static final String USER_AGENT_MOBILE = "mobile"

	static final String USER_AGENT_IOS = "ios"

	static final String USER_AGENT_ANDROID = "android"

//	static final String USER_AGENT_WEB = "web"

//	static final String USER_AGENT_MOBILE_WEB = "mobile_web"

	static final String IMAGE_ORIGINAL_SUFFIX = "_o"

	static final String IMAGE_THUMBNAIL_SUFFIX = "_t"

	static final String DISTANCE_COMPUTATION = '''
		ROUND(2 * ASIN(
					SQRT(
						POWER(
							SIN((%1$s * PI() / 180.0 - %3$f * PI() / 180.0) / 2), 2
						)
						+ COS(%1$s * PI() / 180.0) * COS(%3$f * PI() / 180.0)
							* POWER(
								SIN((%2$s * PI() / 180.0 - %4$f * PI() / 180.0) / 2), 2
							)
					)
				) * %5$f * 10000) / 10000
	'''

	static final double EARTH_RADIUS = 6378137.0

	static final String GENERAL_RELEASE = "0000"

	static final int BINDING_TYPE_SINA = 1

	static final int BINDING_TYPE_TENCENT = 2

	static final int BINDING_TYPE_RENREN = 3

	static final int BINDING_TYPE_WEIXIN = 4

	static List INSTALL_FILE_TYPES = null

	static List IMAGE_TYPES = null

	static long PHOTO_MAX_SIZE = 0L

	static long CACHE_EXPIRE_TIME = 0L

	static final String CUSTOM_GROUP_TAG = "#custom#"

	static final int SURVEY_TYPE_SINGLE_CHOICE = 1

	static final int SURVEY_TYPE_MULTI_CHOICE = 2

	static final int SURVEY_TYPE_GRADE = 3

	static List GROUP_CATEGORIES = null

	static List MOBILE_GROUP_MENUS = null

	static final String SUB_GROUP_TAG = "sub"

	static final String WEIXIN_USER_SUFFIX = "@weixin.com"

}
