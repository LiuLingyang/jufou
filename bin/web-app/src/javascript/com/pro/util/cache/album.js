var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _u = _('nej.u'),
        _j = _('nej.j'),
        _p = _('mu.ut'),
        _proCacheAlbum;
	/**
	 * 相册缓存管理
	 * 
	 * 
	 */
    _p._$$CacheAlbum = NEJ.C();
      _proCacheAlbum = _p._$$CacheAlbum._$extend(_p._$$Cache);
	
	/**
	 * 
     * @param {Object} _options
	 */
	_proCacheAlbum.__doLoadList = function(_options){
	    var _key = _options.key,
	        _url = _key.indexOf('album')==0
	             ? '/rest/album/list'
	             : '/rest/photo/list';
        _j._$request(_url,{
            method:'POST',
            type:'json',
            data:_u._$object2query(_options.data),
            onload:this.__cbListLoad._$bind(this,_key,_options.onload),
            onerror:this.__cbListLoad._$bind(this,_key,_options.onload,_o)
        });	};
    /**
     * 添加列表项至服务器
     * @protected
     * @method  {__doAddItem}
     * @param   {Object}   请求信息
     * @config  {String}   key      列表标识
     * @config  {String}   item     请求相关数据
     * @config  {Function} onload   列表项载入回调
     * @return  {Void}
     */
    _proCacheAlbum.__doAddItem = function(_options){
        var _key = _options.key;
        if (_key.indexOf('album')>=0){
            _j._$request('/rest/album/create',{
                method:'POST',
                type:'json',
                data:_u._$object2query(_options.item),
                onload:this.__cbItemAdd._$bind(this,_options.onload),
                onerror:this.__cbItemAdd._$bind(this,_options.onload,_o)
            });
            return;
        }
        _options.item.action = '/rest/photo/create';
        _j._$upload(_options.item,{
            type:'json',
            onload:this.__cbItemAdd._$bind(this,_options.onload),
            onerror:this.__cbItemAdd._$bind(this,_options.onload,_o)
        });    };
	/**
	 * 
     * @param {Object} 
     * @param {Object} 
     * @param {Object} 
	 */
	_proCacheAlbum.__cbItemAdd = function(_callback,_json){
	    _callback(_json.code==1?_json.result:null);
	};
    /**
     * 删除列表项至服务器
     * @protected
     * @method  {__doAddItem}
     * @param   {Object}   请求信息
     * @config  {String}   key      列表标识
     * @config  {String}   item     请求相关数据
     * @config  {Function} onload   列表项载入回调
     * @return  {Void}
     */
    _proCacheAlbum.__doDeleteItem = function(_options){
        var _key = _options.key,
            _url = _key.indexOf('album')>=0
                 ? '/rest/album/delete'
                 : '/rest/photo/delete';
        _j._$request(_url,{
            method:'POST',
            type:'json',
            data:_u._$object2query(_options.data),
            onload:this.__cbItemDelete._$bind(this,_options.onload),
            onerror:this.__cbItemDelete._$bind(this,_options.onload,_o)
        });
    };
    /**
     * 
     * @param {Object} 
     * @param {Object} 
     * @param {Object} 
     */
    _proCacheAlbum.__cbItemDelete = function(_callback,_json){
        _callback(_json.code==1?_json.result:null);
    };
	/**
	 * 
     * @param {Object} _album
	 */
	_proCacheAlbum._$updateAlbum = function(_album){
	    _j._$request('/rest/album/update',{
            type:'json',
            method:'POST',
            data:_u._$object2query(_album),
            onload:this._$dispatchEvent._$bind(this,'onalbumupdate'),
            onerror:this._$dispatchEvent._$bind(this,'onalbumupdate',_o)
        });
	};
	/**
	 * 
     * @param {Object} _data
	 */
	_proCacheAlbum._$movePhoto = function(_data){
	    _j._$request('/rest/photo/move',{
            type:'json',
            method:'POST',
            data:_u._$object2query(_data),
            onload:this._$dispatchEvent._$bind(this,'onphotomove'),
            onerror:this._$dispatchEvent._$bind(this,'onphotomove',_o)
        });
	};
};
define('{com}util/cache/album.js',
      ['{com}util/cache/cache.js'],f);
