<#--
    - 申请组织后的结果
    ua       -  "mobile" or "pc"
    homepage -  组织地址
    name     -  组织名称
    reply    -  0 : 成功的加入组织
                1 : 被拒绝加入组织
    cause    -  拒绝理由
-->
<#if ua=='mobile'>
  <#if reply==1>
  <p>您成功加入了组织“${name}”</p>
  <#else>
  <p>“${name}”拒绝您加入组织，拒绝理由：${cause}</p>
  </#if>
<#else>
  <#if reply==1>
  <p>您成功加入了组织“<a href="/${homepage}/" class="fc11">${name}</a>”</p>
  <#else>
  <p>“<a href="/${homepage}/" class="fc11">${name}</a>”拒绝您加入组织，拒绝理由：${cause}</p>
  </#if>
</#if>