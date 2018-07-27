package com.meetup

import org.codehaus.groovy.grails.commons.DomainClassArtefactHandler

import java.lang.reflect.Modifier

class CustomObjectMarshaller {

//	def grailsApplication

//	private Map<String, List<String>> _domainExcludes = null

	def commonExcludes = null

	def domainExcludes = null

	def mobileIncludes = null

	def domainList = null

//	public void setGrailsApplication(grailsApplication) {
//		this.grailsApplication = grailsApplication
//	}

	public void setCommonExcludes(commonExcludes) {
		this.commonExcludes = commonExcludes
	}

	public void setDomainExcludes(domainExcludes) {
		this.domainExcludes = domainExcludes
	}

	public void setMobileIncludes(def mobileIncludes) {
		this.mobileIncludes = mobileIncludes
	}

//	public void init() {
//		this._domainExcludes.each { k, v ->
//			String key = k.charAt(1).isUpperCase() ? k : StringUtils.uncapitalize(k)
//			Class clazz = this.grailsApplication.getArtefactByLogicalPropertyName(
//					DomainClassArtefactHandler.TYPE, key).clazz
//			this.domainExcludes.put(clazz, v)
//		}
//	}

	public void marshalObject(Map result, Object o) {
		if (!o) {
			return
		}
		result.id = o.id
		String className = o.getClass().getSimpleName()
		int index = className.indexOf("_\$\$_")
		className = index > 0 ? className.substring(0, index) : className
		Refer refer = o.properties["refer"]
		String ua = refer?.ua
		if (ua == Const.USER_AGENT_MOBILE) {
			String hostClassName = refer?.host
			def includes = this.mobileIncludes[(hostClassName ?
					hostClassName + "_" : "") + className]
			if (includes) {
				o.properties.keySet().findAll { k ->
					includes.contains(k)
				}?.each { k ->
					def v = o.properties[k]
					if (v) {
						result[k] = v
					}
				}
				return
			}
		}
		def excludes = this.commonExcludes + this.domainExcludes[className]
		o.properties.keySet().findAll { k ->
			!excludes.contains(k)
		}?.each { k ->
			def v = o.properties[k]
//			if ((ua != Const.USER_AGENT_MOBILE || v) &&
//					(className != GTag.class.getSimpleName() ||
//							!v.startsWith(Const.CUSTOM_GROUP_TAG))) {
			if (ua != Const.USER_AGENT_MOBILE || v) {
				result[k] = v
			}
		}
	}

//	public List marshalMobile(List result, String className = null) {
//		if (!result || result.size() == 0) {
//			return result
//		}
//		return result.collect { o ->
//			this.marshalMobile(o, className)
//		}
//	}
//
//	public Map marshalMobile(Map result) {
//		if (!result || result.size() == 0) {
//			return result
//		}
//		return result.collectEntries { k, v ->
//			["${k}": this.marshalMobile(v)]
//		}
//	}
//
//	private String _subClassName(String className, String key) {
////		String subClass = null
////		if (o.metaClass) {
////			def value = o.metaClass.getProperty(o, key)
////			if (value instanceof Collection) {
////				subClass = !value || value.size() == 0 ? null :
////					value[0].getClass().getSimpleName()
////			} else {
////				subClass = value.getClass().getSimpleName()
////			}
////		} else {
//		int index = className.lastIndexOf("_")
//		String subClass = index < 0 ? className : className.substring(index + 1)
//		subClass = subClass.charAt(1).isUpperCase() ? subClass : StringUtils.uncapitalize(subClass)
//		Class clazz = TypeUtil.getArtefactClass(DomainClassArtefactHandler.TYPE, subClass)
//		subClass = TypeUtil.getGenericType(clazz.getDeclaredField(key)).getSimpleName()
////		}
//		return className + "_" + subClass
//	}
//
//	public Object marshalMobile(Object o, String className = null) {
//		if (!o || AppUtil.isPrimitiveClass(o.getClass())) {
//			return o
//		}
//		if (!className) {
//			className = o.getClass().getSimpleName()
//		}
//		def includes = this.mobileIncludes[className]
//		def json = o instanceof JSONObject ? o : JSON.parse((o as JSON).toString())
//		return json?.findAll { k, v ->
//			(!includes || includes.contains(k)) && v != null && v != JSONObject.NULL
//		}?.collectEntries { k, v ->
//			if (v instanceof JSONElement) {
////				className += "_" + o.metaClass.getProperty(o, k).
////						getClass().getSimpleName()
//				String subClassName = this._subClassName(className, k)
//				["${k}": this.marshalMobile(v, subClassName)]
////			} else if (v instanceof JSONArray) {
////				def value = o.metaClass.getProperty(o, k)
////				String subClassName = !value || value.size() == 0 ? null :
////					className + "_" + value[0].getClass().getSimpleName()
////				String subClassName = this._subClassName(className, k)
////				["${k}": this.marshalMobile(v, subClassName)]
//			} else {
//				["${k}": v]
//			}
//		}
//	}

	public List marshalUserAgent(List result, String ua, String hostClassName = null) {
		if (ua == Const.USER_AGENT_PC || !result || result.size() == 0) {
			return result
		}
		result.each { o ->
			this.marshalUserAgent(o, ua, hostClassName)
		}
		return result
	}

	public Map marshalUserAgent(Map result, String ua) {
		if (ua == Const.USER_AGENT_PC || !result || result.size() == 0) {
			return result
		}
		result.values().each { v ->
			this.marshalUserAgent(v, ua)
		}
		return result
	}

	public Object marshalUserAgent(Object o, String ua, String hostClassName = null) {
		if (!this.domainList) {
			this.domainList = TypeUtil.getArtefacts(DomainClassArtefactHandler.TYPE).grep {
				!Modifier.isAbstract(it.clazz.getModifiers())
			}*.name
		}
		if (ua == Const.USER_AGENT_PC || !o || AppUtil.isPrimitiveClass(o.getClass())) {
			return o
		}
		String className = o.getClass().getSimpleName()
		if (!this.domainList.contains(className)) {
			return
		}
//		if (o.properties.containsKey("refer")) {
//			o.properties["refer"] = new Refer(ua: ua, host: hostClassName)
//		}
		className = (hostClassName ? hostClassName + "_" : "") + className
		def includes = this.mobileIncludes[className]
		if (!includes) {
			return
		}
		o.getClass().metaClass.refer = null
		o.refer = new Refer(ua: ua, host: hostClassName)
		o.properties.keySet().findAll { k ->
			includes.contains(k)
		}?.each { k ->
//			if (!className.endsWith(GTag.class.getSimpleName()) ||
//					!v.startsWith(Const.CUSTOM_GROUP_TAG)) {
			this.marshalUserAgent(o.properties[k], ua, className)
//			}
		}
		return o
	}

}