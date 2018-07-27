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
        _proModuleReset,
        _supModuleReset;
    /**
     * 组织模块基类
     * 
     * 
     */
    _p._$$ModuleReset = NEJ.C();
      _proModuleReset = _p._$$ModuleReset._$extend(_t._$$Module);
      _supModuleReset = _p._$$ModuleReset._$supro;
    /**
     * 
     */
    _proModuleReset.__reset = (function(){
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
    _proModuleReset.__doBuild = function(){
        this.__body = _e._$get('module-r0');
        var _form = this.__body.getElementsByTagName('form')[0];
        this.__nfom = _form;
        // web form 
        this.__form = _t._$$WebForm._$allocate({
            form:_form,
            oncheck:_x._$checkFormField,
        	oninvalid:_x._$checkInvalid
        });
        _v._$addEvent(
            _form['btn-ok'],'click',
            this.__onSubmit._$bind(this)
        );
        // init cache 
        this.__cache = _t._$$CacheUser._$allocate({
            onreset:this.__cbSubmit._$bind(this)
        });
    };
    /**
     * 
     */
    _proModuleReset.__onSubmit = function(){
        if (this.__form._$checkValidity()){
            var _data = this.__form._$data();
            _data.password = _u._$md52hex(_data.password);            
            this.__cache._$reset({
            	password:_data.password,
            	token:location.search.substr(3)
            });
        }
    };
    /**
     * 
     * @param {Object} _json
     */
    _proModuleReset.__cbSubmit = function(_json){
        switch(_json.code){
        	case 1:
                location.href = '/login/';
            return;
            case -9:
                location.href = '/retrieve/';
            return;
        }
    };
};
define('{pro}module/user/reset.js',
      ['{com}util/api.js'
      ,'{com}util/module/module.js'
      ,'{com}util/form/form.js'
      ,'{com}util/cache/user.js'
      ,'{lib}util/encode/sha.md5.js'],f);