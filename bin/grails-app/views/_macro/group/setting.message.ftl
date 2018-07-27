<#-- 消息推送设置页面 -->
<#macro groupSettingMessage group={} setting={}>
  <form  class="w-fom">
    <@module title="消息推送设置" id="k0" class="t-mdi t-mdf w-xet s-srd t-mdl-setting">
      <@userGroupMessageSettingForm setting=setting group=group/>
    </@module>    
  </form>
</#macro>
<#-- 消息推送设置表单 -->
<#macro userGroupMessageSettingForm setting={} group={}>
    <div class="blk bd00">
      <p class="xxl fc07">活动通知</p>
      <p class="ln"><label><input type="checkbox" class="cbx" name="meetingCreate" value="1" data-value="0" <#if setting.meetingCreate!0==1>checked="checked"</#if>>有新活动时通知我</label></p>
    </div>
    <div class="blk bd00">
      <p class="xxl fc07">照片通知</p>
      <p class="ln ln-x"><label><input type="checkbox" class="cbx" name="photoUpload" value="1" data-value="0" <#if setting.photoUpload!0==1>checked="checked"</#if>>我参加的活动有照片上传时通知我</label></p>
    </div>
    <div class="blk bd00">
      <p class="xxl fc07">评论通知</p>
      <p class="ln ln-x"><label><input type="checkbox" class="cbx" name="meetingComment" value="1" data-value="0" <#if setting.meetingComment!0==1>checked="checked"</#if>>我参加的活动有评论时通知我</label></p>
    </div>
    <div class="blk bd00">
      <p class="xxl fc07">会员通知</p>
      <p class="ln ln-x"><label><input type="checkbox" class="cbx" name="memberJoin" value="1" data-value="0" <#if setting.memberJoin!0==1>checked="checked"</#if>>有新会员加入组织时通知我</label></p>
      <p class="ln ln-y"><label><input type="checkbox" class="cbx" name="memberExit" value="1" data-value="0" <#if setting.memberExit!0==1>checked="checked"</#if>>有会员退出组织时通知我</label></p>
    </div>
    <#if group.id??>
    <div class="w-tbar-message f-cb">
      <input type="button" name="btn-ok" class="fr w-rd3 t-btn t-btn-4" value="保存设置"/>
      <a class="fr w-rd3 t-btn t-btn-2" href="/${group.homepage}/setting/">取消</a>
    </div>
    </#if>
</#macro>
