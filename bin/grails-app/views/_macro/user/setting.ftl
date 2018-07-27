<#escape x as x!""?html>
<#-- 设置类型 -->
<#macro userPageSettingType>
  <@module id="s0" class="s-srd">
    <div class="w-tit f-nl">
      <#local msType=[{"t":"个人资料","h":"profile"},
                      {"t":"消息设置","h":"message"}]>
      <#list msType as x>
      <a class="itm js-flag" href="#${x.h}" data-value="/m/${x_index}/">${x.t}</a>
      </#list>
    </div>
  </@module>
</#macro>
<#-- 基本资料设置块 -->
<#macro userPageSettingProfileBlock title="" class="">
  <div class="w-sblk f-cb bd00 js-blag ${class}">
    <div class="bg01">
      <div class="fl txl">
        <span class="t fc07">${title}</span>
      </div>
      <div class="rmn f-cb bg00">
        <#nested>
      </div>
    </div>
  </div>
</#macro>
<#-- 基本资料设置 -->
<#macro userPageSettingProfile user={}>
  <@module id="s1" title="个人资料" class="t-mda s-srd">
    <@userPageSettingProfileBlock title="头像" class="w-sblk-0">
      <div class="fl img">
        <img class="js-flag w-rd5p" src="${user.thumbnail!p_portrait}"/>
        <div class="w-loading js-flag" style="display:none;">&nbsp;</div>
      </div>
      <div class="fl">
        <div class="ln ln0"><label class="w-rd3 t-btn t-btn-5 js-flag">选择文件</label></div>
        <p class="ln">支持JPG、GIF、PNG格式，不超过1MB</p>
        <div class="ln"><input type="button" value="上传文件" class="w-rd3 t-btn t-btn-1 js-flag"/></div>
      </div>
    </@userPageSettingProfileBlock>
    <@userPageSettingProfileBlock title="个人资料">
      <table class="w-stb">
        <tr><td class="c0">昵称：</td>
            <td class="c1 js-xxy">${user.nickname}</td>
            <td class="c2"><a href="#" class="js-flag fc11">修改</a></td></tr>
        <tr><td class="c0">性别：</td>
            <td class="c1 js-xxy">${["男","女"][user.gender!0]}</td>
            <td class="c2">&nbsp;</td></tr>
        <tr><td class="c0">生日：</td>
            <td class="c1 js-xxy">
              <#if user.birthday??&&user.birthday!=0>
                ${user.birthday?number_to_date?string("yyyy-MM-dd")}
              </#if>
            </td>
            <td class="c2">&nbsp;</td></tr>
        <tr><td class="c0">所在地：</td>
            <td class="c1 js-xxy">${user.province}${user.city}${user.area}&nbsp;</td>
            <td class="c2">&nbsp;</td></tr>
        <tr><td class="c0">个人描述：</td>
            <td class="c1 js-xxy" colspan="2">${(user.bio!"")?replace("\n","<br/>")}</td></tr>
      </table>
    </@userPageSettingProfileBlock>
    <@userPageSettingProfileBlock title="安全信息">
      <table class="w-stb">
        <tr><td class="c0">密码：</td>
            <td class="c1">**********</td>
            <td class="c2"><a href="#" class="js-flag fc11">修改</a></td></tr>
        <tr><td class="c0">邮箱：</td>
            <td class="c1">${user.email}</td>
            <td class="c2"><a href="#" class="js-flag fc11">验证</a></td></tr>
        <tr><td class="c0">手机号码：</td>
            <td class="c1 js-flxg">${user.mobile}</td>
            <td class="c2"><a href="#" class="js-flag fc11">绑定</a></td></tr>
      </table>
    </@userPageSettingProfileBlock>
    <#--@userPageSettingProfileBlock title="关注我">
      <table class="w-stb">
        <tr><td class="c3 f-bg" colspan="2">新浪微博</td>
            <td class="c2"><a href="#" class="fc03">解除绑定</a></td></tr>
        <tr><td class="c32 f-bg" colspan="2">腾讯微博</td>
            <td class="c2"><input type="button" value="绑定" class="w-rd3 t-btn t-btn-b"/></td></tr>
        <tr><td class="c33 f-bg" colspan="2">网易微博</td>
            <td class="c2"><a href="#" class="fc03">解除绑定</a></td></tr>
      </table>
    </@userPageSettingProfileBlock-->
  </@module>
</#macro>
<#-- 个人设置页面 -->
<#macro userPageSetting user={}>
  <@page user=user index=-1 class="g-profile g-xxx t-gbx">
    <div class="t-man f-cb">
      <@messagebox/>
      <div class="fl l-lsd">
        <@userPageSettingType/>
      </div>
      <div class="l-lmc" id="module-box"><@messagebox/></div>
    </div>
  </@page>
</#macro>
<#-- 个人设置页面模版 -->
<#macro userPageSettingTemplate user={} host={}>
  <textarea name="js">
    window.data.user = ${json(host)};
  </textarea>
  <textarea name="txt" id="txt-mdl-profile">
    <@userPageSettingProfile user=host/>
  </textarea>
  <textarea name="ntp" id="ntp-mdl-profile">
    <form class="w-fom">
      <table class="xtb">
        <tr><td class="c0">昵称</td>
            <td class="c1"><input type="text" name="nickname" class="txt bd01 w-rd3 wd0" data-required="true" data-max-length="20" data-message="请输入昵称"/></td></tr>
        <tr><td class="c0">性别</td><td class="c1">
            <label><input type="radio" name="gender" class="cbx" value="0" checked="checked"/>男</label>
            <label><input type="radio" name="gender" class="cbx" value="1"/>女</label></td></tr>
        <tr><td class="c0">生日</td>
            <td class="c1 js-flag"></td></tr>
        <tr><td class="c0">所在地</td><td class="c1">
            <select name="province" class="bd01 w-rd3 wd2"></select>
            <select name="city" class="bd01 w-rd3 wd2"></select>
            <select name="area" class="bd01 w-rd3 wd2"></select></td></tr>
        <tr><td class="c0" valign="top">个人描述</td>
            <td class="c1"><textarea name="bio" class="bio bd01 w-rd3 wd0" maxlength="200"><&#47;textarea></td></tr>
      </table>
      <div class="xbtn f-cb">
        <input type="button" class="fl w-rd3 btn btn-c" name="btn-cc" value="取  消"/>
        <input type="button" class="fl w-rd3 btn btn-k" name="btn-ok" value="确  定"/>
      </div>
    </form>
  </textarea>
  <textarea name="txt" id="txt-mdl-message">
    <@module id="s2" title="消息设置" class="t-mda s-srd"
             menu="<a class=\"fr fc11 js-flag\" href=\"#\">默认设置</a>">
      <div class="sbox js-flag"></div>
      <div class="lbox js-flag"></div>
      <div class="pbox js-flag"></div>
    </@module>
  </textarea>
  <textarea name="txt" id="txt-message-form">
    <form class="w-xet w-fom bg01">
      <@userGroupMessageSettingForm/>
      <input type="hidden" name="gid"/>
      <div class="w-tbar-message f-cb">
        <input type="button" name="btn-ok" class="fr w-rd3 t-btn t-btn-4" value="保存设置" name="btn-ok"/>
        <input type="button" class="fr w-rd3 t-btn t-btn-2" value="取消" name="btn-cc"/>
      </div>
    </form>
  </textarea>
  <textarea name="ntp" id="ntp-message-item">
    <div class="w-mitm bd00">
      <div class="w-lfac f-cb">
        <div class="fl img"><img class="js-flag"/></div>
        <div class="fr set">
          <input type="button" class="w-rd3 t-btn t-btn-7 js-flag" value="推送消息设置"/>
        </div>
        <div class="dtl">
          <p><a class="fc02 ftl js-flag" href="#"></a></p>
          <p class="fc07 js-flag"></p>
          <p class="js-flag"></p>
        </div>
      </div>
    </div>
  </textarea>
  <#noparse>
  <textarea name="jst" id="jst-message-item-action">
    {if admin}
    <a href="#" class="fc11" data-action="dismiss">解散该组织</a>
    {else}
    <a href="#" class="fc11" data-action="exit">退出该组织</a>
    {/if}
  </textarea>
  </#noparse>
</#macro>
</#escape>