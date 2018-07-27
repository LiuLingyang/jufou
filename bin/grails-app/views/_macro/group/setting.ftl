<#escape x as x!""?html>
<#-- 模块ID 90-99 -->
<#-- 设置信息 -->
<#macro groupSettingBlock title="" href="#" list=[]>
  <div class="w-ybk">
    <p class="ln0"><a class="fc02" href="${href}">${title}</a></p>
    <#list list as x>
    <p class="lnx fc07">&#149; ${x}</p>
    </#list>
  </div>
</#macro>
<#-- 设置首页 -->
<#macro groupSettingHome group={}>
  <#local prefix="/"+((group.homepage)!"group")+"/setting/">
  <@module title="群组设置" id="90" class="t-mdi s-srd">
    <table class="xtb">
      <tr>
        <td><@groupSettingBlock title="基本信息" href=prefix+"basic/"
              list=["名称","主题栏","介绍","成员被叫什么","地理位置","网址"]/></td>
        <td><@groupSettingBlock title="成员设置" href=prefix+"member/"
              list=["成员入会需要回答的问题","入会设置","会员入会需要提交的信息","新会员欢迎词"]/></td>
        <td><@groupSettingBlock title="组织标签" href=prefix+"tag/"
              list=["设置合适的标签以便他人能找到组织"]/></td>
      </tr>
      <tr>
        <td><@groupSettingBlock title="隐私设置" href=prefix+"privacy/"
              list=["页面只有会员可见"]/></td>
        
        <td><#--@groupSettingBlock title="个性化页面设置" href=prefix+"theme/"
              list=["自定义颜色和字体","自定义风格"]/--></td>
        <td><#--@groupSettingBlock title="组织地址" href=prefix+"share/"
              list=["分享你的组织所在地","分享你的地址"]/--></td>
      </tr>
    </table>
  </@module>
</#macro>
</#escape>