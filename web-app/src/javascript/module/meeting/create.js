var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _u = _('nej.u'),
        _i = _('nej.ui'),
        _x = _('nej.ut'),
        _y = _('mu.x'),
        _w = _('mu.w.w'),
        _t = _('mu.ut'),
        _z = _('mu.ui'),
        _p = _('mu.m.g'),
        _proModuleMeetingCreate;
    /**
     * 组织首页模块
     * 
     * 
     */
    _p._$$ModuleMeetingCreate = NEJ.C();
      _proModuleMeetingCreate = _p._$$ModuleMeetingCreate._$extend(_p._$$ModuleGroup);
    /**
     * 
     */
    _proModuleMeetingCreate.__init = function(){
        this.__supInit();
        this.__flagmap = {};
    };
    /**
     * 控件重置
     */
    _proModuleMeetingCreate.__reset = function(_options){
        this.__supReset(_options);
        this.__edit = !!_options.edit;
        this.__meeting = _options.meeting||_o;
        this.__flagmap.endDate = !!this.__meeting.endTime;
        this.__flagmap.signupEndDate = !!this.__meeting.signupEndTime;
        // init region select
        var _data = this.__iptable;
        if (!!this.__meeting.id){
        	_data = {
        		area:this.__meeting.area,
        		city:this.__meeting.city,
        		province:this.__meeting.province
        	};
        }
        _x._$$RegionSelector._$allocate({
        	data:_data,
            area:this.__body.area,
            city:this.__body.city,
            province:this.__body.province
        });
        // init start time
        if (!this.__meeting.id){
            var _date = new Date();
            _date.setDate(_date.getDate()+1);
            var _dstr = _u._$format(_date,'yyyy-MM-dd');
            _u._$forEach(
                ['startDate','signupStartDate'],
                function(_name){
                    this.__body[_name].value = _dstr;
                },this
            );
        }
        // init content
        if (!!this.__meeting.id){
            this.__eopt.content = this.__meeting.details;
        }
        this.__editor = _z._$$CustomEditor._$allocate(this.__eopt);
        _e._$setStyle(this.__body.details,'display','none');
        // init repeat type
        this.__rpopt.index = this.__meeting.repeatType||0;
        this.__rptab = _x._$$Tab._$allocate(this.__rpopt);
        // init fee type
        this.__feopt.index = this.__meeting.feeType||0;
        this.__fetab = _x._$$Tab._$allocate(this.__feopt);
    };
    /**
     * 构建模块，子类重写具体业务逻辑
     * @return {Void}
     */
    _proModuleMeetingCreate.__doBuild = function(){
        this.__body = _e._$get('module-10').parentNode;
        this.__form = _t._$$WebForm._$allocate({
            form:this.__body
        });
        // init rich editor
        this.__eopt = {
        	style:'body{overflow-x:hidden;} img{max-width:100%;}',
            clazz:'w-edt w-rd3 bd01',focus:!1,
            parent:this.__body.details.parentNode
        };
        // init block
        var _bars = _e._$getByClassName(this.__body,'js-bbar');
        _u._$forEach(_bars,
            function(_bar){
                _e._$toggle(_bar);
            });
        var _blocks = _e._$getByClassName(this.__body,'js-block');
        // init basic block  - 0
        // 0 - add end time
        // 1 - end time box
        // 2 - remove end time
        var _list = _e._$getByClassName(_blocks[0],'js-flag');        
        this.__doToggleDateTime(
            _list[0],_list[2],_list[1],
            'endDate','startDate'
        );
        this.__doInitDateTime('startDate');
        this.__doInitDateTime('endDate');
        // init repeat         - 1
        this.__rplist = _e._$getChildren(_blocks[1]);
        var _node = this.__rplist[0];
        delete this.__rplist[0];
        this.__rpopt = {
            list:_e._$getByClassName(_node,'js-flag'),
            onchange:this.__onRepeatTypeChange._$bind(this)
        };
        this.__doInitDateTime('repeatEnd0Date');
        this.__doInitDateTime('repeatEnd1Date');
        this.__doInitDateTime('repeatEnd2Date');
        // init fee            - 2
        var _list = _e._$getChildren(_blocks[2]);
        this.__nfee = _e._$getChildren(_list[1])[0];
        this.__feopt = {
            list:_e._$getByClassName(_list[0],'js-flag'),
            onchange:this.__onFeeTypeChange._$bind(this)
        };
        this.__doInitAction(this.__nfee,'txt-fee-item');
        this.__doInitDateTime('signupStartDate');
        this.__doInitDateTime('signupEndDate');
        this.__doToggleDateTime(
            _e._$getByClassName(_list[2],'js-flag')[0],
            _e._$getByClassName(_list[3],'js-flag')[0],
            _list[3],'signupEndDate','signupStartDate'
        );
        // init question       - 4
        this.__nqst =_blocks[4];
        this.__doInitAction(this.__nqst,'txt-question-item',_e._$getChildren(this.__nqst)[0]);
        // init tag            - 5
        this.__ntag =_blocks[5];
        this.__doInitAction(this.__ntag,'txt-tag-item',_e._$getChildren(this.__ntag)[2]);
        // init action
        _v._$addEvent(
        	this.__body['btn-draft'],
        	'click',this.__onDraft._$bind(this)
        );
        _v._$addEvent(
        	this.__body['btn-publish'],
        	'click',this.__onPublish._$bind(this)
        );
        // init cache
        this.__cache = _t._$$CacheMeeting._$allocate({
            onphotoupload:this.__cbCoverUpload._$bind(this),
            onmeetingcreate:this.__cbMeetingCreate._$bind(this)
        });
        // init cover
        _e._$file(
            _e._$get('meeting-cover').parentNode,{
                name:'file',
                clazz:'js-fom',
                onchange:this.__onCoverSelect._$bind(this)
            }
        );
        this.__lopt = {
            clazz:'w-win-e w-win-h',
            title:'活动封面裁剪',
            size:{
                width:160,
                height:106
            },
            pbox:'meeting-cover',
            onok:this.__onCoverClip._$bind(this)
        };
    };
    /**
     * 
     */
    _proModuleMeetingCreate.__doInitDateTime = function(_name){
        _i._$$DatePick._$attach(
            this.__body[_name],{
            	toggled:!0,
                clazz:'w-xdat',
                onchange:this.__onDateSelect._$bind(this,_name),
                onbeforeclick:this.__doAdjustDateTime._$bind(this,_name)
            }
        );
    };
    /**
     * 
     */
    _proModuleMeetingCreate.__doAdjustDateTime = (function(){
        var _reg0 = /[e|E]nd/,
            _reg1 = /repeatEnd[\d]Date/;
        return function(_name,_event){
        	_event.date = _y._$str2date(this.__body[_name].value);
        	var _start;
        	if(_reg1.test(_name)){
        	    _start = 'startDate';
        	}else if (_reg0.test(_name)){
        	    _start = _name.replace('end','start').replace('End','Start');
        	} 
        	if (!!_start){
        	    _event.range = [_y._$str2date(this.__body[_start].value),0];
        	}else{
        	    var _date = new Date();
        	    _date.setDate(_date.getDate()-1);
        	    _event.range = [_date,0];
        	}
        };
    })();
    /**
     * 
     */
    _proModuleMeetingCreate.__doToggleDateTime = function(_nadd,_ndel,_nbox,_name,_start){
        var _id = _e._$id(_nbox);
        _v._$addEvent(
            _nadd,'click',
            this.__onAddDateTime._$bind2(this,_id,_name,_start)
        );
        _v._$addEvent(
            _ndel,'click',
            this.__onRemoveDateTime._$bind2(this,_id,_name)
        );
    };
    /**
     * 
     * @param {Object} _id
     */
    _proModuleMeetingCreate.__onAddDateTime = function(_event,_id,_name,_start){
        _v._$stop(_event);
        this.__flagmap[_name] = !0;
        var _date = this.__meeting[_name.replace('Date','Time')];
        if (!_date){
            _date = this.__meeting[_start.replace('Date','Time')];
            if (!_date){
                _date = _y._$str2date(this.__body[_start].value);
            }else{
                _date = new Date(_date);
            }
            _date.setDate(_date.getDate()+1);
        }
        this.__body[_name].value = 
            _u._$format(_date,'yyyy-MM-dd');
        _e._$setStyle(_id,'display','');
    };
    /**
     * 
     * @param {Object} _id
     */
    _proModuleMeetingCreate.__onRemoveDateTime = function(_event,_id,_name){
        _v._$stop(_event);
        this.__flagmap[_name] = !1;
        _e._$setStyle(_id,'display','none');
    };
    /**
     * 
     * @param {Object} _name
     * @param {Object} _event
     */
    _proModuleMeetingCreate.__onDateSelect = function(_name,_date){
        this.__body[_name].value = _u._$format(_date,'yyyy-MM-dd');
    };
    /**
     * 
     * @param {Object} _event
     */
    _proModuleMeetingCreate.__onRepeatTypeChange = function(_event){
        _event.nostop = !0;
        _e._$setStyle(this.__rplist[_event.last],'display','none');
        _e._$setStyle(this.__rplist[_event.index],'display','');
    };
    /**
     * 
     * @param {Object} _event
     */
    _proModuleMeetingCreate.__onFeeTypeChange = function(_event){
        _event.nostop = !0;
        _e._$setStyle(this.__nfee.parentNode,'display',_event.index==2?'':'none');
    };
    /**
     * 
     */
    _proModuleMeetingCreate.__doInitAction = function(_node,_html,_box){
        var _id = _e._$id(_box||_node);      
        _v._$addEvent(
        	_node,'click',
            this.__doAction._$bind2(this,_id,_html)
        );
    };
    /**
     * 
     */
    _proModuleMeetingCreate.__doAction = (function(){
        var _isElement = function(_node){
            return _e._$hasClassName(_node,'js-xdel');
        };
        return function(_event,_id,_html){
            var _element = _v._$getElement(_event),
                _action = _e._$dataset(_element,'action');
            if (!_action) return;
            _v._$stop(_event);
            switch(_action){
                case 'add':
                    _e._$get(_id).insertAdjacentHTML(
                        'beforeEnd',_e._$getTextTemplate(_html));
                     var _list=_e._$getChildren(_id);    
                     if(_list.length>1)
                     _e._$delClassName(_list[0],'js-ndel');
                     var _parent = _list[_list.length-1];
            		_parent.getElementsByTagName('input')[0].focus();
                break;
                case 'del':
                     _e._$remove(_v._$getElement(_event,_isElement));
                     var _list=_e._$getChildren(_id);    
                     if(_list.length<=1)
                     _e._$addClassName(_list[0],'js-ndel');
                break;
            }
        };
    })();
    /**
     * 
     */
    _proModuleMeetingCreate.__doFormatData = (function(){
    	var _reg0 = /[@\|]/gi,
    	    _reg1 = /\n/gi,
    	    _reg2 = /,/gi,
    	    _names = ['start','end','signupStart','signupEnd',
    	              'repeatEnd0','repeatEnd1','repeatEnd2'];
    	var _doFormat = function(_name,_data){
    		var _arr = _data[_name+'Date'].split('-');
    		_arr.push(_data[_name+'Hour']||0);
    		_arr.push(_data[_name+'Minute']||0);
    		delete _data[_name+'Date'];
    		delete _data[_name+'Hour'];
    		delete _data[_name+'Minute'];
    		_data[_name+'Time'] = +new Date(
    			  _arr[0],_arr[1]-1,_arr[2],_arr[3],_arr[4]);
    	    // for edit
    	    if (this.__flagmap[_name+'Date']==!1)
    	        _data[_name+'Time'] = 0;
    	};
    	var _doFormatList = function(_list,_format,_split){
    		var _arr = [];
    		if (_u._$isArray(_list)){
    			_u._$forEach(_list,function(_name){
    				_arr.push(_format(_name));
    			});
    		}else{
    			_arr.push(_format(_list));
    		}
    		return _arr.join(_split);
    	};
    	var _doFormatFee = function(_name,_money){
    	    _name = _name.trim();
    	    _money = parseInt(_money);
    	    if (!_name||isNaN(_money)) return '';
    		return _name.replace(_reg0,'')+'@'+_money;
    	};
    	var _doFormatQst = function(_question){
    		return (_question||'').replace(_reg1,'');
    	};
    	var _doFormatTag = function(_tag){
    		return (_tag||'').replace(_reg2,'');
    	};
    	return function(_data){
    		// format datetime
	    	_u._$forEach(_names,
		        function(_name){
		    		_doFormat.call(this,_name,_data);
		    	},this);
		    // format repeat
		    var _type = parseInt(_data.repeatType);
		    if (_type>0){
		    	var _index = _type-1;
		    	_data.repeatInterval = 
		    	     _data.repeatInterval[_index];
		    	_data.repeatEndTime = 
		    	     _data['repeatEnd'+_index+'Time'];
		    }else{
		    	_data.repeatInterval = 0;
		    }
		    delete _data.repeatEnd0Time;
		    delete _data.repeatEnd1Time;
		    delete _data.repeatEnd2Time;
		    if (_type>1){
		    	var _index = _type-2;
		    	_data.repeatExt = _data['repeatExt'+_index].join(',');
		    }
		    if (!_data.repeatExt)
		        delete _data.repeatExt;
		    delete _data.repeatExt0;
		    delete _data.repeatExt1;
		    // format fee
		    if (_data.feeType==2){
		    	var _arr = [],_str;
		    	if (_u._$isString(_data.feeName)){
		    	    _str = _doFormatFee(_data.feeName,_data.feeMony);
		    		if (!!_str) _arr.push(_str);
		    	}else{
		    		var _brr = _data.feeMony;
		    		_u._$forEach(_data.feeName,function(_name,_index){
		    		    _str = _doFormatFee(_name,_brr[_index]);
		    			if (!!_str) _arr.push(_str);
		    		});
		    	}
		    	_data.feeList = _arr.join('|');
		    }else{
		    	delete _data.feeDesc;
		    }
		    delete _data.feeName;
		    delete _data.feeMony;
		    // signup
		    if (_data.signupStartType==0){
		    	_data.signupStartTime = 0;
		    }
		    delete _data.signupStartType;
		    if (_data.signupEndTime!=0&&
		    	_data.signupEndType==0){
	    	    _data.signupEndTime = _data.signupStartTime;
		    }
		    delete _data.signupEndType;
		    // limit
		    if (_data.joinLimitType==0){
		    	_data.joinLimit = 0;
		    }
		    delete _data.joinLimitType;
		    // format question
		    _data.question = _doFormatList(_data.question,_doFormatQst,'\n');
		    // format tag
		    _data.tag = _doFormatList(_data.tag,_doFormatTag,',');
	    };
    })();
    /**
     * 
     */
    _proModuleMeetingCreate.__onDraft = function(){
        this.__onPublish(!0);
    };
    /**
     * 
     */
    _proModuleMeetingCreate.__onPublish = function(_draft){
        if (_draft!=!0&&!this.__form._$checkValidity()) return;
        var _data = this.__form._$data();
        _data.gid = this.__group.id;
        _data.draft = _draft==!0;
        _data.details = this.__editor._$getContent();
        this.__doFormatData(_data);
        // check time
        if (_draft!=!0){
            if (_data.startTime<=+new Date){
                _y._$showError('活动开始时间必须在当前时间之后');
                return;
            }
            if (_data.endTime!=0&&_data.endTime<=_data.startTime){
                _y._$showError('活动结束时间必须在活动开始之后');
                return;
            }
            if (!!_data.repeatEndTime&&_data.repeatEndTime<=_data.startTime){
                _y._$showError('活动重复结束时间必须在活动开始之后');
                return;
            }
            if (!!_data.signupEndTime&&!!_data.signupStartTime&&_data.signupEndTime<=_data.signupStartTime){
                _y._$showError('报名结束时间必须在报名开始之后');
                return;
            }
            if (!!_data.endTime){
                if (!!_data.signupStartTime&&_data.signupStartTime>=_data.endTime){
                    _y._$showError('报名开始时间必须在活动结束之前');
                    return;
                }
                if (!!_data.signupEndTime&&_data.signupEndTime>=_data.endTime){
                    _y._$showError('报名结束时间必须在活动结束之前');
                    return;
                }
            }
            if (_data.feeType==2&&!_data.feeList){
                _y._$showError('收费活动至少填写一种费用类型');
                return;
            }
            if (_data.observerLimitType=='1'){
                if (!_data.observerLimit){
                    _y._$showError('选择携带人数限制时限制人数必须大于0');
                    return;
                }
            }else{
                _data.observerLimit = 0;
            }
            delete _data.observerLimitCheck;
            if(!this.__meeting.cover){
            	if (!_data.cover_src){
                _y._$showError('请上传活动封面');
                return;
	            }
	            if (!_data.cover_clip){
	                _y._$showError('请裁剪您的活动封面');
	                return;
	            }
            }
        }
        if (this.__edit&&!!this.__meeting){
            _data.mid = this.__meeting.id;
        }
        this.__cache._$create(_data);
    };
    /**
     * 
     * @param {Object} _options
     */
    _proModuleMeetingCreate.__cbMeetingCreate = function(_json){
        switch(_json.code){
    	    case 1:
    	        location.href = config.page('/meeting/'+_json.result.id+'/');
    	    return;
    	    case -3:
    	        _y._$showError('没有权限!');
    	    return;
    	    case -6:
    	        _y._$showError('xss攻击！');
    	    return;
    	    default:
    	        _y._$showError('暂时无法创建活动！');
    	    return;
    	}
    };
    /**
     * 
     * @param {Object} _event
     */
    _proModuleMeetingCreate.__onCoverSelect = function(_event){
        if (!!this.__cvfm){
            alert('封面上传中，请稍后');
            return;
        }
        this.__cvfm = _event.form;
        this.__loading = _e._$get('meeting-cover-loading');
        _e._$setStyle(this.__loading,'display','');
        this.__cache._$upload(this.__cvfm);
    };
    /**
     * 
     * @param {Object} _json
     */
    _proModuleMeetingCreate.__cbCoverUpload = function(_json){
        this.__cvfm.reset();
        delete this.__cvfm;
        _e._$setStyle(this.__loading,'display','none');
        switch(_json.code){
            case 1:
                this.__form._$setValue('cover_clip','');
                var _info = _json.result;
                this.__form._$setValue('cover_src',_info.original);
                var _time = '?'+(+new Date);
                //_e._$get('meeting-cover').src = _info.original+_time;
                this.__lopt.url = _info.original+_time;
                _w._$$ImageClipper._$allocate(this.__lopt)._$show();
            return;
            default:
                _y._$showError('暂时无法上传封面！');
            return;
        }
    };
    /**
     * 
     * @param {Object} _event
     */
    _proModuleMeetingCreate.__onCoverClip = function(_event){
        var _clip = _event.clip,
            _ratio = _clip.scale,
            _info = {
                top:Math.floor(_clip.top/_ratio),
                left:Math.floor(_clip.left/_ratio),
                width:Math.floor(_clip.width/_ratio),
                height:Math.floor(_clip.height/_ratio)
            };
        this.__form._$setValue('cover_clip',JSON.stringify(_info));
    };
};
define('{pro}module/meeting/create.js',
      ['{pro}module/common/group.js'
      ,'{pro}widget/editor/editor.js'
      ,'{pro}widget/window/image.clipper.js'
      ,'{com}util/cache/meeting.js'
      ,'{com}util/form/form.js'
      ,'{lib}ui/datepick/datepick.js'
      ,'{lib}util/tab/tab.js'
      ,'{lib}util/data/region/zh.js'
      ,'{lib}util/region/region.zh.js'
      ,'{lib}util/file/select.js'],f);