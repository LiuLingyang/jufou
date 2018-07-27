package com.meetup

import grails.converters.JSON
import org.codehaus.groovy.grails.web.json.JSONObject
import org.springframework.transaction.annotation.Transactional

class VoteService extends AbstractService {

	@Transactional
	def saveSurvey(survey) {
		survey.save()
	}

	@Transactional
	def createSurvey(survey) {
		this.saveSurvey(survey)
	}

	@Transactional
	def saveVote(vote) {
		vote.save()
	}

	@Transactional
	def updateSurvey(surveyId, params) {
		Survey survey = Survey.lock(surveyId)
		AppUtil.merge(survey, params)
		survey.save()
		return survey
	}

	@Transactional
	def castVote(vote) {
		this.saveVote(vote)
		Survey survey = Survey.lock(vote.surveyId)
		survey.voterCount += 1
		this.saveSurvey(survey)
	}

	@Transactional(readOnly = true)
	def getVote(surveyId, groupId, userId) {
		return Vote.createCriteria().get {
			survey {
				eq("id", surveyId)
			}
			eq("attendanceId", userId);
			//attendance {
				//group {
				//	eq("id", groupId)
				//}
				//attendee {
				//	eq("id", userId)
				//}
			//}
		}
	}

	@Transactional(readOnly = true)
	def getSurvey(surveyId) {
		return Survey.findById(surveyId)
	}

	@Transactional(readOnly = true)
	def countSurveys(callable) {
		return Survey.createCriteria().count(callable)
	}

	@Transactional(readOnly = true)
	def countVotes(surveyId) {
		return Vote.createCriteria().count {
			survey {
				eq("id", surveyId)
			}
			//attendance {
			//	eq("state", Const.GROUP_ATTEND_STATE_ACCEPTED)
			//}
		}
	}

	@Transactional(readOnly = true)
	def listVotes(surveyId, offset = null, limit = null, sort = null, order = null) {
		def args = this._criteriaArgs(offset, limit, sort, order)
		return Vote.createCriteria().list(args) {
			survey {
				eq("id", surveyId)
			}
			//attendance {
			//	eq("state", Const.GROUP_ATTEND_STATE_ACCEPTED)
			//}
		}
	}

	@Transactional(readOnly = true)
	def listVotesByAttendance(attendance) {
		return Vote.findAllByAttendance(attendance)
	}

	@Transactional(readOnly = true)
	def listSurveys(callable, offset = null, limit = null, sort = null, order = null) {
		def args = this._criteriaArgs(offset, limit, sort, order)
		return Survey.createCriteria().list(args, callable)
	}

	private _result(result, choice, max) {
		choice.each { k, v ->
			if (k.toInteger() >= 1 && k.toInteger() <= max) {
				def value = result.get(k)
				if (!value) {
					result.put(k, v.toInteger())
				} else {
					result.put(k, value + v.toInteger())
				}
			}
		}
	}

	@Transactional(readOnly = true)
	def voteResult(surveyId) {
		Survey survey = Survey.findById(surveyId)
		JSONObject items = JSON.parse(survey.items)
		int max = items.keySet().size()
		def result = [:]
		def votes = this.listVotes(survey.id)
		votes?.each { vote ->
			JSONObject choice = JSON.parse(vote.choice)
			this._result(result, choice, max)
		}
		if (survey.type == Const.SURVEY_TYPE_GRADE) {
			result.each { k, v ->
				result.put(k, new BigDecimal((float) v / survey.voterCount).
						setScale(1, BigDecimal.ROUND_HALF_UP).floatValue())
			}
		}
		survey.result = result as JSON
		return survey
	}

	@Transactional
	def deleteVote(vote) {
		vote.delete()
		Survey survey = Survey.lock(vote.surveyId)
		survey.voterCount -= 1
		this.saveSurvey(survey)
	}

	@Transactional
	def deleteVotes(attendance) {
		Vote.findAllByAttendance(attendance)?.each { vote ->
			this.deleteVote(vote)
		}
	}

	def reviseVoterCount() {
		int total = 0
		Survey.list().each { item ->
			int count = this.countVotes(item.id)
			if (item.voterCount != count) {
				log.error("revise voterCount of Survey " + item.id
						+ ", from " + item.voterCount + " to " + count)
				Survey.withTransaction { status ->
					try {
						if (!item.isAttached()) {
							item.attach()
						}
						item.voterCount = count
						this.saveSurvey(item)
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
