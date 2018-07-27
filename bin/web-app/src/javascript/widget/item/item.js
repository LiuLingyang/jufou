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
        _i = _('nej.ui'),
        _p = _('mu.w.i'),
        _proItem;
    /**
     * 评论列表项
     * @class   评论列表项
     * @extends {nej.ui._$$Item}
     * @param   {Object} _options 可选配置参数，已处理参数列表如下
     *                            
     */
    _p._$$Item = NEJ.C();
      _proItem = _p._$$Item._$extend(_i._$$ListItem);
    /**
     * 重置选项 
     */
    _proItem.__reset = function(_options) {
        this.__host = _options.host||_o;
        this.__group = _options.group||_o;
        this.__supReset(_options);
    };
};
define('{pro}widget/item/item.js',
      ['{lib}ui/item/list.js'],f);