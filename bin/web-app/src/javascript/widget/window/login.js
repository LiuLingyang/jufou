var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _u = _('nej.u'),
        _i = _('mu.ui'),
        _t = _('mu.m.u),
        _p = _('mu.w.w'),
        _proWindowLogin;
    // html code
    var _seed_html = _e._$addNodeTemplate('\
        <form class="w-fom">\
          <table class="xtb">\
              <tr><td class="c0">账　号</td>\
                  <td class="c1">\
                    <input type="text" \
                           name="username"\
                           class="txt bd01 w-rd3 wd0"\
                           data-required="true"\
                           data-message="请输入正确的邮箱地址或者手机号码"\
                           placeholder="邮箱地址/手机号码"/>\
                  </td></tr>\
              <tr><td class="c0">密　码</td>\
                  <td class="c1">\
                    <input type="password" \
                           name="password"\
                           class="txt bd01 w-rd3 wd0"\
                           data-required="true"\
                           data-message="请输入密码"\
                           placeholder="密码"/>\
                  </td></tr>\
              <tr><td class="c0">验证码</td>\
                  <td class="c1 vcd">\
                    <input type="text" \
                           name="captcha"\
                           minlength="4"\
                           maxlength="4"\
                           class="txt bd01 w-rd3 wd1"\
                           data-required="true"\
                           data-message="请输入正确的验证码"/>\
                    <img class="xx js-flag" src="/rest/user/captcha"/>\
                    <label class="xx">看不清楚？</label>\
                    <a class="xx fc02 js-flag" href="#">换一个</a>\
                  </td></tr>\
          </table>\
          <div class="xbtn f-cb">\
            <input type="button" class="fl w-rd3 btn btn-c" name="btn-cc" value="取  消"/>\
            <input type="button" class="fl w-rd3 btn btn-k" name="btn-ok" value="确  定"/>\
          </div>\
        </form>');
    /**
     * 窗体控件基类
     * 
     */
    _p._$$WindowLogin = NEJ.C();
      _proWindowLogin = _p._$$WindowLogin._$extend(_i._$$Window);
    /**
     * 控件重置
     */
    _proWindowLogin.__reset = function(_options){
        _options.title = '登录';
        _options.clazz = 'w-wfm w-win-a';
        this.__supReset(_options);
    };
    /**
     * 初始化外观
     */
    _proWindowLogin.__initXGui = function(){
        this.__seed_html = _seed_html;
    };
    /**
     * 
     */
    _proWindowLogin.__initNode = function(){
        this.__supInitNode();
        _t._$$LoginForm._$allocate({
            form:this.__body,
            onlogin:this.__onLogin._$bind(this)
        });
    };
    /**
     * 
     */
    _proWindow.__onOK = _f;
    /**
     * 
     */
    _proWindow.__onLogin = function(){
        location.reload();
    };
};
define('{pro}widget/window/login.js',
      ['{com}ui/window/window.js'
      ,'{pro}module/user/login/form.js'],f);
