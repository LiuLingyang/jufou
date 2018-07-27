<#--
    - 我加入的组织更改了组织信息时通知我
    ua       -  "mobile" or "pc"
    homepage -  组织地址
    name    -  活动名称
-->
<#if ua=='mobile'>
  <p>您参加的组织“${name}”被解散了</p>
<#else>
  <p>您参加的组织“<a href="/${homepage}/" class="fc11">${name}</a>”被解散了，请注意查看！</p>
</#if>