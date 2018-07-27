var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _i = _('mu.ui'),
        _p = _('mu.w.w'),
        _proWindowSNSBinding,
        _supWindowSNSBinding;
    // html code
    var _seed_html = _e._$addNodeTemplate('<div class="wrp"></div>');
    /**
     * 窗体控件基类
     * 
     */
    _p._$$WindowSNSBinding = NEJ.C();
      _proWindowSNSBinding = _p._$$WindowSNSBinding._$extend(_i._$$Window);
      _supWindowSNSBinding = _p._$$WindowSNSBinding._$supro;
    /**
     * 控件重置
     */
    _proWindowSNSBinding.__reset = function(_options){
        var _type = _options.type,
            _conf = this.__getConfByType(_type);
        _options.title = _options.title||_conf.title||'SNS绑定';
        _options.clazz = 'w-win-g w-win-'+_type;
        this.__supReset(_options);
    };
    /**
     * 控件销毁
     */
    _proWindowSNSBinding.__destroy = function(){
        this.__supDestroy();
        this.__body.innerHTML = '&nbsp;';
    };
    /**
     * 初始化外观
     */
    _proWindowSNSBinding.__initXGui = function(){
        this.__seed_html = _seed_html;
    };
    /**
     * 
     */
    _proWindowSNSBinding.__getConfByType = (function(){
        var _config = {
            sina:{
                title:'新浪微博绑定',
                url:'https://api.weibo.com/oauth2/authorize?client_id=3283974804&redirect_uri=http://www.hijufou.com/binding/sina&response_type=code&forcelogin=true'
            },
            renren:{
                title:'绑定人人',
                url:'https://graph.renren.com/oauth/authorize?client_id=50bfa2bded6a44c0845e592a69097f94&redirect_uri=http://www.hijufou.com/binding/renren&response_type=code'
            }
        };
        return function(_type){
            this.__type = _type;
            return _config[_type];
        };
    })();
    
    _proWindowSNSBinding._$show = function(){
        _supWindowSNSBinding._$show.apply(this,arguments);
        var _type = this.__type,
            _conf = this.__getConfByType(_type);
        this.__body.innerHTML = '<iframe class="w-'+_type+'" src="'+_conf.url+'"></iframe>';
    };
};
define('{pro}widget/window/sns.binding.js',
      ['{com}ui/window/window.js'],f);
