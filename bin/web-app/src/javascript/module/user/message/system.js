var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _u = _('nej.u'),
        _y = _('nej.ui'),
        _x = _('nej.ut'),
        _t = _('mu.ut'),
        _p = _('mu.m.u'),
        _proModuleMessageSystem,
        _supModuleMessageSystem;
    /**
     * 组织模块基类
     * 
     * 
     */
    _p._$$ModuleMessageSystem = NEJ.C();
      _proModuleMessageSystem = _p._$$ModuleMessageSystem._$extend(_p._$$ModuleMessageList);
      _supModuleMessageSystem = _p._$$ModuleMessageSystem._$supro;
    /**
     * 
     */
    _proModuleMessageSystem.__doBuild = function(){
        this.__mkey = 'txt-mdl-system';
        this.__skey = 'jst-list-system';
        this.__data = {type:3};
        _supModuleMessageSystem.__doBuild.call(this);
    };
};
define('{pro}module/user/message/system.js',
      ['{pro}module/user/message/list.js'],f);
