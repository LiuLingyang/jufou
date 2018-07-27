var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _i = _('mu.ui'),
        _p = _('mu.w.w'),
        _proWindowRetry;
    // html code
    var _seed_html = _e._$addNodeTemplate('\
        <form class="w-fom">\
          <div class="rit">以下邀请未发送成功：</div>\
          <div class="msg js-flag"></div>\
          <div class="xbtn f-cb">\
            <input type="button" class="fl w-rd3 btn btn-c" name="btn-cc" value="取  消"/>\
            <input type="button" class="fl w-rd3 btn btn-k" name="btn-ok" value="重新发送"/>\
          </div>\
        </form>');
    /**
     * 窗体控件基类
     * 
     */
    _p._$$WindowRetry = NEJ.C();
      _proWindowRetry = _p._$$WindowRetry._$extend(_i._$$Window);
    /**
     * 控件重置
     */
    _proWindowRetry.__reset = function(_options){
        _options.title = _options.title||'信息提示';
        _options.clazz = 'w-win-d';
        this.__supReset(_options);
        this.__nmsg.innerHTML = _options.message||'提示信息';
    };
    /**
     * 初始化外观
     */
    _proWindowRetry.__initXGui = function(){
        this.__seed_html = _seed_html;
    };
    /**
     * 
     */
    _proWindowRetry.__initNode = function(){
        this.__supInitNode();
        this.__nmsg = _e._$getChildren(this.__body,'js-flag')[0];
    };
};
define('{pro}widget/window/invite.retry.js',
      ['{com}ui/window/window.js'],f);
