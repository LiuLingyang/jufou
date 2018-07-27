<!DOCTYPE html>
<html>
  <head>
    <title>消息 - 聚否</title>
    <@head/>
    <!-- @STYLE -->
    <link href="${css_root}base.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}window.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}user/message.css" rel="stylesheet" type="text/css"/>
    <link href="/res/theme/default/style.css" rel="stylesheet" type="text/css"/>
  </head>
  <body id="www-jufou-com">
    <@userPageMessage user=host/>
    <@template host=host iptable=iptable>
      <@userPageMessageTemplate/>
    </@template>
    <#noparse>
    <!-- @DEFINE -->
    </#noparse>
    <script src="${lib_root}define.js${cfg_root}"></script>
    <script>
		define(['{pro}module/user/message/frame.js'
               ,'{pro}module/user/message/meeting.js'
               ,'{pro}module/user/message/comment.js'
               ,'{pro}module/user/message/inform.js'
               ,'{pro}module/user/message/system.js'
               ,'{pro}module/user/message/private.js'
               ,'{lib}util/dispatcher/dispatcher.2.js'],
		function(){
		    var _  = NEJ.P,
		        _e = _('nej.e'),
		        _x = _('nej.ut'),
		        _p = _('mu.m.u');
            window.dispatcher = _x._$$Dispatcher
                ._$getInstance()
                ._$rule('rewrite',{
                    '404':'/m/1/',
                    '/m/1/':'/meeting/',
                    '/m/2/':'/comment/',
                    '/m/3/':/^\/inform/,
                    '/m/4/':'/system/',
                    '/m/5/':'/private/'
                })._$regist({
                    '/m':_p._$$ModuleMessageFrame,
                    '/m/1/':_p._$$ModuleMessageMeeting,
                    '/m/2/':_p._$$ModuleMessageComment,
                    '/m/3/':_p._$$ModuleMessageInform,
                    '/m/4/':_p._$$ModuleMessageSystem,
                    '/m/5/':_p._$$ModuleMessagePrivate
                });
            _e._$parseTemplate('template-box');
            dispatcher._$active();
		});
    </script>
  </body>
</html>