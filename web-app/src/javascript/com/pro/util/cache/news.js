var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _u = _('nej.u'),
        _v = _('nej.v'),
        _j = _('nej.j'),
        _t = _('nej.ut'),
        _p = _('mu.ut'),
        _proCacheNews;
    /**
     * 活动缓存对象
     * 
     * 
     * 
     */
    _p._$$CacheNews = NEJ.C();
      _proCacheNews = _p._$$CacheNews._$extend(_p._$$Cache);
    /**
     * 
     */
    _proCacheNews.__doLoadList = function(_options){
    	var _key = _options.key;
        _j._$request('/rest/open/news/list',{
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
    _proCacheNews._$create = function(_data){
        var _url = '/rest/news/create';
        if (!!_data.nid){
            _url = '/rest/news/update';
        }
        _j._$request(_url,{
            type:'json',
            method:'POST',
            data:_u._$object2query(_data),
            onload:this._$dispatchEvent._$bind(this,'onnewscreate'),
            onerror:this._$dispatchEvent._$bind(this,'onnewscreate',_o)
        });
    };
    /**
     * 
     */
    _proCacheNews._$upload = function(_form){
        _form.action = '/rest/photo/upload';
        _j._$upload(_form,{
            type:'json',
            onload:this._$dispatchEvent._$bind(this,'onphotoupload'),
            onerror:this._$dispatchEvent._$bind(this,'onphotoupload',_o)
        });
    };
    /**
     * 
     */
    _proCacheNews._$delete = function(_data){
    	_j._$request('/rest/news/delete',{
            type:'json',
            method:'POST',
            data:_u._$object2query(_data),
            onload:this._$dispatchEvent._$bind(this,'onnewsdelete'),
            onerror:this._$dispatchEvent._$bind(this,'onnewsdelete',_o)
        });
    };
};
define('{com}util/cache/news.js',
      ['{com}util/api.js'
      ,'{com}util/cache/cache.js'],f);
