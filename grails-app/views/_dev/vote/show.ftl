<!DOCTYPE html>
<html>
  <head>
    <title>${(survey.title)!''} - 聚否</title>
    <@head/>
    <!-- @STYLE -->
    <link href="${css_root}base.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}group.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}window.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}group/vote.show.css" rel="stylesheet" type="text/css"/>
    <link href="/res/theme/default/style.css" rel="stylesheet" type="text/css"/>
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
        <@groupVoteShow group=group vote=survey relation=relationship/>
      </div>
    </@groupBody>
    <@groupTemplateCollection group=group host=host>
      <@groupVoteShowTemplate vote=survey/>
    </@groupTemplateCollection>
    <#noparse>
    <!-- @DEFINE -->
    </#noparse>
    <script src="${lib_root}define.js${cfg_root}"></script>
    <script>
        define(['{pro}module/vote/show.js'],
        function(){
            var _ = NEJ.P;
            _('mu.x')._$setup(
                _('mu.m.v')._$$ModuleVoteShow);
        });
    </script>
  </body>
</html>