var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _v = _('nej.v'),
        _u = _('nej.u'),
        _j = _('nej.j'),
        _t = _('nej.ut'),
        _p = _('mu.ut'),
        _proCacheMessage;
    /**
     * 相册缓存管理
     * 
     * 
     */
    _p._$$CacheMessage = NEJ.C();
      _proCacheMessage = _p._$$CacheMessage._$extend(_p._$$Cache);
    /**
     * 
     * @param {Object} _options
     */
    _proCacheMessage.__doLoadList = (function(){
        var _urls = {
             '/m/3/':'/rest/message/getInformList',
             '/m/5/':'/rest/message/getPrivateList'
        };
        return function(_options){
            var _key = _options.key,
                _xey = _key.split('-')[0];
            if (_xey=='/m/5/'){
            	_j._$request(_urls[_xey]||'/rest/message/list',{
	                method:'POST',
	                type:'json',
	                data:_u._$object2query(_options.data),
	                onload:function(_json){
	                	if(_json.code==1){
	                		var _arr = [],_xap = {},
	                		    _list = _json.result.list;
	                		if (!_list||!_list.length){
	                			this.__cbListLoad(_key,_options.onload,_json);
	                			return;
	                		}
	                		_u._$forEach(
	                			_list,function(_message){
	                				_xap[_message.message.senderId] = !0;
	                			}
	                		);
	                		_u._$forIn(_xap,function(_v,_key){
	                			_arr.push(_key);
	                		});
	                		_j._$request('/rest/user/get',{
	                			method:'GET',
	                			type:'json',
	                			query:{uids:_arr.join(',')},
	                			onload:function(_json2){
	                				if (_json2.code==1){
	                					var _map = {};
	                					_u._$forEach(
				                			_json2.result.list,function(_user){
				                				_map[_user.id] = _user;
				                			}
				                		);
	                					_u._$forEach(
				                			_list,function(_message){
				                				var _tmp = _message.message;
				                				_tmp.sender = _map[_tmp.senderId];
				                			}
				                		);
				                		this.__cbListLoad(_key,_options.onload,_json);
	                				}else{
	                					this.__cbListLoad(_key,_options.onload,_o);
	                				}
	                			}._$bind(this),
	                			onerror:this.__cbListLoad._$bind(this,_key,_options.onload,_o)
	                		});
	                	}else{
	                		this.__cbListLoad(_key,_options.onload,_o);
	                	}
	                }._$bind(this),
	                onerror:this.__cbListLoad._$bind(this,_key,_options.onload,_o)
	            });
            }else{
	            _j._$request(_urls[_xey]||'/rest/message/list',{
	                method:'POST',
	                type:'json',
	                data:_u._$object2query(_options.data),
	                onload:function(_json){
	                	if(_json.code==1){
	                		var _arr = [];
		                	_u._$forEach(
		                		_json.result.list,function(_message){
		                			if(_message.readed==false){
		                				_arr.push(_message.messageId);
		                			}
		                		}
		                	);
		                	if(_arr.length>0){
		                		_j._$request('/rest/message/read',{
						            type:'json',
						            method:'POST',
						            query:{mids:_arr.join(',')}
					        	});
					        	_v._$dispatchEvent(
					        		_p._$$CacheMessage,'messagereaded',{
					        			mtype:_options.data.type,
					        			count:_arr.length
					        		}
					        	);
		                	}
					        this.__cbListLoad(_key,_options.onload,_json);
		                }else{
		                	this.__cbListLoad(_key,_options.onload,_o);
		                }
	            	}._$bind(this),
	                onerror:this.__cbListLoad._$bind(this,_key,_options.onload,_o)
	            });
            }
        };
    })();
    /**
     * 
     * @param {Object} _data
     */
    _proCacheMessage._$message = function(_data){
        _j._$request('/rest/message/private',{
            type:'json',
            method:'POST',
            data:_u._$object2query(_data),
            onload:this._$dispatchEvent._$bind(this,'onmessage'),
            onerror:this._$dispatchEvent._$bind(this,'onmessage',_o)
        });
    };
    /**
     * 
     * @param {Object} _data
     */
    _proCacheMessage._$count = function(){
        _j._$request('/rest/message/new',{
            type:'json',
            method:'POST',
            onload:this._$dispatchEvent._$bind(this,'oncountupdate'),
            onerror:this._$dispatchEvent._$bind(this,'oncountupdate',_o)
        });
    };
    
    _t._$$CustomEvent._$allocate({
        element:_p._$$CacheMessage,
        event:'messagereaded'
    });
};
define('{com}util/cache/message.js',
      ['{com}util/cache/cache.js'
      ,'{lib}util/event/event.js'],f);
