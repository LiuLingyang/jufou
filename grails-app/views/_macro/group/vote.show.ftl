<#escape x as x!""?html>
<#macro groupVoteShow group={} vote={} relation=0 cast=false>
  <@module id="62" title="${vote.title}" class="s-srd t-mdi">
    <#if relation&gt;1>
    <div class="xtl"><a href="#" data-action="close" class="fc02">结束投票</a></div>
    </#if>
    <#local type="">
    <#if vote.type==1>
      <#local type="单选题">
    <#elseif vote.type==2>
      <#local type="多选题">
    <#else>
      <#local type="每个选项的评分为1-10分，10分最高">
    </#if>
    <div class="itl bd02">
      <p>${vote.description}</p>
      <p>${type}</p>
      <p>
    </div>
    <div id="vote-detail-box"></div>
    <div class="fc05 vote" style="display:none;">
      <p><a href="/${group.homepage}/vote/cast/${vote.id}/" class="w-rd3 t-btn t-btn-4 vot-btn"<#if cast>data-action="vote"</#if>>投票</a></p>
      <p class="res">
        <span>${vote.voterCount}人已投票</span>
        <a href="/${group.homepage}/vote/${vote.id}/" class="fc02">查看结果</a>
        <#--a href="/${group.homepage}/vote/cast/${vote.id}/">更改投票</a-->
      </p>
      <p>该投票创建于${vote.createTime?number_to_datetime?string("yyyy年MM月dd日")}</p>
    </div>
  </@module>
</#macro>
<#macro groupVoteShowTemplate vote={}>
  <textarea name="js">
    window.data.vote = ${json(vote)};
  </textarea>
  <#noparse>
  <textarea name="jst" id="vote-detail-list">
    <table class="w-atb">
      {var s=0}
      {for y in xmap}
      {var z=result[y_key]||0}
      {var s=s+z}
      {/for}
      {for x in xmap}
      {var c=result[x_key]||0}
      {var t=vote.voterCount||1}
      <tr>
        <td class="c c0 bd02">${x}</td>
        <td class="c c1 bd02">
          <div class="w-rat bd02">
            {if vote.type == 3}
            <div class="bg08" style="width:${c*10}%">&nbsp;</div>
            {elseif vote.type == 2}
              {if s==0}
              <div class="bg08" style="width:0%">&nbsp;</div>
              {else}
              <div class="bg08" style="width:${c/s*100}%">&nbsp;</div>
              {/if}
            {else}
            <div class="bg08" style="width:${c/t*100}%">&nbsp;</div>
            {/if}
          </div>
        </td>
        <td class="c c2 bd02">${c}分</td>
      </tr>
      {/for}
    </table>
    <div class="fc05 vote">
      <p class="res">
        <span>${vote.voterCount}人已投票</span>
        <a href="/${group.homepage}/vote/cast/${vote.id}/" class="fc02">去投票</a>
      </p>
      <p>该投票创建于${vote.createTime|format:"yyyy-MM-dd"}</p>
    </div>
  </textarea>
  </#noparse>
</#macro>
<#macro groupVoteCastTemplate vote={} group=group>
  <textarea name="js">
    window.data.vote = ${json(survey)};
  </textarea>
  <#noparse>
  <textarea name="jst" id="vote-detail-list">
    {for x in xmap}
      {if vote.type!=3}
      {var t=vote.type==2?'checkbox':'radio'}
  	    <p class="ick bd02"><label><input class="j-flag cbx" type="${t}" name="vote-item" data-name="${x_key}" value="1"/>${x}</label></p>
      {else}
        <p class="ick bd02"><label class="xlab">${x}</label><select class="j-flag xset" data-name="${x_key}">{list 0..10 as y}<option value="${y}">${y}</option>{/list}</select></p>
      {/if}
    {/for}
    <div class="fc05 vote">
      <p><a href="#" class="w-rd3 t-btn t-btn-4 vot-btn" data-action="vote">投票</a></p>
      <p class="res">
        <span>${vote.voterCount}人已投票</span>
        <a href="/${group.homepage}/vote/${vote.id}/" class="fc02">查看结果</a>
      </p>
      <p>该投票创建于${vote.createTime|format:"yyyy-MM-dd"}</p>
    </div>
  </textarea>
  </#noparse>
</#macro>
</#escape>