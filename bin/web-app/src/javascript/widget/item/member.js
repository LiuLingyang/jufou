/**
 * ------------------------------------------
 * 日期选择控件实现文件
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 * ------------------------------------------
 */
var f = function(){
    var _  = NEJ.P,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _u = _('nej.u'),
        _p = _('mu.w.i'),
        _proItemMember;
    /**
     * 成员列表项
     * @class   成员列表项
     * @extends {nej.ui._$$Item}
     * @param   {Object} _options 可选配置参数，已处理参数列表如下
     *                            
     */
    _p._$$ItemMember = NEJ.C();
      _proItemMember = _p._$$ItemMember._$extend(_p._$$Item);
    /**
     * 
     */
    _proItemMember.__reset = function(_options){
        this.__role = _options.role;
        this.__type = _options.type;
        this.__supReset(_options);
    };
    /**
     * 
     */
    _proItemMember.__destroy = function(){
        _e._$delClassName(this.__nrole,
            'js-role-'+this.__data.role);
        this.__supDestroy();
    };
    /**
     * 初始化模版
     */
    _proItemMember.__initXGui = function() {
        this.__seed_html = 'ntp-member-item';
    };
    /**
     * 初始化节点
     */
    _proItemMember.__initNode = function(){
        this.__supInitNode();
        // 0 - portrait image
        // 1 - action box
        // 2 - user name
        // 3 - user role
        // 4 - join time
        // 5 - user description
        var _list = _e._$getByClassName(this.__body,'js-xflag');
        this.__nface = _list[0];
        this.__nbtns = _list[1];
        this.__nname = _list[2];
        this.__nrole = _list[3];
        this.__njoin = _list[4];
        this.__ndesc = _list[5];
        _v._$addEvent(
            _list[1],'click',
            this.__onAction._$bind(this)
        );
    };
    /**
     * 刷新项,子类实现具体逻辑
     * @protected
     * @method {__doRefresh}
     * @return {Void}
     */
    _proItemMember.__doRefresh = (function(){
        var _roles = {
            1:'会员',
            2:'管理员',
            3:'创建者'
        };
        return function(_data){
            var _user = _data.attendee||_o;
            this.__nface.src = _user.thumbnail||config.url.portrait;
            this.__nname.innerText = _user.nickname;
            this.__nname.href = config.page('/member/'+_user.id+'/');
            _e._$setStyle(this.__nrole,'display',this.__type==0?'':'none');
            this.__nrole.innerText = _roles[_data.role]||'';
            _e._$addClassName(this.__nrole,'js-role-'+_data.role);
            this.__ndesc.innerText = _data.bio;
            this.__njoin.innerText = 
                (this.__type<2?'加入时间':'申请时间')+'：'+
                _u._$format(_data.attendTime,'yyyy年MM月dd日');
            this.__nbtns.innerHTML = _e._$getHtmlTemplate(
                'jst-member-action',{user_role:this.__role||_data.role}
            );
        };
    })();
    /**
     * 
     */
    _proItemMember.__onAction = function(_event){
        _v._$stop(_event);
        var _action = _e._$dataset(
                _v._$getElement(_event),'action');
        if (!!_action) 
            this._$dispatchEvent('onaction',{
                action:_action,
                data:this.__data
            });
    };
};
define('{pro}widget/item/member.js',
      ['{pro}widget/item/item.js'],f);