package com.meetup

import grails.converters.JSON

import javax.servlet.AsyncContext
import javax.servlet.AsyncEvent
import javax.servlet.AsyncListener
import javax.servlet.http.HttpServletResponse
import java.util.concurrent.Callable

class CometController extends AbstractController {

	def cometWorkersPool

	def cometService

	def index() {
		def ctx = startAsync()
		ctx.setTimeout(Eval.me(this.grailsApplication.config.app.comet.timeout))
		ctx.start {
			CometTask task = new CometTask(ctx)
			ctx.addListener(task)
			this.cometWorkersPool.submit(task)
		}
	}

	private class CometTask implements Callable<Void>, AsyncListener {

		private AsyncContext ctx = null

		private long userId = 0L

		private String userAgent = null

		private _response(rcode, result = null) {
			PrintWriter out = this.ctx.response.getWriter()
			if (result) {
				out.println([code: rcode, result: result] as JSON)
			} else {
				out.println([code: rcode] as JSON)
			}
			out.close()
		}

		public CometTask(AsyncContext ctx) {
			this.ctx = ctx
		}

		@Override
		public Void call() throws Exception {
			def request = null
			try {
				request = this.ctx.request
			} catch (IllegalStateException ex) {
				return null
			}
			if (!request) {
				return null
			}
			try {
				def user = request.session?.user
				if (!user) {
					this._response(HttpServletResponse.SC_UNAUTHORIZED)
					this.ctx.complete()
				} else {
					this.userAgent = _userAgent(request, true)
					if (this.userId == 0L) {
						this.userId = user.id
						cometService.addRequest(this.userId, this.userAgent)
					}
					def response = cometService.getResponse(
							this.userId, this.userAgent)
					if (response) {
//						this._response(HttpServletResponse.SC_OK,
//								response instanceof String ? response :
//									response as JSON)
						this._response(HttpServletResponse.SC_OK, response)
						this.ctx.complete()
					} else {
						int size = cometWorkersPool.threadPoolExecutor.queue.size()
						long time = size == 0 ? 1000L : 1000.intdiv(size).longValue()
						if (time > 0) {
							sleep(time)
						}
						cometWorkersPool.submit(this)
					}
				}
			} catch (Exception ex) {
				ex.printStackTrace()
				this._response(HttpServletResponse.SC_INTERNAL_SERVER_ERROR)
				this.ctx.complete()
			}
			return null
		}

		@Override
		public void onComplete(AsyncEvent asyncEvent) throws IOException {
			if (this.userId > 0L) {
				cometService.removeRequest(this.userId, this.userAgent)
			}
		}

		@Override
		public void onTimeout(AsyncEvent asyncEvent) throws IOException {
			this._response(HttpServletResponse.SC_REQUEST_TIMEOUT)
			this.ctx.complete()
		}

		@Override
		public void onError(AsyncEvent asyncEvent) throws IOException {
			this._response(HttpServletResponse.SC_INTERNAL_SERVER_ERROR)
			this.ctx.complete()
		}

		@Override
		public void onStartAsync(AsyncEvent asyncEvent) throws IOException {
		}

	}

}
