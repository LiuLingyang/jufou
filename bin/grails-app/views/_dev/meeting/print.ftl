<#escape x as x!""?html>
<!DOCTYPE html>
<html>
  <head>
    <title>${meeting.title} - 聚否</title>
    <@head/>
    <!-- @NOPARSE -->
    <style>
      *{margin:0;padding:0;}
      html{width:100%;height:100%;overflow:auto;text-align:center;font-size:14px;font-family:"Microsoft YaHei","微软雅黑",tahoma,arial,simsun,"宋体";}
      .xdtl,.xlst{width:80%;margin:10px auto;}
      .xdtl{line-height:24px;text-align:left;}
      .xdtl h1{font-size:18px;font-weight:bold;}
      .xlst{margin-top:10px;table-layout:fixed;border-collapse:collapse;}
      .xlst th,.xlst td{padding:10px;border:1px solid #ccc;}
      .xlst th{background:#F5F5F5;font-size:14px;color:#666;}
      .xact{padding:10px 0;}
      .xact input{margin:0 10px;padding:5px 10px;cursor:pointer;}
      @media print{
          .xact{display:none;}
      }
    </style>
    <!-- /@NOPARSE -->
  </head>
  <body>
    <@messagebox/>
    <div class="xdtl">
      <h1>${meeting.title}</h1>
      <p>时间：${meeting.startTime?number_to_datetime?string("yyyy-MM-dd HH:mm")}</p>
      <p>地点：${meeting.province}${meeting.city}${meeting.area}${meeting.address}</p>
    </div>
    <table class="xlst">
      <tr><th class="c0">姓名</th><th class="c1">邮箱</th><th class="c2">手机</th></tr>
      <#if (attendList![])?size&gt;0>
      <#list attendList as x>
      <tr>
        <td class="c0">${x.nickname!x.username}</td>
        <td class="c1">${x.email}</td>
        <td class="c2">${x.mobile}</td>
      </tr>
      </#list>
      </#if>
    </table>
    <div class="xact">
      <input type="button" value="打印" onclick="window.print();"/>
      <input type="button" value="关闭" onclick="window.close();"/>
    </div>
  </body>
</html>
</#escape>