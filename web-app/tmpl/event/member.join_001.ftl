<#-- 
      uid      - 用户ID
      nickname - 用户昵称
      portrait - 用户头像
      homepage - 组织地址
      name     - 组织名称
      time     - 加入时间
  -->
<div class="img fl"><img src="<#if portrait??&&portrait!="null">${portrait}<#else>/res/img/face50.jpg</#if>" class="w-rd5p"/></div>
<div class="dtl">
  <p><a class="fc02 bck" href="/${homepage}/member/${uid}/">${nickname}</a> 加入了<a href="/${homepage}/"><span class="fc02 pad">${name}</span></a></p>
  <#if time??><p class="fc06">${time?number_to_date?string("yyyy-MM-dd")}</p></#if>
</div>