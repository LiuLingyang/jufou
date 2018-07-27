package com.meetup

import org.apache.commons.lang.StringUtils

import javax.servlet.http.Cookie
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

class CookieUtil {

	private static String HTTP_ONLY_COOKIE_TEMPLATE = '%1$s=%2$s;Domain=%3$s;Path=%4$s;HttpOnly';
	private static final String PARAMETER_COOKIE_SEPARATOR = ";";

	public static String getCookieValue(HttpServletRequest req, String key) {
		Cookie cookie = CookieUtil.getCookie(req, key);
		if (cookie == null) {
			return null;
		}
		return cookie.getValue();
	}

	public static Cookie getCookie(HttpServletRequest req, String key) {
		Cookie[] cookies = req.getCookies();
		if (cookies == null) {
			return null;
		}
		for (Cookie ck : cookies) {
			if (key.equals(ck.getName())) {
				return ck;
			}
		}
		return null;
	}

	public static Cookie makeCookieExpire(String key, String value,
										  String domain) {
		return makeCookie(key, value, domain, 0);
	}

	public static Cookie makeCookie(String key, String value, String domain,
									int maxAge, boolean httpOnly = true,
									boolean secure = false) {
		Cookie ck = new Cookie(key, value);
//		ck.setDomain(!domain ? Const.DOMAIN : domain);
		ck.setMaxAge(maxAge);
		ck.setPath("/");
		ck.setSecure(secure);
		if (httpOnly) {
			ck.setHttpOnly(true);
		}
		return ck;
	}

	public static void addHttpOnlyCookie(String key, String value,
										 String domain, HttpServletResponse response) {
		response.containsHeader("SET-COOKIE");    //貌似非得加这么一行才能把header set进去
		response.setHeader("SET-COOKIE", String.format(
				HTTP_ONLY_COOKIE_TEMPLATE, key, value, domain, "/"));
	}

	public static String getParameterCookie(String key, String cookieStr) {
		if (StringUtils.isBlank(cookieStr)) {
			return null;
		}
		String[] cs = cookieStr.split(PARAMETER_COOKIE_SEPARATOR);
		for (String c : cs) {
			if (c.startsWith(key)) {
				return c.substring(key.length() + 1);
			}
		}
		return null;
	}

	public static String appendCookie(String cookieStr, String name, String value) {
		StringBuilder sb = new StringBuilder(cookieStr == null ? "" : cookieStr);
		if (sb.length() > 0)
			sb.append(PARAMETER_COOKIE_SEPARATOR);
		sb.append(name);
		sb.append("=");
		sb.append(value);
		return sb.toString();
	}

}
