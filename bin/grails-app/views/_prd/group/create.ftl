<!DOCTYPE html>
<html>
  <head>
    <title>创建组织 - 聚否</title>
    <@head/>
<link href="/r/core.css?37707d0cec0b7e9a161b7da206a49779" type="text/css" rel="stylesheet"/><style type="text/css">.t-mdl-c0{padding-bottom:94px;}.t-mdl-c0 .tbx{width:420px;}.t-mdl-c0 .xln{margin:15px 3px;}.t-mdl-c0 .xmr{margin:29px 4px;}.t-mdl-c0 .yls{margin:18px 3px;}.t-mdl-c0 .yls .tip{margin-left:3px;}.t-mdl-c0 .yln{margin:24px 0 10px 4px;font-weight:bold;}.t-mdl-c0 .tip{margin-left:6px;}.t-mdl-c0 .yln2{margin:29px 0 10px 4px;font-weight:bold;}.t-mdl-c0 .xtl{font-size:14px;font-weight:bold;}.t-mdl-c0 .ytg{margin:5px 10px 5px 0;padding:4px 8px 4px 30px;border-width:1px;border-style:solid;cursor:pointer;white-space:nowrap;}#www-jufou-com .t-mdl-c0 .mtx{font-size:26px;}
.t-mdl-d0{padding-bottom:75px;}.t-mdl-d0 .blk{margin:30px 0;}.t-mdl-d0 .xblk{width:420px;margin:19px 6px;}.t-mdl-d0 .xblk .txt{width:385px;}.t.mdl-d0 .xblk .tip{line-height:18px;}.t-mdl-d0 .xblk .w-txg .wnm{width:350px;overflow:hidden;margin-top:4px;font-size:12px;}.t-mdl-d0 .blk .xtl{margin:12px 0;font-size:14px;font-weight:bold;}.t-mdl-d0 .blk .tip{line-height:18px;}.t-mdl-d0 .blk .xln{margin:17px 7px;}.t-mdl-d0 .blk .cbx{margin-right:10px;}.t-mdl-d0 .blk textarea{width:600px;height:150px;margin-top:10px;vertical-align:text-top;}.t-mdl-d0 .blk .nok .js-pass{visibility:hidden;}.t-mdl-d0 .w-txg{margin-top:27px;}.t-mdl-d0 .blk-x{margin-top:76px;}#www-jufou-com .t-mdl-d0 .mtx{font-size:26px;}
#www-jufou-com .t-mdl-a0 .mtx{font-size:26px;}.t-mdl-a0{padding:5px 18px 25px;}.t-mdl-a0 .t-cnt{margin-left:7px;}.t-mdl-a0 .ipt{margin:3px;}.t-mdl-a0 .t-ttl{letter-spacing:-1px;padding:10px 0 14px;}.t-mdl-a0 .tip1{margin-left:-6px;}.t-mdl-a0 .tip2{margin-left:10px;}.t-mdl-a0 .wd0{width:390px;}.t-mdl-a0 .wd1{width:600px;}.t-mdl-a0 .wd2{width:480px;}.t-mdl-a0 .wd3{width:85px;}.t-mdl-a0 .wd4{width:130px;margin-right:18px;}.t-mdl-a0 .ht0{height:140px;}.w-byk{margin:20px 0 25px;}.w-byk .lab{padding-bottom:10px;font-size:14px;font-weight:bold;margin-left:-1px;}.w-byk .tip1{font-size:12px;font-weight:normal;margin-left:4px;}.w-byk .tip2{font-size:12px;font-weight:normal;margin-left:1px;}.w-byk .itm1{margin-top:26px;}.w-byk .itm2{margin-top:29px;}.w-byk select{margin-right:10px;}.w-byk .acp{margin-top:40px;}.w-byk .acp .wrd{padding-left:12px;}.w-byk .acp .js-mhd{margin-left:160px;}.w-byk .acp .js-pass{visibility:hidden;}
.w-stp{margin:20px 0 0;text-align:center;}.w-stp .itm{width:157px;height:41px;line-height:34px;color:#666;font-size:18px;font-weight:bold;}.w-stp .itm.js-selected{background-position:10px -709px;color:#fff;}.g-gnw .inrx{margin-left:26px;margin-top:38px;}.g-gnw .inrx1{margin-left:23px;margin-top:23px;}.g-gnw .inrx1 .xmr{29px 0 0 5px;}.g-gnw .w-tbar{margin-bottom:20px;}.g-gnw .yls{float:left;width:470px;}.g-gnw .yrs{float:left;margin-top:50px;}</style>
    <@theme/>
  </head>
  <body id="www-jufou-com">
    <@page user=host index=2 class="g-gnw t-gbx g-xxx">
      <@messagebox/>
      <form class="w-fom s-srd">
        <@module title="创建属于你的组织" id="a0" class="t-mdi t-mdf">
          <@groupCreateStep index=1/>
          <div class="inrx"><@groupFormSettingBasic check=true/></div>
        </@module>
	    <div class="w-tbar bd02 bg01 f-cb">
	      <input type="button" class="fr w-rd3 t-btn t-btn-4" name="btn-ok" value="创建组织"/>
	      <a class="fr w-rd3 t-btn t-btn-2" href="/">取消</a>
	    </div>
      </form>
    </@page>
    <@groupTemplateCollection host=host>
      <@groupCreateTemplate/>
      <@groupTagItemTemplate/>
      <@groupSettingTagTemplate/>
    </@groupTemplateCollection>
    <#noparse>
<script src="/r/core.js?95413463d98e6dc7b6a4f11ac5f58837" type="text/javascript"></script><script type="text/javascript">(function(){var RH=NEJ.P,A=RH("nej.e"),bd=RH("mu.ut"),z=RH("mu.m.g"),nJ,xx;z.xs=NEJ.C();nJ=z.xs.bg(z.tX);xx=z.xs.cc;nJ.bG=function(){xx.bG.call(this);this.bl=bd.eS.bi({ongroupcreate:this.dZ.I(this)})};nJ.tT=function(E){this.bl.ek(E)};nJ.dZ=function(bj){if(bj.code==1){dispatcher.ij("/?/m/s2/");return}xx.dZ.apply(this,arguments)};nJ.hx=function(){A.bm("page-box").appendChild(this.Z)}})();
(function(){var RH=NEJ.P,W=NEJ.O,A=RH("nej.e"),Q=RH("nej.v"),K=RH("nej.u"),bs=RH("nej.j"),bd=RH("mu.ut"),bC=RH("mu.w.i"),z=RH("mu.m.g"),nF,BS;z.xj=NEJ.C();nF=z.xj.bg(z.pK);BS=z.xj.cc;nF.bu=function(B){this.bx(B);this.df=A.jG(new Array(5),bC.lz,this.dC);this.by=bd.dF.bi({form:this.Z})};nF.bG=function(){this.Z=A.fg(A.eJ("txt-step-2"));BS.bG.call(this)};nF.gB=function(D){dispatcher.ij("/?/m/s3/")};nF.hx=function(){A.bm("page-box").appendChild(this.Z)}})();
(function(){var RH=NEJ.P,A=RH("nej.e"),K=RH("nej.u"),bd=RH("mu.ut"),bC=RH("mu.w.i"),z=RH("mu.m.g"),nE,BT;z.xa=NEJ.C();nE=z.xa.bg(z.pJ);BT=z.xa.cc;nE.bu=function(B){this.bx(B);this.fF=!0;this.df=A.jG(new Array(5),bC.lz,this.dC);this.fF=!1;this.by=bd.dF.bi({form:this.Z})};nE.bG=function(){this.Z=A.fg(A.eJ("txt-step-3"));BT.bG.call(this)};nE.gB=function(D){var cj=this.bl.jP();location.href="/"+cj.homepage+"/"};nE.hx=function(){A.bm("page-box").appendChild(this.Z)}})();
(function(){var RH=NEJ.P,A=RH("nej.e"),bd=RH("nej.ut"),jK=RH("mu.m.g");A.iK("template-box");window.dispatcher=bd.jY.nu().dr({"/?/m/s1/":{gid:"abc",module:jK.xs},"/?/m/s2/":{gid:"abc",module:jK.xj},"/?/m/s3/":{gid:"abc",module:jK.xa}}).ij("/?/m/s1/")})()</script>
    </#noparse>
  </body>
</html>