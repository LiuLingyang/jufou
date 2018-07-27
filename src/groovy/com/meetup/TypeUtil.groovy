package com.meetup

import org.codehaus.groovy.grails.commons.GrailsClass
import org.hibernate.MappingException

import javax.annotation.Resource
import java.lang.reflect.Field
import java.lang.reflect.Type

class TypeUtil {

	static grailsApplication

	@Resource
	public void setGrailsApplication(grailsApplication) {
		TypeUtil.grailsApplication = grailsApplication
	}

	public static Class getArtefactClass(String type, String name) {
		return grailsApplication.getArtefactByLogicalPropertyName(
				type, name).clazz
	}

	public static GrailsClass[] getArtefacts(String type) {
		return grailsApplication.getArtefacts(type)
	}

	public static Class getGenericType(Field field) {
		Class type = field.type
		if (!Collection.class.isAssignableFrom(type)) {
			return type
		}
		Type genericType = field.genericType.actualTypeArguments[0]
		return genericType instanceof Class ? genericType : null
	}

	public static String getTableColumn(sessionFactory, clazz, property) {
		def domainClass = grailsApplication.getClassForName(clazz.getName())
		def hibernateMetaClass = sessionFactory.getClassMetadata(domainClass)
//		def tableName = hibernateMetaClass.getTableName()
//		def grailsDomainClass = new DefaultGrailsDomainClass(domainClass)
//		grailsDomainClass.getProperties().each { prop ->
//			String propName = prop.getName()
//			def columnProps = hibernateMetaClass.getPropertyColumnNames(propName)
//			if (columnProps && columnProps.length > 0) {
//				String columnName = columnProps[0]
//			}
//		}
		try {
			def columnProps = hibernateMetaClass.getPropertyColumnNames(property)
			if (columnProps && columnProps.length > 0) {
				return columnProps[0]
			}
		} catch (MappingException ex) {
			return null
		}
		return property
	}

}
