var f = function(){
    var _  = NEJ.P,
        _o = NEJ.O,
        _u = _('nej.u'),
        _j = _('nej.j'),
        _p = _('mu.ut'),
        _proCacheUser;
    /**
     * 用户缓存对象
     * 
     * @class   {mu.ut._$$CacheUser}
     * @extends {mu.ut._$$Cache}
     * 
     * @param   {Object} 配置信息
     * @config  {Object} user 当前登录用户
     * 
     * [hr]
     * 注册回调
     * @event   {onregist}
     * @param   {Object} 注册结果
     * 
     * [hr]
     * 登录回调
     * @event   {onlogin}
     * @param   {Object} 登录用户信息
     * 
     * [hr]
     * 密码邮件发送回调
     * @event   {onpassword}
     * @param   {Object} 邮件发送结果信息
     * 
     * [hr]
     * 更新头像回调
     * @event   {onportraitupdate}
     * @param   {Object} 头像更新结果信息
     * 
     * [hr]
     * 更新密码回调
     * @event   {onpasswordupdate}
     * @param   {Object} 密码更新结果信息
     * 
     * [hr]
     * 更新基本信息回调
     * @event   {oninfoupdate}
     * @param   {Object} 基本信息更新结果信息
     * 
     * [hr]
     * 手机绑定回调
     * @event   {onmobileupdate}
     * @param   {Object} 手机绑定结果信息
     * 
     * [hr]
     * 取用户参加的活动，但没有得到回复的活动列表
     * @event	{noreplyedActivities}
     * 
     * [hr]
     * 取用户参加的活动列表
     * @event	{onattendedactivities}
     * 
     * [hr]
     * 取用户参加的活动列表（一种活动是参加的，一种是参加而没有回复的）
     * @event	{ongetgroupactivityes}
     * 
     * [hr]
     * 取已经结束的活动列表
     * @event	{ongetendedgroupactivities}
     * 
     * [hr]
     * 退出组织
     * @event	{oncancelgroup}
     * 
     * [hr]
     * 解散组织
     * @event	{ondismissgroup}
     * 
     * [hr]
     * 取组织调置
     * @event	{ongetgroupsetting}
     * 
     * [hr]
     * 保存组织调置
     * @event	{onsavesetting}
     * 
     * [hr]
     * 取消息
     * @event	{ongetmessage}
     * 
     * [hr]
     * 取群通知
     * @event	{ongetnote}
     * 
     * [hr]
     * 重新发送激活邮件
     * @event	{resendemail}
     */
    
    _p._$$CacheUser = NEJ.C();
      _proCacheUser = _p._$$CacheUser._$extend(_p._$$Cache);
    /**
     * 控件重置
     * @param  {Object} 配置信息
     * @return {Void} 
     */
    _proCacheUser.__reset = function(_options){
        this.__supReset(_options);
        this.__setDataInCache('user',_options.user||{});
    };
    /**
     * 取当前登录用户信息
     * @return {Object} 当前登录用户信息
     */
    _proCacheUser._$getUserInCache = function(){
        return this.__getDataInCache('user');
    };
    /**
     * 批量用户信息更新回调函数
     * @param  {String} 回调名称
     * @param  {Object} 操作结果
     * @return {Void}
     */
    _proCacheUser.__cbBatchUserInfoUpdate = function(_name,_result){
        if (_result.code>0){
            var _user = this._$getUserInCache();
            NEJ.X(_user,_result.result);
        }
        this._$dispatchEvent(_name,_result);
    };
    /**
     * 单个用户信息更新回调函数
     * @param  {String} 回调名称
     * @param  {Object} 操作结果
     * @return {Void}
     */
    _proCacheUser.__cbSingleUserInfoUpdate = function(_name,_key,_result){
        if (_result.code>0)
            this._$getUserInCache()[_key] = _result.result;
        this._$dispatchEvent(_name,_result);
    };
    /**
     * 更新出错回调函数
     * @param  {String} 回调名称
     * @param  {Object} 操作结果
     * @return {Void}
     */
    _proCacheUser.__cbErrorUserInfoUpdate = function(_name,_error){
        this._$dispatchEvent(_name,{
            code:0,
            result:_error
        });
    };
    /**
     * 注册用户
     * @param  {Object} 用户信息
     * @return {Void}
     */
    _proCacheUser._$regist = function(_user){
        _j._$request('/rest/user/regist',{
            type:'json',
            method:'POST',
            data:_u._$object2query(_user),
            onload:this._$dispatchEvent._$bind(this,'onregist'),
            onerror:this.__cbErrorUserInfoUpdate._$bind(this,'onregist')
        });
    };
    /**
     * 用户登录
     * @param  {Object} 用户信息
     * @return {Void}
     */
    _proCacheUser._$login = function(_user){
        _j._$request('/rest/user/login',{
            type:'json',
            method:'POST',
            data:_u._$object2query(_user),
            onload:this.__cbBatchUserInfoUpdate._$bind(this,'onlogin'),
            onerror:this.__cbErrorUserInfoUpdate._$bind(this,'onlogin')
        });
    };
    /**
     * 验证用户名是否存在
     * @return {Void}
     */
    _proCacheUser._$exist = function(_username){
        _j._$request('/rest/user/exist',{
            type:'json',
            method:'POST',
            data:_u._$object2query({username:_username}),
            onload:this.__cbBatchUserInfoUpdate._$bind(this,'oncheck'),
            onerror:this.__cbErrorUserInfoUpdate._$bind(this,'oncheck')
        });
    };
    /**
     * 找回密码
     * @param  {String} 邮箱地址
     * @return {Void}
     */
    _proCacheUser._$password = function(_email,_captcha){
        _j._$request('/rest/user/retrieve',{
            type:'json',
            method:'POST',
            data:'email='+encodeURIComponent(_email)+'&captcha='+encodeURIComponent(_captcha),
            onload:this._$dispatchEvent._$bind(this,'onpassword'),
            onerror:this._$dispatchEvent._$bind(this,'onpassword',_o)
        });
    };
    /**
     * 更新头像
     * @param  {HTMLFormElement} 带头像文件的表单
     * @return {Void}
     */
    _proCacheUser._$updatePortrait = function(_form){
        _form.action = '/rest/user/portrait';
        _j._$upload(_form,{
            type:'json',
            onload:this.__cbBatchUserInfoUpdate._$bind(this,'onportraitupdate'),
            onerror:this.__cbErrorUserInfoUpdate._$bind(this,'onportraitupdate')
        });
    };
    /**
     * 裁剪头像
     */
    _proCacheUser._$clipPortrait = function(_data){
        _j._$request('/rest/user/clipPortrait',{
            type:'json',
            method:'POST',
            data:_u._$object2query(_data),
            onload:this._$dispatchEvent._$bind(this,'onportraitclip'),
            onerror:this._$dispatchEvent._$bind(this,'onportraitclip',_o)
        });
    };
    /**
    /**
     * 更新密码
     * @param  {String} 新密码
     * @return {Void}
     */
    _proCacheUser._$updatePassword = function(_password){
        _j._$request('/rest/user/password',{
            type:'json',
            method:'POST',
            data:_u._$object2query(_password),
            onload:this._$dispatchEvent._$bind(this,'onpasswordupdate'),
            onerror:this.__cbErrorUserInfoUpdate._$bind(this,'onpasswordupdate')
        });
    };
    /**
     * 修改用户基本信息
     * @param  {Object} 用户信息
     * @return {Void}
     */
    _proCacheUser._$updateInfo = function(_user){
        _j._$request('/rest/user/profile',{
            type:'json',
            method:'POST',
            data:_u._$object2query(_user),
            onload:this.__cbBatchUserInfoUpdate._$bind(this,'oninfoupdate'),
            onerror:this.__cbErrorUserInfoUpdate._$bind(this,'oninfoupdate')
        });
    };
    /**
     * 绑定手机号码
     * @param  {String} 手机号码
     * @param  {String} 验证码
     * @return {Void}
     */
    _proCacheUser._$updateMobile = function(_data){
        _j._$request('/rest/user/mobile',{
            type:'json',
            method:'POST',
            data:_u._$object2query(_data),
            onload:this.__cbBatchUserInfoUpdate._$bind(this,'onmobileupdate'),
            onerror:this.__cbErrorUserInfoUpdate._$bind(this,'onmobileupdate')
        });
    };
    /**
     * 发送手机验证码
     * @param  {String} 手机号码
     * @return {Void}
     */
    _proCacheUser._$sendCaptcha = function(_mobile){
        _j._$request('/rest/open/user/sendCaptcha',{
            type:'json',
            method:'POST',
            data:'mobile='+encodeURIComponent(_mobile),
            onload:this._$dispatchEvent._$bind(this,'onsendcaptcha'),
            onerror:this._$dispatchEvent._$bind(this,'onsendcaptcha',_o)
        });
    };
    /**
     * 重新发送激活邮件
     * @param {String}  _email
     * @return {Void}
     */
    _proCacheUser._$sendEmail = function(_data){
        _j._$request('/rest/open/user/resendemail',{
            type:'json',
            method:'POST',
            data:_u._$object2query(_data),
            onload:this._$dispatchEvent._$bind(this,'onresendemail'),
            onerror:this._$dispatchEvent._$bind(this,'onresendemail',_o)
        });
    };
    /**
     * 重置密码
     * @param {String} 
     * @return {Void}
     */
    _proCacheUser._$reset = function(_data){
        _j._$request('/rest/open/user/reset',{
            type:'json',
            method:'POST',
            data:_u._$object2query(_data),
            onload:this._$dispatchEvent._$bind(this,'onreset'),
            onerror:this._$dispatchEvent._$bind(this,'onreset',_o)
        });
    };
    
    _proCacheUser._$updateHideJoinGroup = function(_data){
        _j._$request('/rest/user/hideJoinedGroup',{
            type:'json',
            method:'POST',
            data:_u._$object2query(_data),
            onload:this._$dispatchEvent._$bind(this,'onhidejoinedgroup'),
            onerror:this._$dispatchEvent._$bind(this,'onhidejoinedgroup',_o)
        });
    };
    
    _proCacheUser._$getSNSList = function(){
        // for test
        //this._$dispatchEvent('onsnsload',_o);
        //return;
        _j._$request('/rest/binding/sns',{
            type:'json',
            method:'POST',
            onload:this._$dispatchEvent._$bind(this,'onsnsload'),
            onerror:this._$dispatchEvent._$bind(this,'onsnsload',_o)
        });
    };
    
    _proCacheUser._$deleteBinding = function(_type){
        _j._$request('/rest/binding/delete',{
            type:'json',
            method:'POST',
            data:'type='+_type,
            onload:this._$dispatchEvent._$bind(this,'ondeletebinding',_type),
            onerror:this._$dispatchEvent._$bind(this,'ondeletebinding',_type,_o)
        });
    };
    
    _proCacheUser._$share = function(_data){
        _j._$request('/rest/binding/share',{
            type:'json',
            method:'POST',
            data:_u._$object2query(_data),
            onload:this._$dispatchEvent._$bind(this,'onshare',_data),
            onerror:this._$dispatchEvent._$bind(this,'onshare',_data,_o)
        });
    };
};
define('{com}util/cache/user.js',
      ['{com}util/cache/cache.js'],f);
