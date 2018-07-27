<!DOCTYPE html>
<html>
  <head>
    <title>申请加入 - 聚否</title>
    <@head/>
<link href="/r/core.css?37707d0cec0b7e9a161b7da206a49779" type="text/css" rel="stylesheet"/><style type="text/css">.t-mdl-70 .wd0{width:605px;}.t-mdl-70 .wd1{width:590px;margin-left:14px;}.t-mdl-70 .ht0{height:140px;}.t-mdl-70 .xtp{margin:14px 9px;}.t-mdl-70 .blk{margin:15px 0;}.t-mdl-70 .blk .ytl{padding:5px 8px;font-size:14px;font-weight:bold;}.t-mdl-70 .blk .ybt{position:relative;}.t-mdl-70 .blk .ybt .fux{top:16px;width:180px;height:30px;}.t-mdl-70 .blk .ybt .t-btn{margin:15px 10px 15px 11px;}.t-mdl-70 .blk .img img{display:block;max-width:100%;margin:11px 15px;}.t-mdl-70 .blk .qbk{margin:10px 0 20px;}.t-mdl-70 .blk .qbk .ln0{padding:3px 0 8px 17px;}.t-mdl-70 .xxq{margin-top:35px;}#www-jufou-com .t-mdl-70 .xxx .js-error{position:static;padding-left:0;margin-top:5px;}#www-jufou-com .t-mdl-70 .xxx .js-pass{visibility:hidden;}#www-jufou-com .t-mdl-70 .js-counter{left:7px;top:157px;padding-left:0;}#www-jufou-com .t-mdl-70 textarea{vertical-align:text-top;}#www-jufou-com .t-mdl-70 .mtx{font-size:26px;letter-spacing:-3px;padding-left:7px;}.t-mdl-70 .tip{margin-top:46px;}.group-join .join{margin-left:4px;}</style>
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
        <@groupJoin group=group user=attendance/>
      </div>
    </@groupBody>
    <@groupTemplateCollection group=group host=host/>
    <#noparse>
<script src="/r/core.js?95413463d98e6dc7b6a4f11ac5f58837" type="text/javascript"></script><script type="text/javascript">(function(){var RH=NEJ.P;RH("mu.x").cL(RH("mu.m.g").vJ)})()</script>
    </#noparse>
  </body>
</html>