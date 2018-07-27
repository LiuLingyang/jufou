<#--
    - 我参加的活动更改了活动信息时通知我
    ua       -  "mobile" or "pc"
    homepage -  组织地址
    mid      -  活动ID
    title    -  活动名称
-->
<#if ua=='mobile'>
  <p>您参加的活动“${title}”被取消了</p>
<#else>
  <p>您参加的活动“<a href="/${homepage}/meeting/${mid}/" class="fc11">${title}</a>”被取消了，请注意查看！</p>
</#if>