<!DOCTYPE html>
<html>
  <head>
    <title>群组设置 - 聚否</title>
    <@head/>
<link href="/r/core.css?37707d0cec0b7e9a161b7da206a49779" type="text/css" rel="stylesheet"/><style type="text/css">#www-jufou-com .t-mdl-90 .mtx{font-size:26px;}.t-mdl-90{margin-left:4px;}.t-mdl-90 .xtb{width:90%;margin:13px auto;table-layout:fixed;}.t-mdl-90 .xtb td{padding:20px 0 59px;vertical-align:top;}.w-ybk{line-height:24px;}.w-ybk .ln0{padding-bottom:3px;font-size:14px;font-weight:bold;}.w-ybk .lnx{margin-left:-3px;}</style>
    <@theme/>
  </head>
  <body id="www-jufou-com">
    <@groupBody group=group
        options={
          "index":-1,
          "user":host!{},
          "groups":otherGroups,
          "relationship":relationship,
          "photoCount":photoCount!0,
          "pastCount":pastCount!0,
          "upcomingCount":upcomingCount!0
        }>
      <div class="l-lmc f-cb group-member">
        <@messagebox/>
        <@groupSettingHome group=group/>
      </div>
    </@groupBody>
    <@groupTemplateCollection group=group host=host/>
    <#noparse>
<script src="/r/core.js?95413463d98e6dc7b6a4f11ac5f58837" type="text/javascript"></script><script type="text/javascript">(function(){var RH=NEJ.P,z=RH("mu.m.g"),MW;z.Dc=NEJ.C();MW=z.Dc.bg(z.dP)})();
(function(){var RH=NEJ.P;RH("mu.x").cL(RH("mu.m.g").Dc)})()</script>
    </#noparse>
  </body>
</html>