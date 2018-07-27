<#macro groupNewsHome group={} relation=0>
  <@module id="x0" title="新闻动态" class="s-srd t-mdi t-news">
    <#if relation&gt;1>
    <div class="xtl"><a href="/${group.homepage}/news/create/" class="fc02">新建文章</a></div>
    </#if>
    <div class="lbox" id="group-news-box">
      <p class="w-loading">&nbsp;</p>
    </div>
    <div class="pgx" id="group-news-pager"></div>
  </@module>
</#macro>
<#macro groupNewsHomeTemplate group={} relation=0>
  <#noparse>
  <textarea name="jst" id="group-news-list">
    {list beg..end as y}
      {var x=xlist[y]}
	   <div class="w-news f-cb bd00">
	     <div class="fl img bg05" style="background-image:url(${x.cover});background-position:center center;background-size:cover;"></div>
	   	 <div class="dtl">
	   	   <p class="sub"><a href="/${group.homepage}/news/${x.id}" class="fc02">${x.subject}</a></p>
	   	   <p class="fc05" id="group-news-author">作者：${x.author||'未知'}</p>
	   	   <p class="fc05">${x.createTime|format:'yyyy年MM月dd日'}</p>
	   	   {if relation>1}
	   	   <div class="act"><a href="#" class="fc02" data-action="del" data-id="${x.id}">删除</a><a href="/${group.homepage}/news/update/${x.id}/" class="fc02">编辑</a></div>
	   	   {/if}
	   	 </div>
	   </div>
    {/list}
  </textarea>
  <textarea name="txt" id="txt-home-nonews">
  	<div class="w-message">没有数据！</div>
  </textarea>
  </#noparse>
</#macro>