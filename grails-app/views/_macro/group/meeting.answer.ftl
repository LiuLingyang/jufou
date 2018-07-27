<#escape x as x!""?html>
<#-- 模块ID s0-s9 -->
<#-- 活动回复问题列表页面 -->
<#macro groupMeetingAnswer group={} meeting={}>
  <@module id="s0" class="s-srd">
    <p class="fr mun"><a href="/${group.homepage}/meeting/${meeting.id}/" class="fc02">返回</a></p>
    <p class="ln ln0 fc09">你设置的问题的答案</p>
    <p class="ln ln1 fc03"><a class="fc03" href="/${group.homepage}/meeting/${meeting.id}/">${meeting.title}</a>&nbsp;&nbsp;${meeting.startTime?number_to_datetime?string("yyyy-MM-dd HH:mm")}</p>
    <div class="lbox js-flag"></div>
    <div class="pbox js-flag"></div>
  </@module>
</#macro>
<#-- 活动回复问题列表页面模板 -->
<#macro groupMeetingAnswerTemplate meeting={}>
  <textarea name="js">
    window.data.meeting = ${json(meeting)};
  </textarea>
  <#noparse>
  <textarea name="jst" id="jst-answer-list">
    <table class="w-atb">
      <tr><th class="c c0 bd01 bg01 fc07">成员</th>
          <th class="c c1 bd01 bg01 fc07">回答</th>
          <th class="c c2 bd01 bg01 fc07">是否参加</th>
          <th class="c c3 bd01 bg01 fc07">回答时间</th></tr>
    {list beg..end as y}
      {var z=xlist[y]}
      {var x=z.attendee}
      {var w=z.answers}
      <tr><td class="c c0 bd01">
            <img src="${x.thumbnail|default:config.url.portrait}" class="w-rd5p"/>
            <p><a class="fc02" href="${config.page()}/member/${x.id}/">${x.nickname}</a></p>
          </td>
          <td class="c c1 bd01">
            {if w.length>0}
              {list w as xx}
              <p>${xx.question.question}？<span class="fc05">${xx.answer}</span></p>
              {/list}
            {/if}
          </td>
          <td class="c c2 bd01"><span class="fc04">{if z.state==1||z.state==4}不{/if}参加</span></td>
          <td class="c c3 bd01">${z.attendTime|format:'yyyy-MM-dd HH:mm'}</td></tr>
    {/list}
    </table>
  </textarea>
  </#noparse>
</#macro>
</#escape>