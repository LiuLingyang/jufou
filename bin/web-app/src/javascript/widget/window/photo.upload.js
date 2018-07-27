var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _i = _('mu.ui'),
        _p = _('mu.w.w'),
        _proWindowPhotoUpload;
    // html code
    var _seed_html = _e._$addNodeTemplate('\
        <form class="w-fom">\
          <div class="blk blk-0 xbtn">\
            <input type="hidden" name="gid"/>\
            <input type="hidden" name="aid"/>\
            <input type="file" name="file" class="xuf"/>\
            <input type="button" class="w-rd3 btn btn-k" name="btn-ok" value="选择文件"/>\
            <div class="w-loading js-flag" style="display:none;">&nbsp;</div>\
          </div>\
        </form>');
    /**
     * 窗体控件基类
     * 
     */
    _p._$$WindowPhotoUpload = NEJ.C();
      _proWindowPhotoUpload = _p._$$WindowPhotoUpload._$extend(_i._$$Window);
    /**
     * 控件重置
     */
    _proWindowPhotoUpload.__reset = function(_options){
        _options.title = _options.title||'上传相片';
        _options.clazz = 'w-win-1';
        this.__supReset(_options);
        this._$refresh();
        this.__body.gid.value = _options.gid||'';
        this.__body.aid.value = _options.aid||'';
    };
    /**
     * 初始化外观
     */
    _proWindowPhotoUpload.__initXGui = function(){
        this.__seed_html = _seed_html;
    };
    /**
     * 
     */
    _proWindowPhotoUpload.__initNode = function(){
        this.__supInitNode();
        _v._$addEvent(
            this.__body.file,'change',
            this.__onFileChange._$bind(this)
        );
    };
    /**
     * 
     */
    _proWindowPhotoUpload.__onFileChange = function(){
        var _btn = this.__body['btn-ok'];
        var _list = _e._$getByClassName(this.__body,'js-flag');
        _e._$setStyle(_btn,'display','none');
        _e._$setStyle(_list[0],'display','');
        if (_btn.disabled){
            alert('文件上传中，请稍后...');
            return;
        }
        _btn.disabled = !0;
        this._$dispatchEvent('onok',this.__body);
    };
    /**
     * 
     */
    _proWindowPhotoUpload._$refresh = function(){
    	_e._$setStyle(this.__body['btn-ok'],'display','');
    	_e._$setStyle(_e._$getByClassName(this.__body,'js-flag')[0],'display','none');
        this.__body.reset();
        this.__body['btn-ok'].disabled = !1;
    };
};
define('{pro}widget/window/photo.upload.js',
      ['{com}ui/window/window.js'],f);
