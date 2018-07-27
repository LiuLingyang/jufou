<!DOCTYPE html>
<html>
  <head>
    <title>${(news.subject)!''} - 聚否</title>
    <@head/>
    <!-- @STYLE -->
    <link href="${css_root}base.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}group.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}window.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}group/news.show.css" rel="stylesheet" type="text/css"/>
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
      <div class="l-lmc f-cb group-news">
        <@messagebox/>
        <@groupNewsShow group=group news=news relation=relationship/>
      </div>
    </@groupBody>
    <@groupTemplateCollection group=group host=host> 
      <@groupNewsShowTemplate news=news/>
    </@groupTemplateCollection>
    <#noparse>
    <!-- @DEFINE -->
    </#noparse>
    <script src="${lib_root}define.js${cfg_root}"></script>
    <script>
        define(['{pro}module/news/show.js'],
        function(){
            var _ = NEJ.P;
            _('mu.x')._$setup(
                _('mu.m.v')._$$ModuleNewsShow);
        });
    </script>
  </body>
</html>