package com.meetup

import org.springframework.transaction.annotation.Transactional

@Transactional
class UpdateService extends AbstractService {

	def saveUpdate(update) {
		update.save()
	}

	def createUpdate(update, file, request, path) {
		if (!update.type) {
			update.type = Const.GENERAL_RELEASE
		}
		update.save()
		if (file) {
			update.url = this._upload(file, request, path, update.client + "/"
					+ update.type, update.release)
			update.size = file.size
			update.save()
		}
		return update
	}

	@Transactional(readOnly = true)
	def getUpdate(String client, String type, String release) {
		return Update.findByClientAndTypeAndRelease(client, type, release)
	}

	@Transactional(readOnly = true)
	def getNextUpdate(String client, String type = Const.GENERAL_RELEASE,
					  String current = null) {
//		Update update = this.getUpdate(client, type, current)
		def updates = Update.createCriteria().list(
				sort: "release", order: "desc", max: "1") {
			eq("client", client)
			eq("type", type)
			if (current) {
				gt("release", current)
			}
		}
		return updates?.size() > 0 ? updates[0] : null
	}

	def updateUpdate(updateId, request, params, file, path) {
		Update update = Update.lock(updateId)
		if (file) {
			if (update.url) {
				this.hdfsService.delete(update.url, request)
			}
			params.url = this._upload(file, request, path,
					update.client + "/" + update.type, update.release)
			params.size = file.size
			params.releaseTime = System.currentTimeMillis()
		}
		AppUtil.merge(update, params)
		update.save()
		return update
	}

	def deleteUpdate(updateId, request) {
		Update update = Update.lock(updateId)
		String url = update.url
		update.delete()
		this.hdfsService.delete(url, request)
		return update
	}

}
