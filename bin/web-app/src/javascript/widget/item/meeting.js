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
        _proItemMeeting;
    /**
     * 评论列表项
     * @class   评论列表项
     * @extends {nej.ui._$$Item}
     * @param   {Object} _options 可选配置参数，已处理参数列表如下
     *                            
     */
    _p._$$ItemMeeting = NEJ.C();
      _proItemMeeting = _p._$$ItemMeeting._$extend(_p._$$Item);
    /**
     * 
     */
    _proItemMeeting.__reset = function(_options){
        this.__supReset(_options);
        this.__group = _options.group||_o;
        this.__relation = _options.relation||0;
    };
    /**
     * Item回收
     * @return {Void}   
     */
    _proItemMeeting.__destroy = function(){
        this.__supDestroy();
    	this.__nsumry.innerHTML = '&nbsp;';
    	this.__nstats.innerHTML = '&nbsp;';
        this.__nusers.innerHTML = '&nbsp;';
    };
    /**
     * 初始化模版
     */
    _proItemMeeting.__initXGui = function() {
        this.__seed_html = 'ntp-meeting-item';
    };
    /**
     * 初始化节点
     */
    _proItemMeeting.__initNode = function(){
    	this.__supInitNode();
    	// 0 - meeting set top
        // 1 - meeting title
        // 2 - meeting summary
        // 3 - count statistics
        // 4 - address
        // 5 - user list
        // 6 - meeting description
        // 7 - meeting details more
        // 8 - meeting organizer
        // 9 - meeting repeat information
        // 10 - metting time
        var _list = _e._$getByClassName(this.__body,'js-flag');
        this.__ngrtop = _list[0];
        this.__ntitle = _list[1];
        this.__nsumry = _list[2];
        this.__nstats = _list[3];
        this.__naddrs = _list[4];
        this.__nusers = _list[5];
        this.__ndescp = _list[6];
        this.__nxmore = _list[7];
        this.__nogniz = _list[8];
        this.__nrepet = _list[9];
        this.__nxtime = _list[10];
    };
    /**
     * 刷新项,子类实现具体逻辑
     * @protected
     * @method {__doRefresh}
     * @return {Void}
     */
    _proItemMeeting.__doRefresh = function(_data){
    	this.__ngrtop.innerText = (!_data.top?'':'[置顶]');
    	this.__ntitle.innerText = (_data.title||'活动标题');
    	this.__nxtime.innerHTML = _u._$format(_data.startTime,'<p>M月</p><p>dd</p>');
    	this.__ntitle.href = config.page('/meeting/'+_data.id+'/');
    	this.__ndescp.innerHTML = _data.digest||'';
    	this.__nxmore.href = config.page('/meeting/'+_data.id+'/');
    	this.__nxmore.innerText = '...更多信息';
    	var _user = _data.organizer||_o;
    	this.__nogniz.innerText = _user.nickname||_user.username;
    	this.__nogniz.href = config.page('/member/'+_user.id+'/');
    	_data.startDateTime = new Date(_data.startTime);
    	var _options = {
    	    	meeting:_data,
    	    	host:this.__host,
    	    	group:this.__group,
    	    	state:_e._$getHtmlTemplate('jst-meeting-state',{
    	    	    relation:this.__relation,
    	    	    homepage:this.__group.homepage,
    	    	    meeting:_data,
    	    	    state:_data.state,
    	    	    now:+new Date
    	    	})
    	    };
    	this.__nsumry.innerHTML = _e
    	    ._$getHtmlTemplate('jst-meeting-summary',_options);
    	this.__nstats.innerHTML = _e
    	    ._$getHtmlTemplate('jst-meeting-count',_options);
        this.__naddrs.innerText = [_data.province,
             _data.city,_data.area,_data.address].join('');
        this.__nusers.innerHTML = _e
    	    ._$getHtmlTemplate('jst-meeting-attendee',{
    	    	group:this.__group,
    	    	xlist:_data.attendees||[]
    	    });
        // TODO set meeting repeat
    };
};
define('{pro}widget/item/meeting.js',
      ['{pro}widget/item/item.js'],f);