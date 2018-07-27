var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _u = _('nej.u'),
        _x = _('nej.ut'),
        _t = _('mu.ut'),
        _i = _('mu.w.i'),
        _p = _('mu.m.g'),
        _proModuleSettingTag,
        _supModuleSettingTag;
    /**
     * 组织相册模块
     * 
     */
    _p._$$ModuleSettingTag = NEJ.C();
      _proModuleSettingTag = _p._$$ModuleSettingTag._$extend(_p._$$ModuleTag);
      _supModuleSettingTag = _p._$$ModuleSettingTag._$supro;
    /**
     * 
     */
    _proModuleSettingTag.__reset = function(_options){
    	this.__supReset(_options);
    	var _arr = _options.tags||_arr;
    	for(var i=_arr.length;i<5;i++)
    	    _arr.push({name:''});
        this.__items = _e._$getItemTemplate(
                       _arr,_i._$$ItemTag,this.__topt);
        if (this.__items.length>=15){
            _e._$setStyle(this.__nadd,'display','none');
        }
        this.__form = _t._$$WebForm._$allocate({
            form:this.__body
        });
    };
    /**
     * 构建模块
     * @return {Void}
     */
    _proModuleSettingTag.__doBuild = function(){
        this.__body = _e._$get('module-c0').parentNode;
        _supModuleSettingTag.__doBuild.call(this);
    };
    /**
     * 取消创建
     * @return {Void}
     */
    _proModuleSettingTag.__onCancel = function(_event){
        location.href = config.page('/setting/');
    };
};
define('{pro}module/group/setting/tag.js',
      ['{pro}module/setting/tag.js'],f);
