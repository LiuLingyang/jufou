<!DOCTYPE html>
<html>
  <head>
    <title>成员设置 - 聚否</title>
    <@head/>
<link href="/r/core.css?37707d0cec0b7e9a161b7da206a49779" type="text/css" rel="stylesheet"/><style type="text/css">.t-mdl-d0{padding-bottom:75px;}.t-mdl-d0 .blk{margin:30px 0;}.t-mdl-d0 .xblk{width:420px;margin:19px 6px;}.t-mdl-d0 .xblk .txt{width:385px;}.t.mdl-d0 .xblk .tip{line-height:18px;}.t-mdl-d0 .xblk .w-txg .wnm{width:350px;overflow:hidden;margin-top:4px;font-size:12px;}.t-mdl-d0 .blk .xtl{margin:12px 0;font-size:14px;font-weight:bold;}.t-mdl-d0 .blk .tip{line-height:18px;}.t-mdl-d0 .blk .xln{margin:17px 7px;}.t-mdl-d0 .blk .cbx{margin-right:10px;}.t-mdl-d0 .blk textarea{width:600px;height:150px;margin-top:10px;vertical-align:text-top;}.t-mdl-d0 .blk .nok .js-pass{visibility:hidden;}.t-mdl-d0 .w-txg{margin-top:27px;}.t-mdl-d0 .blk-x{margin-top:76px;}#www-jufou-com .t-mdl-d0 .mtx{font-size:26px;}</style>
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
      <form class="l-lmc f-cb group-member">
        <@messagebox/>
        <@groupSettingMember group=group/>
      </form>
    </@groupBody>
    <@groupTemplateCollection group=group host=host>
      <@groupSettingMemberTemplate questions=questions![]/>
      <@groupTagItemTemplate/>
    </@groupTemplateCollection>
    <#noparse>
<script src="/r/core.js?95413463d98e6dc7b6a4f11ac5f58837" type="text/javascript"></script><script type="text/javascript">(function(){var RH=NEJ.P,W=NEJ.O,A=RH("nej.e"),Q=RH("nej.v"),K=RH("nej.u"),bf=RH("nej.ut"),bd=RH("mu.ut"),bC=RH("mu.w.i"),z=RH("mu.m.g"),rn,De;z.vu=NEJ.C();rn=z.vu.bg(z.pJ);De=z.vu.cc;rn.bu=function(B){this.bx(B);this.fF=!0;var bp=[],Nb=B.questions||[];K.bS(Nb,function(bq){bp.push(this.gE(bq))},this);for(var i=bp.length;i<5;i++){bp.push({name:""})}this.df=A.jG(bp,bC.lz,this.dC);this.fF=!1;this.by=bd.dF.bi({form:this.Z})};rn.bG=function(){this.Z=A.bm("module-d0").parentNode;De.bG.call(this)};rn.gB=function(D){location.href=config.page("/setting/")}})();
(function(){var RH=NEJ.P;RH("mu.x").cL(RH("mu.m.g").vu)})()</script>
    </#noparse>
  </body>
</html>