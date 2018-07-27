package com.meetup

import java.text.SimpleDateFormat

/**
 * Created with IntelliJ IDEA.
 * User: zjulyy
 * Date: 13-6-30
 * Time: 下午1:51
 * To change this template use File | Settings | File Templates.
 */
class BrowserCache {

	static final int BROWSER_CACHE_EXPIRE_DATE = AppUtil.grailsApplication.
			config.app.browser.cache.expire.date.toInteger()

	private static final String EXPIRATION_DATE

	static {
		Calendar expiration = Calendar.getInstance()
		expiration.roll(Calendar.YEAR, -1)
		SimpleDateFormat dateFormat = new SimpleDateFormat(
				"EEE, dd MMM yyyy HH:mm:ss z", java.util.Locale.US)
		dateFormat.setTimeZone(TimeZone.getTimeZone("GMT"))
		EXPIRATION_DATE = dateFormat.format(expiration.getTime())
	}

	private static String _formatGMT(time) {
		SimpleDateFormat dateFormat = new SimpleDateFormat(
				"EEE, dd MMM yyyy HH:mm:ss z", java.util.Locale.US)
		dateFormat.setTimeZone(TimeZone.getTimeZone("GMT"))
		return dateFormat.format(time)
	}

	private static String _getExpiredTime(cache) {
		if (!cache) {
			return EXPIRATION_DATE
		}
		Calendar expiration = Calendar.getInstance()
		expiration.add(Calendar.DATE, BROWSER_CACHE_EXPIRE_DATE)
		return _formatGMT(expiration.getTime())
	}

	public static void setBrowserCachingPolicy(request, response,
											   cache, lastModified = false) {
		if (cache) {
			response.addHeader("Cache-Control", "max-age=" +
					BROWSER_CACHE_EXPIRE_DATE * Const.TIME_DAY / 1000
					+ ", public")
			if (lastModified) {
				File file = new File(request.getRealPath(request.getRequestURI()))
				if (file.isFile() && file.exists()) {
					response.addHeader("Last-Modified", _formatGMT(file.lastModified()))
				}
			}
		} else {
			// HTTP/1.1 + IE extensions
			response.addHeader("Cache-Control", "private, no-store, no-cache, "
					+ "must-revalidate, post-check=0, pre-check=0")
			// HTTP/1.0
			response.addHeader("Pragma", "no-cache")
		}
		// Last resort for those that ignore all of the above
		response.addHeader("Expires", _getExpiredTime(cache))
	}

}
