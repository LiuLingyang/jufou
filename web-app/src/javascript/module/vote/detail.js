var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _r = NEJ.R,
        _f = NEJ.F,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _u = _('nej.u'),
        _x = _('nej.ut'),
        _z = _('mu.x'),
        _t = _('mu.ut'),
        _g = _('mu.m.g'),
        _p = _('mu.m.v'),
        _pro;
    /**
     * 组织相册模块
     * 
     */
    _p._$$ModuleVoteDetail = NEJ.C();
    _pro = _p._$$ModuleVoteDetail._$extend(_g._$$ModuleGroup);
    /**
     * 重置
     */
    _pro.__reset = function(_options){
        this.__supReset(_options);
        this.__vote = _options.vote||_o;
        this.__group = _options.group||_o;
        if (!!this.__vote.items){
            this.__vote.items = JSON.parse(this.__vote.items);
        }
        if (!!this.__vote.result){
            this.__vote.result = JSON.parse(this.__vote.result);
        }
        _e._$renderHtmlTemplate(
            'vote-detail-box',
            'vote-detail-list',{
                xmap:this.__vote.items,
                vote:this.__vote,
                result:this.__vote.result||_o,
                group:this.__group
            }
        );
    };
    /**
     * 
     */
    _pro.__doBuild = function(){
        _v._$addEvent(
            'module-62','click',
            this.__onAction._$bind(this)
        );
        this.__cache = _t._$$CacheVote._$allocate({
            onvote:this.__cbVote._$bind(this),
            onvoteclose:this.__cbVoteClose._$bind(this)
        });
    };
    /**
     * 
     */
    _pro.__onAction = function(_event){
        var _node = _v._$getElement(_event,'d:action');
        if (!_node) return;
        _v._$stop(_event);
        switch(_e._$dataset(_node,'action')){
            case 'close':
                this.__cache._$close({
                    gid:this.__group.id,
                    sid:this.__vote.id
                });
            return;
            case 'vote':
                this.__doVote();
            return;
        }
    };
    /**
     * 
     */
    _pro.__cbVoteClose = function(_json){
        switch(_json.code){
            case 1:
                location.href = config.page('/vote/');
            return;
        }
    };
    
    _pro.__doVote = _f;
    _pro.__cbVote = _f;
};
define('{pro}module/vote/detail.js',
      ['{pro}module/common/group.js'
      ,'{com}util/cache/vote.js'],f);
