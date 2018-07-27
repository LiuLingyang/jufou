var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _u = _('nej.u'),
        _i = _('mu.ui'),
        _x = _('mu.x'),
        _p = _('mu.w.w'),
        _proWindowGroupQrcode;
    // html code
    var _seed_html = _e._$addNodeTemplate('<img/>');
    /**
     * 窗体控件基类
     * 
     */
    _p._$$WindowGroupQrcode = NEJ.C();
      _proWindowGroupQrcode = _p._$$WindowGroupQrcode._$extend(_i._$$Window);
    /**
     * 控件重置
     */
    _proWindowGroupQrcode.__reset = function(_options){
        _options.title = '组织二维码';
        _options.clazz = 'w-wfm w-win-10';
        this.__supReset(_options);
        this.__body.src = "http://qr.liantu.com/api.php?text=http://hijufou.com/m/group/home.html?groupid="+_options.gid+"&height=300"
    };
    /**
     * 初始化外观
     */
    _proWindowGroupQrcode.__initXGui = function(){
        this.__seed_html = _seed_html;
    };
    /**
     * 
     */
    _proWindowGroupQrcode.__initNode = function(){
        this.__supInitNode();
    };
};
define('{pro}widget/window/group.qrcode.js',
      ['{com}ui/window/window.js'],f);
