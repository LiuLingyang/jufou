var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _x = _('nej.ut'),
        _z = _('mu.x'),
        _t = _('mu.ut'),
        _p = _('mu.m.g'),
        _proModuleSettingPrivacy;
    /**
     * 组织相册模块
     * 
     */
    _p._$$ModuleSettingPrivacy = NEJ.C();
      _proModuleSettingPrivacy = _p._$$ModuleSettingPrivacy._$extend(_p._$$ModuleGroup);
    /**
     * 构建模块
     * @return {Void}
     */
    _proModuleSettingPrivacy.__doBuild = function(){
        this.__body = _e._$get('module-b0').parentNode;
        this.__form = _t._$$WebForm._$allocate({
        	form:this.__body
        });
        this.__cache = _t._$$CacheGroup._$allocate({
        	onprivacyupdate:this.__cbSubmit._$bind(this)
        });
        _v._$addEvent(
        	this.__body['btn-ok'],
        	'click',this.__onSubmit._$bind(this)
        );
    };
    /**
     * 
     */
    _proModuleSettingPrivacy.__onSubmit = function(){
        var _data = this.__form._$data();
        _data.gid = this.__group.id;
        this.__cache._$updatePrivacy(_data);
    };
    /**
     * 
     */
    _proModuleSettingPrivacy.__cbSubmit = function(_json){
        if (_json.code==1){
            location.href = config.page('/setting/');
            return;
        }
        _z._$showError('暂时无法保存设置！');
    };
};
define('{pro}module/group/setting/privacy.js',
      ['{pro}module/common/group.js'
      ,'{com}util/cache/group.js'
      ,'{com}util/form/form.js'],f);
