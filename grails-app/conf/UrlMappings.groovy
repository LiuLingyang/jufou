import com.meetup.AppUtil

class UrlMappings {

//	static excludes = ["/images/*", "/css/*"]

	static mappings = {
		"/"(controller: "home", action: "index")
//		"/home"(controller: "home", action: "index")
		"/download"(controller: "home", action: "download")
		"/app"(controller: "home", action: "app")
		"/about"(controller: "more", action: "about")
		"/help"(controller: "more", action: "help")
		"/license"(controller: "more", action: "license")
		"/address"(controller: "more", action: "address")
		"/feedback"(controller: "more", action: "feedback")
		"/job"(controller: "more", action: "job")
		"/login"(controller: "user", action: "login")
		"/regist"(controller: "user", action: "regist")
		"/group"(controller: "user", action: "group")
		"/message"(controller: "user", action: "message")
		"/setting"(controller: "user", action: "setting")
		"/profile"(controller: "user", action: "profile")
		"/personal"(controller: "user", action: "home")
		"/retrieve"(controller: "user", action: "retrieve")
		"/activate"(controller: "user", action: "activate")
		"/active"(controller: "user", action: "rest_activate")
		"/invite"(controller: "user", action: "rest_redirectInvite")
		"/react"(controller: "user", action: "react")
		"/reset"(controller: "user", action: "reset")
		"/contact"(controller: "user", action: "contact")
		"/search"(controller: "group", action: "search")
		"/create"(controller: "group", action: "create")
		"/hdfs/**"(controller: "hdfs", action: "rest_show")
		"/thumbnail/**"(controller: "hdfs", action: "rest_show")
		"/app/update/**"(controller: "hdfs", action: "rest_show")
		"/rest/open/$ctrl/$act?/$id?" {
			controller = { params.ctrl }
			action = {
				params.act ? "rest_${AppUtil.transAction(params.act)}" : ""
//              "rest_" + params.act
			}
		}
		"/rest/$ctrl/$act?/$id?" {
			controller = { params.ctrl }
			action = {
				params.act ? "rest_${AppUtil.transAction(params.act)}" : ""
//              "rest_" + params.act
			}
		}
		"/$stub" {
			controller = { "user" }
			action = { "stub" }
			constraints {
				stub(validator: {
					AppUtil.isShortLink(it)
				})
			}
		}
		"/$gname/$first?/$second?/$third?" {
			controller = {
				params.first &&
						["meeting", "album", "photo", "vote", "news", "share"].
								isCase(params.first) ? params.first : "group"
			}
			action = {
				if (!params.first) {
					"index"
				} else if (params.first == "setting") {
					params.second ? "${params.second}Setting" : "setting"
				} else if (["member", "members"].isCase(params.first)) {
					params.second ? "member" : "members"
				} else if (["join", "inform", "about", "invite", "apply",
						"detail", "contact", "sub"].isCase(params.first)) {
					params.first
				} else if (params.first == "album") {
					params.second ? "show" : "list"
				} else if (params.first == "photo") {
					"show"
				} else if (["vote", "news", "share"].isCase(params.first)) {
					params.second ? (params.second ==~ /^[1-9]\d*$/ ? "show" : params.second) : "list"
				} else {
					// 即 params.first == "meeting"
					params.second ==~ /^[1-9]\d*$/ ? "show" : params.second
				}
			}
			constraints {
				gname(validator: {
//					!(it ==~ /^[a-z\.]+$/ || it.length() <= 6)
//					it ==~ /^[0-9a-zA-Z][\w-]{5,}[0-9a-zA-Z]$/
					AppUtil.isValidHomepage(it)
				})
				first(validator: {
					!it || ["setting", "meeting", "member", "members", "album",
							"photo", "join", "inform", "about", "invite", "apply",
							"detail", "vote", "news", "share", "contact", "sub"].isCase(it)
				})
				second(validator: {
					!it || ["basic", "privacy", "tag", "theme", "message", "reply",
							"member", "create", "update", "copy", "answer", "print",
							"detail", "weixin", "cast"].isCase(it) || it ==~ /^[1-9]\d*$/
				})
				third(validator: {
					!it || it ==~ /^[1-9]\d*$/
				})
			}
		}
//        "/$gname/setting/$act?" {
//            controller = { "group" }
//            action = {
//                params.act ? "${params.act}Setting" : "setting"
//            }
//            constraints {
//                gname(validator: {
//                    !(it ==~ /^[a-z]+$/ || it.length() <= 6)
//                })
//            }
//        }
//        "/$gname/meeting/$mid?" {
//            controller = { "meeting" }
//            action = {
//                params.mid == "create" ? "create" : "show"
//            }
//            constraints {
//                gname(validator: {
//                    !(it ==~ /^[a-z]+$/ || it.length() <= 6)
//                })
//                mid(validator: {
//                    it == "create" || it ==~ /^[1-9]\d*$/
//                })
//            }
//        }
//        "/$gname/photo" {
//            controller = { "group" }
//            action = { "photo" }
//            constraints {
//                gname(validator: {
//                    !(it ==~ /^[a-z]+$/ || it.length() <= 6)
//                })
//            }
//        }
//        "/$gname/join" {
//            controller = { "group" }
//            action = { "join" }
//            constraints {
//                gname(validator: {
//                    !(it ==~ /^[a-z]+$/ || it.length() <= 6)
//                })
//            }
//        }
//        "/$gname" {
//            controller = {
//                "group"
//            }
//            constraints {
//                gname(validator: {
//                    !(it ==~ /^[a-z]+$/ || it.length() <= 6)
//                })
//            }
//        }
		"/$controller/$action?/$id?" {
			constraints {
				// apply constraints here
			}
		}
//        "/activate/?"(controller: "user", action: "activate")
//		"/"(view:"/index")
		"404"(controller: "error", action: "handle404")
		"500"(controller: "error", action: "handle500")
	}

}
