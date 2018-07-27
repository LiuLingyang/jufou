var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _u = _('nej.u'),
        _j = _('nej.j'),
        _p = _('mu.ut'),
        _proCacheMember;
    /**
     * 相册缓存管理
     * 
     * 
     */
    _p._$$CacheMember = NEJ.C();
      _proCacheMember = _p._$$CacheMember._$extend(_p._$$Cache);
    /**
     * 
     * @param {Object} _options
     */
    _proCacheMember.__doLoadList = function(_options){
        var _key = _options.key;
        _j._$request('/rest/group/members/',{
            method:'POST',
            type:'json',
            data:_u._$object2query(_options.data),
            onload:this.__cbListLoad._$bind(this,_key,_options.onload),
            onerror:this.__cbListLoad._$bind(this,_key,_options.onload,_o)
        });
    };
    
    _proCacheMember.__doFormatItem = function(_item,_lkey){
        if (_lkey.indexOf('iv-')>=0){
            var _user = _item.attendee;
            return {
                name:_user.nickname||_user.username,
                email:_user.email||'',
                mobile:_user.mobile||''
            };
        }
    };
    
    _proCacheMember._$admin = function(_data){
        _j._$request('/rest/group/role',{
            type:'json',
            method:'POST',
            data:_u._$object2query(_data),
            onload:this._$dispatchEvent._$bind(this,'onadmin'),
            onerror:this._$dispatchEvent._$bind(this,'onadmin',_o)
        });
    };
    
    _proCacheMember._$cocreate = function(_data){
        _j._$request('/rest/group/cocreate',{
            type:'json',
            method:'POST',
            data:_u._$object2query(_data),
            onload:this._$dispatchEvent._$bind(this,'oncocreate'),
            onerror:this._$dispatchEvent._$bind(this,'oncocreate',_o)
        });
    };
    
    _proCacheMember._$member = function(_data){
        _j._$request('/rest/group/check',{
            type:'json',
            method:'POST',
            data:_u._$object2query(_data),
            onload:this._$dispatchEvent._$bind(this,'onmember'),
            onerror:this._$dispatchEvent._$bind(this,'onmember',_o)
        });
    };
    
    _proCacheMember._$kickout = function(_data){
        _j._$request('/rest/group/kickout',{
            type:'json',
            method:'POST',
            data:_u._$object2query(_data),
            onload:this._$dispatchEvent._$bind(this,'onkickout'),
            onerror:this._$dispatchEvent._$bind(this,'onkickout',_o)
        });
    };
    
};
define('{com}util/cache/member.js',
      ['{com}util/cache/cache.js'],f);
