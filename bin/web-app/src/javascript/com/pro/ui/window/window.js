var f = function(){
    var _  = NEJ.P,
        _f = NEJ.F,
        _v = _('nej.v'),
        _u = _('nej.u'),
        _i = _('nej.ui'),
        _t = _('mu.ut'),
        _p = _('mu.ui'),
        _proWindow;
    /**
     * 窗体控件基类
     * 
     */
    _p._$$Window = NEJ.C();
      _proWindow = _p._$$Window._$extend(_i._$$WindowWrapper);
    /**
     * 控件重置
     */
    _proWindow.__reset = function(_options){
        _options.mask = !0;
        _options.draggable = !0;
        _options.destroyable = !0;
        _options.parent = document.body;
        _options.clazz = 'w-win w-rd3 s-srd '+(_options.clazz||'');
        this.__supReset(_options);
        this.__extdata = _options.ext;
        this.__form._$reset();
        this.__doInitFormData(_options.data);
    };
    /**
     * 初始化节点
     */
    _proWindow.__initNode = function(){
        this.__supInitNode();
        this.__form = _t._$$WebForm._$allocate({
            form:this.__body,
            message:this.__message,
            oncheck:this.__doCheck._$bind(this)
        });
        _v._$addEvent(this.__body['btn-cc'],'click',this._$hide._$bind(this));
        _v._$addEvent(this.__body['btn-ok'],'click',this.__onOK._$bind(this));
    };
    /**
     * 确认按钮事件
     */
    _proWindow.__onOK = function(){
        if (this.__form._$checkValidity()){
            var _data = this.__form._$data(),
                _event = {
                    ext:this.__extdata,
                    data:this.__doFormatData(_data)||_data
                };
            this._$dispatchEvent('onok',_event);
            if (!_event.stopped) this._$hide();
        }
    };
    /**
     * 初始化表单
     */
    _proWindow.__doInitFormData = (function(){
        var _doSetValue = function(_value,_key){
            this.__form._$setValue(_key,_value);
        };
        return function(_data){
            _u._$forIn(_data,_doSetValue,this);
        };
    })();
    /**
     * 
     */
    _proWindow.__doFormatData = _f;
    /**
     * 
     */
    _proWindow.__doCheck = _f;
    /**
     * 
     * @param {Object} _name
     * @param {Object} _message
     */
    _proWindow._$showError = function(_name,_message){
        this.__form._$showMsgError(_name,_message);
    };
};
define('{com}ui/window/window.js',
      ['{com}util/form/form.js'
      ,'{lib}ui/layer/window.wrapper.js'],f);
