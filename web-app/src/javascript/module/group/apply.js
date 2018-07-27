var f = function(){
    var _  = NEJ.P,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _z = _('mu.x'),
        _t = _('mu.ut'),
        _p = _('mu.m.g'),
        _proModuleApply;
    /**
     * 组织开通模块
     * 
     */
    _p._$$ModuleApply = NEJ.C();
      _proModuleApply = _p._$$ModuleApply._$extend(_p._$$ModuleGroup);
    /**
     * 
     */
    _proModuleApply.__doBuild = function(){
        this.__body = _e._$get('module-a0').parentNode;
        _v._$addEvent(
            this.__body['btn-ok'],'click',
            this.__onSubmit._$bind(this)
        );
        this.__form = _t._$$WebForm._$allocate({
            form:this.__body,
            message:{
                'contact-4':'联系人最多输入40个字符或者20个中文',
                'means-4':'联系方式最多允许输入80个字符或者40个中文'
            }
        });
        this.__cache = _t._$$CacheGroup._$allocate({
            onapply:this.__cbSubmit._$bind(this)
        });
    };
    /**
     * 
     */
    _proModuleApply.__onSubmit = function(){
        if (!this.__form._$checkValidity()) return;
        this.__cache._$apply(this.__form._$data());
    };
    /**
     * 
     */
    _proModuleApply.__cbSubmit = function(_json){
        switch(_json.code){
            case 1:
                _z._$showSuccess('申请提交成功！');
                window.setTimeout(function(){
                    location.href = '../';
                },3000);
            return;
            default:
                _z._$showError('暂时无法申请开通，请稍后再试！');
            return;
        }
    };
};
define('{pro}module/group/apply.js',
      ['{pro}module/common/group.js'
      ,'{com}util/api.js'
      ,'{com}util/form/form.js'
      ,'{com}util/cache/group.js'],f);
