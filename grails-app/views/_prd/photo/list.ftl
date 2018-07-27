<!DOCTYPE html>
<html>
  <head>
    <title>组织相册 - 聚否</title>
    <@head/>
<link href="/r/core.css?37707d0cec0b7e9a161b7da206a49779" type="text/css" rel="stylesheet"/><style type="text/css">#www-jufou-com .t-mdl-30 .mtx{font-size:26px;padding-left:7px;}.t-mdl-30,.t-mdl-31{margin-left:4px;}.t-mdl-30 .xtl{margin:20px 0;padding-left:40px;font-size:15px;}.t-mdl-30 .xtl .n{font-size:25px;font-weight:bold;margin-right:30px;letter-spacing:-2px;}.t-mdl-30 .w-fom{padding:10px 20px;margin:18px 0;}.t-mdl-30 .xlb{font-size:14px;font-weight:bold;}.t-mdl-30 .pgx{padding:20px 15px;border-width:1px 0 0;border-style:solid;}#www-jufou-com .t-mdl-31 .mtx{font-size:26px;padding-left:2px;font-weight:normal;}.t-mdl-31 .anx{padding:5px 0 18px;margin-top:-9px;font-size:24px;font-weight:bold;border-width:0 0 1px;border-style:solid;}.t-mdl-31 .pgx{padding:20px 15px;border-width:1px 0 0;border-style:solid;}.t-mdl-31 .atx{font-size:13px;font-weight:normal;padding:18px 0 3px 30px;background-position:8px -1733px;display:block;}.t-mdl-31 .xbx{margin-top:24px;}.w-xpt{margin:8px 16px 11px;height:230px;}.w-xpt .img{width:210px;height:140px;}.w-xpt .img img{width:210px;height:140px;}.w-xpt .dtl{line-height:20px;}.w-xpt .dtl .ln0{padding:8px 4px;overflow:hidden;width:200px;font-weight:bold;max-height:36px;margin-bottom:3px;}.w-xpt .dtl .ln1{margin:-6px 6px;}.w-xpt .dtl .ln2{margin:8px 4px;line-height:10px;}</style>
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
        <@groupPhotoList group=group album=album/>
      </div>
    </@groupBody>
    <@groupTemplateCollection group=group host=host>
      <@groupPhotoTemplate album=album/>
    </@groupTemplateCollection>
    <#noparse>
<script src="/r/core.js?95413463d98e6dc7b6a4f11ac5f58837" type="text/javascript"></script><script type="text/javascript">(function(){var RH=NEJ.P,W=NEJ.O,A=RH("nej.e"),Q=RH("nej.v"),K=RH("nej.u"),bC=RH("nej.ui"),bf=RH("mu.x"),bd=RH("mu.ut"),co=RH("mu.w.w"),z=RH("mu.m.g"),iC;z.CR=NEJ.C();iC=z.CR.bg(z.dP);iC.bu=function(B){this.bx(B);this.ez=B.album||W;this.hV.aid=this.ez.id;this.hV.gid=this.ce.id;var cK=Math.ceil(this.ez.photoCount/this.cu.limit);this.cu.total=cK;A.bM(this.cu.parent,"visibility",cK>1?"visible":"hidden");this.ef=bC.mP.bi(this.cu)};iC.bG=function(){this.Z=A.bm("module-31");var G=A.bD(this.Z,"js-yflag");Q.bo(G[0],"click",this.Mv.I(this));var G=A.bD(this.Z,"js-zflag");this.oo=G[0];this.cu={index:1,limit:15,clazz:"w-pager",parent:G[1],onchange:this.kG.I(this)};this.hV={onok:this.wL.I(this)};this.bl=bd.mC.bi({onlistload:this.wT.I(this),onitemadd:this.ev.I(this)})};iC.mi=function(){this.oo.innerHTML='<p class="w-loading">&nbsp;</p>'};iC.kG=function(D){this.mi();this.dg=(D.index-1)*this.cu.limit;this.bl.iy({key:"photo-"+this.ez.id,offset:this.dg,limit:this.cu.limit,data:{aid:this.ez.id,offset:this.dg,limit:this.cu.limit}})};iC.wT=function(B){if(B.offset!=this.dg)return;var G=this.bl.fH(B.key);A.mZ(this.oo,"jst-photo-list",{xlist:G,group:this.ce,beg:B.offset,end:Math.min(G.length,B.offset+B.limit)-1})};iC.Mv=function(D){Q.cl(D);this.kh=co.oM.bi(this.hV);this.kh.cB()};iC.wL=function(bY){this.bl.jm({key:"photo-"+this.ez.id,item:bY})};iC.ev=function(B){this.kh.dz();if(!B.data){bf.bZ("文件上传失败，请重试！");return}this.kh.dS();this.kG({index:this.ef.hZ()||1})}})();
(function(){var RH=NEJ.P;RH("mu.x").cL(RH("mu.m.g").CR)})()</script>
    </#noparse>
  </body>
</html>