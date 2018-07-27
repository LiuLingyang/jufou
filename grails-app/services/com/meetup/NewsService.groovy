package com.meetup

import org.springframework.transaction.annotation.Transactional

@Transactional
class NewsService extends AbstractService {

	def updateNews(newsId, params) {
		News news = News.lock(newsId)
		AppUtil.merge(news, params)
		news.save()
		return news
	}

	def updateNews(newsId, params, request) {
		News news = this.updateNews(newsId, params)
		this._clipCover(newsId, params, request)
		return news
	}

	protected _updateTarget(targetId, params) {
		return this.updateNews(targetId, params)
	}

	def createShare(news, params, request) {
		news.save()
		this._clipCover(news.id, params, request)
	}

	@Transactional(readOnly = true)
	def listNews(groupId, offset = null,
				 limit = null, sort = "createTime", order = "desc") {
		def args = this._criteriaArgs(offset, limit, sort, order)
		return News.createCriteria().list(args) {
			group {
				eq("id", groupId)
			}
		}
	}

	@Transactional(readOnly = true)
	def countNews(groupId) {
		return News.createCriteria().count {
			group {
				eq("id", groupId)
			}
		}
	}

	@Transactional(readOnly = true)
	def getNews(newsId) {
		return News.findById(newsId)
	}

	def deleteNews(newsId, request) {
		News news = News.findById(newsId)
		if (!news) {
			return null
		}
		news.delete()
		if (news.cover) {
			this.hdfsService.delete(news.cover, request)
		}
		return news
	}

}
