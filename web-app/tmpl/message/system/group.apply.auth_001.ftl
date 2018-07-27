<#--
    - 我创建的组织被审核时通知我
    ua       -  "mobile" or "pc"
    homepage -  组织地址
    name     -  组织名称
    state    -  权限申请状态
                0 - 开通
               -3 - 拒绝
    reason   -  申请被拒理由
-->
<#if ua=='mobile'>
  <p>您创建的组织“${name}”<#if state==0>已通过审核<#else>由于“${reason}”原因被拒绝</#if></p>
<#else>
  <p>您创建的组织“<a href="/${homepage}/" class="fc11">${name}</a>”<#if state==0>已通过审核<#else>由于“${reason}”原因被拒绝，您可以修改申请信息重新<a href="/${homepage}/apply/" class="fc11">开通权限</a></#if></p>
</#if>