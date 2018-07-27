<!DOCTYPE html>
<html>
  <head>
    <title>消息推送设置 - 聚否</title>
    <@head/>
<link href="/r/core.css?37707d0cec0b7e9a161b7da206a49779" type="text/css" rel="stylesheet"/><style type="text/css">.t-mdl-k0{padding-bottom:16px;}.t-mdl-k0 .cbx{margin-right:15px;}.t-mdl-k0 .t-cnt{margin:23px 36px;background:#eeeeee;}#www-jufou-com .t-mdl-k0 .mtx{font-size:26px;padding-left:7px;}#www-jufou-com .t-mdl-k0 .xxl{font-size:15px;margin:23px 21px;}#www-jufou-com .t-mdl-k0 .ln{margin:-2px 33px;}#www-jufou-com .t-mdl-k0 .ln-x{margin-top:-4px;}#www-jufou-com .t-mdl-k0 .ln-y{margin-top:23px;}</style>
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
      <div class="l-lmc f-cb setting-message">
        <@messagebox/>
        <@groupSettingMessage group=group setting=setting!{}/>
      </div>
    </@groupBody>
    <@groupTemplateCollection group=group host=host/>
    <#noparse>
<script src="/r/core.js?95413463d98e6dc7b6a4f11ac5f58837" type="text/javascript"></script><script type="text/javascript">(function(){var RH=NEJ.P,W=NEJ.O,A=RH("nej.e"),Q=RH("nej.v"),bf=RH("nej.ut"),bO=RH("mu.x"),bd=RH("mu.ut"),z=RH("mu.m.g"),ep;z.lr=NEJ.C();ep=z.lr.bg(z.dP);ep.bG=function(){this.Z=A.bm("module-k0").parentNode;this.by=bd.dF.bi({form:this.Z});this.bl=bd.eS.bi({onmsgsettingupdate:this.dZ.I(this)});Q.bo(this.Z["btn-ok"],"click",this.el.I(this))};ep.el=function(){var E=this.by.fc();E.gid=this.ce.id;this.bl.zZ(this.dt.id,E)};ep.dZ=function(T,bj){if(bj.code==1){location.href=config.page("/setting/");return}bO.bZ("暂时无法保存设置！")}})();
(function(){var RH=NEJ.P;RH("mu.x").cL(RH("mu.m.g").lr)})()</script>
    </#noparse>
  </body>
</html>