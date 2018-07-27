package com.meetup

import freemarker.template.TemplateMethodModelEx
import freemarker.template.TemplateModel
import freemarker.template.TemplateModelException
import freemarker.template.utility.DeepUnwrap

//class DateUtil implements TemplateMethodModel {
//
//	public Object exec(List args) throws TemplateModelException {
//		if (args.size() != 2) {
//			throw new TemplateModelException("Wrong arguments")
//		}
//		if (args.get(1).toString().toLowerCase() == "week") {
//			return new Date(args.get(0).toLong()).getAt(Calendar.DAY_OF_WEEK)
//		}
//		return args.get(0)
//	}
//
//}

class DateUtil implements TemplateMethodModelEx {

	public Object exec(List args) throws TemplateModelException {
		if (args.size() != 2) {
			throw new TemplateModelException("Wrong arguments")
		}
		long date = (Long) DeepUnwrap.unwrap((TemplateModel) args.get(0))
		String type = (String) DeepUnwrap.unwrap((TemplateModel) args.get(1))
		if (type.toLowerCase() == "week") {
			return new Date(date).getAt(Calendar.DAY_OF_WEEK)
		}
		return date
	}

}