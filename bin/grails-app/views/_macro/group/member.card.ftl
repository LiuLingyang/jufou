<#escape x as x!""?html>
<#-- 模块ID 80-89 -->
<#-- 成员卡片左侧模块 -->
<#macro groupMemberCardRight user={} host={}>
  <div class="fr l-rsd">
    <@module id="82" class="s-srd">
      <div class="img"><img src="${user.thumbnail!user.attendee.thumbnail!p_portrait}"/></div>
    </@module>
    <@module id="80" title="加入的其他组织" class="s-srd">
      <#if user.attendee.id==host.id>
      <p class="ln0 js-xflag<#if user.attendee.hidden!false!!> js-show</#if>">
        <span class="tp a">你设置了隐藏组织信息</span>
        <a class="fc02 a" href="#" data-action="show">显示</a>
        <a class="fc02 b" href="#" data-action="hide">隐藏我的组织信息</a>
      </p>
      </#if>
      <div class="xbox bd00 js-flag"></div>
      <div class="xmor">
        <input type="button" class="t-btn t-btn-c js-flag" value="查看更多" style="visibility:hidden;"/>
      </div>
    </@module>
  </div>
</#macro>
<#-- 成员卡片中间模块 -->
<#macro groupMemberCardMain user={} host={} group={} host_role=0>
  <div class="l-rmc">
    <@module id="81" title="${user.attendee.nickname}" class="t-mdi s-srd">
      <div class="yact js-flag">
        <#if host.id==user.attendee.id>
        <a class="fc02 edt" href="/${group.homepage}/member/update/${user.attendee.id}/">编辑</a>
        </#if>
        <#assign user_role=user.role!0>
        <#if host_role==3&&user_role==1>
        <a class="fc02 edt" href="#" data-m-action="admin-a">加为管理员</a>
        </#if>
        <#if host_role==3&&user_role==2>
        <a class="fc02 edt" href="#" data-m-action="admin-c">取消管理员</a>
        </#if>
        <#if (host_role==2&&user_role==1)||(host_role==3&&(user_role==2||user_role==1))>
        <a class="fc02 edt" href="#" data-m-action="cancel">取消会员</a>
        </#if>
        <#if host_role==3&&(user_role==2||user_role==1)>
        <a class="fc02 edt" href="#" data-m-action="message">发消息</a>
        </#if>
        <#if host.id==user.attendee.id&&(user_role==1||user_role==2)>
        <a class="fc02 edt" href="#" data-m-action="exit">退出组织</a>
        </#if>
      </div>
      <p class="ln ln1 fc07 f-bg">${d_role_name[user_role]}</p>
      <p class="ln ln2">所在地：${user.attendee.province}，${user.attendee.city}</p>
      <p class="ln ln3">加入组织时间：${user.attendTime?number_to_date?string("yyyy-MM-dd")}</p>
      <div class="blk">
        <p class="ytl">个人简介</p>
        <div class="fc07">${(user.bio)!(user.attendee.bio)!"该用户没有添加任何简介"}</div>
      </div>
      <#local l_question=(group.questions![])?sort_by("id")
              l_answer=user.answers![]>
      <#if l_question?size&gt;0>
      <#list l_question as x>
      <div class="blk">
        <p class="ytl">${x_index+1}. ${x.question}?</p>
        <div class="asw fc07">${parseAnswer(x.id,l_answer)!"没有回答"}</div>
      </div>
      </#list>
      </#if>
    </@module>
  </div>
</#macro>
<#-- 会员卡片模版 -->
<#macro groupMemberCardTemplate user={}>
  <textarea name="js">
    window.data.user = ${json(user)};
    window.data.roles = ${json(d_role_name)};
  </textarea>
  <#noparse>
  <textarea name="jst" id="jst-group-list">
    {if xlist.length>0}
    {list beg..end as y}
    {var x=xlist[y]}
    <div class="w-lfac f-cb bd00">
      <div class="fl img"><img src="${x.thumbnail|default:config.url.logo}"/></div>
      <div class="dtl">
        <p class="uev"><a href="/${x.homepage}/" class="fc02">${x.name}</a></p>
        <p class="utm fc05">${roles[x.role]|default:"会员"}</p>
      </div>
    </div>
    {/list}
    {else}
    <p class="w-message">该成员没有加入其它组织</p>
    {/if}
  </textarea>
  </#noparse>
</#macro>
</#escape>