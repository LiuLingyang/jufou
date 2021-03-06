<!DOCTYPE html>
<html>
  <head>
    <title>组织成员 - 聚否</title>
    <@head/>
    <!-- @STYLE -->
    <link href="${css_root}base.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}window.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}group.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}group/member.css" rel="stylesheet" type="text/css"/>
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
      <div class="l-lmc f-cb group-member">
        <@messagebox/>
        <@groupMember group=group host=host
          relationship=relationship counts={
              "all":allCount!0,
              "admin":adminCount!0,
              "join":joinCount!0,
              "ban":banCount!0
          }/>
      </div>
    </@groupBody>
    <@groupTemplateCollection group=group host=host>
      <@groupMemberTemplate relationship=relationship/>
    </@groupTemplateCollection>
    <#noparse>
    <!-- @DEFINE -->
    </#noparse>
    <script src="${lib_root}define.js${cfg_root}"></script>
    <script>
		define(['{pro}module/member/member.js'],
		function(){
		    var _ = NEJ.P;
		    _('mu.x')._$setup(
		        _('mu.m.g')._$$ModuleMember);
		});
    </script>
  </body>
</html>