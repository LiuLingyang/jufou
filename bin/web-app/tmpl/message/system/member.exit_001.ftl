<#--
    - 有会员退出组织时通知我
    ua       -  "mobile" or "pc"
    nickname -  用户名
    name     -  组织名称
    homepage -  组织地址
    cause    -  退出原因
-->
<#if ua=='mobile'>
  <p>${nickname}退出了组织“${name}”，退出原因：${cause}</p>
<#else>
  <p>${nickname}退出了组织“<a href="/${homepage}/member/" class="fc11">${name}</a>”，退出原因：${cause}</p>
</#if>