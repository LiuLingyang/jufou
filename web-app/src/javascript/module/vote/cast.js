var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _r = NEJ.R,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _u = _('nej.u'),
        _x = _('nej.ut'),
        _z = _('mu.x'),
        _t = _('mu.ut'),
        _p = _('mu.m.v'),
        _pro;
    /**
     * 组织相册模块
     * 
     */
    _p._$$ModuleVoteCast = NEJ.C();
    _pro = _p._$$ModuleVoteCast._$extend(_p._$$ModuleVoteDetail);
    /**
     * 
     */
    _pro.__doVote = function(){
        var _map = {},
        	isempty = true,
        	num = 1;
        _u._$forEach(
            _e._$getByClassName('vote-detail-box','j-flag'),
            function(_input){
                var _name = _e._$dataset(_input,'name');
                if (_input.tagName=='SELECT'||_input.checked){
                    _map[_name] = _input.value;
                }
            }
        );
        for(var key in _map){
        	isempty = false;
        	num++;
        }
        if(isempty == true){
        	_z._$showError('请先选择！');
        	return;
        }
        if(num>6){
        	_z._$showError('最多选择5项！');
        	return;
        }
        this.__cache._$vote({
            sid:this.__vote.id,
            gid:this.__group.id,
            choice:JSON.stringify(_map)
        });
    };
    /**
     * 
     * @param {Object} _json
     */
    _pro.__cbVote = function(_json){
        switch(_json.code){
            case 1:
                location.href = config.page('/vote/'+this.__vote.id+'/');
            return;
            case -601:
                _z._$showError('投票已结束!');
            return;
            case -602:
           		_z._$showError('您已经投过票了');
           	return;
            default:
            	_z._$showError('暂时无法投票!');
            return;
        }
    };
    
};
define('{pro}module/vote/cast.js',
      ['{pro}module/vote/detail.js'],f);
