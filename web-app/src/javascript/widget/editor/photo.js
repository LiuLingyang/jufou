/*
 * ------------------------------------------
 * 插入图片执行命令封装实现文件
 * @version  1.0
 * @author   genify(caijf@corp.netease.com)
 * ------------------------------------------
 */
var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _t = _('nej.ut'),
        _x = _('mu.ut'),
        _w = _('mu.w.w'),
        _p = _('mu.ut.cmd'),
        _proPhoto;
    if (!!_p._$$Photo) return;
    /**
     * 插入图片执行命令封装
     * @extends {nej.ut._$$EditorCommand}
     * @param   {Object} 可选配置参数，已处理参数列表如下
     */
    _p._$$Photo = NEJ.C();
      _proPhoto = _p._$$Photo._$extend(_t._$$EditorCommand);
    /**
     * 命令名称
     * @type String
     */
    _p._$$Photo.command = 'photo';
    /**
     * 
     */
    _proPhoto.__init = function(){
        this.__supInit();
        this.__wopt = {
            title:'插入图片',
            destroyable:!0,
            onok:this.__onFileChange._$bind(this)
        };
        this.__cache = _x._$$CacheMeeting._$allocate({
            onphotoupload:this.__cbPhotoUpload._$bind(this)
        });
    };
    /**
     * 
     */
    _proPhoto.__onFileChange = function(_event){
        this.__cache._$upload(_event);
    };
    /**
     * 
     */
    _proPhoto.__cbPhotoUpload = function(_json){
        if (_json.code==1){
            this.__win._$hide();
            var _result = _json.result||_o;
            this.__editor._$execCommand('inserthtml','<a href="'+_result.original+'" target="_blank"><img src="'+_result.original+'"/></a>');
            return;
        }
        alert('无法上传图片，请稍后再试！');
    };
    /**
     * 
     */
    _proPhoto._$execute = function(_options){
        this.__win = _w._$$WindowPhotoUpload._$allocate(this.__wopt);
        this.__win._$show();
    };
    // regist command implemention
    _p._$$Photo._$regist();
};
define('{pro}widget/editor/photo.js',
      ['{lib}util/editor/command.js'
      ,'{com}util/cache/meeting.js'
      ,'{pro}widget/window/photo.upload.js'],f);