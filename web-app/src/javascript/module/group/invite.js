var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _r = NEJ.R,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _u = _('nej.u'),
        _y = _('nej.ut'),
        _x = _('mu.x'),
        _t = _('mu.ut'),
        _w = _('mu.w.w'),
        _p = _('mu.m.g'),
        _proModuleInvite;
    /**
     * 组织相册模块
     * 
     */
    _p._$$ModuleInvite = NEJ.C();
      _proModuleInvite = _p._$$ModuleInvite._$extend(_p._$$ModuleGroup);
    /**
     * 
     */
    _proModuleInvite.__reset = function(_options){
        this.__supReset(_options);
        this.__meeting = _options.meeting||_o;
    };
    /**
     * 构建模块
     * @return {Void}
     */
    _proModuleInvite.__doBuild = function(){
        this.__body = _e._$get('module-i0').parentNode;
        _v._$addEvent(
            this.__body['btn-ok'],'click',
            this.__onSendInvite._$bind(this)
        );
        _v._$addEvent(
            this.__body['btn-add'],'click',
            this.__doAppendSelectedInvite._$bind(this)
        );
        // 0 - create contact
        // 1 - search box
        // 2 - select all button
        // 3 - contact list box
        // 4 - invite count
        // 5 - remove all button
        // 6 - invite list box
        var _list = _e._$getByClassName(this.__body,'j-flzg');
        // init create contact
        _v._$addEvent(
            _list[0],'click',
            this.__doCreateContact._$bind(this)
        );
        this.__wopt = {
            onok:this.__onCreateContact._$bind(this)
        };
        // init search
        var _xlist = _list[1].getElementsByTagName('input');
        _x._$bindSearch(
            _xlist[0],_xlist[1],{
                onok:this.__doSearchContact._$bind(this),
                onchange:this.__doSearchContact._$bind(this)
            }
        );
        _v._$addEvent(
            _list[2],'click',
            this.__doSelectAllInvite._$bind(this)
        );
        // init list module
        this.__mopt = {
            limit:1000,
            parent:_list[3],
            item:{klass:'jst-invite-list',invt:{count:0}},
            cache:{},
            onbeforelistload:_x._$showLoading,
            onemptylist:function(_event){
                _event.value = '<p class="w-message">没有可邀请的朋友</p>';
            }
        };
        this.__yopt = {
            onok:this.__onReSendInvite._$bind(this)
        };
        // save node
        this.__ncot = _list[4];
        this.__nrmv = _list[5];       
        this.__nivt = _list[6];
        _v._$addEvent(
            this.__nrmv,'click',
            this.__doRemoveAllInvite._$bind(this)
        );
        _v._$addEvent(
            this.__nivt,'click',
            this.__doRemoveOneInvite._$bind(this)
        );
        // init cache
        this.__cache1 = _t._$$CacheContact._$allocate({
            onitemadd:this.__cbCreateContact._$bind(this)
        });
        this.__cache2 = _t._$$CacheGroup._$allocate({
            oninvite:this.__cbSendInvite._$bind(this)
        });
        // init tab
        var _list = _e._$getChildren('tab-btn');
        _list.pop();
        this.__taber = _y._$$Tab._$allocate({
            list:_list,
            onchange:this.__onTabChange._$bind(this)
        });
    };
    /**
     * 
     */
    _proModuleInvite.__doCreateContact = function(_event){
        _v._$stop(_event);
        _w._$$WindowContactCreate._$allocate(this.__wopt)._$show();
    };
    /**
     * 
     */
    _proModuleInvite.__onCreateContact = function(_event){
        this.__cache1._$addItem({
            key:'iv-0',
            data:_event.data
        });
    };
    /**
     * 
     */
    _proModuleInvite.__cbCreateContact = function(_options){
        if (!!_options.data){
            this.__doAppendOneInvite(_options.data);
            if (this.__mopt.cache.lkey==_options.key){
                this.__xmdl._$refresh();
            }
        }
    };
    /**
     * 
     */
    _proModuleInvite.__doSearchContact = function(_keyword){
        var _list = _e._$getByClassName(this.__mopt.parent,'j-xck');
        _u._$forEach(
            _list,function(_node){
               _e._$setStyle(
                   _node.parentNode.parentNode,'display',
                   (!_keyword||_e._$dataset(
                     _node,'name').indexOf(_keyword)>=0)?'':'none'
               );
            }
        );
    };
    /**
     * 
     */
    _proModuleInvite.__doSelectAllInvite = function(_event){
        var _checked = _v._$getElement(_event).checked,
            _list = _e._$getByClassName(this.__mopt.parent,'j-xck');
        _u._$forEach(
            _list,function(_node){
                _node.checked = _checked;
            }
        );
    };
    /**
     * 
     */
    _proModuleInvite.__doAppendSelectedInvite = (function(){
        var _doAppend = function(_node){
            if (!_node.checked) return;
            this.__doAppendOneInvite({
                id:_node.value,
                name:_e._$dataset(_node,'name'),
                email:_e._$dataset(_node,'email'),
                mobile:_e._$dataset(_node,'mobile')
            });
        };
        return function(){
            _u._$forEach(
                _e._$getByClassName(
                    this.__mopt.parent,'j-xck'),
                        _doAppend,this
            );
        };
    })();
    /**
     * 
     */
    _proModuleInvite.__doAppendOneInvite = function(_data){
        var _map = this.__mopt.item.invt;
        if (!!_map[_data.id]) return;
        if (_map.count==0){
            this.__nivt.innerHTML = '';
        }
        _map.count++;
        _map[_data.id] = _data;
        this.__ncot.innerText = _map.count;
        this.__nivt.insertAdjacentHTML(
            'beforeEnd',
            _e._$getHtmlTemplate(
                'jst-invite-item',{
                    user:_data
                 })
        );
        _e._$setStyle(this.__nrmv,'display','');
    };
    /**
     * 
     */
    _proModuleInvite.__doRemoveOneInvite = function(_event){
        var _node = _v._$getElement(_event,'d:id');
        if (!_node) return;
        _v._$stop(_event);
        this.__doRemoveOneInviteById(
              _e._$dataset(_node,'id'));
    };
    /**
     * 
     */
    _proModuleInvite.__doRemoveOneInviteById = function(_id){
        _e._$remove('invited-'+_id);
        var _map = this.__mopt.item.invt;
        if (!_map[_id]) return;
        _map.count--;
        delete _map[_id];
        this.__ncot.innerText = _map.count;
        _e._$setStyle(this.__nrmv,'display',_map.count>0?'':'none');
        if (_map.count==0){
            this.__nivt.innerHTML = '<p class="w-message">没有要邀请的人</p>';
        }
    };
    /**
     * 
     */
    _proModuleInvite.__doRemoveAllInvite = function(_event){
        _v._$stop(_event);
        _e._$setStyle(this.__nrmv,'display','none');
        var _map = this.__mopt.item.invt;
        _u._$forIn(_map,
            function(_value,_id){
                if (_id=='count') return;
                this.__doRemoveOneInviteById(_id);
            },this);
    };
    /**
     * 
     */
    _proModuleInvite.__onTabChange = function(_event){
        if (this.__xmdl) 
            this.__xmdl._$recycle();
        this.__mopt.cache.lkey = 'iv-'+_event.index;
        // member
        if (_event.index==1){
            this.__mopt.cache.klass = _t._$$CacheMember;
            this.__mopt.cache.data = {
                gid:this.__group.id,
                role:0,sort:'attendTime',order:'asc'
            };
        }else{
            this.__mopt.cache.klass = _t._$$CacheContact;
            this.__mopt.cache.data = _o;
        }
        this.__xmdl = _y._$$ListModuleWF._$allocate(this.__mopt);
    };
    /**
     * 
     */
    _proModuleInvite.__onSendInvite = function(){
        var _map = this.__mopt.item.invt;
        if (!_map.count){
            _x._$showError('请先选择要邀请的朋友！');
            return;
        }
        var _prio = this.__body.prio[0].checked,
            _hash = {mobile:[],email:[]};
        _u._$forIn(
            _map,function(_data,_key){
                if (_key=='count') return;
                if (_prio&&!!_data.email||!_data.mobile){
                    _hash.email.push(_data.email);
                    return;
                }
                _hash.mobile.push(_data.mobile);
            }
        );
        _hash.email = _hash.email.join(',');
        _hash.mobile = _hash.mobile.join(',');
        this.__doSendInvite(_hash);
        this.__body['btn-ok'].disabled = !0;
    };
    /**
     * 
     */
    _proModuleInvite.__onReSendInvite = function(_event){
        var _dext = _event.ext,
            _hash = {
                email:_dext.email,
                mobile:_dext.mobile
            };
        this.__doSendInvite(_hash);
    };
    /**
     * 发送邀请
     * @return {Void}
     */
    _proModuleInvite.__doSendInvite = function(_hash){
        _hash.content = this.__body.content.value||''
        if (!!this.__meeting.id){
            _hash.mid = this.__meeting.id;
        }else{
            _hash.gid = this.__group.id;
        }
        this.__cache2._$invite(_hash);
    };
    /**
     * 
     */
    _proModuleInvite.__cbSendInvite = function(_json){
    	this.__body['btn-ok'].disabled = !1;
        if (_json.code==1){
            _x._$showSuccess('邀请发送成功！');
            if (!!this.__meeting.id){
                var _href = config.page('/meeting/'+this.__meeting.id+'/');
                window.setTimeout(
                    function(){location.href = _href;},
                    3000
                );
            }
            return;
        }
        var _result = _json.result||_o,
            _email = _result.email||'',
            _mobile = _result.mobile||'';
        if (!_email&&!_mobile){
            _x._$showError('暂时无法发送邀请，请稍候再试！');
            return;
        }
        var _msg = [];
        if (!!_email){
            _msg.push('<p>失败邮件：'+_email+'</p>');
        }
        if (!!_mobile){
            _msg.push('<p>失败短信：'+_mobile+'</p>');
        }
        this.__yopt.ext = {
            email:_email,
            mobile:_mobile
        };
        this.__yopt.message = _msg.join('');
        _w._$$WindowRetry._$allocate(this.__yopt)._$show();
    };
};
define('{pro}module/group/invite.js',
      ['{pro}module/common/group.js'
      ,'{pro}widget/window/contact.create.js'
      ,'{pro}widget/window/invite.retry.js'
      ,'{com}util/cache/group.js'
      ,'{com}util/cache/member.js'
      ,'{com}util/cache/contact.js'
      ,'{lib}util/tab/tab.js'
      ,'{lib}util/list/module.waterfall.js'],f);
