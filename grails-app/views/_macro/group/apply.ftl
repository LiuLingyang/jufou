<#escape x as x!""?html>
<#macro groupApply group={} apply={}>
<form class="w-fom">
  <@module title="开通权限" id="a0" class="t-mdi t-mdf s-srd t-mdl-apply">
    <#if apply.contact??>
    <input type="hidden" name="updated" value="true"/>
    </#if>
    <input type="hidden" name="gid" value="${group.id}"/>
    <div class="w-byk">
      <p class="lab">联系人<span class="emb fc03">*</span></p>
      <div class="ipt">
        <input type="text" 
               name="contact"
               value="${apply.contact!""}"
               class="txt bd01 w-rd3 wd1"
               maxlength="40"
               data-required="true"
               data-message="请输入联系人"/>
      </div>
    </div>
    <div class="w-byk">
      <p class="lab">联系方式<span class="emb fc03">*</span></p>
      <div class="ipt">
        <input type="text" 
               name="means"
               value="${apply.means!""}"
               class="txt bd01 w-rd3 wd1"
               maxlength="80"
               data-required="true"
               data-message="请输入联系方式"/>
      </div>
    </div>
    <div class="w-byk">
      <p class="lab">申请理由<span class="emb fc03">*</span></p>
      <div class="ipt">
        <textarea name="reason" 
        		  class="bd01 w-rd3 wd1 ht0 vat"  
        		  data-message="请输入申请理由" 
        		  data-required="true">${apply.reason!""}</textarea>
      </div>
    </div>
  </@module>
  <div class="w-tbar bd02 bg01 f-cb">
    <input type="button" name="btn-ok" class="fr w-rd3 t-btn t-btn-4" value="提交申请"/>
    <a class="fr w-rd3 t-btn t-btn-2" href="/${(group.homepage)!"group"}/">取消</a>
  </div>
</form>
</#macro>
</#escape>