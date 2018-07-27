<!DOCTYPE html>
<html>
  <head>
    <title>基本信息 - 聚否</title>
    <@head/>
<link href="/r/core.css?37707d0cec0b7e9a161b7da206a49779" type="text/css" rel="stylesheet"/><style type="text/css">#www-jufou-com .t-mdl-a0 .mtx{font-size:26px;}.t-mdl-a0{padding:5px 18px 25px;}.t-mdl-a0 .t-cnt{margin-left:7px;}.t-mdl-a0 .ipt{margin:3px;}.t-mdl-a0 .t-ttl{letter-spacing:-1px;padding:10px 0 14px;}.t-mdl-a0 .tip1{margin-left:-6px;}.t-mdl-a0 .tip2{margin-left:10px;}.t-mdl-a0 .wd0{width:390px;}.t-mdl-a0 .wd1{width:600px;}.t-mdl-a0 .wd2{width:480px;}.t-mdl-a0 .wd3{width:85px;}.t-mdl-a0 .wd4{width:130px;margin-right:18px;}.t-mdl-a0 .ht0{height:140px;}.w-byk{margin:20px 0 25px;}.w-byk .lab{padding-bottom:10px;font-size:14px;font-weight:bold;margin-left:-1px;}.w-byk .tip1{font-size:12px;font-weight:normal;margin-left:4px;}.w-byk .tip2{font-size:12px;font-weight:normal;margin-left:1px;}.w-byk .itm1{margin-top:26px;}.w-byk .itm2{margin-top:29px;}.w-byk select{margin-right:10px;}.w-byk .acp{margin-top:40px;}.w-byk .acp .wrd{padding-left:12px;}.w-byk .acp .js-mhd{margin-left:160px;}.w-byk .acp .js-pass{visibility:hidden;}</style>
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
      <form class="l-lmc f-cb w-fom setting-basic">
        <@messagebox/>
        <@groupSettingBasic group=group/>
      </form>
    </@groupBody>
    <@groupTemplateCollection group=group host=host/>
    <#noparse>
<script src="/r/core.js?95413463d98e6dc7b6a4f11ac5f58837" type="text/javascript"></script><script type="text/javascript">(function(){var RH=NEJ.P,W=NEJ.O,A=RH("nej.e"),Q=RH("nej.v"),bf=RH("nej.ut"),bd=RH("mu.ut"),z=RH("mu.m.g"),rk,vK;z.vz=NEJ.C();rk=z.vz.bg(z.tX);vK=z.vz.cc;rk.bG=function(){vK.bG.call(this);this.bl=bd.eS.bi({ongroupupdate:this.dZ.I(this)})};rk.tT=function(E){this.bl.vl(E)};rk.dZ=function(bj){if(bj.code==1){location.href=config.page("/setting/");return}vK.dZ.apply(this,arguments)}})();
(function(){var RH=NEJ.P;RH("mu.x").cL(RH("mu.m.g").vz)})()</script>
    </#noparse>
  </body>
</html>