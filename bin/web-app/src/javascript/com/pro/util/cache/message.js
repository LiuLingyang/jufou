var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _u = _('nej.u'),
        _j = _('nej.j'),
        _p = _('mu.ut'),
        _proCacheMessage;
    /**
     * 相册缓存管理
     * 
     * 
     */
    _p._$$CacheMessage = NEJ.C();
      _proCacheMessage = _p._$$CacheMessage._$extend(_p._$$Cache);
    /**
     * 
     * @param {Object} _options
     */
    _proCacheMessage.__doLoadList = (function(){
        var _urls = {
             '/m/3/':'/rest/message/getInformList',
             '/m/5/':'/rest/message/getPrivateList'
        };
        return function(_options){
            var _key = _options.key,
                _xey = _key.split('-')[0];
            _j._$request(_urls[_xey]||'/rest/message/list',{
                method:'POST',
                type:'json',
                data:_u._$object2query(_options.data),
                onload:this.__cbListLoad._$bind(this,_key,_options.onload),
                onerror:this.__cbListLoad._$bind(this,_key,_options.onload,_o)
            });
        };
    })();
    /**
     * 
     * @param {Object} _data
     */
    _proCacheMessage._$message = function(_data){
        _j._$request('/rest/message/private',{
            type:'json',
            method:'POST',
            data:_u._$object2query(_data),
            onload:this._$dispatchEvent._$bind(this,'onmessage'),
            onerror:this._$dispatchEvent._$bind(this,'onmessage',_o)
        });
    };
    
    
};
define('{com}util/cache/message.js',
      ['{com}util/cache/cache.js'],f);
