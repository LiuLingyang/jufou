<#escape x as x!""?html>
<#-- 密码表单 -->
<#macro userPagePasswordForm>
  <@module id="r0" class="t-mdc t-mdr">
    <p class="xtl">找回密码</p>
    <@taber items=["邮箱注册","手机注册"] index=-1>
      <form class="w-fom" id="email">
	    <table class="xtb">
	      <tr><td class="c0">注册邮箱</td>
	          <td class="c1">
	            <input type="text" 
	                   name="email"
	                   class="txt bd01 w-rd3 wd0"
	                   data-required="true"
	                   data-type="email"
	                   data-message="请输入正确的邮箱地址"
	                   data-tip="我们会将重置密码的链接发到您的注册邮箱"/>
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
              <td class="c1 tip"><input type="button" name="btn-ok" class="w-rd3 t-btn t-btn-4" value="完成"/></td></tr>
        </table>
      </form>
      <form class="w-fom" id="phone" style="display:none;">
	    <table class="xtb">
	      <tr><td class="c0">手机号码</td>
	          <td class="c1">
	            <input type="text" 
	                   name="mobile"
	                   class="txt bd01 w-rd3 wd0"
	                   data-required="true"
	                   data-type="number"
	                   maxlength="11"
	                   minlength="11"
	                   data-message="请输入正确的手机号码"
	                   data-tip="请输入已注册的手机号码"/>
	          </td></tr>
          <tr><td class="c0">验证码</td>
              <td class="c1 vcd">
                <input type="text" 
                       name="captcha"
                       class="txt bd01 w-rd3 wd1"
                       maxlength="4"
                       minlength="4"
                       data-required="true"
                       data-message="请输入手机接收到的验证码"/>
                <span class="fc06">没有收到验证码？</span>
                <input type="button" class="w-rd3 t-btn t-btn-b" value="发送验证码" name="btn-captcha"/>
              </td></tr>
          <tr><td class="c0">密　码</td>
              <td class="c1">
                <input type="password" 
                       name="password"
                       class="txt bd01 w-rd3 wd0"
                       minlength="6"
                       maxlength="20"
                       data-required="true"
                       data-message="请输入密码"
                       data-tip="6-20位个字符，大、小写字母、数字、符号至少包含两种"/>
              </td></tr>
          <tr><td class="c0">确认密码</td>
              <td class="c1">
		        <input type="password" 
		               name="password1"
		               class="txt bd01 w-rd3 wd0"
		               minlength="6"
		               maxlength="20"
		               data-required="true"
		               data-message="请输入确认密码"/>
		      </td></tr>
          <tr><td class="c0">&nbsp;</td>
              <td class="c1 tip"><input type="button" name="btn-ok" class="w-rd3 t-btn t-btn-4" value="完成"/></td></tr>
        </table>
      </form>
    </@taber>
  </@module>  
</#macro>
<#-- 忘记密码页面 -->
<#macro userPagePassword user={}>
  <@page user=user index=-1 class="g-password t-gbx">
    <div class="t-man f-cb">
      <@messagebox/>
      <div class="fr l-hsd">
        <#-- place holder -->
      </div>
      <div class="l-hmc">
        <@userPagePasswordForm/>
      </div>
    </div>
  </@page>
</#macro>
<#-- 忘记密码页面 -->
<#macro userPagePasswordTemplate>
  <textarea name="txt" id="txt-pswd-fail">
    <@module id="r2" class="t-mdc t-mdr t-mdl-r1">
      <p class="xtl">密码发送失败</p>
      <p class="ln1 fc06">邮箱地址错误？<a class="js-flag fc03" href="#">重新输入</a></p>
    </@module>
  </textarea>
  <textarea name="txt" id="txt-pswd-succ">
    <@module id="r1" class="t-mdc t-mdr">
      <p class="xtl">密码发送成功</p>
      <p class="ln0">密码已经发送到你的邮箱<span class="sp fc02 js-flag"></span>，你需要点击邮件中的链接来完成密码重置。</p>
      <div class="act">
        <a href="#" target="_blank" class="js-flag t-btn t-btn-4 w-rd3">立即查看邮箱</a>
      </div>
      <p class="ln1 fc06">还没收到确认邮件？<a class="js-flag fc03" href="#">重新输入</a></p>
    </@module>
  </textarea>
</#macro>
</#escape>