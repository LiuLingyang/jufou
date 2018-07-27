var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _u = _('nej.u'),
        _x = _('nej.ut'),
        _y = _('mu.x'),
        _t = _('mu.ut'),
        _g = _('mu.m.g'),
        _p = _('mu.m.v'),
        _pro;
    /**
     * 组织首页模块
     * 
     * 
     */
    _p._$$ModuleVoteCreate = NEJ.C();
    _pro = _p._$$ModuleVoteCreate._$extend(_g._$$ModuleGroup);
    /**
     * 控件重置
     */
    _pro.__reset = function(_options){
        this.__supReset(_options);
        this.__vote = _options.vote;
        if (this.__vote.id==null){
            delete this.__vote;
        }
        this.__doInitVoteList();
    };
    /**
     * 构建模块，子类重写具体业务逻辑
     * @return {Void}
     */
    _pro.__doBuild = function(){
        this.__mbox = _e._$get('vote-list-box');
        this.__body = _e._$get('module-61').parentNode;
        this.__form = _t._$$WebForm._$allocate({
            form:this.__body
        });
        _v._$addEvent(
            this.__mbox.parentNode,
            'click',this.__onAction._$bind(this)
        );
        _v._$addEvent(
            this.__body['btn-publish'],
            'click',this.__onPublish._$bind(this)
        );
        // init cache
        this.__cache = _t._$$CacheVote._$allocate({
            onvotecreate:this.__cbVoteCreate._$bind(this)
        });
    };
    /**
     * 
     */
    _pro.__doInitVoteList = function(){
        if (!this.__vote){
            this.__doAppendItem();
            return;
        }
        this.__vote.items = JSON.parse(this.__vote.items);
        _u._$forIn(
            this.__vote.items,
            this.__doAppendItem,this
        );
    };
    /**
     * 
     */
    _pro.__doSyncItemAct = function(_focus){
        var _list = _e._$getChildren(this.__mbox);
        if (_list.length==1){
            _e._$addClassName(_list[0],'js-ndel');
        }else{
            _e._$delClassName(_list[0],'js-ndel');
        }
        if (!!_focus){
            var _parent = _list[_list.length-1];
            _parent.getElementsByTagName('input')[0].focus();
        }
    };
    /**
     * 
     */
    _pro.__doAppendItem = function(_item,_focus){
        this.__mbox.insertAdjacentHTML(
            'beforeEnd',_e._$getHtmlTemplate('group-vote-item',{
                vote:_item||{}
            })
        );
        this.__doSyncItemAct(!!_focus);
    };
    /**
     * 
     */
    _pro.__onAction = function(_event){
        var _elm = _v._$getElement(_event,'d:action');
        if (!_elm) return;
        _v._$stop(_event);
        switch(_e._$dataset(_elm,'action')){
            case 'add':
                this.__doAppendItem(null,!0);
            return;
            case 'del':
                _e._$remove(_elm.parentNode);
                this.__doSyncItemAct();
            return;
        }
    };
    /**
     * 
     */
    _pro.__doParseData = function(_data){
        var _map = {},_key = 1,
            _list = this.__mbox.getElementsByTagName('input');
        _u._$forEach(
            _list,function(_input){
                var _value = _input.value.trim();
                if (!!_value){
                    _map[_key] = _value;
                    _key++;
                }
            }
        );
        _data.items = JSON.stringify(_map);
    };
    /**
     * 
     */
    _pro.__onPublish = function(){
        if (!this.__form._$checkValidity()){
            return;
        }
        var _data = this.__form._$data();
        this.__doParseData(_data);
        _data.gid = this.__group.id;
        if (!!this.__vote){
            _data.vid = this.__vote.id;
        }
        this.__cache._$create(_data);
    };
    /**
     * 
     * @param {Object} _options
     */
    _pro.__cbVoteCreate = function(_json){
        switch(_json.code){
            case 1:
                location.href = config.page('/vote/'+_json.result.id+'/');
            return;
            case -3:
                _y._$showError('没有权限!');
            return;
            case -6:
                _y._$showError('xss攻击！');
            return;
            default:
                _y._$showError('暂时无法创建投票！');
            return;
        }
    };
};
define('{pro}module/vote/create.js',
      ['{patch}json.js'
      ,'{pro}module/common/group.js'
      ,'{com}util/cache/vote.js'
      ,'{com}util/form/form.js'],f);