var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _u = _('nej.u'),
        _j = _('nej.j'),
        _t = _('mu.ut'),
        _i = _('mu.w.i'),
        _p = _('mu.m.g'),
        _proModuleStep2,
        _supModuleStep2;
    /**
     * 创建组织第二步模块对象
     * 
     */
    _p._$$ModuleStep2 = NEJ.C();
      _proModuleStep2 = _p._$$ModuleStep2._$extend(_p._$$ModuleTag);
      _supModuleStep2 = _p._$$ModuleStep2._$supro;
    /**
     * 
     */
    _proModuleStep2.__reset = function(_options){
    	this.__supReset(_options);
        this.__items = _e._$getItemTemplate(
                       new Array(5),_i._$$ItemTag,this.__topt);
        this.__form = _t._$$WebForm._$allocate({
            form:this.__body
        });
    };
    /**
     * 构建模块
     * @return {Void}
     */
    _proModuleStep2.__doBuild = function(){
        this.__body = _e._$html2node(
                      _e._$getTextTemplate('txt-step-2'));
        _supModuleStep2.__doBuild.call(this);
    };
    /**
     * 
     */
    _proModuleStep2.__onTagUpdate = function(_json){
        switch(_json.code){
            case 1:
                dispatcher._$redirect('/?/m/s3/');
            return;
            _supModuleStep2.__onTagUpdate.apply(this,arguments);
        }
    };
    /**
     * 取消创建
     * @return {Void}
     */
    _proModuleStep2.__onCancel = function(_event){
        dispatcher._$redirect('/?/m/s3/');
    };
    /**
     * 
     */
    _proModuleStep2.__onShow = function(){
    	_e._$get('page-box').appendChild(this.__body);
    };
};
define('{pro}module/group/create/step2.js',
      ['{pro}module/setting/tag.js'],f);
