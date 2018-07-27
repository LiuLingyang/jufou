<#escape x as x!""?html>
<#-- 模块ID 5-9 -->
<#-- 组织首页顶部模块 -->
<#macro groupHomeTop group={}>
  <@module id="6" class="s-srd">
    <#--p class="n fc04">欢迎来到${group.name}</p-->
    <div class="d fc07">
      <#noescape>
      <p class="fc16">${(group.description!"")?replace("\n","<br/>")}</p>
      </#noescape>
    </div>
  </@module>
</#macro>
<#-- 组织首页右列模块 -->
<#macro groupHomeRight group={} photos=[] events=[]>
  <div class="fr l-rsd">
    <@module id="5" title="组织动态" class="s-srd">
      <#if photos?size&gt;0>
      <div class="blk-1">
      	<#list photos as x>
        <div class="pht"><a href="/${group.homepage}/photo/${x.id}/"><img src="${x.thumbnailURL}"/></a></div>
        </#list>
        <div class="apht"><a href="/${group.homepage}/album/" class="fc02">更多照片</a></div>
      </div>
      </#if>
      <div class="blk-2 j-flag">
        <div class="w-loading">&nbsp;</div>
      </div>
      <p class="blk-2-m  j-flag" style="visibility:hidden;">加载更多</p>
    </@module>
  </div>
</#macro>
<#-- 组织首页主模块 -->
<#macro groupHomeMain relation=0>
  <div class="l-rmc">
    <#if relationship==1||relationship==2>
      <div class="w-req f-bg"><a class="fc03" href="/${group.homepage}/meeting/create">创建活动建议&gt;&gt;</a></div>
    </#if>
    <#if relationship==3||relationship==4>
      <div class="w-req f-bg"><a class="fc03" href="/${group.homepage}/meeting/create">发布活动&gt;&gt;</a></div>
    </#if>
    <@module id="8" class="t-mdc">
      <#local items=["即将开始","已经结束"]>
      <#if relation==1||relation==2>
        <#local items=["即将开始","已经结束","活动建议"]>
      </#if>
      <#if relation==3||relation==4>
        <#local items=["即将开始","已经结束","活动建议","草稿箱"]>
      </#if>
      <@taber items=items index=-1 id="home-meeting">
        <#nested>
      </@taber>
      <div class="more" id="home-meeting-more" style="visibility:hidden;">查看更多活动</div>
    </@module>
  </div>
</#macro>
<#-- 加入组织提示 -->
<#macro groupHomeJoin group={} relation=0>
  <#if relation==0&&(group.viewPermission!0)==1>
  <@module id="7">
    <p class="ln ln0">该组织信息只对会员开放</p>
    <p class="ln ln1 fc06 fl">你可以申请</p>
    <p class="ln ln2">
      <a class="w-rd3 t-btn js-btn t-btn-1" href="/${group.homepage}/join/">加入组织</a>
    </p>
  </@module>
  </#if>
</#macro>
<#-- 首页相关前端模板 -->
<#macro groupHomeTemplate group={} meeting={} relation=0>
  <textarea name="js">
    window.data.relation = ${relation};
  </textarea>
  <textarea name="txt" id="txt-home-nomeet">
    <#if relation==3||relation==4>
    <div class="epty">
      <p class="tip fc06">您的组织还没有发起过一次活动</p>
      <p class="act"><a class="w-rd3 t-btn t-btn-1" href="/${group.homepage}/meeting/create/">开始你的第一次活动</a></p>
    </div>
    <#else>
    <div class="epty">
      <p class="tip fc06 tip-s">没有活动</p>
    </div>
    </#if>
  </textarea>
  <textarea name="txt" id="txt-home-nomeet2">
    <div class="epty">
      <p class="tip fc06 tip-s">没有活动</p>
    </div>
  </textarea>
  <textarea name="ntp" id="ntp-meeting-item">
      <div class="w-meet bd00">
        <p class="xmt f-tf"><span class="fc17 js-flag"></span><a class="fc02 js-flag"></a></p>
        <div class="sum f-cb">
          <div class="tim fr bd00">
            <div class="blk">
              <div class="js-flag"></div>
              <div class="js-flag"></div>
            </div>
          </div>
          <div class="dtl bd00">
            <p class="js-flag f-tf"></p>
            <div class="usr js-flag"></div>
            <div class="fc05">
              <div class="smr">
                <span class="js-flag"></span>
                <a class="fc02 js-flag" href="#"></a>
              </div>
            </div>
            <p class="xog">组织者：<a class="fc02 js-flag" href="#"></a></p>
          </div>
        </div>
        <div class="js-flag"></div>
        <div class="tmx js-flag f-bg fc00"></div>
      </div>
  </textarea>
  <#noparse>
  <textarea name="jst" id="jst-meeting-list">
    {list beg..end as y}
      {var x=xlist[y]}
      <div class="w-meeting bd00">
        <div class="xmt f-tf"><a class="fc02" href="/${x.group.homepage}/meeting/${x.id}/">${x.title}</a></div>
        <div class="wrd">
          <span>${x.startTime|format:'yyyy-MM-dd  星期w'}</span>
          <span class="t">${x.startTime|format:'ct HH:mm'}</span>
          <span class="t"><span class="x">${x.joinCount|default:0}</span>人参加活动</span>
        </div>
        {var atd=x.attendees||[]}
        {trim}
        {list atd as z}
        <a class="f-nl" href="/${x.group.homepage}/member/${z.id}/">
          <img class="w-rd5p" src="${z.thumbnail|default:config.url.portrait}"/>
        </a>
        {/list}
        {/trim}
        <div class="smr fc05">${x.digest}</div>
        {if relation==3||relation==4}
        {if x.state==-2}
        <div class="">建议状态：待审核</div>
        {elseif x.state==-3}
        <div class="">建议状态：已拒绝</div>
        {/if}
        {else}
        {if x.state==-2}
        <div class="">建议状态：审核中..</div>
        {elseif x.state==-3}
        <div class="">建议状态：被拒绝</div>
        {/if}
        {/if}
      </div>
    {/list}
  </textarea>
  <textarea name="jst" id="jst-meeting-summary">
    <div class="xzf">
      <p>${meeting.startDateTime|format:'yyyy-MM-dd  星期w'}</p>
      <p class="x">${meeting.startDateTime|format:'ct HH:mm'}</p>
    </div>
    <p class="rpy">${state}</p>
  </textarea>
  <textarea name="jst" id="jst-meeting-count">
    <table class="sta">
      <tr><td class="c0">${meeting.joinCount|default:0}</td><td class="c1 fc06">人参加活动</td></tr>
      <tr><td class="c0">${meeting.photoCount|default:0}</td><td class="c1 fc06">张照片</td></tr>
      <tr><td class="c0">${meeting.commentCount|default:0}</td><td class="c1 fc06">条评论</td></tr>
    </table>
  </textarea>
  <textarea name="jst" id="jst-meeting-attendee">
    {trim}
    {list xlist as x}
    <a class="f-nl" href="/${group.homepage}/member/${x.id}/">
      <img class="w-rd5p" src="${x.thumbnail|default:config.url.portrait}"/>
    </a>
    {/list}
    {/trim}
  </textarea>
  <textarea name="jst" id="jst-meeting-repeat">
    <div class="rpt bg01">
      <div class="rtl f-cb">
        <p class="txl">${item.repeatType|formatHolderTime:item.repeatFreq}</p>
        <a class="mre fc03" href="#">更多</a>
      </div>
      <table class="mls">
        {list data as item1}
        <tr><td class="c0">${activity.title}</td>
            <td class="c1">35人参加</td>
            <td class="c2">${item1|formatDate}</td></tr>
        {/list}
      </table>
    </div>
  </textarea>
  <textarea name="jst" id="jst-meeting-draft">
    {list beg..end as y}
      {var x=xlist[y]}
      <div class="w-mdft f-cb bd00" id="${x.id|seed}">
        <a href="#" class="act fr fc02 js-xflag" data-action="delete" data-id="${x.id}">删除</a>
        <a href="${config.page()}/meeting/update/${x.id}/" class="act fr fc02">编辑</a>
        <div class="gtl f-tf"><a href="/${x.group.homepage}/meeting/${x.id}/" class="fc02">${x.title}</a></div>
      </div>
    {/list}
  </textarea>
  <textarea name="jst" id="event-list">
    {list beg..end as y}
      {var x=xlist[y]}
      <div class="w-evt bd00">
        ${x.body}
      </div>
    {/list}
  </textarea>
  </#noparse>
</#macro>
</#escape>