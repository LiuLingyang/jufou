var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _u = _('nej.u'),
        _x = _('nej.ut'),
        _y = _('mu.x'),
        _w = _('mu.w.w'),
        _m = _('mu.ui'),
        _t = _('mu.ut'),
        _g = _('mu.m.g'),
        _p = _('mu.m.v'),
        _proModuleNewsCreate;
    /**
     * 组织首页模块
     * 
     * 
     */
    _p._$$ModuleNewsCreate = NEJ.C();
      _proModuleNewsCreate = _p._$$ModuleNewsCreate._$extend(_g._$$ModuleGroup);
    /**
     * 控件重置
     */
    _proModuleNewsCreate.__reset = function(_options){
        this.__supReset(_options);
        this.__news = _options.news||_o;
        // init content
        if (!!this.__news.id){
        	this.__eopt.content = this.__news.content
        }else{
        	delete this.__news;
        }
        this.__editor = _m._$$CustomEditor2._$allocate(this.__eopt);
        _e._$setStyle(this.__body.content,'display','none');
    };
    /**
     * 构建模块，子类重写具体业务逻辑
     * @return {Void}
     */
    _proModuleNewsCreate.__doBuild = function(){
        this.__body = _e._$get('module-x1').parentNode;
        this.__form = _t._$$WebForm._$allocate({
            form:this.__body
        });
        // init rich editor
        this.__eopt = {
            clazz:'w-rd3 bd01 wd',focus:!1,
            parent:this.__body.content.parentNode
        };
        _v._$addEvent(
            this.__body['btn-publish'],
            'click',this.__onPublish._$bind(this)
        );
        // init cache
        this.__cache = _t._$$CacheNews._$allocate({
            onnewscreate:this.__cbNewsCreate._$bind(this),
            onphotoupload:this.__cbCoverUpload._$bind(this)
        });
        // init cover
        _e._$file(
            _e._$get('news-cover').parentNode,{
                name:'file',
                clazz:'js-fom',
                onchange:this.__onCoverSelect._$bind(this)
            }
        );
        this.__lopt = {
            clazz:'w-win-e w-win-i',
            title:'新闻封面裁剪',
            size:{
                width:176,
                height:82
            },
            pbox:'news-cover',
            onok:this.__onCoverClip._$bind(this)
        };
    };
    /**
     * 
     */
    _proModuleNewsCreate.__onPublish = function(){
        if (!this.__form._$checkValidity()){
            return;
        }
        var _data = this.__form._$data();
        _data.gid = this.__group.id;
        _data.content = this.__editor._$getContent();
        if (!!this.__news){
            _data.nid = this.__news.id;
        }
        if(_data.content==0){
            	_y._$showError('请输入新闻正文');
            	return;
            }
        this.__cache._$create(_data);
    };
    /**
     * 
     * @param {Object} _options
     */
    _proModuleNewsCreate.__cbNewsCreate = function(_json){
        switch(_json.code){
            case 1:
                location.href = config.page('/news/'+_json.result.id+'/');
            return;
            case -3:
                _y._$showError('没有权限!');
            return;
            case -6:
                _y._$showError('xss攻击！');
            return;
            default:
                _y._$showError('暂时无法创建新闻！');
            return;
        }
    };
    /**
     * 
     * @param {Object} _event
     */
    _proModuleNewsCreate.__onCoverSelect = function(_event){
    	_e._$setStyle(_e._$get('news-loading'),'display','');
        if (!!this.__cvfm){
            alert('封面上传中，请稍后');
            return;
        }
        this.__cvfm = _event.form;
        this.__cache._$upload(this.__cvfm);
    };
    /**
     * 
     * @param {Object} _json
     */
    _proModuleNewsCreate.__cbCoverUpload = function(_json){
    	_e._$setStyle(_e._$get('news-loading'),'display','none');
        this.__cvfm.reset();
        delete this.__cvfm;
        switch(_json.code){
            case 1:
                this.__form._$setValue('cover_clip','');
                var _info = _json.result;
                this.__form._$setValue('cover_src',_info.original);
                var _time = '?'+(+new Date);
                //_e._$get('meeting-cover').src = _info.original+_time;
                this.__lopt.url = _info.original+_time;
                _w._$$ImageClipper._$allocate(this.__lopt)._$show();
            return;
            default:
                _y._$showError('暂时无法上传封面！');
            return;
        }
    };
    /**
     * 
     * @param {Object} _event
     */
    _proModuleNewsCreate.__onCoverClip = function(_event){
        var _clip = _event.clip,
            _ratio = _clip.scale,
            _info = {
                top:Math.floor(_clip.top/_ratio),
                left:Math.floor(_clip.left/_ratio),
                width:Math.floor(_clip.width/_ratio),
                height:Math.floor(_clip.height/_ratio)
            };
        this.__form._$setValue('cover_clip',JSON.stringify(_info));
    };
};
define('{pro}module/news/create.js',
      ['{patch}json.js'
      ,'{pro}module/common/group.js'
      ,'{pro}widget/editor/editor2.js'
      ,'{pro}widget/window/image.clipper.js'
      ,'{com}util/cache/news.js'
      ,'{com}util/form/form.js'],f);