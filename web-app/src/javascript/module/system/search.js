var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _u = _('nej.u'),
        _y = _('nej.ui'),
        _x = _('nej.ut'),
        _z = _('mu.x'),
        _t = _('mu.ut'),
        _p = _('mu.m.g'),
        _proModuleSearch;
    /**
     * 组织模块基类
     * 
     * 
     */
    _p._$$ModuleSearch = NEJ.C();
      _proModuleSearch = _p._$$ModuleSearch._$extend(_t._$$Module);
    /**
     * 
     */
    _proModuleSearch.__reset = function(_options){
        this.__supReset(_options);
        var _obj1 = _u._$query2object(location.hash.substr(1)),
            _obj2 = _u._$query2object(location.search.substr(1));
        _obj1 = NEJ.X(_obj1||{},_obj2);
        /*
        if (!_obj1.p) _obj1.p = this.__iptable.province||'';
        if (!_obj1.c) _obj1.c = this.__iptable.city||'';
        if (!_obj1.a) _obj1.a = this.__iptable.district||'';
        */
        var _time = parseInt(_obj1.t)||0,
            _mumi = !_time?'/?/m/group/':'/?/m/meeting/';
        dispatcher._$redirect(_mumi+'?'+_u._$object2query(_obj1));
    };
    /**
     * 控件初始化
     * @return {Void}
     */
    _proModuleSearch.__doBuild = function(){
        _z._$bindScrollTop('www-jufou-com-top');
        window.dispatcher = _x._$$Dispatcher
              ._$getInstance()._$regist({
                  '/?/m':_p._$$ModuleSearchFrame,
                  '/?/m/group/':{gid:'abc',module:_p._$$ModuleSearchGroup},
                  '/?/m/meeting/':{gid:'abc',module:_p._$$ModuleSearchMeeting}
              });
    };
};
define('{pro}module/system/search.js',
      ['{pro}module/system/search/frame.js'
      ,'{pro}module/system/search/group.js'
      ,'{pro}module/system/search/meeting.js'
      ,'{lib}util/dispatcher/dispatcher.2.js'],f);
