package com.meetup

import com.notnoop.apns.APNS
import org.springframework.core.io.Resource

class ApnsService extends AbstractService {

	private String cert = null

	private String entCert = null

	private String password = null

	private String entPassword = null

	private com.notnoop.apns.ApnsService service = null

	private com.notnoop.apns.ApnsService entService = null

	public void setCert(Resource cert) {
		this.cert = cert.getFile().getPath()
	}

	public void setEntCert(Resource cert) {
		this.entCert = cert.getFile().getPath()
	}

	public void init() {
		this.password = this.grailsApplication.config.app.apns.password
		this.entPassword = this.grailsApplication.config.app.apns.enterprise.password
		this.service = APNS.newService().withCert(this.cert, this.password)
				.withSandboxDestination().build()
		this.entService = APNS.newService().withCert(this.entCert, this.entPassword)
				.withSandboxDestination().build()
	}

	public void push(String token, int type, String message) {
//		this.service = APNS.newService().withCert(this.cert, this.password)
//				.withSandboxDestination().build()
		String payload = APNS.newPayload().alertBody(message).build()
		if (type == Const.TOKEN_APNS) {
			this.service.push(token, payload)
		}
		if (type == Const.TOKEN_APNS_ENT) {
			this.entService.push(token, payload)
		}
//		String payload = APNS.newPayload()
//				.badge(3)
//				.customField("secret", "what do you think?")
//				.localizedKey("GAME_PLAY_REQUEST_FORMAT")
//				.localizedArguments("Jenna", "Frank")
//				.actionKey("Play").build()
//		String payload = APNS.newPayload()
//				.badge(3)
//				.customField("secret", "what do you think?")
//				.localizedKey("GAME_PLAY_REQUEST_FORMAT")
//				.localizedArguments("Jenna", "Frank")
//				.actionKey("Play").build()
//		EnhancedApnsNotification notification = new EnhancedApnsNotification(
//				EnhancedApnsNotification.INCREMENT_ID(), /* Next ID */
//				new Date().getTime() + 60 * 60, /* Expire in one hour */
//				token, /* Device Token */
//				payload)
//		service.push(notification)
//		Map<String, Date> inactiveDevices = service.getInactiveDevices()
//		for (String deviceToken : inactiveDevices.keySet()) {
//			Date inactiveAsOf = inactiveDevices.get(deviceToken)
//		}
	}

}
