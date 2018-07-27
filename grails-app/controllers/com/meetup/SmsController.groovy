package com.meetup

class SmsController extends AbstractController {

	def smsService

	def callback() {
		String callback = null
		boolean result = this.smsService.handleMo(
				request.getRemoteAddr(), callback)
		this._response(result ? Const.SUCCESS : Const.FAIL)
	}

}
