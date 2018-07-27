<!DOCTYPE html>
<html>
  <head>
    <title>${group.name} - 校分会 - 聚否</title>
    <@head/>
    <!-- @STYLE -->
    <link href="${css_root}base.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}group.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}window.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}group/sub.css" rel="stylesheet" type="text/css"/>
    <@theme/>
  </head>
  <body id="www-jufou-com">
    <@groupBody group=group
        options={
          "index":-1,
          "user":host!{},
          "groups":otherGroups,
          "relationship":relationship!0,
          "photoCount":photoCount!0,
          "pastCount":pastCount!0,
          "upcomingCount":upcomingCount!0
        }>
      <div class="l-lmc f-cb group-sub">
        <@messagebox/>
        <@groupSub group=group relation=relationship/>
      </div>
    </@groupBody>
    <@groupTemplateCollection group=group host=host>
      <@groupSubTemplate group=group relation=relationship/>
    </@groupTemplateCollection>
    <#noparse>
    <!-- @DEFINE -->
    </#noparse>
    <script src="${lib_root}define.js${cfg_root}"></script>
    <script>
		define(['{pro}module/group/sub.js'],
		function(){
			var _ = NEJ.P;
            _('data').index = parseInt(
                location.hash.substring(1,2))||0;
            _('mu.x')._$setup(_('mu.m.v')._$$ModuleSub);
		});
    </script>
  </body>
</html>