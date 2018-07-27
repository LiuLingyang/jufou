package com.meetup

import grails.converters.JSON
import org.springframework.transaction.annotation.Transactional

@Transactional
class IpTableService extends AbstractService {

	def lookup(ip) {
		IpTable iptable = IpTable.findByIp(ip)
		if (iptable) {
			return iptable
		}
		String url = String.format(this.grailsApplication.config.
				app.ip.lookup.sina, ip)
		String result = HttpUtil.executeRequest(url)
		if (!result) {
			return null
		}
		def json = JSON.parse(result)
		if (!json.hasProperty("ret") || json.get("ret") < 1) {
			return null
		}
		iptable = new IpTable(ip: ip, country: json.get("country"),
				province: json.get("province"), city: json.get("city"),
				district: json.get("district"), isp: json.get("isp"))
		iptable.save()
		return iptable
	}

}
