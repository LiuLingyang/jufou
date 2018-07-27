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
        _proModuleHome;
    /**
     * 组织相册模块
     * 
     */
    _p._$$ModuleHome = NEJ.C();
      _proModuleHome = _p._$$ModuleHome._$extend(_g._$$ModuleGroup);
    /**
     * 重置
     */
    _proModuleHome.__reset = function(_options){
        this.__supReset(_options);
        this.__mopt.item.host = this.__host;
        this.__mopt.item.group = this.__group;
        if(!!_options.host){
        	this.__mopt.item.relation = _options.host.relationship||0;
        }
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
    _proModuleHome.__doBuild = function(){
        this.__mopt = {
            limit:8,
            parent:'group-news-box',
            item:{klass:'group-news-list'},
            pager:{
            	parent:'group-news-pager',
            	clazz:'w-pager'
        	},
            cache:{
            	lkey:'news-list',
            	klass:_t._$$CacheNews,
            	data:{sort:'createTime',order:'desc'}
        	},
            onbeforelistload:function(_event){
                _event.value = '<p class="w-loading">&nbsp;</p>';
            },
            onemptylist:function(_event){
                _event.value = _e._$getTextTemplate('txt-home-nonews');
            }._$bind(this)
        };
        this.__cache = _t._$$CacheNews._$allocate({
            onnewsdelete:this.__cbNewsDelete._$bind(this)
        });
        _v._$addEvent(
            'module-x0','click',
            this.__onAction._$bind(this)
        );
    };
    /**
     * 
     */
    _proModuleHome.__onAction = function(_event){
        var _node = _v._$getElement(_event,'d:action');
        var _nid = _e._$dataset(_node,'id')
        if (!_node) return;
        _v._$stop(_event);
        switch(_e._$dataset(_node,'action')){
            case 'del':
            	_w._$$WindowConfirm._$allocate({
                    title:'删除新闻确认',
                    message:'您确定要删除该新闻？',
                    onok:function(){
                        this.__cache._$delete({
                            nid:_nid
                        });
                    }._$bind(this)
                })._$show();
            return;
        }
    };
    /**
     * 
     */
    _proModuleHome.__cbNewsDelete = function(_json){
        switch(_json.code){
            case 1:
                location.href = config.page('/news/');
            return;
        }
    };
};
define('{pro}module/news/home.js',
      ['{pro}module/common/group.js'
      ,'{com}util/cache/news.js'
      ,'{lib}util/list/module.pager.js'],f);
