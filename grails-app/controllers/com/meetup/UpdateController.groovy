package com.meetup

class UpdateController extends AbstractController {

	def updateService

	def beforeInterceptor = [action: this.&_adminPermission, except: ["rest_next"]]

	def _formatName(file) throws IOException {
		String filename = file.originalFilename.trim()
		return filename.substring(filename.lastIndexOf(".") + 1).toLowerCase()
	}

	def rest_release() {
		def file = request.getFile("file")
		if (file && (!file.inputStream || file.empty)) {
			// 文件超出大小
			this._response(Const.FILE_EXCEED_SIZE)
			return
		}
		if (!Const.INSTALL_FILE_TYPES.contains(this._formatName(file))) {
			this._response(Const.UNSUPPORTED_FILE_TYPE)
			return
		}
		Update update = this.updateService.createUpdate(new Update(params),
				file, request, "/app")
		this._response(Const.SUCCESS, update)
	}

	def rest_next() {
		Update update = this.updateService.getNextUpdate(params.client,
				params.type, params.current)
		this._response(Const.SUCCESS, update)
	}

}
