var f = function(){
    var _  = NEJ.P,
        _e = _('nej.e'),
        _t = _('mu.ut'),
        _p = _('mu.m.g'),
        _z = _('mu.x'),
        _proModuleStep1,
        _supModuleStep1;
    /**
     * 创建组织第一步模块对象
     * 
     */
    _p._$$ModuleStep1 = NEJ.C();
      _proModuleStep1 = _p._$$ModuleStep1._$extend(_p._$$ModuleBasic);
      _supModuleStep1 = _p._$$ModuleStep1._$supro;
    /**
     * 构建模块
     * @return {Void}
     */
    _proModuleStep1.__doBuild = function(){
        _supModuleStep1.__doBuild.call(this);
        this.__cache = _t._$$CacheGroup._$allocate({
            ongroupcreate:this.__cbSubmit._$bind(this)
        });
    };
    /**
     * 表单提交
     * @return {Void}
     */
    _proModuleStep1.__doSubmit = function(_data){
        this.__cache._$create(_data);
    };
    /**
     * 组织创建回调
     * @param  {Object} _json 结果
     * @return {Void}
     */
    _proModuleStep1.__cbSubmit = function(_json){
        if (_json.code==1){
        	dispatcher._$redirect('/?/m/s2/');
            return;
        }
        _supModuleStep1.__cbSubmit.apply(this,arguments);
    };
    /**
     * 
     */
    _proModuleStep1.__onShow = function(){
    	_e._$get('page-box').appendChild(this.__body);
    };
};
define('{pro}module/group/create/step1.js',
      ['{pro}module/setting/basic.js'],f);
