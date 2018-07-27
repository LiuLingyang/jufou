var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _u = _('nej.u'),
        _x = _('nej.ut'),
        _i = _('mu.ui'),
        _p = _('mu.w.w'),
        _proWindowPersonal;
    // html code
    var _seed_date = _e._$addHtmlTemplate('\
        <select name="year" class="bd01 w-rd3 wd3">\
          {list ybeg..yend as x}\
          <option value="${x}">${x}</option>\
          {/list}\
        </select>年\
        <select name="month" class="bd01 w-rd3 wd3">\
          {list mbeg..mend as x}\
          <option value="${x}">${x}</option>\
          {/list}\
        </select>月\
        <select name="day" class="bd01 w-rd3 wd3">\
          {list dbeg..dend as x}\
          <option value="${x}">${x}</option>\
          {/list}\
        </select>日\
    ');
    /**
     * 窗体控件基类
     * 
     */
    _p._$$WindowPersonal = NEJ.C();
      _proWindowPersonal = _p._$$WindowPersonal._$extend(_i._$$Window);
    /**
     * 控件重置
     */
    _proWindowPersonal.__reset = function(_options){
        _options.title = '修改个人信息';
        _options.clazz = 'w-wfm w-win-8';
        var _data = _options.data||{},
            _date = new Date(_data.birthday||Date.serverTime);
        _data.year = _date.getFullYear()-(!_data.birthday?30:0);
        _data.month = _date.getMonth()+1;
        _data.day = _date.getDate();
        this.__supReset(_options);
        this.__region._$setRegion({
            province:_data.province,
            city:_data.city,
            area:_data.area
        });
    };
    /**
     * 初始化外观
     */
    _proWindowPersonal.__initXGui = function(){
        this.__seed_html = 'ntp-mdl-profile';
    };
    /**
     * 
     */
    _proWindowPersonal.__initNode = function(){
        this.__message = {
            'bio-4':'超出长度限制',
            'nickname-4':'昵称过长'
        };
        this.__supInitNode();
        var _date = Date.serverTime.getFullYear(),
            _list = _e._$getByClassName(this.__body,'js-flag');
        _list[0].innerHTML = _e._$getHtmlTemplate(
            _seed_date,{
                ybeg:_date-100,yend:_date,
                mbeg:1,mend:12,dbeg:1,dend:31
            }
        );
        this.__region = _x._$$RegionSelector._$allocate({
            province:this.__body.province,
            city:this.__body.city,
            area:this.__body.area
        });
    };
    /**
     * 
     */
    _proWindowPersonal.__doFormatData = function(_data){
        _data.birthday = +new Date(
        		parseInt(_data.year),
        		parseInt(_data.month)-1,
        		parseInt(_data.day));
        delete _data.year;
        delete _data.month;
        delete _data.day;
    };
};
define('{pro}widget/window/personal.update.js',
      ['{com}ui/window/window.js'
      ,'{lib}util/data/region/zh.js'
      ,'{lib}util/region/region.zh.js'],f);
