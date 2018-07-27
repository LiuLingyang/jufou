<#escape x as x!""?html>
<#-- 推荐组织列表模块 -->
<#macro sysHomePageRecGroup recGroups=[] recStartTimes={}>
  <@module title="总有共同之处，让我们相聚在一起<br/>表达兴趣，找到组织" id="z2" class="s-srd"
    menu="<a class=\"mnu fc11\" href=\"/search/\">更多组织</a>">
    <#if recGroups?size&gt;0>
      <#list recGroups as x>
        <div class="w-gxp fl">
          <a href="/${x.homepage}/"><img src="${x.lastThumbnail!x.thumbnail!p_logo}"/></a>
          <div class="inf">
            <p class="ln ln0"><a class="fc00" href="/${x.homepage}/">${x.name}</a></p>
            <p class="ln ln1">${x.province} ${x.city}</p>
            <#--
            <p class="ln ln2">
              <#local l_id=x.id?string>最近活动：
              <#if (recStartTimes[l_id]!0)!=0>${recStartTimes[l_id]?number_to_date?string("M月d日")}<#else>待定</#if>
            </p>
            -->
          </div>
        </div>
      </#list>
    <#else>
      <p class="w-message">没有推荐组织</p>
    </#if>
  </@module>
</#macro>
<#-- 搜索输入 -->
<#macro sysHomePageSearch>
  <@module title="搜索附近的组织" id="z0" class="bg02 s-srd">
    <form class="w-fom">
      <div class="blk">
        <p class="txx fc05">地区</p>
        <p><select name="province" class="bd01 w-rd3 mr5 wd2"><option value="">- 全国 -</option></select>
           <select name="city" class="bd01 w-rd3 mr5 wd2"><option value="">- 城市 -</option></select>
           <select name="area" class="bd01 w-rd3 mr5 wd2"><option value="">- 区域 -</option></select></p>
      </div>
      <div class="blk">
        <p class="txx fc05">名称或者兴趣</p>
        <p><input type="text" name="key" class="txt2 bd01 w-rd3 wd1" placeholder="如休闲、运动"/><#--
        --><input type="button" class="home-btn w-rd3 t-btn t-btn-1" name="btn-ok" value="搜索"/></p>
      </div>
    </form>
  </@module>
</#macro>
<#-- 最新动态 -->
<#macro sysHomePageEvent events=[]>
  <@module title="最新信息 " id="z1" class="s-srd">
    <div class="j-flag"></div>
  </@module>
</#macro>
<#-- 系统首页 -->
<#macro sysHomePage user={} events=[] groups=[] times={}>
  <@page user=user index=0 class="g-home t-gbx">
      <div class="bgc">
        <div class="bnr">
          <a class="dow" href="/download/"></a>
          <span class="tgr fc00">${groupCount}</span>
          <span class="tme fc00">${meetingCount}</span>
        </div>
      </div>
      <div class="t-man f-cb">
        <@messagebox/>
        <div class="fr l-hsd">
          <@sysHomePageSearch/>
          <@sysHomePageEvent events=events/>
        </div>
        <div class="l-hmc">
          <@sysHomePageRecGroup recGroups=groups recStartTimes=times/>
        </div>
      </div>
  </@page>
</#macro>
<#-- 系统首页模板 -->
<#macro sysHomePageTemplate>
  <#noparse>
  <textarea name="jst" id="event-list">
    {list xlist as x}
      {if !!x}
      <div class="w-evt bd00 {if defined('clazz')} ${clazz}{/if}" >${x.body}</div>
      {/if}
    {/list}
  </textarea>
  </#noparse>
</#macro>

</#escape>
