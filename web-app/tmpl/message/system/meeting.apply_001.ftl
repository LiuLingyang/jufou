<#--
    - 创建组织活动提议时通知组织创建者
    ua       -  "mobile" or "pc"
    homepage -  组织地址
    name     -  组织名称
    title    -  活动名称
    mid   	 -  活动ID
-->
<#if ua=='mobile'>
  <p>“${name}”组织申请发布活动“${title}”</p>
<#else>
  <p>“<a href="/${homepage}/" class="fc11">${name}</a>”组织申请发布活动“<a href="/${homepage}/meeting/${mid}" class="fc11">${title}</a>”</p>
</#if>