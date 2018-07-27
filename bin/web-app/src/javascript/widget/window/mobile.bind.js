var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _u = _('nej.u'),
        _i = _('mu.ui'),
        _x = _('mu.x'),
        _p = _('mu.w.w'),
        _proWindowMobile;
    // html code
    var _seed_html = _e._$addNodeTemplate('\
        <form class="w-fom">\
          <table class="xtb">\
            <tr class="cxx">\
                <td class="c0">手机号码</td>\
                <td class="c1"><input type="text" name="mobile" class="txt bd01 w-rd3 wd0" data-type="number" data-message="请输入正确的手机号码"/></td></tr>\
            <tr><td class="c0">&nbsp;</td>\
                <td class="c1">\
                  <input type="text" name="captcha" class="txt bd01 w-rd3 wd2"/>\
                  <input type="button" name="btn-captcha" class="w-rd3 btn btn-c" value="发送验证码"/>\
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
    _p._$$WindowMobile = NEJ.C();
      _proWindowMobile = _p._$$WindowMobile._$extend(_i._$$Window);
    /**
     * 控件重置
     */
    _proWindowMobile.__reset = function(_options){
        _options.title = _options.title||'手机绑定';
        _options.clazz = 'w-wfm w-win-9';
        this.__supReset(_options);
    };
    /**
     * 初始化外观
     */
    _proWindowMobile.__initXGui = function(){
        this.__seed_html = _seed_html;
    };
    /**
     * 
     */
    _proWindowMobile.__initNode = function(){
    	this.__supInitNode();
    	_x._$bindPhoneCaptcha(
        	this.__body['btn-captcha'],
        	this.__body.mobile,
        	this.__onSendCaptcha._$bind(this)
        );
    };
    /**
     * 
     */
    _proWindowMobile.__onSendCaptcha = function(){
    	this._$dispatchEvent('oncaptcha',this.__body.mobile.value);
    };
};
define('{pro}widget/window/mobile.bind.js',
      ['{com}ui/window/window.js'],f);
