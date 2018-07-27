<#escape x as x!""?html>
<#-- 模块ID a0-a9 -->
<#-- 基本信息设置表单 -->
<#macro groupFormSettingBasic group={} check=false>
    <div class="w-byk">
      <p class="lab">组织分类<span class="emb fc03">*</span></p>
      <div class="ipt">
        <select class="bd01 w-rd3 wd4" name="category" data-required="true" data-message="请选择分类">
          <option value="">- 选择分类 -</option>
          <#list d_group_category as x>
          <option value="${x}" <#if (group.category!"")==x>selected="selected"</#if>>${x}</option>
          </#list>
        </select>
      </div>
    </div>
    <div class="w-byk">
      <p class="lab">组织所在地<span class="emb fc03">*</span></p>
      <div class="ipt">
        <select class="bd01 w-rd3 wd4" name="province"></select>
        <select class="bd01 w-rd3 wd4" name="city"></select>
        <select class="bd01 w-rd3 wd4" name="area"></select>
        <div><input type="text" 
               name="section"
               value="${group.section}"
               class="txt bd01 w-rd3 section"
               maxlength="30"
               placeholder="输入详细地址"/></div>
      </div>
    </div>
    <div class="w-byk">
      <p class="lab itm1">组织名称<span class="emb fc03">*</span></p>
      <div class="ipt">
        <input type="text" 
               name="name"
               value="${group.name}"
               class="txt bd01 w-rd3 wd1"
               maxlength="30"
               data-required="true"
               data-message="请输入组织名称"/>
      </div>
    </div>
    <div class="w-byk">
      <p class="lab itm2">组织描述<span class="emb fc03">*</span></p>
      <div class="ipt">
        <textarea class="bd01 w-rd3 wd1 ht0 vat" name="description" data-message="请输入描述信息">${group.description}</textarea>
      </div>
    </div>
    <div class="w-byk">
      <p class="lab itm1">想把你的成员叫做？<span class="tip1 fc06">（例如：投资客、发烧友）</span></p>
      <div class="ipt nxd">
        <input type="text" class="txt bd01 w-rd3 wd1" name="memberCall" value="${group.memberCall}" maxlength="32"/>
      </div>
    </div>
    <div class="w-byk">
      <p class="lab itm2">组织主页地址<span class="tip2 fc06">（http://hijufou.com/<span class="fc03">jufou 只需填写红字部分</span>）</span><span class="emb fc03">*</span></p>
      <div class="ipt">
        <span class="fc06">http://hijufou.com/</span>
        <input type="text" 
               name="homepage"
               class="txt bd01 w-rd3 wd2" 
               value="${group.homepage}"
               maxlength="30"
               data-min-length="7"
               data-required="true"
               data-pattern="^[0-9a-zA-Z][\w-]+[0-9a-zA-Z]$"
               data-message="请输入主页地址"/>
      </div>
    </div>
    <#if check>
    <div class="w-byk">
      <div class="ipt acp">
        <label><input name="offline" value="1" type="checkbox" class="cbx" data-required="true" data-message="创建的组织必须为线下组织"/><span class="wrd">我所创立的是真的线下组织</span><span class="emb fc03">*</span></label>
      </div>
    </div>
    </#if>
</#macro>
<#-- 基本信息设置页面 -->
<#macro groupSettingBasic group={}>
  <@module title="基本信息" id="a0" class="t-mdi t-mdf s-srd t-mdl-setting"
    menu="<a class=\"mnu-s fc02\" href=\"/../../${group.homepage}/setting/\">返回</a>">
    <@groupFormSettingBasic group=group/>
  </@module>
  <div class="w-tbar w-tbar-tip bd02 bg01 f-cb">
    <input type="button" name="btn-ok" class="fr w-rd3 t-btn t-btn-4" value="保存设置"/>
    <a class="fr w-rd3 t-btn t-btn-2" href="/${(group.homepage)!"group"}/setting/">取消</a>
  </div>
</#macro>
</#escape>