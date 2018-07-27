var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _u = _('nej.u'),
        _y = _('nej.ut'),
        _x = _('mu.x'),
        _t = _('mu.ut'),
        _i = _('mu.w.i'),
        _p = _('mu.m.u'),
        _proModuleGroup;
    /**
     * 组织模块基类
     * 
     * 
     */
    _p._$$ModuleGroup = NEJ.C();
      _proModuleGroup = _p._$$ModuleGroup._$extend(_t._$$Module);
    /**
     * 
     */
    _proModuleGroup.__reset = function(_options){
        this.__supReset(_options);
        var _data = this.__myopt.cache;
        _data.data.uid = this.__host.id;
        this.__myopt.item.host = this.__host;
        _data.lkey = 'create-group-'+this.__host.id;
        this.__mycg = _y._$$ListModuleWF._$allocate(this.__myopt);
        var _data = this.__jnopt.cache;
        _data.data.uid = this.__host.id;
        this.__jnopt.item.host = this.__host;
        _data.lkey = 'join-group-'+this.__host.id;
        this.__myjg = _y._$$ListModuleWF._$allocate(this.__jnopt);
    };
    /**
     * 控件初始化
     * @return {Void}
     */
    _proModuleGroup.__doBuild = function(){
        this.__body = _e._$get('module-g1');
        // 0 - my group list box
        // 1 - my join group list box
        var _list = _e._$getByClassName(this.__body,'js-flag');
        this.__myopt = {
            limit:1000,
            parent:_list[0],
            item:{klass:_i._$$ItemGroup,relation:3},
            cache:{klass:_t._$$CacheGroup,data:{}},
            onbeforelistload:function(_event){
                _event.value = '<p class="w-loading">&nbsp;</p>';
            },
            onemptylist:function(_event){
                _event.value = '<p class="w-message">没有创建组织！</p>';
            }
        };
        this.__jnopt = {
            limit:1000,
            parent:_list[1],
            item:{klass:_i._$$ItemGroup},
            cache:{klass:_t._$$CacheGroup,data:{}},
            onbeforelistload:function(_event){
                _event.value = '<p class="w-loading">&nbsp;</p>';
            },
            onemptylist:function(_event){
                _event.value = '<p class="w-message">没有加入组织！</p>';
            }
        };
    };
};
define('{pro}module/user/group.js',
      ['{com}util/module/module.js'
      ,'{com}util/cache/group.js'
      ,'{pro}widget/item/group.js'
      ,'{lib}util/list/module.waterfall.js'],f);
