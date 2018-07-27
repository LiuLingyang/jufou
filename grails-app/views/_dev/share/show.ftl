<!DOCTYPE html>
<html>
  <head>
    <title>${(share.title)!''} - 聚否</title>
    <@head/>
    <!-- @STYLE -->
    <link href="${css_root}base.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}group.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}window.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}group/share.show.css" rel="stylesheet" type="text/css"/>
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
      <div class="l-lmc f-cb group-share">
        <@messagebox/>
        <@groupShareShow group=group share=share relation=relationship/>
      </div>
    </@groupBody>
    <@groupTemplateCollection group=group host=host> 
      <@groupCommentTemplate group=group host=host
        role=parseRelation2Role(host,relationship)/>
      <@groupShareShowTemplate share=share/>
    </@groupTemplateCollection>
    <#noparse>
    <!-- @DEFINE -->
    </#noparse>
    <script src="${lib_root}define.js${cfg_root}"></script>
    <script>
        define(['{pro}module/share/show.js'],
        function(){
            var _ = NEJ.P;
            _('mu.x')._$setup(
                _('mu.m.v')._$$ModuleShareShow);
        });
    </script>
  </body>
</html>