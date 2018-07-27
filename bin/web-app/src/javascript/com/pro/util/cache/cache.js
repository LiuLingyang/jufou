var f = function(){
    var _  = NEJ.P,
        _r = NEJ.R,
        _u = _('nej.u'),
        _t = _('nej.ut'),
        _p = _('mu.ut'),
        _proCache;
    /**
     * 项目缓存基类
     *  
     */
    _p._$$Cache = NEJ.C();
      _proCache = _p._$$Cache._$extend(_t._$$AbstractListCache);
    
    /**
     * 
     * @param {Object} _callback
     * @param {Object} _json
     */
    _proCache.__cbListLoad = function(_key,_callback,_json){
        var _list = null;
        if (_json.code==1){
            var _result = _json.result;
            if (_result.total>(_result.list||_r).length)
                this._$setTotal(_key,_result.total);
            _list = _result.list||[];
            var _rmap = _result.relation;
            if (_json.code==1&&!!_rmap){
                _u._$forEach(_list,
                    function(_item){
                        _item.role = _rmap[_item.id]||1;
                    }
                );
            }
        }
        _callback(_list);
    };
};
define('{com}util/cache/cache.js',
      ['{lib}base/util.js'
      ,'{lib}util/ajax/xdr.js'
      ,'{lib}util/cache/cache.list.base.js'],f);
