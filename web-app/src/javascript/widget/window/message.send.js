var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _i = _('mu.ui'),
        _p = _('mu.w.w'),
        _proWindowMessageSend,
        _supWindowMessageSend;
    // html code
    var _seed_html = _e._$addNodeTemplate('\
        <form class="w-fom w-wfm">\
          <div class="msg cxx">\
            <p class="ln0 js-flag"></p>\
            <p class="ln1"><textarea class="bd01 w-rd3" name="content" data-required="true" data-message="请输入发送的消息内容" maxlength="500"></textarea></p>\
          </div>\
          <div class="xbtn f-cb">\
            <input type="button" class="fl w-rd3 btn btn-c" name="btn-cc" value="取  消"/>\
            <input type="button" class="fl w-rd3 btn btn-k" name="btn-ok" value="确  定"/>\
          </div>\
        </form>');
    /**
     * 窗体控件基类
     * 
     */
    _p._$$WindowMessageSend = NEJ.C();
      _proWindowMessageSend = _p._$$WindowMessageSend._$extend(_i._$$Window);
      _supWindowMessageSend = _p._$$WindowMessageSend._$supro;
    /**
     * 控件重置
     */
    _proWindowMessageSend.__reset = function(_options){
        _options.title = '发送消息';
        _options.clazz = 'w-win-c';
        this.__supReset(_options);
    };
    /**
     * 初始化外观
     */
    _proWindowMessageSend.__initXGui = function(){
        this.__seed_html = _seed_html;
    };
    /**
     * 初始化节点
     */
    _proWindowMessageSend.__initNode = function(){
        this.__supInitNode();
        this.__nnick = _e._$getByClassName(this.__body,'js-flag')[0];
    };
    /**
     * 
     */
    _proWindowMessageSend.__doInitFormData = function(_data){
        _supWindowMessageSend.__doInitFormData.apply(this,arguments);
        this.__nnick.innerText = '发送给：'+this.__extdata.nickname;
    };
    /**
     * 
     */
    _proWindowMessageSend.__doFormatData = function(_data){
        _data.uid = this.__extdata.id;
        return _data;
    };
};
define('{pro}widget/window/message.send.js',
      ['{com}ui/window/window.js'],f);
