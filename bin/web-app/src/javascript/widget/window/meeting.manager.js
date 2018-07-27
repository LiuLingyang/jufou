var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _u = _('nej.u'),
        _i = _('nej.ui'),
        _p = _('mu.w.w'),
        _proCardMeetingManager;
    // html code
    var _seed_html = _e._$addNodeTemplate('\
        <a class="mix" href="#" data-action="0">回复状态编辑</a>\
        <a class="mix" href="#" data-action="1">查看用户问题回复</a>\
        <a class="mix" href="#" data-action="2">停止回复</a>\
        <a class="mix" href="#" data-action="3">打印参加者名单</a>\
        <a class="mix" href="#" data-action="4">群通知参加者</a>');
    /**
     * 窗体控件基类
     * 
     */
    _p._$$CardMeetingManager = NEJ.C();
      _proCardMeetingManager = _p._$$CardMeetingManager._$extend(_i._$$CardWrapper);
    /**
     * 控件重置
     */
    _proCardMeetingManager.__reset = function(_options){
        _options.clazz = 'w-crd-1';
        this.__supReset(_options);
    };
    /**
     * 初始化外观
     */
    _proCardMeetingManager.__initXGui = function(){
        this.__seed_html = _seed_html;
    };
    /**
     * 
     */
    _proCardMeetingManager.__initNode = function(){
        this.__supInitNode();
        _v._$addEvent(
            this.__body,'click',
            this.__onAction._$bind(this)
        );
    };
    /**
     * 
     */
    _proCardMeetingManager.__onAction = function(_event){
        var _node = _v._$getElement(_event,'d:action');
        if (!_node) return;
        var _event = {type:_e._$dataset(_node,'action')};
        this._$dispatchEvent('onaction',_event);
        this._$hide();
    };
};
define('{pro}widget/window/meeting.manager.js',
      ['{lib}ui/layer/card.wrapper.js'],f);
