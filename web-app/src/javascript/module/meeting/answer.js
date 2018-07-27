var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _f = NEJ.F,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _x = _('nej.ut'),
        _y = _('mu.x'),
        _t = _('mu.ut'),
        _p = _('mu.m.g'),
        _proModuleMeetingAnswer;
    /**
     * 组织相册模块
     * 
     */
    _p._$$ModuleMeetingAnswer = NEJ.C();
      _proModuleMeetingAnswer = _p._$$ModuleMeetingAnswer._$extend(_p._$$ModuleGroup);
    /**
     * 控件重置
     * 
     */
    _proModuleMeetingAnswer.__reset = function(_options){
        this.__supReset(_options);
        this.__meeting = _options.meeting||_o;
        this.__mopt.cache.data.mid = this.__meeting.id;
        this.__mopt.item.questions = this.__meeting.questions;
        this.__lmdl = _x._$$ListModulePG._$allocate(this.__mopt);
    };
    /**
     * 构建模块
     * @return {Void}
     */
    _proModuleMeetingAnswer.__doBuild = function(){
        var _list = _e._$getByClassName('module-s0','js-flag');
        this.__mopt = {
            limit:10,
            parent:_list[0],
            item:{klass:'jst-answer-list'},
            pager:{parent:_list[1]},
            cache:{klass:_t._$$CacheMeeting,lkey:'user-answer',data:{type:0,order:'desc'}},
            onbeforelistload:_y._$showLoading,
            onemptylist:function(_event){
                _event.value = '活动没有参与者';
            }
        };
    };
    
};
define('{pro}module/meeting/answer.js',
      ['{pro}module/common/group.js'
      ,'{com}util/cache/meeting.js'
      ,'{lib}util/list/module.pager.js'],f);
