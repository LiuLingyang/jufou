package com.meetup

class SettingsController extends AbstractController {

	def settingsService

	def rest_get() {
		long groupId = params.gid ? params.gid.toLong() : 0L
		Settings settings = this.settingsService.getSettings(
				this._userAgent(), this._getUserId(), groupId)
		this._response(Const.SUCCESS, settings)
	}

	def rest_update() {
		long groupId = params.gid ? params.gid.toLong() : 0L
		Settings settings = this.settingsService.updateSettings(
				this._userAgent(), this._getUserId(), groupId, params)
		this._response(Const.SUCCESS, settings)
	}

}
