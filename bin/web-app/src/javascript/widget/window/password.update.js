var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _u = _('nej.u'),
        _i = _('mu.ui'),
        _x = _('mu.x'),
        _p = _('mu.w.w'),
        _proWindowPassword;
    // html code
    var _seed_html = _e._$addNodeTemplate('\
        <form class="w-fom">\
          <table class="xtb cxx">\
            <tr><td class="c0">原密码</td><td class="c1">\
                <input type="password" name="password2"\
                       class="txt bd01 w-rd3 wd0"\
                       maxlength="20"\
                       data-required="true"\
                       data-message="请输入原密码"/></td></tr>\
            <tr><td class="c0">新密码</td><td class="c1">\
                <input type="password" name="password"\
                       class="txt bd01 w-rd3 wd0"\
                       maxlength="20"\
                       data-required="true"\
                       data-message="请输入新密码"/></td></tr>\
            <tr><td class="c0">确认密码</td><td class="c1">\
                <input type="password" name="password1"\
                       class="txt bd01 w-rd3 wd0"\
                       maxlength="20"\
                       data-required="true"\
                       data-message="两次输入的密码不一致"/></td></tr>\
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
    _p._$$WindowPassword = NEJ.C();
      _proWindowPassword = _p._$$WindowPassword._$extend(_i._$$Window);
    /**
     * 控件重置
     */
    _proWindowPassword.__reset = function(_options){
        _options.title = '修改密码';
        _options.clazz = 'w-wfm w-win-7';
        this.__supReset(_options);
    };
    /**
     * 初始化外观
     */
    _proWindowPassword.__initXGui = function(){
        this.__seed_html = _seed_html;
    };
    /**
     * 
     */
    _proWindowPassword.__initNode = function(){
        this.__supInitNode();
        this.__form._$setEvent('oncheck',_x._$checkFormField);
        this.__form._$setEvent('oninvalid',_x._$checkInvalid);
    };
    /**
     * 
     */
    _proWindowPassword.__doFormatData = function(_data){
        _data.oldPassword = _u._$md52hex(_data.password2);
        _data.password = _u._$md52hex(_data.password);
        delete _data.password2;
        delete _data.password1;
    };
};
define('{pro}widget/window/password.update.js',
      ['{com}ui/window/window.js'
      ,'{lib}util/encode/sha.md5.js'],f);
