<#escape x as x!""?html>
<#-- 模块ID j0-j9 -->
<#-- 活动回复页面表单 -->
<#macro groupFormMeetingReply group={} meeting={}>
  <#assign questions=(meeting.questions)![]>
  <#if questions?size&gt;0>
    <#list questions as x>
      <div class="blk">
        <p class="qst">${x_index+1}.${x.question}</p>
        <p><textarea class="bd01 w-rd3 wd4 ht0" name="${x.id}"></textarea></p>
      </div>
    </#list>
  <#else>
    <p class="w-message">该活动没有问题需要回答！</p>
  </#if>
</#macro>
<#-- 活动回复页面 -->
<#macro groupMeetingReply group={} meeting={}>
  <form class="w-fom">
    <@module title="回答活动问题" id="j0" class="t-mdi t-mdf s-srd">
      <@groupFormMeetingReply group=group meeting=meeting/>
    </@module>
    <div class="w-tbar w-tbar-tip  bd02 bg01 f-cb">
      <input type="button" name="btn-ok" class="fr w-rd3 t-btn t-btn-4" value="回复活动"/>
      <a class="fr w-rd3 t-btn t-btn-2" href="/${(group.homepage)!"group"}/meeting/${meeting.id}/">取消</a>
    </div>
  </form>
</#macro>
<#-- 活动回复页面模板 -->
<#macro groupMeetingReplyTemplate meeting={}>
  <textarea name="js">
    window.data.meeting = ${json(meeting)};
  </textarea>
</#macro>
</#escape>