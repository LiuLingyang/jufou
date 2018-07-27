<#escape x as x!""?html>
<#macro groupContact group={} relation=0>
  <#local action="">
  <#if relation&gt;1>
  <#local action="<div class=\"mnu\"><label class=\"bxt js-xflag f-bg fc11\">导入通讯录</label><label class=\"bxt2 js-xflag f-bg fc11\">创建联系人</label></div>">
  </#if>
  <@module id="v0" title="通讯录" class="s-srd t-mdi t-contact"
    menu="${action}">
    <div class="lbox js-flag" id="group-contact-box">
      <p class="w-loading">&nbsp;</p>
    </div>
    <div class="pgx js-flag" id="group-contact-pager" style="visibility:hidden;"></div>
  </@module>
</#macro>
<#macro groupContactTemplate group={} relation=0>
  <#noparse>
  <textarea name="jst" id="group-contact-list">
    {list beg..end as y}
      {var x=xlist[y]}
	   <div class="w-contact f-cb bd02 fl" id="${x.id|seed}">
	     {if relation>1}
	     <div class="action">
	       <a class="fc11" href="#" data-id="${x.id}" data-action="update">编辑</a>
           <a class="fc11" href="#" data-id="${x.id}" data-action="delete">删除</a>
         </div>
         {/if}
	     <p>${x.name}</p>
	     <table class="xtb">
	       <tbody>
	         <tr><td class="c">公司：</td><td>${x.company}</td><td class="c">手机：</td><td>${x.mobile}</td></tr>
	         <tr><td class="c">邮箱：</td><td>${x.email}</td><td class="c">QQ：</td><td>${x.qq}</td></tr>
	       </tbody>
	     </table>
	   </div>
    {/list}
  </textarea>
  <textarea name="txt" id="txt-home-nocontact">
  	<div class="w-message">没有数据！</div>
  </textarea>
  </#noparse>
</#macro>
</#escape>