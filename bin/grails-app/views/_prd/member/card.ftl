<!DOCTYPE html>
<html>
  <head>
    <title>组织名片 - 聚否</title>
    <@head/>
<link href="/r/core.css?37707d0cec0b7e9a161b7da206a49779" type="text/css" rel="stylesheet"/><style type="text/css">#www-jufou-com .t-mdl-80 .mtx{font-size:16px;letter-spacing:0;}.t-mdl-80 .ln0{margin:2px 0 15px 1px;}.t-mdl-80 .ln0 .tp{margin-right:5px;}.t-mdl-80 .ln0 .a{display:none;}.t-mdl-80 .js-show .a{display:inline;}.t-mdl-80 .js-show .b{display:none;}.t-mdl-80 .xbox{border-width:1px 0 0;border-style:dashed;}.t-mdl-80 .xmor{}.t-mdl-80 .mtx{font-size:17px;}.t-mdl-80 .t-ttl{margin:-15px -2px -5px;}.t-mdl-81{margin-left:4px;margin-right:4px;}.t-mdl-81 .t-cnt{position:relative;zoom:1;margin-left:13px;}.t-mdl-81 .ln{margin:21px 0;}.t-mdl-81 .ln1{padding:2px 0 1px 23px;background-position:1px -2102px;margin-bottom:18px;}.t-mdl-81 .ln2{margin:15px 2px;}.t-mdl-81 .ln3{margin:16px 0 0 2px;}.t-mdl-81 .yact{padding:10px 0;margin:0 0 0 -13px;border-width:0 0 1px 0;border-style:solid;border-color:#eee;font-size:13px;}.t-mdl-81 .yact .edt{padding-left:30px;}.t-mdl-81 .blk{margin:15px 0;line-height:20px;}.t-mdl-81 .blk .ytl{font-weight:bold;margin:20px 1px 5px;}.t-mdl-81 .blk .asw{margin-left:20px;}#www-jufou-com .t-mdl-81 .mtx{font-size:26px;padding-left:7px;}.t-mdl-82 .img{margin:0 10px;}.t-mdl-82 .img img{width:160px;height:160px;}.w-jact{margin:15px 0 0 5px;padding:5px;line-height:26px;}.w-jact .t-btn{margin:0 5px;}</style>
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
      <div class="l-lmc f-cb group-join">
        <@messagebox/>
        <#if relationship==3&&attendance.state==0>
        <div class="w-jact bg01 f-cb" id="join-action-box">
          <span class="fl">是否允许该用户加入组织</span>
          <input class="fr w-rd3 t-btn t-btn-5" type="button" value="否" data-action="-1"/>
          <input class="fr w-rd3 t-btn t-btn-0" type="button" value="是" data-action="1"/>
        </div>
        </#if>
        <@groupMemberCardRight user=attendance host=host/>
        <@groupMemberCardMain user=attendance host=host group=group/>
      </div>
    </@groupBody>
    <@groupTemplateCollection group=group host=host>
      <@groupMemberCardTemplate user=attendance/>
    </@groupTemplateCollection>
    <#noparse>
<script src="/r/core.js?95413463d98e6dc7b6a4f11ac5f58837" type="text/javascript"></script><script type="text/javascript">(function(){var RH=NEJ.P,W=NEJ.O,dp=NEJ.R,A=RH("nej.e"),Q=RH("nej.v"),K=RH("nej.u"),bf=RH("nej.ut"),bO=RH("mu.x"),bd=RH("mu.ut"),z=RH("mu.m.g"),iI;z.CA=NEJ.C();iI=z.CA.bg(z.dP);iI.bu=function(B){this.bx(B);this.tv=(B.user||W).attendee||W;this.tm.item.roles=B.roles||dp;var bk=this.tm.cache;bk.lkey="all-"+this.tv.id;bk.data.uid=this.tv.id;bk.data.gid=this.ce.id;this.cs=bf.hi.bi(this.tm)};iI.bG=function(){this.QH=A.ek("p","w-loading");var G=A.bD("module-80","js-flag");this.tl=A.bD("module-80","js-xflag")[0];Q.bo(this.tl,"click",this.fO.I(this));this.tm={parent:G[0],more:G[1],item:{klass:"jst-group-list"},cache:{klass:bd.eS,data:{}},onbeforelistload:bO.kr,onemptylist:function(D){D.value='<p class="w-message">没有加入其它组织</p>'}};this.LB=bd.iO.bi({onhidejoinedgroup:this.LC.I(this)});var G=A.bD("module-81","js-flag");Q.bo(G[0],"click",this.tg.I(this));this.bl=bd.eS.bi({onexit:this.te.I(this)});Q.bo("join-action-box","click",this.LF.I(this));this.tc=bd.mJ.bi({onmember:this.LH.I(this)})};iI.LF=function(D){var N=Q.cy(D,"d:action");if(!N)return;this.tc.Aa({gid:this.ce.id,uid:this.tv.id,role:A.bQ(N,"action")})};iI.LH=function(bj){if(bj.code!=1){bO.bZ("暂时无法操作，请稍后再试");return}location.reload()};iI.fO=function(D){var N=Q.cy(D,"d:action");if(!N)return;Q.cl(D);this.LB.Ip({hidden:A.bQ(N,"action")=="hide"})};iI.LC=function(bj){switch(bj.code){case 1:!bj.result.hidden?A.cG(this.tl,"js-show"):A.cZ(this.tl,"js-show");break;default:bO.bZ("暂时无法修改设置，请稍后再试");break}};iI.tg=function(D){Q.cl(D);this.bl.Ae(this.ce.id)};iI.te=function(bj){switch(bj.code){case 1:location.reload();break;case-10:bO.bZ("组织创建者不允许退出组织！");break;default:bO.bZ("暂时无法退出组织，请稍候再试！");break}}})();
(function(){var RH=NEJ.P;RH("mu.x").cL(RH("mu.m.g").CA)})()</script>
    </#noparse>
  </body>
</html>