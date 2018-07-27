<#-- 
      uid      - 用户ID
      nickname - 用户昵称
      portrait - 用户头像
      homepage - 组织地址
      mid      - 活动ID
      title    - 活动名称
      time     - 评论时间
-->
<div class="img fl">
  <img src="<#if portrait??&&portrait!="null">${portrait}<#else>/res/img/face50.jpg</#if>" class="w-rd5p"/>
  <div class="f-bg tip">&nbsp;</div>
</div>
<div class="dtl">
  <p><a class="fc02" href="/${homepage}/member/${uid}/">${nickname}</a> 对活动“ <a class="fc02" href="/${homepage}/meeting/${mid}/">${title}</a> ”发表了评论</p>
  <#if time??><p class="fc06">${time?number_to_date?string("yyyy-MM-dd HH:mm")}</p></#if>
</div>


