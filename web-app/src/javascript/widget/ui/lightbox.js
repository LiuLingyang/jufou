/*
 * ------------------------------------------
 * UI控件基类实现文件
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 * ------------------------------------------
 */
var f = function(){
    // variable declaration
    var _  = NEJ.P,
        _o = NEJ.O,
        _f = NEJ.F,
        _e = _('nej.e'),
        _u = _('nej.u'),
        _i = _('nej.ui'),
        _p = _('mu.i'),
        _proLightBox;
    if (!!_p._$$LightBox) return;
    // html seed
    var _seed_html = _e._$addNodeTemplate('\
        <table class="w-lightbx">\
          <tr><td>\
            <img class="j-flag"/>\
            <span class="prv">上一张</span>\
            <span class="nxt">下一张</span>\
            <span class="cls w-rd5p j-flag">×</span>\
          </td></tr>\
        </table>\
    ');
    /**
     * UI控件基类，框架及项目中所有涉及UI的控件均继承此类
     * 
     * @class   {nej.ui._$$LightBox}
     * @extends {nej.ui._$$Abstract}
     * @param   {String}               控件样式
     * @param   {String|Node|Function} 控件所在容器节点或者追加控件节点执行函数
     */
    _p._$$LightBox = NEJ.C();
      _proLightBox = _p._$$LightBox._$extend(_i._$$Abstract);
    /**
     * 控件重置
     * @protected
     * @method {__reset}
     * @param  {Object} 可选配置参数
     * @return {Void}
     */
    _proLightBox.__reset = function(_options){
        this.__supReset(_options);
        this.__list = _options.list||[];
        
    };
    /**
     * 控件销毁
     * @protected
     * @method {__destroy}
     * @return {Void}
     */
    _proLightBox.__destroy = function(){
        this.__supDestroy();
        
    };
    /**
     * 初始化外观信息，子类实现具体逻辑
     * @protected
     * @method {__initXGui}
     * @return {Void}
     */
    _proLightBox.__initXGui = function(){
        this.__seed_html = _seed_html;
    };
    /**
     * 初始化节点，子类重写具体逻辑
     * @protected
     * @method {__initNode}
     * @return {Void}
     */
    _proLightBox.__initNode = function(){
        this.__supInitNode();
        var _list = _e._$getByClassName(this.__body,'j-flag');
    };
    
};
NEJ.define('{pro}ui/lightbox.js',
          ['{lib}ui/base.js'],f);