<#macro groupShareHome group={} relation=0>
  <@module id="w0" title="组织分享" class="s-srd t-mdi t-share">
    <#if relation&gt;0>
    <div class="xtl"><a href="/${group.homepage}/share/create/" class="fc02">新建分享</a></div>
    </#if>
    <div class="lbox" id="group-share-box">
      <p class="w-loading">&nbsp;</p>
    </div>
    <div class="pgx" id="group-share-pager"></div>
  </@module>
</#macro>
<#macro groupShareHomeTemplate group={} relation=0>
  <#noparse>
  <textarea name="jst" id="group-share-list">
    {list beg..end as y}
      {var x=xlist[y]}
	   <div class="w-share f-cb bd00">
	     {if x.image == null}
	     <div class="fl img bg05"></div>
	     {else}
	     <div class="fl img bg05" style="background-image:url(${x.image.thumbnailURL});background-position:center center;background-size:cover;"></div>
	   	 {/if}
	   	 <div class="dtl">
	   	   <p class="sub"><a href="/${group.homepage}/share/${x.id}" class="fc02">${x.title}</a></p>
	   	   <p class="fc05">${x.pubishTime|format:'yyyy年MM月dd日'}</p>
	   	   <div class="act"><a href="#" class="fc02" data-action="del" data-id="${x.id}">删除</a><a href="/${group.homepage}/share/update/${x.id}/" class="fc02">编辑</a></div>
	   	 </div>
	   </div>
    {/list}
  </textarea>
  <textarea name="txt" id="txt-home-noshare">
  	<div class="w-message">没有数据！</div>
  </textarea>
  </#noparse>
</#macro>