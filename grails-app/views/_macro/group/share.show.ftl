<#escape x as x!""?html>
<#macro groupShareShow group={} share={} relation=0>
  <#local action="">
    <#local action="<a href=\"#\" class=\"fc02 js-flag\">删除</a>"+
  		    "<a href=\"/${group.homepage}/share/update/${share.id}/\" class=\"fc02\">编辑</a>">
  <@module id="w2" title="${share.title}" class="s-srd t-mdi"
    menu="<div class=\"time\">${share.pubishTime?number_to_date?string(\"yyyy-MM-dd\")}</div>${action}">
    <div class="itl">${share.content}</div>
    <img src="${share.image.thumbnailURL}" class="simg"/>
  </@module>
  <@module id="w3" class="s-srd"></@module>
</#macro>
<#macro groupShareShowTemplate share={}>
  <textarea name="js">
    window.data.share = ${json(share)};
  </textarea>
</#macro>
</#escape>


