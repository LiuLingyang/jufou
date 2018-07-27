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
        _proModuleActivate;
    /**
     * 组织模块基类
     * 
     * 
     */
    _p._$$ModuleActivate = NEJ.C();
      _proModuleActivate = _p._$$ModuleActivate._$extend(_t._$$Module);
    /**
     * 
     */
    _proModuleActivate.__reset = (function(){
        var _reg = /\?email=(.*?)$/i;
        return function(_options){
            this.__supReset(_options);
            var _username = this.__host.username;
            if (_reg.test(location.search)){
                _username = RegExp.$1;
            }
            this.__nusr.innerText = _username;
        };
    })();
    /**
     * 控件初始化
     * @return {Void}
     */
    _proModuleActivate.__doBuild = function(){
        // 0 - title box
        // 1 - username
        // 2 - go mail website
        // 3 - resend
        this.__body = _e._$get('module-r1');
        var _list = _e._$getByClassName(this.__body,'js-flag');
        this.__nttl  = _list[0];
        this.__nusr  = _list[1];
        this.__nmail = _list[2];
        _v._$addEvent(
            this.__nmail,'click',
            this.__onGoMail._$bind(this)
        );
        _v._$addEvent(
            _list[3],'click',
            this.__doSendEmail._$bind(this)
        );
        this.__cache = _t._$$CacheUser._$allocate({
            onresendemail:this.__cbSendEmail._$bind(this)
        });
    };
    /**
     * 
     */
    _proModuleActivate.__onGoMail = (function(){
        var _reg = /^.*?@/i;
        return function(){
            var _email = this.__nusr.innerText;
            this.__nmail.href = 'http://mail.'+_email.replace(_reg,'');
        };
    })();
    /**
     * 
     */
    _proModuleActivate.__doSendEmail = function(_event){
        _v._$stop(_event);
        location.href = '/react/?email='+this.__nusr.innerText;
    };
    /**
     * 
     */
    _proModuleActivate.__cbSendEmail = function(_json){
        if (_json.code==1){
            this.__nttl.innerText = '确认邮件发送成功';
        }else{
            _e._$setStyle(this.__body,'display','none');
            this.__body.insertAdjacentHTML('afterEnd',
                  _e._$getTextTemplate('txt-act-fail'));
        }
    };
};
define('{pro}module/user/activate.js',
      ['{com}util/module/module.js'
      ,'{com}util/cache/user.js'],f);
