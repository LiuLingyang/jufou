<#--
    - 更新回复活动
    ua       -  "mobile" or "pc"
    uid      -  用户ID
    nickname -  用户昵称
    homepage -  组织地址
    mid      -  活动ID
    title    -  活动名称
    action   -  参加/不参加
-->
<#if ua=='mobile'>
  <p>${nickname}由${action?string("不参加", "参加")}改为${action?string("参加", "不参加")}活动“${title}”</p>
<#else>
  <p><a href="/${homepage}/member/${uid}/" class="fc11">${nickname}</a>由${action?string("不参加", "参加")}改为${action?string("参加", "不参加")}活动“<a href="/${homepage}/meeting/${mid}/" class="fc11">${title}</a>”</p>
</#if>