<#escape x as x!""?html>
<#-- 创建步骤TAB -->
<#macro groupCreateStep index=1>
  <div class="w-stp f-cb">
    <span class="itm fl f-bg tip1<#if index==1> js-selected</#if>">1. 基本信息</span>
    <span class="itm fl f-bg tip2<#if index==2> js-selected</#if>">2. 组织标签</span>
    <span class="itm fl f-bg tip1<#if index==3> js-selected</#if>">3. 其他</span>
  </div>
</#macro>
<#-- 创建组织模版 -->
<#macro groupCreateTemplate>
  <textarea name="txt" id="txt-step-2">
    <form class="w-fom s-srd">
      <@module title="创建属于你的组织" id="c0" class="t-mdi t-mdf">
        <@groupCreateStep index=2/>
        <div class="inrx1 f-cb"><@groupFormSettingTag/></div>
      </@module>
	  <div class="w-tbar bd02 bg01 f-cb">
	    <input type="button" class="fr w-rd3 t-btn t-btn-4" name="btn-ok" value="下一步"/>
	    <input type="button" class="fr w-rd3 t-btn t-btn-2" name="btn-cc" value="跳过"/>
	  </div>
    </form>
  </textarea>
  <textarea name="txt" id="txt-step-3">
    <form class="w-fom s-srd">
      <@module title="创建属于你的组织" id="d0" class="t-mdi t-mdf">
        <@groupCreateStep index=3/>
        <div class="inrx"><@groupFormSettingMember embed=true/></div>
      </@module>
	  <div class="w-tbar bd02 bg01 f-cb">
	    <input type="button" class="fr w-rd3 t-btn t-btn-4" name="btn-ok" value="完成"/>
	    <input type="button" class="fr w-rd3 t-btn t-btn-2" name="btn-cc" value="开通权限"/>
	  </div>
    </form>
  </textarea>
</#macro>
</#escape>
