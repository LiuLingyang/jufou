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
        _proModuleSearchGroup,
        _supModuleSearchGroup;
    /**
     * 组织模块基类
     * 
     * 
     */
    _p._$$ModuleSearchGroup = NEJ.C();
      _proModuleSearchGroup = _p._$$ModuleSearchGroup._$extend(_p._$$ModuleSearchList);
      _supModuleSearchGroup = _p._$$ModuleSearchGroup._$supro;
    /**
     * 控件初始化
     * @return {Void}
     */
    _proModuleSearchGroup.__doBuild = function(){
        this.__ekey = 'txt-empty-group';
        this.__bkey = 'txt-mdl-group';
        this.__estr = '组织';
        // init list module options
        this.__mopt = {
            item:'jst-group-list',
            cache:{klass:_t._$$CacheGroup}
        };
        _supModuleSearchGroup.__doBuild.apply(this,arguments);
        // 0 - type select
        var _list = _e._$getByClassName(this.__body,'js-flag');
        this.__gsrt = _list[0];
        _v._$addEvent(
            _list[0],'change',
            this.__onChangeSort._$bind(this)
        );
    };
    /**
     * 
     */
    _proModuleSearchGroup.__onRefresh = function(_options){
        _supModuleSearchGroup.__onRefresh.apply(this,arguments);
        this.__onChangeSort();
    };
    /**
     * 
     */
    _proModuleSearchGroup.__onChangeSort = function(){
        this.__mopt.cache.data.sort = this.__gsrt.value;
        _supModuleSearchGroup.__onChangeSort.call(this);
    };
};
define('{pro}module/system/search/group.js',
      ['{com}util/cache/group.js'
      ,'{pro}module/system/search/list.js'],f);
