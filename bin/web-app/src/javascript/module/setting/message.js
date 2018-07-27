var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _f = NEJ.F,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _x = _('nej.ut'),
        _t = _('mu.ut'),
        _p = _('mu.m.g'),
        _proModuleSettingMessage;
    /**
     * 组织相册模块
     * 
     */
    _p._$$ModuleSettingMessage = NEJ.C();
      _proModuleSettingMessage = _p._$$ModuleSettingMessage._$extend(_p._$$ModuleGroup);
    /**
     * 控件重置
     * 
     */
    _proModuleSettingMessage.__reset = function(_options){
        this.__supReset(_options);
        var _data = this.__iptable;
        if (!!this.__group){
        	_data = {
                area:this.__group.area,
                city:this.__group.city,
                province:this.__group.province
            };
        }
        _x._$$RegionSelector._$allocate({
            area:this.__body.area,
            city:this.__body.city,
            province:this.__body.province,
            data:_data
        });
    };
    /**
     * 构建模块
     * @return {Void}
     */
    _proModuleSettingMessage.__doBuild = function(){
    	this.__body = _e._$get('module-a0').parentNode;
        _v._$addEvent(
            this.__body['btn-ok'],'click',
            this.__onSubmit._$bind(this)
        );
        this.__form = _t._$$WebForm._$allocate({
            form:this.__body,
            message:{
            	'homepage-5':'主页地址必须大于6位',
            	'homepage-3':'主页地址必须包含一个大写字母'
            }
        });
    };
    /**
     * 
     */
    _proModuleSettingMessage.__onSubmit = function(){
        if (this.__form._$checkValidity()){
            var _data = this.__form._$data();
            _data.gid = this.__group.id;
            this.__doSubmit(_data);
        }
    };
    /**
     * 
     */
    _proModuleSettingMessage.__doSubmit = _f;
    /**
     * 
     */
    _proModuleSettingMessage.__cbSubmit = function(_json){
        switch(_json.code){
            case -10:
                this.__form._$showMsgError('homepage','地址已被注册');
            return;
        }
    };;
};
define('{pro}module/setting/message.js',
      ['{pro}module/common/group.js'
      ,'{com}util/cache/group.js'
      ,'{com}util/form/form.js'
      ,'{lib}util/data/region/zh.js'
      ,'{lib}util/region/region.zh.js'],f);
