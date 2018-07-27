<#escape x as x!""?html>
<#-- 模块ID i0-i9 -->
<#-- 目标人群选择 -->
<#macro groupInviteModule group={} meeting={} host={}>
  <div class="blk tvp bd00">   
    <p class="ybt fc07">对朋友说些推荐理由？</p>
    <p class="yip">
      <textarea class="bd01 w-rd3" name="content">
        <#if !(meeting.id)??>
        ${group.name} 组织邀请您加入组织，发现更多的组织活动，找到更多志同道合的好友
        <#else>
        ${host.nickname!host.username}邀请您参加活动：${meeting.title}， 时间：${meeting.startTime?number_to_datetime?string("yyyy-MM-dd HH:mm")}，地点：${meeting.province}${meeting.city}${meeting.area}${meeting.address}
        </#if>
      </textarea>
    </p>
  </div>
  <div class="w-ivt f-cb">
    <p class="tip">还剩<span class="r fc04">${smsRemaining}</span>条免费短信邀请</p>
    <p class="ybt fc07">邀请哪些朋友？</p>
    <div class="spl fl">
      <#assign items=["通讯录"]>
      <#if meeting.id??>
        <#assign items=["通讯录","会员"]>
      </#if>
      <@taber items=items index=-1
              append="<a class=\"fc02 ssr j-flzg\" href=\"#\">手动输入</a>">
          <div class="xxh bd02">
            <p class="xst bd02">
              <span class="fc05">若联系人不是聚否用户，则您希望：</span>
              <label class="rad1"><input type="radio" name="prio" class="cbx" checked="checked"/>优先邮件发送</label>
              <label class="rad2"><input type="radio" name="prio" class="cbx"/>优先短信发送</label>
            </p>
            <p class="xsh j-flzg bg04">
               <input type="text" class="txt2 bd01 w-rd3l wd0" placeholder="搜索联系人"/><#--
            --><input type="button" class="sch bd01 w-rd3r f-bg" value=" "/>
            </p>
          </div>  
          <div class="w-ivl bd01">
            <div class="itm hed fc07 f-cb bg05 bd01">
              <div class="fl c c0 bd00 bd01">
                <label><input class="j-flzg" type="checkbox" class="cbx"/><span>姓名</span></label>
              </div>
              <div class="fl c c0 bd00 bd01">邮箱地址</div>
              <div class="fl c c1">手机号码</div>
            </div>
            <div class="ivb j-flzg">
              <p class="w-loading">&nbsp;</p>
            </div>
          </div>
      </@taber>
      <div class="iva">
        <input name="btn-add" type="button" class="w-rd3 t-btn t-btn-0" value="添加"/>
      </div>
    </div>
    <div class="spr fr">
      <div class="txp">       
        <p class="fl">邀请<span class="r fc04 j-flzg">0</span>人</p>
      </div>
      <div class="w-ivl bd01">
        <div class="itm hed bg01 fc07 f-cb bd01">
          <div class="fl c00">姓名</div>
          <p class="fr rve"><a class="d fc02 j-flzg" href="#" style="display:none;">删除全部</a></p>
        </div>
        <div class="ivb ivbx j-flzg">
          <p class="w-message">没有联系人</p>
        </div>
      </div>
    </div>
  </div>
</#macro>
<#-- 发送邀请页面 -->
<#macro groupInvite group={} meeting={} host={}>
  <form class="w-fom">
    <@module title="邀请朋友加入" id="i0" class="t-mdi t-mdf s-srd">
      <@groupInviteModule group=group meeting=meeting host=host/>
    </@module>
    <div class="w-tbar w-tbar-tip bd02 bg01 f-cb">
      <input name="btn-ok" type="button" class="fr w-rd3 t-btn t-btn-4" value="发送邀请"/>
      <a class="fr w-rd3 t-btn t-btn-2 js-flag" href="/${group.homepage}/">取消</a>
    </div>
  </form>
</#macro>
<#-- 发送邀请页面模板 -->
<#macro groupInviteTemplate group={} meeting={}>
  <textarea name="js">
    window.data.meeting = ${json(meeting)};
  </textarea>
  <#noparse>
  <textarea name="jst" id="jst-invite-list">
    {list beg..end as y}
      {var x=xlist[y]}
      <label class="itm bd00 f-cb">
        <div class="fl c c0 bd00">
          <input type="checkbox" class="cbx j-xck" value="${x.id}" data-name="${x.name}" data-email="${x.email}" data-mobile="${x.mobile}" {if !!invt[x.id]} checked="checked"{/if}/>
          ${x.name}
        </div>
        <div class="fl c c0 bd00">${x.email|default:'&nbsp;'}</div>
        <div class="fl c c1">${x.mobile|default:'&nbsp;'}</div>
      </label>
    {/list}
  </textarea>
  <textarea name="jst" id="jst-invite-item">
    <div class="itm bd00 f-cb" id="invited-${user.id}">
      <div class="fl c00" title="${user.email}{if user.email&&user.mobile}/{/if}${user.mobile}">${user.name}</div>
      <div class="fl c03"><a class="fc02" href="#" data-id="${user.id}">删除</a></div>
    </div>
  </textarea>
  </#noparse>
</#macro>
</#escape>