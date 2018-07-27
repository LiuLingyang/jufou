var f = function(){
    var _  = NEJ.P,
        _f = NEJ.F,
        _e = _('nej.e'),
        _u = _('nej.u'),
        _j = _('nej.j'),
        _v = _('nej.v'),
        _p = _('mu.x');
    window.baiduKEY = 'C8c86f502db5f2627f248687f3c4e25d';
    /**
     * 页面构建入口
     * @param  {mu.ut._$$Module} 模块构造
     * @return {Void}
     */
    _p._$setup = function(_klass){
    	_e._$parseTemplate('template-box');
    	_klass._$allocate(window.data);
    };
    /**
     * Email地址转官网地址
     * @param  {String} Email地址
     * @return {String} 官网地址
     */
    _p._$email2url = (function(){
        var _reg = /^.*?@/i;
        return function(_email){
            return 'http://mail.'+(_email||'').replace(_reg,'');
        };
    })();
    /**
     * 
     */
    _p._$str2date = function(_str){
        var _arr = _str.split('-');
        return new Date(parseInt(_arr[0]),
                        parseInt(_arr[1])-1,
                        parseInt(_arr[2]));
    };
    /**
     * 
     */
    _p._$showMessage = (function(){
        var _timer,_xnode;
        var _doHideMessage = function(){
            if (!_xnode) return;
            _e._$setStyle(_xnode,'display','none');
            _timer = window.clearTimeout(_timer);
        };
        _p._$showError = function(_message,_parent){
            _p._$showMessage(_message,'js-mserr',_parent);
        };
        _p._$showSuccess = function(_message,_parent){
            _p._$showMessage(_message,'js-mstip',_parent);
        };
        return function(_message,_type,_parent){
            _parent = _e._$get(_parent)||_e._$get('message-box');
            if (!_parent) return;
            _xnode = _parent;
            var _message = '<p class="js-mscom '+_type+'">'+_message+'</p>';
            _xnode.innerHTML = _message;
            _e._$setStyle(_xnode,'display','');
            _e._$scrollTo(_xnode);
            if (!!_timer) _timer = window.clearTimeout(_timer);
            _timer = window.setTimeout(_doHideMessage,5000);
        };
    })();
    /**
     * 表单项验证回调
     * 11 - 密码过于简单
     * @param  {Object} 验证节点信息
     * @return {Void}
     */
    _p._$checkFormField = (function(){
        var _reg = [/[a-z]/,/[A-Z]/,/[0-9]/,/[^a-zA-Z0-9]/];
        var _doCheckSimplePswd = function(_pswd){
            var _count = 0;
            _u._$forEach(_reg,function(_test){
                if (_test.test(_pswd))
                    _count++;
            });
            return _count<2;
        };
        return function(_event){
            var _node = _event.target;
            // check password
            if (_node.name=='password'&&
                _doCheckSimplePswd(_node.value))
                _event.value = 11;
            // check confirm password
            if (_node.name=='password1'&&
                _node.value!=_event.form.password.value)
                _event.value = 12;
        };
    })();
    /**
     * 验证失败回调
     * @param  {Object} 失败信息
     * @return {Void}
     */
    _p._$checkInvalid = function(_event){
        var _node = _event.target,
            _code = _event.code,
            _name = _node.name,
            _message;
        // check nickname
        if (_name=='nickname'){
            if (_code==-4)
                _message = '昵称过长';
            if (_code==-5)
                _message = '昵称过短';
        }
        // check password
        if (_name=='password'){
            if (_code==-4)
                _message = '密码最多允许输入20个字符';
            if (_code==-5)
                _message = '密码至少包含6个字符';
            if (_code==11)
                _message = '密码至少包含数字、小写字母、大写字母、符号中的两种';
        }
        if (_name=='password1'&&_code==12){
            _message = '两次输入的密码必须一致';
        }
        _event.value = _message;
    };
    /**
     * 绑定验证码
	 * @param {Object} _input
	 * @param {Object} _image
	 * @param {Object} _btn
     */
    _p._$bindCaptcha = (function(){
    	var _cache = {};
    	var _doRefresh = function(_id,_event){
    		_v._$stop(_event);
    		_p._$refreshCaptcha(_id);
    		_e._$get(_id).focus();
    	};
    	_p._$refreshCaptcha = function(_input){
    	    var _id = _e._$id(_input),
    	        _conf = _cache[_id];
    	    if (!_conf) return;
            _e._$get(_conf.img).src = 
                _conf.base+'?'+(+new Date);
            var _node = _e._$get(_id);
            _node.value = '';
    	};
    	return function(_input,_image,_btn){
	    	var _id = _e._$id(_input),
	    	    _conf = {};
	    	_cache[_id] = _conf;
	    	_conf.img = _e._$id(_image);
	    	_conf.base = _e._$get(_image).src.split('?')[0]||'/rest/user/captcha';
	    	_v._$addEvent(
	    		_btn,'click',
	    		_doRefresh._$bind(null,_id)
	    	);
	    	if (!_conf.img.src)
	    	    _p._$refreshCaptcha(_input);
	    };
    })();
    /**
     * 
     */
    _p._$isMobileOK = (function(){
    	var _reg = /^[\d]{11}$/i;
    	return function(_mobile){
	    	return _reg.test(_mobile||'');
	    };
    })();
    /**
     * 
     */
    _p._$isEmailOK = (function(){
        var _reg = /^[\w-\.]+@(?:[\w-]+\.)+[a-z]{2,6}$/i;
        return function(_email){
            return _reg.test(_email||'');
        };
    })();
    /**
     * 
     */
    _p._$bindPhoneCaptcha = (function(){
    	var _count,_timer;
        var _doCountDown = function(_id){
            var _btn = _e._$get(_id);
            if (_count<=0){
                _timer = window.clearInterval(_timer);
                _btn.value = '重新发送';
                _btn.disabled = !1;
            }else{
                _btn.value = '等待('+_count+')秒';
                _btn.disabled = !0;
            }
            _count--;
        };
        var _doSend = function(_callback,_xid){
            _callback();
            _count = 60;
            _doCountDown(_xid);
            _timer = window.setInterval(
                    _doCountDown._$bind(this,_xid),1000);
        };
    	var _doResendCaptcha = function(_id,_callback,_check,_event){
    		var _btn = _v._$getElement(_event),
    		    _value = _e._$get(_id).value;
    		if (_btn.disabled||!!_timer||
    		   !_p._$isMobileOK(_value)) return;
    		var _xid = _e._$id(_btn);
    		if (_u._$isFunction(_check)){
        		var _event = {
        		    btn:_xid,
        		    mobile:_value,
        		    donext:_doSend._$bind(
        		        null,_callback,_xid
        		    )
        		};
    		    _check(_event);
    		    if (_event.stopped) return;
    		}
    		_doSend(_callback,_xid);
    	};
    	return function(_captcha,_mobile,_callback,_check){
    		var _id = _e._$id(_mobile);
    		_v._$addEvent(
    		    _captcha,'click',
    			_doResendCaptcha._$bind(
    			    null,_id,_callback,_check
    			)
	        );
	    };
    })();
    /**
     * 
     */
    _p._$bindSearch = (function(){
        var _onClick = function(_id,_onok,_event){
            (_onok||_f)(_e._$get(_id).value);
        };
        var _onEnter = function(_id,_onok,_event){
            if (_event.keyCode==13){
                _v._$stop(_event);
                _onClick(_id,_onok);
            }
        };
        var _onChange = function(_id,_onchange,_event){
            (_onchange||_f)(_e._$get(_id).value);
        };
        return function(_input,_button,_options){
            var _onok = _options,
                _onchange;
            if (!_u._$isFunction(_onok)){
                _options = _options||_o;
                _onok = _options.onok||_f;
                _onchange = _options.onchange;
            }
            var _id = _e._$id(_input);
            _v._$addEvent(
                _input,'keypress',
                _onEnter._$bind(null,_id,_onok)
            );
            _v._$addEvent(
                _button,'click',
                _onClick._$bind(null,_id,_onok)
            );
            if (!!_onchange){
                _v._$addEvent(
                    _input,'input',
                    _onChange._$bind(null,_id,_onchange)
                );
            }
        };
    })();
    /**
     * 
     * @param {Object} _event
     */
    _p._$showLoading = function(_event){
        _event.value = '<p class="w-loading">&nbsp;</p>';
    };
    /**
     * 验证邀请
     */
    _p._$checkInvite = function(_event,_element){
        var _user = (_j._$cookie('MU_IU')||'').replace(/"/g,'');
        if (!_user) return;
        _v._$stop(_event);
        _element = _e._$get(_element);
        var _target = encodeURIComponent(
                _e._$dataset(_element,'target')
            ),
            _type = _user.indexOf('@')<0?'phone':'email';
        _j._$request('/rest/user/check',{
            type:'json',method:'GET',
            query:{username:_user},
            onload:function(_json){
                if (_json.code==1){
                    // user exist
                    location.href = '/login/?target='+_target;
                }else{
                    // user not exist
                    location.href = '/regist/?target='+_target+'#/'+_type+'/';
                }
            },
            onerror:function(_json){
                location.href = '/regist/?target='+_target+'#/'+_type+'/';
            }
        });
    };
    /**
     * 滚到顶部
     * @return {Void}
     */
    _p._$bindScrollTop = (function(){
        var _offset = 0,
            _element;
        var _doCheckPosition = function(){
            var _top = _e._$getPageBox().scrollTop;
            _e._$setStyle(
                _element,'visibility',
                _top>_offset?'':'hidden'
            );
        };
        var _doScrollTop = function(){
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        };
        return function(_node,_delta){
            _offset = _delta||0;
            _element = _e._$id(_node);
            _v._$addEvent(
                window,'scroll',
                _doCheckPosition._$bind(this)
            );
            _v._$addEvent(
                _element,'click',
                _doScrollTop._$bind(this)
            );
            _doCheckPosition();
        };
    })();
};
define('{com}util/api.js',
      ['{lib}base/util.js'
      ,'{lib}util/template/tpl.js'
      ,'{lib}util/cache/cookie.js'
      ,'{lib}util/ajax/xdr.js'],f);
