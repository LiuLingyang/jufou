dataSource {
	pooled = true
	driverClassName = "org.h2.Driver"
	username = "sa"
	password = ""
}
hibernate {
	cache.use_second_level_cache = true
	cache.use_query_cache = true
	cache.region.factory_class = 'net.sf.ehcache.hibernate.EhCacheRegionFactory'
}
// environment specific settings
environments {
	development {
		dataSource {
            dbCreate = "create-drop" // one of 'create', 'create-drop', 'update', 'validate', ''
            url = "jdbc:h2:mem:devDb;MVCC=TRUE;LOCK_TIMEOUT=10000"
// update user set role=100 where id=1
//			dbCreate = "update"
//			url = "jdbc:h2:file:F:/Projects/Meetup/web/h2/devDb;MVCC=TRUE;LOCK_TIMEOUT=10000"
//			logSql = true
//			formatSql = true
		}
	}
	test {
		dataSource {
			dbCreate = "update"
			url = "jdbc:h2:file:/mnt/data/h2/testDb;MVCC=TRUE;LOCK_TIMEOUT=10000"
		}
	}
	production {
//		dataSource {
//			dbCreate = "update"
//			url = "jdbc:h2:prodDb;MVCC=TRUE;LOCK_TIMEOUT=10000"
//			pooled = true
//			properties {
//				maxActive = -1
//				minEvictableIdleTimeMillis = 1800000
//				timeBetweenEvictionRunsMillis = 1800000
//				numTestsPerEvictionRun = 3
//				testOnBorrow = true
//				testWhileIdle = true
//				testOnReturn = true
//				validationQuery = "SELECT 1"
//			}
//		}
		dataSource {
			pooled = true
			driverClassName = "com.mysql.jdbc.Driver"
			dialect = org.hibernate.dialect.MySQL5InnoDBDialect
			username = "root"
			password = "1qazxsw2"
			dbCreate = "update"
			url = "jdbc:mysql://localhost:3306/meetup"
			properties {
				maxActive = 100
				maxIdle = 50
				minIdle = 10
				initialSize = 10
				minEvictableIdleTimeMillis = 60000
				timeBetweenEvictionRunsMillis = 60000
				maxWait = 10000
				validationQuery = "/* ping */"
			}
		}
	}
}
