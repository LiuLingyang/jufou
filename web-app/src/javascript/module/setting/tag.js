var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _f = NEJ.F,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _u = _('nej.u'),
        _j = _('nej.j'),
        _z = _('mu.x'),
        _t = _('mu.ut'),
        _i = _('mu.w.i'),
        _p = _('mu.m.g'),
        _z = _('mu.x'),
        _proModuleTag,
        _supModuleTag;
    /**
     * 创建组织第二步模块对象
     * 
     */
    _p._$$ModuleTag = NEJ.C();
      _proModuleTag = _p._$$ModuleTag._$extend(_p._$$ModuleGroup);
      _supModuleTag = _p._$$ModuleTag._$supro;
    /**
     * 
     */
    _proModuleTag.__reset = function(_options){
    	this.__supReset(_options);
        this.__cache = _t._$$CacheGroup._$allocate({
        	group:this.__group,
        	ontagupdate:this.__onTagUpdate._$bind(this),
            onrectagload:this.__onRecTagLoad._$bind(this)
        });
        // get rec tag list
        this.__cache._$getRecTag();
    };
    /**
     * 构建模块
     * @return {Void}
     */
    _proModuleTag.__doBuild = function(){
        // 0 - tag box 
        // 1 - add tag
        // 2 - rec tag box
        var _list = _e._$getByClassName(this.__body,'js-flag');
        this.__nadd = _list[1];
        this.__rbox = _list[2];
        _v._$addEvent(
        	this.__nadd,'click',
            this.__onAppendTag._$bind(this)
        );
        _v._$addEvent(
        	this.__rbox,'click',
            this.__onAddByRecTag._$bind(this)
        );
        _v._$addEvent(
            this.__body['btn-ok'],'click',
            this.__onSubmit._$bind(this)
        );
        _v._$addEvent(
            this.__body['btn-cc'],'click',
            this.__onCancel._$bind(this)
        );
        // init tag input
        this.__topt = {
            parent:_list[0],
            filter:/[^a-z0-9\u4e00-\u9fa5]/gi,
            onchange:this.__onChangeTag._$bind(this),
            ondelete:this.__onDeleteTag._$bind(this)
        };
    };
    /**
     * 取消创建
     * @return {Void}
     */
    _proModuleTag.__onCancel = _f;
    /**
     * 表单提交
     * @return {Void}
     */
    _proModuleTag.__onSubmit = function(_event){
        var _arr = [];
        _u._$forEach(this.__items,
            function(_item){
                var _tag = _item._$getTag();
                if (!!_tag) _arr.push(_tag);
            });
        var _tag = _arr.join(',');
        if (!_tag){
            _z._$showError('请至少输入一个标签');
            return;
        }
        this.__cache._$updateTag(_tag);
    };
    /**
     * 
     * 
     */
    _proModuleTag.__onTagUpdate = function(_json){
        switch(_json.code){
            case 1:
                _z._$showSuccess('设置保存成功！');
	            window.setTimeout(function(){
	    	        location.href = config.page('/setting');
	    	    },3000);
            return;
        }
    };
    /**
     * 推荐标签列表载入回调
     * @return {Void}
     */
    _proModuleTag.__onRecTagLoad = function(_json){
        var _str = ((_json||_o).result||''),
            _arr = _str;
        _e._$renderHtmlTemplate(
        	this.__rbox,
        	'jst-list-tag',
        	{xlist:_arr}
        );
    };
    /**
     * 添加推荐标签
     * @return {Void}
     */
    _proModuleTag.__onAddByRecTag = function(_event){
        var _element = _v._$getElement(_event),
            _tag = _e._$dataset(_element,'tag');
        if (!_tag||this.__items.length>=15) return;
        // TODO add tag
    };
    /**
     * 添加标签
     * @return {Void}
     */
    _proModuleTag.__onAppendTag = function(_event){
    	_v._$stop(_event);
        this.__items.push(
              _e._$getItemTemplate(
              new Array(1),_i._$$ItemTag,this.__topt)[0]);
        if (this.__items.length>=15)
            _e._$setStyle(this.__nadd,'display','none');
        this.__items[0]._$deletable(!0);
    };
    /**
     * 删除标签
     * @return {Void}
     */
    _proModuleTag.__onDeleteTag = function(_event){
        var _id = _event.id;
        _u._$reverseEach(this.__items,
            function(_item,_index,_list){
                if (_id==_item._$getId()){
                    _item._$recycle();
                    _list.splice(_index,1);
                    return !0;
                }
            },this);
        if (this.__items.length<=1)
            this.__items[0]._$deletable(!1);
        if (this.__items.length<15)
            _e._$setStyle(this.__nadd,'display','');
    };
    /**
     * 变化标签
     * @return {Void}
     */
    _proModuleTag.__onChangeTag = function(_event){
        var _id = _event.id;
        _j._$request('/rest/tag/groupcount',{
            type:'json',
            method:'POST',
            data:'tag='+encodeURIComponent(_event.tag),
            onload:function(_json){
                this.__doSetTagCount(_id,
                      _json.code==1?parseInt(_json.result)||0:0);
            }._$bind(this),
            onerror:function(_json){
                this.__doSetTagCount(_id,0);
            }._$bind(this)
        });
    };
    /**
     * 设置标签使用组织数量
     * @param {Object} _id
     * @param {Object} _count
     */
    _proModuleTag.__doSetTagCount = function(_id,_count){
        _u._$forIn(this.__items,
            function(_item,_index,_list){
                if (_id==_item._$getId()){
                    _item._$setTagTip(_count+'个组织添加了此标签');
                    return !0;
                }
            },this);
    };
};
define('{pro}module/setting/tag.js',
      ['{lib}util/ajax/xdr.js'
      ,'{com}util/form/form.js'
      ,'{com}util/cache/group.js'
      ,'{pro}widget/item/tag.js'
      ,'{pro}module/common/group.js'],f);
