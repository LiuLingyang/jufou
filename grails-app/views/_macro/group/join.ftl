<#escape x as x!""?html>
<#-- 模块ID 70-79 -->
<#-- 申请加入组织表单 -->
<#macro groupFormJoin group={} user={} update=false>
  <#local l_user=user.attendee!{}>
  <div class="w-fom">
    <input type="hidden" name="gid" value="${group.id}"/>
    <input type="hidden" name="update" value="${update?string}"/>
    <div class="blk xxx">
      <p class="ytl">自我介绍</p>
      <div><textarea class="bd01 w-rd3 wd0 ht0" name="intro" maxlength="250" data-counter="true">${user.bio!l_user.bio}</textarea></div>
    </div>
    <#local l_question=(group.questions![])?sort_by("id")
            l_answer=user.answers![]>
    <#if l_question?size&gt;0>
    <div class="blk xxq">
      <p class="ytl">回答几个问题</p>
      <div class="yqt">
        <input type="hidden" name="answer"/>
        <#list l_question as x>
        <div class="qbk xxx">
          <p class="ln0">${x_index+1}. ${x.question}</p>
          <p><input type="text" 
                    name="answer-t"
                    maxlength="250"
                    data-focus="true"
                    data-qid="${x.id}"
                    class="txt bd01 w-rd3 wd1" 
                    value="${parseAnswer(x.id,l_answer)}"/></p>
        </div>
        </#list>
      </div>
    </div>
    </#if>
  </div>
</#macro>
<#-- 申请加入组织页面 -->
<#macro groupJoin group={} user={}>
  <form class="w-fom s-srd join">
    <@module title="加入组织申请" id="70" class="t-mdi t-mdf">
      <p class="xtp fc06">组织者希望您在加入组织前填写以下内容</p>
      <@groupFormJoin group=group user=user/>
    </@module>
    <div class="w-tbar bd02 bg01 f-cb">
      <input name="btn-ok" type="button" class="fr w-rd3 t-btn t-btn-4" value="递交申请"/>
      <a class="fr w-rd3 t-btn t-btn-2 js-flag" href="/${group.homepage}/">取消</a>
    </div>
  </form>
</#macro>
<#-- 更新用户卡片页面 -->
<#macro groupMemberUpdate group={} user={}>
  <@module title="编辑会员卡片" id="70" class="t-mdi t-mdf">
    <@groupFormJoin group=group user=user update=true/>
  </@module>
  <div class="w-tbar bd02 bg01 f-cb">
    <input name="btn-ok" type="button" class="fr w-rd3 t-btn t-btn-4" value="保存设置"/>
    <a class="fr w-rd3 t-btn t-btn-2 js-flag" href="/${group.homepage}/member/${user.attendee.id}/">取消</a>
  </div>
</#macro>
</#escape>