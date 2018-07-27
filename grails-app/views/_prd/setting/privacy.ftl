<!DOCTYPE html>
<html>
  <head>
    <title>隐私设置 - 聚否</title>
    <@head/>
<link href="/r/core.css?37707d0cec0b7e9a161b7da206a49779" type="text/css" rel="stylesheet"/><style type="text/css">#www-jufou-com .t-mdl-b0 .mtx{font-size:26px;letter-spacing:-3px;}.t-mdl-b0{padding-bottom:300px;}.t-mdl-b0 .cbx{margin:18px 18px 22px 10px;}.t-mdl-b0 .ln0{margin:19px 0 0 6px;font-size:14px;font-weight:bold;}.t-mdl-b0 .tip{margin:-8px 0 50px 40px;line-height:20px;}.t-mdl-b0 .itm{margin:1px 0 0 -4px;}</style>
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
      <form class="l-lmc f-cb setting-privacy">
        <@messagebox/>
        <@groupSettingPrivacy group=group/>
      </form>
    </@groupBody>
    <@groupTemplateCollection group=group host=host/>
    <#noparse>
<script src="/r/core.js?95413463d98e6dc7b6a4f11ac5f58837" type="text/javascript"></script><script type="text/javascript">(function(){var RH=NEJ.P,W=NEJ.O,A=RH("nej.e"),Q=RH("nej.v"),bf=RH("nej.ut"),bO=RH("mu.x"),bd=RH("mu.ut"),z=RH("mu.m.g"),rs;z.Dh=NEJ.C();rs=z.Dh.bg(z.dP);rs.bG=function(){this.Z=A.bm("module-b0").parentNode;this.by=bd.dF.bi({form:this.Z});this.bl=bd.eS.bi({onprivacyupdate:this.dZ.I(this)});Q.bo(this.Z["btn-ok"],"click",this.el.I(this))};rs.el=function(){var E=this.by.fc();E.gid=this.ce.id;this.bl.PW(E)};rs.dZ=function(bj){if(bj.code==1){location.href=config.page("/setting/");return}bO.bZ("暂时无法保存设置！")}})();
(function(){var RH=NEJ.P;RH("mu.x").cL(RH("mu.m.g").Dh)})()</script>
    </#noparse>
  </body>
</html>