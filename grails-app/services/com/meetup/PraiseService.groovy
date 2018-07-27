package com.meetup

import org.springframework.transaction.annotation.Transactional

@Transactional
class PraiseService extends AbstractService {

	def groupService

	def userService

	def praize(groupId, userId, add) {
		Group group = this.groupService.getGroup(groupId)
		User user = this.userService.getUser(userId)
		Praise praise = Praise.findByGroupAndFavorer(group, user)
		if (add) {
			if (!praise) {
				new Praise(group: group, favorer: user).save()
				group = this.groupService.updatePraiseCount(groupId, 1)
			} else {
				return [false, group.praiseCount]
			}
		} else {
			if (praise) {
				praise.delete()
				group = this.groupService.updatePraiseCount(groupId, -1)
			} else {
				return [false, group.praiseCount]
			}
		}
		return [true, group.praiseCount]
	}

	@Transactional(readOnly = true)
	def countPraises(groupId) {
		Group group = this.groupService.getGroup(groupId)
		return Praise.countByGroup(group)
	}

	@Transactional(readOnly = true)
	def getPraise(groupId, userId) {
		return Praise.createCriteria().get {
			group {
				eq("id", groupId)
			}
			favorer {
				eq("id", userId)
			}
		}
	}

}
