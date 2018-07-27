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
        _proModuleMessageInform,
        _supModuleMessageInform;
    /**
     * 组织模块基类
     * 
     * 
     */
    _p._$$ModuleMessageInform = NEJ.C();
      _proModuleMessageInform = _p._$$ModuleMessageInform._$extend(_p._$$ModuleMessageList);
      _supModuleMessageInform = _p._$$ModuleMessageInform._$supro;
    /**
     * 
     */
    _proModuleMessageInform.__doBuild = function(){
        this.__data = {};
        this.__mkey = 'txt-mdl-inform';
        this.__skey = 'jst-list-inform';
        _supModuleMessageInform.__doBuild.call(this);
        this.__list=_e._$getByClassName(this.__body,'js-inf');       
    };
    /**
     * 
     */
    _proModuleMessageInform.__onRefresh = function(_options){
    	_supModuleMessageInform.__onRefresh.apply(this,arguments);
    	if(location.parse(location.hash.substr(1)).query.type==1){
    	    _e._$addClassName(this.__list[1],'js-inform');
    	    _e._$delClassName(this.__list[0],'js-inform');}
    	else{
    	    _e._$delClassName(this.__list[1],'js-inform');
    	    _e._$addClassName(this.__list[0],'js-inform');}
    }
    
    /**
     * 
     */  
    _proModuleMessageInform.__onBeforeShow = function(_options){
        this.__data.type = (_options.param||_o).type||0;
        this.__mopt.cache.lkey = _options.umi+'-'+this.__data.type;
    };
};
define('{pro}module/user/message/inform.js',
      ['{pro}module/user/message/list.js'],f);
