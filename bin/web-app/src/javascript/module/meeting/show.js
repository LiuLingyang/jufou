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
        _i = _('mu.w.i'),
        _w = _('mu.w.w'),
        _p = _('mu.m.g'),
        _proModuleMeetingShow;
    /**
     * 组织相册模块
     * 
     */
    _p._$$ModuleMeetingShow = NEJ.C();
      _proModuleMeetingShow = _p._$$ModuleMeetingShow._$extend(_p._$$ModuleGroup);
    /**
     * 重置
     */
    _proModuleMeetingShow.__reset = function(_options){
        this.__supReset(_options);
        this.__meeting = _options.meeting||_o;
        this.__ropt.host = this.__host;
        this.__ropt.mid = this.__meeting.id;
        _p._$$ModuleComment._$allocate({
        	type:1,
        	host:this.__host,
        	group:this.__group,
        	owner:this.__meeting,
    		parent:_e._$getChildren('module-26')[0]
    	});
    };
    /**
     * 构建模块
     * @return {Void}
     */
    _proModuleMeetingShow.__doBuild = function(){
    	// 0 - cancel/recover meeting
    	// 1 - top/untop meeting
    	// 2 - invite member
    	var _list = _e._$getByClassName('module-25','js-xflag');
    	this.__nccl = _list[0];
    	this.__ntop = _list[1];
    	_v._$addEvent(_list[0],'click',this.__onCancelMeeting._$bind(this));
    	_v._$addEvent(_list[1],'click',this.__onTopMeeting._$bind(this));
    	// init window options
    	this.__wopt = {
    		
    	};
    	this.__ropt = {
    		
    	};
    	this.__xopt = {
    	    title:'确认停止回复',
    	    message:'您确认要停止此活动的回复功能？',
    	    onok:this.__doStopReply._$bind(this)
    	};
    	// init cache
    	this.__cache = _t._$$CacheMeeting._$allocate({
    		onmeetingtop:this.__cbMeetingTop._$bind(this),
    		onmeetingcancel:this.__cbMeetingCancel._$bind(this),
    		onmeetingreply:this.__cbMeetingReply._$bind(this),
    		onmeetingreplystop:this.__cbStopReply._$bind(this)
    	});
        // init manager card 
        _w._$$CardMeetingManager._$attach('module-27',{
            onaction:this.__doManageAction._$bind(this)
        });
    	// init reply
    	var _list = _e._$getByClassName('module-28','js-btn')||_r;
    	_v._$addEvent(
    	    _list[0],'click',
    	    this.__onReplyUpdate._$bind(this)
    	);
    	_v._$addEvent(
    	    'module-28','click',
    	    this.__doCheckInvite._$bind(this)
    	);
    	this.__rfom = _e._$get('meeting-reply-form');
    	if (!this.__rfom) return;
    	this.__xform = _t._$$WebForm._$allocate({
    	    form:this.__rfom
    	});
    	_v._$addEvent(
    	    this.__rfom.state[0],'click',
    	    this.__onReplyAction._$bind(this,0)
    	);
    	_v._$addEvent(
            this.__rfom.state[1],'click',
            this.__onReplyAction._$bind(this,1)
        );
        _v._$addEvent(
            this.__rfom['btn-ok'],'click',
            this.__onReplyMeeting._$bind(this)
        );
        _v._$addEvent(
            'www-jufou-com-detail-btn','click',
            this.__onSwitchDetail._$bind(this)
        );
    };
    /**
     * 
     */
    _proModuleMeetingShow.__doCheckInvite = function(_event){
        var _node = _v._$getElement(_event,'action');
        if (!_node||_e.
             _$dataset(_node,'action')!='meeting-join') return;
        _z._$checkInvite(_event,_node);
    };
    /**
     * 
     * @param {Object} _event
     */
    _proModuleMeetingShow.__onCancelMeeting = function(_event){
        _v._$stop(_event);
	    this.__cache._$cancel({
    		mid:this.__meeting.id,
    		canceled:this.__nccl.innerText=='[取消活动]'
	    });
    };
    /**
     * 
     */
    _proModuleMeetingShow.__cbMeetingCancel = function(_json){
    	if (_json.code==1){
    		var _txt = this.__nccl.innerText;
    		this.__nccl.innerText = _txt=='[取消活动]'?'[恢复活动]':'[取消活动]';
    		return;
    	}
    	alert('暂时无法取消活动，请稍后再试！');
    };
    /**
     * 
     * @param {Object} _event
     */
    _proModuleMeetingShow.__onTopMeeting = function(_event){
        _v._$stop(_event);
	    this.__cache._$top({
    		mid:this.__meeting.id,
    		top:this.__ntop.innerText=='[置顶]'?1:0
	    });
    };
    /**
     * 
     */
    _proModuleMeetingShow.__cbMeetingTop = function(_json){
    	if (_json.code==1){
    		var _txt = this.__ntop.innerText;
    		this.__ntop.innerText = _txt=='[置顶]'?'[取消置顶]':'[置顶]';
    		return;
    	}
    	alert('暂时无法置顶活动，请稍后再试！');
    };
    /**
     * 
 	 * @param {Object} _event
     */
    _proModuleMeetingShow.__onJoinManage = function(_event){
    	_w._$$WindowMeetingReply
    	  ._$allocate(this.__ropt)._$show();
    };
    /**
     * 
     */
    _proModuleMeetingShow.__onReplyUpdate = function(_event){
        _e._$setStyle(this.__rfom,'display','');
        _e._$setStyle(_v._$getElement(_event),'display','none');
    };
    /**
     * 
     * @param {Object} _name
     */
    _proModuleMeetingShow.__onReplyAction = (function(){
        var _xname = ['参加','不参加'];
        return function(_type){
            this.__rfom['btn-ok'].value = _xname[_type];
            _type==1 ? _e._$addClassName(this.__rfom,'js-ncj')
                     : _e._$delClassName(this.__rfom,'js-ncj')
        };
    })();
    /**
     * 
     */
    _proModuleMeetingShow.__onReplyMeeting = function(){
        var _data = this.__xform._$data();
        if (_data.state==1&&
           !this.__xform._$checkValidity()){
           return; 
        }
        if (_data.state==0){
            delete _data.observer;
            delete _data.content;
        }else{
            // default
            if (!_data.observer){
                _data.observer = this.__meeting.observerLimit||0;
            }
            // check number
            _data.observer = parseInt(_data.observer);
            if (isNaN(_data.observer)){
                this.__xform._$showMsgError('observer','必须为数字');
                return;
            }
            // check limit
            var _limit = this.__meeting.observerLimit||0;
            if(_limit>0&&_data.observer>_limit){
                this.__xform._$showMsgError('observer','超过携带限制');
                return;
            }
        } 
        _data.mid = this.__meeting.id;
        this.__cache._$reply(_data);
    };
    /**
     * 
     */
    _proModuleMeetingShow.__doStopReply = function(){
        this.__cache._$stopReply({mid:this.__ropt.mid});
    };
    /**
     * 
     * @param {Object} _json
     */
    _proModuleMeetingShow.__cbMeetingReply = function(_data,_json){
        switch(_json.code){
            case 1:
                var _questions = this.__meeting.questions;
                if (!!_questions&&_questions.length>0){
                    location.href = config.page('/meeting/reply/'+this.__meeting.id+'/');
                    return;
                }
                location.reload();
            return;
            case -3:
                _z._$showError('没有权限！');
            return;
            case -9:
                _z._$showError('邀请无效！');
            return;
            case -302:
                _z._$showError('活动已停止回复！');
            return;
            case -303:
                _z._$showError('参加人数已满！');
            return;
            case -304:
                _z._$showError('超过可携带人数限制！');
            return;
            case -305:
                _z._$showError('已被拒绝，禁止提交回复！');
            return;
            default:
                _z._$showError('暂时无法回复活动，请稍候再试！');
            return;
        }
    };
    /**
     * 
     * @param {Object} _event
     */
    _proModuleMeetingShow.__doManageAction = function(_event){
        switch(_event.type){
            case '0':
                _w._$$WindowMeetingReply
                  ._$allocate(this.__ropt)._$show();
            return;
            case '1':
                location.href = '/'+this.__group.homepage+'/meeting/answer/'+this.__meeting.id+'/';
            return;
            case '2':
                _w._$$WindowConfirm._$allocate(this.__xopt)._$show();
            return;
            case '3':
                window.open('/'+this.__group.homepage+'/meeting/print/'+this.__meeting.id+'/');
            return;
            case '4':
                location.href = '/'+this.__group.homepage+'/inform/'+this.__meeting.id+'/';
            return;
        }
    };
    /**
     * 
     * @param {Object} _json
     */
    _proModuleMeetingShow.__cbStopReply = function(_json){
        if (_json.code!=1){
            _z._$showError('暂时无法停止回复，请稍候再试！');
            return;
        }
        location.reload();
    };
    /**
     * 
     */
    _proModuleMeetingShow.__onSwitchDetail = function(_event){
        _v._$stop(_event);
        var _element = _v._$getElement(_event),
            _parent = _e._$get('www-jufou-com-detail');
        if (_e._$dataset(_element,'type')=='all'){
            _e._$dataset(_element,'type','digest');
            _parent.innerHTML = this.__meeting.digest;
            _element.innerText = '查看全文>>';
        }else{
            _e._$dataset(_element,'type','all');
            _parent.innerHTML = this.__meeting.details;
            _element.innerText = '查看摘要>>'
        }
    };
};
define('{pro}module/meeting/show.js',
      ['{com}util/cache/meeting.js'
      ,'{com}util/form/form.js'
      ,'{pro}module/common/group.js'
      ,'{pro}module/comment/comment.js'
      ,'{pro}widget/window/confirm.js'
      ,'{pro}widget/window/meeting.reply.js'
      ,'{pro}widget/window/meeting.manager.js'],f);
