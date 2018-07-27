<#escape x as x!""?html>
<#-- 注册表单 -->
<#macro userPageLoginForm>
  <@module id="r0" class="t-mdc t-mdr">
  <p class="xtl">登录聚否</p>
  <form class="w-fom">
    <table class="xtb">
      <tr><td class="c0">账　号</td>
          <td class="c1">
            <input type="text" 
                   name="username"
                   class="txt bd01 w-rd3 wd0"
                   data-required="true"
                   data-message="请输入正确的邮箱地址或者手机号码"
                   placeholder="邮箱地址/手机号码"/>
          </td></tr>
      <tr><td class="c0">密　码</td>
          <td class="c1">
            <input type="password" 
                   name="password"
                   class="txt bd01 w-rd3 wd0"
                   data-required="true"
                   data-message="请输入密码"   
                   placeholder="密码"/>      
          </td></tr>
      <tr><td class="c0">验证码</td>
          <td class="c1 vcd">
            <input type="text" 
                   name="captcha"
                   minlength="4"
                   maxlength="4"
                   class="txt bd01 w-rd3 wd1"
                   data-required="true"
                   data-message="请输入正确的验证码"/>
            <img class="xx js-flag"/>
            <label class="xx">看不清楚？</label>
            <a class="xx fc02 js-flag" href="#">换一个</a>
          </td></tr>
      <tr><td class="c0">&nbsp;</td>
          <td class="c1"><label><input type="checkbox" class="cbx" name="saveLogin" value="1">下次自动登录|<a href="/retrieve/" class="fc02 xx">忘记密码？</a></label></td></tr>
      <tr><td class="c0">&nbsp;</td>
          <td class="c1"><input type="button" name="btn-ok" class="w-rd3 t-btn t-btn-4" value="登录"/></td></tr>
      <tr><td class="c0">&nbsp;</td>
          <td class="c1"><span>没有聚否账号？</span><a class="fc02" href="/regist/">注册账号</a></td></tr>
    </table>
  </form>
  </@module>
</#macro>
<#-- 注册页面 -->
<#macro userPageLogin user={}>
  <@page user=user index=-1 class="g-login t-gbx">
    <div class="t-man f-cb">
      <@messagebox/>
      <div class="fr l-hsd">
        <#-- place holder -->
      </div>
      <div class="l-hmc">
        <@userPageLoginForm/>
      </div>
    </div>
  </@page>
</#macro>
</#escape>