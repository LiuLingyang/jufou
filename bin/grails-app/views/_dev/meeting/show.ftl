<!DOCTYPE html>
<html>
  <head>
    <title>${(meeting.title)!''} - 聚否</title>
    <@head/>
    <!-- @STYLE -->
    <link href="${css_root}base.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}group.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}window.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}group/meeting.show.css" rel="stylesheet" type="text/css"/>
    <@theme/>
  </head>
  <body id="www-jufou-com">
    
    <@groupBody group=group
        options={
          "index":1,
          "user":host!{},
          "groups":otherGroups,
          "relationship":relationship!0,
          "photoCount":photoCount!0,
          "pastCount":pastCount!0,
          "upcomingCount":upcomingCount!0
        }>
      <div class="l-lmc f-cb meeting-show">
        <#assign r_relationship=-1>
        <#if host??>
          <#assign r_relationship=relationship>
        </#if>
        <@groupMeetingRight reply=reply!{}
          group=group meeting=meeting options={
              "state":state!0,
              "refuse":refuseList![],
              "attend":attendList![],
              "relationship":r_relationship,
              "invited":isInvited!false
          }/>
        <@groupMeetingMain 
          group=group meeting=meeting host=host/>
      </div>
    </@groupBody>
    <@groupTemplateCollection group=group host=host>
      <@groupCommentTemplate group=group host=host
        role=parseRelation2Role(host,relationship)/>
      <@groupMeetingCreateTemplate meeting=meeting/>
      
    </@groupTemplateCollection>
    <#noparse>
    <!-- @DEFINE -->
    </#noparse>
    <script src="${lib_root}define.js${cfg_root}"></script>
    <script>
		define(['{pro}module/meeting/show.js'],
		function(){
		    var _ = NEJ.P;
		    _('mu.x')._$setup(
		        _('mu.m.g')._$$ModuleMeetingShow);
		});
    </script>
  </body>
</html>