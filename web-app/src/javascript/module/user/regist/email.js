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
        _proModuleRegistEmail,
        _supModuleRegistEmail;
    /**
     * 组织模块基类
     * 
     * 
     */
    _p._$$ModuleRegistEmail = NEJ.C();
      _proModuleRegistEmail = _p._$$ModuleRegistEmail._$extend(_p._$$ModuleRegist);
      _supModuleRegistEmail = _p._$$ModuleRegistEmail._$supro;
    /**
     * 控件初始化
     * @return {Void}
     */
    _proModuleRegistEmail.__doBuild = function(){
        this.__mid = 'txt-regist-email';
        _supModuleRegistEmail.__doBuild.apply(this,arguments);
        // init captcha
        var _list = _e._$getByClassName(this.__body,'js-flag');
        this.__cpbtn = _list[1];
        _x._$bindCaptcha(this.__body.captcha,_list[0],_list[1]);
        // init invite user
        var _user = (_j._$cookie('MU_IU')||'').replace(/"/g,'');
        if (_user.indexOf('@')>0){
            this.__form._$setValue('email',_user);
            this.__form._$get('email').readOnly = !0;
        }
    };
    /**
     * 
 	 * @param {Object} _json
     */
    _proModuleRegistEmail.__cbSubmit = function(_json){
        switch(_json.code){
            case  1:
                var _query = _u._$query2object(location.search.substr(1))||_o;
                location.href = _query.target||('/activate/?email='+this.__form._$data().email);
            return;
            case -2:
                _v._$dispatchEvent(this.__cpbtn,'click');
            break;
            case -102:
                this.__form._$showMsgError('email','邮箱地址已存在');
            return;
            case -107:
                this.__form._$showMsgError('email','账号未激活');
                var _query = _u._$query2object(location.search.substr(1))||_o;
                location.href = _query.target||('/react/?email='+this.__form._$data().username);
            return;
        }
        _supModuleRegistEmail.__cbSubmit.apply(this,arguments);
    };
};
define('{pro}module/user/regist/email.js',
      ['{pro}module/user/regist/regist.js'],f);
