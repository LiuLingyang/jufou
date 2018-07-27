var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _u = _('nej.u'),
        _v = _('nej.v'),
        _j = _('nej.j'),
        _t = _('nej.ut'),
        _p = _('mu.ut'),
        _proCacheMeeting,
        _seed = +new Date,
        _baidu = 'http://api.map.baidu.com/geocoder/v2/?ak='+baiduKEY+'&output=json&';
    /**
     * 活动缓存对象
     * 
     * 
     * 
     */
    _p._$$CacheMeeting = NEJ.C();
      _proCacheMeeting = _p._$$CacheMeeting._$extend(_p._$$Cache);
    /**
     * 
     */
    _proCacheMeeting.__doLoadList = (function(){
        var _nmap = {
                meeting:'/rest/open/meeting/list',
                host:'/rest/meeting/host',
                user:'/rest/meeting/attendees',
                search:'/rest/meeting/search',
                suggest:'/rest/meeting/proposals'
            };
        return function(_options){
        	var _key = _options.key,
    	        _flg = _key.split('-')[0];
            _j._$request(_nmap[_flg],{
                method:'POST',
                type:'json',
                data:_u._$object2query(_options.data),
                onload:function(_type,_key,_onload,_json){
                    var _result = _json.result||_o;
                    if (!!_result.map){
                        var _amap = _result.map,
                            _list = _result.list;
                        _u._$forEach(
                            _list,function(_meeting){
                                _meeting.attendees = _amap[_meeting.id];
                            }
                        );
                    }
                    if (!!_result.state){
                        var _amap = _result.state,
                            _list = _result.list;
                        _u._$forEach(
                            _list,function(_meeting){
                                _meeting.state = _amap[_meeting.id];
                            }
                        );
                    }
                    if (!!_result.relation){
                        var _amap = _result.relation,
                            _list = _result.list;
                        _u._$forEach(
                            _list,function(_meeting){
                                _meeting.relation = _amap[_meeting.group.id]||0;
                            }
                        );
                    }
                    this.__cbListLoad(_key,_onload,_json);
                    if (!!_json.result.count){
                        _v._$dispatchEvent(
                            _p._$$CacheMeeting,
                            'countupdate',_json.result.count
                        );
                    }
                }._$bind(this,_flg,_key,_options.onload),
                onerror:this.__cbListLoad._$bind(this,_key,_options.onload,_o)
            });
        };
    })();
    /**
     * 发布活动
     * @return {Void}
     */
    _proCacheMeeting._$create = (function(){
        var _doGeo = function(_meeting,_xkey,_fortest){
            var _opt = {
                city:_meeting.city,
                address:_meeting.address||_meeting.area||'',
                callback:_xkey
            };
            // for shanghai/beijing
            if (!_meeting.area){
                _opt.city = _meeting.province;
            }
            if (!!_fortest){
                _opt.address = _meeting.area||_meeting.city;
            }
            _j._$loadScript(
                _baidu+_u._$object2query(_opt),{
                    onerror:window[_xkey]
                }
            );
        };
        return function(_meeting){
            var _url = '/rest/meeting/create';
            if (_meeting.draft){
                _url = '/rest/meeting/draft';
            }else if(!!_meeting.mid){
                _url = '/rest/meeting/update';
            }
            if(!!_meeting.feeList)
                _meeting.feeItem = _meeting.feeList;
            if (!_meeting.draft){
                var _xkey = 'cb_'+(_seed++);
                var _test = !1;
                window[_xkey] = function(_json){
                    var _isok = !1;
                    if ((_json||_o).status==0){
                        var _location = (_json.result||_o).location;
                        if (!!_location){
                            _isok = !0;
                            _meeting.latitude = _location.lat||'0.0';
                            _meeting.longitude = _location.lng||'0.0';
                        }
                    }
                    if (!_isok&&!_test){
                        _test = !0;
                        _doGeo(_meeting,_xkey,!0);
                        return;
                    }
                    if (!_isok){
                        _meeting.latitude = '0.0';
                        _meeting.longitude = '0.0';
                    }
                    _j._$request(_url,{
                        type:'json',
                        method:'POST',
                        data:_u._$object2query(_meeting),
                        onload:this._$dispatchEvent._$bind(this,'onmeetingcreate'),
                        onerror:this._$dispatchEvent._$bind(this,'onmeetingcreate',_o)
                    });
                }._$bind(this);
                // check geo
                _doGeo(_meeting,_xkey);
            }else{
                _j._$request(_url,{
                    type:'json',
                    method:'POST',
                    data:_u._$object2query(_meeting),
                    onload:this._$dispatchEvent._$bind(this,'onmeetingcreate'),
                    onerror:this._$dispatchEvent._$bind(this,'onmeetingcreate',_o)
                });
            }
        };
    })();
    /**
     * 
     */
    _proCacheMeeting._$cancel = function(_data){
    	_j._$request('/rest/meeting/cancel',{
            type:'json',
            method:'POST',
            data:_u._$object2query(_data),
            onload:this._$dispatchEvent._$bind(this,'onmeetingcancel'),
            onerror:this._$dispatchEvent._$bind(this,'onmeetingcancel',_o)
        });
    };
    /**
     * 
     */
    _proCacheMeeting._$delete = function(_data){
    	_j._$request('/rest/meeting/delete',{
            type:'json',
            method:'POST',
            data:_u._$object2query(_data),
            onload:this._$dispatchEvent._$bind(this,'onmeetingdelete'),
            onerror:this._$dispatchEvent._$bind(this,'onmeetingdelete',_o)
        });
    };
    /**
     * 
     */
    _proCacheMeeting._$top = function(_data){
    	_j._$request('/rest/meeting/top',{
            type:'json',
            method:'POST',
            data:_u._$object2query(_data),
            onload:this._$dispatchEvent._$bind(this,'onmeetingtop'),
            onerror:this._$dispatchEvent._$bind(this,'onmeetingtop',_o)
        });
    };
    /**
     * 
     */
    _proCacheMeeting._$reply = function(_data){
        _j._$request('/rest/meeting/reply',{
            type:'json',
            method:'POST',
            data:_u._$object2query(_data),
            onload:this._$dispatchEvent._$bind(this,'onmeetingreply',_data),
            onerror:this._$dispatchEvent._$bind(this,'onmeetingreply',_data,_o)
        });
    };
    /**
     * 
     */
    _proCacheMeeting._$stopReply = function(_data){
        _j._$request('/rest/meeting/stopReply',{
            type:'json',
            method:'POST',
            data:_u._$object2query(_data),
            onload:this._$dispatchEvent._$bind(this,'onmeetingreplystop'),
            onerror:this._$dispatchEvent._$bind(this,'onmeetingreplystop',_o)
        });
    };
    /**
     * 
     */
    _proCacheMeeting._$recoverReply = function(_data){
        _j._$request('/rest/meeting/resumeReply',{
            type:'json',
            method:'POST',
            data:_u._$object2query(_data),
            onload:this._$dispatchEvent._$bind(this,'onmeetingreplyrecover'),
            onerror:this._$dispatchEvent._$bind(this,'onmeetingreplyrecover',_o)
        });
    };
    /**
     * 
     * @param {Object} _data
     */
    _proCacheMeeting._$answer = function(_data){
        _j._$request('/rest/meeting/answer',{
            type:'json',
            method:'POST',
            data:_u._$object2query(_data),
            onload:this._$dispatchEvent._$bind(this,'onmeetinganswer'),
            onerror:this._$dispatchEvent._$bind(this,'onmeetinganswer',_o)
        });
    };
    
    _proCacheMeeting._$updateState = function(_data){
        _j._$request('/rest/meeting/updateReply',{
            type:'json',
            method:'POST',
            data:_u._$object2query(_data),
            onload:this._$dispatchEvent._$bind(this,'onstatechange'),
            onerror:this._$dispatchEvent._$bind(this,'onstatechange',_o)
        });
    };
    
    _proCacheMeeting._$upload = function(_form){
        _form.action = '/rest/photo/upload';
        _j._$upload(_form,{
            type:'json',
            onload:this._$dispatchEvent._$bind(this,'onphotoupload'),
            onerror:this._$dispatchEvent._$bind(this,'onphotoupload',_o)
        });
    };
    
    /**
     * 
     */
    _proCacheMeeting._$approve = function(_data){
        _j._$request('/rest/meeting/approve',{
            type:'json',
            method:'POST',
            data:_u._$object2query(_data),
            onload:this._$dispatchEvent._$bind(this,'onmeetingapprove'),
            onerror:this._$dispatchEvent._$bind(this,'onmeetingapprove',_o)
        });
    };
    
    
    _t._$$CustomEvent._$allocate({
        element:_p._$$CacheMeeting,
        event:'countupdate'
    });
};
define('{com}util/cache/meeting.js',
      ['{com}util/api.js'
      ,'{com}util/cache/cache.js'
      ,'{lib}util/ajax/tag.js'
      ,'{lib}util/event/event.js'],f);
