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
        _proModuleMessageMeeting,
        _supModuleMessageMeeting;
    /**
     * 组织模块基类
     * 
     * 
     */
    _p._$$ModuleMessageMeeting = NEJ.C();
      _proModuleMessageMeeting = _p._$$ModuleMessageMeeting._$extend(_p._$$ModuleMessageList);
      _supModuleMessageMeeting = _p._$$ModuleMessageMeeting._$supro;
    /**
     * 
     */
    _proModuleMessageMeeting.__doBuild = function(){
        this.__mkey = 'txt-mdl-meeting';
        this.__skey = 'jst-list-meeting';
        this.__data = {type:1};
        _supModuleMessageMeeting.__doBuild.call(this);
    };
};
define('{pro}module/user/message/meeting.js',
      ['{pro}module/user/message/list.js'],f);
