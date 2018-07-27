<!DOCTYPE html>
<html>
  <head>
    <title>聚否</title>
    <@head/>
    <!-- @STYLE -->
    <link href="${css_root}base.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}window.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}system/home.css" rel="stylesheet" type="text/css"/>
    <link href="/res/theme/default/style.css" rel="stylesheet" type="text/css"/>
  </head>
  <body id="www-jufou-com">
    <@sysHomePage user=host 
                  events=events
                  groups=recGroups 
                  times=recStartTimes/>
    <@template host=host iptable=iptable>
      <@sysHomePageTemplate/>
    </@template>
    <#noparse>
    <!-- @DEFINE -->
    </#noparse>
    <script src="${lib_root}define.js${cfg_root}"></script>
    <script>
		define(['{pro}module/system/home.js'],
		function(){
		    var _ = NEJ.P;
		    _('mu.x')._$setup(_('mu.m.g')._$$ModuleIndex);
		});
    </script>
  </body>
</html>