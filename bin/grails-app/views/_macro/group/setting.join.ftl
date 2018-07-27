<#escape x as x!""?html>
<#-- 模块ID d0-d9 -->
<#-- 标签设置表单 -->
<#macro groupFormSettingMember group={} embed=false>
    <div class="w-fom">
      <div class="blk xblk">
        <p class="xtl">会员名片</p>
        <p class="fc06 tip">当组织成员申请加入组织时，他们会被要求回答你设置的问题，他们的回答会出现在他们的会员名片中，你最多可提5个问题。</p>
        <div class="tbx js-flag"></div>
      </div>
      <div class="blk blk-x">
        <p class="xtl">会员入会需要提交的个人信息</p>
        <p class="xln"><label>
          <input type="checkbox" 
                 class="cbx" 
                 value="1" 
                 data-value="0" 
                 data-type="number" 
                 name="submitIntro"
                 <#if group.submitIntro!0==1>checked="checked"</#if>/>自我介绍</label></p>
        <#--p class="xln"><label>
          <input type="checkbox" 
                 class="cbx" 
                 value="1" 
                 data-value="0" 
                 data-type="number" 
                 name="submitPortrait"
                 <#if group.submitPortrait!0==1>checked="checked"</#if>/>照片</label></p-->
        <p class="xln"><label>
          <input type="checkbox" 
                 class="cbx" 
                 value="1" 
                 data-value="0" 
                 data-type="number" 
                 name="submitAnswer"
                 <#if group.submitAnswer!0==1>checked="checked"</#if>/>档案问题</label></p>
      </div>
      <div class="blk">
        <p class="xtl">新会员加入时欢迎词</p>
        <p class="fc06">当有新的会员入会时，系统会自动发送一份您要求的欢迎信给新会员。</p>
        <div class="nok"><textarea class="bd01 w-rd3" name="welcome" maxlength="500" data-message="最多输入500个字符或者250个汉字">${group.welcome}<${embed?string("&#47;","/")}textarea></div>
      </div>
    </div>
</#macro>
<#-- 组织设置页面 -->
<#macro groupSettingMember group={}>
  <@module title="成员设置" id="d0" class="t-mdi t-mdf s-srd t-mdl-setting"
    menu="<a class=\"mnu-s fc02\" href=\"/../../${group.homepage}/setting/\">返回</a>">
    <@groupFormSettingMember group=group/>
  </@module>
  <div class="w-tbar w-tbar-tip bd02 bg01 f-cb">
    <input type="button" name="btn-ok" class="fr w-rd3 t-btn t-btn-4" value="保存设置"/>
    <a class="fr w-rd3 t-btn t-btn-2" href="/${group.homepage}/setting/">取消</a>
  </div>
</#macro>
<#-- 组织设置页面模版 -->
<#macro groupSettingMemberTemplate questions=[]>
  <textarea name="js">
    window.data.questions = ${json(questions)};
  </textarea>
</#macro>
</#escape>