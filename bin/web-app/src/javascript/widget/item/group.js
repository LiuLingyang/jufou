/**
 * ------------------------------------------
 * 日期选择控件实现文件
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 * ------------------------------------------
 */
var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _u = _('nej.u'),
        _i = _('mu.ui'),
        _w = _('mu.w.w'),
        _p = _('mu.w.i'),
        _proItemGroup;
    /**
     * 评论列表项
     * @class   评论列表项
     * @extends {nej.ui._$$Item}
     * @param   {Object} _options 可选配置参数，已处理参数列表如下
     *                            
     */
    _p._$$ItemGroup = NEJ.C();
      _proItemGroup = _p._$$ItemGroup._$extend(_p._$$Item);
    /**
     * 
     */
    _proItemGroup.__init = function(){
        this.__gopt = {
            onaction:this.__onAction._$bind(this),
            onbeforeclick:this.__onBeforeClick._$bind(this)
        };
        this.__supInit();
    };
    /**
     * 
     */
    _proItemGroup.__reset = function(_options){
        this.__supReset(_options);
        this.__host = _options.host;
        this.__relation = _options.relation;
    };
    /**
     * 初始化模版
     */
    _proItemGroup.__initXGui = function() {
        this.__seed_html = 'ntp-group-item';
    };
    /**
     * 初始化节点
     */
    _proItemGroup.__initNode = function(){
        this.__supInitNode();
        // 0 - group img href
        // 1 - group logo      
        // 2 - group name
        // 3 - group address
        // 4 - group member count
        // 5 - group meeting count
        // 6 - setting button
        var _list = _e._$getByClassName(this.__body,'js-flag');
        this.__nhref = _list[0];
        this.__nlogo = _list[1];
        this.__nname = _list[2];
        this.__naddr = _list[3];
        this.__nmcnt = _list[4];
        this.__nmetn = _list[5];
        _w._$$CardGroupAction._$attach(_list[6],this.__gopt);
    };
    /**
     * 刷新项,子类实现具体逻辑
     * @protected
     * @method {__doRefresh}
     * @return {Void}
     */
    _proItemGroup.__doRefresh = function(_data){
    	this.__nhref.href = '/'+_data.homepage+'/';
        this.__nlogo.src = _data.thumbnail||config.url.logo;        
        this.__nname.innerText = _data.name||'组织名称';
        this.__nname.href = '/'+_data.homepage+'/';
        this.__naddr.innerText = _data.province+_data.city;
        this.__nmcnt.innerText = (_data.memberCount||0)+'名'+'会员';
        this.__nmetn.innerText = '已举办活动：'+(_data.meetingCount||0)+'次';
    };
    /**
     * 
     * @param {Object} _event
     */
    _proItemGroup.__onAction = function(_event){
        // TODO
    };
    /**
     * 
     * @param {Object} _event
     */
    _proItemGroup.__onBeforeClick = function(_event){
        _event.host = this.__host;
        _event.group = this.__data;
        _event.relation = this.__relation;
    };
};
define('{pro}widget/item/group.js',
      ['{pro}widget/item/item.js'
      ,'{pro}widget/window/group.action.js'],f);