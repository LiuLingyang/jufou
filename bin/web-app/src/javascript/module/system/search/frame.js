var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _u = _('nej.u'),
        _y = _('nej.ui'),
        _x = _('nej.ut'),
        _z = _('mu.x'),
        _t = _('mu.ut'),
        _p = _('mu.m.g'),
        _proModuleSearchFrame;
    /**
     * 组织模块基类
     * 
     * 
     */
    _p._$$ModuleSearchFrame = NEJ.C();
      _proModuleSearchFrame = _p._$$ModuleSearchFrame._$extend(_t._$$Module);
    /**
     * 控件初始化
     * @return {Void}
     */
    _proModuleSearchFrame.__doBuild = function(){
        this.__locked = !0;
        // 位置设置
        var _node = _e._$get('module-y0');
        this.__form = _node.getElementsByTagName('form')[0];
        // 0 - update button
        // 1 - address show
        // 2 - address select
        var _list = _e._$getByClassName(this.__form,'js-flag');
        this.__nupa = _list[0];
        this.__nshw = _list[1];
        this.__nsel = _list[2];
        _v._$addEvent(
            this.__nupa,'click',
            this.__onToggleAddress._$bind(this)
        );
        _v._$addEvent(
            this.__form['btn-ok'],'click',
            this.__onChangeAddress._$bind(this)
        );
        this.__region = _x._$$RegionSelector._$allocate({
            area:this.__form.area,
            city:this.__form.city,
            province:this.__form.province
        });
        // 分类设置
        var _node = _e._$get('module-y1');
        this.__form1 = _node.getElementsByTagName('form')[0];
        _z._$bindSearch(
            this.__form1.keyword,
            this.__form1['btn-ok'],{
                onok:this.__onChangeSearchKey._$bind(this)
            }
        );
        this.__ctab = _x._$$Tab._$allocate({
            list:_e._$getByClassName(this.__form1,'js-flag'),
            onchange:this.__onChangeCategory._$bind(this)
        });
        // 0 - keyword text
        // 1 - delete keyword button
        var _xlist = _e._$getByClassName('module-y1','js-flxg');
        this.__nkeywd = _xlist[0];
        _v._$addEvent(
            _xlist[1],'click',
            this.__onDeleteKeyword._$bind(this)
        );
        // 日历设置
        var _id = 'module-y2';
        this.__dlst = _e._$getByClassName(_id,'js-xflag');
        this.__onChangeDate(new Date());
        this.__dtab = _x._$$Tab._$allocate({
            list:this.__dlst,
            onchange:this.__onChangeCalendar._$bind(this)
        });
        _y._$$DatePick._$attach(
            _e._$getByClassName(_id,'js-flag')[0],{
                toggled:!0,
                clazz:'w-xdat',
                align:'bottom right',
                delta:{top:-12,left:-10},
                onchange:this.__onChangeDate._$bind(this),
                onbeforeclick:this.__onAdjustDate._$bind(this)
            });
        this.__export.parent = _e._$get('search-mdl-box');
        this.__locked = !1;
    };
    /**
     * 
     */
    _proModuleSearchFrame.__onRefresh = function(_options){
        this.__locked = !0;
        var _data = _options.param||{};
        // reset position
        if (_data.p||_data.c||_data.a){
            this.__export.province = _data.p||'';
            this.__export.city = _data.c||'';
            this.__export.area = _data.a||'';
            this.__nshw.innerText = [
                this.__export.province,
                this.__export.city,
                this.__export.area].join(' ').trim();
        }
        // reset category
        if (_data.g){
            var _lst = this.__ctab._$getList(),
                _idx = _u._$indexOf(_lst,
                    function(_node){
                        return (_e._$dataset(
                                _node,'value')||'')
                                .indexOf(_data.g)>=0;
                    }
                );
            if (_idx>=0){
                this.__ctab._$go(_idx,!0);
            }else{
                _data.k = _data.g;
            }
        }
        // reset keyword
        if (_data.k){
            this.__export.keyword = _data.k;
            this.__form1.keyword.value = this.__export.keyword;
            this.__onChangeSearchKey();
        }
        // reset calendar
        var _time = parseInt(_data.t);
        if (!isNaN(_time)){
            this.__onChangeDate(new Date(_time));
        }
        this.__locked = !1;
    };
    /**
     * 
     */
    _proModuleSearchFrame.__onToggleAddress = function(_event){
        _v._$stop(_event);
        _e._$setStyle(this.__nupa,'display','none');
        var _arr = this.__nshw.innerText.replace('全国','').split(' ');
        this.__region._$setRegion({
            province:_arr[0]||'',
            city:_arr[1]||'',
            area:_arr[2]||''
        });
        _e._$setStyle(this.__nsel,'display','');
    };
    /**
     * 
     */
    _proModuleSearchFrame.__onChangeAddress = function(_event){
        _v._$stop(_event);
        _e._$setStyle(this.__nsel,'display','none');
        this.__export.province = this.__form.province.value||'';
        this.__export.city = this.__form.city.value||'';
        this.__export.area = this.__form.area.value||'';
        var _text = [
                this.__export.province,
                this.__export.city,
                this.__export.area
            ].join(' ').trim();
        this.__nshw.innerText = _text||'全国';
        _e._$setStyle(this.__nupa,'display','');
        this.__onConditionChange();
    };
    /**
     * 
     */
    _proModuleSearchFrame.__onChangeSearchKey = function(){
        var _value = this.__form1.keyword.value.trim();
        if (!_value) return;
        _e._$setStyle(this.__nkeywd.parentNode,'display','');
        this.__export.keyword = _value;
        this.__nkeywd.innerText = _value;
        this.__form1.keyword.value = '';
        this.__onConditionChange();
    };
    /**
     * 
     */
    _proModuleSearchFrame.__onDeleteKeyword = function(){
        _e._$setStyle(this.__nkeywd.parentNode,'display','none');
        this.__nkeywd.innerText = '';
        this.__export.keyword = '';
        this.__onConditionChange();
    };
    /**
     * 
     */
    _proModuleSearchFrame.__onChangeCategory = function(_event){
        this.__export.category = _event.data||'';
        this.__onConditionChange();
    };
    /**
     * 
     */
    _proModuleSearchFrame.__onAdjustDate = function(_options){
        var _date,
            _index = Math.max(1,this.__dtab._$getIndex());
        var _time = (_e._$dataset(this.__dlst[_index],'value')||'').split('-');
        if (_time.length==3){
            _date = new Date(
                parseInt(_time[0]),
                parseInt(_time[1])-1,
                parseInt(_time[2])
            );
        }
        if (!_date) 
            _date = new Date;
        _options.date = _date;
    };
    /**
     * 
     * @param {Object} _event
     */
    _proModuleSearchFrame.__onChangeCalendar = function(_event){
        this.__export.time = _event.data||null;
        this.__onConditionChange();
    };
    /**
     * 
     * @param {Object} _date
     */
    _proModuleSearchFrame.__onChangeDate = function(_date){
        var _idx = 0,
            _str = 'yyyy-MM-dd',
            _now = _u._$format(_date,_str),
            _day = 0; //_date.getDay();
        _date.setDate(_date.getDate()-_day);
        _u._$forEach(
            this.__dlst,
            function(_node,_index){
                if (_index<=0) return;
                var _cur = _u._$format(_date,_str);
                if (_now==_cur) _idx = _index;
                _e._$dataset(_node,'value',_cur);
                _node.innerHTML = _e
                     ._$getHtmlTemplate(
                     'jst-calendar-day',{date:_date});
                _date.setDate(_date.getDate()+1);
            }
        );
        if (!!this.__dtab) this.__dtab._$go(_idx,!0);
    };
    /**
     * 
     */
    _proModuleSearchFrame.__onConditionChange = (function(){
        var _cdt1 = ['p','c','a','g','k','t'],
            _cdt2 = ['province','city','area','category','keyword','time'];
        return function(){
            if (this.__locked) return;
            var _arr = [];
            _u._$forIn(
                _cdt1,function(_key,_index){
                    if (_key=='t'){
                        var _time = (this.__export.time||'').split('-');
                        if (_time.length==3){
                            _arr.push('t='+(+new Date(parseInt(_time[0]),parseInt(_time[1])-1,parseInt(_time[2]))));
                        }else{
                            _arr.push('t=');
                        }
                        return;
                    }
                    _arr.push(_key+'='+encodeURIComponent(this.__export[_cdt2[_index]]||''));
                },this
            );
            location.hash = _arr.join('&');
            dispatcher._$redirect(
                !this.__export.time
                ?'/?/m/group/':'/?/m/meeting/');
        };
    })();
};
define('{pro}module/system/search/frame.js',
      ['{com}util/module/module.js'
      ,'{lib}util/data/region/zh.js'
      ,'{lib}util/region/region.zh.js'
      ,'{lib}ui/datepick/datepick.js'
      ,'{lib}util/tab/tab.js'],f);
