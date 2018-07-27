<#-- 
      uid      - 用户ID
      nickname - 用户昵称
      portrait - 用户头像
      homepage - 组织地址
      action   - 参加/不参加
      mid      - 活动ID
      title    - 活动名称
      time     - 更改时间
  -->
<div class="img fl"><img src="<#if portrait??&&portrait!="null">${portrait}<#else>/res/img/face50.jpg</#if>" class="w-rd5p"/></div>
<div class="dtl">
  <p><a class="fc02" href="/${homepage}/member/${uid}/">${nickname}</a> 更改活动“ <a class="fc02" href="/${homepage}/meeting/${mid}/">${title}</a> ”的回复为${action?string("参加", "不参加")}</p>
  <#if time??><p class="fc06">${time?number_to_date?string("yyyy-MM-dd")}</p></#if>
</div>
