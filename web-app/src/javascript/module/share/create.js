var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _u = _('nej.u'),
        _x = _('nej.ut'),
        _y = _('mu.x'),
        _w = _('mu.w.w'),
        _m = _('mu.ui'),
        _t = _('mu.ut'),
        _g = _('mu.m.g'),
        _p = _('mu.m.v'),
        _proModuleShareCreate;
    /**
     * 组织首页模块
     * 
     * 
     */
    _p._$$ModuleShareCreate = NEJ.C();
      _proModuleShareCreate = _p._$$ModuleShareCreate._$extend(_g._$$ModuleGroup);
    /**
     * 控件重置
     */
    _proModuleShareCreate.__reset = function(_options){
        this.__supReset(_options);
        this.__share = _options.share||_o;
        if (this.__share.id == null){
        	delete this.__share;
        }else{
        	this.__imag.src = this.__share.image.thumbnailURL;
        }
        this.__group = _options.group||_o;
    };
    /**
     * 构建模块，子类重写具体业务逻辑
     * @return {Void}
     */
    _proModuleShareCreate.__doBuild = function(){
        this.__body = _e._$get('module-w1').parentNode;
        this.__form = _t._$$WebForm._$allocate({
            form:this.__body
        });
        _v._$addEvent(
            this.__body['btn-publish'],
            'click',this.__onPublish._$bind(this)
        );
        // init cache
        this.__cache = _t._$$CacheShare._$allocate({
            onsharecreate:this.__cbShareCreate._$bind(this),
            onfileupload:this.__cbFileUpload._$bind(this)
        });
        var _list = _e._$getByClassName(this.__body,'js-flag');
        this.__imag = _list[0];
        this.__nldg = _list[1];
        // init cover
        _e._$file(
            this.__imag.parentNode,{
                name:'file',
                clazz:'js-fom',
                onchange:this.__onFileSelect._$bind(this)
            }
        );
    };
    /**
     * 
     */
    _proModuleShareCreate.__onPublish = function(){
        if (!this.__form._$checkValidity()){
            return;
        }
        var _data = this.__form._$data();
        _data.gid = this.__group.id;
    	_data.pid = this.__mpid||"";
        if (!!this.__share){
            _data.sid = this.__share.id;
            _data.pid = this.__share.image.id;
        }
        this.__cache._$create(_data);
    };
    /**
     * 
     * @param {Object} _options
     */
    _proModuleShareCreate.__cbShareCreate = function(_json){
        switch(_json.code){
            case 1:
                location.href = config.page('/share/'+_json.result.id+'/');
            return;
            case -3:
                _y._$showError('没有权限!');
            return;
            case -6:
                _y._$showError('xss攻击！');
            return;
            default:
                _y._$showError('暂时无法创建分享！');
            return;
        }
    };
    /**
     * 
     */
    _proModuleShareCreate.__onFileSelect = function(_event){
    	_e._$setStyle(this.__nldg,'display','');
        this.__xform = _event.form;
        var _gid = this.__group.id;
        this.__cache._$upload(this.__xform,_gid);
    };
    /**
     * 
     */
    _proModuleShareCreate.__cbFileUpload = function(_json){
        this.__xform.reset();
        _e._$setStyle(this.__nldg,'display','none');
        switch(_json.code){
            case 1:
                var _time = '?'+(+new Date);
    	        this.__imag.src = _json.result.thumbnailURL+_time;
    	        this.__mpid = _json.result.id;
            break;
            default:
                _y._$showError('文件上传失败，请稍候再试！');
            break;
        }
    };
};
define('{pro}module/share/create.js',
      ['{patch}json.js'
      ,'{pro}module/common/group.js'
      ,'{com}util/cache/share.js'
      ,'{com}util/form/form.js'],f);