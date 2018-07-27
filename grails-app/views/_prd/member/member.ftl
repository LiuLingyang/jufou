<!DOCTYPE html>
<html>
  <head>
    <title>组织成员 - 聚否</title>
    <@head/>
<link href="/r/core.css?37707d0cec0b7e9a161b7da206a49779" type="text/css" rel="stylesheet"/><style type="text/css">.t-mdl-60{margin-left:4px;}.t-mdl-60 .w-wtb{margin:25px 0;}.t-mdl-60 .w-wtb .abox{border-width:0;}.t-mdl-60 .xact{margin:20px 0;}.t-mdl-60 .xact .xi{margin-right:10px;padding:15px 0 10px 55px;font-size:13px;letter-spacing:-1px;}.t-mdl-60 .xact .xi-01{background-position:17px -2404px;margin-left:-11px;}.t-mdl-60 .xact .xi-02{background-position:14px -2527px;margin-left:5px;}.t-mdl-60 .xact .xi-03{background-position:14px -2644px;}.t-mdl-60 .sbox {margin:22px 0 -2px;font-size:14px;padding:10px 20px;}.t-mdl-60 .sbox label{font-weight:bold;}.t-mdl-60 .sbox select{width:110px;}.t-mdl-60 .lbox{padding:20px 0;}.t-mdl-60 .js-role-1{padding:1px 0 1px 20px;background-position:0px -2007px;}.t-mdl-60 .js-role-2,.t-mdl-60 .js-role-3{padding:1px 0 1px 20px;background-position:0px -2099px;}#www-jufou-com .t-mdl-60 .mtx{font-size:26px;padding-left:7px;}.t-mdl-60 .tbox{margin-left:3px;}.t-mdl-60 .sort{font-size:16px;margin-left:4px;}.t-mdl-60 .txt2{width:140px;padding-left:10px;}.t-mdl-60 .tip{margin:2px 20px;}.t-mdl-60 .ln0{}.w-mitx{padding:10px 0;margin-bottom:-1px;border-width:1px 0;border-style:dashed;}.w-mitx .img{width:70px;margin-right:-70px;text-align:center;}.w-mitx .img img{display:block;width:50px;height:50px;margin:6px 16px;}.w-mitx .act{width:300px;margin:25px 0;}.w-mitx .act .t-btn{margin:0 12px;}.w-mitx .act .ln{line-height:20px;margin-left:187px;}.w-mitx .dtl{margin:0 290px 0 70px;line-height:24px;}.w-mitx .dtl .ln{margin-left:5px;}.w-mitx .dtl .ln3{line-height:18px;max-height:36px;overflow:hidden;letter-spacing:1px;}.w-mitx .dtl .wrd{font-size:16px;font-weight:bold;}</style>
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
      <div class="l-lmc f-cb group-member">
        <@messagebox/>
        <@groupMember group=group host=host
          relationship=relationship counts={
              "all":allCount!0,
              "admin":adminCount!0,
              "join":joinCount!0,
              "ban":banCount!0
          }/>
      </div>
    </@groupBody>
    <@groupTemplateCollection group=group host=host>
      <@groupMemberTemplate relationship=relationship/>
    </@groupTemplateCollection>
    <#noparse>
<script src="/r/core.js?95413463d98e6dc7b6a4f11ac5f58837" type="text/javascript"></script><script type="text/javascript">(function(){var RH=NEJ.P,A=RH("nej.e"),Q=RH("nej.v"),K=RH("nej.u"),z=RH("mu.w.i"),ku;z.CH=NEJ.C();ku=z.CH.bg(z.gP);ku.bu=function(B){this.mr=B.role;this.oy=B.type;this.bx(B)};ku.cb=function(){A.cG(this.lo,"js-role-"+this.cU.role);this.cf()};ku.cH=function(){this.cJ="ntp-member-item"};ku.cW=function(){this.di();var G=A.bD(this.Z,"js-xflag");this.vq=G[0];this.LL=G[1];this.iT=G[2];this.lo=G[3];this.LN=G[4];this.LO=G[5];Q.bo(G[1],"click",this.fO.I(this))};ku.gr=function(){var LP={1:"会员",2:"管理员",3:"创建者"};return function(E){var da=E.attendee||W;this.vq.src=da.portrait||config.url.portrait;this.iT.innerText=da.nickname;this.iT.href=config.page("/member/"+da.id+"/");A.bM(this.lo,"display",this.oy==0?"":"none");this.lo.innerText=LP[E.role]||"";A.cZ(this.lo,"js-role-"+E.role);this.LO.innerText=E.bio;this.LN.innerText=(this.oy<2?"加入时间":"申请时间")+"："+K.fo(E.attendTime,"yyyy年MM月dd日");this.LL.innerHTML=A.dw("jst-member-action",{user_role:this.mr||E.role})}}();ku.fO=function(D){Q.cl(D);var eQ=A.bQ(Q.cy(D),"action");if(!!eQ)this.be("onaction",{action:eQ,data:this.cU})}})();
(function(){var RH=NEJ.P,W=NEJ.O,A=RH("nej.e"),bC=RH("mu.ui"),z=RH("mu.w.w"),lD,CK;var ca=A.dX('<form class="w-fom w-wfm"><div class="msg cxx"><p class="ln0 js-flag"></p><p class="ln1"><textarea class="bd01 w-rd3" name="content" data-required="true" data-message="请输入发送的消息内容" maxlength="500"><&#47;textarea></p></div><div class="xbtn f-cb"><input type="button" class="fl w-rd3 btn btn-c" name="btn-cc" value="取  消"/><input type="button" class="fl w-rd3 btn btn-k" name="btn-ok" value="确  定"/></div></form>');z.sG=NEJ.C();lD=z.sG.bg(bC.eV);CK=z.sG.cc;lD.bu=function(B){B.title="发送消息";B.clazz="w-win-c";this.bx(B)};lD.cH=function(){this.cJ=ca};lD.cW=function(){this.di();this.LT=A.bD(this.Z,"js-flag")[0]};lD.vT=function(E){CK.vT.apply(this,arguments);this.LT.innerText="发送给："+this.qO.nickname};lD.gE=function(E){E.uid=this.qO.id;return E}})();
(function(){var RH=NEJ.P,W=NEJ.O,A=RH("nej.e"),Q=RH("nej.v"),K=RH("nej.u"),bF=RH("nej.ui"),bf=RH("nej.ut"),bO=RH("mu.x"),bd=RH("mu.ut"),co=RH("mu.w.w"),bC=RH("mu.w.i"),z=RH("mu.m.g"),fs;z.CM=NEJ.C();fs=z.CM.bg(z.dP);fs.bu=function(B){this.bx(B);this.bA.cache.data.gid=this.ce.id;this.dC.index=parseInt(location.hash.substr(1))||0;this.gu=bf.fA.bi(this.dC)};fs.bG=function(){this.Z=A.bm("module-60");var G=A.bD("member-tab-box","js-xflag");this.iW=G[0];this.iE=this.iW.sort;Q.bo(G[0],"change",this.mb.I(this));bO.sU(this.iW.keyword,this.iW["btn-search"],{onok:this.LZ.I(this)});this.dC={list:A.cT("member-tab-btn"),onchange:this.vk.I(this)};this.kX={onok:this.AO.I(this)};this.bA={limit:10,parent:G[1],item:{klass:bC.CH,onaction:this.fO.I(this)},pager:{clazz:"w-pager",parent:G[2]},cache:{data:{},klass:bd.mJ},onbeforelistload:this.mi.I(this),onemptylist:this.nj.I(this),onbeforelistrender:this.Mb.I(this)};this.bl=bd.mJ.bi({onadmin:this.Mc.I(this),onmember:this.Md.I(this),onkickout:this.Me.I(this)});this.tc=bd.ui.bi({onmessage:this.Mf.I(this)})};fs.mi=function(D){A.bM(this.iW,"visibility","hidden");D.value='<p class="w-loading">&nbsp;</p>'};fs.nj=function(D){A.bM(this.iW,"visibility","hidden");D.value='<p class="w-message">没有会员</p>'};fs.Mb=function(){A.bM(this.iW,"visibility","")};fs.vk=function(D){var gt=D.index;location.hash=gt;this.bA.cache.data.role=gt;var bq=this.bA.item;bq.type=gt;if(gt==2){bq.role=-1}else if(gt==3){bq.role=-2}else{delete bq.role}this.iW.keyword.value="";var bb=this.iE.selectedIndex,bn=parseInt(A.bQ(this.iE,"index"))||0;if(bb!=bn){this.iE.selectedIndex=bn}else{this.mb()}};fs.LZ=function(bb){this.mb()};fs.mb=function(){var xI=["attendee.nickname","attendee.nickname","attendTime","attendTime"],xB=["asc","desc","asc","desc"];return function(){if(!!this.cs)this.cs.bR();var gt=this.bA.cache.data.role,hk=this.iE.value,E=this.bA.cache.data,CP=this.iW.keyword.value.trim();this.bA.cache.lkey=gt+"-"+hk+"-"+CP;E.type=hk;E.order=xB[hk-1];E.sort=xI[hk-1];E.keyword=CP;this.cs=bf.hg.bi(this.bA)}}();fs.fO=function(D){switch(D.action){case"admin-a":case"admin-c":this.bl.Pt({gid:this.ce.id,uid:D.data.attendee.id,role:D.action=="admin-a"?1:-1});return;case"cocreate-a":case"cocreate-c":this.bl.Pt({gid:this.ce.id,uid:D.data.attendee.id,role:D.action=="cocreate-a"?1:-1});return;case"member-a":case"member-r":this.bl.Aa({gid:this.ce.id,uid:D.data.attendee.id,role:D.action=="member-a"?1:-1});return;case"cancel":this.bl.Pv({gid:this.ce.id,uid:D.data.attendee.id});return;case"message":this.kX.ext=D.data.attendee;co.sG.bi(this.kX).cB();return}};fs.AO=function(D){D.data.uid=D.ext.id;D.data.gid=this.ce.id;this.tc.mA(D.data)};fs.Mf=function(bj){bj.code!=1?bO.bZ("暂时无法发送消息，请稍候再试"):bO.pQ("消息发送成功")};fs.Mc=function(bj){this.gr(bj)};fs.Md=function(bj){this.gr(bj)};fs.Me=function(bj){this.gr(bj)};fs.gr=function(bj){switch(bj.code){case 1:location.reload();return;default:bO.bZ("暂时无法操作，请稍候再试");return}}})();
(function(){var RH=NEJ.P;RH("mu.x").cL(RH("mu.m.g").CM)})()</script>
    </#noparse>
  </body>
</html>