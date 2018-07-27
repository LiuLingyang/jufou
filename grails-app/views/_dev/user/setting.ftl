<!DOCTYPE html>
<html>
  <head>
    <title>设置 - 聚否</title>
    <@head/>
    <!-- @STYLE -->
    <link href="${css_root}base.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}window.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}user/setting.css" rel="stylesheet" type="text/css"/>
    <link href="/res/theme/default/style.css" rel="stylesheet" type="text/css"/>
  </head>
  <body id="www-jufou-com">
    <@userPageSetting user=host/>
    <@template host=host iptable=iptable>
      <@userPageSettingTemplate user=host host=user/>
    </@template>
    <#noparse>
    <!-- @DEFINE -->
    </#noparse>
    <script src="${lib_root}define.js${cfg_root}"></script>
    <script>
        define(['{pro}module/user/setting/frame.js'
               ,'{pro}module/user/setting/profile.js'
               ,'{pro}module/user/setting/message.js'
               ,'{lib}util/dispatcher/dispatcher.2.js'],
        function(){
            var _  = NEJ.P,
                _e = _('nej.e'),
                _x = _('nej.ut'),
                _p = _('mu.m.u');
            window.dispatcher = _x._$$Dispatcher
                ._$getInstance()
                ._$rule('rewrite',{
                    '404':'/m/0/',
                    '/m/0/':'profile',
                    '/m/1/':'message'
                })._$regist({
                    '/m':_p._$$ModuleSettingFrame,
                    '/m/0/':_p._$$ModuleSettingProfile,
                    '/m/1/':_p._$$ModuleSettingMessage
                });
            _e._$parseTemplate('template-box');
            dispatcher._$active();
        });
    </script>
  </body>
</html>