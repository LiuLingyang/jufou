var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _r = NEJ.R,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _u = _('nej.u'),
        _y = _('nej.ui'),
        _x = _('nej.ut'),
        _z = _('mu.x'),
        _t = _('mu.ut'),
        _w = _('mu.w.w'),
        _p = _('mu.m.u'),
        _proModuleSettingProfile,
        _supModuleSettingProfile;
    /**
     * 组织模块基类
     * 
     * 
     */
    _p._$$ModuleSettingProfile = NEJ.C();
      _proModuleSettingProfile = _p._$$ModuleSettingProfile._$extend(_p._$$ModuleSettingCommon);
      _supModuleSettingProfile = _p._$$ModuleSettingProfile._$supro;
    /**
     * 
     */
    _proModuleSettingProfile.__reset = function(_options){
        this.__supReset(_options);
        this.__copt.user = window.data.user;
        this.__cache = _t._$$CacheUser._$allocate(this.__copt);
        this.__cache._$getSNSList();
    };
    /**
     * 控件初始化
     * @return {Void}
     */
    _proModuleSettingProfile.__doBuild = function(){
        this.__mkey = 'txt-mdl-profile';
        _supModuleSettingProfile.__doBuild.call(this);
        // 0 - portrait
        // 1 - profile
        // 2 - security
        var _list = _e._$getByClassName(this.__body,'js-blag');
        // init portrait
        var _xlist = _e._$getByClassName(_list[0],'js-flag');
        this.__nimg = _xlist[0];
        this.__nldg = _xlist[1];
        this.__ntip = _xlist[4];
        _e._$file(_xlist[2],{
            onchange:this.__onSelectPortrait._$bind(this)
        });
        _v._$addEvent(
            _xlist[3],'click',
            this.__onUploadPortrait._$bind(this)
        );
        this.__oopt = {
            clazz:'w-win-e w-win-f',
            title:'头像裁剪',
            size:{
                width:100,
                height:100
            },
            onok:this.__onPortraitClip._$bind(this)
        };
        // init profile
        this.__xxy = _e._$getByClassName(_list[1],'js-xxy');
        _v._$addEvent(
            _e._$getByClassName(_list[1],'js-flag')[0],
            'click',this.__doUpdateProfile._$bind(this)
        );
        this.__popt = {
            onok:this.__onUpdateProfile._$bind(this)
        };
        // init security
        var _xlist = _e._$getByClassName(_list[2],'js-flag');
        _v._$addEvent(
            _xlist[0],'click',
            this.__doUpdatePassword._$bind(this)
        );
        this.__wopt = {
            onok:this.__onUpdatePassword._$bind(this)
        };
        
        _v._$addEvent(
            _xlist[1],'click',
            this.__doSendAuthEmail._$bind(this)
        );
        _v._$addEvent(
            _xlist[2],'click',
            this.__doBindMobile._$bind(this)
        );
        var _ylist = _e._$getByClassName(_list[2],'js-flxg');
        this.__nmob = _ylist[0];
        // init sns
        var _xlist = _e._$getByClassName(_list[3],'js-flxg');
        this.__nsns = {
            sina:_xlist[0],
            renren:_xlist[1]
        };
        _v._$addEvent(
            _list[3],'click',
            this.__doBindSNS._$bind(this)
        );
        window.onsnsbind = this.__cbSNSBinding._$bind(this);
        // init option
        this.__mopt = {
            onok:this.__onBindMobile._$bind(this),
            oncaptcha:this.__onResendCaptcha._$bind(this)
        };
        this.__copt = {
            oninfoupdate:this.__cbUpdateProfile._$bind(this),
            onportraitupdate:this.__cbUploadPortrait._$bind(this),
            onportraitclip:this.__cbPortraitClip._$bind(this),
            onpasswordupdate:this.__cbUpdatePassword._$bind(this),
            onresendemail:this.__cbSendAuthEmail._$bind(this),
            onmobileupdate:this.__cbUpdateMobile._$bind(this),
            onsnsload:this.__cbSNSListLoad._$bind(this),
            ondeletebinding:this.__cbDeleteBinding._$bind(this)
        };
    };
    /**
     * 
     * @param {Object} _event
     */
    _proModuleSettingProfile.__onSelectPortrait = function(_event){
        this.__xform = _event.form;
        _e._$get(_event.id).name = 'portrait';
        _e._$setStyle(this.__ntip,'display','');
    };
    /**
     * 
     */
    _proModuleSettingProfile.__onUploadPortrait = function(){
        if (!this.__xform){
            _z._$showError('请先选择图片');
            return;
        }
        _e._$setStyle(this.__nldg,'display','');
        this.__cache._$updatePortrait(this.__xform);
    };
    /**
     * 
     */
    _proModuleSettingProfile.__cbUploadPortrait = function(_json){
        //this.__xform.reset();
        _e._$setStyle(this.__nldg,'display','none');
        _e._$setStyle(this.__ntip,'display','none');
        switch(_json.code){
            case 1:
                var _img = _json.result.portrait+'?'+(+new Date);
                this.__nimg.src = _img;
                _e._$get('www-jufou-com-portrait').src = _img;
                this.__oopt.url = _img;
                _w._$$ImageClipper._$allocate(this.__oopt)._$show();
            return;
            case -4:
                _z._$showError('上传文件过大！');
            return;
            case -5:
                _z._$showError('文件格式不对！');
            return;
            default:
                _z._$showError('暂时无法上传文件，请稍后再试！');
            return;
        }
    };
    /**
     * 
     */
    _proModuleSettingProfile.__onPortraitClip = function(_event){
        var _clip = _event.clip,
            _ratio = _clip.scale;
        this.__cache._$clipPortrait({
            top:Math.floor(_clip.top/_ratio),
            left:Math.floor(_clip.left/_ratio),
            width:Math.floor(_clip.width/_ratio),
            height:Math.floor(_clip.height/_ratio)
        });
    };
    /**
     * 
     */
    _proModuleSettingProfile.__cbPortraitClip = function(_json){
        switch(_json.code){
            case 1:
                var _img = _json.result.portrait+'?'+(+new Date);
                this.__nimg.src = _img;
                _e._$get('www-jufou-com-portrait').src = _img;
            return;
            // TODO error
        }
    };
    /**
     * 
     * @param {Object} _event
     */
    _proModuleSettingProfile.__doUpdateProfile = function(_event){
        _v._$stop(_event);
        this.__popt.data = this.__cache._$getUserInCache();
        _w._$$WindowPersonal._$allocate(this.__popt)._$show();
    };
    /**
     * 
     * @param {Object} _event
     */
    _proModuleSettingProfile.__onUpdateProfile = function(_event){
        this.__cache._$updateInfo(_event.data);
    };
    /**
     * 
     * @param {Object} _event
     */
    _proModuleSettingProfile.__cbUpdateProfile = function(_json){
        if (_json.code<=0){
            _z._$showError('暂时无法更新信息，请稍候再试！');
            return;
        }
        var _user = this.__cache._$getUserInCache();
        this.__xxy[0].innerText = _user.nickname;
        this.__xxy[1].innerText = ["男","女"][_user.gender]||'男';
        this.__xxy[2].innerText = _u._$format(_user.birthday,'yyyy-MM-dd');
        this.__xxy[3].innerText = (_user.province||'')+(_user.city||'')+(_user.area||'');
        this.__xxy[4].innerText = _user.bio||'';
    };
    /**
     * 
     * @param {Object} _event
     */
    _proModuleSettingProfile.__doUpdatePassword = function(_event){
        _v._$stop(_event);
        this.__pwin = _w._$$WindowPassword._$allocate(this.__wopt);
        this.__pwin._$show();
    };
    /**
     * 
     * @param {Object} _event
     */
    _proModuleSettingProfile.__onUpdatePassword = function(_event){
        _event.stopped = !0;
        this.__cache._$updatePassword(_event.data);
    };
    /**
     * 
     */
    _proModuleSettingProfile.__cbUpdatePassword = function(_json){
        switch(_json.code){
            case 1:
                this.__pwin._$hide();
                _z._$showSuccess('密码修改成功！');
            return;
            case -106:
                this.__pwin._$showError('password2','原始密码错误');
            return;
            default:
                _z._$showError('暂时无法修改密码，请稍候再试！');
            return;
        }
    };
    /**
     * 
     * @param {Object} _event
     */
    _proModuleSettingProfile.__doSendAuthEmail = function(_event){
        _v._$stop(_event);
        this.__cache._$sendEmail();
    };
    /**
     * 
     */
    _proModuleSettingProfile.__cbSendAuthEmail = function(_event){
        location.href = '/activate/';
    };
    /**
     * 
     * @param {Object} _event
     */
    _proModuleSettingProfile.__doBindMobile = function(_event){
        _v._$stop(_event);
        //_w._$$WindowMobile._$allocate(this.__mopt)._$show();
        if(!!this.__window)
            this.__window._$recycle();
        this.__window = _w._$$WindowMobile._$allocate(this.__mopt);
        this.__window._$show();
    };
    /**
     * 
     * @param {Object} _event
     */
    _proModuleSettingProfile.__onBindMobile = function(_event){
        _event.stopped = true; 
        this.__cache._$updateMobile(_event.data);
    };
    /**
     * 
     */
    _proModuleSettingProfile.__onResendCaptcha = function(_mobile){
    	this.__cache._$sendCaptcha(_mobile);
    };
    /**
     * 
     * @param {Object} _json
     */
    _proModuleSettingProfile.__cbUpdateMobile = function(_json){
    	switch(_json.code){
            case  1:
                this.__nmob.innerText = _json.result;
                this.__window = this.__window._$recycle();
            return;
            case -2:
                this.__window._$showError('captcha','验证码错误');
            return;
            case -104:
                this.__window._$showError('mobile','手机号码已被其他账号绑定');
            return;
            default:
                _z._$showError('暂时无法更新手机号码，请稍候再试！');
        }  
    };
    /**
     * sns绑定行为
     * @param {Object} _event
     */
    _proModuleSettingProfile.__cbSNSListLoad = function(_json){
        var _xxx = {1:'sina',2:'tencent',3:'renren'};
        var _map = _u._$array2object(
            _json.result||_r,function(_item){
                return _xxx[_item.type];
            }
        );
        _u._$forIn(this.__nsns,function(_parent,_type){
            var _bind = _map[_type];
            _e._$renderHtmlTemplate(
                _parent,'jst-profile-bind-action',{
                    sns:_bind,
                    type:_type
                }
            );
        });
    };
    /**
     * sns绑定行为
     * @param {Object} _event
     */
    _proModuleSettingProfile.__doBindSNS = function(_event){
        var _node = _v._$getElement(_event,'d:action');
        if (!_node) return;
        _v._$stop(_event);
        var _type = _e._$dataset(_node,'type');
        switch(_e._$dataset(_node,'action')){
            case 'bind':
                this.__bwin = _w._$$WindowSNSBinding._$allocate({
                    type:_type
                });
                this.__bwin._$show();
            break;
            case 'cancel':
                var _xxx = {'sina':1,'tencent':2,'renren':3};
                this.__cache._$deleteBinding(_xxx[_type]);
            break;
        }
    };
    /**
     * 
     * @param {Object} _info
     */
    _proModuleSettingProfile.__cbSNSBinding = function(_info){
        if (!!this.__bwin){
            this.__bwin._$recycle();
            delete this.__bwin;
        }
        if (!!_info.token){
            var _type = _info.type;
            _e._$renderHtmlTemplate(
                this.__nsns[_type],'jst-profile-bind-action',{
                    sns:_info,
                    type:_type
                }
            );
        }
    };
    /**
     * 
     * @param {Object} _json
     */
    _proModuleSettingProfile.__cbDeleteBinding = function(_type,_json){
        switch(_json.code){
            case 1:
                _e._$renderHtmlTemplate(
                    this.__nsns[_type],'jst-profile-bind-action',{
                        sns:null,
                        type:_type
                    }
                );
            return;
            default:
                _z._$showError('暂时无法解除绑定，请稍候再试！');
            return;
        }
    };
};
define('{pro}module/user/setting/profile.js',
      ['{pro}module/user/setting/common.js'
      ,'{pro}widget/window/password.update.js'
      ,'{pro}widget/window/personal.update.js'
      ,'{pro}widget/window/mobile.bind.js'
      ,'{pro}widget/window/image.clipper.js'
      ,'{pro}widget/window/sns.binding.js'
      ,'{com}util/cache/user.js'
      ,'{lib}util/file/select.js'],f);
