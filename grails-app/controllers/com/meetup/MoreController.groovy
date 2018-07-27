package com.meetup

class MoreController extends AbstractController {

	def about() {
		this._render(view: "about", model: this._model(null))
	}

	def job() {
		this._render(view: "job", model: this._model(null))
	}

	def address() {
		this._render(view: "address", model: this._model(null))
	}

	def help() {
		this._render(view: "help", model: this._model(null))
	}

	def license() {
		this._render(view: "license", model: this._model(null))
	}

	def feedback() {
		this._render(view: "feedback", model: this._model(null))
	}

}
