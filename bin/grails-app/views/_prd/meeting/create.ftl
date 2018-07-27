<!DOCTYPE html>
<html>
  <head>
    <title>创建活动 - 聚否</title>
    <@head/>
<link href="/r/core.css?37707d0cec0b7e9a161b7da206a49779" type="text/css" rel="stylesheet"/><style type="text/css">.t-mdl-10{margin-left:4px;padding-bottom:11px;}.t-mdl-10 .t-cnt{margin-top:18px;}#www-jufou-com .t-mdl-10 .mtx{font-size:26px;}.w-mblk .obar{position:relative;height:30px;line-height:30px;margin:15px 0;padding-left:10px;font-size:14px;font-weight:bold;cursor:pointer;}.w-mblk .obar .arw{position:absolute;right:10px;}.w-mblk .obar .btl{margin-left:2px;}.w-mblk .w-arw-t{top:4px;}.w-mblk .w-arw-b{top:13px;}.w-mblk .obox,.w-mblk .w-arw-t{display:none;}.w-mblk.js-toggle .w-arw-b{display:none;}.w-mblk.js-toggle .obox,.w-mblk.js-toggle .w-arw-t{display:block;}.w-mblk .lbk{margin-bottom:15px;}.w-mblk .sti{padding-left:10px;position:relative}.w-mblk .sti-s{margin:-3px 0 0 3px;}.w-mblk .sti-1{z-index:1}.w-mblk .sti-2{z-index:2}.w-mblk .sti .abt{margin-left:5px;font-size:12px;}.w-mblk .sti .itl{margin:5px 0;font-size:14px;}.w-mblk .sti .itp{font-size:12px;}.w-mblk .sti .pti{margin:10px 0;}.w-mblk .sti .ptl{margin:10px 0 15px;position:relative;}.w-mblk .sti .ptl-1{z-index:1}.w-mblk .sti .ptl-2{z-index:2}.w-mblk .sti .mr5{margin-right:18px;}.w-mblk .sti-x{margin-top:10px;}.w-mblk .sti-y{margin-top:15px;}.w-mblk .sti-s{margin:23px 0 0 3px;}#www-jufou-com .w-mblk .sti-1{margin-top:23px;}.w-mblk .brp{margin-top:20px;}.w-mblk .ick{margin:21px 0;}.w-mblk .ick-1{margin:14px 0;}.w-mblk .ick-2{margin:19px 0 0 2px;}.w-mblk .ick-3{margin:13px 0 0 1px;}.w-mblk .ick-4{margin-top:17px;}.w-mblk .ick-5{margin-top:-11px;}.w-mblk .signup{margin:-4px 0}.w-mblk .ick label{margin-right:20px;}.w-mblk .ick .cbx{margin-right:3px;vertical-align:middle;}.w-mblk .ick .cbx-s{margin-right:12px;}.w-mblk .lnx{margin:12px 0;}.w-mblk .lnx .lb{margin-right:12px;}.w-mblk .ftb{width:100%;margin-top:-13px;}.w-mblk .ftb .th{margin:5px 0;}.w-mblk .ftb .th span{padding:5px 0 5px 5px;}.w-mblk .ftb .tr{padding:5px 0;margin-top:7px;}.w-mblk .ftb .tr .c2{padding-left:10px;}.w-mblk .ftb .c1{width:250px;}.w-mblk .ftb .c2{width:310px;}#www-jufou-com .w-mblk .ftb .c3{padding-left:9px;}.w-mblk .ftb .c4{margin:3px 0 0 -83px;}.w-mblk .fdt{margin:14px 0 15px 3px;}.w-mblk .xx .js-pass{visibility:hidden;}.w-mblk .xmx .js-error{margin-left:199px;}.w-mblk .xox .js-error{margin-left:24px;}.w-mblk .txt{margin-top:3px;margin-right:8px;}.w-mblk .tip1{margin-top:17px;}.w-mblk .tip2{margin:18px 0 0 -2px;}.w-mblk .nxd{margin-top:12px;}.w-mblk .nxd-s{margin:-6px 0 0 2px;}#www-jufou-com .w-mblk .itl-1{margin-top:23px;}#www-jufou-com .w-mblk .itl-2{margin-top:26px;}.w-mblk .txt-s{margin:6px 0 0 -6px;}.meeting-create .w-mdat{width:85px;padding-left:30px;margin-right:10px;cursor:text;background-position:5px -190px;}.meeting-create .wd0{width:490px;}.meeting-create .wd1{width:125px;}.meeting-create .wd2{width:130px;}.meeting-create .wd3{width:50px;}.meeting-create .wd4{width:712px;}.meeting-create .wd5{width:237px;}.meeting-create .wd6{width:580px;}.meeting-create .wd7{width:169px;}.meeting-create .wd8{width:80px;}.meeting-create .ht0{height:200px;}.meeting-create .ht1{height:135px;}</style>
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
      <@groupMeetingCreate group=group/>
    </@groupBody>
    <@groupTemplateCollection group=group host=host>
      <@groupMeetingTemplate/>
    </@groupTemplateCollection>
    <#noparse>
<script src="/r/core.js?95413463d98e6dc7b6a4f11ac5f58837" type="text/javascript"></script><script type="text/javascript">(function(){var RH=NEJ.P;RH("mu.x").cL(RH("mu.m.g").oU)})()</script>
    </#noparse>
  </body>
</html>