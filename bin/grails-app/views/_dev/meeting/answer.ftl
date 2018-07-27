<!DOCTYPE html>
<html>
  <head>
    <title>回复活动 - 聚否</title>
    <@head/>
    <!-- @STYLE -->
    <link href="${css_root}base.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}group.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}window.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}group/meeting.answer.css" rel="stylesheet" type="text/css"/>
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
      <div class="l-lmc f-cb w-fom meeting-answer">
        <@messagebox/>
        <@groupMeetingAnswer group=group meeting=meeting/>
      </div>
    </@groupBody>
    <@groupTemplateCollection group=group host=host>
      <@groupMeetingAnswerTemplate meeting=meeting/>
    </@groupTemplateCollection>
    <#noparse>
    <!-- @DEFINE -->
    </#noparse>
    <script src="${lib_root}define.js${cfg_root}"></script>
    <script>
		define(['{pro}module/meeting/answer.js'],
		function(){
		    var _ = NEJ.P;
		    _('mu.x')._$setup(
		        _('mu.m.g')._$$ModuleMeetingAnswer);
		});
    </script>
  </body>
</html>