var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _u = _('nej.u'),
        _v = _('nej.v'),
        _z = _('mu.x'),
        _t = _('mu.ut'),
        _p = _('mu.m.g'),
        _proModuleJoin,
        _supModuleJoin;
    /**
     * 创建组织第三步模块对象
     * 
     */
    _p._$$ModuleJoin = NEJ.C();
      _proModuleJoin = _p._$$ModuleJoin._$extend(_p._$$ModuleGroup);
      _supModuleJoin = _p._$$ModuleJoin._$supro;
    /**
     * 
     */
    _proModuleJoin.__reset = function(_options){
    	this.__supReset(_options);
    	this.__topt.maxlength = 250;
    	this.__topt.placeholder = '请输入问题';
        // init cache 
        this.__cache = _t._$$CacheGroup._$allocate({
        	group:this.__group,
        	onquestionadd:this.__cbChangeQue._$bind(this),
            onquestionupdate:this.__cbChangeQue._$bind(this),
            onquestiondelete:this.__cbDeleteQue._$bind(this),
            onjoinsettingupdate:this.__cbUpdateJoinSetting._$bind(this)
        });
    };
    /**
     * 构建模块
     * @return {Void}
     */
    _proModuleJoin.__doBuild = function(){
        _v._$addEvent(
            this.__body['btn-ok'],'click',
            this.__onSubmit._$bind(this)
        );
        _v._$addEvent(
            this.__body['btn-cc'],'click',
            this.__onCancel._$bind(this)
        );
        // init module
        var _list = _e._$getByClassName(this.__body,'js-flag');
        // init tag input
        this.__topt = {
            parent:_list[0],
            maxlength:250,
            placeholder:'请输入问题',
            onchange:this.__onChangeQue._$bind(this),
            ondelete:this.__onDeleteQue._$bind(this)
        };
    };
    /**
     * 
     */
    _proModuleJoin.__doFormatData = function(_data){
    	_data = _data||_o;
    	return {name:_data.question,id:_data.id};
    };
    /**
     * 取消创建
     * @return {Void}
     */
    _proModuleJoin.__onCancel = function(_event){
        var _group = this.__cache._$getGroupInCache();
        location.href = '/'+_group.homepage+'/';
    };
    /**
     * 表单提交
     * @return {Void}
     */
    _proModuleJoin.__onSubmit = function(_event){
        var _data = this.__form._$data();
        // check question
        if (_data.submitAnswer==1){
            var _index = _u._$forIn(
            	this.__items,
                function(_item){
                    return _item._$hasData();
                });
            if (_index==null){
                alert('您选择了会员入会时需要提交档案问题，请输入档案问题');
                this.__items[0]._$focus();
                return;
            }
        }
        this.__cache._$updateJoinSetting(_data);
    };
    /**
     * 更新加入条件设置
     * @return {Void}
     */
    _proModuleJoin.__cbUpdateJoinSetting = function(_json){
        if (_json.code==1){
        	_z._$showSuccess('设置保存成功！');
            var _group = this.__cache._$getGroupInCache();
            window.setTimeout(
                    function(){location.href = '/'+_group.homepage+'/setting';},
                    3000
                );
        }else{
            _z._$showError('暂时无法更新信息，请稍候再试');
        }
    };
    /**
     * 
     */
    _proModuleJoin.__doClearItem = function(_id){
        this.__locked = !0;
        _e._$getItemById(_id)._$clear();
        this.__locked = !1;
    };
    /**
     * 修改问题
     * @return {Void}
     */
    _proModuleJoin.__onChangeQue = function(_event){
    	if (this.__locked) return;
        var _data = _event.data,
            _question = {
                id:_event.id,
                qid:_data.id,
                question:_event.tag,
                publish:0
            };
        if (!_question.question){
        	this.__doClearItem(_event.id);
        	return;
        }
        _question.qid==null
        ? this.__cache._$addQuestion(_question)
        : this.__cache._$updateQuestion(_question);
    };
    /**
     * 修改问题
     * @return {Void}
     */
    _proModuleJoin.__cbChangeQue = function(_data,_json){
        var _item = _e._$getItemById(_data.id);
        if (_json.code!=1){
            _z._$showError('暂时无法操作档案问题，请稍候再试！');
            this.__doClearItem(_data.id);
        }else{
            _item._$setData(this.__doFormatData(_json.result));
        }
    };
    /**
     * 删除档案问题
     * @return {Void}
     */
    _proModuleJoin.__onDeleteQue = function(_event){
        _event.stopped = !0;
        var _data = {
            id:_event.id,
            qid:_event.data.id
        };
        this.__cache._$deleteQuestion(_data);
    };
    /**
     * 删除档案问题回调
     * @return {Void}
     */
    _proModuleJoin.__cbDeleteQue = function(_data,_json){
        if (_json.code==1){
            _e._$getItemById(_data.id)._$delete();
        }else{
            _z._$showError('暂时无法删除档案问题，请稍候再试！');
        }
    };
};
define('{pro}module/setting/join.js',
      ['{com}util/form/form.js'
      ,'{com}util/cache/group.js'
      ,'{pro}widget/item/tag.js'
      ,'{pro}module/common/group.js'],f);
