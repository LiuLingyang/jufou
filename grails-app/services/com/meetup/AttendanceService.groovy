package com.meetup

import org.springframework.transaction.annotation.Transactional

class AttendanceService extends AbstractService {

	def messageService

	def voteService

	def groupService

	@Transactional(readOnly = true)
	def countAttendances(callable, type) {
		return type == Group.class ? GAttendance.createCriteria().count(callable)
				: MAttendance.createCriteria().count(callable)
	}

	@Transactional(readOnly = true)
	def listAttendances(callable, type, offset = null,
						limit = null, sort = null, order = null) {
		def args = this._criteriaArgs(offset, limit, sort, order)
		return type == Group.class ? GAttendance.createCriteria().list(args, callable)
				: MAttendance.createCriteria().list(args, callable)
	}

	@Transactional(readOnly = true)
	def getGroupAttendance(groupId, userId) {
		return GAttendance.createCriteria().get {
			group {
				eq("id", groupId)
			}
			attendee {
				eq("id", userId)
			}
		}
	}

	@Transactional(readOnly = true)
	def getGroupAttendanceByStates(groupId, userId, states) {
		return GAttendance.createCriteria().get {
			group {
				eq("id", groupId)
			}
			attendee {
				eq("id", userId)
			}
			inList("state", states)
		}
	}

	@Transactional(readOnly = true)
	def getGroupAttendanceByRoles(groupId, userId, roles) {
		return GAttendance.createCriteria().get {
			group {
				eq("id", groupId)
			}
			attendee {
				eq("id", userId)
			}
			inList("role", roles)
		}
	}

	@Transactional(readOnly = true)
	def getGroupAttendance(callable) {
		return GAttendance.createCriteria().get(callable)
	}

	@Transactional(readOnly = true)
	def getMeetingAttendance(callable) {
		return MAttendance.createCriteria().get(callable)
	}

	@Transactional(readOnly = true)
	def getMeetingAttendance(meetingId, userId) {
		return MAttendance.createCriteria().get {
			meeting {
				eq("id", meetingId)
			}
			attendee {
				eq("id", userId)
			}
		}
	}

	@Transactional(readOnly = true)
	def getMeetingAttendances(meetingIds, userId) {
		return MAttendance.createCriteria().list {
			meeting {
				inList("id", meetingIds?.size() > 0 ? meetingIds : [0L])
			}
			attendee {
				eq("id", userId)
			}
		}
	}

	@Transactional(readOnly = true)
	def getMeetingAttendanceByRoles(meetingId, userId, roles) {
		return MAttendance.createCriteria().get {
			meeting {
				eq("id", meetingId)
			}
			attendee {
				eq("id", userId)
			}
			inList("role", roles)
		}
	}

	@Transactional(readOnly = true)
	def getMeetingAttendanceByStates(meetingId, userId, states) {
		return MAttendance.createCriteria().get {
			meeting {
				eq("id", meetingId)
			}
			attendee {
				eq("id", userId)
			}
			inList("state", states)
		}
	}

	@Transactional
	def saveAttendance(attendance) {
		attendance.save()
	}

	@Transactional
	def updateAttendance(attendanceId, params) {
		Attendance attendance = Attendance.lock(attendanceId)
		AppUtil.merge(attendance, params)
		attendance.save()
		return attendance
	}

	@Transactional
	def updateAttendanceRole(attendanceId, role, actor) {
		Attendance attendance = Attendance.lock(attendanceId)
		attendance.role = role
		attendance.save()
		this._messageSetGroupManager(attendance, actor)
		return attendance
	}

	@Transactional
	def deleteGroupAttendance(groupId, userId) {
		GAttendance attendance = this.getGroupAttendance(groupId, userId)
		attendance.delete()
//		group.removeFromAttendances(attendance)
		if (attendance.state == Const.GROUP_ATTEND_STATE_ACCEPTED) {
			this.groupService.updateMemberCount(groupId, -1)
			//this.voteService.deleteVotes(userId)
		}
		return attendance
	}

	private _messageSetGroupManager(attendance, actor) {
		if (!(attendance instanceof GAttendance)
				|| attendance.role != Const.ROLE_MANAGER) {
			return
		}
		def data = [:]
		data.homepage = attendance.group.homepage
		data.name = attendance.group.name
		data.uid = actor.id
		data.nickname = actor.nickname
		this.messageService.writeMessage(Const.MESSAGE_TYPE_GROUP_SET_MANAGER,
				data, attendance.attendeeId, actor.id)
	}

	def reviseGroupAttendances() {
		int total = 0
		this.listAttendances({
			projections {
				count("id")
				attendee {
					groupProperty("id")
				}
				group {
					groupProperty("id")
				}
			}
		}, Group.class)?.findAll {
			it[0] > 1
		}?.each { attendance ->
			log.error("revise Attendee " + attendance[1] + " of Group "
					+ attendance[2] + ", from " + attendance[0] + " to 1")
			this.listAttendances({
				attendee {
					eq("id", attendance[1])
				}
				group {
					eq("id", attendance[2])
				}
			}, Group.class, 0, attendance[0] - 1, "id", "desc")?.each { item ->
				GAttendance.withTransaction { status ->
					try {
						if (!item.isAttached()) {
							item.attach()
						}
						item.delete()
					} catch (Exception ex) {
						ex.printStackTrace()
						status.setRollbackOnly()
					}
				}
			}
			total++
		}
		return total
	}

	def reviseMeetingAttendances() {
		int total = 0
		this.listAttendances({
			projections {
				count("id")
				attendee {
					groupProperty("id")
				}
				meeting {
					groupProperty("id")
				}
			}
		}, Meeting.class)?.findAll {
			it[0] > 1
		}?.each { attendance ->
			log.error("revise Attendee " + attendance[1] + " of Meeting "
					+ attendance[2] + ", from " + attendance[0] + " to 1")
			this.listAttendances({
				attendee {
					eq("id", attendance[1])
				}
				meeting {
					eq("id", attendance[2])
				}
			}, Meeting.class, 0, attendance[0] - 1, "id", "desc")?.each { item ->
				MAttendance.withTransaction { status ->
					try {
						if (!item.isAttached()) {
							item.attach()
						}
						item.delete()
					} catch (Exception ex) {
						ex.printStackTrace()
						status.setRollbackOnly()
					}
				}
			}
			total++
		}
		return total
	}

}
