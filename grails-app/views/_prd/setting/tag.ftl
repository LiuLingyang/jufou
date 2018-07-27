<!DOCTYPE html>
<html>
  <head>
    <title>标签设置 - 聚否</title>
    <@head/>
<link href="/r/core.css?37707d0cec0b7e9a161b7da206a49779" type="text/css" rel="stylesheet"/><style type="text/css">.t-mdl-c0{padding-bottom:94px;}.t-mdl-c0 .tbx{width:420px;}.t-mdl-c0 .xln{margin:15px 3px;}.t-mdl-c0 .xmr{margin:29px 4px;}.t-mdl-c0 .yls{margin:18px 3px;}.t-mdl-c0 .yls .tip{margin-left:3px;}.t-mdl-c0 .yln{margin:24px 0 10px 4px;font-weight:bold;}.t-mdl-c0 .tip{margin-left:6px;}.t-mdl-c0 .yln2{margin:29px 0 10px 4px;font-weight:bold;}.t-mdl-c0 .xtl{font-size:14px;font-weight:bold;}.t-mdl-c0 .ytg{margin:5px 10px 5px 0;padding:4px 8px 4px 30px;border-width:1px;border-style:solid;cursor:pointer;white-space:nowrap;}#www-jufou-com .t-mdl-c0 .mtx{font-size:26px;}</style>
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
      <form class="l-lmc f-cb setting-tag">
        <@messagebox/>
        <@groupSettingTag group=group/>
      </form>
    </@groupBody>
    <@groupTemplateCollection group=group host=host>
      <@groupTagItemTemplate/>
      <@groupSettingTagTemplate/>
    </@groupTemplateCollection>
    <#noparse>
<script src="/r/core.js?95413463d98e6dc7b6a4f11ac5f58837" type="text/javascript"></script><script type="text/javascript">(function(){var RH=NEJ.P,W=NEJ.O,A=RH("nej.e"),Q=RH("nej.v"),K=RH("nej.u"),bf=RH("nej.ut"),bd=RH("mu.ut"),bC=RH("mu.w.i"),z=RH("mu.m.g"),rw,Di;z.uu=NEJ.C();rw=z.uu.bg(z.pK);Di=z.uu.cc;rw.bu=function(B){this.bx(B);var bp=this.ce.tags||bp;for(var i=bp.length;i<5;i++)bp.push({name:""});this.df=A.jG(bp,bC.lz,this.dC);if(this.df.length>=15){A.bM(this.pL,"display","none")}this.by=bd.dF.bi({form:this.Z})};rw.bG=function(){this.Z=A.bm("module-c0").parentNode;Di.bG.call(this)};rw.gB=function(D){location.href=config.page("/setting/")}})();
(function(){var RH=NEJ.P;RH("mu.x").cL(RH("mu.m.g").uu)})()</script>
    </#noparse>
  </body>
</html>