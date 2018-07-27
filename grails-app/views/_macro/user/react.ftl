<#escape x as x!""?html>
<#macro userPageActivateReact>
    <@module id="r3" class="t-mdc t-mdr t-mdl-r0">
      <p class="xtl">重新发送激活邮件</p>        
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
	                     data-tip="用来接受激活邮件"/>
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
                   <td class="c1"><input type="button" name="btn-ok" class="w-rd3 t-btn t-btn-4" value="重发邮件"/></td></tr>
	        </table>
	      </form>
    </@module>
</#macro>
<#macro userPageActivateReactTemplate>
  <textarea name="jst" id="jst-act-fail">
    <@module id="r2" class="t-mdc t-mdr t-mdl-r1">
    <#noparse>
      <p class="xtl">激活邮件发送失败</p>
      <p class="ln1 fc06">邮箱地址没有注册？<a class="js-flag fc03" href="/regist/">重新注册</a></p>
      <p class="ln1 fc06">邮箱地址错误？<a class="js-flag fc03" href="/react/?email=${email}">重新发送激活邮件</a></p>
    </#noparse>
    </@module>
  </textarea>
</#macro>
</#escape>