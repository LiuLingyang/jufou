package com.meetup

import org.apache.commons.lang.StringUtils

class CacheFilters {

	def dependsOn = [ParamsFilters]

	def configService

	def filters = {

		cache(controller: '*', action: '*') {
			before = {
				def actions = this.configService.getCacheIncludeActions().
						get(StringUtils.capitalize(controllerName))
				boolean cache = actions && actions.contains(actionName)
				BrowserCache.setBrowserCachingPolicy(request, response, cache)
			}
		}

	}

}
