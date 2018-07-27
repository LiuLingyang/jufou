package com.meetup

import grails.converters.JSON

class VoteController extends AbstractController {

	def voteService

	def beforeInterceptor = [action: this.&_votePermission, except: []]

	private _votePermission(groupId) {
		long userId = this._getUserId()
		if (actionName.indexOf("create") > -1) {
			if (this.userService.isGroupManagerOrCreator(userId, groupId)) {
				return true
			}
		} else {
			//if (this.userService.isAttendGroupOrMeeting(userId, groupId, 0L)) {
				return true
			//}
		}
		return false
	}

	private _votePermission() {
		if (!actionName.startsWith("rest_")) {
			Group group = this.groupService.getGroupByHomepage(params.gname)
			if (this._votePermission(group.id)) {
				return true
			}
			forward(controller: "group", action: "index")
		} else {
			long groupId = params.gid ? params.gid.toLong() : (params.sid ?
					this.voteService.getSurvey(params.sid).groupId : 0L)
			if (this._votePermission(groupId)) {
				return true
			}
			this._response(Const.PERMISSION_DENIED)
		}
		return false
	}

	def list() {
		def model = this._common(params.gname)
		model.surveys = this.voteService.listSurveys({
			group {
				eq("id", model.group.id)
			}
		})
		this._render(view: "list", model: this._model(model))
	}

	def create() {
		def model = this._common(params.gname)
		this._render(view: "create", model: this._model(model))
	}

	def show() {
		def model = this._common(params.gname)
		model.survey = this.voteService.voteResult(params.second)
		this._render(view: "show", model: this._model(model))
	}

	def cast() {
		def model = this._common(params.gname)
		model.survey = this.voteService.getSurvey(params.third)
		this._render(view: "cast", model: this._model(model))
	}

	def rest_create() {
		Survey survey = new Survey(params)
		if (survey.startTime == 0) {
			survey.startTime = System.currentTimeMillis()
		}
		survey.group = this.groupService.getGroup(params.gid.toLong())
		this.voteService.createSurvey(survey)
		this._response(Const.SUCCESS, survey)
	}

	def rest_cast() {
		Survey survey = this.voteService.getSurvey(params.sid)
		if ((survey.startTime != 0 && System.currentTimeMillis() < survey.startTime)
				|| (survey.endTime != 0 && System.currentTimeMillis() > survey.endTime)) {
			this._response(Const.VOTE_TIME_BEYOND)
			return
		}
		long userId = this._getUserId()
		if (this.voteService.getVote(survey.id, survey.groupId, userId)) {
			this._response(Const.ALREADY_VOTED)
			return
		}
		try {
			int max = JSON.parse(survey.items)?.keySet()?.size()
			JSON.parse(params.choice)?.each { k, v ->
				if (k.toInteger() < 1 || k.toInteger() > max || v.toInteger() < 1) {
					this._response(Const.ILLEGAL_REQUEST)
					return
				}
			}
		} catch (Exception ex) {
			this._response(Const.ILLEGAL_REQUEST)
			return
		}
		Vote vote = new Vote(params)
		vote.attendanceId = userId
				//this.attendanceService.getGroupAttendance(
				//survey.groupId, userId)
		vote.survey = survey
		this.voteService.castVote(vote)
		this._response(Const.SUCCESS, vote)
	}

	def rest_list() {
		int type = params.type.toInteger()
		long time = System.currentTimeMillis()
		def callable = {
			group {
				eq("id", params.gid.toLong())
			}
			if (type == 0) {
				or {
					gt("endTime", time)
					le("endTime", 0L)
				}
			}
			if (type == 1) {
				between("endTime", 1L, time)
			}
		}
		int total = this.voteService.countSurveys(callable)
		def surveys = this.voteService.listSurveys(callable, params.offset,
				params.limit, params.sort, params.order)
		this._response(Const.SUCCESS, [total: total, list: surveys])
	}

	def rest_get() {
		Survey survey = this.voteService.getSurvey(params.sid)
		this._response(Const.SUCCESS, survey)
	}

	def rest_result() {
		Survey survey = this.voteService.voteResult(params.sid)
		this._response(Const.SUCCESS, survey)
	}

	def rest_close() {
		Survey survey = this.voteService.updateSurvey(params.sid,
				[endTime: System.currentTimeMillis()])
		this._response(Const.SUCCESS, survey)
	}

}
