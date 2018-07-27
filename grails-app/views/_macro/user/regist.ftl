<#escape x as x!""?html>
<#-- 表单通用部分 -->
<#macro userPageRegistFormCommonField>
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
  <tr><td class="c0">昵　称</td>
      <td class="c1">
        <input type="text" 
               name="nickname"
               class="txt bd01 w-rd3 wd0"
               data-max-length="20"
               data-required="true"
               data-message="请输入昵称"
               data-tip="中英文都可，最多20个英文或者10个中文"/>
      </td></tr>
  <tr><td class="c0">所在地</td>
      <td class="c1">
        <select name="province" class="bd01 w-rd3 wd2"></select>
        <select name="city" class="bd01 w-rd3 wd2"></select>
        <select name="area" class="bd01 w-rd3 wd2"></select>
      </td></tr>
</#macro>
<#macro userPageRegistFormCommonButton>
  <tr><td class="c0">&nbsp;</td>
      <td class="c1 apt"><label>
        <input type="checkbox"
               name="accept"
               class="cbx"
               checked="checked"
               data-required="true"
               data-message="您必须同意聚否的使用协议"/>我已经认真阅读并同意聚否的《<a class="fc02" href="/license/" target="_blank">服务条款</a>》</label>
      </td></tr>
  <tr><td class="c0">&nbsp;</td>
      <td class="c1 tip"><input type="button" name="btn-ok" class="w-rd3 t-btn t-btn-4" value="注册"/></td></tr>
  <tr><td class="c0">&nbsp;</td>
      <td class="c1 tip"><span>已经有聚否账号？</span><a class="fc02" href="/login/" data-action="login">直接登录</a></td></tr>
</#macro>
<#-- 注册表单 -->
<#macro userPageRegistForm>
  <@module id="r0" class="t-mdc t-mdr">
    <p class="xtl">欢迎加入聚否</p>
    <@taber items=["邮箱注册","手机注册"] index=-1></@taber>
  </@module>
</#macro>
<#-- 注册页面 -->
<#macro userPageRegist user={}>
  <@page user=user index=-1 class="g-regist t-gbx">
    <div class="t-man f-cb">
      <@messagebox/>
      <div class="fr l-hsd">
        <#-- place holder -->
      </div>
      <div class="l-hmc">
        <@userPageRegistForm/>
      </div>
    </div>
  </@page>
</#macro>
<#-- 注册页面模版 -->
<#macro userPageRegistTemplate>
  <textarea name="txt" id="txt-regist-email">
	  <form class="w-fom">
	    <table class="xtb">
	      <tr><td class="c0">邮　箱</td>
	          <td class="c1">
	            <input type="text" 
	                   name="email"
	                   class="txt bd01 w-rd3 wd0"
	                   data-required="true"
	                   data-type="email"
	                   data-message="请输入正确的邮箱地址"
	                   data-tip="用来登录聚否，接受到邮件激活完成注册"/>
	          </td></tr>
	      <@userPageRegistFormCommonField/>
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
	      <@userPageRegistFormCommonButton/>
	    </table>
	  </form>
  </textarea>
  <textarea name="txt" id="txt-regist-phone">
	  <form class="w-fom">
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
	                   data-tip="用来登录聚否，接受到验证码激活完成注册"/>
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
          <@userPageRegistFormCommonField/>
          <@userPageRegistFormCommonButton/>
	    </table>
	  </form>
  </textarea>
</#macro>
</#escape>