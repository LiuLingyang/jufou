var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _f = NEJ.F,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _x = _('nej.ut'),
        _z = _('mu.x'),
        _m = _('mu.ui'),
        _t = _('mu.ut'),
        _p = _('mu.m.g'),
        _proModuleBasic;
    /**
     * 组织相册模块
     * 
     */
    _p._$$ModuleBasic = NEJ.C();
      _proModuleBasic = _p._$$ModuleBasic._$extend(_p._$$ModuleGroup);
    /**
     * 控件重置
     * 
     */
    _proModuleBasic.__reset = function(_options){
        NEJ.X(_options,window.data);
        this.__supReset(_options);
        var _data = this.__iptable;
        if (!!this.__group.id){
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
        // init content
        if (!!this.__group.id){
            this.__eopt.content = this.__group.description;
        }
        this.__editor = _m._$$CustomEditor2._$allocate(this.__eopt);
        _e._$setStyle(this.__body.description,'display','none');
    };
    /**
     * 构建模块
     * @return {Void}
     */
    _proModuleBasic.__doBuild = function(){
    	this.__body = _e._$get('module-a0').parentNode;
    	// init rich editor
        this.__eopt = {
            clazz:'w-rd3 bd01 wd1',focus:!1,
            parent:this.__body.description.parentNode
        };
        _v._$addEvent(
            this.__body['btn-ok'],'click',
            this.__onSubmit._$bind(this)
        );
        this.__form = _t._$$WebForm._$allocate({
            form:this.__body,
            message:{
                'name-4':'组织名称最多输入40个字符或者20个中文',
                'description-4':'最允许输入1000个字符或者500个汉字',
            	'homepage-5':'主页地址必须大于6位',
            	'homepage-3':'主页地址只允许输入字母、数字、下划线、-'
            }
        });
    };
    /**
     * 
     */
    _proModuleBasic.__onSubmit = function(){
        if (this.__form._$checkValidity()){
            var _data = this.__form._$data();
            _data.gid = this.__group.id||'';
            _data.description =  this.__editor._$getContent();
            this.__doSubmit(_data);
        }
    };
    /**
     * 
     */
    _proModuleBasic.__doSubmit = _f;
    /**
     * 
     */
    _proModuleBasic.__cbSubmit = function(_json){
        switch(_json.code){
        	case -3:
                _z._$showError('权限不足');
            return;
            case -202:
                this.__form._$showMsgError('homepage','地址已被注册');
            return;
            default:
                _z._$showError('暂时无法创建组织，请稍后再试！');
            return;
        }
    };;
};
define('{pro}module/setting/basic.js',
      ['{pro}module/common/group.js'
      ,'{pro}widget/editor/editor2.js'
      ,'{com}util/cache/group.js'
      ,'{com}util/form/form.js'
      ,'{lib}util/data/region/zh.js'
      ,'{lib}util/region/region.zh.js'],f);
