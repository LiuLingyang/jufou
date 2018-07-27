var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _r = NEJ.R,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _u = _('nej.u'),
        _x = _('nej.ut'),
        _z = _('mu.x'),
        _t = _('mu.ut'),
        _w = _('mu.w.w'),
        _p = _('mu.m.g'),
        _proModuleMemberCard;
    /**
     * 组织相册模块
     * 
     */
    _p._$$ModuleMemberCard = NEJ.C();
      _proModuleMemberCard = _p._$$ModuleMemberCard._$extend(_p._$$ModuleGroup);
    /**
     * 重置
     */
    _proModuleMemberCard.__reset = function(_options){
        this.__supReset(_options);
        this.__user = (_options.user||_o).attendee||_o;
        this.__m80p.item.roles = _options.roles||_r;
        var _cache = this.__m80p.cache;
        _cache.lkey = 'all-'+this.__user.id;
        _cache.data.uid = this.__user.id;
        _cache.data.gid = this.__group.id;
        this.__lmdl = _x._$$ListModuleWF._$allocate(this.__m80p);
    };
    /**
     * 构建模块
     * @return {Void}
     */
    _proModuleMemberCard.__doBuild = function(){
    	this.__loading = _e._$create('p','w-loading');
    	// init group list
        var _list = _e._$getByClassName('module-80','js-flag');
        this.__nact = _e._$getByClassName('module-80','js-xflag')[0];
        _v._$addEvent(
        	this.__nact,'click',
        	this.__onAction._$bind(this)
        );
        this.__m80p = {
            parent:_list[0],
            more:_list[1],
            item:{klass:'jst-group-list'},
            cache:{klass:_t._$$CacheGroup,data:{}},
            onbeforelistload:_z._$showLoading,
            onemptylist:function(_event){
                _event.value = '<p class="w-message">没有加入其它组织</p>'
            }
        };
        this.__ucache = _t._$$CacheUser._$allocate({
            onhidejoinedgroup:this.__cbHideJoinedGroup._$bind(this)
        });
        // init member card
        var _list = _e._$getByClassName('module-81','js-flag');
        this.__mabox = _list[0];
        if (!this.__mabox.innerText.trim()){
            _e._$setStyle(this.__mabox,'display','none');
        }else{
            _v._$addEvent(
            	this.__mabox,'click',
            	this.__onMemberAction._$bind(this)
            );
        }
        // join action
        _v._$addEvent(
            'join-action-box','click',
            this.__onActionCheck._$bind(this)
        );
        this.__cache = _t._$$CacheGroup._$allocate({
            onexit:this.__cbExitGroup._$bind(this)
        });
        this.__mcache = _t._$$CacheMember._$allocate({
            oncocreate:this.__cbCocreate._$bind(this),
            onadmin:this.__cbAdmin._$bind(this),
            onmember:this.__cbJoinCheck._$bind(this),
            onkickout:this.__cbKickout._$bind(this)
        });
        this.__scache = _t._$$CacheMessage._$allocate({
            onmessage:this.__cbMessage._$bind(this)
        });
        this.__wopt = {
            title:'退出确认',
            message:'您确定要退出此组织？',
            onok:this.__doExitGroup._$bind(this)
        };
        this.__sopt = {
            onok:this.__doSendMessage._$bind(this)
        };
    };
    /**
     * 
     */
    _proModuleMemberCard.__onActionCheck = function(_event){
        var _node = _v._$getElement(_event,'d:action');
        if (!_node) return;
        this.__mcache._$member({
            gid:this.__group.id,
            uid:this.__user.id,
            role:_e._$dataset(_node,'action')
        });
    };
    /**
     * 
     */
    _proModuleMemberCard.__cbJoinCheck = function(_json){
        if (_json.code!=1){
            _z._$showError('暂时无法操作，请稍后再试');
            return;
        }
        location.reload();
    };
    /**
     * 
     */
    _proModuleMemberCard.__onAction = function(_event){
    	var _node = _v._$getElement(_event,'d:action');
    	if (!_node) return;
    	_v._$stop(_event);
    	this.__ucache._$updateHideJoinGroup({
            hidden:_e._$dataset(_node,'action')=='hide'
        });
    };
    /**
     * 
     */
    _proModuleMemberCard.__cbHideJoinedGroup = function(_json){
        switch(_json.code){
            case 1:
                !_json.result.hidden
                ? _e._$delClassName(this.__nact,'js-show')
                : _e._$addClassName(this.__nact,'js-show')
            break;
            default:
                _z._$showError('暂时无法修改设置，请稍后再试');
            break;
        }
    };
    /**
     * 
     */
    _proModuleMemberCard.__onMemberAction = function(_event){
        var _element = _v._$getElement(_event,'d:mAction');
        if (!_element) return;
        _v._$stop(_event);
        var _action = _e._$dataset(_element,'mAction');
        switch(_action){
            case 'exit':
                _w._$$WindowConfirm._$allocate(this.__wopt)._$show();
            return;
            case 'cocreate-a':
            case 'cocreate-c':
                this.__mcache._$cocreate({
                    gid:this.__group.id,
                    uid:this.__user.id,
                    role:_action=='cocreate-a'?1:-1
                });
            return;
            case 'admin-a':
            case 'admin-c':
                this.__mcache._$admin({
                    gid:this.__group.id,
                    uid:this.__user.id,
                    role:_action=='admin-a'?1:-1
                });
            return;
            case 'member-a':
            case 'member-r':
                this.__mcache._$member({
                    gid:this.__group.id,
                    uid:this.__user.id,
                    role:_action=='member-a'?1:-1
                });
            return;
            case 'cancel':
                var _gid = this.__group.id,
                    _uid = this.__user.id;
                _w._$$WindowConfirm._$allocate({
                    title:'取消会员确认',
                    message:'您确定要取消该会员？',
                    onok:function(){
                        this.__mcache._$kickout({
                            gid:_gid,
                            uid:_uid
                        });
                    }._$bind(this)
                })._$show();
            return;
            case 'message':
                this.__sopt.ext = this.__user;
                _w._$$WindowMessageSend._$allocate(this.__sopt)._$show();
            return;
        }
    };
    /**
     * 
     */
    _proModuleMemberCard.__doSendMessage = function(_event){
        _event.data.uid = _event.ext.id;
        _event.data.gid = this.__group.id;
        this.__scache._$message(_event.data);
    };
    /**
     * 
     */
    _proModuleMemberCard.__cbMessage = function(_json){
        _json.code!=1 
        ? _z._$showError('暂时无法发送消息，请稍候再试')
        : _z._$showSuccess('消息发送成功');
    };
    /**
     * 
     */
    _proModuleMemberCard.__doExitGroup = function(){
        this.__cache._$exit(this.__group.id);
    };
    /**
     * 
     * @param {Object} _event
     */
    _proModuleMemberCard.__cbExitGroup = function(_json){
        switch(_json.code){
            case 1:
                location.href = '/'+this.__group.homepage+'/';
            return;
            case -206:
                _z._$showError('创建者本人不允许退出组织！');
            return;
            default:
                _z._$showError('暂时无法退出组织，请稍候再试！');
            return;
        }
    };
    /**
     * 
     * @param {Object} _json
     */
    _proModuleMemberCard.__cbCocreate = function(_json){
        switch(_json.code){
            case 1:
                location.reload();
            return;
            default:
                _z._$showError('暂时无法操作，请稍候再试');
            return;
        }
    };
    /**
     * 
     * @param {Object} _json
     */
    _proModuleMemberCard.__cbAdmin = function(_json){
        switch(_json.code){
            case 1:
                location.reload();
            return;
            default:
                _z._$showError('暂时无法操作，请稍候再试');
            return;
        }
    };
    /**
     * 
     * @param {Object} _json
     */
    _proModuleMemberCard.__cbKickout = function(_json){
        switch(_json.code){
            case 1:
                location.href = '/'+this.__group.homepage+'/';
            return;
            default:
                _z._$showError('暂时无法操作，请稍候再试');
            return;
        }
    };
    
};
define('{pro}module/member/card.js',
      ['{pro}module/common/group.js'
      ,'{pro}widget/window/confirm.js'
      ,'{pro}widget/window/message.send.js'
      ,'{com}util/cache/group.js'
      ,'{com}util/cache/user.js'
      ,'{com}util/cache/member.js'
      ,'{com}util/cache/message.js'
      ,'{lib}util/list/module.waterfall.js'],f);
