<#--
    - 我创建的组织被审核时通知我
    ua       -  "mobile" or "pc"
    homepage -  组织地址
    title    -  活动名称
    mid      -  活动ID
    state    -  权限申请状态
                0 - 开通
               -3 - 拒绝
    reason   -  申请被拒理由
-->
<#if ua=='mobile'>
  <p>您建议的活动“${title}”<#if state==0>已通过审核<#else>由于“${reason}”原因被拒绝，您可以更改活动信息重新提交审核</#if></p>
<#else>
  <p>您建议的活动“<a href="/${homepage}/meeting/${mid}" class="fc11">${title}</a>”<#if state==0>已通过审核<#else>由于“${reason}”原因被拒绝，您可以更改活动信息重新提交审核</#if></p>
</#if>