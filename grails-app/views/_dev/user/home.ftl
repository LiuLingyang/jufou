<!DOCTYPE html>
<html>
  <head>
    <title>${host.nickname}  - 聚否</title>
    <@head/>
    <!-- @STYLE -->
    <link href="${css_root}base.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}window.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}user/home.css" rel="stylesheet" type="text/css"/>
    <link href="/res/theme/default/style.css" rel="stylesheet" type="text/css"/>
  </head>
  <body id="www-jufou-com">
    <@userPageHome user=host/>
    <@template host=host iptable=iptable>
      <@groupHomeTemplate/>
      <@groupMeetingStateTemplate/>
      <@userPageHomeTemplate/>
    </@template>
    <#noparse>
    <!-- @DEFINE -->
    </#noparse>
    <script src="${lib_root}define.js${cfg_root}"></script>
    <script>
        define(['{pro}module/user/home.js'],
        function(){
            var _ = NEJ.P;
            _('mu.x')._$setup(
                _('mu.m.u')._$$ModuleUserHome);
        });
    </script>
  </body>
</html>