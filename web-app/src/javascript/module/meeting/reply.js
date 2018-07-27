var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _f = NEJ.F,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _x = _('nej.ut'),
        _z = _('mu.x'),
        _t = _('mu.ut'),
        _p = _('mu.m.g'),
        _proModuleMeetingReply;
    /**
     * 组织相册模块
     * 
     */
    _p._$$ModuleMeetingReply = NEJ.C();
      _proModuleMeetingReply = _p._$$ModuleMeetingReply._$extend(_p._$$ModuleGroup);
    /**
     * 控件重置
     * 
     */
    _proModuleMeetingReply.__reset = function(_options){
        this.__supReset(_options);
        this.__meeting = _options.meeting||_o;
    };
    /**
     * 构建模块
     * @return {Void}
     */
    _proModuleMeetingReply.__doBuild = function(){
        this.__body = _e._$get('module-j0').parentNode;
        _v._$addEvent(
            this.__body['btn-ok'],'click',
            this.__onSubmit._$bind(this)
        );
        this.__form = _t._$$WebForm._$allocate({
            form:this.__body
        });
        this.__cache = _t._$$CacheMeeting._$allocate({
            onmeetinganswer:this.__cbSubmit._$bind(this)
        });
    };
    /**
     * 
     */
    _proModuleMeetingReply.__onSubmit = function(){
        if (this.__form._$checkValidity()){
            var _data = this.__form._$data();
            this.__cache._$answer({
                mid:this.__meeting.id,
                answer:JSON.stringify(_data)
            });
        }
    };
    /**
     * 
     */
    _proModuleMeetingReply.__cbSubmit = function(_json){
        if (_json.code!=1){
            _z._$showError('暂时无法回答问题，请稍候再试！');
            return;
        };
        location.href = config.page('/meeting/'+this.__meeting.id+'/');
    };
};
define('{pro}module/meeting/reply.js',
      ['{pro}module/common/group.js'
      ,'{com}util/cache/meeting.js'
      ,'{com}util/form/form.js'],f);
