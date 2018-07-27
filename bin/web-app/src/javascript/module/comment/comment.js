var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _u = _('nej.u'),
        _x = _('nej.ut'),
        _z = _('mu.x'),
        _t = _('mu.ut'),
        _i = _('mu.w.i'),
        _w = _('mu.w.w'),
        _p = _('mu.m.g'),
        _proModuleComment;
    /**
     * 组织页面左侧栏模块
     * 
     * 
     */
    _p._$$ModuleComment = NEJ.C();
      _proModuleComment = _p._$$ModuleComment._$extend(_t._$$Module);
    /**
     * 控件重置
     * 
     */
    _proModuleComment.__reset = function(_options){
        this.__supReset(_options);
        var _parent = _e._$get(_options.parent);
        if (!!_parent) _parent.appendChild(this.__body);
        if (!!this.__nfom){
            this.__xfom = _t._$$WebForm._$allocate({
                form:this.__nfom,
                message:{
                    'content-4':'评论内容最多输入500个字符或者250个汉字'
                }
            });
        }
        this.__owner = _options.owner||_o; // meeting or photo
        var _item = this.__mopt.item;
        _item.host = this.__host;
        _item.group = this.__group;
        var _cache = this.__mopt.cache;
        _cache.lkey = 'cmt-'+this.__owner.id;
        _cache.oid = this.__copt.oid = this.__owner.id;
        _cache.type = this.__copt.type = _options.type;
        this.__cache = _t._$$CacheComment._$allocate(this.__copt);
        this.__lmdl = _x._$$ListModulePG._$allocate(this.__mopt);
    };
    /**
     * 构建模块，子类重写具体业务逻辑
     * @return {Void}
     */
    _proModuleComment.__doBuild = function(){
        this.__body = _e._$html2node(
              _e._$getTextTemplate('txt-comment-module'));
        // 0 - comment list box
        // 1 - pager box
        var _list = _e._$getByClassName(this.__body,'js-zflag');
        this.__mopt = {
            limit:10,
            parent:_list[0],
            item:{
                klass:_i._$$ItemComment,
                onreply:this.__onReply._$bind(this)
            },
            pager:{
                parent:_list[1],
                clazz:'w-pager'
            },
            cache:{
                klass:_t._$$CacheComment
            },
            onbeforelistload:_z._$showLoading,
            onemptylist:this.__onEmptyList._$bind(this),
            ondelete:this.__onDelete._$bind(this)
        };
        this.__copt = {
            onitemadd:this.__cbItemAdd._$bind(this),
            onfileupload:this.__cbFileUpload._$bind(this)
        };
        this.__wopt = {
            title:'删除确认',message:'确定要删除此评论？',
            onok:this.__onDeleteConfirm._$bind(this)
        };
        // parse top
        var _txt1 = _e._$getTextTemplate('txt-comment-login'),
            _txt2 = _e._$getTextTemplate('txt-comment-publish'),
            _node = _e._$html2node(_txt1||_txt2);
        if (!!_txt1) this.__doParseLogin(_node);
        if (!!_txt2) this.__doParsePublish(_node);
        this.__body.insertAdjacentElement('afterBegin',_node);
    };
    /**
     * 
     * @param {Object} _txt
     */
    _proModuleComment.__doParseLogin = function(_node){
        _v._$addEvent(
            _e._$getByClassName(_node,'js-xflag')[0],
            'click',this.__onLogin._$bind(this)
        );
    };
    /**
     * 
     * @param {Object} _txt
     */
    _proModuleComment.__doParsePublish = function(_node){
        var _list = _e._$getChildren(_node);
        this.__nfom = _list[0];
        // 0 - file select
        // 1 - thumb show
        // 2 - loading
        var _xlist = _e._$getByClassName(this.__nfom,'js-flag');
        this.__nbtn = _xlist[0];
        this.__nimg = _xlist[1];
        this.__nldg = _xlist[2];
        _e._$file(
            this.__nbtn,{
                form:_list[1],name:'file',
                onchange:this.__onFileSelect._$bind(this)
            }
        );
        _v._$addEvent(
            this.__nfom['btn-pub'],'click',
            this.__onPublish._$bind(this)
        );
    };
    /**
     * 登录
     */
    _proModuleComment.__onLogin = function(_event){
        //_v._$stop(_event);
        
        
    };
    /**
     * 
     */
    _proModuleComment.__onFileSelect = function(_event){
        _e._$setStyle(this.__nbtn.parentNode,'display','none');
        _e._$setStyle(this.__nldg,'display','');
        this.__xform = _event.form;
        var _node = this.__xform.oid;
        if (!!_node){
            _node.name = 
                this.__copt.type==1?'mid':'pid';
            _node.value = this.__copt.oid;
        }
        this.__cache._$upload(this.__xform);
    };
    /**
     * 
     */
    _proModuleComment.__cbFileUpload = function(_json){
        this.__xform.reset();
        _e._$setStyle(this.__nbtn.parentNode,'display','');
        _e._$setStyle(this.__nldg,'display','none');
        switch(_json.code){
            case 1:
                this.__nfom.pid.value = _json.result.id;
                _e._$setStyle(this.__nimg,'display','');
                this.__nimg.src = _json.result.thumbnailURL;
            break;
            default:
                _z._$showError('文件上传失败，请稍候再试！');
            break;
        }
    };
    /**
     * 
     */
    _proModuleComment.__onPublish = function(_event){
        if (!this.__nfom.pid.value&&
            !this.__xfom._$checkValidity()) return;
        this.__cache._$addItem({
            type:'add',
        	key:'cmt-'+this.__owner.id,
        	item:this.__xfom._$data()
        });
    };
    /**
     * 
     */
    _proModuleComment.__onReply = function(_data){
        this.__cache._$addItem({
            key:'cmt-'+this.__owner.id,
            item:_data
        });
    };
    /**
     * 
     */
    _proModuleComment.__onDelete = function(_event){
        this.__wopt.ext = _event.data;
        _w._$$WindowConfirm._$allocate(this.__wopt)._$show();
    };
    /**
     * 
     */
    _proModuleComment.__onDeleteConfirm = function(_event){
        this.__lmdl._$delete(_event.ext);
    };
    /**
     * 数据加载中
     * @return {Void}
     */
    _proModuleComment.__onEmptyList = function(_event){
        _event.value = '<p class="w-message">没有评论</p>';
    };
    /**
     * 
     * @param {Object} _options
     */
    _proModuleComment.__cbItemAdd = function(_json){
    	switch(_json.ext){
    		case 1:
	    		_e._$setStyle(this.__nimg,'display','none');
		    	this.__xfom._$setValue('content','');
		    	this.__xfom._$setValue('pid','');
		    	this.__lmdl._$refresh();
		    return;
		    case -3:
		        _z._$showError('请先加入组织！');
		    return;
		    default:
		        _z._$showError('暂时无法发表评论！');
		    return;
    	}
    };
};
define('{pro}module/comment/comment.js',
      ['{pro}widget/item/comment.js'
      ,'{pro}widget/window/confirm.js'
      ,'{com}util/module/module.js'
      ,'{com}util/cache/comment.js'
      ,'{com}util/form/form.js'
      ,'{lib}util/list/module.pager.js'
      ,'{lib}util/file/select.js'],f);
