var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _u = _('nej.u'),
        _j = _('nej.j'),
        _p = _('mu.ut'),
        _proCacheEvent;
    /**
     * 动态缓存对象
     * 
     * @class   {mu.ut._$$CacheEvent}
     * @extends {mu.ut._$$Cache}
     * @param   {Object} 配置信息
     * 
     * [hr]
     * 创建组织回调
     * @event   {ongroupcreate}
     * @param   {Object} 创建后的组织信息
     * 
     * [hr]
     * 更新组织回调
     * @event   {ongroupupdate}
     * @param   {Object} 更新后的组织信息
     * 
     * [hr]
     * 删除组织回调
     * @event   {ongroupdelete}
     * @param   {Object} 
     * 
     * [hr]
     * 推荐标签列表载入回调
     * @event   {onrectagload}
     * @param   {Object} 
     * 
     * [hr]
     * 添加档案问题回调
     * @event   {onquestionadd}
     * @param   {Object} 
     * 
     * [hr]
     * 更新档案问题回调
     * @event   {onquestionupdate}
     * @param   {Object} 
     * 
     * [hr]
     * 删除档案问题回调
     * @event   {onquestiondelete}
     * @param   {Object} 
     * 
     * [hr]
     * 更新档案设置回调
     * @event   {onjoinsettingupdate}
     * @param   {Object} 
     * 
     * 
     */
    _p._$$CacheEvent = NEJ.C();
      _proCacheEvent = _p._$$CacheEvent._$extend(_p._$$Cache);
    
    /**
     * 
     * @param {Object} _options
     */
    _proCacheEvent.__doLoadList = function(_options){
        var _key = _options.key;
        _j._$request('/rest/open/event/list',{
            method:'POST',
            type:'json',
            data:_u._$object2query(_options.data),
            onload:this.__cbListLoad._$bind(this,_key,_options.onload),
            onerror:this.__cbListLoad._$bind(this,_key,_options.onload,_o)
        });
    };
    /**
     * 动态轮询
     * @return {Void}
     */
    _proCacheEvent._$polling = (function(){
        var _start = +new Date
            _end = +new Date(_start-2*24*60*60*1000);
        return function(){
            _start = +new Date;
            _j._$request('/rest/open/event/recent',{
                method:'GET',
                type:'json',
                query:'startTime='+_start+'&endTime='+_end+'&type=1',
                onload:this.__polling._$bind(this),
                onerror:this.__polling._$bind(this,_o)
            });
            _end = _start;
        };
    })();
    /**
     * 
     * @param {Object} _json
     */
    _proCacheEvent.__polling = function(_json){
    
        /* for test
        var _arr = [];
        for(var i=0;i<20;i++)
            _arr.push({body:'xxx加入了组织yyyyyyy'+i});
        // end test*/
    
        if (_json.code!=1) return;
        var _list = this.__getDataInCacheWithDefault('recent-list',[]);
        _u._$reverseEach(
            _json.result||_arr,function(_item){
                _list.unshift(_item);
            }
        );
        this.__setDataInCache('recent-list',_list);
        window.setTimeout(this._$polling._$bind(this),20000);
        this._$dispatchEvent('onevent');
    };
    /**
     * 取最新动态列表
     * @return {Array}
     */
    _proCacheEvent._$getRecentEventsInCache = function(){
        return this.__getDataInCacheWithDefault('recent-list',[]);
    };
};
define('{com}util/cache/event.js',
      ['{com}util/cache/cache.js'],f);
