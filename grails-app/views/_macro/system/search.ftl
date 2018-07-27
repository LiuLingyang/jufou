<#escape x as x!""?html>
<#-- 组织位置设置 -->
<#macro sysSearchPagePosition>
  <@module title="组织位置" id="y0" class="s-srd">
    <form class="w-fom">
      <div class="blk">
        <div class="f-cb">
          <a class="fr fc03 js-flag" href="#">修改</a>
          <p class="fc07 js-flag">全国</p>
        </div>
      </div>
      <div class="blk sxl js-flag" style="display:none;">
        <p><select class="bd01 w-rd3 wd0" name="province"><option value="">- 全国 -</option></select></p>
        <p><select class="bd01 w-rd3 wd0" name="city"><option value="">- 城市 -</option></select></p>
        <p><select class="bd01 w-rd3 wd0" name="area"><option value="">- 区域 -</option></select></p>
        <div><input type="button" class="w-rd3 t-btn t-btn-1" name="btn-ok" value="确定"/></div>
      </div>
    </form>
  </@module>
</#macro>
<#-- 组织分类设置 -->
<#macro sysSearchPageCategory>
  <@module id="y1" class="s-srd">
    <form class="w-fom">
      <p><input type="text" name="keyword" class="txt2 bd01 w-rd3l wd0" placeholder="关键字"/><#--
      --><input type="button" class="sch bd01 w-rd3r f-bg" name="btn-ok" value=" "/></p>
      <div class="cat w-tit f-nl">
        <div class="kwd tip f-tf bg01" style="display:none;">
          <span class="js-flxg fc07"></span>
          <span class="d js-flxg" title="清除关键字">×</span>
        </div>
        <a class="itm fc07 js-flag" hidefocus="true" href="#">所有<span class="j-fwg fr">0</span></a>
        <#list d_group_category as x>
        <a class="itm fc07 js-flag" hidefocus="true" href="#" data-value="${x}">${x}<span class="j-fwg fr">0</span></a>
        </#list>
      </div>
    </form>
  </@module>
</#macro>
<#-- 日历设置 -->
<#macro sysSearchPageCalendar>
  <@module id="y2" class="s-srd">
    <div class="f-cb">
      <div class="fr cld js-flag f-bg">&nbsp;</div>
      <div class="fl grp xxx w-rd3 js-xflag">聚否组织</div>
      <div class="rql">
        <#list 1..7 as x>
        <div class="fl itm xxx w-rd3 js-xflag"></div>
        </#list>
      </div>
    </div>
  </@module>
</#macro>
<#-- 搜索页 -->
<#macro sysSearchPage user={}>
  <@page user=user index=1 class="g-search t-gbx">
    <div class="t-man f-cb">
      <@messagebox/>
      <div class="fl l-lsd">
        <@sysSearchPagePosition/>
        <@sysSearchPageCategory/>
      </div>
      <div class="l-lmc" id="search-mdl-box">
        <@sysSearchPageCalendar/>
      </div>
    </div>
  </@page>
</#macro>
<#-- 搜索页模版 -->
<#macro sysSearchPageTemplate>
  <textarea name="txt" id="txt-empty-meeting">
    <@module id="y4" class="t-mdc">
      <div class="ept f-bg">&nbsp;</div>
      <p class="tip fc06 js-flag"></p>
    </@module>
  </textarea>
  <textarea name="txt" id="txt-mdl-meeting">
    <@module id="y3" class="t-mdc">
      <@taber items=["即将开始","最新发布"] index=-1 flag="js-flag"/>
      <div class="mre js-flag" style="visibility:hidden;">查看更多活动</div>
    </@module>
  </textarea>
  <textarea name="txt" id="txt-empty-group">
    <@module id="y4" class="t-mdc">
      <div class="ept f-bg">&nbsp;</div>
      <p class="tip fc06 js-flag"></p>
      <div class="act"><a class="w-rd3 t-btn t-btn-c" href="/create/">马上去创建</a></div>
    </@module>
  </textarea>
  <textarea name="txt" id="txt-mdl-group">
    <@module id="y5" class="t-mdc w-fom">
      <div class="srt">
        <label class="sort">排序</label>
        <select class="bd01 w-rd3 js-flag">
          <option value="memberCount">成员最多</option>
          <option value="createTime">最新创立</option>
        </select>
      </div>
      <div class="lbx f-cb js-flag"></div>
      <div class="mre js-flag">加载更多</div>
    </@module>
  </textarea>
  <#noparse>
  <textarea name="jst" id="jst-calendar-day">
    <p>${date|format:'cM'}月</p>
    <p class="dy">${date.getDate()}</p>
    <p class="wk">周${date|format:'w'}</p>
  </textarea>
  <textarea name="jst" id="jst-group-list">
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
  <textarea name="jst" id="jst-meeting-list">
    {list beg..end as y}
    {var x=xlist[y]}
    {var g=x.group||NEJ.O}
    <div class="w-lfac w-lfac-a f-cb bd00">
      <div class="fl img"><a href="/${g.homepage}/"><img src="${x.cover|default:g.thumbnail|default:config.url.logo}"/></a></div>
      <div class="fr uxr bd00">
        <p class="fc06">${x.joinCount|default:0}名${g.memberCall|default:'会员'}准备参加</p>
        <div class="uls">
            {var alist=x.attendees||[]}
            {list alist as u}
            <a class="f-nl" href="/${g.homepage}/member/${u.id}/">
              <img class="w-rd5p" src="${u.thumbnail|default:config.url.portrait}"/>
            </a>
            {/list}
        </div>
      </div>
      <div class="dtl bd00">
        <p class="f-tf"><a class="fc05" href="/${g.homepage}/" title="${g.name}">${g.name}</a></p>
        <p class="ht"><a class="wtx fc10" href="/${g.homepage}/meeting/${x.id}/" title="${x.title}">${x.title}</a></p>
        <p class="fc05 tip">${x.startTime|format:"yyyy-MM-dd HH:mm"}</p>
        <p class="fc05 f-tf">${x.province}${x.city}${x.area}${x.address}</p>
      </div>
    </div>
    {/list}
  </textarea>
  </#noparse>
</#macro>
</#escape>