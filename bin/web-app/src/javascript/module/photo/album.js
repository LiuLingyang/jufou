var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _u = _('nej.u'),
        _i = _('nej.ui'),
        _t = _('mu.ut'),
        _w = _('mu.w.w'),
        _p = _('mu.m.g'),
        _proModuleAlbum;
    /**
     * 组织相册模块
     * 
     */
    _p._$$ModuleAlbum = NEJ.C();
      _proModuleAlbum = _p._$$ModuleAlbum._$extend(_p._$$ModuleGroup);
    /**
     * 重置
     */
    _proModuleAlbum.__reset = function(_options){
        this.__supReset(_options);
        // trigger change
        this.__onSortChange();
    };
    /**
     * 构建模块
     * @return {Void}
     */
    _proModuleAlbum.__doBuild = function(){
        this.__body = _e._$get('module-30');
        // 0 - create album
        var _list = _e._$getByClassName(this.__body,'js-yflag');
        _v._$addEvent(_list[0],'click',this.__doCreate._$bind(this));
        // 0 - sort type select
        // 1 - list box
        // 2 - pager box
        var _list = _e._$getByClassName(this.__body,'js-zflag');
        this.__nsort = _list[0];
        this.__nlbox = _list[1];
        _v._$addEvent(
            this.__nsort,'change',
            this.__onSortChange._$bind(this)
        );
        // init data and cache
        this.__popt = {
            index:1,
            limit:15,
            clazz:'w-pager',
            parent:_list[2]
        };
        this.__copt = {
            onok:this.__onCreate._$bind(this)
        };
        this.__cache = _t._$$CacheAlbum._$allocate({
            onlistload:this.__cbListLoaded._$bind(this),
            onitemadd:this.__cbItemAdd._$bind(this)
        });
    };
    /**
     * 数据加载中
     * @return {Void}
     */
    _proModuleAlbum.__doShowLoading = function(){
        _e._$setStyle(this.__popt.parent,'visibility','hidden');
        this.__nlbox.innerHTML = '<p class="w-loading">&nbsp;</p>';
    };
    /**
     * 排序变化事件
     */
    _proModuleAlbum.__onSortChange = function(){
        if (!!this.__pager)
            this.__pager = this.__pager._$recycle();
        this.__onPageChange({index:1});
    };
    /**
     * 页码变化事件
     */
    _proModuleAlbum.__onPageChange = (function(){
        var _order = ['createTime','createTime','name','name'],
            _desc  = ['asc','desc','asc','desc'];
        return function(_event){
            this.__doShowLoading();
            var _sort = this.__nsort.value;
            this.__rkey = 'album-'+_sort;
            this.__offset = (_event.index-1)*this.__popt.limit;
            this.__cache._$getList({
                key:this.__rkey,
                offset:this.__offset,
                limit:this.__popt.limit,
                data:{
                    type:_sort,
                    gid:this.__group.id,
                    order:_desc[_sort-1],
                    sort:_order[_sort-1],
                    total:this.__offset==0,
                    offset:this.__offset,
                    limit:this.__popt.limit
                }
            });
        };
    })();
    /**
     * 列表载入回调
     */
    _proModuleAlbum.__cbListLoaded = function(_options){
        if (_options.key!=this.__rkey||
            _options.offset!=this.__offset) return;
        var _key = _options.key;
        // check pager
        if (!this.__pager){
            var _total = Math.ceil(this.__cache._$getTotal(_key)/this.__popt.limit);
            this.__popt.total = _total;
            this.__pager = _i._$$Pager._$allocate(this.__popt);
            this.__pager._$setEvent('onchange',this.__onPageChange._$bind(this));
        }
        var _list = this.__cache._$getListInCache(_key);
        _e._$setStyle(this.__nsort.parentNode,'visibility',_list.length>0?'visible':'hidden');
        _e._$setStyle(this.__popt.parent,'visibility',this.__pager._$getTotal()>1?'visible':'hidden');
        _e._$renderHtmlTemplate(this.__nlbox,'jst-album-list',{
            xlist:_list,
            group:this.__group,
            beg:_options.offset,
            end:Math.min(_list.length,_options.offset+_options.limit)-1
        });
    };
    /**
     * 新建相册
     * 
     */
    _proModuleAlbum.__doCreate = function(_event){
        _v._$stop(_event);
        _w._$$WindowAlbumCreate._$allocate(this.__copt)._$show();
    };
    /**
     * 新建相册
     * 
     */
    _proModuleAlbum.__onCreate = function(_event){
        _event.data.gid = this.__group.id;
        this.__cache._$addItem({
            key:'album-'+this.__nsort.value,
            item:_event.data
        });
    };
    /**
     * 
     */
    _proModuleAlbum.__cbItemAdd = function(_options){
        var _key = _options.key;
        if (!_options.data){
            alert('暂时无法添加相册，请稍后再试！');
            return;
        }
        this.__cache._$clearListInCache(_key);
        this.__onPageChange({
            index:this.__pager._$getIndex()||1
        });
    };
};
define('{pro}module/photo/album.js',
      ['{pro}module/common/group.js'
      ,'{pro}widget/window/album.create.js'
      ,'{com}util/cache/album.js'
      ,'{lib}ui/pager/pager.js'],f);
