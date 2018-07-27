package com.meetup

import grails.converters.JSON
import grails.gorm.DetachedCriteria
import grails.validation.ValidationException
import org.codehaus.groovy.grails.plugins.DomainClassGrailsPlugin
import org.codehaus.groovy.grails.web.json.JSONObject
import org.hibernate.criterion.Order
import org.springframework.transaction.annotation.Transactional

import javax.annotation.Resource

abstract class AbstractService {

	@Resource
	def sessionFactory

	@Resource
	def hdfsService

	@Resource
	def grailsApplication

	@Resource
	def configService

	def propertyInstanceMap = DomainClassGrailsPlugin.PROPERTY_INSTANCE_MAP

	private _getTraceInfo(exception) {
		StringBuffer sb = new StringBuffer()
		StackTraceElement[] stacks = exception.getStackTrace()
		sb.append("class: ").append(stacks[1].getClassName()).append("; method: ").
				append(stacks[1].getMethodName()).append("; number: ").
				append(stacks[1].getLineNumber())
		return sb.toString()
	}

	protected _throwErrors(model) {
//		model.errors.allErrors.each {
//			println it
//		}
		String message = this._getTraceInfo(new Exception())
		throw new ValidationException(message, model.errors)
	}

	protected _cleanUpGorm() {
		def session = this.sessionFactory.currentSession
		session.flush()
		session.clear()
		propertyInstanceMap.get().clear()
	}

	protected _criteriaArgs(offset, limit, sort, order) {
		def args = [:]
		if (offset && offset.toInteger() > 0) {
			args.offset = offset.toInteger()
		}
		if (limit && limit.toInteger() > 0) {
			args.max = limit.toInteger()
		}
		if (sort) {
			args.sort = sort
		}
		if (order) {
			args.order = order
		}
		return args
	}

	private _hdfsContextPath(filesuffix, filename) {
		if (Const.INSTALL_FILE_TYPES.contains(filesuffix)) {
			return this.hdfsService.getAppContextPath()
		}
		if (Const.IMAGE_TYPES.contains(filesuffix) &&
				filename.toString().endsWith(Const.IMAGE_THUMBNAIL_SUFFIX)) {
			return this.hdfsService.getThumbnailContextPath()
		}
		return this.hdfsService.getContextPath()
	}

	private _path(path, name, suffix, local = false) {
		path += (path.endsWith("/") ? "" : "/")
		if (this.hdfsService.isWindows() || local) {
			path += name + "@" + System.currentTimeMillis() + "." + suffix
		} else {
			path += (name + "@" + System.currentTimeMillis()).
					encodeAsMD5() + suffix
		}
		return path
	}

	protected _upload(file, request, root, path, name,
					  size = null, local = false) {
		String filename = file.originalFilename
		String filesuffix = filename.substring(
				filename.lastIndexOf(".")).toLowerCase()
		path = root + "/" + path
		path = this._path(path, name, filesuffix.substring(1), local)
		this.hdfsService.upload(file, path, request, size, local)
		return (local ? "" : this._hdfsContextPath(filesuffix.substring(1),
				name)) + path
	}

	protected _parseUrl(rawUrl) {
		String url = this.hdfsService.parseUrl(rawUrl)
		String name = url.substring(url.lastIndexOf("/") + 1)
		int index = name.lastIndexOf(".")
		String filename = name.substring(0, index > 0 ? name.indexOf("@") : 32)
		String filesuffix = name.substring(index > 0 ? index + 1 : 32)
		return [url, filename, filesuffix]
	}

	protected _clip(rawUrl, request, sizes, pos) {
		String[] items = this._parseUrl(rawUrl)
		String bigUrl = this._doClip(items[0], request, items[1] +
				Const.IMAGE_ORIGINAL_SUFFIX, items[2], sizes[0], pos)
//		String smallUrl = this._doClip(url, request, filename +
//				Const.IMAGE_THUMBNAIL_SUFFIX, filesuffix, sizes[1], pos)
		String smallUrl = this._doClip(bigUrl, request, items[1] +
				Const.IMAGE_THUMBNAIL_SUFFIX, items[2], sizes[1])
		return [this.hdfsService.contextPath + bigUrl,
				this.hdfsService.thumbnailContextPath + smallUrl]
	}

	protected _doClip(url, request, name, suffix, size, pos = null) {
		InputStream is = this.hdfsService.download(url, request)
		url = url.substring(0, url.lastIndexOf("/"))
		String path = this._path(url, name, suffix)
		this.hdfsService.clip(is, path, request, suffix, size, pos)
		return path
	}

	@Transactional(readOnly = true)
	def count(DetachedCriteria criteria) {
		return criteria.count()
	}

	@Transactional(readOnly = true)
	def list(DetachedCriteria criteria, offset = null,
			 limit = null, sort = null, order = null) {
		def args = this._criteriaArgs(offset, limit, sort, order)
		return criteria.list(args)
	}

	private _buildDistanceCriteria(criteria, offset, limit, sort, order) {
		if (offset && offset.toInteger() > 0) {
			criteria.setFirstResult(offset.toInteger())
		}
		if (limit && limit.toInteger() > 0) {
			criteria.setMaxResults(limit.toInteger())
		}
		criteria.addOrder(OrderBySqlFormula.sqlFormula(sort + " " +
				(order ? order : "asc")))
		this.configService.getSortProperties("distance")?.each { prop ->
			criteria.addOrder(new Order(prop, true))
		}
	}

	private _buildHotCriteria(criteria, offset, limit, sort, order) {
		if (offset && offset.toInteger() > 0) {
			criteria.setFirstResult(offset.toInteger())
		}
		if (limit && limit.toInteger() > 0) {
			criteria.setMaxResults(limit.toInteger())
		}
		boolean ascending = order ? order == "asc" : false
		this.configService.getSortProperties("hot")?.each { prop ->
			criteria.addOrder(new Order(prop,
					prop == "createTime" ? true : ascending))
		}
	}

	private _buildMemberCountCriteria(criteria, offset, limit, sort, order) {
		if (offset && offset.toInteger() > 0) {
			criteria.setFirstResult(offset.toInteger())
		}
		if (limit && limit.toInteger() > 0) {
			criteria.setMaxResults(limit.toInteger())
		}
		boolean ascending = order ? order == "asc" : false
		this.configService.getSortProperties("memberCount")?.each { prop ->
			criteria.addOrder(new Order(prop,
					prop == "createTime" ? true : ascending))
		}
	}

	private _buildTopCriteria(criteria, offset, limit, sort, order) {
		if (offset && offset.toInteger() > 0) {
			criteria.setFirstResult(offset.toInteger())
		}
		if (limit && limit.toInteger() > 0) {
			criteria.setMaxResults(limit.toInteger())
		}
		this.configService.getSortProperties("top")?.each { prop ->
			criteria.addOrder(new Order(prop,
					prop == "startTime" ? true : false))
		}
	}

	protected _buildCriteria(criteria, offset, limit, sort, order) {
		if (sort == "distance") {
			this._buildDistanceCriteria(criteria, offset, limit, sort, order)
		}
		if (sort == "hot") {
			this._buildHotCriteria(criteria, offset, limit, sort, order)
		}
		if (sort == "memberCount") {
			this._buildMemberCountCriteria(criteria, offset, limit, sort, order)
		}
		if (sort == "top") {
			this._buildTopCriteria(criteria, offset, limit, sort, order)
		}
	}

	protected _clipCover(targetId, params, request) {
		if (!params.cover_src || !params.cover_clip) {
			return null
		}
		JSONObject pos = JSON.parse(params.cover_clip)
		String[] items = this._parseUrl(params.cover_src)
		String cover = this.hdfsService.thumbnailContextPath + this._doClip(
				items[0], request, items[1], items[2], this.grailsApplication.config.
				app.meeting.cover, [pos.get("left"), pos.get("top"),
				pos.get("width"), pos.get("height")].toArray(new Integer[0]))
		def target = this._updateTarget(targetId, [cover: cover])
		this.hdfsService.delete(items[0], request)
		return target
	}

	protected _updateTarget(targetId, params) {
		return null
	}

}
