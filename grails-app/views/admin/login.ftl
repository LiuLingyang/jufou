<!DOCTYPE html>
<html>
  <head>
    <title>管理员登录 - 聚否</title>
    <meta charset="utf-8"/>
    <!-- @STYLE -->
    <style>
    .wrp{width:980px;margin:60px auto;}
    .adm{margin:30px 0;font-size:30px;font-weight:bold;}
    table{width:100%;table-layout:fixed;}
    table td{padding:15px 5px;}
    table .c0{width:60px;font-size:14px;}
    table .txt{padding:5px;width:200px;}
    .log{width:120px;height:30px;line-height:30px;font-size:14px;font-weight:bold;background:#9dca7f;border:1px solid #80AB62;color:#fff;cursor:pointer;}
    </style>
  </head>
  <body id="www-jufou-com">
    <div class="wrp">
      <p class="adm">管理员登录</p>
      <form class="w-fom" id="fom">
	    <table>
	      <tr><td class="c0">账　号</td>
	          <td class="c1"><input type="text" name="username" class="txt"/></td></tr>
	      <tr><td class="c0">密　码</td><td class="c1"><input type="password" name="password" class="txt"/></td></tr>
	      <tr><td>&nbsp;</td><td><input type="button" name="btn-ok" value="登录" class="log"/></td></tr>
	    </table>
      </form>
    </div>
    <script src="/src/javascript/com/lib/define.js?pro=/src/javascript/&com=/src/javascript/com/pro/"></script>
    <script>
		define(['{lib}base/event.js'
			   ,'{lib}util/ajax/xdr.js'
			   ,'{lib}util/form/form.js'
			   ,'{lib}util/encode/sha.md5.js'],
		function(){
		    var _  = NEJ.P,
		        _o = NEJ.O,
		        _e = _('nej.e'),
		        _v = _('nej.v'),
		        _u = _('nej.u'),
		        _y = _('nej.ut'),
		        _j = _('nej.j'),
		        _x = _('mu.x'),
		        _t = _('mu.ut'),
		        _p = _('mu.m.u');
		    
		    //web form
		    var _form=_y._$$WebForm._$allocate({
        		form:"fom"
    		});
		        
		    //提交表单
		    var _doSubmit=function(){
		        if(_form._$checkValidity()){
		            var _data=_form._$data();
		            _data.password = _u._$md52hex(_data.password);
		            _j._$request('/rest/admin/login',{
		                method:'POST',
		                type:'json',
		                data:'username='+_data.username+'&password='+_data.password,
		                onload:function(_json){
		                    switch(_json.code){
		                        case 1:
		                            location.href = '/admin/group/';
		                            return;
		                        default:
					                alert('暂时无法登录，请稍候再试');
					            return;
		                    }
		                }
		            })
		        }
		    };
		    
		    //添加事件
		     _v._$addEvent(_form._$get('btn-ok'),'click',_doSubmit);
    });
    </script>
  </body>
</html>