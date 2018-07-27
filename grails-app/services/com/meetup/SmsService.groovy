package com.meetup

import org.apache.axis.client.Call
import org.apache.axis.client.Service

import javax.xml.namespace.QName
import java.util.concurrent.atomic.AtomicLong

class SmsService extends AbstractService {

	private String f3targetUrl = null

	private String f3ccid = null

	private String f3password = null

	private String targetUrl = null

	private String ccid = null

	private String password = null

	private String signature = null

	private List<String> whitelist = null

	private AtomicLong extNo = new AtomicLong()

	public void init() {
		this.f3targetUrl = this.grailsApplication.config.app.sms.f3targetUrl
		this.f3ccid = this.grailsApplication.config.app.sms.f3ccid
		this.f3password = this.grailsApplication.config.app.sms.f3password
		this.targetUrl = this.grailsApplication.config.app.sms.targetUrl
		this.ccid = this.grailsApplication.config.app.sms.ccid
		this.password = this.grailsApplication.config.app.sms.password
		this.signature = AppUtil.encodeAsGBK(this.grailsApplication.config.
				app.sms.signature)
		this.whitelist = this.grailsApplication.config.app.sms.whitelist?.
				split(";")?.toList()
	}

	public int getSignatureLength() {
		return AppUtil.length(this.signature) + 1
	}

	public boolean sendSms(String mobile, String content, boolean f3 = false) {
		if (f3) {
			return this._sendSmsF3(mobile, content)
		} else {
			return this._sendSms106(mobile, content)
		}
	}

	private boolean _sendSmsF3(String mobile, String content) {
		content += " " + URLEncoder.encode(this.signature, Const.DEFAULT_ENCODING)
		if (content.length() > 500) {
			return false
		}
		String params = this.grailsApplication.config.app.sms.f3sendSmsParams
		if (params.startsWith("'") && params.endsWith("'")) {
			params = params.substring(1, params.length() - 1)
		}
		String url = this.f3targetUrl + String.format(params, mobile, content,
				content.length() > 70 ? 5 : 1, this.f3ccid, this.f3password)
		String result = HttpUtil.executeRequest(url)
		return result ? result?.split("\\|")[0].toInteger() > 0 : false
	}

	private String _generateMobile(mobile) {
		long msgNo = System.currentTimeMillis()
		int extNo = this.extNo.incrementAndGet() % 1000
//		for (int i = 0; i < 3 - extNo.length(); i++) {
//			extNo = "0" + extNo
//		}
		return String.format(this.grailsApplication.config.
				app.sms.sendSmsParams, msgNo, mobile, extNo)
	}

	private boolean _sendSms106(String mobile, String content) {
		Service service = new Service()
		Call call = (Call) service.createCall()
		call.setOperationName(new QName(this.targetUrl, "sendMessages2"))
		call.setTargetEndpointAddress(new URL(this.targetUrl))
		Object[] params = [this.ccid, this.password, this._generateMobile(mobile),
				content + " " + this.signature, ""] as Object[]
		String result = (String) call.invoke(params)
		boolean flag = result ? result.startsWith("SUCCESS") : false
		if (!flag && result.startsWith("FAILED:")) {
			log.error("fail to send sms to " +
					mobile + ": " + (result - "FAILED:"))
		}
		return flag
	}

	public String queryAccount(boolean f3 = false) {
		if (f3) {
			return this._queryAmountF3()
		} else {
			return this._queryAmount106()
		}
	}

	private String _queryAmountF3() {
		String params = this.grailsApplication.config.app.sms.f3queryAmountParams
		if (params.startsWith("'") && params.endsWith("'")) {
			params = params.substring(1, params.length() - 1)
		}
		String url = this.f3targetUrl +
				String.format(params, this.f3ccid, this.f3password)
		String result = HttpUtil.executeRequest(url)
		if (!result) {
			return null
		}
		def request = new XmlParser().parse(new StringReader(result))
		if (request.get("result").text().toInteger() < 1) {
			return null
		}
		return request.get("SMS").text() + "|" +
				request.get("MMS").text() + "|" + request.get("NMS").text()
	}

	private String _queryAmount106() {
		Service service = new Service()
		Call call = (Call) service.createCall()
		call.setOperationName(new QName(this.targetUrl, "getBlance"))
		call.setTargetEndpointAddress(new URL(this.targetUrl))
		Object[] params = [this.ccid, this.password] as Object[]
		String result = (String) call.invoke(params)
		if (!result) {
			return null
		}
		if (result.startsWith("SUCCESS:")) {
			result -= "SUCCESS:"
			def response = new XmlParser().parse(new StringReader(result))
			return response.get("balance")?.text()
		}
		if (result.startsWith("FAILED:")) {
			log.error("fail to query balance: " + (result - "FAILED:"))
		}
		return null
	}

	public boolean handleMo(String fromIp, String callback) {
		if (!this.whitelist.contains(fromIp)) {
			return false
		}
		def request = new XmlParser().parse(callback)
		if (request.get("ECECCID").text() != this.ccid) {
			return false
		}
		request.mo.each {
			String mobile = it.get("Msisdn").text()
			String message = it.get("Message").text()
			int type = it.get("MsgType").text().toInteger()
			if (type == 1 && message == "") {
				// do mo...
			}
		}
		return true
	}

}
