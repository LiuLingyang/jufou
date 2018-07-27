<!DOCTYPE html>
<html>
  <head>
    <title>重置密码 - 聚否</title>
    <@head/>
    <!-- @STYLE -->
    <link href="${css_root}base.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}window.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}user/regist.css" rel="stylesheet" type="text/css"/>
    <link href="/res/theme/default/style.css" rel="stylesheet" type="text/css"/>
  </head>
  <body id="www-jufou-com">
    <@page user=user index=0 class="g-xxx g-reset t-gbx">
      <div class="t-man f-cb">
      <@messagebox/>
      <div class="fr l-hsd">
        <#-- place holder -->
      </div>
      <div class="l-hmc">
        <@module id="r0" class="t-mdc t-mdr">
          <p class="xtl">重置密码</p>
          <form class="w-fom">
            <table class="xtb">
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
                  <td class="c1"><input type="button" name="btn-ok" class="w-rd3 t-btn t-btn-4" value="完成"/></td></tr>
            </table>
          </form>
        </@module>
      </div>
    </div>
    </@page>
    <#noparse>
    <!-- @DEFINE -->
    </#noparse>
    <script src="${lib_root}define.js${cfg_root}"></script>
    <script>
        define(['{pro}module/user/reset.js'],
        function(){
            var _ = NEJ.P;
            _('mu.x')._$setup(
                _('mu.m.u')._$$ModuleReset);
        });
    </script>
  </body>
</html>