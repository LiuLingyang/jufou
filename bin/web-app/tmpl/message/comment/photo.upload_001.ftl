<#--
    - 我参加的活动有新照片上传时通知我
    ua       -  "mobile" or "pc"
    homepage -  组织地址
    mid      -  活动ID
    title    -  活动名称
    count    -  照片数量，默认为1
-->
<#if ua=='mobile'>
  <#if mid??>
  <p>活动“${title}”有${count}张照片上传</p>
  <#else>
  <p>组织“${title}”有${count}张照片上传</p>
  </#if>
<#else>
	<#if mid??>
  <p>活动“<a href="/${homepage}/meeting/${mid}/" class="fc11">${title}</a>”有${count}张照片上传，请注意查看</p>
  <#else>
  <p>组织“<a href="/${homepage}/" class="fc11">${title}</a>”有${count}张照片上传，请注意查看</p>
  </#if>
</#if>