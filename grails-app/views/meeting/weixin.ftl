<#escape x as x!""?html>
<html>
  <head>
    <title>聚否 - ${meeting.title}</title>
    <meta http-equiv="x-dns-prefetch-control" content="off"> 
    <meta name="viewport" content="width=device-width,user-scalable=no">
    <style>
      *{padding:0;margin:0;border:0;}
      html,body{width:100%;height:100%;overflow:hidden;}
      body{overflow:auto;font-size:20px;}
      table,img{max-width:100%;}
      
      .w-meeting{text-align:left;}
      .w-meeting .ttl{font-size:30px;font-weight:bold;}
      .w-meeting .blk{line-height:20px;margin:10px 0;overflow:hidden;}
      .w-meeting .blk label{float:left;color:#A14472;font-weight:bold;}
      .w-meeting .blk span{display:block;margin-left:110px;}
      .w-meeting .cnt{margin:20px 0;line-height:160%;}
    </style>
  </head>
  <body>
    <div class="w-meeting">
      <h1 class="ttl">${meeting.title}</h1>
      <div class="blk">
        <label>活动时间：</label>
        <span>${meeting.startTime?number_to_datetime?string("yyyy-MM-dd HH:mm")}<#if ((meeting.endTime)!0)!=0> 到 ${meeting.endTime?number_to_datetime?string("yyyy-MM-dd HH:mm")}</#if></span>
      </div>
      <div class="blk">
        <label>活动地点：</label>
        <span>${meeting.province}${meeting.city}${meeting.area}${meeting.address}</span>
      </div>
      <div class="blk">
        <label>活动费用：</label>
        <#assign fee = fee!{}>
        <#assign type = fee.type!0>
        <#if type==0>
        <span>免费</span>
        <#elseif type==1>
        <span>AA制</span>
        <#else>
        <span>${(((fee.item)!"")+"|")?replace("@","&nbsp;")?replace("|","元/人<br/>")}</span>
        <span>${(fee.desc!"")?replace("\n","<br/>")}</span>
        </#if>
      </div>
      <div class="cnt">${meeting.details}</div>
    </div>
  </body>
</html>
</#escape>