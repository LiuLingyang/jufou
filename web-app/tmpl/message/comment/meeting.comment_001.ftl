<#--
    - 我参加活动有新的评论时通知我
    ua       -  "mobile" or "pc"
    homepage -  组织地址
    mid      -  活动ID
    title    -  活动名称
-->
<#if ua=='mobile'>
  <p>活动“${title}”有1条新评论</p>
<#else>
  <p>活动“<a class="fc11" href="/${homepage}/meeting/${mid}/">${title}</a>”有1条新评论</p>
</#if>