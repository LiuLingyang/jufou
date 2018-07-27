package com.meetup

class GTag extends Tag {

    static belongsTo = Group

    static hasMany = [groups: Group]

//    static mapping = {
//        id(composite: ['name', 'type'])
//		groups(batchSize: 10)
//    }

}
