<#escape x as x!""?html>
<#macro groupSub group={} relation=0>
  <@module id="u0" title="校分会" class="s-srd t-mdi t-sub">
    <div class="lbox js-flag" id="group-sub-box">
      <p class="w-loading">&nbsp;</p>
    </div>
    <div class="pgx js-flag" id="group-sub-pager"></div>
  </@module>
</#macro>
<#macro groupSubTemplate group={} relation=0>
  <#noparse>
  <textarea name="jst" id="group-sub-list">
    {list beg..end as y}
      {var x=xlist[y]}
	   <div class="fl w-grp bg00 bd07">
      <div class="img">
        <a class="fc02" href="/${x.homepage}/"><img src="${x.lastThumbnail|default:x.thumbnail|default:config.url.logo}"/></a>
      </div>
      <p class="ln f-tf" title="${x.name}"><a class="fc03" href="/${x.homepage}/">${x.name}</a></p>
      <p class="ln fc05">${x.memberCount|default:0}名会员</p>
      <p class="ln0 fc06">{if !!x.nextTime}下次活动时间：${x.nextTime|format:"yyyy-MM-dd HH:mm"}{/if}</p>
    </div>
    {/list}
  </textarea>
  <textarea name="txt" id="txt-home-nosub">
  	<div class="w-message">没有数据！</div>
  </textarea>
  </#noparse>
</#macro>
</#escape>