var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _u = _('nej.u'),
        _j = _('nej.j'),
        _p = _('mu.ut'),
        _proCacheSetting;
    /**
     * 活动缓存对象
     * 
     * 
     * 
     */
    _p._$$CacheSetting = NEJ.C();
      _proCacheSetting = _p._$$CacheSetting._$extend(_p._$$Cache);
    /**
     * 
     */
    _proCacheSetting.__doLoadList = (function(){
        var _nmap = {
                meeting:'/rest/meeting/list',
                user:'/rest/meeting/attendees'
            };
        return function(_options){
            return;
            var _key = _options.key,
                _flg = _key.split('-')[0];
            _j._$request(_nmap[_flg],{
                method:'POST',
                type:'json',
                data:_u._$object2query(_options.data),
                onload:this.__cbListLoad._$bind(this,_key,_options.onload),
                onerror:this.__cbListLoad._$bind(this,_key,_options.onload,_o)
            });
        };
    })();
    
    
    
    
};
define('{com}util/cache/setting.js',
      ['{com}util/cache/cache.js'],f);
