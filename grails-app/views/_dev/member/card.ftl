<!DOCTYPE html>
<html>
  <head>
    <title>组织名片 - 聚否</title>
    <@head/>
    <!-- @STYLE -->
    <link href="${css_root}base.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}group.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}window.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}group/member.card.css" rel="stylesheet" type="text/css"/>
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
        <#if relationship&gt;=2&&member==-1>
        <div class="w-jact w-req f-cb" id="join-action-box">
          <span class="fl">是否允许该用户加入组织</span>
          <input class="fr w-rd3 t-btn t-btn-5" type="button" value="否" data-action="-1"/>
          <input class="fr w-rd3 t-btn t-btn-0" type="button" value="是" data-action="1"/>
        </div>
        </#if>
        <@groupMemberCardRight user=attendance host=host/>
        <@groupMemberCardMain user=attendance host=host group=group host_role=relationship user_role=member/>
      </div>
    </@groupBody>
    <@groupTemplateCollection group=group host=host>
      <@groupMemberCardTemplate user=attendance/>
    </@groupTemplateCollection>
    <#noparse>
    <!-- @DEFINE -->
    </#noparse>
    <script src="${lib_root}define.js${cfg_root}"></script>
    <script>
		define(['{pro}module/member/card.js'],
		function(){
		    var _ = NEJ.P;
		    _('mu.x')._$setup(
		        _('mu.m.g')._$$ModuleMemberCard);
		});
    </script>
  </body>
</html>