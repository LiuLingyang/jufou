var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _u = _('nej.u'),
        _y = _('nej.ut'),
        _x = _('mu.x'),
        _t = _('mu.ut'),
        _w = _('mu.w.w'),
        _p = _('mu.m.u'),
        _proModuleContact;
    /**
     * 组织模块基类
     * 
     * 
     */
    _p._$$ModuleContact = NEJ.C();
      _proModuleContact = _p._$$ModuleContact._$extend(_t._$$Module);
    /**
     * 控件初始化
     * @return {Void}
     */
    _proModuleContact.__doBuild = function(){
        // init group
        var _node = _e._$get('module-t0');
        this.__form = _node.getElementsByTagName('form')[0];
        _v._$addEvent(
            this.__form['btn-ok'],'click',
            this.__doChangeSearchKey._$bind(this)
        );
        _v._$addEvent(
            this.__form.keyword,'keypress',
            this.__doEnterSearchKey._$bind(this)
        );
        // init list
        // 0 - import contact
        // 1 - create contact
        // 2 - list box
        // 3 - pager box
        var _list = _e._$getByClassName('module-t1','js-flag');
        _v._$addEvent(
            _list[0],'click',
            this.__doImportContact._$bind(this)
        );
        _v._$addEvent(
            _list[1],'click',
            this.__doCreateContact._$bind(this)
        );
        _v._$addEvent(
            _list[2],'click',
            this.__doCheckAction._$bind(this)
        );
        this.__mopt = {
            parent:_list[2],
            item:'jst-contact-list',
            cache:{klass:_t._$$CacheContact,data:{}},
            pager:{parent:_list[3],clazz:'w-pager'},
            onemptylist:this.__onEmptyContact._$bind(this),
            onbeforelistload:this.__onLoadingContact._$bind(this),
            onupdate:this.__doUpdateContact._$bind(this),
            ondelete:this.__doDeleteContact._$bind(this)
        };
        this.__copt = {
            onok:this.__onCreateContact._$bind(this)
        };
        this.__uopt = {
            onok:this.__onUpdateContact._$bind(this)
        };
        this.__iopt = {
            message:'您确定要删除此联系人？',
            onok:this.__onDeleteContact._$bind(this)
        };
        this.__topt = {
            onok:this.__onImportContact._$bind(this)
        };
        this.__cache = _t._$$CacheContact._$allocate({
            onimport:this.__cbImportContact._$bind(this),
            onitemadd:this.__cbChangeContactList._$bind(this)
        });
        this.__tab = _y._$$Tab._$allocate({
            list:_e._$getByClassName(this.__form,'js-flag'),
            onchange:this.__doChangeGroup._$bind(this)
        });
    };
    /**
     * 
     */
    _proModuleContact.__doChangeSearchKey = function(){
        this.__doChangeGroup({
            data:this.__mopt.cache.data.sid
        });
    };
    /**
     * 
     * @param {Object} _event
     */
    _proModuleContact.__doEnterSearchKey = function(_event){
        if (_event.keyCode==13){
            _v._$stop(_event);
            this.__doChangeSearchKey();
        }
    };
    /**
     * 
     */
    _proModuleContact.__doChangeGroup = function(_event){
        var _gid = _event.data,
            _data = this.__mopt.cache.data,
            _keyword = this.__form.keyword.value.trim();
        //_data.sid = _gid;
        _data.keyword = _keyword;
        this.__mopt.cache.lkey = (_gid||'')+'-'+(_keyword||'');
        if (!!this.__lmdl)
            this.__lmdl._$recycle();
        this.__lmdl = _y._$$ListModulePG._$allocate(this.__mopt);
    };
    /**
     * 
     * @param {Object} _event
     */
    _proModuleContact.__doImportContact = function(_event){
        this.__wipt = _w._$$WindowContactImport
                        ._$allocate(this.__topt)._$show();
    };
    /**
     * 
     */
    _proModuleContact.__onImportContact = function(_event){
        if (!_event.ext) return;
        _event.stopped = !0;
        this.__xfom = _event.ext;
        this.__cache._$import(_event.ext);
    };
    /**
     * 
     * @param {Object} _event
     */
    _proModuleContact.__cbImportContact = function(_json){
        this.__xfom.reset();
        delete this.__xfom;
    	switch(_json.code){
            case 1:
                this.__wipt._$hide();
                this.__cbChangeContactList();
            return;
            case -4:
                this.__wipt._$message('导入文件过大！');
            return;
            case -5:
                this.__wipt._$message('不支持此文件格式！');
            return;
            case -11:
                this.__wipt._$message('未知导入文件格式！');
            return;
            default:
                this.__wipt._$message('暂时无法上传文件！');
            return;
        }
    };
    /**
     * 
     * @param {Object} _event
     */
    _proModuleContact.__doCreateContact = function(_event){
        _w._$$WindowContactCreate._$allocate(this.__copt)._$show();
    };
    /**
     * 
     */
    _proModuleContact.__onCreateContact = function(_data){
        this.__cache._$addItem({
            key:this.__mopt.cache.key,
            data:_data.data
        });
    };
    /**
     * 
     */
    _proModuleContact.__doUpdateContact = function(_event){
        this.__uopt.data = _event.data;
        this.__uopt.ext = _event.data;
        _w._$$WindowContactCreate._$allocate(this.__uopt)._$show();
    };
    /**
     * 
     */
    _proModuleContact.__onUpdateContact = function(_data){
        _data.data.cid = _data.ext.id;
        this.__lmdl._$update(_data.data);
    };
    /**
     * 
     */
    _proModuleContact.__doDeleteContact = function(_event){
        this.__iopt.ext = _event.data;
        _w._$$WindowConfirm._$allocate(this.__iopt)._$show();
    };
    /**
     * 
     */
    _proModuleContact.__onDeleteContact = function(_event){
        this.__lmdl._$delete(_event.ext);
    };
    /**
     * 
     * @param {Object} _event
     */
    _proModuleContact.__cbChangeContactList = function(_event){
        this.__cache._$clearListInCache(this.__mopt.cache.lkey);
        this.__lmdl._$refresh();
    };
    /**
     * 
     */
    _proModuleContact.__doCheckAction = function(_event){
        var _element = _v._$getElement(_event,'d:action');
        if (!_element) return;
        if ('create'==_e._$dataset(_element,'action')){
            _v._$stop(_event);
            this.__doCreateContact();
        }
    };
    /**
     * 
     */
    _proModuleContact.__onEmptyContact = function(_event){
        _event.value = _e._$getHtmlTemplate(
            'jst-contact-empty',{
                keyword:this.__mopt.cache.data.keyword
            });
    };
    /**
     * 
     * @param {Object} _event
     */
    _proModuleContact.__onLoadingContact = function(_event){
        _event.value = '<p class="w-loading">&nbsp;</p>'
    };
};
define('{pro}module/user/contact.js',
      ['{com}util/module/module.js'
      ,'{com}util/cache/contact.js'
      ,'{lib}util/tab/tab.js'
      ,'{lib}util/list/module.pager.js'
      ,'{pro}widget/window/confirm.js'
      ,'{pro}widget/window/contact.create.js'
      ,'{pro}widget/window/contact.import.js'],f);
