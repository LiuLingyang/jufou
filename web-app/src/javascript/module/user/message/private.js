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
        _proModuleMessagePrivate,
        _supModuleMessagePrivate;
    /**
     * 组织模块基类
     * 
     * 
     */
    _p._$$ModuleMessagePrivate = NEJ.C();
      _proModuleMessagePrivate = _p._$$ModuleMessagePrivate._$extend(_p._$$ModuleMessageList);
      _supModuleMessagePrivate = _p._$$ModuleMessagePrivate._$supro;
    /**
     * 
     */
    _proModuleMessagePrivate.__doBuild = function(){
        this.__mkey = 'txt-mdl-private';
        this.__skey = 'jst-list-private';
        this.__data = {};
        _supModuleMessagePrivate.__doBuild.call(this);
    };
};
define('{pro}module/user/message/private.js',
      ['{pro}module/user/message/list.js'],f);
