package com.meetup;

import javax.servlet.*;
import java.io.IOException;

/**
 * Created with IntelliJ IDEA.
 * User: zjulyy
 * Date: 13-6-30
 * Time: 下午2:33
 * To change this template use File | Settings | File Templates.
 */
public class BrowserCacheFilter implements Filter {

	private FilterConfig fc = null;

	public void doFilter(ServletRequest req, ServletResponse res,
						 FilterChain chain) throws IOException, ServletException {
		BrowserCache.setBrowserCachingPolicy(req, res, true, true);
		chain.doFilter(req, res);
	}

	public void init(FilterConfig filterConfig) {
		this.fc = filterConfig;
	}

	public void destroy() {
		this.fc = null;
	}

}