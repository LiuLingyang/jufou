package com.meetup

import sun.misc.BASE64Encoder

import javax.annotation.Resource
import javax.mail.*
import javax.mail.internet.InternetAddress
import javax.mail.internet.MimeBodyPart
import javax.mail.internet.MimeMessage
import javax.mail.internet.MimeMultipart
import java.util.concurrent.RejectedExecutionException

class MailService extends AbstractService {

	class Mail {

		String fromAlias

		String subject

		String toAddress

		String template

		Map data

	}

	class MailTask implements Runnable {

		Mail mail

		MailTask(Mail mail) {
			this.mail = mail
		}

		public void run() {
			_doSend(this.mail)
		}

	}

	@Resource
	def templateService

	@Resource
	def taskExecutor

//	private BlockingQueue<Mail> mailQueue = new LinkedBlockingQueue<Mail>()

	private Session sendMailSession

	public boolean sendMail(String fromAlias, String subject,
							String toAddress, String template, Map data) {
		Mail mail = new Mail(fromAlias: fromAlias, subject: subject,
				toAddress: toAddress, template: template, data: data)
//		return this.mailQueue.add(mail)
		try {
			this.taskExecutor.execute(new MailTask(mail))
		} catch (RejectedExecutionException ex) {
			return false
		}
		return true
	}

	public void init() {
		final String username = this.grailsApplication.config.app.mail.auth.username
		final String password = this.grailsApplication.config.app.mail.auth.password
		// 身份认证
		Authenticator authenticator = new Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(username, password)
			}
		}
		Properties properties = new Properties()
		properties.put("mail.smtp.host",
				this.grailsApplication.config.app.mail.server.host)
		properties.put("mail.smtp.port",
				this.grailsApplication.config.app.mail.server.port)
		properties.put("mail.smtp.auth", "true")
		// 根据邮件会话属性和密码验证器构造一个发送邮件的session
		this.sendMailSession = Session.getDefaultInstance(
				properties, authenticator)
//		new Thread() {
//			public void run() {
//				while (true) {
//					try {
//						_doSend(mailQueue.take())
//					} catch (Exception ex) {
//						ex.printStackTrace()
//					}
//				}
//			}
//		}.start()
	}

	private void _doSend(Mail mail) {
		// 根据session创建一个邮件消息
		javax.mail.Message mailMessage = new MimeMessage(this.sendMailSession)
		// 创建邮件发送者地址
		Address from = new InternetAddress(mail.fromAlias + " <" +
				this.grailsApplication.config.app.mail.from.address + ">")
		// 设置邮件消息的发送者
		mailMessage.setFrom(from)
		// 创建邮件的接收者地址，并设置到邮件消息中
		Address to = new InternetAddress(mail.toAddress)
		// Message.RecipientType.TO属性表示接收者的类型为TO
		mailMessage.setRecipient(javax.mail.Message.RecipientType.TO, to)
		// 设置邮件消息的主题
		String subject = "=?GB2312?B?" + new BASE64Encoder().
				encode(mail.subject.getBytes("iso-8859-1")) + "?="
		mailMessage.setSubject(subject)
		// 设置邮件消息发送的时间
		mailMessage.setSentDate(new Date())
		// MiniMultipart类是一个容器类，包含MimeBodyPart类型的对象
		Multipart mainPart = new MimeMultipart()
		// 创建一个包含HTML内容的MimeBodyPart
		BodyPart html = new MimeBodyPart()
		// 设置HTML内容
		html.setContent(this.templateService.mergeTemplate(
				mail.data, mail.template), "text/html; charset=gb2312")
		mainPart.addBodyPart(html)
		// 将MiniMultipart对象设置为邮件内容
		mailMessage.setContent(mainPart)
		// 发送邮件
		Transport.send(mailMessage)
	}

}
