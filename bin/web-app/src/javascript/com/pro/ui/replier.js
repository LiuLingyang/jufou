var f = function(){
    var _  = NEJ.P,
        _f = NEJ.F,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _i = _('nej.ui'),
        _t = _('mu.ut'),
        _p = _('mu.ui'),
        _proReplier;
    /**
     * 窗体控件基类
     * 
     */
    _p._$$Replier = NEJ.C();
      _proReplier = _p._$$Replier._$extend(_i._$$Abstract);
    /**
     * 控件重置
     */
    _proReplier.__reset = function(_options){
        this.__supReset(_options);
        this.__rfom._$reset();
        this.__rfom._$setValue('content',_options.content||'');
    };
    /**
     * 
     */
    _proReplier.__initXGui = function(){
        this.__seed_html = 'ntp-comment-reply';
    };
    /**
     * 
     */
    _proReplier.__initNode = function(){
        this.__supInitNode();
        // 0 - reply content
        // 1 - reply button
        // 2 - cancel button
        var _list = _e._$getByClassName(this.__body,'js-flag');
        _v._$addEvent(this.__body['btn-ok'],'click',this.__onReply._$bind(this));
        _v._$addEvent(_list[0],'click',this.__onCancel._$bind(this));
        this.__rfom = _t._$$WebForm._$allocate({
            form:this.__body,
            'content-4':'回复内容最多可输入500个字符或者250个汉字'
        });
    };
    /**
     * 
     */
    _proReplier.__onReply = function(){
        if (!this.__rfom._$checkValidity()) return;
        this._$dispatchEvent('onreply',this.__rfom._$data());
    };
    /**
     * 
 	 * @param {Object} _event
     */
    _proReplier.__onCancel = function(_event){
    	_v._$stop(_event);
    	this._$dispatchEvent('oncancel');
    };
};
define('{com}ui/replier.js',
      ['{lib}ui/base.js'
      ,'{com}util/form/form.js'],f);
