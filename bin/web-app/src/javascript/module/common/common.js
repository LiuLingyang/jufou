var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _u = _('nej.u'),
        _j = _('nej.j'),
        _x = _('mu.x'),
        _t = _('mu.ut'),
        _w = _('mu.w.w'),
        _p = _('mu.m.g'),
        _proModuleCommon;
    /**
     * 组织页面左侧栏模块
     * 
     * 
     */
    _p._$$ModuleCommon = NEJ.C();
      _proModuleCommon = _p._$$ModuleCommon._$extend(_t._$$Module);
    /**
     * 构建模块，子类重写具体业务逻辑
     * @return {Void}
     */
    _proModuleCommon.__doBuild = function(){
    	this.__doInitNavMenu();
    	this.__doInitLeftSide();
    	this.__doInitInviteLG();
    };
    /**
     * 
     */
    _proModuleCommon.__doInitNavMenu = function(){
    	var _element = _e._$get('group-menu-card');
    	if (!_element) return;
        var _elements = [];
        // hidden all cards
        var _doHiddenAll = function(){
            _u._$forEach(_elements,function(_id){
                _e._$delClassName(_id,'js-toggle');
            });
        };
        var _doExitGroup = function(_gid){
            if (!_gid) return;
            _j._$request('/rest/group/exit',{
                type:'json',
                method:'POST',
                data:_u._$object2query({gid:_gid}),
                onload:_cbExitGroup,
                onerror:_cbExitGroup
            });
        };
        var _cbExitGroup = function(_json){
            _json = _json||_o;
            switch(_json.code){
            	case 1:
            	    location.reload();
            	return;
            	case -206:
            	    _x._$showMessage('创建者本人不允许退出组织！');
            	return;
            	default:
            	    _x._$showMessage('暂时无法退出组织，请稍候再试！');
            	return;
            }
        };
        _v._$addEvent('group-menu-exit','click',function(e){
            var _gid = _e._$dataset(_v._$getElement(e),'gid');
            if (!_gid) return;
            _w._$$WindowConfirm._$allocate({
                title:'退出确认',
                message:'您确认要退出此组织？',
                onok:function(){
                    _doExitGroup(_gid);
                }
            })._$show();
        })
        // init node
        /*
        _u._$forEach(
            _e._$getChildren('group-menu-card'),
            function(_node){
                var _id = _e._$id(_node);
                _v._$addEvent(_node,'click',function(e){
                    _v._$stopBubble(e);
                    _doHiddenAll();
                    _e._$hasClassName(_id,'js-toggle')
                    ? _e._$delClassName(_id,'js-toggle')
                    : _e._$addClassName(_id,'js-toggle');
                    _doExitGroup(_v._$getElement(e));
                });
                _elements.push(_id);
            }
        );
        // hidden card when document click
        _v._$addEvent(document,'click',_doHiddenAll);*/
    };
    /**
     * 
     */
    _proModuleCommon.__doInitLeftSide = function(){
    	// 0 - logo image
    	// 1 - upload logo button
    	// 2 - loading
    	var _list = _e._$getByClassName('module-1','js-flag');
    	if (!_list||!_list.length) return;
    	this.__logo = _list[0];
    	this.__nbtn = _list[1];
    	this.__nldg = _list[2];
    	if (!!this.__nbtn){
	    	_e._$file(this.__nbtn,{
	    		form:this.__nbtn.parentNode,
	    		onchange:this.__onUploadLogo._$bind(this)
	    	});
	    	this.__cache = _t._$$CacheGroup._$allocate({
	    		onlogoupdate:this.__cbLogoUpload._$bind(this)
	    	});
    	}
    };
    /**
     * 
     */
    _proModuleCommon.__doInitInviteLG = (function(){
        var _doJoin = function(_event){
            _x._$checkInvite(_event,'group-top-join');
        };
        return function(){
            _v._$addEvent('group-top-join','click',_doJoin);
        };
    })();
    /**
     * 
     */
    _proModuleCommon.__onUploadLogo = function(_event){
        this.__xform = _event.form;
    	_e._$setStyle(this.__nbtn,'visibility','hidden');
    	_e._$setStyle(this.__nldg,'display','');
    	_e._$get(_event.id).name = 'logo';
    	this.__cache._$updateLogo(_event.form);
    };
    /**
     * 
     */
    _proModuleCommon.__cbLogoUpload = function(_json){
        this.__xform.reset();
    	_e._$setStyle(this.__nbtn,'visibility','');
    	_e._$setStyle(this.__nldg,'display','none');
    	switch(_json.code){
    	    case 1:
    	        this.__logo.src = _json.result.thumbnail;
    	    return;
    	    case -3:
    	        _x._$showError('没有权限!');
    	    return;
    	    case -4:
    	        _x._$showError('上传文件过大！');
    	    return;
    	    case -5:
    	        _x._$showError('不支持此文件格式！');
    	    return;
    	    default:
    	        _x._$showError('暂时无法上传图片，请稍后再试！');
    	    return;
    	}
    };
};
define('{pro}module/common/common.js',
      ['{com}util/module/module.js'
      ,'{lib}util/file/select.js'
      ,'{lib}util/ajax/xdr.js'
      ,'{lib}util/cache/cookie.js'
      ,'{com}util/cache/group.js'
      ,'{pro}widget/window/confirm.js'],f);
