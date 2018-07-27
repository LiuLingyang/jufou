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
        _proItemSetting;
    /**
     * 评论列表项
     * @class   评论列表项
     * @extends {nej.ui._$$Item}
     * @param   {Object} _options 可选配置参数，已处理参数列表如下
     *                            
     */
    _p._$$ItemSetting = NEJ.C();
      _proItemSetting = _p._$$ItemSetting._$extend(_p._$$Item);
    /**
     * 
     */
    _proItemSetting.__destroy = function() {
        this._$dispatchEvent('onbeforerecycle');
        this.__supDestroy();
    };
    /**
     * 初始化模版
     */
    _proItemSetting.__initXGui = function() {
        this.__seed_html = 'ntp-message-item';
    };
    /**
     * 初始化节点
     */
    _proItemSetting.__initNode = function(){
        this.__supInitNode();
        // 0 - group logo
        // 1 - setting button
        // 2 - group name
        // 3 - user role in group
        // 4 - action box
        var _list = _e._$getByClassName(this.__body,'js-flag');
        this.__nlogo = _list[0];
        this.__nbutn = _list[1];
        this.__nname = _list[2];
        this.__nrole = _list[3];
        this.__nbact = _list[4];
        _v._$addEvent(
            this.__nbutn,'click',
            this.__onSetting._$bind(this)
        );
        _v._$addEvent(
            this.__nbact,'click',
            this.__onAction._$bind(this)
        );
    };
    /**
     * 刷新项,子类实现具体逻辑
     * @protected
     * @method {__doRefresh}
     * @return {Void}
     */
    _proItemSetting.__doRefresh = (function(){
        var _title = ['会员','管理员','组织者'];
        return function(_data){
            this.__nlogo.src = _data.thumbnail||config.url.logo;
            this.__nname.innerText = _data.name||'组织名称';
            this.__nname.href = '/'+_data.homepage+'/';
            var _role = (_data.role||1)-1;
            this.__nrole.innerText = _title[_role];
            _e._$renderHtmlTemplate(
                this.__nbact,
                'jst-message-item-action',
                {admin:_role>=2}
            );
        };
    })();
    /**
     * 
     */
    _proItemSetting.__onSetting = function(_event){
        this._$dispatchEvent('onsetting',{
            id:this._$getId(),
            data:this._$getData(),
            body:this._$getBody()
        });
    };
    /**
     * 
     * @param {Object} _event
     */
    _proItemSetting.__onAction = function(_event){
        var _node = _v._$getElement(_event,'d:action');
        if (!_node) return;
        _v._$stop(_event);
        this._$dispatchEvent(
            'on'+_e._$dataset(_node,'action'),{
                id:this._$getId(),
                data:this._$getData()
            }
        );
    };
};
define('{pro}widget/item/setting.js',
      ['{pro}widget/item/item.js'],f);