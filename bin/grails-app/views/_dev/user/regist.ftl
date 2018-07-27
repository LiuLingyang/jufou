<!DOCTYPE html>
<html>
  <head>
    <title>注册 - 聚否</title>
    <@head/>
    <!-- @STYLE -->
    <link href="${css_root}base.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}window.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}user/regist.css" rel="stylesheet" type="text/css"/>
    <link href="/res/theme/default/style.css" rel="stylesheet" type="text/css"/>
  </head>
  <body id="www-jufou-com">
    <@userPageRegist user=host/>
    <@template host=host iptable=iptable>
      <@userPageRegistTemplate/>
    </@template>
    <#noparse>
    <!-- @DEFINE -->
    </#noparse>
    <script src="${lib_root}define.js${cfg_root}"></script>
    <script>
	    define(['{lib}util/dispatcher/dispatcher.2.js'
		       ,'{pro}module/user/regist/frame.js'
               ,'{pro}module/user/regist/email.js'
		       ,'{pro}module/user/regist/phone.js'],
		function(){
		    var _  = NEJ.P,
		        _e = _('nej.e'),
		        _m = _('mu.m.u');
		    _e._$startup({
		        rules:{
		            rewrite:{
		                '404':'/regist/email/',
		                '/regist/email/':'/email/',
		                '/regist/phone/':'/phone/'
		            }
		        },
		        modules:{
		            '/regist':_m._$$ModuleRegistFrame,
		            '/regist/email/':_m._$$ModuleRegistEmail,
		            '/regist/phone/':_m._$$ModuleRegistPhone
		        }
		    });
		});
    </script>
  </body>
</html>