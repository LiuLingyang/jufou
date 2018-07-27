<#escape x as x!""?html>
<#-- 注册表单 -->
<#macro userPageActivateForm user={}>
  <@module id="r1" class="t-mdc t-mdr">
    <p class="xtl js-flag">马上激活邮件，完成注册</p>
    <p class="ln0">确认信已经发送到你的邮箱<span class="sp fc02 js-flag">&nbsp;</span>，你需要点击邮件中的确认链接来完成注册。</p>
    <div class="act">
      <a href="#" target="_blank" class="js-flag t-btn t-btn-4 w-rd3">立即查看邮箱</a>
    </div>
    <p class="ln1 fc06">还没收到确认邮件？<a class="js-flag fc03" href="#">再次发送邮件</a></p>
  </@module>
</#macro>
<#-- 激活页面 -->
<#macro userPageActivate user={}>
  <@page user=user index=-1 class="g-activate t-gbx">
    <div class="t-man f-cb">
      <@messagebox/>
      <div class="fr l-hsd">
        <#-- place holder -->
      </div>
      <div class="l-hmc">
        <@userPageActivateForm user=user/>
      </div>
    </div>
  </@page>
</#macro>
</#escape>