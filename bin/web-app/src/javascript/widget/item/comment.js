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
        _p = _('mu.w.i'),
        _proItemComment;
    /**
     * 评论列表项
     * @class   评论列表项
     * @extends {nej.ui._$$Item}
     * @param   {Object} _options 可选配置参数，已处理参数列表如下
     *                            
     */
    _p._$$ItemComment = NEJ.C();
      _proItemComment = _p._$$ItemComment._$extend(_p._$$Item);
    /**
     * Item回收
     * @return {Void}   
     */
    _proItemComment.__destroy = function(){
        this.__supDestroy();
        if (!!this.__replier){
            this.__replier = this.__replier._$recycle();
        }
        _e._$delClassName(this.__nbutn,this.__role);
        delete this.__role;
    };
    /**
     * 初始化模版
     */
    _proItemComment.__initXGui = function() {
        this.__seed_html = 'ntp-comment-item';
    };
    /**
     * 初始化节点
     */
    _proItemComment.__initNode = function(){
    	this.__supInitNode();
        // 0 - portrait
        // 1 - content
        // 2 - delete button
        // 3 - reply button
        // 4 - time box
        var _list = _e._$getByClassName(this.__body,'js-zflag');
        this.__nface = _list[0];
        this.__ncont = _list[1];
        this.__nbutn = _list[2].parentNode;
        this.__ntime = _list[4];
        _v._$addEvent(_list[2],'click',this.__doDelete._$bind(this));
        _v._$addEvent(_list[3],'click',this.__onReply._$bind(this));
        // init data
        this.__ropt = {
            parent:this.__body,
            onreply:this.__cbReply._$bind(this),
            oncancel:this.__cbCancel._$bind(this)
        };
    };
    /**
     * 刷新项,子类实现具体逻辑
     * @protected
     * @method {__doRefresh}
     * @return {Void}
     */
    _proItemComment.__doRefresh = (function(){
        // 
        var _doParseRole = function(_host,_user){
            if (!_host||!_host.id||_host.relationship==0)
                return 'js-role-2';
            if (_host.id==_user.id)
                 return 'js-role-1';            return 'js-role-0';
        };
        return function(_data){
            this.__nface.src = _data.poster.thumbnail||config.url.portrait;
            this.__ntime.innerText = _u._$format(_data.postTime,'yyyy年MM月dd日 HH:mm');
            _e._$renderHtmlTemplate(
                this.__ncont,
                'jst-comment-content',
                {xcmt:_data,group:this.__group}
            );
            var _role = _doParseRole(this.__host,_data.poster);
            _e._$replaceClassName(this.__nbutn,this.__role,_role);
            this.__role = _role;
        };
    })();
    /**
     * 回复评论
     * @param {Object} _event
     */
    _proItemComment.__onReply = function(_event){
    	_v._$stop(_event);
        this.__replier = _i._$$Replier
            ._$getInstanceWithReset(this.__ropt);
    };
    /**
     * 
     * @param {Object} _data
     */
    _proItemComment.__cbReply = function(_data){
        _data.pid = this.__data.id;
        this._$dispatchEvent('onreply',_data);
    };
    /**
     * 
     */
    _proItemComment.__cbCancel = function(){
    	if (!!this.__replier){
    		this.__replier._$recycle();
    		delete this.__replier;
    	}
    };
    /**
     * 
     * @param {Object} _event
     */
    _proItemComment.__doDelete = function(_event){
        _v._$stop(_event);
        this.__onDelete();
    };
};
define('{pro}widget/item/comment.js',
      ['{pro}widget/item/item.js'
      ,'{com}ui/replier.js'],f);