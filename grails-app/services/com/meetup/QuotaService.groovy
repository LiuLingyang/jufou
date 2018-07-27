package com.meetup

import org.springframework.transaction.annotation.Transactional

class QuotaService extends AbstractService {

	def photoService

	def groupService

	@Transactional(readOnly = true)
	def getGroupQuota(quotaId) {
		return GQuota.findById(quotaId)
	}

	@Transactional(readOnly = true)
	def getUserQuota(quotaId) {
		return UQuota.findById(quotaId)
	}

	@Transactional
	def saveQuota(quota) {
		quota.save()
	}

	@Transactional
	def updateGroupQuota(quotaId, params) {
		GQuota quota = GQuota.lock(quotaId)
		AppUtil.merge(quota, params)
		quota.save()
		return quota
	}

	@Transactional
	def updateUserQuota(quotaId, params) {
		UQuota quota = UQuota.lock(quotaId)
		AppUtil.merge(quota, params)
		quota.save()
		return quota
	}

	@Transactional
	def updateSmsUsed(quotaId, count) {
		GQuota quota = GQuota.lock(quotaId)
		quota.smsUsed += count
		quota.save()
		return quota
	}

	@Transactional
	def updatePhotoUploaded(quotaId, count) {
		GQuota quota = GQuota.lock(quotaId)
		quota.photoUploaded += count
		quota.save()
		return quota
	}

	@Transactional
	def updateGroupCreated(quotaId, count) {
		UQuota quota = UQuota.lock(quotaId)
		quota.groupCreated += count
		quota.save()
		return quota
	}

	def revisePhotoUploaded() {
		int total = 0
		GQuota.list().each { item ->
			int count = this.photoService.countPhotos({
				album {
					group {
						eq("id", item.groupId)
					}
				}
			})
			if (item.photoUploaded != count) {
				log.error("revise photoUploaded of Quota " + item.id + " of Group "
						+ item.groupId + ", from " + item.photoUploaded + " to "
						+ count)
				GQuota.withTransaction { status ->
					try {
						if (!item.isAttached()) {
							item.attach()
						}
						item.photoUploaded = count
						this.saveQuota(item)
					} catch (Exception ex) {
						ex.printStackTrace()
						status.setRollbackOnly()
					}
				}
				total++
			}
		}
		return total
	}

	def reviseGroupCreated() {
		int total = 0
		UQuota.list().each { item ->
			int count = this.groupService.countGroups({
				owner {
					eq("id", item.userId)
				}
				eq("state", Const.STATE_NORMAL)
			})
			if (item.groupCreated != count) {
				log.error("revise groupCreated of Quota " + item.id + " of User "
						+ item.userId + ", from " + item.groupCreated + " to "
						+ count)
				UQuota.withTransaction { status ->
					try {
						if (!item.isAttached()) {
							item.attach()
						}
						item.groupCreated = count
						this.saveQuota(item)
					} catch (Exception ex) {
						ex.printStackTrace()
						status.setRollbackOnly()
					}
				}
				total++
			}
		}
		return total
	}

}
