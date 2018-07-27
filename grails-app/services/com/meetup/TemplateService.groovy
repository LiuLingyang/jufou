package com.meetup

import freemarker.core.Configurable
import freemarker.template.Configuration
import freemarker.template.DefaultObjectWrapper
import freemarker.template.Template
import freemarker.template.TemplateException
import org.springframework.core.io.Resource

class TemplateService extends AbstractService {

	private Configuration cfg = new Configuration();

	public void setResource(Resource resource) throws IOException {
		this.cfg.setDirectoryForTemplateLoading(resource.getFile())
	}

	public String mergeTemplate(Map dataMap, String templateFilename)
	throws TemplateException, IOException {
		return this.mergeTemplate(dataMap, templateFilename,
				Const.DEFAULT_ENCODING)
	}

	public String mergeTemplate(Map dataMap, String templateFilename,
								String encoding) throws TemplateException, IOException {
		this.cfg.setObjectWrapper(new DefaultObjectWrapper())
		this.cfg.setSetting(Configurable.NUMBER_FORMAT_KEY, "###0.##")
		this.cfg.setDefaultEncoding(encoding)
		Template temp = this.cfg.getTemplate(templateFilename)
		StringWriter writer = new StringWriter()
		temp.process(dataMap, writer)
		writer.flush()
		return writer.toString()
	}

	public void outTemplate(Map dataMap, String templateFilename, Writer out)
	throws TemplateException, IOException {
		this.outTemplate(dataMap, templateFilename, out,
				Const.DEFAULT_ENCODING)
	}

	public void outTemplate(Map dataMap, String templateFilename, Writer out,
							String encoding) throws TemplateException, IOException {
		this.cfg.setObjectWrapper(new DefaultObjectWrapper())
		this.cfg.setSetting(Configurable.NUMBER_FORMAT_KEY, "###0.##")
		this.cfg.setDefaultEncoding(encoding)
		Template temp = this.cfg.getTemplate(templateFilename)
		temp.process(dataMap, out)
		out.flush()
	}

}
