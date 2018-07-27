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
        _proModuleUserHome;
    /**
     * 组织模块基类
     * 
     * 
     */
    _p._$$ModuleUserHome = NEJ.C();
      _proModuleUserHome = _p._$$ModuleUserHome._$extend(_t._$$Module);
    /**
     * 
     */
    _proModuleUserHome.__reset = function(_options){
        this.__supReset(_options);
        this.__locked = !0;
        this.__taber = _y._$$Tab._$allocate(this.__topt);
        this.__calendar = _y._$$Calendar._$allocate(this.__copt);
        this.__locked = !1;
        this.__doChangeList();
    };
    /**
     * 控件初始化
     * @return {Void}
     */
    _proModuleUserHome.__doBuild = function(){
        // 0 - type select
        // 1 - more meeting button
        var _list = _e._$getByClassName('module-h1','js-flag');
        this.__ntype = _list[0];
        _v._$addEvent(
            this.__ntype,'change',
            this.__onSelectChange._$bind(this)
        );
        // tab options
        this.__topt = {
            list:_e._$getChildren('user-meeting-btn'),
            onchange:this.__onTabChange._$bind(this)
        };
        // list module options
        this.__lopt = {
            more:_list[1],
            parent:'user-meeting-box',
            item:{
                klass:_i._$$ItemMeeting,
                nnow:_e._$html2node(
                    _e._$getHtmlTemplate('jst-meeting-timeline',{text:'今天'})
                ),
                nwek:_e._$html2node(
                    _e._$getHtmlTemplate('jst-meeting-timeline',{text:'本周'})
                ),
                nmre:_e._$html2node(
                    _e._$getHtmlTemplate('jst-meeting-timeline',{text:'更早'})
                )
            },
            cache:{klass:_t._$$CacheMeeting,
                data:{
                    filter:0,
                    time:_u._$format(new Date,'yyyy-MM-dd')
                }},
            onemptylist:this.__onListEmpty._$bind(this),
            onbeforelistload:this.__onListLoading._$bind(this)
        };
        // 
        var _list = _e._$getByClassName('module-h2','js-flag');
        // calendar options
        this.__copt = {
            yprv:_list.shift(),
            mprv:_list.shift(),
            ynxt:_list.shift(),
            mnxt:_list.shift(),
            year:_list.shift(),
            month:_list.shift(),
            list:_list,
            onchange:this.__onCalendarChange._$bind(this),
            onselect:this.__onCalendarChange._$bind(this)
        };
    };
    /**
     * 
     */
    _proModuleUserHome.__onTabChange = (function(){
        var _config = [
                {order:'asc',sort:'startTime'},
                {order:'desc',sort:'endTime'}
            ];
        return function(_event){
            var _data = this.__lopt.cache.data;
            _data.type = _event.index;
            var _conf = _config[_data.type];
            _data.order = _conf.order;
            _data.sort = _conf.sort;
            if (!this.__locked) this.__doChangeList();
        };
    })();
    /**
     * 
     */
    _proModuleUserHome.__onSelectChange = function(_event){
        this.__lopt.cache.data.filter = this.__ntype.value;
        if (!this.__locked) this.__doChangeList();
    };
    /**
     * 
	 * @param {Object} _event
     */
    _proModuleUserHome.__onCalendarChange = function(_date){
        this.__lopt.cache.data.time = _u._$format(_date,'yyyy-MM-dd');
        if (!this.__locked) this.__doChangeList();
    };
    /**
     * 
     */
    _proModuleUserHome.__doChangeList = (function(){
        var _list = ['type','filter','time'];
        var _doParseKey = function(_map){
            var _arr = ['host'];
            _u._$forIn(_map,function(_value){
                _arr.push(_value);
            });
            return _arr.join('-');
        };
        return function(){
            this.__lopt.cache.lkey = _doParseKey(this.__lopt.cache.data);
            if (!!this.__lmdl)
                this.__lmdl._$recycle();
            this.__lmdl = _y._$$ListModuleWF._$allocate(this.__lopt);
        };
    })();
    /**
     * 
     * @param {Object} _event
     */
    _proModuleUserHome.__onListEmpty = function(_event){
        _event.value = '<p class="w-message">没有活动列表</p>';
    };
    /**
     * 
     * @param {Object} _event
     */
    _proModuleUserHome.__onListLoading = function(_event){
        _event.value = '<p class="w-loading">&nbsp;</p>';
    };
};
define('{pro}module/user/home.js',
      ['{pro}widget/item/meeting.2.js'
      ,'{com}util/module/module.js'
      ,'{com}util/cache/user.js'
      ,'{com}util/cache/meeting.js'
      ,'{lib}util/tab/tab.js'
      ,'{lib}util/calendar/calendar.js'
      ,'{lib}util/list/module.waterfall.js'],f);
