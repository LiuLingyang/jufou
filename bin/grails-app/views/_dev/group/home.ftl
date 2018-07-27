<!DOCTYPE html>
<html>
  <head>
    <title>${group.name} - 聚否</title>
    <@head/>
    <!-- @STYLE -->
    <link href="${css_root}base.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}group.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}window.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}group/home.css" rel="stylesheet" type="text/css"/>
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
      <div class="l-lmc f-cb group-home">
        <@messagebox/>
        <#if relationship&gt;=2&&(joinCount!0)&gt;0>
          <div class="w-req">有${joinCount!0}名用户申请加入组织，<a class="fc03" href="/${group.homepage}/members/#2">查看&gt;&gt;</a></div>
        </#if>
        <#if relationship==0>
          <@groupHomeTop group=group/>
        </#if>
        <@groupHomeRight group=group photos=photos events=news/>
        <@groupHomeMain relation=relationship>
          <div class="w-loading">&nbsp;</div>
        </@groupHomeMain>
      </div>
    </@groupBody>
    <@groupTemplateCollection group=group host=host>
      <@groupHomeTemplate group=group relation=relationship/>
      <@groupMeetingStateTemplate/>
    </@groupTemplateCollection>
    <#noparse>
    <!-- @DEFINE -->
    </#noparse>
    <script src="${lib_root}define.js${cfg_root}"></script>
    <script>
		define(['{pro}module/group/home.js'],
		function(){
		    var _ = NEJ.P;
		    _('data').index = parseInt(
		        location.hash.substring(1,2))||0;
		    _('mu.x')._$setup(_('mu.m.g')._$$ModuleHome);
		});
    </script>
  </body>
</html>