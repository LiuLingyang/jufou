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
        _proModulePassword;
    /**
     * 组织模块基类
     * 
     * 
     */
    _p._$$ModulePassword = NEJ.C();
      _proModulePassword = _p._$$ModulePassword._$extend(_t._$$Module);
    /**
     * 控件初始化
     * @return {Void}
     */
    _proModulePassword.__reset = function(){
        _e._$tab('tab-btn',{
            index:0,
            onchange:function(_event){
                var _element=_e._$get('tab-box');
                switch(_event.index){
                    case 0:
                        _e._$setStyle('email','display','');
                        _e._$setStyle('phone','display','none');
                        break;
                    case 1:
                        _e._$setStyle('phone','display','');
                        _e._$setStyle('email','display','none');
                        break;
              }
          }
      });
    };
    /**
     * 
     */
    _proModulePassword.__doBuild = function(){
        this.__body = _e._$get('module-r0');
        this.__parent = this.__body.parentNode;
        //init captcha
        this.__email = _e._$get('email');
        var _list = _e._$getByClassName(this.__email,'js-flag');
        _x._$bindCaptcha(this.__email.captcha,_list[0],_list[1]);
        this.__phone = _e._$get('phone');
        _x._$bindPhoneCaptcha(
        	this.__phone['btn-captcha'],
        	this.__phone.mobile,
        	this.__onResendCaptcha._$bind(this)
        );
        //web form
        this.__form = _t._$$WebForm._$allocate({
        	form:this.__email
        });
        this.__xform = _t._$$WebForm._$allocate({
        	form:this.__phone,
        	oncheck:_x._$checkFormField,
        	oninvalid:_x._$checkInvalid
        });
        _v._$addEvent(
            this.__email['btn-ok'],'click',
            this.__doSendEmail._$bind(this)
        );
        _v._$addEvent(
            this.__phone['btn-ok'],'click',
            this.__doSendPhone._$bind(this)
        );
        this.__cache = _t._$$CacheUser._$allocate({
        	onreset:this.__cbReset._$bind(this),
            onpassword:this.__cbSendEmail._$bind(this)
        });
        // init success
        this.__nsucc = _e._$html2node(
            _e._$getTextTemplate('txt-pswd-succ'));
        // 0 - email 
        // 1 - go mail
        // 2 - re-input
        var _list = _e._$getByClassName(this.__nsucc,'js-flag');
        this.__nemail = _list[0];
        this.__ngomal = _list[1];
        _v._$addEvent(
            _list[2],'click',
            this.__onResetEmail._$bind(this)
        );
        // init failed
        this.__nfail = _e._$html2node(
            _e._$getTextTemplate('txt-pswd-fail'));
        _v._$addEvent(
            _e._$getByClassName(this.__nfail,'js-flag')[0],
            'click',this.__onResetEmail._$bind(this)
        );
    };
    /**
     * 
     */
    _proModulePassword.__doSendEmail = function(){
        if (this.__form._$checkValidity()){
            var _data = this.__form._$data();
            var _email = _data.email;
            var _captcha = _data.captcha;
            this.__nemail.innerText = _email;
            this.__ngomal.href = _x._$email2url(_email)
            this.__cache._$password(_email,_captcha);
        }
    };
    /**
     * 
     */
    _proModulePassword.__doSendPhone = function(){
        if (this.__xform._$checkValidity()){
            var _phone = this.__xform._$data();
            _phone.password = _u._$md52hex(_phone.password);            
            this.__cache._$reset({
            	mobile:_phone.mobile,
            	password:_phone.password,
            	captcha:_phone.captcha
            });
        }
    };
    /**
     * 
     */
    _proModulePassword.__cbSendEmail = function(_json){
        switch(_json.code){
    		case 1:
    		    _e._$removeByEC(this.__body);
    		    this.__parent.appendChild(this.__nsucc);
    		return;
    		case -2:
                this.__form._$showMsgError('captcha','验证码错误');
                _x._$refreshCaptcha(this.__form._$get('captcha'));
            return;
    		case -108:
    		    this.__form._$showMsgError('email','邮箱地址不存在');
    		return;
    		default:
    		    _e._$removeByEC(this.__body);
                this.__parent.appendChild(this.__nfail);
            return;
    	}
    };
    /**
     * 
     */
    _proModulePassword.__cbReset = function(_json){
    	switch(_json.code){
    		case 1:
    		    location.href = '/login/';
    		return;
    		case -2:
    		    this.__xform._$showMsgError('captcha','验证码错误');
    		return;
    		default:
                _x._$showError('暂时无法重置密码，请稍候再试');
            return;
    	}
    };
    /**
     * 
     */
    _proModulePassword.__onResendCaptcha = function(){
        this.__cache._$sendCaptcha(this.__phone.mobile.value);
    };
    /**
     * 
     * @param {Object} _event
     */
    _proModulePassword.__onResetEmail = function(_event){
        _v._$stop(_event);
        _e._$removeByEC(this.__nsucc);
        _e._$removeByEC(this.__nfail);
        this.__parent.appendChild(this.__body);
        this.__form._$reset();
        this.__form._$get('email').focus();
    };
};
define('{pro}module/user/password.js',
      ['{com}util/module/module.js'
      ,'{com}util/cache/user.js'
      ,'{com}util/form/form.js'
      ,'{lib}util/template/tpl.js'
      ,'{lib}util/tab/tab.js'
      ,'{lib}util/encode/sha.md5.js'],f);
