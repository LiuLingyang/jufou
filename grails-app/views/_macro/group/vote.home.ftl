<#macro groupVoteHome group={} relation=0>
  <@module id="60" title="投票" class="s-srd t-mdi t-vote">
    <#if relation&gt;1>
    <div class="xtl"><a href="/${group.homepage}/vote/create/" class="fc02">新建投票</a></div>
    </#if>
    <@taber items=["进行中","已经结束"] index=-1 id="group-vote"/>
    <div class="pgx" id="group-vote-pager"></div>
  </@module>
</#macro>
<#macro groupVoteHomeTemplate group={} relation=0>
  <#noparse>
  <textarea name="jst" id="group-vote-list">
    <table class="w-atb">
      <tr>
        <th class="c c0 bd01 bg01 fc07">名称</th>
        <th class="c c1 bd01 bg01 fc07">开始日期</th>
        <th class="c c2 bd01 bg01 fc07">回复</th>
        <th class="c c3 bd01 bg01 fc07">&nbsp;</th>
      </tr>
    {list beg..end as y}
      {var x=xlist[y]}
	    <tr>
	      <td class="c c0 bd01"><a href="/${group.homepage}/vote/${x.id}/" class="fc02">${x.title}</a></td>
	      <td class="c c1 bd01">${x.startTime|format:"yyyy-MM-dd HH:mm"}</td>
	      <td class="c c2 bd01">${x.voterCount||0}人</td>
	      <td class="c c3 bd01">
	        {if state==0}
	          <a href="/${group.homepage}/vote/cast/${x.id}/" class="fc02">我要投票</a>
	        {else}
	          &nbsp;
	        {/if}
	      </td>
	    </tr>
    {/list}
  </textarea>
  <textarea name="txt" id="txt-home-novote">
  	<table class="w-atb">
      <tr>
        <th class="c c0 bd01 bg01 fc07">名称</th>
        <th class="c c1 bd01 bg01 fc07">开始日期</th>
        <th class="c c2 bd01 bg01 fc07">回复</th>
        <th class="c c3 bd01 bg01 fc07">&nbsp;</th>
      </tr>
      <tr><td class="ept bd01" colspan="4">
        <div>没有投票</div>
      </td></tr>
    </table>
  </textarea>
  </#noparse>
</#macro>