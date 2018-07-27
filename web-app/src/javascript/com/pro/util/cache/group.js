var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _u = _('nej.u'),
        _v = _('nej.v'),
        _j = _('nej.j'),
        _t = _('nej.ut'),
        _p = _('mu.ut'),
        _proCacheGroup,
        _seed = +new Date,
        _baidu = 'http://api.map.baidu.com/geocoder/v2/?ak='+baiduKEY+'&output=json&';
    /**
     * 组织缓存对象
     * 
     * @class   {mu.ut._$$CacheGroup}
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
     * [hr]
     * 组织成员所在的分组列表载入回调
     * @event   {onmembergrouplistload}
     * @param   {Object} 
     * 
     * [hr]
     * 搜索组织
     * @event   {onsearchgroups}
     * @param   {Obejct}
     * 
     * [hr]
     * 搜索活动
     * @event   {onsearchactivities}
     * @param   {Object} 
     * 
     * [hr]
     * 取组织活动
     * @event   {ongetgroupactivities}
     * @param	groupId		组织Id
     * @param   type		类型 0为即将开始的活动,		1为已经结束的活坳
     * @param 	pageNum		页码 
     * 
     * [hr]
     * 发布活动
     * @event	{onpublishactivity}
     * @param	{Object}	activity活动对象
     */
    _p._$$CacheGroup = NEJ.C();
      _proCacheGroup = _p._$$CacheGroup._$extend(_p._$$Cache);
    /**
     * 控件重置
     * @param  {Object} 配置信息
     * @return {Void} 
     */
    _proCacheGroup.__reset = function(_options){
        this.__supReset(_options);
        if (!!_options.group&&_options.group!=_o)
            this.__setDataInCache('group',_options.group);
    };
    /**
     * 
     */
    _proCacheGroup.__doLoadList = function(_options){
    	var _key = _options.key,_url;
    	switch(_key.split('-')[0]){
    		case 'create':
    		    _url = '/rest/group/getCreateList';
    		break;
    		case 'join':
    		    _url = '/rest/group/getJoinList';
    		break;
            case 'apply':
                _url = '/rest/group/getApplyList';
            break;
    		case 'all':
    		    _url = '/rest/group/list';
    		break;
    		case 'search':
    			delete _options.data.time;
    		    _url = '/rest/group/search';
    		break;
    	}
    	_j._$request(_url,{
            method:'POST',
            type:'json',
            data:_u._$object2query(_options.data),
            onload:function(_json){
                var _map = _json.result.map;
                if (!!_map){
                    _u._$forEach(
                        _json.result.list,function(_group){
                            _group.apply = _map[_group.id];
                        }
                    );
                }
                this.__cbListLoad(_key,_options.onload,_json);
                if (!!_json.result.count){
                    _v._$dispatchEvent(
                        _p._$$CacheGroup,
                        'countupdate',_json.result.count
                    );
                }
            }._$bind(this),
            onerror:this.__cbListLoad._$bind(this,_key,_options.onload,_o)
        });
    };
    /**
     * 从缓存中取组织信息
     * @return {Object} 组织信息
     */
    _proCacheGroup._$getGroupInCache = function(_gid){
        return this.__getDataInCache('group'+(_gid||''));
    };
    /**
     * 创建组织
     * @param  {Object} 组织信息
     * @return {Void} 
     */
    _proCacheGroup._$create = function(_group){
        var _xkey = 'cb_'+(_seed++);
        window[_xkey] = function(_json){
            if ((_json||_o).status==0){
                var _location = _json.result.location||_o;
                _group.latitude = _location.lat||'0.0';
                _group.longitude = _location.lng||'0.0';
            }else{
                _group.latitude = '0.0';
                _group.longitude = '0.0';
            }
            _j._$request('/rest/group/create',{
                type:'json',
                method:'POST',
                data:_u._$object2query(_group),
                onload:function(_json){
                    if (_json.code==1)
                        this.__setDataInCache('group',_json.result);
                    this._$dispatchEvent('ongroupcreate',_json);
                }._$bind(this),
                onerror:this._$dispatchEvent._$bind(this,'ongroupcreate',_o)
            });
        }._$bind(this);
        _j._$loadScript(
            _baidu+_u._$object2query({
                city:_group.city,
                address:_group.area,
                callback:_xkey
            }),{
                onerror:window[_xkey]
            }
        );
    };
    /**
     * 更新组织信息
     * @param  {Object} 组织信息
     * @return {Void}
     */
    _proCacheGroup._$update = function(_group){
        _j._$request('/rest/group/update',{
            type:'json',
            method:'POST',
            data:_u._$object2query(_group),
            onload:this._$dispatchEvent._$bind(this,'ongroupupdate'),
            onerror:this._$dispatchEvent._$bind(this,'ongroupupdate',_o)
        });
    };
    /**
     * 删除组织
     * @param  {String} 组织ID
     * @return {Void}
     */
    _proCacheGroup._$delete = function(_gid){
        
    };
    /**
     * 取推荐标签列表
     * @return {Void}
     */
    _proCacheGroup._$getRecTag = function(){
        _j._$request('/rest/tag/rec',{
            type:'json',
            method:'POST',
            onload:this._$dispatchEvent._$bind(this,'onrectagload'),
            onerror:this._$dispatchEvent._$bind(this,'onrectagload',_o)
        });
    };
    /**
     * 更新组织标签
     * @param  {String} 组织标识
     * @param  {String} 组织标签
     * @return {Void}
     */
    _proCacheGroup._$updateTag = function(_tag){
        var _group = this._$getGroupInCache();
        _j._$request('/rest/tag/group',{
            type:'json',
            method:'POST',
            data:_u._$object2query({gid:_group.id,tag:_tag}),
            onload:this._$dispatchEvent._$bind(this,'ontagupdate'),
            onerror:this._$dispatchEvent._$bind(this,'ontagupdate',_o)
        });
    };
    /**
     * 添加问题
     * @param  {Object} _question 问题信息
     * @return {Void}
     */
    _proCacheGroup._$addQuestion = function(_question){
        var _group = this._$getGroupInCache();
        _j._$request('/rest/group/addQuestion',{
            type:'json',
            method:'POST',
            data:_u._$object2query({
                gid:_group.id,
                publish:_question.publish,
                question:_question.question
            }),
            onload:this._$dispatchEvent._$bind(this,'onquestionadd',_question),
            onerror:this._$dispatchEvent._$bind(this,'onquestionadd',_question,_o)
        });
    };
    /**
     * 更新问题
     * @param  {Object} _question 问题信息
     * @return {Void}
     */
    _proCacheGroup._$updateQuestion = function(_question){
        var _group = this._$getGroupInCache();
        _j._$request('/rest/group/updateQuestion',{
            type:'json',
            method:'POST',
            data:_u._$object2query({
                gid:_group.id,
                qid:_question.qid,
                publish:_question.publish,
                question:_question.question
            }),
            onload:this._$dispatchEvent._$bind(this,'onquestionupdate',_question),
            onerror:this._$dispatchEvent._$bind(this,'onquestionupdate',_question,_o)
        });
    };
    /**
     * 删除问题
     * @param  {String} _qid 问题标识
     * @return {Void}
     */
    _proCacheGroup._$deleteQuestion = function(_question){
        var _group = this._$getGroupInCache();
        _j._$request('/rest/group/deleteQuestion',{
            type:'json',
            method:'POST',
            data:_u._$object2query({gid:_group.id,qid:_question.qid}),
            onload:this._$dispatchEvent._$bind(this,'onquestiondelete',_question),
            onerror:this._$dispatchEvent._$bind(this,'onquestiondelete',_question,_o)
        });
    };
    /**
     * 更新加入组织条件设置
     * @param {Object} _setting
     */
    _proCacheGroup._$updateJoinSetting = function(_setting){
        var _group = this._$getGroupInCache();
        if (!!_group) _setting.gid = _group.id;
        _j._$request('/rest/group/updateJoinSetting',{
            type:'json',
            method:'POST',
            data:_u._$object2query(_setting),
            onload:this._$dispatchEvent._$bind(this,'onjoinsettingupdate'),
            onerror:this._$dispatchEvent._$bind(this,'onjoinsettingupdate',_o)
        });
    };
    /**
     * 
     */
    _proCacheGroup._$updatePrivacy = function(_setting){
    	_j._$request('/rest/group/updatePrivacy',{
            type:'json',
            method:'POST',
            data:_u._$object2query(_setting),
            onload:this._$dispatchEvent._$bind(this,'onprivacyupdate'),
            onerror:this._$dispatchEvent._$bind(this,'onprivacyupdate',_o)
        });
    };
    /**
     * 
     */
    _proCacheGroup._$updateLogo = function(_form){
    	_form.action = '/rest/group/updateLogo';
    	_j._$upload(_form,{
    		type:'json',
    		onload:this._$dispatchEvent._$bind(this,'onlogoupdate'),
            onerror:this._$dispatchEvent._$bind(this,'onlogoupdate',_o)
    	});
    };
    /**
     * 
     * @param {Object} _data
     */
    _proCacheGroup._$clipLogo = function(_data){
        _j._$request('/rest/group/clipLogo',{
            type:'json',
            method:'POST',
            data:_u._$object2query(_data),
            onload:this._$dispatchEvent._$bind(this,'onlogoclip'),
            onerror:this._$dispatchEvent._$bind(this,'onlogoclip',_o)
        });
    };
    /**
     * 加入组织
     * @param {Object} _form
     */
    _proCacheGroup._$join = function(_data){
    	_j._$request('/rest/group/join',{
            type:'json',
            method:'POST',
            data:_u._$object2query(_data),
            onload:this._$dispatchEvent._$bind(this,'onjoin'),
            onerror:this._$dispatchEvent._$bind(this,'onjoin',_o)
        });
    };
    /**
     * 群通知
     * @param {Object} _form
     */
    _proCacheGroup._$inform = function(_data){
    	_j._$request('/rest/message/inform',{
            type:'json',
            method:'POST',
            data:_u._$object2query(_data),
            onload:this._$dispatchEvent._$bind(this,'oninform'),
            onerror:this._$dispatchEvent._$bind(this,'oninform',_o)
        });
    };
    /**
     * 
     */
    _proCacheGroup._$exit = function(_gid){
        _j._$request('/rest/group/exit',{
            type:'json',
            method:'POST',
            data:_u._$object2query({gid:_gid}),
            onload:this._$dispatchEvent._$bind(this,'onexit'),
            onerror:this._$dispatchEvent._$bind(this,'onexit',_o)
        });
    };
    /**
     * 
     */
    _proCacheGroup._$dismiss = function(_gid){
        _j._$request('/rest/group/dismiss',{
            type:'json',
            method:'POST',
            data:_u._$object2query({gid:_gid}),
            onload:this._$dispatchEvent._$bind(this,'ondismiss'),
            onerror:this._$dispatchEvent._$bind(this,'ondismiss',_o)
        });
    };
    /**
     * 
     */
    _proCacheGroup._$invite = function(_data){
        _j._$request('/rest/user/invite',{
            type:'json',
            method:'POST',
            data:_u._$object2query(_data),
            onload:this._$dispatchEvent._$bind(this,'oninvite'),
            onerror:this._$dispatchEvent._$bind(this,'oninvite',_o)
        });
    };
    /**
     * 
     */
    _proCacheGroup._$getMsgSettingInCache = function(_uid,_gid){
        return this.__getDataInCache(_uid+'-'+_gid);
    };
    /**
     * 取某个用户对组织的消息设置
     * @param {Object} _uid
     * @param {Object} _gid
     */
    _proCacheGroup._$getMsgSetting = function(_uid,_gid){
        var _key = _uid+'-'+_gid,
            _data = this._$getMsgSettingInCache(_uid,_gid);
        if (!!_data){
            this._$dispatchEvent('onmsgsettingload',_key);
            return;
        }
        _j._$request('/rest/settings/get',{
            type:'json',
            method:'POST',
            data:_u._$object2query({gid:_gid}),
            onload:this.__getMsgSetting._$bind(this,_key),
            onerror:this.__getMsgSetting._$bind(this,_key,_o)
        });
    };
    /**
     * 
     * @param {Object} _key
     */
    _proCacheGroup.__getMsgSetting = function(_key,_json){
        if (_json.code==1){
            this.__setDataInCache(_key,_json.result);
        }
        this._$dispatchEvent('onmsgsettingload',_key);
    };
    /**
     * 
     * @param {Object} _setting
     */
    _proCacheGroup._$updateMsgSetting = function(_uid,_setting){
        var _key = _uid+'-'+_setting.gid;
        _j._$request('/rest/settings/update',{
            type:'json',
            method:'POST',
            data:_u._$object2query(_setting),
            onload:this.__updateMsgSetting._$bind(this,_key),
            onerror:this.__updateMsgSetting._$bind(this,_key,_o)
        });
    };
    /**
     * 
     * @param {Object} _setting
     */
    _proCacheGroup.__updateMsgSetting = function(_key,_json){
        if (_json.code==1){
            this.__setDataInCache(_key,_json.result);
        }
        this._$dispatchEvent('onmsgsettingupdate',_key,_json);
    };
    /**
     * 
     * @param {Object} _data
     */
    _proCacheGroup._$apply = function(_data){
        var _url = '/rest/group/apply';
        if (!!_data.updated){
            _url = '/rest/group/updateApplication';
        }
        delete _data.updated;
        _j._$request(_url,{
            type:'json',
            method:'POST',
            data:_u._$object2query(_data),
            onload:this._$dispatchEvent._$bind(this,'onapply'),
            onerror:this._$dispatchEvent._$bind(this,'onapply',_o)
        });
    };
    
    
    _t._$$CustomEvent._$allocate({
	    element:_p._$$CacheGroup,
	    event:'countupdate'
    });
};
define('{com}util/cache/group.js',
      ['{com}util/api.js'
      ,'{com}util/cache/cache.js'
      ,'{lib}util/ajax/tag.js'],f);
