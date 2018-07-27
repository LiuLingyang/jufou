var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _u = _('nej.u'),
        _y = _('nej.ui'),
        _x = _('nej.ut'),
        _t = _('mu.ut'),
        _p = _('mu.m.g'),
        _proModuleSearchMeeting,
        _supModuleSearchMeeting;
    /**
     * 组织模块基类
     * 
     * 
     */
    _p._$$ModuleSearchMeeting = NEJ.C();
      _proModuleSearchMeeting = _p._$$ModuleSearchMeeting._$extend(_p._$$ModuleSearchList);
      _supModuleSearchMeeting = _p._$$ModuleSearchMeeting._$supro;
    /**
     * 控件初始化
     * @return {Void}
     */
    _proModuleSearchMeeting.__doBuild = function(){
        this.__ekey = 'txt-empty-meeting';
        this.__bkey = 'txt-mdl-meeting';
        this.__estr = '活动';
        // init list module options
        this.__mopt = {
            item:'jst-meeting-list',
            cache:{klass:_t._$$CacheMeeting}
        };
        _supModuleSearchMeeting.__doBuild.apply(this,arguments);
        // 0 - tab box
        var _list = _e._$getByClassName(this.__body,'js-flag');
        this.__taber = _x._$$Tab._$allocate({
            list:_e._$getChildren(_list[0])
        });
        this.__taber._$setEvent(
            'onchange',
            this.__onChangeSort._$bind(this)
        );
    };
    /**
     * 
     */
    _proModuleSearchMeeting.__onRefresh = function(_options){
        _supModuleSearchMeeting.__onRefresh.apply(this,arguments);
        this.__taber._$go(0,!0);
    };
    /**
     * 
     */
    _proModuleSearchMeeting.__onChangeSort = (function(){
        var _sort = ['startTime','createTime'];
        return function(_event){
            this.__mopt.cache.data.sort = _sort[_event.index]||'';
            _supModuleSearchMeeting.__onChangeSort.call(this);
        };
    })();
};
define('{pro}module/system/search/meeting.js',
      ['{com}util/cache/meeting.js'
      ,'{pro}module/system/search/list.js'],f);
