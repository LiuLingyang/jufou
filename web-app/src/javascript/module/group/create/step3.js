var f = function(){
    var _  = NEJ.P,
        _e = _('nej.e'),
        _u = _('nej.u'),
        _t = _('mu.ut'),
        _i = _('mu.w.i'),
        _p = _('mu.m.g'),
        _proModuleStep3,
        _supModuleStep3;
    /**
     * 创建组织第三步模块对象
     * 
     */
    _p._$$ModuleStep3 = NEJ.C();
      _proModuleStep3 = _p._$$ModuleStep3._$extend(_p._$$ModuleJoin);
      _supModuleStep3 = _p._$$ModuleStep3._$supro;
    /**
     * 
     */
    _proModuleStep3.__reset = function(_options){
    	this.__supReset(_options);
    	this.__locked = !0;
        this.__items = _e._$getItemTemplate(
                       new Array(5),_i._$$ItemTag,this.__topt);
        this.__locked = !1;
        this.__form = _t._$$WebForm._$allocate({
            form:this.__body
        });
    };
    /**
     * 构建模块
     * @return {Void}
     */
    _proModuleStep3.__doBuild = function(){
    	this.__body = _e._$html2node(
                      _e._$getTextTemplate('txt-step-3'));
        _supModuleStep3.__doBuild.call(this);
    };
    /**
     * 
     */
    _proModuleStep3.__cbUpdateJoinSetting = function(_json){
        if (_json.code==1){
        	var _group = this.__cache._$getGroupInCache();
         	location.href = '/'+_group.homepage+'/apply/';
         	return;
        }
        _proModuleStep3.__cbUpdateJoinSetting.apply(this,arguments);
    };
    /**
     * 取消创建
     * @return {Void}
     */
    _proModuleStep3.__onCancel = function(_event){
        var _group = this.__cache._$getGroupInCache();
        location.href = '/'+_group.homepage+'/apply/';
    };
    /**
     * 
     */
    _proModuleStep3.__onShow = function(){
    	_e._$get('page-box').appendChild(this.__body);
    };
};
define('{pro}module/group/create/step3.js',
      ['{pro}module/setting/join.js'],f);
