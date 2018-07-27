var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _x = _('nej.ut'),
        _t = _('mu.ut'),
        _p = _('mu.m.g'),
        _z = _('mu.x'),
        _proModuleSettingBasic,
        _supModuleSettingBasic;
    /**
     * 组织相册模块
     * 
     */
    _p._$$ModuleSettingBasic = NEJ.C();
      _proModuleSettingBasic = _p._$$ModuleSettingBasic._$extend(_p._$$ModuleBasic);
      _supModuleSettingBasic = _p._$$ModuleSettingBasic._$supro;
    /**
     * 构建模块
     * @return {Void}
     */
    _proModuleSettingBasic.__doBuild = function(){
        _supModuleSettingBasic.__doBuild.call(this);
        this.__cache = _t._$$CacheGroup._$allocate({
            ongroupupdate:this.__cbSubmit._$bind(this)
        });
    };
    /**
     * 
     */
    _proModuleSettingBasic.__doSubmit = function(_data){
        this.__cache._$update(_data);
    };
    /**
     * 
     */
    _proModuleSettingBasic.__cbSubmit = function(_json){
        if (_json.code==1){
            _z._$showSuccess('设置保存成功！');
            window.setTimeout(function(){
    	        location.href = '/'+_json.result.homepage+'/setting/';
    	    },3000);
            return;
        }
        _supModuleSettingBasic.__cbSubmit.apply(this,arguments);
    };
};
define('{pro}module/group/setting/basic.js',
      ['{pro}module/setting/basic.js'
      ,'{com}util/cache/group.js'
      ,'{com}util/form/form.js'
      ,'{lib}util/data/region/zh.js'
      ,'{lib}util/region/region.zh.js'],f);
