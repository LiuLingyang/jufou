var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _u = _('nej.u'),
        _x = _('nej.ut'),
        _t = _('mu.ut'),
        _z = _('mu.x'),
        _w = _('mu.w.w'),
        _g = _('mu.m.g'),
        _p = _('mu.m.v'),
        _proModuleContact;
    /**
     * 组织相册模块
     * 
     */
    _p._$$ModuleContact = NEJ.C();
      _proModuleContact = _p._$$ModuleContact._$extend(_g._$$ModuleGroup);
    /**
     * 重置
     */
    _proModuleContact.__reset = function(_options){
        this.__supReset(_options);
        this.__mopt.item.host = this.__host;
        this.__mopt.item.group = this.__group;
        this.__mopt.item.relation = _options.host.relationship||0;
        this.__mopt.cache.data.gid = this.__group.id;
        if (!!this.__xmdl)
            this.__xmdl._$recycle();
        var _itm = this.__mopt.item;
        _itm.homepage = this.__group.homepage;
        this.__xmdl = _x._$$ListModulePG._$allocate(this.__mopt);
    };
    /**
     * 构建模块
     * @return {Void}
     */
    _proModuleContact.__doBuild = function(){
    	// init list
        // 0 - import contact
        // 1 - create contact
        var _list = _e._$getByClassName('module-v0','js-xflag');
        _v._$addEvent(
            _list[0],'click',
            this.__doImportContact._$bind(this)
        );
        _v._$addEvent(
            _list[1],'click',
            this.__doCreateContact._$bind(this)
        );
        this.__mopt = {
            limit:20,
            parent:'group-contact-box',
            item:{klass:'group-contact-list'},
            pager:{parent:'group-contact-pager'},
            cache:{
            	lkey:'contact-list',
            	klass:_t._$$CacheContact,
            	data:{}
        	},
            onbeforelistload:function(_event){
                _event.value = '<p class="w-loading">&nbsp;</p>';
            },
            onemptylist:function(_event){
                _event.value = _e._$getTextTemplate('txt-home-nocontact');
            }._$bind(this),
            onupdate:this.__doUpdateContact._$bind(this),
            ondelete:this.__doDeleteContact._$bind(this)
        };
        this.__topt = {
            onok:this.__onImportContact._$bind(this)
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
        this.__cache = _t._$$CacheContact._$allocate({
            onimport:this.__cbImportContact._$bind(this)
        });
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
        var _gid = this.__group.id;
        this.__cache._$gimport(_event.ext,_gid);
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
    	_data.data.gid = this.__group.id;
        this.__xmdl._$add(_data.data);
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
        this.__xmdl._$update(_data.data);
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
        this.__xmdl._$delete(_event.ext);
    };
    /**
     * 
     * @param {Object} _event
     */
    _proModuleContact.__cbChangeContactList = function(_event){
        this.__cache._$clearListInCache(this.__mopt.cache.lkey);
        this.__xmdl._$refresh();
    };
};
define('{pro}module/group/contact.js',
      ['{pro}module/common/group.js'
      ,'{com}util/cache/contact.js'
      ,'{lib}util/list/module.pager.js'
      ,'{pro}widget/window/confirm.js'
      ,'{pro}widget/window/group.contact.create.js'
      ,'{pro}widget/window/group.contact.import.js'],f);
