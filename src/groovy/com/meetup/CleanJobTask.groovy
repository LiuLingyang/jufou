package com.meetup

import org.apache.commons.logging.Log
import org.apache.commons.logging.LogFactory

import javax.annotation.Resource

/**
 * Created with IntelliJ IDEA.
 * User: zjulyy
 * Date: 13-7-14
 * Time: 下午2:43
 * To change this template use File | Settings | File Templates.
 */
class CleanJobTask {

	private static final Log log = LogFactory.getLog(this)

	@Resource
	def albumService

	@Resource
	def groupService

	@Resource
	def meetingService

	@Resource
	def photoService

	@Resource
	def tokenService

	@Resource
	def quotaService

	@Resource
	def attendanceService

	@Resource
	def voteService

	@Resource
	def shareService

	public void doCleanJob() {
		int total = 0
		long start = System.currentTimeMillis()

		total += this.albumService.revisePhotoCount()

		total += this.attendanceService.reviseGroupAttendances()
		total += this.attendanceService.reviseMeetingAttendances()

		total += this.groupService.reviseMeetingCount()
		total += this.groupService.reviseMemberCount()
		total += this.groupService.revisePraiseCount()

		total += this.meetingService.reviseJoinCount()
		total += this.meetingService.revisePhotoCount()
		total += this.meetingService.reviseCommentCount()
		total += this.meetingService.reviseGrade()

		total += this.photoService.reviseCommentCount()

		total += this.quotaService.revisePhotoUploaded()
		total += this.quotaService.reviseGroupCreated()

		total += this.voteService.reviseVoterCount()

		total += this.shareService.reviseCommentCount()

		long end = System.currentTimeMillis()
		log.error("revise " + total + " count cost: " + (end - start) + "ms")

		this.tokenService.deleteTokens()
	}

}
