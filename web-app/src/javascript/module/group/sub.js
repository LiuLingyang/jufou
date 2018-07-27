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
        _proModuleSub;
    /**
     * 组织相册模块
     * 
     */
    _p._$$ModuleSub = NEJ.C();
      _proModuleSub = _p._$$ModuleSub._$extend(_g._$$ModuleGroup);
    /**
     * 重置
     */
    _proModuleSub.__reset = function(_options){
        this.__supReset(_options);
        this.__mopt.item.host = this.__host;
        this.__mopt.item.group = this.__group;
        this.__mopt.item.relation = _options.host.relationship||0;
        if (!!this.__xmdl)
            this.__xmdl._$recycle();
        var _itm = this.__mopt.item;
        _itm.homepage = this.__group.homepage;
        //父组织tag分配
        var _id = this.__group.id;
        if(_id == 69){
        	this.__mopt.cache.data.tag = "zjtcm#sub";
        }else if(_id == 157){
        	this.__mopt.cache.data.tag = "zjgsu#sub";
        }
        this.__xmdl = _x._$$ListModulePG._$allocate(this.__mopt);
    };
    /**
     * 构建模块
     * @return {Void}
     */
    _proModuleSub.__doBuild = function(){
        this.__mopt = {
            limit:18,
            parent:'group-sub-box',
            item:{klass:'group-sub-list'},
            pager:{parent:'group-sub-pager'},
            cache:{
            	lkey:'search-list',
            	klass:_t._$$CacheGroup,
            	data:{sort:'createTime',order:'desc'}
        	},
            onbeforelistload:function(_event){
                _event.value = '<p class="w-loading">&nbsp;</p>';
            },
            onemptylist:function(_event){
                _event.value = _e._$getTextTemplate('txt-home-nosub');
            }._$bind(this)
        };
    };
};
define('{pro}module/group/sub.js',
      ['{pro}module/common/group.js'
      ,'{com}util/module/module.js'
      ,'{com}util/cache/group.js'
      ,'{lib}util/list/module.pager.js'],f);
