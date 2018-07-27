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
        _proModuleSettingCommon,
        _supModuleSettingCommon;
    /**
     * 组织模块基类
     * 
     * 
     */
    _p._$$ModuleSettingCommon = NEJ.C();
      _proModuleSettingCommon = _p._$$ModuleSettingCommon._$extend(_t._$$Module);
      _supModuleSettingCommon = _p._$$ModuleSettingCommon._$supro;
    /**
     * 控件初始化
     * @return {Void}
     */
    _proModuleSettingCommon.__doBuild = function(){
        this.__body = _e._$html2node(
              _e._$getTextTemplate(this.__mkey));
    };
    /**
     * 
     */
    _proModuleSettingCommon.__onShow = function(_options){
        _supModuleSettingCommon.__onShow.apply(this,arguments);
        _options.data.parent.appendChild(this.__body);
    };
};
define('{pro}module/user/setting/common.js',
      ['{com}util/module/module.js'],f);
