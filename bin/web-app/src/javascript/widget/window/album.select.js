var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _u = _('nej.u'),
        _i = _('mu.ui'),
        _p = _('mu.w.w'),
        _proWindowAlbumSelect;
    // html code
    var _seed_html = _e._$addNodeTemplate('\
        <form class="w-fom">\
          <div class="blk">\
            <p class="lab">相册</p>\
            <select class="bd01 w-rd3 wd0 mr5" name="aid"></select>\
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
    _p._$$WindowAlbumSelect = NEJ.C();
      _proWindowAlbumSelect = _p._$$WindowAlbumSelect._$extend(_i._$$Window);
    /**
     * 控件重置
     */
    _proWindowAlbumSelect.__reset = function(_options){
        _options.title = '选择相册';
        _options.clazz = 'w-win-b';
        this.__doClearSelect();
        this.__doInitAlbumList(_options.albums);
        this.__supReset(_options);
    };
    /**
     * 初始化外观
     */
    _proWindowAlbumSelect.__initXGui = function(){
        this.__seed_html = _seed_html;
    };
    /**
     * 
     */
    _proWindowAlbumSelect.__doClearSelect = function(){
        var _select = this.__form._$get('aid');
        _u._$reverseEach(
            _select.options,
            function(_node,_index,_list){
                _select.remove(_index);
            }
        );
    };
    /**
     * 
     */
    _proWindowAlbumSelect.__doInitAlbumList = function(_list){
        var _select = this.__form._$get('aid');
        _u._$forEach(_list,
            function(_album){
                _select.add(new Option(_album.name,_album.id));
            }
        );
    };
};
define('{pro}widget/window/album.select.js',
      ['{com}ui/window/window.js'],f);
