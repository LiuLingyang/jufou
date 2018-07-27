var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _u = _('nej.u'),
        _v = _('nej.v'),
        _j = _('nej.j'),
        _t = _('nej.ut'),
        _p = _('mu.ut'),
        _pro;
    /**
     * 活动缓存对象
     * 
     * 
     * 
     */
    _p._$$CacheVote = NEJ.C();
    _pro = _p._$$CacheVote._$extend(_p._$$Cache);
    /**
     * 
     */
    _pro.__doLoadList = function(_options){
        var _key = _options.key;
        _j._$request('/rest/open/vote/list',{
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
    _pro._$create = function(_data){
        var _url = '/rest/vote/create';
        if (!!_data.vid){
            _url = '/rest/vote/update';
        }
        _j._$request(_url,{
            type:'json',
            method:'POST',
            data:_u._$object2query(_data),
            onload:this._$dispatchEvent._$bind(this,'onvotecreate'),
            onerror:this._$dispatchEvent._$bind(this,'onvotecreate',_o)
        });
    };
    /**
     * 
     */
    _pro._$delete = function(_data){
    	_j._$request('/rest/vote/delete',{
            type:'json',
            method:'POST',
            data:_u._$object2query(_data),
            onload:this._$dispatchEvent._$bind(this,'onvotedelete'),
            onerror:this._$dispatchEvent._$bind(this,'onvotedelete',_o)
        });
    };
    /**
     * 
     */
    _pro._$close = function(_data){
        _j._$request('/rest/vote/close',{
            type:'json',
            method:'POST',
            data:_u._$object2query(_data),
            onload:this._$dispatchEvent._$bind(this,'onvoteclose'),
            onerror:this._$dispatchEvent._$bind(this,'onvoteclose',_o)
        });
    };
    /**
     * 
     */
    _pro._$vote = function(_data){
        _j._$request('/rest/vote/cast',{
            type:'json',
            method:'POST',
            data:_u._$object2query(_data),
            onload:this._$dispatchEvent._$bind(this,'onvote'),
            onerror:this._$dispatchEvent._$bind(this,'onvote',_o)
        });
    };
};
define('{com}util/cache/vote.js',
      ['{com}util/api.js'
      ,'{com}util/cache/cache.js'],f);
