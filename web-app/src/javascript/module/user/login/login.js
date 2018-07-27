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
        _proModuleLogin;
    /**
     * 组织模块基类
     * 
     * 
     */
    _p._$$ModuleLogin = NEJ.C();
      _proModuleLogin = _p._$$ModuleLogin._$extend(_t._$$Module);
    /**
     * 控件初始化
     * @return {Void}
     */
    _proModuleLogin.__doBuild = function(){
	    _p._$$LoginForm._$allocate({
	        form:_e._$get('module-r0')
	               .getElementsByTagName('form')[0],
	        onlogin:this.__onLogin._$bind(this)
	    });
    };
    /**
     * 
     */
    _proModuleLogin.__onLogin = (function(){
        var _pages = /\/(regist|login|reset|retrieve)/i;
        return function(){
            var _param = _u._$query2object(
                          location.search.substr(1)),
                _target = _param.target||document.referrer;
            if (!_target||_pages.test(_target))
                _target = '/personal/';
            location.href = _target;
        };
    })();
};
define('{pro}module/user/login/login.js',
      ['{com}util/module/module.js'
      ,'{pro}module/user/login/form.js'],f);
