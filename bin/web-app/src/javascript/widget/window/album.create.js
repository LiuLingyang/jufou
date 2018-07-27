var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _i = _('mu.ui'),
        _p = _('mu.w.w'),
        _proWindowAlbumCreate;
    // html code
    var _seed_html = _e._$addNodeTemplate('\
        <form class="w-fom w-wfm">\
          <div class="blk cxx">\
            <p class="lab">相册名称</p>\
            <input type="text" class="txt bd01 w-rd3 wd0" name="name" data-required="true" maxlength="50" data-message="请输入相册名称"/>\
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
    _p._$$WindowAlbumCreate = NEJ.C();
      _proWindowAlbumCreate = _p._$$WindowAlbumCreate._$extend(_i._$$Window);
    /**
     * 控件重置
     */
    _proWindowAlbumCreate.__reset = function(_options){
        _options.title = _options.title||'创建相册';
        _options.clazz = 'w-win-0';
        this.__supReset(_options);
    };
    /**
     * 初始化外观
     */
    _proWindowAlbumCreate.__initXGui = function(){
        this.__seed_html = _seed_html;
    };
};
define('{pro}widget/window/album.create.js',
      ['{com}ui/window/window.js'],f);
