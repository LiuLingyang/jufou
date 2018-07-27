<#--
    - 更新回复活动
    ua       -  "mobile" or "pc"
    uid      -  用户ID
    nickname -  用户昵称
    homepage -  组织地址
    mid      -  活动ID
    title    -  活动名称
    oldCount -  原来携带人数
    newCount -  最新携带人数
-->
<#if ua=='mobile'>
  <p>${nickname}由携带${oldCount}位同伴改为携带${newCount}位同伴参加活动“${title}”</p>
<#else>
  <p><a href="/${homepage}/member/${uid}/" class="fc11">${nickname}</a>由携带${oldCount}位同伴改为携带${newCount}位同伴参加活动“<a href="/${homepage}/meeting/${mid}/" class="fc11">${title}</a>”</p>
</#if>