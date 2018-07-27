var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _u = _('nej.u'),
        _i = _('mu.ui'),
        _x = _('mu.x'),
        _p = _('mu.w.w'),
        _proWindowWinxinShare;
    // html code
    var _seed_html = _e._$addNodeTemplate('<img/>');
    /**
     * 窗体控件基类
     * 
     */
    _p._$$WindowWinxinShare = NEJ.C();
      _proWindowWinxinShare = _p._$$WindowWinxinShare._$extend(_i._$$Window);
    /**
     * 控件重置
     */
    _proWindowWinxinShare.__reset = function(_options){
        _options.title = '分享到微信';
        _options.clazz = 'w-wfm w-win-7';
        this.__supReset(_options);
        this.__body.src = "http://qr.liantu.com/api.php?text=http://hijufou.com/m/meeting/detail.html?meetid="+_options.mid+"%26n=1&height=300"
    };
    /**
     * 初始化外观
     */
    _proWindowWinxinShare.__initXGui = function(){
        this.__seed_html = _seed_html;
    };
    /**
     * 
     */
    _proWindowWinxinShare.__initNode = function(){
        this.__supInitNode();
    };
};
define('{pro}widget/window/WinxinShare.update.js',
      ['{com}ui/window/window.js'],f);
