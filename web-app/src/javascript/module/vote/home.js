var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _u = _('nej.u'),
        _x = _('nej.ut'),
        _t = _('mu.ut'),
        _z = _('mu.x'),
        _g = _('mu.m.g'),
        _p = _('mu.m.v'),
        _pro;
    /**
     * 组织相册模块
     * 
     */
    _p._$$ModuleHome = NEJ.C();
    _pro = _p._$$ModuleHome._$extend(_g._$$ModuleGroup);
    /**
     * 重置
     */
    _pro.__reset = function(_options){
        this.__supReset(_options);
        this.__mopt.item.host = this.__host;
        this.__mopt.item.group = this.__group;
        this.__mopt.item.relation = _options.relation||0;
        this.__mopt.cache.data.gid = this.__group.id;
        this.__topt.index = _options.index||0;
        this.__taber = _x._$$Tab._$allocate(this.__topt);
    };
    /**
     * 构建模块
     * @return {Void}
     */
    _pro.__doBuild = function(){
        this.__topt = {
            list:_e._$getChildren('group-vote-btn'),
            onchange:this.__onListTypeChange._$bind(this)
        };
        this.__mopt = {
            limit:20,
            parent:'group-vote-box',
            item:{klass:'group-vote-list'},
            pager:{parent:'group-vote-pager'},
            cache:{klass:_t._$$CacheVote,
                   data:{order:'desc',sort:'createTime'}},
            onbeforelistload:function(_event){
                _event.value = '<p class="w-loading">&nbsp;</p>';
            },
            onemptylist:function(_event){
                _event.value = _e._$getTextTemplate('txt-home-novote');
            }._$bind(this)
        };
    };
    /**
     * 
     */
    _pro.__onListTypeChange = function(_event){
        if (this.__xmdl)
            this.__xmdl._$recycle();
        var _itm = this.__mopt.item;
        _itm.state = _event.index;
        _itm.homepage = this.__group.homepage;
        var _cache = this.__mopt.cache;
        _cache.data.type = _event.index;
        _cache.lkey = 'vote-'+_event.index;
        this.__xmdl = _x._$$ListModulePG._$allocate(this.__mopt);
    };
};
define('{pro}module/vote/home.js',
      ['{pro}module/common/group.js'
      ,'{com}util/cache/vote.js'
      ,'{lib}util/tab/tab.js'
      ,'{lib}util/list/module.pager.js'],f);
