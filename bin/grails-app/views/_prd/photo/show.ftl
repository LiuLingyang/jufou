<!DOCTYPE html>
<html>
  <head>
    <title>组织相册 - 聚否</title>
    <@head/>
<link href="/r/core.css?37707d0cec0b7e9a161b7da206a49779" type="text/css" rel="stylesheet"/><style type="text/css">.t-mdl-40{margin-left:4px;}.t-mdl-40 .t-cnt{margin-top:-10px;}.t-mdl-40 .xtp{border-width:0 0 1px;border-style:solid;}.t-mdl-40 .xtp .xtl{line-height:40px;font-size:24px;font-weight:bold;}.t-mdl-40 .xtp .xab{padding:10px 0 19px;}.t-mdl-40 .xtp .xab .xi{margin-right:10px;padding:3px 0 3px 30px;background-position:8px -1747px;}.t-mdl-40 .xtp .xab .xi-01{background-position:8px -1662px;}.t-mdl-40 .xtp .xab .xi-02{background-position:4px -1584px;}.t-mdl-40 .xmn{font-size:13px;margin:4px 6px;}.t-mdl-40 .xmn .xab{padding:15px 0;}.t-mdl-40 .xmn .xab .sp{margin:0 2px;}.t-mdl-40 .xmn .xhw .rhw{width:96px;margin-left:-100px;}.t-mdl-40 .xmn .xhw .lhw{margin-right:115px;text-align:center;overflow:hidden;}.t-mdl-40 .xmn .xhw .lhw img{display:block;max-width:100%;margin:0 auto;}.t-mdl-40 .xcm{margin:30px 114px 0 0;}.t-mdl-40 .xcm textarea{width:490px;}.t-mdl-40 .xcm .tpx,.t-mdl-40 .xcm .rpx{border-width:1px;}.t-mdl-40 .xcm .lbx{padding:5px 0;margin:-6px 18px;}.t-mdl-40 .rhw .xbx .xit{display:block;width:40px;height:30px;margin:2px;text-align:center;cursor:pointer;}.t-mdl-40 .rhw .xbx .xit img{display:block;margin:0 auto;width:40px;height:30px;}.t-mdl-40 .rhw .xpg{padding:10px 0;}#www-jufou-com .t-mdl-40 .mtx{font-size:21px;color:#999;}.t-mdl-40 .w-cmx .t-btn{margin:-2px -9px 0 0;}.t-mdl-40 .w-cmx .axt{margin-right:7px;}</style>
    <@theme/>
  </head>
  <body id="www-jufou-com">
    <@groupBody group=group
        options={
          "index":3,
          "user":host!{},
          "groups":otherGroups,
          "relationship":relationship,
          "photoCount":photoCount!0,
          "pastCount":pastCount!0,
          "upcomingCount":upcomingCount!0
        }>
      <div class="l-lmc f-cb group-photo">
        <@messagebox/>
        <@groupPhotoShow group=group album=album photo=photo relation=relationship/>
      </div>
    </@groupBody>
    <@groupTemplateCollection group=group host=host>
      <@groupCommentTemplate group=group host=host
        role=parseRelation2Role(host,relationship)/>
      <@groupPhotoShowTemplate album=album photo=photo/>
    </@groupTemplateCollection>
    <#noparse>
<script src="/r/core.js?95413463d98e6dc7b6a4f11ac5f58837" type="text/javascript"></script><script type="text/javascript">(function(){var RH=NEJ.P,W=NEJ.O,A=RH("nej.e"),K=RH("nej.u"),bC=RH("mu.ui"),z=RH("mu.w.w"),nv;var ca=A.dX('<form class="w-fom"><div class="blk"><p class="lab">相册</p><select class="bd01 w-rd3 wd0 mr5" name="aid"></select></div><div class="xbtn f-cb"><input type="button" class="fl w-rd3 btn btn-c" name="btn-cc" value="取  消"/><input type="button" class="fl w-rd3 btn btn-k" name="btn-ok" value="确  定"/></div></form>');z.CU=NEJ.C();nv=z.CU.bg(bC.eV);nv.bu=function(B){B.title="选择相册";B.clazz="w-win-b";this.lc();this.MA(B.albums);this.bx(B)};nv.cH=function(){this.cJ=ca};nv.lc=function(){var ri=this.by.bm("aid");K.gm(ri.options,function(N,bn,G){ri.remove(bn)})};nv.MA=function(G){var ri=this.by.bm("aid");K.bS(G,function(ps){ri.add(new Option(ps.name,ps.id))})}})();
(function(){var RH=NEJ.P,W=NEJ.O,A=RH("nej.e"),Q=RH("nej.v"),K=RH("nej.u"),bf=RH("nej.ut"),bO=RH("mu.x"),bd=RH("mu.ut"),co=RH("mu.w.w"),z=RH("mu.m.g"),fl;z.CW=NEJ.C();fl=z.CW.bg(z.dP);fl.bu=function(B){this.bx(B);this.ez=B.album||W;this.mY=B.photo||W;this.hV.aid=this.ez.id;this.bW.host=this.dt;this.bW.group=this.ce;this.bW.owner=this.mY;this.CY=z.uB.bi(this.bW);this.bA.cache.data.aid=this.ez.id;this.bA.cache.lkey="photo-"+this.ez.id;this.cs=bf.hg.bi(this.bA)};fl.cb=function(){this.cf();this.CY=this.CY.bR();this.cs=this.cs.bR()};fl.bG=function(){this.Z=A.bm("module-40");var G=A.bD(this.Z,"js-xflag");this.bA={limit:15,parent:G[0],item:"jst-photo-list",cache:{klass:bd.mC,data:{}},pager:{parent:G[1],klass:bf.Qz},onbeforelistload:this.MH.I(this)};this.bW={parent:G[2],type:2};var G=A.bD(this.Z,"js-yflag");this.MI=A.cT(G[0])[0];Q.bo(G[0],"click",this.MJ.I(this));Q.bo(G[1],"click",this.MK.I(this));this.hV={onok:this.wL.I(this)};this.ks={title:"重命名相册",data:{},onok:this.ML.I(this)};this.fk={message:"确定要删除此相册？",onok:this.MN.I(this)};this.cu={message:"确定要删除此相片？",onok:this.MO.I(this)};this.jR={onok:this.MP.I(this)};this.bl=bd.mC.bi({onitemadd:this.ev.I(this),onitemdelete:this.gR.I(this),onalbumupdate:this.MQ.I(this),onphotomove:this.MR.I(this),onlistload:this.MS.I(this)})};fl.MH=function(D){D.value='<p class="w-loading">&nbsp;</p>'};fl.MJ=function(D){var N=Q.cy(D,"d:action");if(!N)return;Q.cl(D);var eQ=A.bQ(N,"action");switch(eQ){case"upload":this.kh=co.oM.bi(this.hV);this.kh.cB();break;case"rename":this.ks.data.name=this.ez.name;co.ue.bi(this.ks).cB();break;case"delete":co.jT.bi(this.fk).cB();break}};fl.wL=function(bY){this.bl.jm({key:this.bA.cache.lkey,item:bY})};fl.ev=function(B){this.kh.dz();if(!B.data){bO.bZ("文件上传失败，请重试！");return}this.bl.iv(B.key);this.kh.dS();this.cs.dz()};fl.ML=function(D){var E=D.data;E.aid=this.ez.id;this.bl.Af(E)};fl.MQ=function(bj){if(bj.code!=1){bO.bZ("暂时无法更新相册，请稍候再试！");return}this.ez=bj.result;this.MI.innerText=this.ez.name};fl.MK=function(D){var N=Q.cy(D,"d:action");if(!N)return;Q.cl(D);var eQ=A.bQ(N,"action");switch(eQ){case"slide":break;case"cover":this.bl.Af({aid:this.ez.id,pid:this.mY.id});break;case"delete":co.jT.bi(this.cu).cB();break;case"move":this.bl.iy({offset:0,limit:100,data:{gid:this.ce.id},key:"album-"+this.ce.id});break}};fl.MS=function(B){this.jR.albums=this.bl.fH(B.key);co.CU.bi(this.jR).cB()};fl.MP=function(D){this.bl.PT({aid:D.data.aid,pid:this.mY.id})};fl.MR=function(bj){if(bj.code!=1){bO.bZ("暂时无法移动相片，请稍候再试！");return}location.reload()};fl.MN=function(){this.bl.uG({id:this.ez.id,key:"album-"+this.ce.id,data:{aid:this.ez.id}})};fl.MO=function(){this.bl.uG({id:this.mY.id,key:"photo-"+this.ez.id,data:{aid:this.ez.id,pid:this.mY.id}})};fl.gR=function(B){var bh=B.key.split("-")[0];if(!B.data){bO.bZ(bh=="album"?"暂时无法删除相册，请稍候再试！":"暂时无法删除相片，请稍候再试！");return}if(bh=="album"){location.href=config.page("/album/");return}location.href=config.page("/album/"+this.ez.id+"/")}})();
(function(){var RH=NEJ.P;RH("mu.x").cL(RH("mu.m.g").CW)})()</script>
    </#noparse>
  </body>
</html>