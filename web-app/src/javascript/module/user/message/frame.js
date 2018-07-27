var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _u = _('nej.u'),
        _y = _('nej.ui'),
        _x = _('nej.ut'),
        _t = _('mu.ut'),
        _p = _('mu.m.u'),
        _proModuleMessageFrame;
    /**
     * 组织模块基类
     * 
     * 
     */
    _p._$$ModuleMessageFrame = NEJ.C();
      _proModuleMessageFrame = _p._$$ModuleMessageFrame._$extend(_t._$$Module);
    /**
     * 控件初始化
     * @return {Void}
     */
    _proModuleMessageFrame.__doBuild = function(){
        this.__export.parent = _e._$get('module-box');
        this.__nlist = _e._$getByClassName('module-m0','js-flag');
        this.__cache = _t._$$CacheMessage._$allocate({
            oncountupdate:this.__cbCountUpdate._$bind(this)
        });
        _v._$addEvent(
    		_t._$$CacheMessage,'messagereaded',
    		this.__cbCountDel._$bind(this)
    	);
        this.__cache._$count();
    };
    /**
     * 
     */
    _proModuleMessageFrame.__onRefresh = function(_options){
        var _umi = _options.target;
        _u._$forEach(this.__nlist,
            function(_node){
                _e._$dataset(_node,'value')==_umi
                ? _e._$addClassName(_node,'js-selected')
                : _e._$delClassName(_node,'js-selected');
            });
    };
    /**
     * 
     */
    _proModuleMessageFrame.__cbCountUpdate = function(_map){
        _map = _map.result||_o;
        _u._$forEach(
            this.__nlist,function(_node){
            	var _element = _e._$getByClassName(_node,'j-fwg')[0],
            	    _count = _map[_e._$dataset(_node,'type')]||0;
                if (!!_element){
                	_element.innerText = _count;
                }
            }
        );
    };
    
    _proModuleMessageFrame.__cbCountDel = function(_event){
    	_u._$forEach(
            this.__nlist,function(_node){
            	var _element = _e._$getByClassName(_node,'j-fwg')[0],
            	    _type = _e._$dataset(_node,'type');
                if (_type==_event.mtype){
                	_element.innerText = Math.max(0,parseInt(_element.innerText)-_event.count);
                }
            }
        );
    };
};
define('{pro}module/user/message/frame.js',
      ['{com}util/module/module.js'
      ,'{com}util/cache/message.js'],f);
