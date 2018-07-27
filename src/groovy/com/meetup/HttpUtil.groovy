package com.meetup

import org.apache.commons.httpclient.HttpClient
import org.apache.commons.httpclient.HttpMethodBase
import org.apache.commons.httpclient.methods.GetMethod
import org.apache.commons.httpclient.methods.PostMethod

/**
 * Created with IntelliJ IDEA.
 * User: zjulyy
 * Date: 13-1-7
 * Time: 下午7:21
 * To change this template use File | Settings | File Templates.
 */
class HttpUtil {

	public static String executeRequest(url, get = true) {
		HttpClient client = new HttpClient()
		HttpMethodBase method = get ? new GetMethod(url) : new PostMethod(url)
		try {
			client.executeMethod(method)
			if (method.getStatusCode() > 300) {
				return null
			}
			return method.getResponseBodyAsString()
		} catch (Exception ex) {
			ex.printStackTrace()
			return null
		} finally {
			method.releaseConnection()
		}
	}

}
