var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _u = _('nej.u'),
        _x = _('nej.ut'),
        _z = _('mu.x'),
        _w = _('mu.w.w'),
        _t = _('mu.ut'),
        _g = _('mu.m.g'),
        _p = _('mu.m.v'),
        _proModuleNewsShow;
    /**
     * 组织相册模块
     * 
     */
    _p._$$ModuleNewsShow = NEJ.C();
      _proModuleNewsShow = _p._$$ModuleNewsShow._$extend(_g._$$ModuleGroup);
    /**
     * 重置
     */
    _proModuleNewsShow.__reset = function(_options){
        this.__supReset(_options);
        this.__news = _options.news||_o;
    };
    /**
     * 
     */
    _proModuleNewsShow.__doBuild = function(){
    	var _list = _e._$getByClassName('module-x2','js-flag');
        _v._$addEvent(
            _list[0],'click',
            this.__doDelete._$bind(this)
        );
        this.__cache = _t._$$CacheNews._$allocate({
            onnewsdelete:this.__cbNewsDelete._$bind(this)
        });
    };
    /**
     * 
     */
    _proModuleNewsShow.__doDelete = function(_event){
    	_w._$$WindowConfirm._$allocate({
            title:'删除新闻确认',
            message:'您确定要删除该新闻？',
            onok:function(){
                this.__cache._$delete({
                    nid:this.__news.id
                });
            }._$bind(this)
        })._$show();
    };
    /**
     * 
     */
    _proModuleNewsShow.__cbNewsDelete = function(_json){
        switch(_json.code){
            case 1:
                location.href = config.page('/news/');
            return;
        }
    };
};
define('{pro}module/news/show.js',
      ['{pro}module/common/group.js'
      ,'{com}util/cache/news.js'],f);
