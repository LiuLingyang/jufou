var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _e = _('nej.e'),
        _u = _('nej.u'),
        _i = _('mu.ui'),
        _p = _('mu.w.w'),
        _proWindowContactImport;
    // html code
    var _seed_html = _e._$addNodeTemplate('\
        <form class="w-fom">\
          <table class="xtb">\
            <tr><td class="c0"><input type="radio" checked="checked" id="type"/></td>\
                <td class="c1">\
                  <p class="ln"><label for="type">导入Excel格式的联系人列表</label></p>\
                  <p class="ln ln1 fc00">请将联系人存储为右边的格式</p>\
                  <p class="ln fc00">第一行为姓名、邮箱、手机号码的文字描述</p>\
                  <div class="act">\
                    <label class="w-rd3 btn btn-y js-flag">上传文件</label>\
                    <p class="ln2 fc01 js-flag" style="visibility:hidden;">错误提示信息</p>\
                  </div>\
                </td>\
                <td class="c2"><img src="/res/test/contact.png"/></td></tr>\
          </table>\
          <div class="xbtn f-cb">\
            <input type="button" class="fl w-rd3 btn btn-c" name="btn-cc" value="取  消"/>\
            <input type="button" class="fl w-rd3 btn btn-k" name="btn-ok" value="确  定"/>\
          </div>\
        </form>');
    /**
     * 窗体控件基类
     * 
     */
    _p._$$WindowContactImport = NEJ.C();
      _proWindowContactImport = _p._$$WindowContactImport._$extend(_i._$$Window);
    /**
     * 控件重置
     */
    _proWindowContactImport.__reset = function(_options){
        _options.title = '导入联系人';
        _options.clazz = 'w-win-6';
        this.__supReset(_options);
    };
    /**
     * 初始化外观
     */
    _proWindowContactImport.__initXGui = function(){
        this.__seed_html = _seed_html;
    };
    /**
     * 
     */
    _proWindowContactImport.__initNode = function(){
        this.__supInitNode();
        // 0 - file select
        // 1 - error tip
        var _list = _e._$getByClassName(this.__body,'js-flag');
        this.__ntip = _list[1];
        _e._$file(_list[0],{
            onchange:this.__onChangeFile._$bind(this)
        });
    };
    /**
     * 
     */
    _proWindowContactImport.__onChangeFile = function(_event){
        this.__extdata = _event.form;
        _e._$get(_event.id).name = 'contact';
        _e._$setStyle(this.__ntip,'visibility','hidden');
    };
    /**
     * 
     */
    _proWindowContactImport._$message = function(_msg){
        this.__ntip.innerText = _msg||'未知异常';
        _e._$setStyle(this.__ntip,'visibility','');
    };
};
define('{pro}widget/window/contact.import.js',
      ['{com}ui/window/window.js'
      ,'{lib}util/file/select.js'],f);
