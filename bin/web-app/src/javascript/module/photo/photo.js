var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _u = _('nej.u'),
        _i = _('nej.ui'),
        _x = _('mu.x'),
        _t = _('mu.ut'),
        _w = _('mu.w.w'),
        _p = _('mu.m.g'),
        _proModulePhoto;
    /**
     * 组织相册模块
     * 
     */
    _p._$$ModulePhoto = NEJ.C();
      _proModulePhoto = _p._$$ModulePhoto._$extend(_p._$$ModuleGroup);
    /**
     * 重置
     */
    _proModulePhoto.__reset = function(_options){
        this.__supReset(_options);
        this.__album = _options.album||_o;
        this.__uopt.aid = this.__album.id;
        this.__uopt.gid = this.__group.id;
        var _total = Math.ceil(this.
            __album.photoCount/this.__popt.limit);
        this.__popt.total = _total;
        _e._$setStyle(this.__popt.parent,'visibility',_total>1?'visible':'hidden');
        this.__pager = _i._$$Pager._$allocate(this.__popt);
    };
    /**
     * 构建模块
     * @return {Void}
     */
    _proModulePhoto.__doBuild = function(){
        this.__body = _e._$get('module-31');
        // 0 - upload photo
        var _list = _e._$getByClassName(this.__body,'js-yflag');
        this.__nalbn = _list[0];
        _v._$addEvent(
            this.__nalbn.parentNode,
            'click',this.__onAction._$bind(this)
        );
        // 0 - list box
        // 1 - pager box
        var _list = _e._$getByClassName(this.__body,'js-zflag');
        this.__nlbox = _list[0];
        // init data and cache
        this.__popt = {
            index:1,
            limit:15,
            clazz:'w-pager',
            parent:_list[1],
            onchange:this.__onPageChange._$bind(this)
        };
        this.__uopt = {
            onok:this.__onUpload._$bind(this)
        };
        this.__aopt = {
            title:'重命名相册',data:{},
            onok:this.__onRenameAlbum._$bind(this)
        };
        this.__fopt = {
            title:'删除确认',
            message:'确定要删除此相册？',
            onok:this.__onConfirmAlbumDelete._$bind(this)
        };
        this.__cache = _t._$$CacheAlbum._$allocate({
            onlistload:this.__cbListLoaded._$bind(this),
            onitemadd:this.__cbItemAdd._$bind(this),
            onalbumupdate:this.__cbAlbumUpdate._$bind(this),
            onitemdelete:this.__cbItemDelete._$bind(this)
        });
    };
    /**
     * 数据加载中
     * @return {Void}
     */
    _proModulePhoto.__doShowLoading = function(){
        this.__nlbox.innerHTML = '<p class="w-loading">&nbsp;</p>';
    };
    /**
     * 页码变化事件
     */
    _proModulePhoto.__onPageChange = function(_event){
        this.__doShowLoading();
        this.__offset = (_event.index-1)*this.__popt.limit;
        this.__cache._$getList({
            key:'photo-'+this.__album.id,
            offset:this.__offset,
            limit:this.__popt.limit,
            data:{
                aid:this.__album.id,
                offset:this.__offset,
                limit:this.__popt.limit
            }
        });
    };
    /**
     * 列表载入回调
     */
    _proModulePhoto.__cbListLoaded = function(_options){
        if (_options.offset!=this.__offset) return;
        var _list = this.__cache._$getListInCache(_options.key);
        _e._$renderHtmlTemplate(this.__nlbox,'jst-photo-list',{
            xlist:_list,
            group:this.__group,
            beg:_options.offset,
            end:Math.min(_list.length,_options.offset+_options.limit)-1
        });
    };
    /**
     * 
     */
    _proModulePhoto.__onAction = function(_event){
        var _element = _v._$getElement(_event,'d:action');
        if (!_element) return;
        _v._$stop(_event);
        var _action = _e._$dataset(_element,'action');
        switch(_action){
            case 'upload':
                this.__window = _w._$$WindowPhotoUpload
                                  ._$allocate(this.__uopt);
                this.__window._$show();
            return;
            case 'rename':
                this.__aopt.data.name = this.__album.name;
                _w._$$WindowAlbumCreate._$allocate(this.__aopt)._$show();
            break;
            case 'delete':
                _w._$$WindowConfirm._$allocate(this.__fopt)._$show();
            break;
        }
    };
    /**
     * 上传相片
     * @param {Object} _event
     */
    _proModulePhoto.__onUpload = function(_form){
        this.__cache._$addItem({
            key:'photo-'+this.__album.id,
            item:_form
        });
    };
    /**
     * 上传相片
     * @param {Object} _event
     */
    _proModulePhoto.__cbItemAdd = function(_options){
        this.__window._$refresh();
        if (!_options.data){
            _x._$showError('文件上传失败，请重试！');
            return;
        }
        this.__window._$hide();
        this.__onPageChange({
            index:this.__pager._$getIndex()||1
        });
    };
    /**
     * 
     */
    _proModulePhoto.__onRenameAlbum = function(_event){
        var _data = _event.data;
        _data.aid = this.__album.id;
        this.__cache._$updateAlbum(_data);
    };
    /**
     * 
     */
    _proModulePhoto.__cbAlbumUpdate = function(_json){
        if (_json.code!=1){
            _x._$showError('暂时无法更新相册，请稍候再试！');
            return;
        }
        _x._$showSuccess('相册更新成功！');
        this.__album = _json.result;
        this.__nalbn.innerText = this.__album.name;
    };
    /**
     * 
     */
    _proModulePhoto.__onConfirmAlbumDelete = function(){
        this.__cache._$deleteItem({
            id:this.__album.id,
            key:'album-'+this.__group.id,
            data:{aid:this.__album.id}
        });
    };
    /**
     * 
     */
    _proModulePhoto.__cbItemDelete = function(_options){
        if (!_options.data){
            _x._$showError('暂时无法删除相册，请稍候再试！');
            return;
        }
        location.href = config.page('/album/');
    };
};
define('{pro}module/photo/photo.js',
      ['{pro}module/common/group.js'
      ,'{pro}widget/window/confirm.js'
      ,'{pro}widget/window/photo.upload.js'
      ,'{pro}widget/window/album.create.js'
      ,'{com}util/cache/album.js'
      ,'{lib}ui/pager/pager.js'],f);
