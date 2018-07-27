var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _u = _('nej.u'),
        _x = _('nej.ut'),
        _z = _('mu.x'),
        _t = _('mu.ut'),
        _p = _('mu.m.g'),
        _proModuleIndex;
    /**
     * 组织模块基类
     * 
     * 
     */
    _p._$$ModuleIndex = NEJ.C();
      _proModuleIndex = _p._$$ModuleIndex._$extend(_t._$$Module);
    /**
     * 
     */
    _proModuleIndex.__reset = function(_options){
        this.__supReset(_options);
        _x._$$RegionSelector._$allocate({
            province:this.__form.province,
            city:this.__form.city,
            area:this.__form.area,
            data:this.__iptable
        });
        //this.__lmdl = _x._$$ListModuleWF._$allocate(this.__mopt);
        this.__cache._$polling();
    };
    /**
     * 控件初始化
     * @return {Void}
     */
    _proModuleIndex.__doBuild = function(){
        var _node = _e._$get('module-z0');
        this.__form = _node.getElementsByTagName('form')[0];
        _v._$addEvent(
        	this.__form['btn-ok'],'click',
        	this.__onSearch._$bind(this)
        );
        _v._$addEvent(
        	this.__form,'keypress',
        	this.__onEnter._$bind(this)
        );
        this.__eprnt = _e._$getByClassName('module-z1','j-flag')[0];
        this.__cache = _t._$$CacheEvent._$allocate({
            onevent:this.__cbEvent._$bind(this)
        });
        /*
        this.__mopt = {
            limit:10,
            item:'event-list',
            parent:,
            cache:{klass:_t._$$CacheEvent,lkey:'recent-list',data:{}},
            onbeforelistload:_z._$showLoading,
            onemptylist:function(_event){
                _event.value = '<div class="w-message">没有动态</div>';
            }
        };
        */
    };
    /**
     * 
     */
    _proModuleIndex.__onSearch = function(){
    	var _arr = [],
    	    _key = this.__form.key.value.trim();
    	if (!!_key){
    		_arr.push('k='+encodeURIComponent(_key));
    	}
    	var _value = this.__form.province.value;
    	if (!!_value){
    	    _arr.push('p='+encodeURIComponent(_value));
    	}
    	var _value = this.__form.city.value;
    	if (!!_value){
    	    _arr.push('c='+encodeURIComponent(_value));
    	}
    	var _value = this.__form.area.value;
    	if (!!_value){
    	    _arr.push('a='+encodeURIComponent(_value));
    	}
    	var _value = _arr.join('&').trim();
    	location.href = '/search/'+(!_value?'':('?'+_value));
    };
    /**
     * 
     */
    _proModuleIndex.__onEnter = function(_event){
    	if (_event.keyCode==13) this.__onSearch();
    };
    /**
     * 
     * @param {Object} _json
     */
    _proModuleIndex.__cbEvent = function(){
        if (!!this.__timer) return;
        var _list = this.__cache._$getRecentEventsInCache(),
            _length = _list.length,
            _beg = Math.max(0,_length-5);
        this.__eprnt.innerHTML = 
            _e._$getHtmlTemplate(
                'event-list',{
                    xlist:_list.splice(_beg,5)
                }
            );
        this.__timer = window.setInterval(this.__doCheckEvent._$bind(this),5000);
    };
    /**
     * 
     */
    _proModuleIndex.__doCheckEvent = function(){
        var _list = this.__cache._$getRecentEventsInCache(),
            _item = _list.pop();
        if (!_item) return;
        this.__eprnt.insertAdjacentHTML('afterBegin',
            _e._$getHtmlTemplate(
                'event-list',{
                    xlist:[_item],
                    clazz:'w-evt-1 j-opt'
                }
            ));
        var _clist = _e._$getChildren(this.__eprnt);
        window.setTimeout(function(){
            _e._$delClassName(_clist[0],'j-opt');
        },10);
        if (_clist.length<6) return;
        _e._$remove(_clist[_clist.length-1]);
    };
    
};
define('{pro}module/system/home.js',
      ['{com}util/module/module.js'
      ,'{com}util/cache/event.js'
      ,'{lib}util/data/region/zh.js'
      ,'{lib}util/region/region.zh.js'
      ,'{lib}util/list/module.waterfall.js'],f);
