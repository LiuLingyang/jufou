package com.meetup

import org.springframework.transaction.annotation.Transactional

@Transactional
class InviteService {

	def saveInvite(invite) {
		invite.save()
	}

	def acceptInvite(invitee, target) {
		Invite invite = null
		if (target instanceof Group) {
			invite = GInvite.findByGroupAndInvitee(target, invitee)
		}
		if (target instanceof Meeting) {
			invite = MInvite.findByMeetingAndInvitee(target, invitee)
		}
		if (!invite) {
			return null
		}
		invite.acceptTime = System.currentTimeMillis()
		invite.save()
		return invite
	}

	def listInvites(target, invitees = null) {
		def invites = null
		if (target instanceof Group) {
			invites = GInvite.createCriteria().list {
				group {
					eq("id", target.id)
				}
				if (invitees?.size() > 0) {
					inList("invitee", invitees)
				}
			}
		}
		if (target instanceof Meeting) {
			invites = MInvite.createCriteria().list {
				meeting {
					eq("id", target.id)
				}
				if (invitees?.size() > 0) {
					inList("invitee", invitees)
				}
			}
		}
		return invites
	}

}
