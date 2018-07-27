var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _u = _('nej.u'),
        _x = _('mu.x'),
        _i = _('mu.ui'),
        _p = _('mu.w.w'),
        _proWindowContactCreate,
        _supWindowContactCreate;
    // html code
    var _seed_html = _e._$addNodeTemplate('\
        <form class="w-fom">\
          <table class="xtb">\
            <tr class="cxx"><td class="c0">姓名</td>\
                <td class="c1"><input type="text" class="txt bd01 w-rd3 wd0" name="name" maxlength="20" data-required="true" data-message="请输入姓名"/></td></tr>\
            <tr class="cxx"><td class="c0">邮箱地址</td>\
                <td class="c1 cyy"><input type="text" class="txt bd01 w-rd3 wd0" name="email" maxlength="30"/></td></tr>\
            <tr class="cxx"><td class="c0">手机号码</td>\
                <td class="c1 cyy"><input type="text" class="txt bd01 w-rd3 wd0" name="mobile" maxlength="15"/></td></tr>\
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
    _p._$$WindowContactCreate = NEJ.C();
      _proWindowContactCreate = _p._$$WindowContactCreate._$extend(_i._$$Window);
      _supWindowContactCreate = _p._$$WindowContactCreate._$supro;
    /**
     * 控件重置
     */
    _proWindowContactCreate.__reset = function(_options){
        _options.title = _options.title||'创建联系人';
        _options.clazz = 'w-wfm w-win-5';
        this.__supReset(_options);
    };
    /**
     * 初始化外观
     */
    _proWindowContactCreate.__initXGui = function(){
        this.__seed_html = _seed_html;
    };
    /**
     * 
     */
    _proWindowContactCreate.__onOK = function(){
        var _data = this.__form._$data();
        if (!!_data.email&&!_x._$isEmailOK(_data.email)){
            this.__form._$showMsgError('email','请输入合法的邮箱地址');
            return;
        }
        if (!!_data.mobile&&!_x._$isMobileOK(_data.mobile)){
            this.__form._$showMsgError('mobile','请输入合法的手机号码');
            return;
        }
        if (!_x._$isEmailOK(_data.email)&&!_x._$isMobileOK(_data.mobile)){
            this.__form._$showMsgError('email','至少输入一项合法的联系方式');
            return;
        }
        _supWindowContactCreate.__onOK.apply(this,arguments);
    };
};
define('{pro}widget/window/contact.create.js',
      ['{com}ui/window/window.js'],f);
