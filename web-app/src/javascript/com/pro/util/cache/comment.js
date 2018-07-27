var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _u = _('nej.u'),
        _j = _('nej.j'),
        _p = _('mu.ut'),
        _proCacheComment;
    /**
     * 相册缓存管理
     * 
     * 
     */
    _p._$$CacheComment = NEJ.C();
      _proCacheComment = _p._$$CacheComment._$extend(_p._$$Cache);
    /**
     * 控件重置
     * 
     */
    _proCacheComment.__reset = function(_options){
        this.__supReset(_options);
        this.__oid = _options.oid;
        this.__type = _options.type;
    };
    /**
     * 
     * @param {Object} _options
     */
    _proCacheComment.__doLoadList = function(_options){
        var _key = _options.key,
            _data = _options.data;
        _data.oid = this.__oid;
        _data.type = this.__type;
        _j._$request('/rest/comment/list',{
            method:'POST',
            type:'json',
            data:_u._$object2query(_data),
            onload:this.__cbListLoad._$bind(this,_key,_options.onload),
            onerror:this.__cbListLoad._$bind(this,_key,_options.onload,_o)
        });
    };
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
    _proCacheComment.__doAddItem = function(_options){
        var _key = _options.key,
            _item = _options.item||{};
        _item.oid = this.__oid;
        _item.type = this.__type;
        _j._$request(
            _options.type=='add'
            ?'/rest/comment/add'
            :'/rest/comment/reply',{
            method:'POST',
            type:'json',
            data:_u._$object2query(_item),
            onload:this.__cbItemAdd._$bind(this,_options.onload,_options),
            onerror:this.__cbItemAdd._$bind(this,_options.onload,_o)
        });
    };
    /**
     * 
     * @param {Object} 
     * @param {Object} 
     * @param {Object} 
     */
    _proCacheComment.__cbItemAdd = function(_callback,_options,_json){
    	_options.ext = _json.code;
        _callback(_json.code==1?_json.result:null);
    };
    /**
     * 删除列表项至服务器
     * @protected
     * @method  {__doDeleteItem}
     * @param   {Object}   请求信息
     * @config  {String}   key      列表标识
     * @config  {String}   item     请求相关数据
     * @config  {Function} onload   列表项载入回调
     * @return  {Void}
     */
    _proCacheComment.__doDeleteItem = function(_options){
    	var _key = _options.key,
            _item = {
            	cid:_options.data.id
            };
        _j._$request('/rest/comment/delete',{
            method:'POST',
            type:'json',
            data:_u._$object2query(_item),
            onload:this.__cbItemDelete._$bind(this,_options.onload),
            onerror:this.__cbItemDelete._$bind(this,_options.onload,_o)
        });
    };
    /**
     * 
	 * @param {Object} _callback
	 * @param {Object} _json
     */
    _proCacheComment.__cbItemDelete = function(_callback,_json){
    	_callback(_json.code==1);
    };
    /**
     * 
     * @param {Object} _form
     */
    _proCacheComment._$upload = function(_form){
        _form.action = '/rest/photo/create';
        _j._$upload(_form,{
            type:'json',
            onload:this._$dispatchEvent._$bind(this,'onfileupload'),
            onerror:this._$dispatchEvent._$bind(this,'onfileupload',_o)
        });
    };
};
define('{com}util/cache/comment.js',
      ['{com}util/cache/cache.js'],f);
