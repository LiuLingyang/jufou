package com.meetup

import freemarker.template.TemplateMethodModelEx
import freemarker.template.TemplateModel
import freemarker.template.TemplateModelException
import freemarker.template.utility.DeepUnwrap
import grails.converters.JSON

class JsonUtil implements TemplateMethodModelEx {

	public Object exec(List args) throws TemplateModelException {
		if (args.size() != 1) {
			throw new TemplateModelException("Wrong arguments")
		}
		TemplateModel templateModel = (TemplateModel) args.get(0)
		if (templateModel == null) {
			return null;
		}
		return DeepUnwrap.unwrap(templateModel) as JSON
	}

}