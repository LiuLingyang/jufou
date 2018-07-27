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
        _proModuleSettingJoin,
        _supModuleSettingJoin;
    /**
     * 组织相册模块
     * 
     */
    _p._$$ModuleSettingJoin = NEJ.C();
      _proModuleSettingJoin = _p._$$ModuleSettingJoin._$extend(_p._$$ModuleJoin);
      _supModuleSettingJoin = _p._$$ModuleSettingJoin._$supro;
    /**
     * 控件重置
     * 
     */
    _proModuleSettingJoin.__reset = function(_options){
        this.__supReset(_options);
        this.__locked = !0;
        var _arr = [],
            _qst = _options.questions||[];
        _u._$forEach(_qst,function(_item){
        	_arr.push(this.__doFormatData(_item));
        },this);
        for(var i=_arr.length;i<5;i++){
        	_arr.push({name:''});
        }
        this.__items = _e._$getItemTemplate(
                       _arr,_i._$$ItemTag,this.__topt);
        this.__locked = !1;
        this.__form = _t._$$WebForm._$allocate({
            form:this.__body
        });
    };
    /**
     * 构建模块
     * @return {Void}
     */
    _proModuleSettingJoin.__doBuild = function(){
    	this.__body = _e._$get('module-d0').parentNode;
    	_supModuleSettingJoin.__doBuild.call(this);
    };
    /**
     * 取消创建
     * @return {Void}
     */
    _proModuleSettingJoin.__onCancel = function(_event){
        location.href = config.page('/setting/');
    };
};
define('{pro}module/group/setting/join.js',
      ['{pro}module/setting/join.js'],f);
