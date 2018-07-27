package com.meetup

class IpTable {

	String ip

	String country

	String province

	String city

	String district

	String isp

	static constraints = {
		ip(index: "Ip_Idx")
	}

}
