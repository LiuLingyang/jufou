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
        _proModuleReact,
        _supModuleReact;
    /**
     * 组织模块基类
     * 
     * 
     */
    _p._$$ModuleReact = NEJ.C();
      _proModuleReact = _p._$$ModuleReact._$extend(_t._$$Module);
      _supModuleReact = _p._$$ModuleReact._$supro;
    /**
     * 
     */
    _proModuleReact.__reset = (function(){
        var _reg = /\?email=(.*?)$/i;
        return function(_options){
            this.__supReset(_options);
            if (_reg.test(location.search)){
                this.__nfom.email.value = RegExp.$1;
            }
        };
    })();
    /**
     * 控件初始化
     * @return {Void}
     */
    _proModuleReact.__doBuild = function(){
        this.__body = _e._$get('module-r3');
        var _form = this.__body.getElementsByTagName('form')[0];
        this.__nfom = _form;
        // init captcha
        var _list = _e._$getByClassName(this.__body,'js-flag');
        this.__cpbtn = _list[1];
        _x._$bindCaptcha(_form.captcha,_list[0],_list[1]);
        // web form 
        this.__form = _t._$$WebForm._$allocate({
            form:_form
        });
        _v._$addEvent(
        	_form['btn-ok'],'click',
            this.__onSubmit._$bind(this)
        );
        // init cache 
        this.__cache = _t._$$CacheUser._$allocate({
            onresendemail:this.__cbSubmit._$bind(this)
        });
    };
    /**
     * 
     */
    _proModuleReact.__onSubmit = function(){
        if (!this.__form._$checkValidity()) return;
        var _data = this.__form._$data();
        this.__cache._$sendEmail(_data);
    };
    /**
     * 
 	 * @param {Object} _json
     */
    _proModuleReact.__cbSubmit = function(_json){
        var _email = _json.result||this.__nfom.email.value;
        switch(_json.code){
            case 1:
                location.href = '/activate/?email='+_email;
            return;
            case -2:
                _v._$dispatchEvent(this.__cpbtn,'click');
                this.__form._$showMsgError('captcha','验证码错误');
            return;
            case -108:
                this.__form._$showMsgError('email','未注册该邮箱地址');
            return;
        }
        _e._$setStyle(this.__body,'display','none');
        this.__body.insertAdjacentHTML('afterEnd',
              _e._$getHtmlTemplate('jst-act-fail',{
                  email:_email
              }));
    };
};
define('{pro}module/user/react.js',
      ['{com}util/api.js'
      ,'{com}util/module/module.js'
      ,'{com}util/form/form.js'
      ,'{com}util/cache/user.js'],f);