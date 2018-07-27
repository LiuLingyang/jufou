<#-- 
      uid      - 用户ID
      nickname - 用户昵称
      portrait - 用户头像
      homepage - 组织地址
      mid      - 活动ID
      title    - 活动标题
      pid      - 相片ID
      time     - 上传时间
  -->
<div class="img fl"><img src="<#if portrait??&&portrait!="null">${portrait}<#else>/res/img/face50.jpg</#if>" class="w-rd5p"/></div>
<div class="dtl">
  <#if mid??>
  <p><a class="fc02" href="/${homepage}/member/${uid}/">${nickname}</a> 在活动“ <a class="fc02" href="/${homepage}/metting/${mid}/">${title}</a> ”上传了<a class="fc06" href="/${homepage}/photo/${pid}/">照片</a></p>
  <#else>
  <p><a class="fc02" href="/${homepage}/member/${uid}/">${nickname}</a> 上传了<a class="fc02" href="/${homepage}/photo/${pid}/">照片</a></p>
  </#if>
  <#if time??><p class="fc06">${time?number_to_date?string("yyyy-MM-dd")}</p></#if>
</div>
