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
        _p = _('mu.m.u'),
        _proModuleSettingMessage,
        _supModuleSettingMessage;
    /**
     * 组织模块基类
     * 
     * 
     */
    _p._$$ModuleSettingMessage = NEJ.C();
      _proModuleSettingMessage = _p._$$ModuleSettingMessage._$extend(_p._$$ModuleSettingCommon);
      _supModuleSettingMessage = _p._$$ModuleSettingMessage._$supro;
    /**
     * 
     */
    _proModuleSettingMessage.__reset = function(_options){
        this.__supReset(window.data);
        this.__mopt.cache.lkey = 'all-'+this.__host.id;
        this.__mopt.cache.data.uid = this.__host.id;
        this.__cache._$getMsgSetting(this.__host.id,'');
    };
    /**
     * 控件初始化
     * @return {Void}
     */
    _proModuleSettingMessage.__doBuild = function(){
        this.__mkey = 'txt-mdl-message';
        _supModuleSettingMessage.__doBuild.call(this);
        // 0 - default setting button
        // 1 - default setting box
        // 2 - list box
        // 3 - page box
        var _list = _e._$getByClassName(this.__body,'js-flag');
        _v._$addEvent(
            _list[0],'click',
            this.__doShowDefaultSettingForm._$bind(this)
        );
        this.__xprnt = _list[1];
        this.__mopt = {
            limit:10,
            parent:_list[2],
            item:{
                klass:_i._$$ItemSetting,
                onsetting:this.__doShowSettingForm._$bind(this),
                ondismiss:this.__doDismissGroup._$bind(this),
                onexit:this.__doExitGroup._$bind(this),
                onbeforerecycle:this.__onCancelSetting._$bind(this)
            },
            cache:{klass:_t._$$CacheGroup,data:{}},
            pager:{parent:_list[3],clazz:'w-pager'},
            onbeforelistload:function(_event){
                _event.value = '<p class="w-loading">&nbsp;</p>';
            },
            onemptylist:function(_event){
                _event.value = '<p class="w-message">没有数据！</p>';
            }
        };
        this.__wopt = {
            message:'确定要退出该组织么？',
            onok:this.__onExitGroup._$bind(this)
        };
        this.__vopt = {
            message:'确定要解散该组织么？',
            onok:this.__onDismissGroup._$bind(this)
        };
        this.__cache = _t._$$CacheGroup._$allocate({
            onexit:this.__cbExitGroup._$bind(this),
            ondismiss:this.__cbDismissGroup._$bind(this),
            onmsgsettingload:this.__cbMsgSettingLoad._$bind(this),
            onmsgsettingupdate:this.__cbMsgSettingUpdate._$bind(this)
        });
        var _form = _e._$html2node(
            _e._$getTextTemplate('txt-message-form')
        );
        _v._$addEvent(
            _form['btn-ok'],'click',
            this.__onUpdateSetting._$bind(this)
        );
        _v._$addEvent(
            _form['btn-cc'],'click',
            this.__onCancelSetting._$bind(this)
        );
        this.__msfrm = _t._$$WebForm._$allocate({
            form:_form
        });
    };
    /**
     * 
     */
    _proModuleSettingMessage.__doShowDefaultSettingForm = function(_event){
        _v._$stop(_event);
        this.__doShowSettingForm({
            data:{id:''},
            body:this.__xprnt
        });
    };
    /**
     * 
     */
    _proModuleSettingMessage.__doShowSettingForm = function(_event){
        this.__xevt = _event;
        this.__cache._$getMsgSetting(this.__host.id,_event.data.id);
    };
    /**
     * 
     * @param {Object} _key
     */
    _proModuleSettingMessage.__cbMsgSettingLoad = function(_key){
        if (!this.__lmdl){
            this.__lmdl = _x._$$ListModulePG._$allocate(this.__mopt);
            return;
        }
        var _ckey = this.__host.id+'-'+this.__xevt.data.id,
            _data = this.__cache._$getMsgSettingInCache(
                    this.__host.id,this.__xevt.data.id)||
                    this.__cache._$getMsgSettingInCache(this.__host.id,'');
        if (_ckey!=_key||!this.__xevt) return;
        _u._$forIn(_data,function(_value,_xkey){
            this.__msfrm._$setValue(_xkey,_value);
        },this);
        this.__msfrm._$setValue('gid',this.__xevt.data.id);
        this.__xevt.body.appendChild(this.__msfrm._$form());
        delete this.__xevt;
    };
    /**
     * 
     */
    _proModuleSettingMessage.__onUpdateSetting = function(){
        var _data = this.__msfrm._$data();
        this.__cache._$updateMsgSetting(this.__host.id,_data);
    };
    /**
     * 
     */
    _proModuleSettingMessage.__cbMsgSettingUpdate = function(_key){
        this.__onCancelSetting();
    };
    /**
     * 
     */
    _proModuleSettingMessage.__onCancelSetting = function(){
        _e._$removeByEC(this.__msfrm._$form());
    };
    /**
     * 
     * @param {Object} _event
     */
    _proModuleSettingMessage.__doDismissGroup = function(_event){
        this.__xdat = _event.data;
        _w._$$WindowConfirm._$allocate(this.__vopt)._$show();
    };
    /**
     * 
     */
    _proModuleSettingMessage.__onDismissGroup = function(_event){
        this.__cache._$dismiss(this.__xdat.id);
    };
    /**
     * 
     */
    _proModuleSettingMessage.__cbDismissGroup = function(_json){
        switch(_json.code){
            case 1:
                this.__cache._$clearListInCache(this.__mopt.cache.lkey);
                this.__lmdl._$refresh();
            break;
            default:
                _z._$showError('暂时无法解散组织，请稍候再试！');
            break;
        }
    };
    /**
     * 
     * @param {Object} _event
     */
    _proModuleSettingMessage.__doExitGroup = function(_event){
        this.__xdat = _event.data;
        _w._$$WindowConfirm._$allocate(this.__wopt)._$show();
    };
    /**
     * 
     * @param {Object} _event
     */
    _proModuleSettingMessage.__onExitGroup = function(_event){
        this.__cache._$exit(this.__xdat.id);
    };
    /**
     * 
     */
    _proModuleSettingMessage.__cbExitGroup = function(_json){
        switch(_json.code){
            case 1:
                this.__cache._$clearListInCache(this.__mopt.cache.lkey);
                this.__lmdl._$refresh();
            break;
            default:
                alert('暂时无法退出组织，请稍候再试！');
            break;
        }
    };
};
define('{pro}module/user/setting/message.js',
      ['{pro}module/user/setting/common.js'
      ,'{pro}widget/item/setting.js'
      ,'{pro}widget/window/confirm.js'
      ,'{com}util/cache/group.js'
      ,'{com}util/form/form.js'
      ,'{lib}util/list/module.pager.js'],f);
