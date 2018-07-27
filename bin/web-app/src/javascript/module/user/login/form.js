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
        _proLoginForm;
    /**
     * 组织模块基类
     * 
     * 
     */
    _p._$$LoginForm = NEJ.C();
      _proLoginForm = _p._$$LoginForm._$extend(_y._$$Event);
    /**
     * 控件初始化
     * @return {Void}
     */
    _proLoginForm.__reset = function(_options){
        this.__supReset(_options);
        var _form = _options.form;
        // init captcha
        var _list = _e._$getByClassName(_form,'js-flag');
        _x._$bindCaptcha(_form.captcha,_list[0],_list[1]);
        // web form 
        this.__form = _t._$$WebForm._$allocate({
            form:_form,
            oncheck:this.__doCheckUserName._$bind(this),
            onenter:this.__onSubmit._$bind(this)
        });
        this.__form._$setValue(
            'username',
            (_j._$cookie('MU_IU')||'').replace(/"/g,'')
        );
        _v._$addEvent(
            _form['btn-ok'],'click',
            this.__onSubmit._$bind(this)
        );
        // init cache 
        this.__cache = _t._$$CacheUser._$allocate({
            onlogin:this.__cbSubmit._$bind(this)
        });
    };
    /**
     * 
     */
    _proLoginForm.__doCheckUserName = function(_event){
        var _node = _event.target,
            _value = _node.value;
        if (_node.name=='username'&&
           !/^[\w-\.]+@(?:[\w-]+\.)+[a-z]{2,6}$/i.test(_value)&&
           !/^[\d]{11}$/.test(_value))
            _event.value = 20;
    };
    /**
     * 
     */
    _proLoginForm.__onSubmit = function(){
        if (!this.__form._$checkValidity()) return;
        var _data = this.__form._$data();
        _data.password = _u._$md52hex(_data.password);
        this.__cache._$login(_data);
    };
    /**
     * 
     * @param {Object} _json
     */
    _proLoginForm.__cbSubmit = function(_json){
        switch(_json.code){
            case  1:
                this._$dispatchEvent('onlogin');
            return;
            case -2:
                this.__form._$showMsgError('captcha','验证码错误');
                _x._$refreshCaptcha(this.__form._$get('captcha'));
            return;
            case -105:
                this.__form._$showMsgError('username','用户不存在');
            return;
            case -106:
                this.__form._$showMsgError('password','密码错误');
            return;
            case -107:
                this.__form._$showMsgError('username','账户未激活');
                var _query = _u._$query2object(location.search.substr(1))||_o;
                location.href = _query.target||('/react/?email='+this.__form._$data().username);
            return;
            default:
                alert('暂时无法登录，请稍候再试');
            return;
        }
    };
};
define('{pro}module/user/login/form.js',
      ['{lib}util/encode/sha.md5.js'
      ,'{lib}util/cache/cookie.js'
      ,'{com}util/api.js'
      ,'{com}util/form/form.js'
      ,'{com}util/cache/user.js'],f);
