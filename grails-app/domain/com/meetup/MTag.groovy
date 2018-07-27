package com.meetup

class MTag extends Tag {

    static belongsTo = Meeting

    static hasMany = [meetings: Meeting]

//    static mapping = {
//        id(composite: ['name', 'type'])
//		meetings(batchSize: 10)
//    }

}
