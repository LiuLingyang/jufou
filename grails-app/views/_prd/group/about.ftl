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
        <@groupHomeJoin group=group relation=relationship/>
        <@groupHomeTop group=group/>
      </div>
    </@groupBody>
    <#noparse>
<script src="/r/core.js?95413463d98e6dc7b6a4f11ac5f58837" type="text/javascript"></script><script type="text/javascript">(function(){var RH=NEJ.P,z=RH("mu.m.g"),JB;z.BQ=NEJ.C();JB=z.BQ.bg(z.dP)})();
(function(){var RH=NEJ.P;RH("mu.x").cL(RH("mu.m.g").BQ)})()</script>
    </#noparse>
  </body>
</html>