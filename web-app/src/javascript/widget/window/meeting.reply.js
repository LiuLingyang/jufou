var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _x = _('nej.ut'),
        _y = _('mu.x'),
        _i = _('mu.ui'),
        _t = _('mu.ut'),
        _p = _('mu.w.w'),
        _proWindowMeetingReply;
    // html code
    var _seed_html = _e._$addNodeTemplate('\
        <form class="w-fom">\
          <div class="w-xtb f-cb">\
            <div class="fl itm js-selected">参加</div>\
            <div class="fl itm">不参加</div>\
          </div>\
          <div class="lbox"></div>\
          <div class="pager"></div>\
        </form>');
    var _skey = _e._$addHtmlTemplate('\
        {list beg..end as y}\
          {var z=xlist[y]}\
          {var x=z.attendee}\
          <div class="w-lfac w-lfac-1 f-cb">\
            <div class="fl img"><img src="${x.thumbnail|default:config.url.portrait}"/></div>\
            <div class="fr act">\
              <div {if x.id==host.id}style="visibility:hidden;"{/if}>\
                {if type==0}\
                <input type="button" class="w-rd3 btn btn-x btn-xx" value="参加" data-type="1" data-id="${x.id}"/><input type="button" class="w-rd3 btn btn-x btn-yy" value="不参加" data-type="-1" data-id="${x.id}"/>\
                {else}\
                <input type="button" class="w-rd3 btn btn-x btn-yy" value="参加" data-type="1" data-id="${x.id}"/><input type="button" class="w-rd3 btn btn-x btn-xx" value="不参加" data-type="-1" data-id="${x.id}"/>\
                {/if}\
              </div>\
              <div class="xtm">回复时间：${z.attendTime|format:"yyyy-MM-dd HH:mm:ss"}</div>\
            </div>\
            <div class="dtl">\
              <p class="uev fc05">${x.nickname}</p>\
              <p class="utm fc05">${z.observer}位同伴</p>\
            </div>\
          </div>\
        {/list}');
    /**
     * 窗体控件基类
     * 
     */
    _p._$$WindowMeetingReply = NEJ.C();
      _proWindowMeetingReply = _p._$$WindowMeetingReply._$extend(_i._$$Window);
    /**
     * 控件重置
     */
    _proWindowMeetingReply.__reset = function(_options){
        _options.title = '管理回复';
        _options.clazz = 'w-win-3';
        this.__supReset(_options);
        this.__mopt.item.host = _options.host;
        this.__mopt.cache.data.mid = _options.mid;
        this.__taber = _x._$$Tab._$allocate(this.__topt);
    };
    /**
     * 
     */
    _proWindowMeetingReply.__destroy = function(){
        this.__taber._$recycle();
        delete this.__taber;
        this.__supDestroy();
    };
    /**
     * 初始化外观
     */
    _proWindowMeetingReply.__initXGui = function(){
        this.__seed_html = _seed_html;
    };
    /**
     * 
     */
    _proWindowMeetingReply.__initNode = function(){
    	this.__supInitNode();
    	// 0 - tab box
    	// 1 - list box
    	// 2 - pager
    	var _list = _e._$getChildren(this.__body);
        _v._$addEvent(
            _list[1],'click',
            this.__onAction._$bind(this)
        );
    	// init list module options
    	this.__mopt = {
    	    limit:10,
    	    item:{klass:_skey},
    	    parent:_list[1],
    	    cache:{klass:_t._$$CacheMeeting,data:{},clear:!0},
    	    pager:{parent:_list[2],clazz:'w-pager'},
    	    onbeforelistload:function(_event){
    	        _event.value = '<p class="w-loading">&nbsp;</p>';
    	    },
    	    onemptylist:function(_event){
    	        _event.value = '<p class="w-message">没有数据！</p>';
    	    }
    	};
    	this.__topt = {
    		list:_e._$getChildren(_list[0]),
    		onchange:this.__onTypeChange._$bind(this)
    	};
    	this.__cache = _t._$$CacheMeeting._$allocate({
    	    onstatechange:this.__cbAction._$bind(this)
    	});
    };
    /**
     * 
 	 * @param {Object} _event
     */
    _proWindowMeetingReply.__onTypeChange = function(_event){
    	if (!!this.__lsmdl)
    	    this.__lsmdl._$recycle();
    	this.__mopt.cache.lkey = 'user-'+
    	    this.__mopt.cache.data.mid+'-'+_event.index;
    	this.__mopt.item.type = _event.index;
    	this.__mopt.cache.data.type = _event.index;
    	this.__lsmdl = _x._$$ListModulePG._$allocate(this.__mopt);
    };
    /**
     * 
     */
    _proWindowMeetingReply.__onAction = function(_event){
        var _node = _v._$getElement(_event,'d:id');
        if (!_node) return;
        this.__cache._$updateState({
            uid:_e._$dataset(_node,'id'),
            mid:this.__mopt.cache.data.mid,
            state:_e._$dataset(_node,'type')
        });
    };
    /**
     * 
     */
    _proWindowMeetingReply.__cbAction = function(_json){
    	switch(_json.code){
            case 1:
                if (!!this.__lsmdl) this.__lsmdl._$recycle();
                this.__lsmdl = _x._$$ListModulePG._$allocate(this.__mopt);
            return;
            case -3:
                _y._$showError('没有权限！');
            return;
            case -303:
                _y._$showError('参加人数已满！');
            return;
            case -304:
                _y._$showError('超过可携带人数限制！');
            return;
        }
    };
};
define('{pro}widget/window/meeting.reply.js',
      ['{com}ui/window/window.js'
      ,'{lib}util/tab/tab.js'
      ,'{com}util/cache/meeting.js'
      ,'{lib}util/list/module.pager.js'],f);
