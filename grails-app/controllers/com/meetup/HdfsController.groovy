package com.meetup

import org.apache.hadoop.io.IOUtils

class HdfsController extends AbstractController {

	def hdfsService

	def rest_show() {
		String url = this.hdfsService.parseUrl(request.forwardURI)
//		if (this.hdfsService.isWindows()) {
//			url = request.getRealPath(url)
//		}
		InputStream is = this.hdfsService.download(url, request)
		if (is) {
			if (url.indexOf(Const.USER_AGENT_ANDROID) > 0) {
				response.setHeader("Content-Type", "application/vnd.android.package-archive")
				response.setHeader("Content-Disposition", "attachment;filename=jufou.apk")
			}
			if (url.indexOf(Const.USER_AGENT_IOS) > 0) {
				response.setHeader("Content-Type", "application/octet-stream")
				response.setHeader("Content-Disposition", "attachment;filename=jufou.ipa")
			}
			IOUtils.copyBytes(is, response.getOutputStream(), 4096, true)
		} else {
			response.sendRedirect(AppUtil.buildRequestUrl("error", "handle404",
					[error: AppUtil.encodeAsGBK(this.grailsApplication.config.
							app.error.msg.file.not.found)]))
		}
	}

}
