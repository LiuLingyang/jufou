<#--
    - 我参加活动确认成功通知
    ua       -  "mobile" or "pc"
    homepage -  组织地址
    mid      -  活动ID
    title    -  活动名称
    count    -  携带人数，默认为0
-->
<#if ua=='mobile'>
  <p>您成功参加了活动“${title}” <#if count&gt;0>+${count}位同伴</#if></p>
<#else>
  <p>您成功参加了活动“<a href="/${homepage}/meeting/${mid}/" class="fc11">${title}</a>” <#if count&gt;0>+${count}位同伴</#if></p>
</#if>