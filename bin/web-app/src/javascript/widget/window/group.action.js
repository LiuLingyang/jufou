var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _v = _('nej.v'),
        _u = _('nej.u'),
        _i = _('nej.ui'),
        _p = _('mu.w.w'),
        _proCardGroupAction;
    /**
     * 窗体控件基类
     * 
     */
    _p._$$CardGroupAction = NEJ.C();
      _proCardGroupAction = _p._$$CardGroupAction._$extend(_i._$$CardWrapper);
    /**
     * 控件重置
     */
    _proCardGroupAction.__reset = (function(){
        var _menu = {
            3: [{text:'创建活动',href:'/{group}/meeting/create/'},
                {text:'组织设置',href:'/{group}/setting/'},
                {text:'消息设置',href:'/{group}/setting/message/'},
                {text:'个人名片',href:'/{group}/member/{uid}/'},
                {text:'群发消息',href:'/{group}/inform/'}],
            1: [{text:'个人名片',href:'/{group}/member/{uid}/'},
                {text:'消息设置',href:'/{group}/setting/message/'}/*,
                {text:'联系组织',acion:'contact'}*/]
        };
        _menu[2] = _menu[1];
        var _reg = /\{(.*?)\}/g;
        var _doMerge = function(_string,_map){
            return (_string||'').replace(_reg,function($1,$2){
                return _map[$2]||$1;
            });
        };
        return function(_options){
            _options.clazz = 'w-crd-0';
            this.__supReset(_options);
            this.__host = _options.host||_o;
            this.__group = _options.group||_o;
            var _arr = [],
                _conf = {
                    uid:this.__host.id,
                    group:this.__group.homepage||'group'
                };
            _u._$forEach(
                _menu[_options.relation||1],
                function(_item){
                    _arr.push('<a class="mix"');
                    if (!!_item.href){
                        _arr.push('href="'+_doMerge(_item.href,_conf)+'"');
                    }else{
                        _arr.push('href="#" data-action="'+_item.action+'"');
                    }
                    _arr.push('>'+_item.text+'</a>');
                }
            );
            this.__body.innerHTML = _arr.join(' ');
        };
    })();
    /**
     * 
     */
    _proCardGroupAction.__initNode = function(){
        this.__supInitNode();
        _v._$addEvent(
            this.__body,'click',
            this.__onAction._$bind(this)
        );
    };
    /**
     * 
     */
    _proCardGroupAction.__onAction = function(_event){
        var _node = _v._$getElement(_event),
            _action = _e._$dataset(_node,'action');
        if (!_action){
            location.href = _node.href;
            return;
        } 
        var _event = {};
        this._$dispatchEvent('onaction',_event);
        _node.href = '/'+_event.group.homepage+'/';
    };
};
define('{pro}widget/window/group.action.js',
      ['{lib}ui/layer/card.wrapper.js'],f);
