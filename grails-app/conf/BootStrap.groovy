import com.meetup.*
import grails.converters.JSON
import org.codehaus.groovy.grails.commons.DomainClassArtefactHandler

import java.lang.reflect.Modifier

class BootStrap {

	def grailsApplication

	def marshaller

	def hdfsService

	def updateService

	private _dest(source, dest) {
		dest += (dest.endsWith("/") ? "" : "/")
		if (this.hdfsService.isWindows()) {
			dest += source
		} else {
			dest += source.encodeAsMD5()
		}
		return dest
	}

	def init = { servletContext ->
		System.setProperty("file.encoding", "UTF-8")
		System.setProperty("default.client.encoding", "UTF-8")
		System.setProperty("user.language", "zh")
		System.setProperty("user.region", "CN")

		TypeUtil.getArtefacts(DomainClassArtefactHandler.TYPE).grep {
			!Modifier.isAbstract(it.clazz.getModifiers())
		}*.clazz?.each { clazz ->
			JSON.registerObjectMarshaller(clazz) {
				def result = [:]
//				if (clazz == Group.class) {
//					it = it.properties.findAll {
//						k, v -> !v.startsWith(Const.CUSTOM_GROUP_TAG)
//					}
//				}
				this.marshaller.marshalObject(result, it)
				return result
			}
		}

		if (!User.findByUsername("admin")) {
			new User(username: "admin", nickname: "admin", gender: Const.GENDER_MALE,
					role: Const.USER_ROLE_ADMIN, password: "pwd:1qaz/xsw2".encodeAsMD5(),
					state: Const.USER_STATE_ACTIVE).save()
		}

		String rootPath = this.grailsApplication.config.app.hdfs.app.contextPath
		[Const.USER_AGENT_ANDROID, Const.USER_AGENT_IOS].each { client ->
			String path = "/update/" + client + "/"
			File source = AppUtil.retrieveFileInWebApp(path)
			source.listFiles()?.each { file ->
				String name = file.getName()
				String[] props = name.substring(0, name.lastIndexOf(".")).split("_")
				Update update = this.updateService.getUpdate(client, props[0], props[1])
				if (update?.size != file.length()) {
					String dest = rootPath + (this.hdfsService.isWindows() ? path + name :
							this.hdfsService.upload(file, path + name.encodeAsMD5()))
					if (!update) {
						update = new Update(client: client, type: props[0], release: props[1])
					} else {
						update.releaseTime = System.currentTimeMillis()
					}
					update.url = dest
					update.size = file.length()
					update.force = props[2].toInteger() > 0
					this.updateService.saveUpdate(update)
				}
			}
		}
	}

	def destroy = {
	}

}
