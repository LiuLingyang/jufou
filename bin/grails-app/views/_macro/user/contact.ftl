<#escape x as x!""?html>
<#-- 分组列表 -->
<#macro userPageContactGroup>
  <@module id="t0" class="s-srd">
    <form class="w-fom w-tit">
      <p><input type="text" name="keyword" class="txt2 bd01 w-rd3l wd0" placeholder="关键字"/><#--
      --><input type="button" class="sch bd01 w-rd3r f-bg" name="btn-ok" value=" "/></p>
      <div class="itm fc07 js-flag" data-value="0">所有联系人</div>
    </form>
  </@module>
</#macro>
<#-- 联系人列表 -->
<#macro userPageResult>
  <@module id="t1" title="通讯录" class="t-mda s-srd"
    menu="<div class=\"mnu\"><label class=\"bxt js-flag f-bg fc11\">导入通讯录</label><label class=\"bxt2 js-flag f-bg fc11\">创建联系人</label></div>">
    <div class="lbox js-flag">
      <p class="w-loading">&nbsp;</p>
    </div>
    <div class="pager js-flag"></div>
  </@module>
</#macro>
<#-- 联系人页面 -->
<#macro userPageContact user={}>
  <@page user=user index=-1 class="g-contact g-xxx t-gbx">
  <div class="t-man f-cb">
    <@messagebox/>
    <div class="fl l-lsd">
      <@userPageContactGroup/>
    </div>
    <div class="l-lmc">
      <@userPageResult/>
    </div>
  </div>
  </@page>
</#macro>
<#-- 联系人页面模版 -->
<#macro userPageContactTemplate>
  <#noparse>
  <textarea name="jst" id="jst-contact-list">
    <table class="clst bd01">
      <tr><th class="c0 fc07 bg05 bd01">姓名</th>
          <th class="c1 fc07 bg05 bd01">邮箱地址</th>
          <th class="c2 fc07 bg05 bd01">手机号码</th>
          <th class="c3 fc07 bg05 bd01">操作</th></tr>
      {list beg..end as y}
      {var x=xlist[y]}
      <tr><td class="c0 bd01">${x.name|default:''}{if x.registered}[已注册]{/if}</td>
          <td class="c1 bd01">${x.email|default:''}</td>
          <td class="c2 bd01">${x.mobile|default:''}</td>
          <td class="c3 bd01">
            <a class="fc11" href="#" data-id="${x.id}" data-action="update">编辑</a>
            <a class="fc11" href="#" data-id="${x.id}" data-action="delete">删除</a>
          </td></tr>
      {/list}
    </table>
  </textarea>
  <textarea name="jst" id="jst-contact-empty">
    <table class="clst bd01">
      <tr><th class="c0 fc07 bg05 bd01">姓名</th>
          <th class="c1 fc07 bg05 bd01">邮箱地址</th>
          <th class="c2 fc07 bg05 bd01">手机号码</th>
          <th class="c3 fc07 bg05 bd01">操作</th></tr>
      <tr><td class="ept bd01" colspan="4">
        <p class="tip">{if !!keyword}没有搜索到叫“${keyword}”的联系人{else}该组还没有联系人{/if}</p>
        <div class="new">
          <input type="button" class="w-rd3 t-btn t-btn-1" value="添加联系人" data-action="create"/>
        </div>
      </td></tr>
    </table>
  </textarea>
  </#noparse>
</#macro>
</#escape>