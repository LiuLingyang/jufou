var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _u = _('nej.u'),
        _j = _('nej.j'),
        _y = _('nej.ut'),
        _x = _('mu.x'),
        _t = _('mu.ut'),
        _p = _('mu.m.u'),
        _proModuleRegistPhone,
        _supModuleRegistPhone;
    /**
     * 组织模块基类
     * 
     * 
     */
    _p._$$ModuleRegistPhone = NEJ.C();
      _proModuleRegistPhone = _p._$$ModuleRegistPhone._$extend(_p._$$ModuleRegist);
      _supModuleRegistPhone = _p._$$ModuleRegistPhone._$supro;
    /**
     * 控件初始化
     * @return {Void}
     */
    _proModuleRegistPhone.__doBuild = function(){
        this.__mid = 'txt-regist-phone';
        _supModuleRegistPhone.__doBuild.apply(this,arguments);
        // init captcha
        _x._$bindPhoneCaptcha(
        	this.__body['btn-captcha'],
        	this.__body.mobile,
        	this.__onResendCaptcha._$bind(this),
        	this.__onCheckMobile._$bind(this)
        );
        this.__cache._$setEvent(
            'oncheck',this.__cbCheckMobile._$bind(this)
        );
        // init invite user
        var _user = (_j._$cookie('MU_IU')||'').replace(/"/g,'');
        if (/^[\d]+$/.test(_user)){
            this.__form._$setValue('mobile',_user);
            this.__form._$setValue('captcha','1111');
            _e._$setStyle(this.__body['btn-captcha'].parentNode.parentNode,'display','none');
        }
    };
    /**
     * 
     */
    _proModuleRegistPhone.__onResendCaptcha = function(){
        this.__cache._$sendCaptcha(this.__body.mobile.value);
    };
    /**
     * 
     */
    _proModuleRegistPhone.__onCheckMobile = function(_event){
        _event.stopped = !0;
        this.__ckevt = _event;
        _e._$get(_event.btn).disabled = !0;
        this.__cache._$exist(_event.mobile);
    };
    /**
     * 
     */
    _proModuleRegistPhone.__cbCheckMobile = function(_json){
        _e._$get(this.__ckevt.btn).disabled = !1;
        switch(_json.code){
            case 1:
                this.__ckevt.donext();
            break;
            default:
                this.__form._$showMsgError('mobile','手机号码已存在');
            break;
        }
        delete this.__ckevt;
    };
    /**
     * 
     * @param {Object} _json
     */
    _proModuleRegistPhone.__cbSubmit = function(_json){
        switch(_json.code){
            case  1:
                var _query = _u._$query2object(location.search.substr(1))||_o;
                location.href = _query.target||'/personal/';
            return;
            case -10:
            case -104:
                this.__form._$showMsgError('mobile','手机号码已存在');
            return;
        }
        _supModuleRegistPhone.__cbSubmit.apply(this,arguments);
    };
};
define('{pro}module/user/regist/phone.js',
      ['{pro}module/user/regist/regist.js'],f);
