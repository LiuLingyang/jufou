package com.meetup

import org.codehaus.groovy.grails.commons.ControllerArtefactHandler

import javax.annotation.Resource
import java.lang.reflect.Modifier

class AppUtil {

	static reserved

	static grailsApplication

	@Resource
	public void setGrailsApplication(grailsApplication) {
		AppUtil.grailsApplication = grailsApplication
	}

	public void setReserved(reserved) {
//		new Group().domainClass.grailsApplication.getArtefacts(
		AppUtil.reserved = reserved + TypeUtil.getArtefacts(
				ControllerArtefactHandler.TYPE).findAll {
			!Modifier.isAbstract(it.clazz.getModifiers()) &&
					AbstractController.class.isAssignableFrom(it.clazz)
		}*.name*.toLowerCase()
	}

	public void init() {
		Const.CACHE_EXPIRE_TIME = Eval.me(
				AppUtil.grailsApplication.config.app.cache.expireTime)
		Const.PHOTO_MAX_SIZE = Eval.me(
				AppUtil.grailsApplication.config.app.photo.maxSize)
		Const.IMAGE_TYPES = AppUtil.grailsApplication.config.
				app.image.types.split(";").toList()
		Const.INSTALL_FILE_TYPES = AppUtil.grailsApplication.config.
				app.install.file.types.split(";").toList()
		Const.DOMAIN = AppUtil.grailsApplication.config.app.server.domain
		Const.URL_ROOT = "http://" + Const.DOMAIN + "/"
		String appName = AppUtil.grailsApplication.metadata['app.name']
		Const.CONTEXT_PATH = appName == "/" ? "" : appName
//		Const.CUSTOM_GROUP_TAG = AppUtil.grailsApplication.config.app.custom.group.tag
		Const.GROUP_CATEGORIES = AppUtil.encodeAsGBK(AppUtil.grailsApplication.config.
				app.group.categories).split(";")?.toList()
		Const.MOBILE_GROUP_MENUS = AppUtil.encodeAsGBK(AppUtil.grailsApplication.config.
				app.mobile.group.menus).split(";")?.toList()
	}

	public static boolean isValidHomepage(String homepage) {
		return !reserved.contains(homepage) &&
				homepage ==~ /^[0-9a-zA-Z][\w-]{5,}[0-9a-zA-Z]$/
	}

	public static boolean isShortLink(String stub) {
		return stub && !reserved.contains(stub) && stub ==~ /^[0-9A-Z]{4}$/
	}

	public static String transAction(String action) {
		if (action.indexOf("_") < 0) {
			return action
		}
		boolean flag = false
		StringBuffer sb = new StringBuffer()
		for (int i = 0; i < action.length(); i++) {
			char c = action.charAt(i)
			if (c == '_') {
				flag = true
				i++
			} else {
				if (flag) {
					c = c.toUpperCase()
					flag = false
				}
				sb.append(c)
			}
		}
		return sb.toString()
	}

	public static void merge(model, params) {
		params.each { key, value ->
			if (model.properties.containsKey(key)) {
				def mProperty = model.properties.get(key)
				if (mProperty instanceof Boolean) {
					value = value instanceof Boolean ? value : value.toInteger() > 0
				} else if (mProperty instanceof Integer) {
					value = value instanceof Integer ? value : value.toInteger()
				} else if (mProperty instanceof Long) {
					value = value instanceof Long ? value : value.toLong()
				} else if (mProperty instanceof Double) {
					value = value instanceof Double ? value : value.toDouble()
				}
				model.properties[key] = value
			}
//			if (model.metaClass.hasProperty(model, key)) {
//				def mProperty = model.metaClass.getProperty(model, key)
//				if (mProperty instanceof Boolean) {
//					value = value instanceof Boolean ? value : value.toInteger() > 0
//				} else if (mProperty instanceof Integer) {
//					value = value instanceof Integer ? value : value.toInteger()
//				} else if (mProperty instanceof Long) {
//					value = value instanceof Long ? value : value.toLong()
//				} else if (mProperty instanceof Double) {
//					value = value instanceof Double ? value : value.toDouble()
//				}
//				model.metaClass.setProperty(model, key, value)
//			}
		}
	}

	public static String baseUrl() {
		String url = Const.URL_ROOT + Const.CONTEXT_PATH
		if (url.endsWith("/")) {
			url = url.substring(0, url.length() - 1)
		}
		return url
	}

	public static String buildActivateUrl(token) {
		return String.format(grailsApplication.config.
				app.user.activate.url, baseUrl(), token)
	}

	public static String buildRetrieveUrl(token) {
		return String.format(grailsApplication.config.
				app.user.retrieve.url, baseUrl(), token)
	}

	public static String buildInviteUrl(token) {
		return String.format(grailsApplication.config.
				app.user.invite.url, baseUrl(), token)
	}

	public static boolean isPrimitiveClass(Class clz) {
		try {
			return clz.isPrimitive() ||
					clz.getField("TYPE").get(null).isPrimitive()
		} catch (Exception ex) {
			return false
		}
	}

	public static String encodeAsGBK(String str) {
		return new String(str.getBytes("iso-8859-1"), "gb2312")
	}

	public static String encodeAsUTF8(String str) {
		return new String(str.getBytes("iso-8859-1"), Const.DEFAULT_ENCODING)
	}

	public static int length(String str) {
		int length = 0
		for (int i = 0; i < str.length(); i++) {
			// [u4e00-u9fa5]+
			if (str.getAt(i) ==~ /[^x00-xff]+/) {
				length += 2
			} else {
				length++
			}
		}
		return length
	}

	public static String buildRequestUrl(controller, action,
										 params, domain = false) {
		String url = (domain ? Const.URL_ROOT : "/") + controller + "/" + action
		int i = 0
		params?.each { k, v ->
			url += i++ == 0 ? "?" : "&"
			url += k + "=" + URLEncoder.encode(v.toString(), Const.DEFAULT_ENCODING)
		}
		return url
	}

	public static File retrieveFileInWebApp(String filePath){
		if (AppUtil.grailsApplication.isWarDeployed()){
			def appContext = AppUtil.grailsApplication.parentContext
			return appContext.getResource(filePath)?.getFile()
		} else {
			return new File("web-app" + filePath)
		}
	}

}
