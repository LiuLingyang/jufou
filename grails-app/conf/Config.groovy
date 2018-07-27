import org.apache.log4j.IndexDailyRollingFileAppender

// locations to search for config files that get merged into the main config;
// config files can be ConfigSlurper scripts, Java properties files, or classes
// in the classpath in ConfigSlurper format

// grails.config.locations = [ "classpath:${appName}-config.properties",
//                             "classpath:${appName}-config.groovy",
//                             "file:${userHome}/.grails/${appName}-config.properties",
//                             "file:${userHome}/.grails/${appName}-config.groovy"]

// if (System.properties["${appName}.config.location"]) {
//    grails.config.locations << "file:" + System.properties["${appName}.config.location"]
// }

grails.config.locations = ["classpath:app-config.properties",
						   "classpath:error-msg.properties"]
//grails.config.base.webXml = "file:${basedir}/war/web.xml"

grails.project.groupId = appName // change this to alter the default package name and Maven publishing destination
grails.mime.file.extensions = true // enables the parsing of file extensions from URLs into the request format
grails.mime.use.accept.header = false
grails.mime.types = [
		all          : '*/*',
		atom         : 'application/atom+xml',
		css          : 'text/css',
		csv          : 'text/csv',
		form         : 'application/x-www-form-urlencoded',
		html         : ['text/html', 'application/xhtml+xml'],
		js           : 'text/javascript',
		json         : ['text/json', 'application/json'],
		multipartForm: 'multipart/form-data',
		rss          : 'application/rss+xml',
		text         : 'text/plain',
		xml          : ['text/xml', 'application/xml']
]

// URL Mapping Cache Max Size, defaults to 5000
//grails.urlmapping.cache.maxsize = 1000

// What URL patterns should be processed by the resources plugin
grails.resources.adhoc.patterns = ['/images/*', '/css/*', '/js/*', '/plugins/*']

// The default codec used to encode data with ${}
grails.views.default.codec = "none" // none, html, base64
grails.views.gsp.encoding = "UTF-8"
grails.converters.encoding = "UTF-8"
// enable Sitemesh preprocessing of GSP pages
grails.views.gsp.sitemesh.preprocess = true
// scaffolding templates configuration
grails.scaffolding.templates.domainSuffix = 'Instance'

// Set to false to use the new Grails 1.2 JSONBuilder in the render _method
grails.json.legacy.builder = false
// enabled native2ascii conversion of i18n properties files
grails.enable.native2ascii = true
// packages to include in Spring bean scanning
grails.spring.bean.packages = []
// whether to disable processing of multi part requests
grails.web.disable.multipart = false

// request parameters to mask when logging exceptions
grails.exceptionresolver.params.exclude = ['password']

// configure auto-caching of queries by default (if false you can cache individual queries with 'cache: true')
grails.hibernate.cache.queries = false

environments {
	development {
		grails.logging.jul.usebridge = true
	}
	test {
		grails.logging.jul.usebridge = true
		grails.dbconsole.enabled = true
//		grails.dbconsole.urlRoot = "/dbconsole"
	}
	production {
		grails.logging.jul.usebridge = false
		// TODO: grails.serverURL = "http://www.changeme.com"
	}
}

// log4j configuration
log4j = {
	// Example of changing the log pattern for the default console appender:
	//
	//appenders {
	//    console name:'stdout', layout:pattern(conversionPattern: '%c{2} %m%n')
	//}

	appenders {
		console name: "stdout", layout: pattern(conversionPattern:
				"[%d{HH:mm:ss:SSS}] %-5p %c{2}: %m%n")
		'null' name: 'stacktrace'
		appender new IndexDailyRollingFileAppender(name: "meetupLogger",
				datePattern: "'.'yyyy-MM-dd", layout: pattern(
				conversionPattern: "[%d{HH:mm:ss:SSS}] %-5p %c{2}: %m%n"),
				file: "../logs/meetup.log", append: true, maxBackupIndex: 7)
		appender new IndexDailyRollingFileAppender(name: "grailsLogger",
				datePattern: "'.'yyyy-MM-dd", layout: pattern(
				conversionPattern: "[%d{HH:mm:ss:SSS}] %-5p %c{2}: %m%n"),
				file: "../logs/grails.log", append: true, maxBackupIndex: 7)
//		environments {
//			development {
//				appender new IndexDailyRollingFileAppender(name: "grailsLogger",
//						datePattern: "'.'yyyy-MM-dd", layout: pattern(
//						conversionPattern: "[%d{HH:mm:ss:SSS}] %-5p %c{2}: %m%n"),
//						file: "../logs/grails.log", append: true, maxBackupIndex: 7)
//			}
//		}
	}

	root {
		error "stdout"
	}

	error additivity: false, meetupLogger: [
			'grails.app.controllers.com.meetup',
			'grails.app.domain.com.meetup',
			'grails.app.services.com.meetup',
			'grails.app.taglib.com.meetup',
			'grails.app.conf.com.meetup',
			'grails.app.filters.com.meetup'
	]

	error additivity: false, grailsLogger: [
			'org.codehaus.groovy.grails.web.servlet',        // controllers
			'org.codehaus.groovy.grails.web.pages',          // GSP
			'org.codehaus.groovy.grails.web.sitemesh',       // layouts
			'org.codehaus.groovy.grails.web.mapping.filter', // URL mapping
			'org.codehaus.groovy.grails.web.mapping',        // URL mapping
			'org.codehaus.groovy.grails.commons',            // core / classloading
			'org.codehaus.groovy.grails.plugins',            // plugins
			'org.codehaus.groovy.grails.orm.hibernate',      // hibernate integration
			'org.springframework',
			'org.hibernate',
			'net.sf.ehcache.hibernate'
	]

	environments {
		development {
			trace additivity: false, grailsLogger: ["org.hibernate.SQL"]
		}
	}

//	error 'org.codehaus.groovy.grails.web.servlet',        // controllers
//			'org.codehaus.groovy.grails.web.pages',          // GSP
//			'org.codehaus.groovy.grails.web.sitemesh',       // layouts
//			'org.codehaus.groovy.grails.web.mapping.filter', // URL mapping
//			'org.codehaus.groovy.grails.web.mapping',        // URL mapping
//			'org.codehaus.groovy.grails.commons',            // core / classloading
//			'org.codehaus.groovy.grails.plugins',            // plugins
//			'org.codehaus.groovy.grails.orm.hibernate',      // hibernate integration
//			'org.springframework',
//			'org.hibernate',
//			'net.sf.ehcache.hibernate'
}

grails.war.dependencies = ["htmlparser.jar", "image-scal.jar",
						   "netease-captcha-0.9890.06.jar", "cross-origin-0.0.1.jar",
						   "tomcat-servlet-api-7.0.30.jar", "xssdefender-1.3.6.jar",
						   "jericho-html-3.1.jar"]

grails.gorm.failOnError = true
grails.gorm.autoFlush = false

//cachefilter {
//	filters = [
//			filterStatic: [
//					enabled: true,
//					scope: 'application',
//					time: 30 * 24 * 3600L,
//					expires: 'time',
//					lastModified: '',
//					cron: '',
//					pattern: '/r/*,/res/*,/src/css/*,/src/javascript/*'
//			]
//	]
//}

//grails{
//	freemarker {
//		defaultEncoding = "utf-8"
//		contentType = "text/html;charset=utf-8"
//	}
//}

//grails {
//	redis {
//		poolConfig {
//			// jedis pool specific tweaks here, see jedis docs & src
//			// ex: testWhileIdle = true
//		}
//		port = 6379
//		host = "localhost"
//		timeout = 2000 //default in milliseconds
//		password = "somepassword" //defaults to no password
//	}
//}
//
//grails {
//	redis-gorm {
//		host = "myserver"
//		port = 6379
//		password = "secret"
//		pooled = true
//		timeout = 5000
//		resources = 15
//	}
//}

//grails.databinding.useSpringBinder = true