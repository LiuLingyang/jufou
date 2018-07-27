<!DOCTYPE html>
<html>
  <head>
    <title>回复活动 - 聚否</title>
    <@head/>
<link href="/r/core.css?37707d0cec0b7e9a161b7da206a49779" type="text/css" rel="stylesheet"/><style type="text/css">.t-mdl-j0{margin-left:4px;}.t-mdl-j0 .blk{margin:15px 0;}.t-mdl-j0 .blk .qst{line-height:30px;font-weight:bold;}.t-mdl-j0 .blk textarea{width:95%;height:80px;margin-left:15px;}</style>
    <@theme/>
  </head>
  <body id="www-jufou-com">
    <@groupBody group=group
        options={
          "index":1,
          "user":host!{},
          "groups":otherGroups,
          "relationship":relationship,
          "photoCount":photoCount!0,
          "pastCount":pastCount!0,
          "upcomingCount":upcomingCount!0
        }>
      <div class="l-lmc f-cb w-fom meeting-reply">
        <@messagebox/>
        <@groupMeetingReply group=group meeting=meeting/>
      </div>
    </@groupBody>
    <@groupTemplateCollection group=group host=host>
      <@groupMeetingReplyTemplate meeting=meeting/>
    </@groupTemplateCollection>
    <#noparse>
<script src="/r/core.js?95413463d98e6dc7b6a4f11ac5f58837" type="text/javascript"></script><script type="text/javascript">(function(){var RH=NEJ.P,W=NEJ.O,bw=NEJ.F,A=RH("nej.e"),Q=RH("nej.v"),bf=RH("nej.ut"),bO=RH("mu.x"),bd=RH("mu.ut"),z=RH("mu.m.g"),nL;z.Cs=NEJ.C();nL=z.Cs.bg(z.dP);nL.bu=function(B){this.bx(B);this.cv=B.meeting||W};nL.bG=function(){this.Z=A.bm("module-j0").parentNode;Q.bo(this.Z["btn-ok"],"click",this.el.I(this));this.by=bd.dF.bi({form:this.Z});this.bl=bd.gZ.bi({onmeetinganswer:this.dZ.I(this)})};nL.el=function(){if(this.by.fW()){var E=this.by.fc();this.bl.Gi({mid:this.cv.id,answer:JSON.stringify(E)})}};nL.dZ=function(bj){if(bj.code!=1){bO.bZ("暂时无法回答问题，请稍候再试！");return}location.href=config.page("/meeting/"+this.cv.id+"/")}})();
(function(){var RH=NEJ.P;RH("mu.x").cL(RH("mu.m.g").Cs)})()</script>
    </#noparse>
  </body>
</html>