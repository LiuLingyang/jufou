var f = function(){
    var _  = NEJ.P,
        _t = _('nej.ut'),
        _p = _('mu.ut'),
        _proWebForm;
    /**
     * 项目表单验证封装
     * 
     * 
     *  
     */
    _p._$$WebForm = NEJ.C();
      _proWebForm = _p._$$WebForm._$extend(_t._$$WebForm);
    /**
     * 
     * @param {Object} _options
     */
    _proWebForm.__reset = function(_options){
        _options.tip = 'js-tip fc06';
        _options.pass = 'js-pass f-bg';
        _options.error = 'js-error fc03';
        _options.invalid = 'js-invalid bd05';
        this.__supReset(_options);
    };
    
};
define('{com}util/form/form.js',
      ['{lib}util/form/form.js'],f);
