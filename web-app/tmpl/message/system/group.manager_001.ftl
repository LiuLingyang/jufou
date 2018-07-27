<#--
    - 申请组织后的结果
    ua       -  "mobile" or "pc"
    uid      -  用户ID
    nickname -  用户昵称
    homepage -  组织地址
    name     -  组织名称
-->
<#if ua=='mobile'>
  <p>您被组织“${name}”创建者“${nickname}”设置为管理员</p>
<#else>
  <p>您被组织“<a href="/${homepage}/" class="fc11">${name}</a>”创建者<a href="/${homepage}/member/${uid}/" class="fc11">${nickname}</a>设置为管理员</p>
</#if>