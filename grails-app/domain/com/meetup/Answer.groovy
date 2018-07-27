package com.meetup

class Answer implements Comparable{

//	Question question
	String answer

	static belongsTo = [attendance: Attendance, question: Question]

	static constraints = {
		answer(nullable: true, blank: true)
		attendance(index: "Attendance_Idx")
	}

	int compareTo(obj){
		question.id.compareTo(obj.question.id);
	}
}
