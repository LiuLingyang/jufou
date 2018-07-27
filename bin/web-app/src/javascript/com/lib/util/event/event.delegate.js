/**
 * ------------------------------------------
 * 事件驱动模型实现文件
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 * ------------------------------------------
 */
var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _r = NEJ.R,
        _f = NEJ.F,
        _u = _('nej.u'),
        _p = _('nej.ut'),
        _proEventDelegate;
	if(!!nej.ut._$$EventDelegate)
		return;
    /**
     * 事件代理对象
     * @class 事件代理对象
     * @param {Object} _options 可选配置参数，已处理参数列表如下
     *                          cache [Object] - 事件缓存对象，默认自动生成
     */
    _p._$$EventDelegate = NEJ.C();
      _proEventDelegate = _p._$$EventDelegate.prototype;
    /**
     * 控件初始化
     * @param  {Object} _options 可选配置参数
     * @return {Void}
     */
    _proEventDelegate.__init = function(_options){
        this.__events = (_options||_o).cache||{};
    };
    /**
     * 判断是否有注册事件
     * @param  {String} _type 事件类型
     * @return {Boolean}      是否有事件
     */
    _proEventDelegate._$hasEvent = function(_type){
        var _event = this.__events[
                    _type.toLowerCase()];
        return !!_event&&_event!==_f;
    };
    /**
     * 重置事件，覆盖原有事件
     * @param  {String}   _type  事件类型
     * @param  {Function} _event 事件处理函数
     * @return {Void}
     */
    _proEventDelegate._$setEvent = function(_type,_event){
        if (!_type||!_u._$isFunction(_event)) return;
        this.__events[_type.toLowerCase()] = _event;
    };
    /**
     * 批量添加事件
     * @param  {Object} _events 事件集合
     * @return {Void}
     */
    _proEventDelegate._$batEvent = function(_events){
        if (!_events) return;
        for(var x in _events)
            this._$setEvent(x,_events[x]);
    };
    /**
     * 清除事件，没有指定类型则清除所有事件
     * @param  {String} _type 事件类型
     * @return {Void}
     */
    _proEventDelegate._$clearEvent = function(_type){
        var _type = (_type||'').toLowerCase();
        if (!!_type){
            delete this.__events[_type];
            return;
        }
        for(var x in this.__events)
            this._$clearEvent(x);
    };
    /**
     * 追加事件
     * @param  {String}   _type  事件类型
     * @param  {Function} _event 事件处理函数
     * @return {Void}
     */
    _proEventDelegate._$appendEvent = function(_type,_event){
        if (!_type||!_u._$isFunction(_event)) return;
        _type = _type.toLowerCase();
        var _events = this.__events[_type];
        if (!_events){
            this.__events[_type] = _event;
            return;
        }
        if (!_u._$isArray(_events)){
            this.__events[_type] = [_events];
        }
        this.__events[_type].push(_event);
    };
    /**
     * 调用事件
     * @param  {String}   _type 事件类型，不区分大小写
     * @param  {Variable} [arg0[,arg1...]] 事件可接受参数
     * @return {Void}
     */
    _proEventDelegate._$dispatchEvent = function(_type,_this){
        var _event = this.__events[(_type||'').toLowerCase()];
        if (!_event) return;
        var _args = _r.slice.call(arguments,2);
        if (!_u._$isArray(_event))
            return _event.apply(this,_args);
        for(var i=0,l=_event.length;i<l;i++)
            try{_event[i].apply(_this,_args)}catch(ex){}
    };
};
define('{lib}util/event/event.delegate.js',
      ['{lib}base/util.js'],f);