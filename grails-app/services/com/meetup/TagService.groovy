package com.meetup

import org.apache.commons.lang.StringUtils
import org.springframework.transaction.annotation.Transactional

@Transactional
class TagService extends AbstractService {

	def groupService

	def meetingService

	@Transactional(readOnly = true)
	def getRecommendGroupTags(groupId) {
		Group group = Group.findById(groupId)
		// 获取类似组织的标签
		def groups = group.moreLikeThis(result: "every", max: 10)
		def tags = groups*.tags?.sort { tag -> tag.id }*.name.unique()
		tags = tags ? tags : []
		// 如果类似组织的标签不够，再获取热门组织的标签补充
		if (tags.size() < 10) {
			tags += this.groupService.listGroups({
				this.configService.getSortProperties("hot")?.each { prop ->
					order(prop, prop == "createTime" ? "asc" : "desc")
				}
			}, 0, 10)*.tags?.sort { tag -> tag.id }*.name
		}
		return tags.unique()
	}

	@Transactional(readOnly = true)
	def getRecommendMeetingTags(meetingId) {
		Meeting meeting = Meeting.findById(meetingId)
		// 获取类似活动的标签
		def meetings = meeting.moreLikeThis(result: "every", max: 10)
		def tags = meetings*.tags?.sort { tag -> tag.id }*.name.unique()
		tags = tags ? tags : []
		// 如果类似活动的标签不够，再获取热门活动的标签补充
		if (tags.size() < 10) {
			tags += this.meetingService.listMeetings(
					null, 0, 10, "joinCount", "desc")*.
					tags?.sort { tag -> tag.id }*.name
		}
		return tags.unique()
	}

	@Transactional(readOnly = true)
	def getTag(name, type) {
		return type == Group.class ? GTag.findByName(name) : MTag.findByName(name)

	}

	@Transactional(readOnly = true)
	def listMeetingTags(meetingIds) {
		return MTag.createCriteria().list {
			meetings {
				inList("id", meetingIds?.size() > 0 ? meetingIds : [0L])
			}
			order("id", "asc")
		}
	}

	@Transactional(readOnly = true)
	def listGroupTags(groupIds) {
		return GTag.createCriteria().list {
			groups {
				inList("id", groupIds?.size() > 0 ? groupIds : [0L])
			}
			order("id", "asc")
		}?.findAll { tag ->
			!tag.name.startsWith(Const.CUSTOM_GROUP_TAG)
		}
	}

	@Transactional(readOnly = true)
	def getGroupCustomTag(groupId) {
		return GTag.createCriteria().list {
			groups {
				eq("id", groupId)
			}
		}?.find { tag ->
			tag.name.startsWith(Const.CUSTOM_GROUP_TAG)
		}?.name?.substring(Const.CUSTOM_GROUP_TAG.length())
	}

	@Transactional(readOnly = true)
	def listTags(callable, type, offset = null,
				 limit = null, sort = null, order = null) {
		def args = this._criteriaArgs(offset, limit, sort, order)
		return type == Group.class ? GTag.createCriteria().list(
				args, callable)?.findAll { tag ->
			!tag.name.startsWith(Const.CUSTOM_GROUP_TAG)
		} : MTag.createCriteria().list(args, callable)
	}

	def saveGroupTags(groupId, nTags) {
		Group group = Group.findById(groupId)
		this.setGroupTags(group, nTags)
		group.save()
		return group.tags?.findAll { tag ->
			!tag.name.startsWith(Const.CUSTOM_GROUP_TAG)
		}?.sort { tag -> tag.id }
	}

	def setGroupCustomTag(group, cTag) {
		def oTags = group.tags?.sort { tag -> tag.id }*.name
		if (!oTags) {
			oTags = []
		}
		def nTags = oTags + cTag
		this.setGroupTags(group, nTags.unique())
	}

	def setGroupTags(group, nTags) {
		def oTags = group.tags?.sort { tag -> tag.id }*.name
		if (!oTags) {
			oTags = []
		}
		def customTags = oTags?.findAll { tag ->
			tag.startsWith(Const.CUSTOM_GROUP_TAG)
		}
		if (!customTags) {
			customTags = []
		}

		def cTags = nTags.grep(oTags)
		(oTags - cTags - customTags).each { item ->
			if (StringUtils.isNotBlank(item)) {
				group.tags.removeAll {
					it.name == item
				}
				GTag tag = GTag.findByName(item)
				tag.groups.removeAll {
					it.id == group.id
				}
				if (tag.groups.size() == 0) {
					tag.delete()
				}
			}
		}
		(nTags - cTags - customTags).each { item ->
			if (StringUtils.isNotBlank(item)) {
				GTag tag = GTag.findByName(item)
				group.addToTags(tag ? tag : new GTag(name: item))
			}
		}
	}

	def setMeetingTags(meeting, nTags) {
		def oTags = meeting.tags?.sort { tag -> tag.id }*.name
		if (!oTags) {
			oTags = []
		}
		def cTags = nTags.grep(oTags)
		(oTags - cTags).each { item ->
			if (StringUtils.isNotBlank(item)) {
				meeting.tags.removeAll {
					it.name == item
				}
				MTag tag = MTag.findByName(item)
				tag.meetings.removeAll {
					it.id == meeting.id
				}
				if (tag.meetings.size() == 0) {
					tag.delete()
				}
			}
		}
		(nTags - cTags).each { item ->
			if (StringUtils.isNotBlank(item)) {
				MTag tag = MTag.findByName(item)
				meeting.addToTags(tag ? tag : new MTag(name: item).save())
			}
		}
	}

}
