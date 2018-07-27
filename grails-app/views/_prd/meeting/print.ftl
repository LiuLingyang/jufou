<#escape x as x!""?html>
<!DOCTYPE html>
<html>
  <head>
    <title>${meeting.title} - 聚否</title>
    <@head/>
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
      .c{word-wrap:break-word; overflow:hidden;}
      @media print{
          .xact{display:none;}
      }
    </style>
  </head>
  <body>
    <@messagebox/>
    <div class="xdtl">
      <h1>${meeting.title}</h1>
      <p>时间：${meeting.startTime?number_to_datetime?string("yyyy-MM-dd HH:mm")}</p>
      <p>地点：${meeting.province}${meeting.city}${meeting.area}${meeting.address}</p>
    </div>
    <table class="xlst">
      <tr><th class="c c0">姓名</th><th class="c c1">手机号码</th><th class="c c2">邮箱</th><th class="c c3">性别</th><th class="c c4">单位</th><th class="c c5">同行人数</th>
      <#assign qcount=0>
      <#if answersList[1]?size&gt;0>
        <#assign qcount=answersList[1]?size>
        <#list answersList[1] as ii>
          <th class="c">问题：${ii.question.question}</th>
        </#list>
      </#if>
      </tr>
      <#if (attendList![])?size&gt;0>
      <#list 0..(attendList?size-1) as i>
      <tr>
        <td class="c c0">${(attendList[i].nickname)!(attendList[i]).username}</td>
        <td class="c c1">${(attendList[i]).mobile}</td>
        <td class="c c2">${(attendList[i]).email}</td>
        <td class="c c3"><#if (attendList[i]).gender==1>女<#elseif (attendList[i]).gender==0>男<#else>未知</#if></td>
        <td class="c c4">${(attendList[i]).company}</td>
        <td class="c c5">${(observerList[i])}</td>
        <#if qcount&gt;0>
            <#list 0..(qcount-1) as j>
              <td class="c">${(answersList[i][j].answer)!""}</td>
            </#list>
        </#if>
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