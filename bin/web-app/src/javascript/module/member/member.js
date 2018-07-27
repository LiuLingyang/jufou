var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _u = _('nej.u'),
        _y = _('nej.ui'),
        _x = _('nej.ut'),
        _z = _('mu.x'),
        _t = _('mu.ut'),
        _w = _('mu.w.w'),
        _i = _('mu.w.i'),
        _p = _('mu.m.g'),
        _proModuleMember;
    /**
     * 组织相册模块
     * 
     */
    _p._$$ModuleMember = NEJ.C();
      _proModuleMember = _p._$$ModuleMember._$extend(_p._$$ModuleGroup);
    /**
     * 重置
     */
    _proModuleMember.__reset = function(_options){
        this.__supReset(_options);
        this.__mopt.cache.data.gid = this.__group.id;
        this.__topt.index = parseInt(location.hash.substr(1))||0;
        this.__taber = _x._$$Tab._$allocate(this.__topt);
    };
    /**
     * 构建模块
     * @return {Void}
     */
    _proModuleMember.__doBuild = function(){
        this.__body = _e._$get('module-60');
        // 0 - action form
        // 1 - list box
        // 2 - pager box
        var _list = _e._$getByClassName('member-tab-box','js-xflag');
        this.__nform = _list[0];
        this.__nsort = this.__nform.sort;
        _v._$addEvent(
            _list[0],'change',
            this.__onSortChange._$bind(this)
        );
        // init search
        _z._$bindSearch(
            this.__nform.keyword,
            this.__nform['btn-search'],
            {onok:this.__onKeyWordChange._$bind(this)}
        );
        // init tab option
        this.__topt = {
            list:_e._$getChildren('member-tab-btn'),
            onchange:this.__onListTypeChange._$bind(this)
        };
        // init message send window option
        this.__sopt = {
            onok:this.__doSendMessage._$bind(this)
        };
        // init module option
        this.__mopt = {
            limit:10,
            parent:_list[1],
            item:{
                klass:_i._$$ItemMember,
                onaction:this.__onAction._$bind(this)
            },
            pager:{
                clazz:'w-pager',
                parent:_list[2]
            },
            cache:{
                data:{},
                klass:_t._$$CacheMember
            },
            onbeforelistload:this.__doShowLoading._$bind(this),
            onemptylist:this.__doShowEmpty._$bind(this),
            onbeforelistrender:this.__doShowSortChange._$bind(this)
        };
        
        this.__cache = _t._$$CacheMember._$allocate({
            onadmin:this.__cbAdmin._$bind(this),
            onmember:this.__cbMember._$bind(this),
            onkickout:this.__cbKickout._$bind(this)
        });
        this.__mcache = _t._$$CacheMessage._$allocate({
            onmessage:this.__cbMessage._$bind(this)
        });
    };
    /**
     * 数据加载中
     * @return {Void}
     */
    _proModuleMember.__doShowLoading = function(_event){
        _e._$setStyle(this.__nform,'visibility','hidden');
        _event.value = '<p class="w-loading">&nbsp;</p>';
    };
    /**
     * 
     */
    _proModuleMember.__doShowEmpty = function(_event){
        _e._$setStyle(this.__nform,'visibility','hidden');
        _event.value = '<p class="w-message">没有会员</p>';
    };
    /**
     * 
     */
    _proModuleMember.__doShowSortChange = function(){
        _e._$setStyle(this.__nform,'visibility','');
    };
    /**
     * 列表类型变化
     */
    _proModuleMember.__onListTypeChange = function(_event){
        var _role = _event.index;
        location.hash = _role;
        this.__mopt.cache.data.role = _role;
        var _item = this.__mopt.item;
        _item.type = _role;
        if (_role==2){
            _item.role = -1;
        }else if(_role==3){
            _item.role = -2;
        }else{
            delete _item.role;
        }
        this.__nform.keyword.value = '';
        var _value = this.__nsort.selectedIndex,
            _index = parseInt(_e._$dataset(this.__nsort,'index'))||0;
        if (_value!=_index){
            this.__nsort.selectedIndex = _index;
        }else{
            this.__onSortChange();
        }
    };
    /**
     * 关键字变化
     */
    _proModuleMember.__onKeyWordChange = function(_value){
        this.__onSortChange();
    };
    /**
     * 排序变化事件
     */
    _proModuleMember.__onSortChange = (function(){
        var _order = ['attendee.nickname','attendee.nickname','attendTime','attendTime'],
            _desc  = ['asc','desc','asc','desc'];
        return function(){
            if (!!this.__lmdl)
                this.__lmdl._$recycle();
            var _role = this.__mopt.cache.data.role,
                _sort = this.__nsort.value,
                _data = this.__mopt.cache.data,
                _kywd = this.__nform.keyword.value.trim();
            this.__mopt.cache.lkey = _role+'-'+_sort+'-'+_kywd;
            _data.type = _sort;
            _data.order = _desc[_sort-1];
            _data.sort = _order[_sort-1];
            _data.keyword = _kywd;
            this.__lmdl = _x._$$ListModulePG._$allocate(this.__mopt);
        };
    })();
    /**
     * 
     * @param {Object} _event
     */
    _proModuleMember.__onAction = function(_event){
        switch(_event.action){
            case 'admin-a':
            case 'admin-c':
                this.__cache._$admin({
                    gid:this.__group.id,
                    uid:_event.data.attendee.id,
                    role:_event.action=='admin-a'?1:-1
                });
            return;
            case 'member-a':
            case 'member-r':
                this.__cache._$member({
                    gid:this.__group.id,
                    uid:_event.data.attendee.id,
                    role:_event.action=='member-a'?1:-1
                });
            return;
            case 'cancel':
                var _gid = this.__group.id,
                    _uid = _event.data.attendee.id;
                _w._$$WindowConfirm._$allocate({
                    title:'取消会员确认',
                    message:'您确定要取消该会员？',
                    onok:function(){
                        this.__cache._$kickout({
                            gid:_gid,
                            uid:_uid
                        });
                    }._$bind(this)
                })._$show();
            return;
            case 'detele':
                var _gid = this.__group.id,
                    _uid = _event.data.attendee.id;
                _w._$$WindowConfirm._$allocate({
                    title:'删除用户确认',
                    message:'您确定要删除该用户？',
                    onok:function(){
                        this.__cache._$kickout({
                            gid:_gid,
                            uid:_uid
                        });
                    }._$bind(this)
                })._$show();
            return;
            case 'message':
                this.__sopt.ext = _event.data.attendee;
                _w._$$WindowMessageSend._$allocate(this.__sopt)._$show();
            return;
        }
    };
    /**
     * 
     */
    _proModuleMember.__doSendMessage = function(_event){
        _event.data.uid = _event.ext.id;
        _event.data.gid = this.__group.id;
        this.__mcache._$message(_event.data);
    };
    /**
     * 
     */
    _proModuleMember.__cbMessage = function(_json){
        _json.code!=1 
        ? _z._$showError('暂时无法发送消息，请稍候再试')
        : _z._$showSuccess('消息发送成功');
    };
    /**
     * 
     * @param {Object} _json
     */
    _proModuleMember.__cbAdmin = function(_json){
        this.__doRefresh(_json);
    };
    /**
     * 
     * @param {Object} _json
     */
    _proModuleMember.__cbMember = function(_json){
        this.__doRefresh(_json);
    };
    /**
     * 
     * @param {Object} _json
     */
    _proModuleMember.__cbKickout = function(_json){
        this.__doRefresh(_json);
    };
    /**
     * 
     */
    _proModuleMember.__doRefresh = function(_json){
        switch(_json.code){
            case 1:
                location.reload();
                // this.__cache._$clearDataLocal();
                // this.__lmdl._$refresh();
            return;
            default:
                _z._$showError('暂时无法操作，请稍候再试');
            return;
        }
    };
};
define('{pro}module/member/member.js',
      ['{pro}widget/item/member.js'
      ,'{pro}module/common/group.js'
      ,'{pro}widget/window/message.send.js'
      ,'{pro}widget/window/confirm.js'
      ,'{com}util/cache/member.js'
      ,'{com}util/cache/message.js'
      ,'{lib}util/tab/tab.js'
      ,'{lib}util/list/module.pager.js'],f);
