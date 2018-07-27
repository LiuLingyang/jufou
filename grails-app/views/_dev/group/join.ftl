<!DOCTYPE html>
<html>
  <head>
    <title>申请加入 - 聚否</title>
    <@head/>
    <!-- @STYLE -->
    <link href="${css_root}base.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}group.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}window.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}group/join.css" rel="stylesheet" type="text/css"/>
    <@theme/>
  </head>
  <body id="www-jufou-com">
    <@groupBody group=group
        options={
          "index":2,
          "user":host!{},
          "groups":otherGroups,
          "relationship":relationship,
          "photoCount":photoCount!0,
          "pastCount":pastCount!0,
          "upcomingCount":upcomingCount!0
        }>
      <div class="l-lmc f-cb group-join">
        <@messagebox/>
        <@groupJoin group=group user=attendance/>
      </div>
    </@groupBody>
    <@groupTemplateCollection group=group host=host/>
    <#noparse>
    <!-- @DEFINE -->
    </#noparse>
    <script src="${lib_root}define.js${cfg_root}"></script>
    <script>
		define(['{pro}module/group/join.js'],
		function(){
		    var _ = NEJ.P;
		    _('mu.x')._$setup(
		        _('mu.m.g')._$$ModuleJoinGroup);
		});
    </script>
  </body>
</html>