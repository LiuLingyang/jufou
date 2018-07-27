package com.meetup

import com.meetup.Const
import com.meetup.CookieUtil
import com.meetup.CredDecryptResult
import com.meetup.UserCredential
import org.codehaus.groovy.grails.commons.ApplicationHolder

import javax.servlet.http.HttpServletResponse

class AuthFilters {

	def dependsOn = [CacheFilters]

	def encryptService

	def configService

//	def sessionFactory

	def grailsApplication

	def userService

	def weixinService

//	private _init(request) {
//		if (!Const.DOMAIN) {
//			Const.DOMAIN = this.grailsApplication.config.app.server.domain
////			Const.DOMAIN = request.getHeader("Host")
//			Const.URL_ROOT = "http://" + Const.DOMAIN + "/"
//		}
//		if (!Const.CONTEXT_PATH) {
//			Const.CONTEXT_PATH = request.getContextPath()
//		}
//	}

	private _setLastLoginTime(userId) {
		this.userService.updateUser(userId,
				[lastLoginTime: System.currentTimeMillis()])
	}

	private _redirect(request, response, session) {
		response.addCookie(CookieUtil.makeCookieExpire(Const.COOKIE_SESSION, "", Const.DOMAIN))
		response.addCookie(CookieUtil.makeCookieExpire(Const.COOKIE_PERSIST, "", Const.DOMAIN))
		if (this.configService.isPublicURI(request.forwardURI)) {
			log.error("remove user from session for url: " + request.forwardURI)
			session.removeAttribute("user")
			return true
		}
		log.error("invalidate session for url: " + request.forwardURI)
		session.invalidate()
		if (this.configService.isRestURI(request.forwardURI)) {
			response.sendError(HttpServletResponse.SC_UNAUTHORIZED)
			return false
		}
//        if (grailsApplication.metadata['app.name'] == "/") {
//            _response.sendRedirect("/home/")
//        } else {
//            _response.sendRedirect("/" + grailsApplication.metadata['app.name'] + "/home/")
//        }
		response.sendRedirect("/login/")
		return false
	}

	def filters = {
//        all(controller:'*', action:'*') {
//            before = {
//
//            }
//            after = { Map model ->
//
//            }
//            afterView = { Exception e ->
//
//            }
//        }

//        web(controller: 'user', action: '*', invert: true) {
		auth(controller: '*', action: '*') {
			before = {
//                return true
//				  this._init(request)
//				  this.sessionFactory.getCurrentSession().beginTransaction()
				if (this.configService.isAuthURI(request.forwardURI)) {
					return true
				}
				if (!request.getAttribute(Const.AUTH_APPLIED)) {
					request.setAttribute(Const.AUTH_APPLIED, true)
				} else {
					return true
				}
				CredDecryptResult cred = null
				// 检查会话cookie是否存在
				String sCookie = CookieUtil.getCookieValue(request, Const.COOKIE_SESSION)
				if (!sCookie) {
					// 没有会话cookie则检查持久cookie
					String pCookie = CookieUtil.getCookieValue(request, Const.COOKIE_PERSIST)
					if (pCookie) {
						// 有持久cookie则解密获取用户信息
						cred = this.encryptService.decryptPersistentCredential(pCookie)
					}
				} else {
					// 有会话cookie则解密获取用户信息
					cred = this.encryptService.decryptSessionCredential(sCookie)
				}
				if (!cred) {
					// 会话cookie和持久cookie皆缺失或损坏，则重定向到首页
					return this._redirect(request, response, session)
				}
				if (!session.user) {
					// 之前服务端无会话则新建
					User user = this.userService.isWeixinAccount(cred.username) ?
							this.weixinService.refresh(cred.username) :
							this.userService.getUser(cred.userId)
					if (!user) {
						log.error("request url: " + request.forwardURI)
						log.error("remove cookie, user is absent: " + cred.username
								+ " | " + cred.userId)
						return this._redirect(request, response, session)
					}
					session.user = [username: cred.username, id: cred.userId,
									nickname: user.nickname, thumbnail: user.thumbnail]
					this._setLastLoginTime(cred.userId)
				} else {
					if (session.user.username != cred.username || session.user.id != cred.userId) {
						log.error("request url: " + request.forwardURI)
						log.error("remove cookie, user cookie is dismatch: "
								+ session.user.username + " vs " + cred.username
								+ " , " + session.user.id + " vs " + cred.userId)
						// 已有会话保存的用户信息和cookie中保存的用户信息不符，则重定向到首页
						return this._redirect(request, response, session)
					}
				}
				if (!sCookie) {
					// 持久cookie置换设置会话cookie
					UserCredential suc = this.encryptService.encryptSessionCredential(cred.username,
							cred.userId, Const.FLAG_EXCHANGE)
					response.addCookie(CookieUtil.makeCookie(suc.key, suc.value, Const.DOMAIN, -1))
				}
				return true
			}
//			after = { Map model ->
//			}
//			afterView = { Exception e ->
//			}
		}
	}
}
