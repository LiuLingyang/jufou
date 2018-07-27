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
        _proItemMeeting,
        _supItemMeeting;
    /**
     * 评论列表项
     * @class   评论列表项
     * @extends {nej.ui._$$Item}
     * @param   {Object} _options 可选配置参数，已处理参数列表如下
     *                            
     */
    _p._$$ItemMeeting = NEJ.C();
      _proItemMeeting = _p._$$ItemMeeting._$extend(_p._$$Item);
      _supItemMeeting = _p._$$ItemMeeting._$supro;
    /**
     * 
     */
    _proItemMeeting.__reset = function(_options){
        this.__nnow = _options.nnow;
        this.__nwek = _options.nwek;
        this.__nmre = _options.nmre;
        this.__supReset(_options);
        if (this.__range[0]==0)
            _e._$addClassName(this.__body,'js-first');
    };
    /**
     * Item回收
     * @return {Void}   
     */
    _proItemMeeting.__destroy = function(){
        this.__supDestroy();
        _e._$delClassName(this.__body,'js-first');
        _e._$removeByEC(this.__nnow);
        _e._$removeByEC(this.__nwek);
        _e._$removeByEC(this.__nmre);
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
        // 0 - group logo
        // 1 - action box
        // 2 - meeting title
        // 3 - group name
        // 4 - meeting time
        // 5 - meeting address
        var _list = _e._$getByClassName(this.__body,'js-flag');
        this.__nlogo = _list[0];
        this.__nactc = _list[1];
        this.__ncout = _list[2];
        this.__nttlx = _list[3];
        this.__ngrpn = _list[4];
        this.__ntime = _list[5];
        this.__naddr = _list[6];
    };
    /**
     * 刷新项,子类实现具体逻辑
     * @protected
     * @method {__doRefresh}
     * @return {Void}
     */
    _proItemMeeting.__doRefresh = function(_data){
        var _group = _data.group;
        this.__nlogo.src = _group.thumbnail||config.url.logo;
        this.__nactc.innerHTML = 
            _e._$getHtmlTemplate('jst-meeting-state',{
                relation:_data.relation,
                homepage:_group.homepage,
                meeting:_data,
                state:_data.state,
                now:+new Date
            });
        this.__ncout.innerHTML = 
            _e._$getHtmlTemplate('jst-meeting-count',{
                meeting:_data,
                host:this.__host,
                group:_group
            });
        this.__nttlx.innerText = _data.title||'活动标题';
        this.__nttlx.href = '/'+_group.homepage+'/meeting/'+_data.id+'/';
        this.__ngrpn.innerText = _group.name||'组织名称';
        this.__ngrpn.href = '/'+_group.homepage+'/';
        this.__ntime.innerText = 
            _u._$format(_data.startTime,'时间：yyyy-MM-dd HH:mm');
        this.__naddr.innerText = 
            [_data.province,_data.city,_data.area,_data.address].join('');
        var _now = new Date,
            _str1 = _u._$format(_now,'yyyyMMdd'),
            _str2 = _u._$format(_data.startTime,'yyyyMMdd');
        if (!this.__nnow.offsetHeight&&_str1==_str2){
            this.__body.insertAdjacentElement('beforeBegin',this.__nnow);
        }
        var _wek = _now.getDay(),
            _dat = _now.setDate(_now.getDate()+7-_wek),
            _str3 = _u._$format(_dat,'yyyyMMdd');
        if (!this.__nwek.offsetHeight&&_str1<_str2&&_str2<_str3){
            this.__body.insertAdjacentElement('beforeBegin',this.__nwek);
        }
    };
};
define('{pro}widget/item/meeting.2.js',
      ['{pro}widget/item/item.js'],f);