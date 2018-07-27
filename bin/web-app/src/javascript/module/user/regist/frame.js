var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _u = _('nej.u'),
        _y = _('nej.ut'),
        _x = _('mu.x'),
        _t = _('mu.ut'),
        _p = _('mu.m.u'),
        _proModuleRegistFrame,
        _supModuleRegistFrame;
    /**
     * 组织模块基类
     * 
     * 
     */
    _p._$$ModuleRegistFrame = NEJ.C();
      _proModuleRegistFrame = _p._$$ModuleRegistFrame._$extend(_t._$$Module);
      _supModuleRegistFrame = _p._$$ModuleRegistFrame._$supro;
    /**
     * 控件初始化
     * @return {Void}
     */
    _proModuleRegistFrame.__doBuild = function(){
        this.__body = _e._$get('module-r0');
        this.__export.parent = _e._$get('tab-box');
        this.__topt = {
            list:_e._$getChildren('tab-btn')
        };
    };
    /**
     * 
	 * @param {Object} _options
     */
    _proModuleRegistFrame.__onRefresh = function(_options){
        _supModuleRegistFrame.__onRefresh.apply(this,arguments);
        var _index = _options.target=='/regist/phone/'?1:0;
        if (!this.__taber){
            this.__topt.index = _index;
            this.__taber = _y._$$Tab._$allocate(this.__topt);
            this.__taber._$addEvent('onchange',this.__onTabChange._$bind(this));
        }
        this.__taber._$go(_index);
    };
    /**
     * 
     */
    _proModuleRegistFrame.__onTabChange = function(_event){
        dispatcher._$redirect(_event.index==1?'/phone/':'/email/');
    };
};
define('{pro}module/user/regist/frame.js',
      ['{com}util/module/module.js'
      ,'{lib}util/tab/tab.js'],f);
