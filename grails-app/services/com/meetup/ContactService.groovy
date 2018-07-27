package com.meetup

import org.apache.commons.lang.StringUtils
import org.apache.poi.hssf.usermodel.HSSFWorkbook
import org.apache.poi.ss.usermodel.Cell
import org.apache.poi.ss.usermodel.Row
import org.apache.poi.ss.usermodel.Sheet
import org.apache.poi.ss.usermodel.Workbook
import org.apache.poi.xssf.usermodel.XSSFWorkbook
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.multipart.MultipartFile

import javax.annotation.Resource
import javax.servlet.ServletRequest
import java.text.DecimalFormat

@Transactional
class ContactService extends AbstractService {

	@Resource
	def templateService

	@Resource
	def userService

	def orders

	public void init() {
		this.orders = AppUtil.encodeAsGBK(this.grailsApplication.config.
				app.contacts.orders).split(";").toList()
	}

	@Transactional(readOnly = true)
	def getContact(cid) {
		return Contact.findById(cid)
	}

	def deleteContact(cid) {
		Contact contact = Contact.lock(cid)
		contact.delete()
		return contact
	}

	@Transactional(readOnly = true)
	def listContactsByTarget(target, args) {
		return target instanceof Group ? GContact.findAllByGroup(target, args)
				: UContact.findAllByOwner(target, args)
	}

	@Transactional(readOnly = true)
	def countContacts(callable, type) {
		return type == Group.class ? GContact.createCriteria().count(callable)
				: UContact.createCriteria().count(callable)
	}

	@Transactional(readOnly = true)
	def listContacts(callable, type, offset = null, limit = null,
					 sort = null, order = null) {
		def args = this._criteriaArgs(offset, limit, sort, order)
		def contacts = type == Group.class ? GContact.createCriteria().list(args, callable)
				: UContact.createCriteria().list(args, callable)
		this._registered(contacts)
		return contacts
	}

	private _registered(contacts) {
		if (!contacts || contacts.size() == 0) {
			return
		}
		def callable = {
			projections {
				distinct("username")
			}
			inList("username", contacts?.findAll { contact ->
				StringUtils.isNotBlank(contact.email)
			}*.email + contacts?.findAll { contact ->
				StringUtils.isNotBlank(contact.mobile)
			}*.mobile)
		}
		def users = this.userService.listUsers(callable)
		contacts.each { contact ->
			if (users.contains(contact.email) ||
					users.contains(contact.mobile)) {
				contact.registered = true
			}
		}
	}

	def updateContact(cid, params) {
		Contact contact = Contact.lock(cid)
		AppUtil.merge(contact, params)
		contact.save()
		return contact
	}

	def getFilename(filename, type) {
		switch (type) {
			case "TXT":
				filename += ".txt"
				break
			case "CSV":
				filename += ".csv"
				break
			case "VCARD":
				filename += ".vcf"
				break
			case "EXCEL":
				filename += ".xls"
				break
			default:
				return null
		}
		return filename
	}

	@Transactional(readOnly = true)
	public void exports(List<Contact> contacts, String type,
						OutputStream outputStream) {
		switch (type) {
			case "TXT":
			case "CSV":
			case "VCARD":
//				Map<String, Object> data = new HashMap<String, Object>()
				def data = [:]
				data.put("fileType", type)
				data.put("contacts", contacts)
				Writer out = new OutputStreamWriter(outputStream)
				try {
					this.templateService.outTemplate(data, "contact/contacts.ftl", out)
				} finally {
					out.close()
					outputStream.close()
				}
				break
			case "EXCEL":
				Workbook wb = new HSSFWorkbook()
				Sheet sheet = wb.createSheet()
				int index = 0
				Row title = sheet.createRow(index++)
				for (int i = 0; i < this.orders.size(); i++) {
					title.createCell(i).setCellValue(this.orders[i])
				}
				contacts.each { contact ->
					Row row = sheet.createRow(index++)
					row.createCell(0).setCellValue(contact.name)
					row.createCell(1).setCellValue(contact.mobile)
					row.createCell(2).setCellValue(contact.email)
					row.createCell(3).setCellValue(contact.qq)
					row.createCell(4).setCellValue(contact.company)
				}
				try {
					wb.write(outputStream)
				} finally {
					outputStream.close()
				}
				break
		}
	}

	@Transactional(readOnly = true)
	public void exportanswers(List questions,List results, String type,
						OutputStream outputStream) {
		switch (type) {
			/*case "TXT":
			case "CSV":
			case "VCARD":
//				Map<String, Object> data = new HashMap<String, Object>()
				def data = [:]
				data.put("fileType", type)
				data.put("contacts", contacts)
				Writer out = new OutputStreamWriter(outputStream)
				try {
					this.templateService.outTemplate(data, "contact/contacts.ftl", out)
				} finally {
					out.close()
					outputStream.close()
				}
				break*/
			case "EXCEL":
				Workbook wb = new HSSFWorkbook()
				Sheet sheet = wb.createSheet()
				int index = 0
				Row title = sheet.createRow(index++)
				title.createCell(0).setCellValue("Nickname")
				title.createCell(1).setCellValue("Attend_Time")
				for (int i = 2; i < 7; i++) {
					title.createCell(i).setCellValue(questions[i-2])
				}
				results.each { result ->
					Row row = sheet.createRow(index++)
					row.createCell(0).setCellValue(result.nickname)
					row.createCell(1).setCellValue(new Date(result.attendTime).format('yyyy-MM-dd HH:mm:ss'));
					for (int i=2;i<7;i++){
						row.createCell(i).setCellValue(result.answers[i-2])
					}
				}
				try {
					wb.write(outputStream)
				} finally {
					outputStream.close()
				}
				break
		}
	}

	private _buildContact(target, name, mobile, email, qq, company) {
		Contact contact = target instanceof Group ?
				new GContact(group: target) : new UContact(owner: target)
		contact.name = name
		contact.mobile = mobile ? mobile : ""
		contact.email = email ? email : ""
		contact.qq = qq
		contact.company = company
		return contact
	}

	private _buildContact(target, items, indexes) {
		return this._buildContact(target, items[indexes[0]],
				indexes[1] > -1 ? items[indexes[1]] : "",
				indexes[2] > -1 ? items[indexes[2]] : "",
				indexes[3] > -1 ? items[indexes[3]] : "",
				indexes[4] > -1 ? items[indexes[4]] : "")
	}

//	def _buildIndexes(items) {
//		if (!items) {
//			return null
//		}
//		if (items.size() < 2) {
//			return [0, 0]
//		} else if (items.size() == 2) {
//			if (items[1]?.indexOf("@") > 0) {
//				return [0, 1]
//			}
//			if (items[1] ==~ /^\d{1,}$/) {
//				return [1, 0]
//			}
//		} else {
//			if (items[1]?.indexOf("@") > 0 || items[2] ==~ /^\d{1,}$/) {
//				return [2, 1]
//			}
//			if (items[1] ==~ /^\d{1,}$/ || items[2]?.indexOf("@") > 0) {
//				return [1, 2]
//			}
//		}
//		return null
//	}

	private _buildIndexes(items) {
		if (!items || items.size() == 0) {
			return null
		}
		def indexes = []
		this.orders.each { order ->
			int i = 0
			for (; i < items.size(); i++) {
				if (items[i] && order.indexOf(items[i].toUpperCase()) > -1) {
					break
				}
			}
			indexes += i < this.orders.size() ? i : -1
		}
		return indexes.sum() == -1 * this.orders.size() ? null : indexes
	}

	private _getCellValue(cell) {
		return !cell ? null : (cell.getCellType() == Cell.CELL_TYPE_NUMERIC ?
				new DecimalFormat("#").format(cell.getNumericCellValue()) :
				(!(cell.getStringCellValue()) ? null : cell.getStringCellValue().trim()))
	}

//	public int imports(User user, Set set, File local) {
	public int imports(Object target, MultipartFile file,
					   ServletRequest request, String root) {
		String path = target.getClass().getSimpleName().toLowerCase()
		String url = this._upload(file, request, root, path, target.id, null, true)
		String realPath = request.getRealPath(root)
		path = realPath.substring(0, realPath.lastIndexOf(
				File.separator)) + url.replace("/", File.separator)
		File local = new File(path)
		def contacts = []
		try {
			def indexes = null
			if (local.getName().endsWith(".txt")) {
				local.eachLine("GBK") { line ->
					line = line.trim()
					if (line != "") {
						def items = line?.split(/\s+/)?.toList()?.collect {
							it.trim()
						}
						if (!indexes) {
							indexes = this._buildIndexes(items)
						} else {
							contacts += this._buildContact(target, items, indexes)
						}
					}
				}
			} else if (local.getName().endsWith(".csv")) {
				local.eachLine("GBK") { line ->
					line = line.trim()
					if (line != "") {
						def items = line?.split(",", 5)?.toList()?.collect {
							it.trim()
						}
						if (!indexes) {
							indexes = this._buildIndexes(items)
						} else {
							contacts += this._buildContact(target, items, indexes)
						}
					}
				}
			} else if (local.getName().endsWith(".vcf")) {
				int state = 0
				String name = null
				def mobiles = []
				def emails = []
				local.eachLine { line ->
					line = line.trim()
					if (line.matches("BEGIN[\\s]*:[\\s]*(VCARD|vcard)")) {
						state = 1
						mobiles.clear()
						emails.clear()
					} else if (line.matches("END[\\s]*:[\\s]*(VCARD|vcard)") && state == 1) {
						//到达结束符且联系人有效时，加入队列中
						if (name && name != "") {
							state = 2
							boolean isMobiles = mobiles.size() > emails.size()
							int j = isMobiles ? emails.size() : mobiles.size()
							for (int i = 0; i < j; i++) {
								contacts += this._buildContact(target, name,
										mobiles[i], emails[i], "", "")
							}
							int k = isMobiles ? mobiles.size() : emails.size()
							for (int i = j; i < k; i++) {
								contacts += this._buildContact(target, name,
										isMobiles ? mobiles[i] : "",
										isMobiles ? "" : emails[i], "", "")
							}
						} else {
							//当到达结束符且当前联系人非法时，跳过当前联系人，重新开始解析
							state = 0
						}
					} else if (state == 1) {
						if (line.startsWith("FN:")) {
							name = line.replaceFirst("FN:", "").trim()
						} else if (line.startsWith("TEL;")) {
							String mobile = line.replaceFirst("TEL;", "").trim()
							if (mobile && mobile != "") {
								mobiles += mobile
							}
						} else if (line.startsWith("EMAIL;")) {
							String email = line.replaceFirst("EMAIL;", "").trim()
							if (email && email != "") {
								emails += email
							}
						}
					}
				}
			} else if (local.getName().endsWith(".xls")
					|| local.getName().endsWith(".xlsx")) {
				InputStream is = new FileInputStream(local)
				try {
					Workbook wb = local.getName().endsWith(".xls") ?
							new HSSFWorkbook(is) : new XSSFWorkbook(is)
					Sheet sheet = wb.getSheetAt(0)
					for (Row row : sheet) {
						def items = [this._getCellValue(row.getCell(0)),
								this._getCellValue(row.getCell(1)),
								this._getCellValue(row.getCell(2)),
								this._getCellValue(row.getCell(3)),
								this._getCellValue(row.getCell(4))]
						if (!indexes) {
							indexes = this._buildIndexes(items)
						} else {
							contacts += this._buildContact(target, items, indexes)
						}
					}
				} finally {
					is.close()
				}
			} else {
				return Const.UNKNOWN_FORMAT
			}
		} catch (Exception ex) {
			ex.printStackTrace()
			return Const.FAIL
		} finally {
			local.delete()
		}
		def exists = (target instanceof Group ? GContact.findAllByGroup(target) :
				UContact.findAllByOwner(target))?.collect { contact ->
			this._contact2String(contact)
		}
		int total = 0
		contacts?.each { contact ->
			if (!exists.contains(this._contact2String(contact))) {
				this.saveContact(contact)
				total++
			}
		}
		return total
	}

	private _contact2String(contact) {
		return contact.name?.trim() + ":" + contact.mobile?.trim() +
				":" + contact.email?.trim()
	}

	def saveContact(contact) {
		contact.save()
	}

}
