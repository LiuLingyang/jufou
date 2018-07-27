package com.meetup

import org.apache.commons.lang.StringUtils
import org.springframework.transaction.annotation.Transactional

@Transactional
class QuestionService extends AbstractService {

	def meetingService

	@Transactional(readOnly = true)
	def getQuestion(questionId) {
		return Question.findById(questionId)
	}

	@Transactional(readOnly = true)
	def listGroupQuestions(groupId) {
		return GQuestion.createCriteria().list {
			group {
				eq("id", groupId)
			}
			order("id", "asc")
		}
	}

	def saveGroupQuestion(question, groupId) {
		question.group = Group.findById(groupId)
		question.save()
	}

	def updateGroupQuestion(questionId, question) {
		this.saveGroupQuestion(question,
				this.deleteQuestion(questionId).groupId)
	}

	def deleteQuestion(questionId) {
		Question question = Question.findById(questionId)
//		Group group = Group.findById(groupId)
//		group.attendances*.answers.findAll {
//			it.question.id == question.id
//		}.each {
//			it.delete()
//		}
		question.delete()
		return question
	}

	@Transactional(readOnly = true)
	def listMeetingQuestions(meetingId) {
		return MQuestion.createCriteria().list {
			meeting {
				eq("id", meetingId)
			}
			order("id", "asc")
		}
	}

	def answerQuestion(attendance, answers, save = true) {
		boolean flag = false
		answers?.each { k, v ->
			Question question = Question.findById(k)
			Answer answer = attendance.id > 0 ? Answer.
					findByAttendanceAndQuestion(attendance, question) : null
			if (answer) {
				if (answer.answer != v) {
					answer.answer = v
					answer.save()
				}
			} else {
				answer = new Answer(question: question, answer: v)
				attendance.addToAnswers(answer)
				if (!flag) {
					flag = true
				}
			}
		}
		if (flag && save) {
			attendance.save()
		}
	}

	def setMeetingQuestions(meeting, nQues) {
		def oQues = meeting.questions*.question
//		def oQues = this.listMeetingQuestions(meeting.id)*.question
		if (!oQues) {
			oQues = []
		}
		def cQues = nQues.grep(oQues)
		(oQues - cQues).each { item ->
			if (StringUtils.isNotBlank(item)) {
				MQuestion question = MQuestion.
						findByMeetingAndQuestion(meeting, item)
				meeting.removeFromQuestions(question)
				question.delete()
			}
		}
		(nQues - cQues).each { item ->
			if (StringUtils.isNotBlank(item)) {
				meeting.addToQuestions(new MQuestion(question: item))
			}
		}
	}

}
