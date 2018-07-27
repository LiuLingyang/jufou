package com.meetup

import org.springframework.util.AntPathMatcher
import org.springframework.util.PathMatcher

class ConfigService extends AbstractService {

	private List<String> authURIs = null

	private List<String> publicURIs = null

	private List<String> restURIs = null

	private PathMatcher pathMatcher = new AntPathMatcher()

	private Map<String, List<String>> permissionExcludeActions = null

	private Map<String, List<String>> permissionIncludeActions = null

	private Map<String, List<String>> cacheIncludeActions = null

	private Map<String, List<String>> sortProperties = null

	public Map<String, List<String>> getSortProperties() {
		return this.sortProperties
	}

	public List<String> getSortProperties(String key) {
		if (!key) {
			return null
		}
		List<String> props = this.sortProperties.get(key)
		return props ? props : [key].toList()
	}

	public void setSortProperties(Map<String, List<String>> sortProperties) {
		this.sortProperties = sortProperties
	}

	public void setPermissionExcludeActions(Map<String, List<String>> permissionExcludeActions) {
		this.permissionExcludeActions = permissionExcludeActions
	}

	public void setPermissionIncludeActions(Map<String, List<String>> permissionIncludeActions) {
		this.permissionIncludeActions = permissionIncludeActions
	}

	public Map<String, List<String>> getCacheIncludeActions() {
		return this.cacheIncludeActions
	}

	public void setCacheIncludeActions(Map<String, List<String>> cacheIncludeActions) {
		this.cacheIncludeActions = cacheIncludeActions
	}

	public Map<String, List<String>> getPermissionExcludeActions() {
		return this.permissionExcludeActions
	}

	public Map<String, List<String>> getPermissionIncludeActions() {
		return this.permissionIncludeActions
	}

	public void setAuthURIs(List<String> authURIs) {
		this.authURIs = authURIs
	}

	public void setPublicURIs(List<String> publicURIs) {
		this.publicURIs = publicURIs
	}

	public void setRestURIs(List<String> restURIs) {
		this.restURIs = restURIs
	}

	private boolean _isGroupHomepage(String uri) {
		int length = Const.CONTEXT_PATH.length() + 1
		if (uri.length() <= length) {
			return false
		}
		uri = uri.substring(length)
		String[] uris = uri.split("/")
		boolean flag = AppUtil.isValidHomepage(uris[0])
		if (uris.length > 1) {
			flag = flag && (["", "index", "detail"].contains(uris[1]))
		}
		return flag
	}

	public boolean isAuthURI(String uri) {
		return this._isURIMatch(uri, this.authURIs)
	}

	private boolean _isShortLink(String uri) {
		int length = Const.CONTEXT_PATH.length() + 1
		if (uri.length() <= length) {
			return false
		}
		uri = uri.substring(length)
		String[] uris = uri.split("/")
		boolean flag = AppUtil.isShortLink(uris[0])
		if (uris.length > 1) {
			flag = flag && (uris[1] == "")
		}
		return flag
	}

	private boolean _isMeetingHomepage(String uri) {
		int length = Const.CONTEXT_PATH.length() + 1
		if (uri.length() <= length) {
			return false
		}
		uri = uri.substring(length)
		String[] uris = uri.split("/")
		boolean flag = AppUtil.isValidHomepage(uris[0]) &&
				uris[1] == "meeting"
		if (!flag || uris.length <= 2) {
			return false
		}
		if (uris[2] == "detail") {
			length = 4
			flag = flag && (uris[3] ==~ /^[1-9]\d*$/)
		} else if (uris[2] ==~ /^[1-9]\d*$/) {
			length = 3
		} else {
			return false
		}
		if (uris.length > length) {
			flag = flag && (uris[length] == "")
		}
		return flag
	}

	private boolean _isAlbumHomepage(String uri) {
		int length = Const.CONTEXT_PATH.length() + 1
		if (uri.length() <= length) {
			return false
		}
		uri = uri.substring(length)
		String[] uris = uri.split("/")
		boolean flag = AppUtil.isValidHomepage(uris[0]) && uris[1] == "album"
		if (uris.length > 2) {
			flag = flag && (uris[2] == "" || uris[2] ==~ /^[1-9]\d*$/)
		}
		return flag
	}

	private boolean _isNewsHomepage(String uri) {
		int length = Const.CONTEXT_PATH.length() + 1
		if (uri.length() <= length) {
			return false
		}
		uri = uri.substring(length)
		String[] uris = uri.split("/")
		boolean flag = AppUtil.isValidHomepage(uris[0]) && uris[1] == "news"
		if (uris.length > 2) {
			flag = flag && (uris[2] == "" || uris[2] ==~ /^[1-9]\d*$/)
		}
		return flag
	}

	private boolean _isShareHomepage(String uri) {
		int length = Const.CONTEXT_PATH.length() + 1
		if (uri.length() <= length) {
			return false
		}
		uri = uri.substring(length)
		String[] uris = uri.split("/")
		boolean flag = AppUtil.isValidHomepage(uris[0]) && uris[1] == "share"
		if (uris.length > 2) {
			flag = flag && (uris[2] == "" || uris[2] ==~ /^[1-9]\d*$/)
		}
		return flag
	}

	public boolean isPublicURI(String uri) {
		return this._isURIMatch(uri, this.publicURIs) || this._isGroupHomepage(uri) ||
				this._isMeetingHomepage(uri) || this._isAlbumHomepage(uri) ||
				this._isShortLink(uri) || this._isNewsHomepage(uri) ||
				this._isShareHomepage(uri)
	}

	public boolean isRestURI(String uri) {
		return this._isURIMatch(uri, this.restURIs)
	}

	private boolean _isURIMatch(String uri, List<String> uriPatterns) {
		if (uriPatterns == null) {
			return false
		}
		if (!uri.endsWith("/")) {
			uri += "/"
		}
		for (String ptn : uriPatterns) {
			if (this.pathMatcher.match(Const.CONTEXT_PATH + ptn, uri)) {
				return true
			}
		}
		return false
	}

}
