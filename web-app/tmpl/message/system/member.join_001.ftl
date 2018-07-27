<#--
    - 有新会员加入组织申请时通知我
    ua       -  "mobile" or "pc"
    homepage -  组织地址
    name     -  组织名称
-->
<#if ua=='mobile'>
  <p>有1位朋友申请加入组织“${name}”</p>
<#else>
  <p>有1位朋友申请加入组织“<a href="/${homepage}/member/#2" class="fc11">${name}</a>”</p>
</#if>