<#escape x as x!""?html>
<#-- 个人信息模块 -->
<#macro userPageHomeProfile user={}>
  <@module id="h0" class="s-srd">
    <div class="w-lfac w-lfac-h f-cb">
      <div class="fl img"><img src="${user.thumbnail!p_portrait}"/ class="w-rd5p"></div>
      <div class="dtl">
        <p><a class="fc11 hnm" href="#">${user.nickname!user.username}</a></p>
        <div class="bio fc05">${user.bio}</div>
        <p class="hlk"><a class="fc11 f-bg f-bg-01" href="/setting/">编辑个人资料</a></p>
      </div>
    </div>
  </@module>
</#macro>
<#-- 活动列表模块 -->
<#macro userPageHomeMetting>
  <@module id="h1" class="t-mdc">
    <div class="w-fom xtp">
      <select class="bd01 w-rd3 js-flag">
        <option value="0">所有活动</option>
        <option value="1">已参加的</option>
        <option value="2">未回复的</option>
      </select>
    </div>
    <@taber items=["即将开始(${upcomingCount!0})","已经结束(${pastCount!0})"] index=-1 id="user-meeting"/>
    <div class="more js-flag" style="visibility:hidden;">查看更多活动</div>
  </@module>
</#macro>
<#-- 日历选择模块 -->
<#macro userPageHomeCalendar>
  <@module id="h2" class="s-srd">
    <div class="xym f-cb">
      <span class="py fl bt js-flag" title="上一年">&lt;&lt;</span>
      <span class="pm fl bt js-flag" title="上一月">&lt;</span>
      <span class="ny fr bt js-flag" title="下一年">&gt;&gt;</span>
      <span class="nm fr bt js-flag" title="下一月">&gt;</span>
      <span class="ymt"><span class="js-flag"></span>年<span class="js-flag"></span>月</span>
    </div>
    <table class="xdt">
      <tr><#list ["日","一","二","三","四","五","六"] as x><th class="bg03">周${x}</th></#list></tr>
      <#list 1..6 as x>
      <tr><#list 1..7 as y><td class="bg01 bd04 js-flag"></td></#list></tr>
      </#list>
    </table>
  </@module>
</#macro>
<#-- 加入的组织模块 -->
<#macro userPageHomeGroup>
  <@module id="h3" title="你加入了113个组织" class="s-srd">
  
      <div class="w-lfac f-cb bd00">
        <div class="fl img">
          <img class="js-flag" src="${p_logo}"/>
          <div class="gat js-flag f-bg">&nbsp;</div>
        </div>
        <div class="dtl fc05">
          <p class="nm"><a class="fc02 js-flag" href="#">俱乐部名称</a></p>
          <p class="ln fc05">浙江省杭州市</p>
          <p class="ln fc05">会员：110名</p>
          <p class="ln fc05">已举办活动：200次</p>
        </div>
      </div>
      
  </@module>
</#macro>
<#-- 个人中心页面 -->
<#macro userPageHome user={}>
  <@page user=user index=-1 class="g-profile g-xxx t-gbx">
    <div class="t-man f-cb">
      <@messagebox/>
      <div class="fr l-hsd-s">
        <@userPageHomeCalendar/>
        <#--@userPageHomeGroup/-->
      </div>
      <div class="l-hmc">
        <@userPageHomeProfile user=user/>
        <@userPageHomeMetting/>
      </div>
    </div>
  </@page>
</#macro>
<#-- 个人中心页面模版 -->
<#macro userPageHomeTemplate>
  <textarea name="ntp" id="ntp-meeting-item">
      <div class="w-meet-2 bd00 f-cb">
        <p class="fl logo"><img class="js-flag"/></p>
        <div class="fr numb bd00">
          <div class="ln ln0 js-flag"></div>
          <div class="ln ln1 js-flag"></div>
        </div>
        <div class="smry">
          <p class="ln0"><a href="#" class="fc11 js-flag"></a></p>
          <p class="ln1 f-tf"><a href="#" class="fc07 js-flag"></a></p>
          <p class="ln2 fc07 js-flag"></p>
          <p class="ln2 fc07 js-flag"></p>
        </div>
      </div>
  </textarea>
  <#noparse>
  <textarea name="jst" id="jst-meeting-timeline">
    <div class="w-tline bg06 fc11 bd01">${text}</div>
  </textarea>
  </#noparse>
</#macro>
</#escape>