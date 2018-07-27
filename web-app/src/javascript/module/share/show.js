var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _u = _('nej.u'),
        _x = _('nej.ut'),
        _z = _('mu.x'),
        _w = _('mu.w.w'),
        _t = _('mu.ut'),
        _g = _('mu.m.g'),
        _p = _('mu.m.v'),
        _proModuleShareShow;
    /**
     * 组织相册模块
     * 
     */
    _p._$$ModuleShareShow = NEJ.C();
      _proModuleShareShow = _p._$$ModuleShareShow._$extend(_g._$$ModuleGroup);
    /**
     * 重置
     */
    _proModuleShareShow.__reset = function(_options){
        this.__supReset(_options);
        this.__share = _options.share||_o;
        _g._$$ModuleComment._$allocate({
        	type:3,
        	host:this.__host,
        	group:this.__group,
        	owner:this.__share,
    		parent:_e._$getChildren('module-w3')[0]
    	});
    };
    /**
     * 
     */
    _proModuleShareShow.__doBuild = function(){
    	var _list = _e._$getByClassName('module-w2','js-flag');
        _v._$addEvent(
            _list[0],'click',
            this.__doDelete._$bind(this)
        );
        this.__cache = _t._$$CacheShare._$allocate({
            onsharedelete:this.__cbShareDelete._$bind(this)
        });
    };
    /**
     * 
     */
    _proModuleShareShow.__doDelete = function(_event){
    	_w._$$WindowConfirm._$allocate({
            title:'删除分享确认',
            message:'您确定要删除该分享？',
            onok:function(){
                this.__cache._$delete({
                    sid:this.__share.id
                });
            }._$bind(this)
        })._$show();
    };
    /**
     * 
     */
    _proModuleShareShow.__cbShareDelete = function(_json){
        switch(_json.code){
            case 1:
                location.href = config.page('/share/');
            return;
            case -3:
            	_z._$showError('您没有权限删除此分享！');
            return;
        }
    };
};
define('{pro}module/share/show.js',
      ['{pro}module/common/group.js'
      ,'{pro}module/comment/comment.js'
      ,'{com}util/cache/share.js'],f);
