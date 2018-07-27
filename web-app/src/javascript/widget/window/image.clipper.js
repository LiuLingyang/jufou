var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _u = _('nej.u'),
        _t = _('nej.ut'),
        _x = _('mu.x'),
        _i = _('mu.ui'),
        _p = _('mu.w.w'),
        _proImageClipper,
        _supImageClipper;
    // html code
    var _seed_html = _e._$addNodeTemplate('\
        <form class="w-fom">\
          <div class="img f-cb">\
            <p class="wtip">可以收放选择区域</p>\
            <div class="shw box fl j-flag"></div>\
            <div class="prv">\
              <div class="box pbx j-flag"></div>\
            </div>\
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
    _p._$$ImageClipper = NEJ.C();
      _proImageClipper = _p._$$ImageClipper._$extend(_i._$$Window);
      _supImageClipper = _p._$$ImageClipper._$supro;
    /**
     * 控件初始化
     * @return {Void}
     */
    _proImageClipper.__init = function(){
        this.__copt = {lock:!0};
        this.__supInit();
    };
    /**
     * 控件重置
     */
    _proImageClipper.__reset = function(_options){
        _options.title = _options.title||'图片裁剪';
        this.__supReset(_options);
        this.__copt.url = _options.url;
        this.__copt.size = _options.size||{
            width:100,
            height:100
        };
        var _id = _e._$id(_options.pbox);
        if (!!_id){
        	this.__copt.pbox.push(_id);
        }
    };
    /**
     * 控件销毁
     */
    _proImageClipper.__destroy = function(){
        this.__supDestroy();
        if (!!this.__clipper){
        	if (this.__copt.pbox.length>1){
        		var _id = this.__copt.pbox.pop();
        		this.__clipper._$delPreview(_id,!0);
        	}
            this.__clipper._$recycle();
            delete this.__clipper;
        }
    };
    /**
     * 初始化外观
     */
    _proImageClipper.__initXGui = function(){
        this.__seed_html = _seed_html;
    };
    /**
     * 初始化节点
     * @return {Void}
     */
    _proImageClipper.__initNode = function(){
        this.__supInitNode();
        // 0 - clip box
        // 1 - preview box
        var _list = _e._$getByClassName(this.__body,'j-flag');
        this.__copt.mbox = _list[0];
        this.__copt.pbox = [_list[1]];
        this.__pid = _e._$id(_list[1]);
    };
    /**
     * 确定裁剪
     */
    _proImageClipper.__onOK = function(){
        var _event = {
            clip:this.__clipper._$getClipResult(this.__pid)
        };
        this._$dispatchEvent('onok',_event);
        if (!_event.stopped) this._$hide();
    };
    /**
     * 显示控件
     */
    _proImageClipper._$show = function(){
        _supImageClipper._$show.apply(this,arguments);
        if (!this.__clipper){
            this.__clipper = _t._$$Clipper._$allocate(this.__copt);
        }
    };
};
define('{pro}widget/window/image.clipper.js',
      ['{com}ui/window/window.js'
      ,'{lib}util/clipper/clipper.js'],f);
