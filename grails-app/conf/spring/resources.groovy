import com.meetup.*
import com.netease.security.xssdefender.filter.XSSFilter
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor
import org.springframework.scheduling.quartz.CronTriggerBean
import org.springframework.scheduling.quartz.MethodInvokingJobDetailFactoryBean
import org.springframework.scheduling.quartz.SchedulerFactoryBean

// Place your Spring DSL code here
beans = {
	encryptService(EncryptService) {
		sessionCipher = "/key/s.key"
		persistCipher = "/key/p.key"
	}
	configService(ConfigService) {
//        authURIs = ["/**/user/regist/*", "/**/user/login/*", "/**/user/retrieve/*", "/rest/**/search/*"]
		authURIs = ["/**/regist/", "/**/login/", "/**/retrieve/", "/rest/user/captcha/",
				"/rest/user/iplookup/", "/rest/open/**/*", "/react/", "/thumbnail/**/*",
				"/hdfs/group/**/*", "/rest/album/list/", "/**/members/", "/rest/meeting/attendees/",
				"/invite/", "/active/", "/error/*/", "/rest/comment/list/", "/rest/photo/list/",
				"/rest/user/thumbnail/", "/rest/user/sendCaptcha/", "/rest/home/category/",
				"/rest/user/reset/", "/activate/", "/reset/", "/rest/update/next/",
				"/rest/meeting/fee/", "/rest/meeting/repeat/", "/rest/user/exist/",
				"/rest/user/check/", "/app/update/**/*", "/**/meeting/weixin/*",
				"/rest/binding/cancel/", "/hdfs/photo/0/0/**/*", "/rest/share/list/",
				"/rest/share/get/", "/rest/**/search/", "/rest/weixin/**/*"]
//		"/**/search/"
		publicURIs = ["/", "/home/", "/home/index/", "/comet/", "/about/", "/job/",
				"/address/", "/help/", "/license/", "/feedback/", "/favicon.ico/",
				"/download/", "/app/", "/admin/", "/baidu-verify-667E333F3F.txt/"]
		restURIs = ["/rest/**/*"]
		permissionExcludeActions = [
				Group: ["create", "about", "search", "join", "rest_attendee",
						"rest_create", "rest_homepage", "rest_join", "rest_list",
						"rest_search", "rest_praize", "rest_praized"],
				Meeting: ["rest_attendee", "rest_getAttendedMeetings",
						"rest_getEndedGroupMeetings", "rest_getGroupMeetings",
						"rest_host", "rest_search"],
				Album: [],
				Photo: ["rest_upload"]
		]
		permissionIncludeActions = [
				Hdfs: ["rest_show"],
				Message: ["rest_get"],
				Tag: ["rest_group"]
		]
		cacheIncludeActions = [
				Hdfs: ["rest_show"]
		]
		sortProperties = [
				hot: ["meetingCount", "memberCount", "praiseCount", "createTime"],
				memberCount: ["memberCount", "createTime"],
				top: ["top", "startTime"],
				distance: ["createTime"]
		]
	}
	mailService(MailService) { bean ->
		bean.initMethod = "init"
	}
	templateService(TemplateService) {
		resource = "/tmpl"
	}
	hdfsService(HdfsService) { bean ->
		bean.initMethod = "init"
	}
	meetingJobTask(MeetingJobTask)
	meetingJobDetail(MethodInvokingJobDetailFactoryBean) {
		targetObject = meetingJobTask
		targetMethod = "doMeetingJob"
	}
	meetingCronTrigger(CronTriggerBean) {
		jobDetail = meetingJobDetail
		cronExpression = "0 0 3 * * ?"
	}
	cleanJobTask(CleanJobTask)
	cleanJobDetail(MethodInvokingJobDetailFactoryBean) {
		targetObject = cleanJobTask
		targetMethod = "doCleanJob"
	}
	cleanCronTrigger(CronTriggerBean) {
		jobDetail = cleanJobDetail
		cronExpression = "0 0 4 * * ?"
	}
	taskExecutor(ThreadPoolTaskExecutor) {
		corePoolSize = 2
		maxPoolSize = 8
		queueCapacity = 1000
		keepAliveSeconds = 300
	}
	scheduler(SchedulerFactoryBean) {
		triggers = [meetingCronTrigger, cleanCronTrigger]
		taskExecutor = taskExecutor
	}
	marshaller(CustomObjectMarshaller) {
//		bean.initMethod = "init"
//		grailsApplication = grailsApplication
		commonExcludes = ["beforeUpdate", "beforeInsert", "beforeValidate", "refer"]
		domainExcludes = [
				Album: ["photos", "group", "meeting"],
				Answer: ["attendance"],
				Event: ["group"],
				GAttendance: ["group", "settings", "votes"],
				MAttendance: ["meeting"],
				Group: ["meetings", "attendances", "albums", "events", "invites",
						"quota", "praises", "application", "tags", "questions",
						"surveys", "contacts", "news", "shares", "menus"],
				GQuestion: ["group", "answers"],
				MQuestion: ["meeting", "answers"],
				GTag: ["groups"],
				MTag: ["meetings"],
				MComment: ["meeting"],
				PComment: ["photo"],
				SComment: ["share"],
				Photo: ["comments", "album"],
				User: ["attendances", "comments", "smessages", "rmessages",
						"password", "psettings", "msettings", "groups",
						"meetings", "tokens", "invites", "quota", "bindings",
						"footprints", "contacts", "shares"],
				Meeting: ["attendances", "albums", "comments", "invites",
						"tags", "questions", "application"],
				UContact: ["owner"],
				GContact: ["group"],
//				Message: ["receipts", "deleted"],
				Message: ["receipts", "deleted", "sender"],
				Receipt: ["receiver"],
				PSettings: ["attendance", "user"],
				MSettings: ["user"],
				Fee: ["meeting"],
				Repeat: ["meeting"],
				Token: ["user"],
				GInvite: ["inviter", "group"],
				MInvite: ["inviter", "meeting"],
				GQuota: ["group"],
				UQuota: ["user"],
				Praise: ["group"],
				GApplication: ["group"],
				MApplication: ["meeting"],
				Binding: ["account", "openId", "ext"],
				Footprint: ["user"],
				Survey: ["group", "votes"],
				Vote: ["attendance", "survey"],
				News: ["group"],
				Share: ["group", "comments"]
		]
		mobileIncludes = [
				Meeting: ["id", "title", "address", "logo", "distance", "province",
						"area", "city", "viewPermission", "joinCount", "startTime",
						"endTime", "group", "cover", "photoCount", "commentCount",
						"gradeTotal", "graderCount"],
				Meeting_Group: ["id", "name", "thumbnail", "customTag"],
				Group: ["id", "name", "createTime", "thumbnail", "lastThumbnail",
						"province", "area", "city", "viewPermission", "memberCount",
						"meetingCount", "distance", "praiseCount", "lastPhoto",
						"customTag", "homepage"],
				Receipt: ["id", "readed", "message", "receiverId"],
//				Receipt_User: ["id"],
				Receipt_Message: ["id", "type", "title", "content", "body", "createTime",
						"senderId", "deleted"],
//				Receipt_Message_User: ["id"]
//				GAttendance: ["id", "attendee"],
//				GAttendance_User: [""]
		]
	}
	smsService(SmsService) { bean ->
		bean.initMethod = "init"
	}
	tokenService(TokenService) { bean ->
		bean.initMethod = "init"
	}
	messageService(MessageService) { bean ->
		bean.initMethod = "init"
	}
	eventService(EventService) { bean ->
		bean.initMethod = "init"
	}
	cometWorkersPool(ThreadPoolTaskExecutor) {
		corePoolSize = 1
		maxPoolSize = 1
	}
	xssFilter(XSSFilter, "classpath:xss-filters.properties", "meetup")
	appUtil(AppUtil) { bean ->
		bean.initMethod = "init"
		reserved = ["dbconsole", "password", "license", "address", "feedback",
				"message", "setting", "profile", "personal", "retrieve",
				"activate", "thumbnail", "download", "contact"]
	}
	typeUtil(TypeUtil)
	apnsService(ApnsService) { bean ->
		bean.initMethod = "init"
		cert = "/cert/apns.p12"
		entCert = "/cert/ent.p12"
	}
	cometService(CometService) { bean ->
		bean.initMethod = "init"
	}
	wordFilterService(WordFilterService) { bean ->
		bean.initMethod = "init"
		dict = "/filter/words.dict"
	}
	bindingService(BindingService) { bean ->
		bean.initMethod = "init"
	}
	contactService(ContactService) { bean ->
		bean.initMethod = "init"
	}
	weixinService(WeixinService) { bean ->
		bean.initMethod = "init"
	}
//	albumService(AlbumService)
//	commentService(CommentService)
}
