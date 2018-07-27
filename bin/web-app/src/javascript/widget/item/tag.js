var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _i = _('nej.ui'),
        _p = _('mu.w.i'),
        _proItemTag;
    /**
     * 标签项对象
     * 
     * 
     */
    _p._$$ItemTag = NEJ.C();
      _proItemTag = _p._$$ItemTag._$extend(_i._$$Item);
    /**
     * 控件重置
     * @param  {Object} _options 配置参数
     * @return {Void}
     */
    _proItemTag.__reset = function(_options){
        this.__supReset(_options);
        this.__filter = _options.filter;
        this._$deletable(!_options.nodel);
        _e._$attr(this.__nipt,'maxlength',
                 _options.maxlength||'20');
        _e._$attr(this.__nipt,'placeholder',
                 _options.placeholder||'请输入标签');
    };
    /**
     * 控件销毁
     * @return {Void}
     */
    _proItemTag.__destroy = function(){
        this.__supDestroy();
        this._$delete();
    };
    /**
     * 初始化外观
     * @return {Void}
     */
    _proItemTag.__initXGui = function(){
        this.__seed_html = 'ntp-tag-item';
    };
    /**
     * 初始化节点
     * @return {Void}
     */
    _proItemTag.__initNode = function(){
        this.__supInitNode();
        // edit    - add class
        // preview - remove class
        this.__tcls = 'js-xtw';
        // 0 - input
        // 1 - delete button
        // 2 - tag label
        // 3 - tag tip
        var _list = _e._$getByClassName(this.__body,'js-flag');
        this.__nipt = _list[0];
        this.__ndel = _list[1];
        this.__ntag = _list[2];
        this.__nshw = _list[3];
        //_e._$focus(this.__nipt,{clazz:'js-focus-1'});
        _v._$addEvent(this.__ndel,'click',this.__onDelete._$bind(this));
        _v._$addEvent(this.__ntag,'click',this.__onEdit._$bind(this));
        _v._$addEvent(this.__nipt,'blur',this.__onInputOK._$bind(this));
        _v._$addEvent(this.__nipt,'keypress',this.__onInputEnter._$bind(this));
    };
    /**
     * 刷新项
     * @return {Void}
     */
    _proItemTag.__doRefresh = function(_data){
        _data = _data||_o;
        this._$setTag(_data.name);
        this._$setTagTip(_data.tip);
    };
    /**
     * 编辑标签
     * @return {Void}
     */
    _proItemTag.__onEdit = function(){
        this.__nipt.value = this.__ntag.innerHTML;
        _e._$delClassName(this.__body,this.__tcls);
        this.__nipt.focus();
    };
    /**
     * 删除操作
     * @return {Void}
     */
    _proItemTag.__onDelete = function(_event){
        _v._$stop(_event);
        var _event = {
            id:this.__id,
            data:this.__data
        };
        this._$dispatchEvent('ondelete',_event);
        if (!_event.stopped) this._$delete();
    };
    /**
     * 标签输入完成
     * @return {Void}
     */
    _proItemTag.__onInputOK = function(){
        this._$setTag(this.__nipt.value.trim());
    };
    /**
     * 回车完成标签输入
     * @param  {Event} _event 事件对象
     * @return {Void}
     */
    _proItemTag.__onInputEnter = function(_event){
        if (_event.keyCode==13){
        	_v._$stop(_event);
        	this.__onInputOK();
        } 
    };
    /**
     * 设置数据
     * @return {Void} 
     */
    _proItemTag._$setData = function(_data){
        this.__data = _data;
    };
    /**
     * 判断是否有数据
     * @return {Boolean} 是否有数据
     */
    _proItemTag._$hasData = function(){
        return !!this.__data.id;
    };
    /**
     * 设置标签信息
     * @param  {String} _tag 标签
     * @return {Void}
     */
    _proItemTag._$setTag = function(_tag){
        if (!_tag){
            _e._$delClassName(this.__body,this.__tcls);
            this.__ntag.innerText = '';
        }else{
            if (!!this.__filter)
                _tag = _tag.replace(this.__filter,'');
            this.__ntag.innerText = _tag
            _e._$addClassName(this.__body,this.__tcls);
        }
        var _event = {
            id:this.__id,
            data:this.__data,
            tag:this.__ntag.innerText
        };
        this._$dispatchEvent('onchange',_event);
        if (!!_event.value) this.__ntag.innerText = _event.value;
    };
    /**
     * 取标签名称
     * @return {String} 标签名称
     */
    _proItemTag._$getTag = function(){
        return this.__ntag.innerText;
    };
    /**
     * 设置标签组织数量
     * @param  {Number} _count 数量
     * @return {Void}
     */
    _proItemTag._$setTagTip = function(_tip){
        this.__nshw.innerText = _tip||'\n';
    };
    /**
     * 清除标签
     * @return {Void}
     */
    _proItemTag._$clear = function(){
        this.__doRefresh(this.__data);
        /*
        this.__data = {};
        this.__nipt.value = '';
        this.__ntag.innerText = '';
        this.__nshw.innerText = '\n';
        _e._$delClassName(this.__body,this.__tcls);
        */
    };
    /**
     * 
     */
    _proItemTag._$delete = function(){
        this.__data = {};
        this.__nipt.value = '';
        this.__ntag.innerText = '';
        this.__nshw.innerText = '\n';
        _e._$delClassName(this.__body,this.__tcls);
    };
    /**
     * 聚焦
     */
    _proItemTag._$focus = function(){
        this.__nipt.focus();
    };
    /**
     * 设置是否允许删除
     * @param  {Boolean} _enable 是否允许
     * @return {Void}
     */
    _proItemTag._$deletable = function(_enable){
        this.__ndel.style.display = !_enable?'none':'';
    };
};
define('{pro}widget/item/tag.js',
      ['{lib}ui/item/item.js'],f);
