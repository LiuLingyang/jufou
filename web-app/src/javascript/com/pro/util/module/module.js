var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _t = _('nej.ut'),
        _p = _('mu.ut'),
        _proModule,
        _supModule;
    /**
     * 模块基类对象
     * 
     * @class   {mu.ut._$$Module}
     * @extends {nej.ut._$$Module}
     * 
     */
    _p._$$Module = NEJ.C();
      _proModule = _p._$$Module._$extend(_t._$$Module);
      _supModule = _p._$$Module._$supro;
    /**
     * 
     * @param {Object} _options
     */
    _proModule.__reset = function(_options){
        this.__supReset(_options);
        this.__host  = _options.host||_o;
        this.__group = _options.group||_o;
        this.__iptable = _options.iptable;
        if (!!this.__iptable){
            this.__iptable.area = this.__iptable.district;
        }
    };
    /**
     * 
     */
    _proModule.__onShow = function(_options){
        _supModule.__onShow.apply(this,arguments);
        this.__onRefresh(_options);
    };
    /**
     * 
     */
    _proModule.__onHide = function(){
        _e._$removeByEC(this.__body);
        _supModule.__onHide.apply(this,arguments);
    };
};
define('{com}util/module/module.js',
      ['{com}util/api.js'
      ,'{lib}util/dispatcher/module.2.js'],f);
