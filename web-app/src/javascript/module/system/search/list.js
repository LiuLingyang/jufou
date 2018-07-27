var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _f = NEJ.F,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _u = _('nej.u'),
        _y = _('nej.ui'),
        _x = _('nej.ut'),
        _z = _('mu.x'),
        _t = _('mu.ut'),
        _p = _('mu.m.g'),
        _proModuleSearchList,
        _supModuleSearchList;
    /**
     * 组织模块基类
     * 
     * 
     */
    _p._$$ModuleSearchList = NEJ.C();
      _proModuleSearchList = _p._$$ModuleSearchList._$extend(_t._$$Module);
      _supModuleSearchList = _p._$$ModuleSearchList._$supro;
    /**
     * 控件初始化
     * @return {Void}
     */
    _proModuleSearchList.__doBuild = function(){
        this.__nlod = _e._$create('div','w-loading');
        this.__nlod.innerHTML = '&nbsp;';
        this.__nept = _e._$html2node(
            _e._$getTextTemplate(this.__ekey)
        );
        this.__ebox = _e._$getByClassName(
                      this.__nept,'js-flag')[0];
        this.__body = _e._$html2node(
            _e._$getTextTemplate(this.__bkey)
        );
        this.__mopt.limit = 9;
        this.__mopt.cache.lkey = 'search-result';
        this.__mopt.onbeforelistload = _z._$showLoading;
        this.__mopt.onafterlistload = this.__onLoadList._$bind(this);
        this.__mopt.onemptylist = this.__onEmptyList._$bind(this);
        this.__mopt.onbeforelistrender = this.__onBeforeRender._$bind(this);
        // 1 - list box
        // 2 - more button
        var _list = _e._$getByClassName(this.__body,'js-flag');
        this.__mopt.parent = _list[1];
        this.__mopt.more = _list[2];
        _v._$addEvent(
            window,'scroll',
            this.__doScrollCheck._$bind(this)
        );
    };
    /**
     * 
     */
    _proModuleSearchList.__onHide = function(){
        _supModuleSearchList.__onHide.apply(this,arguments);
        delete this.__parent;
        _e._$removeByEC(this.__nept);
        _e._$removeByEC(this.__nlod);
        if (!!this.__lmdl){
            this.__lmdl._$cache()
                ._$clearListInCache('search-result');
            this.__lmdl._$recycle();
            delete this.__lmdl;
        }
    };
    /**
     * 
     */
    _proModuleSearchList.__onRefresh = function(_options){
        this.__onHide();
        this.__parent = _options.data.parent;
        this.__parent.appendChild(this.__nlod);
        this.__mopt.cache.data = NEJ.X({order:'desc'},_options.data);
        delete this.__mopt.cache.data.parent;
    };
    /**
     * 
     */
    _proModuleSearchList.__doScrollCheck = function(){
        var _box = _e._$getPageBox(),
            _offset = _e._$offset(this.__mopt.more);
        if (!!this.__lmdl&&
            _offset.y<_box.scrollTop+_box.clientHeight)
            this.__lmdl._$next();
    };
    /**
     * 
     */
    _proModuleSearchList.__onChangeSort = function(){
        if (!!this.__lmdl){
            this.__lmdl._$cache()
                ._$clearListInCache('search-result');
            this.__lmdl._$recycle();
        }
        this.__lmdl = _x._$$ListModuleWF._$allocate(this.__mopt);
    };
    /**
     * 
     */
    _proModuleSearchList.__onLoadList = function(_event){
        _e._$removeByEC(this.__nlod);
    };
    /**
     * 
     */
    _proModuleSearchList.__onEmptyList = function(_event){
        this.__doSetEmptyMessage();
        this.__parent.appendChild(this.__nept);
    };
    /**
     * 
     */
    _proModuleSearchList.__doSetEmptyMessage = function(){
        var _str = '',
            _dat = this.__mopt.cache.data,
            _tmp = [_dat.province||'',_dat.city||'',
                    _dat.area||''].join(' ').trim();
        if (!!_tmp) _str += '在'+_tmp+'附近';
        _str += '没有找到';
        _tmp = _dat.keyword||'';
        if (!!_tmp) _str += '“'+_tmp+'”';
        _str += '相关的'+this.__estr;
        this.__ebox.innerText = _str;
    };
    /**
     * 
     */
    _proModuleSearchList.__onBeforeRender = function(){
        if (this.__parent!=this.__body.parentNode){
            this.__parent.appendChild(this.__body);
        }
    };
};
define('{pro}module/system/search/list.js',
      ['{com}util/module/module.js'
      ,'{lib}util/list/module.waterfall.js'],f);
