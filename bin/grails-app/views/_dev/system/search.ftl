<!DOCTYPE html>
<html>
  <head>
    <title>组织/活动搜索 - 聚否</title>
    <@head/>
    <!-- @STYLE -->
    <link href="${css_root}base.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}window.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}system/search.css" rel="stylesheet" type="text/css"/>
    <link href="/res/theme/default/style.css" rel="stylesheet" type="text/css"/>
  </head>
  <body id="www-jufou-com">
    <span class="w-top f-bg" id="www-jufou-com-top"></span>
    <@sysSearchPage user=host/>
    <@template iptable=iptable>
      <@sysSearchPageTemplate/>
    </@template>
    <#noparse>
    <!-- @DEFINE -->
    </#noparse>
    <script src="${lib_root}define.js${cfg_root}"></script>
    <script>
		define(['{pro}module/system/search.js'],
		function(){
		    var _ = NEJ.P;
		    _('mu.x')._$setup(_('mu.m.g')._$$ModuleSearch);
		});
    </script>
  </body>
</html>