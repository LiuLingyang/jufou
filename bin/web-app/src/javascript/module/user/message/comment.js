var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _u = _('nej.u'),
        _y = _('nej.ui'),
        _x = _('nej.ut'),
        _t = _('mu.ut'),
        _p = _('mu.m.u'),
        _proModuleMessageComment,
        _supModuleMessageComment;
    /**
     * 组织模块基类
     * 
     * 
     */
    _p._$$ModuleMessageComment = NEJ.C();
      _proModuleMessageComment = _p._$$ModuleMessageComment._$extend(_p._$$ModuleMessageList);
      _supModuleMessageComment = _p._$$ModuleMessageComment._$supro;
    /**
     * 
     */
    _proModuleMessageComment.__doBuild = function(){
        this.__mkey = 'txt-mdl-comment';
        this.__skey = 'jst-list-comment';
        this.__data = {type:2};
        _supModuleMessageComment.__doBuild.call(this);
    };
};
define('{pro}module/user/message/comment.js',
      ['{pro}module/user/message/list.js'],f);
