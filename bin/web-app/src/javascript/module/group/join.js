var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _r = NEJ.R,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _u = _('nej.u'),
        _x = _('mu.x'),
        _t = _('mu.ut'),
        _p = _('mu.m.g'),
        _proModuleJoinGroup;
    /**
     * 组织相册模块
     * 
     */
    _p._$$ModuleJoinGroup = NEJ.C();
      _proModuleJoinGroup = _p._$$ModuleJoinGroup._$extend(_p._$$ModuleGroup);
    /**
     * 构建模块
     * @return {Void}
     */
    _proModuleJoinGroup.__doBuild = function(){
    	this.__body = _e._$get('module-70').parentNode;
    	// 0 - select file button
    	// 1 - cancel button
    	var _list = _e._$getByClassName(this.__body,'js-flag');
        this.__nbtn = _list[0];
    	this.__form = _t._$$WebForm._$allocate({
    		form:this.__body
    	});
        _v._$addEvent(
        	this.__body['btn-ok'],'click',
        	this.__onSubmit._$bind(this)
        );
        this.__cache = _t._$$CacheGroup._$allocate({
        	onjoin:this.__cbJoinGroup._$bind(this)
        });
    };
    /**
     * 
     */
    _proModuleJoinGroup.__onSubmit = function(){
    	if (this.__form._$checkValidity()){
    	    var _data = this.__form._$data();
    	    if (this.__group.submitIntro&&!_data.intro){
    	        _x._$showError('组织者需要您提供自我介绍');
    	        return;
    	    }
            var _last = -1,
                _amap = {},
                _xlist = this.__form._$get('answer-t');
            _u._$forIn(_xlist,
                function(_node,_index){
                    var _value = _node.value.trim();
                    if (!_value){
                        _last = _index;
                    }
                    _amap[_e._$dataset(_xlist[_index],'qid')] = _value||'';
                }
            );
	        if (this.__group.submitAnswer&&_last>=0){
                this.__form._$showMsgError(_xlist[_last],'组织者需要您完整回答问题');
                _e._$scrollTo(_xlist[_last]);
                return;
	        }
	        delete _data['answer-t'];
	        _data.answer = JSON.stringify(_amap);
    	    this.__cache._$join(_data);
    	}
    };
    /**
     * 
     */
    _proModuleJoinGroup.__cbJoinGroup = function(_json){
        switch(_json.code){
            case 1:
            case -12:
                if (this.__form._$get('update').value=='true'){
                    location.href = this.__nbtn.href;
                    return;
                }
                if ((_json.result||_o).state==1){
                    _x._$showSuccess('组织者已经批准你加入组织！');
                }else{
                    _x._$showSuccess('申请已提交，请等待组织者批准！');
                }
                var _query = _u._$query2object(location.search.substr(1));
                window.setTimeout(function(_target){
                    location.href = _target;
                }._$bind(null,_query.target||this.__nbtn.href),5000);
            return;
            case -9:
                _x._$showError('邀请已无效！');
            return;
            case -203:
                _x._$showError('组织者需要您提供的信息不完整！');
            return;
            case -204:
                _x._$showError('请先加入组织！');
            return;
            case -205:
                _x._$showError('您已经申请过加入该组织!');
            return;
            default:
                _x._$showError('暂时无法操作，请稍候再试！');
            return;
        }
    };
};
define('{pro}module/group/join.js',
      ['{lib}util/file/select.js'
      ,'{pro}module/common/group.js'
      ,'{com}util/cache/group.js'
      ,'{com}util/form/form.js'],f);
