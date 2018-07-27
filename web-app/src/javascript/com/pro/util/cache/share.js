var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _u = _('nej.u'),
        _v = _('nej.v'),
        _j = _('nej.j'),
        _t = _('nej.ut'),
        _p = _('mu.ut'),
        _proCacheShare;
    /**
     * 活动缓存对象
     * 
     * 
     * 
     */
    _p._$$CacheShare = NEJ.C();
      _proCacheShare = _p._$$CacheShare._$extend(_p._$$Cache);
    /**
     * 
     */
    _proCacheShare.__doLoadList = function(_options){
    	var _key = _options.key;
        _j._$request('/rest/open/share/list',{
            method:'POST',
            type:'json',
            data:_u._$object2query(_options.data),
            onload:this.__cbListLoad._$bind(this,_key,_options.onload),
            onerror:this.__cbListLoad._$bind(this,_key,_options.onload,_o)
        });
    };
    /**
     * 发布活动
     * @return {Void}
     */
    _proCacheShare._$create = function(_data){
        var _url = '/rest/share/create';
        if (!!_data.sid){
            _url = '/rest/share/update';
        }
        _j._$request(_url,{
            type:'json',
            method:'POST',
            data:_u._$object2query(_data),
            onload:this._$dispatchEvent._$bind(this,'onsharecreate'),
            onerror:this._$dispatchEvent._$bind(this,'onsharecreate',_o)
        });
    };
    /**
     * 
     * @param {Object} _form
     */
    _proCacheShare._$upload = function(_form,_gid){
        _form.action = '/rest/photo/create?gid='+_gid;
        _j._$upload(_form,{
            type:'json',
            onload:this._$dispatchEvent._$bind(this,'onfileupload'),
            onerror:this._$dispatchEvent._$bind(this,'onfileupload',_o)
        });
    };
    /**
     * 
     */
    _proCacheShare._$delete = function(_data){
    	_j._$request('/rest/share/delete',{
            type:'json',
            method:'POST',
            data:_u._$object2query(_data),
            onload:this._$dispatchEvent._$bind(this,'onsharedelete'),
            onerror:this._$dispatchEvent._$bind(this,'onsharedelete',_o)
        });
    };
};
define('{com}util/cache/share.js',
      ['{com}util/api.js'
      ,'{com}util/cache/cache.js'],f);

