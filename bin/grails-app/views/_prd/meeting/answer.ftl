<!DOCTYPE html>
<html>
  <head>
    <title>回复活动 - 聚否</title>
    <@head/>
<link href="/r/core.css?37707d0cec0b7e9a161b7da206a49779" type="text/css" rel="stylesheet"/><style type="text/css">.t-mdl-s0{margin-left:4px;padding-right:21px;}.t-mdl-s0 .ln0{font-size:26px;font-weight:bold;letter-spacing:-3px;margin-top:9px;}.t-mdl-s0 .ln1{font-size:16px;font-weight:bold;margin:7px 0 18px 6px;}.t-mdl-s0 .pbox{padding:10px 0;}.t-mdl-s0  img{width:40px;height:40px;}.w-atb{width:100%;table-layout:fixed;border-collapse:collapse;}.w-atb .c{padding:10px;border-width:1px;border-style:solid;text-align:center;}.w-atb th.c{font-size:14px;}.w-atb .c0,.w-atb .c2{width:80px;height:19px;}.w-atb .c3{width:123px;}.w-atb td.c1{text-align:left;line-height:18px;}</style>
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
      <div class="l-lmc f-cb w-fom meeting-answer">
        <@messagebox/>
        <@groupMeetingAnswer group=group meeting=meeting/>
      </div>
    </@groupBody>
    <@groupTemplateCollection group=group host=host>
      <@groupMeetingAnswerTemplate meeting=meeting/>
    </@groupTemplateCollection>
    <#noparse>
<script src="/r/core.js?95413463d98e6dc7b6a4f11ac5f58837" type="text/javascript"></script><script type="text/javascript">(function(){var RH=NEJ.P,W=NEJ.O,bw=NEJ.F,A=RH("nej.e"),Q=RH("nej.v"),bf=RH("nej.ut"),bF=RH("mu.x"),bd=RH("mu.ut"),z=RH("mu.m.g"),tY;z.Cr=NEJ.C();tY=z.Cr.bg(z.dP);tY.bu=function(B){this.bx(B);this.cv=B.meeting||W;this.bA.cache.data.mid=this.cv.id;this.bA.item.questions=this.cv.questions;this.cs=bf.hg.bi(this.bA)};tY.bG=function(){var G=A.bD("module-s0","js-flag");this.bA={limit:10,parent:G[0],item:{klass:"jst-answer-list"},pager:{parent:G[1]},cache:{klass:bd.gZ,lkey:"user-answer",data:{type:0,order:"desc"}},onbeforelistload:bF.kr,onemptylist:function(D){D.value="活动没有参与者"}}}})();
(function(){var RH=NEJ.P;RH("mu.x").cL(RH("mu.m.g").Cr)})()</script>
    </#noparse>
  </body>
</html>