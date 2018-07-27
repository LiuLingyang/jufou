package com.meetup

import javax.servlet.http.HttpServletResponse

class ErrorController extends AbstractController {

	private _handleError(error) {
		if (this.configService.isRestURI(request.forwardURI)) {
			if (params.code) {
				this._response(params.code)
			} else {
				response.setStatus(error)
				this._response(error)
			}
		} else {
			this._render(view: error.toString(), model: params)
		}
	}

	def handle404() {
		this._handleError(HttpServletResponse.SC_NOT_FOUND)
	}

	def handle500() {
		this._handleError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR)
	}

}
