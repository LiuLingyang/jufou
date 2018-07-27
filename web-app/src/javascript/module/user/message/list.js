var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _f = NEJ.F,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _u = _('nej.u'),
        _y = _('nej.ui'),
        _x = _('nej.ut'),
        _t = _('mu.ut'),
        _p = _('mu.m.u'),
        _proModuleMessageList,
        _supModuleMessageList;
    /**
     * 组织模块基类
     * 
     * 
     */
    _p._$$ModuleMessageList = NEJ.C();
      _proModuleMessageList = _p._$$ModuleMessageList._$extend(_t._$$Module);
      _supModuleMessageList = _p._$$ModuleMessageList._$supro;
    /**
     * 
     */
    _proModuleMessageList.__doBuild = function(){
        this.__body = _e._$html2node(_e._$getTextTemplate(this.__mkey));
        // 0 - list box
        // 1 - pager box
        var _list = _e._$getByClassName(this.__body,'js-flag');
        this.__mopt = {
            limit:10,
            parent:_list[0],
            item:{klass:this.__skey},
            cache:{klass:_t._$$CacheMessage,data:this.__data},
            pager:{parent:_list[1],clazz:'w-pager'},
            onbeforelistload:function(_event){
                _event.value = '<p class="w-loading">&nbsp;</p>';
            },
            onemptylist:function(_event){
                _event.value = '<p class="w-message">没有数据！</p>';
            }
        };
    };
    /**
     * 
     */
    _proModuleMessageList.__onRefresh = function(_options){
        _supModuleMessageList.__onRefresh.apply(this,arguments);
        _options.data.parent.appendChild(this.__body);
        if (!!this.__lmdl) this.__lmdl._$recycle();
        this.__mopt.cache.lkey = _options.umi;
        this.__onBeforeShow(_options);
        this.__lmdl = _x._$$ListModulePG._$allocate(this.__mopt);
    };
    /**
     * 
     */
    _proModuleMessageList.__onHide = function(){
        _supModuleMessageList.__onHide.apply(this,arguments);
        if (!!this.__lmdl){
            this.__lmdl._$recycle();
            delete this.__lmdl;
        }
    };
    /**
     * 
     */
    _proModuleMessageList.__onBeforeShow = _f;
};
define('{pro}module/user/message/list.js',
      ['{com}util/module/module.js'
      ,'{com}util/cache/message.js'
      ,'{lib}util/list/module.pager.js'],f);
