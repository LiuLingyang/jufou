<#escape x as x!""?html>
<#-- 模块ID b0-b9 -->
<#-- 隐私设置页面 -->
<#macro groupFormSettingPrivacy group={}>
  <@module title="隐私设置" id="b0" class="t-mdi t-mdf s-srd t-mdl-setting"
    menu="<a class=\"mnu-s fc02\" href=\"/../../${group.homepage}/setting/\">返回</a>">
    <div class="w-fom">
      <p class="ln0">隐私设置</p>
      <div><label>
        <input type="checkbox" 
               class="cbx" 
               value="1"
               data-value="0"
               data-type="number"
               name="viewPermission"
               <#if (group.viewPermission!0)==1>checked="checked"</#if>/>组织所有页面信息只有会员可见</label></div>
      <div class="tip">
        <p>组织所有页面信息非会员可见，除了：</p>
        <p class="fc06 itm">&#149; 组织首页的基本描述，包括：会员数统计、描述、会员对组织的评论</p>
        <p class="fc06 itm">&#149; 组织动态中新成员加入的信息</p>
        <p class="fc06 itm">&#149; 下一次活动的日期</p>
      </div>
    </div>
  </@module>
</#macro>
<#-- 隐私设置页面 -->
<#macro groupSettingPrivacy group={}>
  <@groupFormSettingPrivacy group=group/>
  <div class="w-tbar w-tbar-tip bd02 bg01 f-cb">
    <input type="button" name="btn-ok" class="fr w-rd3 t-btn t-btn-4" value="保存设置"/>
    <a class="fr w-rd3 t-btn t-btn-2" href="/${(group.homepage)!"group"}/setting/">取消</a>
  </div>
</#macro>
</#escape>