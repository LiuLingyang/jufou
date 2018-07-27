<!DOCTYPE html>
<html>
  <head>
    <title>${group.name} - 聚否</title>
    <@head/>
<link href="/r/core.css?37707d0cec0b7e9a161b7da206a49779" type="text/css" rel="stylesheet"/><style type="text/css">.t-mdl-5 .t-ttl{margin:-8px 0 0 -1px;padding:0;}#www-jufou-com .t-mdl-5 .mtx{font-size:16px;letter-spacing:0;}.t-mdl-5 .blk-1 .pht{margin:10px 0;}.t-mdl-5 .blk-1 .pht img{width:100%;}.t-mdl-5 .blk-2{margin-top:10px;}.t-mdl-5 .blk-2-m{cursor:pointer;text-align:center;}.t-mdl-5 .blk-3{margin-top:20px;}.t-mdl-5 .bck{padding:0 2px 0 0;}.t-mdl-5 .pad{padding:0 2px;}.t-mdl-6{margin-left:4px;margin-bottom:0;padding-bottom:10px;}.t-mdl-6 .n{margin-bottom:10px;font-size:29px;font-weight:bold;margin-top:12px;}.t-mdl-6 .d{line-height:24px;margin:13px 0 0 10px;}.t-mdl-7 .ln0{font-size:28px;}.t-mdl-7 .ln1{padding:10px 0;}.t-mdl-8{margin:15px 4px;}.group-home .more{padding:20px 0;font-size:14px;text-align:center;cursor:pointer;}.group-home .epty .tip{padding:54px 0 2px 14px;font-size:30px;text-align:center;}.group-home .epty .act{margin:30px 0;padding:0 0 300px 32px;}.group-home .epty .tip-s{padding-bottom:600px;}.group-home .epty .t-btn-1{margin:0 auto;}.w-meeting{line-height:20px;padding:25px 0 25px 28px;border-width:0 0 1px;border-style:solid;text-align:left;}.w-meeting .xmt{font-size:16px;font-weight:bold;margin-bottom:6px;width:450px;}.w-meeting .smr{max-height:45px;line-height:24px;overflow:hidden;margin:-3px 70px 0 1px;}.w-meeting .t{margin-left:15px;}.w-meeting img{margin:8px 5px;width:40px;height:40px;}.w-mdft{line-height:40px;border-bottom-width:1px;border-bottom-style:dashed;}.w-mdft .act{margin-right:10px;}.w-mdft .gtl{margin-right:150px;}</style>
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
      <div class="l-lmc f-cb group-home">
        <@messagebox/>
        <#if relationship==3&&(joinCount!0)&gt;0>
          <div class="w-req">有${joinCount!0}名用户申请加入组织，<a href="/${group.homepage}/members/#2">查看&gt;&gt;</a></div>
        </#if>
        <#if relationship==0>
          <@groupHomeTop group=group/>
        </#if>
        <@groupHomeRight group=group photos=photos events=news/>
        <@groupHomeMain relation=relationship>
          <div class="w-loading">&nbsp;</div>
        </@groupHomeMain>
      </div>
    </@groupBody>
    <@groupTemplateCollection group=group host=host>
      <@groupHomeTemplate group=group relation=relationship/>
      <@groupMeetingStateTemplate/>
    </@groupTemplateCollection>
    <#noparse>
<script src="/r/core.js?95413463d98e6dc7b6a4f11ac5f58837" type="text/javascript"></script><script type="text/javascript">(function(){var RH=NEJ.P,W=NEJ.O,A=RH("nej.e"),Q=RH("nej.v"),K=RH("nej.u"),bC=RH("mu.ui"),z=RH("mu.w.i"),gD;z.lS=NEJ.C();gD=z.lS.bg(z.gP);gD.bu=function(B){this.bx(B);this.ce=B.group||W;this.ws=B.relation||0};gD.cb=function(){this.cf();this.BW.innerHTML="&nbsp;";this.BX.innerHTML="&nbsp;";this.BY.innerHTML="&nbsp;"};gD.cH=function(){this.cJ="ntp-meeting-item"};gD.cW=function(){this.di();var G=A.bD(this.Z,"js-flag");this.BZ=G[0];this.BW=G[1];this.BX=G[2];this.JU=G[3];this.BY=G[4];this.JV=G[5];this.Ca=G[6];this.Cb=G[7];this.QM=G[8];this.JZ=G[9]};gD.gr=function(E){this.BZ.innerText=E.title||"活动标题";this.JZ.innerHTML=K.fo(E.startTime,"<p>M月</p><p>dd</p>");this.BZ.href=config.page("/meeting/"+E.id+"/");this.JV.innerHTML=E.details||"";this.Ca.href=config.page("/meeting/"+E.id+"/");this.Ca.innerText="...更多信息";var da=E.organizer||W;this.Cb.innerText=da.nickname||da.username;this.Cb.href=config.page("/member/"+da.id+"/");E.startDateTime=new Date(E.startTime);var B={meeting:E,host:this.dt,group:this.ce,state:A.dw("jst-meeting-state",{relation:this.ws,homepage:this.ce.homepage,meeting:E,state:E.state,now:+(new Date)})};this.BW.innerHTML=A.dw("jst-meeting-summary",B);this.BX.innerHTML=A.dw("jst-meeting-count",B);this.JU.innerText=[E.province,E.city,E.area,E.address].join("");this.BY.innerHTML=A.dw("jst-meeting-attendee",{group:this.ce,xlist:E.attendees||[]})}})();
(function(){var RH=NEJ.P,W=NEJ.O,A=RH("nej.e"),Q=RH("nej.v"),K=RH("nej.u"),bf=RH("nej.ut"),bd=RH("mu.ut"),bO=RH("mu.x"),bC=RH("mu.w.i"),co=RH("mu.w.w"),z=RH("mu.m.g"),qE;z.Ce=NEJ.C();qE=z.Ce.bg(z.dP);qE.bu=function(B){this.bx(B);this.bA.item.host=this.dt;this.bA.item.group=this.ce;this.bA.item.relation=B.relation||0;this.bA.cache.data.gid=this.ce.id;this.jR.cache.data.gid=this.ce.id;this.QK=bf.hi.bi(this.jR);this.dC.index=B.index||0;this.gu=bf.fA.bi(this.dC)};qE.bG=function(){this.dC={list:A.cT("home-meeting-btn"),onchange:this.vk.I(this)};this.bA={limit:10,item:{},more:"home-meeting-more",parent:"home-meeting-box",cache:{klass:bd.gZ,data:{order:"desc",sort:"startTime"}},onbeforelistload:function(D){D.value='<p class="w-loading">&nbsp;</p>'},onemptylist:function(D){D.value=A.eJ("txt-home-nomeet")}};var G=A.bD("module-5","j-flag");this.jR={limit:10,more:G[1],parent:G[0],item:"event-list",cache:{klass:bd.tw,lkey:"recent-list",data:{}},onbeforelistload:bO.kr,onemptylist:function(D){D.value='<div class="w-message">没有动态</div>'}}};qE.vk=function(D){if(this.kZ)this.kZ.bR();var vg=this.bA.item;switch(D.index){case 0:vg.klass=bC.lS;break;case 1:vg.klass="jst-meeting-list";break;case 2:vg.klass="jst-meeting-draft";break}this.bA.cache.data.type=D.index;this.bA.cache.lkey="meeting-"+D.index;this.kZ=bf.hi.bi(this.bA)}})();
(function(){var RH=NEJ.P;RH("data").index=parseInt(location.hash.substring(1,2))||0;RH("mu.x").cL(RH("mu.m.g").Ce)})()</script>
    </#noparse>
  </body>
</html>