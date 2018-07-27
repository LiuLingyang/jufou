var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _i = _('mu.ui'),
        _p = _('mu.w.w'),
        _proWindowConfirm;
    // html code
    var _seed_html = _e._$addNodeTemplate('\
        <form class="w-fom">\
          <div class="w-message"></div>\
          <div class="xbtn f-cb">\
            <input type="button" class="fl w-rd3 btn btn-c" name="btn-cc" value="取  消"/>\
            <input type="button" class="fl w-rd3 btn btn-k" name="btn-ok" value="确  定"/>\
          </div>\
        </form>');
    /**
     * 窗体控件基类
     * 
     */
    _p._$$WindowConfirm = NEJ.C();
      _proWindowConfirm = _p._$$WindowConfirm._$extend(_i._$$Window);
    /**
     * 控件重置
     */
    _proWindowConfirm.__reset = function(_options){
        _options.title = _options.title||'信息提示';
        _options.clazz = 'w-win-4';
        this.__supReset(_options);
        this.__nmsg.innerHTML = _options.message||'提示信息';
    };
    /**
     * 初始化外观
     */
    _proWindowConfirm.__initXGui = function(){
        this.__seed_html = _seed_html;
    };
    /**
     * 
     */
    _proWindowConfirm.__initNode = function(){
        this.__supInitNode();
        this.__nmsg = _e._$getChildren(this.__body)[0];
    };
};
define('{pro}widget/window/confirm.js',
      ['{com}ui/window/window.js'],f);
