var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _u = _('nej.u'),
        _x = _('nej.ut'),
        _t = _('mu.ut'),
        _z = _('mu.x'),
        _i = _('mu.w.i'),
        _w = _('mu.w.w'),
        _p = _('mu.m.g'),
        _proModuleHome;
    /**
     * 组织相册模块
     * 
     */
    _p._$$ModuleHome = NEJ.C();
      _proModuleHome = _p._$$ModuleHome._$extend(_p._$$ModuleGroup);
    /**
     * 重置
     */
    _proModuleHome.__reset = function(_options){
        this.__supReset(_options);
        this.__mopt.item.host = this.__host;
        this.__mopt.item.group = this.__group;
        this.__mopt.item.relation = _options.relation||0;
        this.__mopt.cache.data.gid = this.__group.id;
        this.__vopt.cache.data.gid = this.__group.id;
        this.__vmdl = _x._$$ListModuleWF._$allocate(this.__vopt);
        this.__topt.index = _options.index||0;
        this.__taber = _x._$$Tab._$allocate(this.__topt);
    };
    /**
     * 构建模块
     * @return {Void}
     */
    _proModuleHome.__doBuild = function(){
    	this.__topt = {
            list:_e._$getChildren('home-meeting-btn'),
            onchange:this.__onListTypeChange._$bind(this)
        };
        this.__mopt = {
            limit:10,item:{},
            more:'home-meeting-more',
            parent:'home-meeting-box',
            cache:{klass:_t._$$CacheMeeting,
                   data:{order:'desc',sort:'startTime'}},
            onbeforelistload:function(_event){
                _event.value = '<p class="w-loading">&nbsp;</p>';
            },
            onemptylist:function(_event){
                var _type = this.__mopt.cache.data.type;
                switch(_type){
                    case 0:
                        _event.value = _e._$getTextTemplate('txt-home-nomeet');
                    break;
                    case 1:
                        _event.value = _e._$getTextTemplate('txt-home-nomeet2');
                    break;
                    case 2:
                        _event.value = _e._$getTextTemplate('txt-home-nomeet2');
                    break;
                }  
            }._$bind(this)
        };
        var _list = _e._$getByClassName('module-5','j-flag');
        this.__vopt = {
            limit:10,
            more:_list[1],
            parent:_list[0],
            item:'event-list',
            cache:{klass:_t._$$CacheEvent,lkey:'recent-list',data:{}},
            onbeforelistload:_z._$showLoading,
            onemptylist:function(_event){
                _event.value = '<div class="w-message">没有动态</div>';
            }
        };
    };
    /**
     * 
     */
    _proModuleHome.__onListTypeChange = function(_event){
    	if (this.__xmdl)
    	    this.__xmdl._$recycle();
    	var _itm = this.__mopt.item;
    	switch(_event.index){
    	    case 0:
    	        _itm.klass = _i._$$ItemMeeting;
    	    break;
    	    case 1:
    	        _itm.klass = 'jst-meeting-list';
    	    break;
    	    case 2:
    	        _itm.klass = 'jst-meeting-draft';
    	    break;
    	}
    	this.__mopt.cache.data.type = _event.index;
    	this.__mopt.cache.lkey = 'meeting-'+_event.index;
    	this.__xmdl = _x._$$ListModuleWF._$allocate(this.__mopt);
    };
};
define('{pro}module/group/home.js',
      ['{pro}module/common/group.js'
      ,'{pro}widget/item/meeting.js'
      ,'{com}util/cache/meeting.js'
      ,'{com}util/cache/event.js'
      ,'{lib}util/tab/tab.js'
      ,'{lib}util/list/module.waterfall.js'],f);
