<!DOCTYPE html>
<html>
  <head>
    <title>创建活动 - 聚否</title>
    <@head/>
    <!-- @STYLE -->
    <link href="${css_root}base.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}window.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}group.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}group/meeting.create.css" rel="stylesheet" type="text/css"/>
    <@theme/>
  </head>
  <body id="www-jufou-com">
    <@groupBody group=group
        options={
          "index":1,
          "user":host!{},
          "groups":otherGroups,
          "relationship":relationship,
          "photoCount":photoCount!0,
          "pastCount":pastCount!0,
          "upcomingCount":upcomingCount!0
        }>
      <@groupMeetingCreate group=group/>
    </@groupBody>
    <@groupTemplateCollection group=group host=host>
      <@groupMeetingTemplate/>
    </@groupTemplateCollection>
    <#noparse>
    <!-- @DEFINE -->
    </#noparse>
    <script src="${lib_root}define.js${cfg_root}"></script>
    <script>
		define(['{pro}module/meeting/create.js'],
		function(){
		    var _ = NEJ.P;
		    _('mu.x')._$setup(
		        _('mu.m.g')._$$ModuleMeetingCreate);
		});
    </script>
  </body>
</html>