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
        _proModuleSettingFrame;
    /**
     * 组织模块基类
     * 
     * 
     */
    _p._$$ModuleSettingFrame = NEJ.C();
      _proModuleSettingFrame = _p._$$ModuleSettingFrame._$extend(_t._$$Module);
    /**
     * 控件初始化
     * @return {Void}
     */
    _proModuleSettingFrame.__doBuild = function(){
        this.__export.parent = _e._$get('module-box');
        this.__nlist = _e._$getByClassName('module-s0','js-flag');
    };
    /**
     * 
     */
    _proModuleSettingFrame.__onRefresh = function(_options){
        var _umi = _options.target;
        _u._$forEach(this.__nlist,
            function(_node){
                _e._$dataset(_node,'value')==_umi
                ? _e._$addClassName(_node,'js-selected')
                : _e._$delClassName(_node,'js-selected');
            });
    };
};
define('{pro}module/user/setting/frame.js',
      ['{com}util/module/module.js'],f);
