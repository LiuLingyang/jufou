var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _r = NEJ.R,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _u = _('nej.u'),
        _z = _('mu.x'),
        _t = _('mu.ut'),
        _p = _('mu.m.g'),
        _proModuleInform;
    /**
     * 组织相册模块
     * 
     */
    _p._$$ModuleInform = NEJ.C();
      _proModuleInform = _p._$$ModuleInform._$extend(_p._$$ModuleGroup);
    /**
     * 重置控件
     */
    _proModuleInform.__reset = function(_options){
        this.__supReset(_options);
        this.__meeting = _options.meeting||_o;
    };
    /**
     * 构建模块
     * @return {Void}
     */
    _proModuleInform.__doBuild = function(){
    	this.__body = _e._$get('module-50').parentNode;
    	this.__form = _t._$$WebForm._$allocate({
    		form:this.__body
    	});
        _v._$addEvent(
        	this.__body['btn-ok'],'click',
        	this.__onSubmit._$bind(this)
        );
        this.__cache = _t._$$CacheGroup._$allocate({
        	oninform:this.__cbInformMember._$bind(this)
        });
    };
    /**
     * 
     */
    _proModuleInform.__onSubmit = function(){
    	if (this.__form._$checkValidity()){
    		var _data = this.__form._$data();
    		if (!!this.__meeting.id){
    		    _data.mid = this.__meeting.id;
    		}else{
    		    _data.gid = this.__group.id;
    		}
    		this.__cache._$inform(_data);
    	}
    };
    /**
     * 
     */
    _proModuleInform.__cbInformMember = function(_json){
    	if (_json.code==1){
    	    _z._$showSuccess('通知发送成功！');
    	    /*
    	    window.setTimeout(function(){
    	        location.href = config.page('/');
    	    },5000);
    	    */
    		return;
    	}
    	_z._$showError('暂时无法发送通知，请稍后再试！');
    };
};
define('{pro}module/group/inform.js',
      ['{pro}module/common/group.js'
      ,'{com}util/cache/group.js'
      ,'{com}util/form/form.js'],f);
