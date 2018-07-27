<#--
    - 某个组织的“有新活动通知”
    ua       -  "mobile" or "pc"
    name     -  组织名称
    homepage -  组织地址
    mid      -  活动ID
    title    -  活动名称
    logo     -  组织logo
-->
<#if ua=='mobile'>
  <p>${name}发布了活动“${title}”</p>
<#else>
  <p>“<a href="/${homepage}/" class="fc11">${name}</a>”发布了活动“<a href="/${homepage}/meeting/${mid}/" class="fc11">${title}</a>”</p>
</#if>