var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _x = _('nej.ut'),
        _z = _('mu.x'),
        _t = _('mu.ut'),
        _p = _('mu.m.g'),
        _proModuleSettingMessage;
    /**
     * 组织相册模块
     * 
     */
    _p._$$ModuleSettingMessage = NEJ.C();
      _proModuleSettingMessage = _p._$$ModuleSettingMessage._$extend(_p._$$ModuleGroup);
    /**
     * 构建模块
     * @return {Void}
     */
    _proModuleSettingMessage.__doBuild = function(){
        this.__body = _e._$get('module-k0').parentNode;
        this.__form = _t._$$WebForm._$allocate({
            form:this.__body
        });
        this.__cache = _t._$$CacheGroup._$allocate({
            onmsgsettingupdate:this.__cbSubmit._$bind(this)
        });
        _v._$addEvent(
            this.__body['btn-ok'],
            'click',this.__onSubmit._$bind(this)
        );
    };
    /**
     * 
     */
    _proModuleSettingMessage.__onSubmit = function(){
        var _data = this.__form._$data();
        _data.gid = this.__group.id;
        this.__cache._$updateMsgSetting(this.__host.id,_data);
    };
    /**
     * 
     */
    _proModuleSettingMessage.__cbSubmit = function(_key,_json){
        if (_json.code==1){
        	_z._$showSuccess('设置保存成功！');
            //location.href = config.page('/');
            return;
        }
        _z._$showError('暂时无法保存设置！');
    };
};
define('{pro}module/group/setting/message.js',
      ['{pro}module/common/group.js'
      ,'{com}util/cache/group.js'
      ,'{com}util/form/form.js'],f);
