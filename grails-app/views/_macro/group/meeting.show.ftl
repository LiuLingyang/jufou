<#escape x as x!""?html>
<#-- 模块ID 20-29 -->
<#function canReply joinPermission relation invited>
  <#switch joinPermission>
    <#case 0> <#return relation&gt;=0>
    <#case 1> <#return relation&gt;0>
    <#case 2> <#return relation&gt;0||invited>
  </#switch>
</#function>
<#function isMeetingEnd meeting>
  <#if meeting.endTime==0>
    <#if (meeting.startTime+24*60*60*1000)&lt;.now?long>
      <#return true>
    <#else>
      <#return false>
    </#if>
  <#else>
    <#return meeting.endTime&lt;.now?long>
  </#if>
</#function>
<#-- 参加表单 -->
<#macro groupMeetingFormJoin meeting={} reply={} hidden=false>
  <#assign state=reply.state!1
           joined=state==0||state==1||state==3>
  <form class="w-fom<#if !joined> js-ncj</#if>" <#if hidden>style="display:none"</#if> id="meeting-reply-form">
    <div class="ln ln2">你要参加吗？</div>
    <div class="ln ln0">
      <label><input type="radio" class="cbx" name="state" value="1"<#if joined> checked="checked"</#if>/>参加</label>
      <label><input type="radio" class="cbx cbx-s" name="state" value="0"<#if !joined> checked="checked"</#if>/>不参加</label>
    </div>
    <div class="ln xxx xdx">
      <input type="text" class="txt bd01 w-rd3 wd0" name="observer" placeholder="+${reply.observer!0}"/>
      <label>位同伴</label>
    </div>
    <div class="ln xxx">
      <textarea class="bd01 w-rd3 wd1 ht0" name="content" placeholder="说些什么">${reply.content}</textarea>
    </div>
    <div class="ln">
      <input type="button" class="w-rd3 t-btn js-btn t-btn-0 tip" value="参加" name="btn-ok"/>
    </div>
    <#if questions?size&gt;0>
    <input type="hidden" name="qusetion" value="true" id="question-exist">
    </#if>
    <div class="ln ln1">
      <#if meeting.joinLimit!=0>
      <p class="xx"><span class="fc04">${meeting.joinLimit-meeting.joinCount}</span>个剩余名额</p>
      <p class="xx">每人可携带<span class="fc04">${meeting.observerLimit}</span>人</p>
      </#if>
      <#if meeting.signupEndTime!=0>
      <p class="xxx">报名截止：</p>
      <p>${meeting.signupEndTime?number_to_datetime?string("yyyy-MM-dd HH:mm")}</p>
      </#if>
    </div>
  </form>
</#macro>
<#-- 活动回复状态 -->
<#macro groupMeetingReply meeting={} state=0 relation=0 attendable=0 homepage="">
  <#-- 活动取消 -->
  <#if attendable==-306>
  <input class="w-rd3 t-btn t-btn-7 js-btn-disabled" type="button" value="活动已取消"/>
  <#return>
  </#if>
  <#-- 未登录 -->
  <#if attendable==-110>
  <a class="w-rd3 t-btn t-btn-7" href="/login/?target=/${homepage}/meeting/${meeting.id}/" data-action="meeting-join" data-target="/${homepage}/meeting/${meeting.id}/">加入&回复</a>
  <#return>
  </#if>
  <#-- 权限不足 -->
  <#if attendable==-309||attendable==-310>
  <a class="w-rd3 t-btn t-btn-7" href="/${homepage}/join/?target=/${homepage}/meeting/${meeting.id}/">加入&回复</a>
  <#return>
  </#if>
  <#-- 报名未开始 -->
  <#if attendable==-307>
  <input class="w-rd3 t-btn t-btn-7 js-btn-disabled" type="button" value="报名未开始"/>
  <#return>
  </#if>
  <#-- 报名已结束 -->
  <#if attendable==-308>
  <input class="w-rd3 t-btn t-btn-7 js-btn-disabled" type="button" value="报名已结束"/>
  <#return>
  </#if>
  <#-- 活动停止回复 -->
  <#if attendable==-311>
  <input class="w-rd3 t-btn t-btn-7 js-btn-disabled" type="button" value="活动停止回复"/>
  <#return>
  </#if>
  <#-- 管理员拒绝 -->
  <#if attendable==-305>
  <input class="w-rd3 t-btn t-btn-7 js-btn-disabled" type="button" value="管理员：不参加"/>
  <#return>
  </#if>
  <#-- 名额已满 -->
  <#if attendable==-303>
    <#if state==0>
    <input class="w-rd3 t-btn t-btn-7 js-btn-disabled" type="button" value="名额已满"/>
    <#else>
    <input class="w-rd3 t-btn t-btn-7 js-btn" type="button" value="修改回复"/>
    </#if>
  <#return>
  </#if>
  <#-- 修改回复 -->
  <#if attendable==1>
  <input class="w-rd3 t-btn t-btn-7 js-btn" type="button" value="修改回复"/>
  <#return>
  </#if>
</#macro>
<#-- 活动回复 -->
<#macro groupMeetingReplyBlock meeting={} state=0 relation=0 homepage="" invited=false>
  <#-- 已登录但未回复 -->
  <#if state==0&&relation&gt;=0&&
       canReply(meeting.joinPermission,relation,invited)>
    <@module title="" id="20" class="s-srd">
      <@groupMeetingFormJoin meeting=meeting/>
    </@module>
    <#return>
  </#if>
  <#-- 其他状态 -->
  <#local stateText=["不参加","已参加","被参加","被不参加"]
          stateClass=["t-btn-a","t-btn-d","t-btn-d","t-btn-a"]>
  <@module id="28" class="s-srd">
    <#if state&gt;0>
      <div class="sst t-btn ${stateClass[state-1]}">${stateText[state-1]}</div>
      <p class="hld">&nbsp;</p>
    </#if>
    <@groupMeetingReply 
          state=state 
          meeting=meeting 
          homepage=homepage 
          relation=relation
          attendable=attendable/>
    <#if 0&lt;state&&state&lt;4>
      <@groupMeetingFormJoin meeting=meeting hidden=true/>
    </#if>
  </@module>
  
</#macro>
<#-- 活动详情 -->
<#macro groupMeetingRight group={} meeting={} reply={} options={}>
  <div class="fr l-rsd">
    <#if !isMeetingEnd(meeting)>
        <@groupMeetingReplyBlock
            meeting=meeting 
            state=options.state
            invited=options.invited 
            homepage=group.homepage 
            relation=options.relationship/>
        
        <#if options.relationship==3 || options.relationship==2 || options.relationship==4>
        <@module title="管理工具" id="27" class="s-srd">
          <input type="hidden" value="${meeting.state}" name="meetstate" id="meeting-state"/>
        </@module>
        </#if>
    </#if>
    
    <@module title="${meeting.joinCount}人参加" id="21" class="s-srd">
      <#if options.attend?size&gt;0>
    	<#list options.attend as x>
    	<#local u=x.attendee!x>
    	<div class="w-lfac f-cb bd00 wd1">
          <div class="fl img"><img src="${u.portrait!p_portrait}" class="w-rd5p"/></div>
          <div class="dtl">
            <p class="uev fc05 f-tf"><a class="fc02" href="/${group.homepage}/member/${u.id}/">${u.nickname!u.username}</a></p>
            <#if x.observer!=0>
            <p class="utm fc05">+${x.observer}</p>
            </#if>
          </div>
        </div>
        </#list>
      <#else>
        <p class="w-message">暂时无人参加活动</p>
      </#if>
    </@module>
    
    <#if options.refuse?size&gt;0>
    <@module title="${options.refuse?size}人不参加" id="22" class="s-srd">
      <#list options.refuse as x>
    	<div class="w-lfac f-cb bd00">
          <div class="fl img"><img src="${x.portrait!p_portrait}"/></div>
          <div class="dtl">
            <p class="uev fc05 f-tf"><a class="fc02">${x.nickname!x.username}</a></p>
          </div>
        </div>
      </#list>
    </@module>
    </#if>
  </div>
</#macro>
<#-- 活动详情 -->
<#macro groupMeetingMain group={} meeting={} host={}>
  <div class="l-rmc">
    <@messagebox/>
    <#if relationship==3&&(meeting.state==-2)>
      <@module id="24" class="s-srd">
        <p class="nocr">该活动还未正式发布</p>
        <form id="meeting-public-form">
          <input type="button" name="btn-ok" class="w-rd3 t-btn t-btn-4 pub" value="发布"/>
          <input type="button" name="btn-no" class="w-rd3 t-btn t-btn-6 ref" value="拒绝"/>
          <textarea class="txt bd01 w-rd3" placeholder="若拒绝，请输入拒绝理由" name="reason"></textarea>
       </form>
      </@module>
    </#if>
    <@module id="25" class="s-srd">
      <p class="tx">${meeting.title}</p>
      <#if (((meeting.organizer.id)!-1)==((host.id)!-2)&&meeting.state&lt;0)||(relationship==3&&!isMeetingEnd(meeting))>
      <div class="ax">
        <a class="fc02" href="/${group.homepage}/meeting/update/${meeting.id}/">[编辑活动]</a>
        <a class="fc02 ax-1 js-xflag" href="#">[取消活动]</a>
        <a class="fc02 ax-1 js-xflag" href="#"><#if meeting.top>[取消置顶]<#else>[置顶]</#if></a>
        <a class="fc02 ax-1" href="/${group.homepage}/meeting/copy/${meeting.id}/">[复制]</a>
        <a class="fc02 ax-1" href="/${group.homepage}/invite/${meeting.id}/">[邀请]</a>
      </div>
      </#if>
      <table class="xtb">
        <tr><td class="c0 f-bg"><span>&nbsp;</span></td>
            <td class="c1 fc12">
              <p>开始：${meeting.startTime?number_to_datetime?string("yyyy-MM-dd HH:mm")}</p>
              <#if ((meeting.endTime)!0)!=0>
              <p>结束：${meeting.endTime?number_to_datetime?string("yyyy-MM-dd HH:mm")}</p>
              </#if>
            </td></tr>
        <tr><td class="c01 f-bg"><span>&nbsp;</span></td>
            <td class="c1 ar fc12">${meeting.province}${meeting.city}${meeting.area}${meeting.address}<span class="addtip fc06">${meeting.addressTip}</span></td></tr>        
        <#assign mfee=(fee.type)!0>
        <#if mfee!=0||(mfee==2&&((fee.item)!"")!="")>
        <tr><td class="c02"><span class="f-bg f-bg-02">&nbsp;</span></td>
            <td class="c1 fc12">
              <#if mfee!=0>
              <div class="xb f-cb">
                <div class="mr">
                  <#if mfee==2>
          		  <p>${(((fee.item)!"")+"|")?replace("@","&nbsp;")?replace("|","元/人<br/>")}</p>
                  <div class="fc06 addtip">${(fee.desc!"")?replace("\n","<br/>")}</div>
                  <#else>
                  <p class="fc12">AA制</p>
                  </#if>
                </div>
              </div>
              </#if>            
            </td></tr>
          <#else>
            <tr><td class="c02"><span class="f-bg f-bg-02">&nbsp;</span></td>
                <td class="c1"><p class="fc12">免费</p></td></tr>  
        </#if>
      </table>
      <div class="sns"><a class="w-rd3 t-btn t-btn-0 tip" href="javascript:;" id="weixin_share">微信分享</a></div>
      <div class="xct bd00">
        <p class="xt">活动详情：</p>
        <div class="xc fc07" id="www-jufou-com-detail">${(meeting.details!"")?replace("\n","<br/>")}</div>
      </div>
      <!--div class="sns">
        <div id="sns_share"></div>
        <p><a href="#" class="fc02" id="weixin_share">分享到微信</a></p>
      </div-->
    </@module>
    <@module id="26" class="s-srd"></@module>
  </div>
</#macro>
<#-- 创建活动模版 -->
<#macro groupMeetingCreateTemplate meeting={}>
  <textarea name="js">
    window.data.meeting = ${json(meeting)};
    window.data.fee = ${json(fee)};
  </textarea>
  <#noparse>
  <textarea name="jst" id="jst-rpu-list">
    {list beg..end as y}
      {var x=xlist[y]}
      <div class="w-lfac w-lfac-1 f-cb bd00">
        <div class="fl img"><img src="${x.thumbnail|default:config.url.portrait}"/></div>
        <div class="fr act">
          <div><input type="button" class="w-rd3 btn btn-x" value="不参加"></div>
          <div class="xtm fc05">回复时间：2012-7-12 15:00</div>
        </div>
        <div class="dtl">
          <p class="uev fc05">${x.nickname}</p>
          <p class="utm fc05">1位同伴</p>
        </div>
      </div>
    {/list}
  </textarea>
  <textarea name="jst" id="jst-sns-list">
    {list config as x}
      {if !bindings[x.type]}
      <p><a href="/setting/#profile" class="fc02">分享到${x.title}</a></p>
      {else}
      <p><a href="#" data-sns="${x.type}" class="fc02">分享到${x.title}</a></p>
      {/if}
    {/list}
  </textarea>
  </#noparse>
</#macro>
</#escape>