<!DOCTYPE html>
<html>
  <head>
    <title>组织通知 - 聚否</title>
    <@head/>
<link href="/r/core.css?37707d0cec0b7e9a161b7da206a49779" type="text/css" rel="stylesheet"/><style type="text/css">#www-jufou-com .t-mdl-50{margin-left:4px; border-bottom:none;}.t-mdl-50 .wd0{width:488px;}.t-mdl-50 .wd1{width:693px;}.t-mdl-50 .ht0{height:310px;}.t-mdl-50 .yip{margin-left:10px;}.t-mdl-50 .blk{margin:15px 0;}.t-mdl-50 .blk .ybt{padding:13px 10px;font-size:14px;font-weight:bold;}.t-mdl-50 .blk .tip{margin-top:-7px;}.t-mdl-50 .axt{padding:10px 0 30px;}.t-mdl-50 .axt .t-btn{margin-left:15px;}.t-mdl-50 .xbm .js-error{position:static;left:0;padding-left:0;}.t-mdl-50 .xbm .js-pass{visibility:hidden;}#www-jufou-com .t-mdl-50 .mtx{font-size:26px;letter-spacing:-3px;padding-left:7px;}</style>
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
      <form class="l-lmc f-cb group-inform">
        <@messagebox/>
        <@groupInfom group=group/>
      </form>
    </@groupBody>
    <@groupTemplateCollection group=group host=host>
      <@groupInfomTemplate meeting=meeting/>
    </@groupTemplateCollection>
    <#noparse>
<script src="/r/core.js?95413463d98e6dc7b6a4f11ac5f58837" type="text/javascript"></script><script type="text/javascript">(function(){var RH=NEJ.P,W=NEJ.O,dp=NEJ.R,A=RH("nej.e"),Q=RH("nej.v"),K=RH("nej.u"),bO=RH("mu.x"),bd=RH("mu.ut"),z=RH("mu.m.g"),mk;z.Ch=NEJ.C();mk=z.Ch.bg(z.dP);mk.bu=function(B){this.bx(B);this.cv=B.meeting||W};mk.bG=function(){this.Z=A.bm("module-50").parentNode;this.by=bd.dF.bi({form:this.Z});Q.bo(this.Z["btn-ok"],"click",this.el.I(this));this.bl=bd.eS.bi({oninform:this.Kk.I(this)})};mk.el=function(){if(this.by.fW()){var E=this.by.fc();if(!!this.cv.id){E.mid=this.cv.id}else{E.gid=this.ce.id}this.bl.PQ(E)}};mk.Kk=function(bj){if(bj.code==1){bO.pQ("通知发送成功！");return}bO.bZ("暂时无法发送通知，请稍后再试！")}})();
(function(){var RH=NEJ.P;RH("mu.x").cL(RH("mu.m.g").Ch)})()</script>
    </#noparse>
  </body>
</html>