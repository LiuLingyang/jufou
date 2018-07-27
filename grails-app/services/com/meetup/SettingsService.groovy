package com.meetup

import org.springframework.transaction.annotation.Transactional

@Transactional
class SettingsService extends AbstractService {

	def groupService

	def attendanceService

	@Transactional(readOnly = true)
	def getSettings(agent, userId, groupId) {
		def callable = {
			if (groupId > 0L && agent == Const.USER_AGENT_PC) {
				attendance {
					group {
						eq("id", groupId)
					}
					attendee {
						eq("id", userId)
					}
				}
			} else {
				user {
					eq("id", userId)
				}
			}
		}
		return agent == Const.USER_AGENT_PC ?
			PSettings.createCriteria().get(callable) :
			MSettings.createCriteria().get(callable)
	}

	def updateSettings(agent, userId, groupId, params) {
		Settings settings = this.getSettings(agent, userId, groupId)
		if (!settings) {
			settings = agent == Const.USER_AGENT_PC ?
				new PSettings() : new MSettings()
			if (groupId > 0L && agent == Const.USER_AGENT_PC) {
				settings.meetingUpdate = true
				settings.meetingJoin = true
				settings.attendance = this.attendanceService.
						getGroupAttendance(groupId, userId)
			} else {
				settings.user = User.findById(userId)
			}
		}
		AppUtil.merge(settings, params)
		settings.save()
		return settings
	}

}
