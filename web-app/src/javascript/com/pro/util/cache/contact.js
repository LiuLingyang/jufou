var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _u = _('nej.u'),
        _j = _('nej.j'),
        _p = _('mu.ut'),
        _proCacheContact;
    /**
     * 通讯录缓存对象
     * 
     */
    _p._$$CacheContact = NEJ.C();
      _proCacheContact = _p._$$CacheContact._$extend(_p._$$Cache);
    /**
     * 
     */
    _proCacheContact.__doLoadList = function(_options){
        var _key = _options.key;
        _j._$request('/rest/contact/list',{
            method:'POST',
            type:'json',
            data:_u._$object2query(_options.data),
            onload:this.__cbListLoad._$bind(this,_key,_options.onload),
            onerror:this.__cbListLoad._$bind(this,_key,_options.onload,_o)
        });
    };
    /**
     * 添加列表项至服务器，子类实现具体逻辑
     * @protected
     * @method {__doAddItem}
     * @param   {Object}   请求信息
     * @config  {String}   key      列表标识
     * @config  {Number}   id       列表项标识
     * @config  {String}   data     请求相关数据
     * @config  {Function} onload   列表项载入回调
     * @return {Void}
     */
    _proCacheContact.__doAddItem = function(_options){
        var _callback = _options.onload;
        _j._$request('/rest/contact/create',{
            type:'json',
            method:'POST',
            data:_u._$object2query(_options.data),
            onload:function(_json){
                _callback(_json.code==1?_json.result:null);
            },
            onerror:function(_json){
                _callback(null);
            }
        });
    };
    /**
     * 从服务器上删除列表项，子类实现具体逻辑
     * @protected
     * @method {__doDeleteItem}
     * @param   {Object}   请求信息
     * @config  {String}   key      列表标识
     * @config  {Number}   id       列表项标识
     * @config  {String}   data     请求相关数据
     * @config  {Function} onload   列表项载入回调
     * @return {Void}
     */
    _proCacheContact.__doDeleteItem = function(_options){
        var _callback = _options.onload;
        _j._$request('/rest/contact/delete',{
            type:'json',
            method:'POST',
            data:'cid='+encodeURIComponent(_options.id),
            onload:function(_json){
                _callback(_json.code==1);
            },
            onerror:function(_json){
                _callback(!1);
            }
        });
    };
    /**
     * 更新列表项至服务器，子类实现具体逻辑
     * @protected
     * @method {__doUpdateItem}
     * @param   {Object}   请求信息
     * @config  {String}   key      列表标识
     * @config  {Number}   id       列表项标识
     * @config  {String}   data     请求相关数据
     * @config  {Function} onload   列表项载入回调
     * @return {Void}
     */
    _proCacheContact.__doUpdateItem = function(_options){
        var _callback = _options.onload;
        _j._$request('/rest/contact/update',{
            type:'json',
            method:'POST',
            data:_u._$object2query(_options.data),
            onload:function(_json){
                _callback(_json.code==1?_json.result:null);
            },
            onerror:function(){
                _callback(null);
            }
        });
    };
    /**
     * 
     * @param {Object} _form
     */
    _proCacheContact._$import = function(_form){
        _form.action = '/rest/contact/import';
        _j._$upload(_form,{
            type:'json',
            method:'POST',
            onload:this._$dispatchEvent._$bind(this,'onimport'),
            onerror:this._$dispatchEvent._$bind(this,'onimport',_o)
        });
    };
    /**
     * 
     * @param {Object} _form
     */
    _proCacheContact._$gimport = function(_form,_gid){
        _form.action = '/rest/contact/import?gid='+_gid;
        _j._$upload(_form,{
            type:'json',
            method:'POST',
            onload:this._$dispatchEvent._$bind(this,'onimport'),
            onerror:this._$dispatchEvent._$bind(this,'onimport',_o)
        });
    };
};
define('{com}util/cache/contact.js',
      ['{com}util/cache/cache.js'],f);
