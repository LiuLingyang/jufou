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
        _proModuleRegist,
        _supModuleRegist;
    /**
     * 组织模块基类
     * 
     * 
     */
    _p._$$ModuleRegist = NEJ.C();
      _proModuleRegist = _p._$$ModuleRegist._$extend(_t._$$Module);
      _supModuleRegist = _p._$$ModuleRegist._$supro;
    /**
     * 
     */
    _proModuleRegist.__reset = function(_options){
        NEJ.X(_options,window.data);
        this.__supReset(_options);
        // init region
        _y._$$RegionSelector._$allocate({
            city:this.__body.city,
            province:this.__body.province,
            area:this.__body.area,
            data:NEJ.X({},this.__iptable)
        });
    };
    /**
     * 控件初始化
     * @return {Void}
     */
    _proModuleRegist.__doBuild = function(){
        this.__body = _e._$html2node(
            _e._$getTextTemplate(this.__mid)
        );
        // web form 
        this.__form = _t._$$WebForm._$allocate({
            form:this.__body,
            oncheck:_x._$checkFormField,
            oninvalid:_x._$checkInvalid,
            onenter:this.__onSubmit._$bind(this)
        });
        _v._$addEvent(
            this.__body['btn-ok'],'click',
            this.__onSubmit._$bind(this)
        );
        _v._$addEvent(
            document,'click',
            this.__onLoginCheck._$bind(this)
        );
        // init cache 
        this.__cache = _t._$$CacheUser._$allocate({
            onregist:this.__cbSubmit._$bind(this)
        });
    };
    /**
     * 
     */
    _proModuleRegist.__onShow = function(_options){
        _options.data.parent.appendChild(this.__body);
        _supModuleRegist.__onShow.apply(this,arguments);
    };
    /**
     * 
     */
    _proModuleRegist.__onLoginCheck = function(_event){
        var _node = _v._$getElement(_event,'d:action');
        if (!_node||_e._$dataset(_node,'action')!='login') return;
        var _query = _u._$query2object(location.search.substr(1))||_o;
        if (!_query.target) return;
        _v._$stop(_event);
        location.href = '/login/?target='+encodeURIComponent(_query.target);
    };
    /**
     * 
     */
    _proModuleRegist.__onSubmit = function(){
        if (!this.__form._$checkValidity()) return;
        var _data = this.__form._$data();
        _data.username = _data.email||_data.mobile;
        _data.password = _u._$md52hex(_data.password);
        delete _data.password1;
        delete _data.accept;
        this.__cache._$regist(_data);
    };
    /**
     * 
     * @param {Object} _json
     */
    _proModuleRegist.__cbSubmit = function(_json){
        switch(_json.code){
            case  1:
                var _query = _u._$query2object(location.search.substr(1))||_o;
                location.href = _query.target||('/activate/?email='+this.__form._$data().email);
            return;
            case -2:
                this.__form._$showMsgError('captcha','验证码错误');
                _x._$refreshCaptcha(this.__form._$get('captcha'));
            return;
            case -9:
            case -101:
            case -102:
            default:
                _x._$showError('暂时无法注册，请稍候再试');
            return;
        }
    };
};
define('{pro}module/user/regist/regist.js',
      ['{com}util/module/module.js'
      ,'{lib}util/encode/sha.md5.js'
      ,'{lib}util/data/region/zh.js'
      ,'{lib}util/region/region.zh.js'
      ,'{lib}util/cache/cookie.js'
      ,'{com}util/api.js'
      ,'{com}util/form/form.js'
      ,'{com}util/cache/user.js'],f);
