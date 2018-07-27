<#escape x as x!""?html>
<#macro groupNewsShow group={} news={} relation=0>
  <#local action="">
  <#if relation&gt;1>
    <#local action="<a href=\"#\" class=\"fc02 js-flag\">删除</a>"+
  		    "<a href=\"/${group.homepage}/news/update/${news.id}/\" class=\"fc02\">编辑</a>">
  </#if>
  <@module id="x2" title="${news.subject}" class="s-srd t-mdi"
  	menu="<div class=\"time\">${news.createTime?number_to_date?string(\"yyyy-MM-dd\")}<span class=\"author\">作者：${news.author!\"未知\"}</div>${action}">
    <div class="itl">${news.content}</div>
  </@module>
</#macro>
<#macro groupNewsShowTemplate news={}>
  <textarea name="js">
    window.data.news = ${json(news)};
  </textarea>
</#macro>
</#escape>