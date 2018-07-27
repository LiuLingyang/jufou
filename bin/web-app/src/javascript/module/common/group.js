var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _u = _('nej.u'),
        _t = _('mu.ut'),
        _p = _('mu.m.g'),
        _proModuleGroup;
    /**
     * 组织模块基类
     * 
     * 
     */
    _p._$$ModuleGroup = NEJ.C();
      _proModuleGroup = _p._$$ModuleGroup._$extend(_t._$$Module);
    /**
     * 控件初始化
     * @return {Void}
     */
    _proModuleGroup.__init = function(){
        this.__supInit();
        _p._$$ModuleCommon._$allocate();
    };
};
define('{pro}module/common/group.js',
      ['{com}util/module/module.js'
      ,'{pro}module/common/common.js'],f);
