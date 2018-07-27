<#escape x as x!""?html>
<#-- 模块ID c0-c9 -->
<#-- 标签设置表单 -->
<#macro groupFormSettingTag group={}>
  <div class="yls w-fom">
    <p class="xln xtl">描述你的组织</p>
    <p class="xln tip fc06">请用1-2个词语描述你的组织，至少1个，最多15个</p>
    <div class="tbx js-flag"></div>
    <p class="xmr"><a class="fc03 js-flag" href="#">+  添加更多</a></p>
  </div>
  <div class="yrs">
    <p class="yln xpl fc07">为什么贴标签很重要？</p>
    <p class="tip fc06">标签能够帮助对该主题感兴趣的用户找到你，你的组织会出现在相应的分类里。</p>
    <div class="xrc">
      <p class="yln2 xpl fc07">建议的标签</p>
      <div class="tbx f-cb js-flag">
        <p class="w-loading">&nbsp;</p>
      </div>
    </div>
  </div>
</#macro>
<#-- 标签设置页面 -->
<#macro groupSettingTag group={}>
  <@module title="标签设置" id="c0" class="t-mdi t-mdf s-srd t-mdl-setting"
    menu="<a class=\"mnu-s fc02\" href=\"/../../${group.homepage}/setting/\">返回</a>">
    <@groupFormSettingTag group=group/>
  </@module>
  <div class="w-tbar w-tbar-tip bd02 bg01 f-cb">
    <input type="button" name="btn-ok" class="fr w-rd3 t-btn t-btn-4" value="保存设置"/>
    <a class="fr w-rd3 t-btn t-btn-2" href="/${(group.homepage)!"group"}/setting/">取消</a>
  </div>
</#macro>
<#-- 标签设置页面模版 -->
<#macro groupSettingTagTemplate>
  <#noparse>
  <textarea name="jst" id="jst-list-tag">
    {if xlist.length>0}
      {list xlist as x}
      <span class="fl ytg w-rd3 bd00" data-value="${x}">${x}</span>
      {/list}
    {else}
      <p class="w-message">没有适合该组织的推荐标签</p>
    {/if}
  </textarea>
  </#noparse>
</#macro>
</#escape>