grails.servlet.version = "3.0" // Change depending on target container compliance (2.5 or 3.0)
grails.project.class.dir = "target/classes"
grails.project.test.class.dir = "target/test-classes"
grails.project.test.reports.dir = "target/test-reports"
grails.project.target.level = 1.6
grails.project.source.level = 1.6
//grails.project.war.file = "target/${appName}-${appVersion}.war"
grails.project.war.file = "target/ROOT.war"

grails.server.port.http = 80

grails.project.dependency.resolution = {
	// inherit Grails' default dependencies
	inherits("global") {
		// specify dependency exclusions here; for example, uncomment this to disable ehcache:
		// excludes 'ehcache'
	}
	log "error" // log level of Ivy resolver, either 'error', 'warn', 'info', 'debug' or 'verbose'
	checksums true // Whether to verify checksums on resolve

	repositories {
		inherits true // Whether to inherit repository definitions from plugins

		grailsPlugins()
		grailsHome()
		grailsCentral()

		mavenLocal()
		mavenCentral()

		// uncomment these (or add new ones) to enable remote dependency resolution from public Maven repositories
		//mavenRepo "http://snapshots.repository.codehaus.org"
		//mavenRepo "http://repository.codehaus.org"
		//mavenRepo "http://download.java.net/maven/2/"
		//mavenRepo "http://repository.jboss.com/maven2/"

//		mavenRepo "http://m2repo.spockframework.org/snapshots"
		mavenRepo "http://repo.grails.org/grails/plugins"
		mavenRepo "http://repo.grails.org/grails/core"
//		mavenRepo "http://oss.sonatype.org/content/repositories/snapshots"
//		mavenRepo "http://mvn.hz.netease.com/artifactory/repo"
//		mavenRepo "http://repository.springsource.com/maven/bundles/release"
	}
	dependencies {
		// specify dependencies here under either 'build', 'compile', 'runtime', 'test' or 'provided' scopes eg.

		runtime 'mysql:mysql-connector-java:5.1.20'
		compile 'com.sun.mail:javax.mail:1.4.5'
//		compile 'com.netease.is.image:netease-captcha:0.9890.06'
		compile 'opensymphony:quartz:1.6.2'
		compile 'org.apache.poi:poi:3.9'
		compile 'org.apache.poi:poi-ooxml:3.9'
		compile 'org.apache.hadoop:hadoop-core:1.0.4'
		compile 'org.apache.axis:axis:1.4'
		compile 'javax.xml:jaxrpc-api:1.1'
		runtime 'wsdl4j:wsdl4j:1.6.3'
		runtime 'commons-discovery:commons-discovery:0.5'
		compile 'com.notnoop.apns:apns:0.2.3'
//		compile(group: 'net.sf.json-lib', name: 'json-lib', version: '2.4', classifier: 'jdk15')
//		runtime 'net.sf.ezmorph:ezmorph:1.0.6'
//		compile 'com.netease.security:xssdefender:1.3.6'
//		compile 'org.freemarker:freemarker:2.3.18'
	}

	plugins {
		runtime ":hibernate:$grailsVersion"
//		runtime ":hibernate:3.6.10.1"
		runtime ":jquery:1.7.2"
		runtime ":resources:1.1.6"

		// Uncomment these (or add new ones) to enable additional resources capabilities
		//runtime ":zipped-resources:1.0"
		//runtime ":cached-resources:1.0"
		//runtime ":yui-minify-resources:0.1.4"

		build ":tomcat:$grailsVersion"
//		build ":tomcat:7.0.42"

		runtime ":database-migration:1.1"

		compile ":cache:1.0.0"

//		test ":spock:0.7-SNAPSHOT"

//		test "org.spockframework:spock-core:0.7-groovy-2.0-SNAPSHOT"

		compile ":freemarker:1.0.1-SNAPSHOT"

		compile ":searchable:0.6.4"

//		compile ":cachefilter:0.5"

//		compile ":redis-gorm:1.0.0.M8"

//		compile ":atmosphere:0.4.2.4"

//        runtime ":viaboxx-dbmigrate:1.3.3"

//        runtime ":freemarker-tags:0.7.2"

	}
}

//if (Environment.current != Environment.DEVELOPMENT) {
//	grails.tomcat.jvmArgs = ["-server", "-XX:MaxPermSize=512m", "-XX:MaxNewSize=256m", "-XX:NewSize=256m",
//			"-Xms768m", "-Xmx1536m", "-XX:SurvivorRatio=128", "-XX:MaxTenuringThreshold=0",
//			"-XX:+UseTLAB", "-XX:+UseConcMarkSweepGC", "-XX:+CMSClassUnloadingEnabled",
//			"-XX:+CMSIncrementalMode", "-XX:-UseGCOverheadLimit", "-XX:+ExplicitGCInvokesConcurrent"]
//}

//grails.project.dependency.resolver = "maven"