<!DOCTYPE html>
<html>
  <head>
    <title>${group.name} - 投票 - 聚否</title>
    <@head/>
    <!-- @STYLE -->
    <link href="${css_root}base.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}group.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}window.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}/group/vote.home.css" rel="stylesheet" type="text/css"/>
    <@theme/>
  </head>
  <body id="www-jufou-com">
    <@groupBody group=group
        options={
          "index":6,
          "user":host!{},
          "groups":otherGroups,
          "relationship":relationship!0,
          "photoCount":photoCount!0,
          "pastCount":pastCount!0,
          "upcomingCount":upcomingCount!0
        }>
      <div class="l-lmc f-cb group-vote">
        <@messagebox/>
        <@groupVoteHome group=group relation=relationship/>
      </div>
    </@groupBody>
    <@groupTemplateCollection group=group host=host>
      <@groupVoteHomeTemplate group=group relation=relationship/>
    </@groupTemplateCollection>
    <#noparse>
    <!-- @DEFINE -->
    </#noparse>
    <script src="${lib_root}define.js${cfg_root}"></script>
    <script>
        define(['{pro}module/vote/home.js'],
        function(){
            var _ = NEJ.P;
            _('data').index = parseInt(
                location.hash.substring(1,2))||0;
            _('mu.x')._$setup(_('mu.m.v')._$$ModuleHome);
        });
    </script>
  </body>
</html>