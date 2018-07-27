var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _u = _('nej.u'),
        _x = _('nej.ut'),
        _z = _('mu.x'),
        _t = _('mu.ut'),
        _w = _('mu.w.w'),
        _p = _('mu.m.g'),
        _proModulePhotoShow;
    /**
     * 组织相册模块
     * 
     */
    _p._$$ModulePhotoShow = NEJ.C();
      _proModulePhotoShow = _p._$$ModulePhotoShow._$extend(_p._$$ModuleGroup);
    /**
     * 重置
     */
    _proModulePhotoShow.__reset = function(_options){
        this.__supReset(_options);
        this.__album = _options.album||_o;
        this.__photo = _options.photo||_o;
        this.__uopt.aid = this.__album.id;
        this.__copt.host = this.__host;
        this.__copt.group = this.__group;
        this.__copt.owner = this.__photo;
        this.__cmdl = _p._$$ModuleComment._$allocate(this.__copt);
        this.__mopt.cache.data.aid = this.__album.id;
        this.__mopt.cache.lkey = 'photo-'+this.__album.id;
        this.__lmdl = _x._$$ListModulePG._$allocate(this.__mopt);
        
    };
    /**
     * 
     */
    _proModulePhotoShow.__destroy = function(){
        this.__supDestroy();
        this.__cmdl = this.__cmdl._$recycle();
        this.__lmdl = this.__lmdl._$recycle();
    };
    /**
     * 构建模块
     * @return {Void}
     */
    _proModulePhotoShow.__doBuild = function(){
        this.__body = _e._$get('module-40');
        // 0 - list box
        // 1 - pager box
        // 2 - comment box
        var _list = _e._$getByClassName(this.__body,'js-xflag');
        this.__mopt = {
            limit:15,
            parent:_list[0],
            item:'jst-photo-list',
            cache:{klass:_t._$$CacheAlbum,data:{}},
            pager:{parent:_list[1],klass:_x._$$SimplePage},
            onbeforelistload:this.__onPhotoLoading._$bind(this)
        };
        this.__copt = {
            parent:_list[2],type:2
        };
        // 0 - album action
        // 1 - photo action
        var _list = _e._$getByClassName(this.__body,'js-yflag');
        this.__nalbn = _e._$getChildren(_list[0])[0];
        _v._$addEvent(
            _list[0],'click',
            this.__onAlbumAction._$bind(this)
        );
        _v._$addEvent(
            _list[1],'click',
            this.__onPhotoAction._$bind(this)
        );
        this.__uopt = {
            onok:this.__onUpload._$bind(this)
        };
        this.__aopt = {
            title:'重命名相册',data:{},
            onok:this.__onRenameAlbum._$bind(this)
        };
        this.__fopt = {
            message:'确定要删除此相册？',
            onok:this.__onConfirmAlbumDelete._$bind(this)
        };
        this.__popt = {
            message:'确定要删除此相片？',
            onok:this.__onConfirmPhotoDelete._$bind(this)
        };
        this.__vopt = {
            onok:this.__onMovePhoto._$bind(this)
        };
        this.__cache = _t._$$CacheAlbum._$allocate({
            onitemadd:this.__cbItemAdd._$bind(this),
            onitemdelete:this.__cbItemDelete._$bind(this),
            onalbumupdate:this.__cbAlbumUpdate._$bind(this),
            onphotomove:this.__cbPhotoMove._$bind(this),
            onlistload:this.__cbAlbumListLoad._$bind(this)
        });
    };
    /**
     * 
     * @param {Object} _event
     */
    _proModulePhotoShow.__onPhotoLoading = function(_event){
        _event.value = '<p class="w-loading">&nbsp;</p>';
    };
    /**
     * 
     * @param {Object} _event
     */
    _proModulePhotoShow.__onAlbumAction = function(_event){
        var _node = _v._$getElement(_event,'d:action');
        if (!_node) return;
        _v._$stop(_event);
        var _action = _e._$dataset(_node,'action');
        switch(_action){
            case 'upload':
                this.__window = _w._$$WindowPhotoUpload
                                  ._$allocate(this.__uopt);
                this.__window._$show();
            break;
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
    _proModulePhotoShow.__onUpload = function(_form){
        this.__cache._$addItem({
            key:this.__mopt.cache.lkey,
            item:_form
        });
    };
    /**
     * 上传相片
     * @param {Object} _event
     */
    _proModulePhotoShow.__cbItemAdd = function(_options){
        this.__window._$refresh();
        if (!_options.data){
            _z._$showError('文件上传失败，请重试！');
            return;
        }
        this.__cache._$clearListInCache(_options.key);
        this.__window._$hide();
        this.__lmdl._$refresh();
    };
    /**
     * 
     */
    _proModulePhotoShow.__onRenameAlbum = function(_event){
        var _data = _event.data;
        _data.aid = this.__album.id;
        this.__cache._$updateAlbum(_data);
    };
    /**
     * 
     */
    _proModulePhotoShow.__cbAlbumUpdate = function(_json){
        if (_json.code!=1){
            _z._$showError('暂时无法更新相册，请稍候再试！');
            return;
        }
        _z._$showSuccess('相册更新成功！');
        this.__album = _json.result;
        this.__nalbn.innerText = this.__album.name;
    };
    /**
     * 
     * @param {Object} _event
     */
    _proModulePhotoShow.__onPhotoAction = function(_event){
        var _node = _v._$getElement(_event,'d:action');
        if (!_node) return;
        _v._$stop(_event);
        var _action = _e._$dataset(_node,'action');
        switch(_action){
            case 'slide':
                
            break;
            case 'cover':
                this.__cache._$updateAlbum({
                    aid:this.__album.id,
                    pid:this.__photo.id
                });
            break;
            case 'delete':
                _w._$$WindowConfirm._$allocate(this.__popt)._$show();
            break;
            case 'move':
                this.__cache._$getList({
                    offset:0,limit:100,
                    data:{gid:this.__group.id},
                    key:'album-'+this.__group.id
                });
            break;
        }
    };
    /**
     * 
     */
    _proModulePhotoShow.__cbAlbumListLoad = function(_options){
        this.__vopt.albums = this.__cache._$getListInCache(_options.key);
        _w._$$WindowAlbumSelect._$allocate(this.__vopt)._$show();
    };
    /**
     * 
     */
    _proModulePhotoShow.__onMovePhoto = function(_event){
        this.__cache._$movePhoto({
            aid:_event.data.aid,
            pid:this.__photo.id
        });
    };
    /**
     * 
     */
    _proModulePhotoShow.__cbPhotoMove = function(_json){
        if (_json.code!=1){
            _z._$showError('暂时无法移动相片，请稍候再试！');
            return;
        }
        location.reload();
    };
    /**
     * 
     */
    _proModulePhotoShow.__onConfirmAlbumDelete = function(){
        this.__cache._$deleteItem({
            id:this.__album.id,
            key:'album-'+this.__group.id,
            data:{aid:this.__album.id}
        });
    };
    /**
     * 
     */
    _proModulePhotoShow.__onConfirmPhotoDelete = function(){
        this.__cache._$deleteItem({
            id:this.__photo.id,
            key:'photo-'+this.__album.id,
            data:{aid:this.__album.id,pid:this.__photo.id}
        });
    };
    /**
     * 
     */
    _proModulePhotoShow.__cbItemDelete = function(_options){
        var _type = _options.key.split('-')[0];
        if (!_options.data){
            _z._$showError(_type=='album' ? '暂时无法删除相册，请稍候再试！'
                                 : '暂时无法删除相片，请稍候再试！');
            return;
        }
        if (_type=='album'){
            location.href = config.page('/album/');
            return;
        }
        location.href = config.page('/album/'+this.__album.id+'/');
    };
    
};
define('{pro}module/photo/photo.show.js',
      ['{pro}module/common/group.js'
      ,'{pro}module/comment/comment.js'
      ,'{pro}widget/window/confirm.js'
      ,'{pro}widget/window/photo.upload.js'
      ,'{pro}widget/window/album.create.js'
      ,'{pro}widget/window/album.select.js'
      ,'{com}util/cache/album.js'
      ,'{lib}ui/pager/pager.js'
      ,'{lib}util/list/module.pager.js'],f);
