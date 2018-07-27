<#escape x as x!""?html>
<#-- 关系转角色 -->
<#function parseRelation2Role host={} relation=0>
  <#if !(host.id)??>
    <#return 0>
  <#elseif relation==0>
    <#return 1>
  <#else>
    <#return 2>
  </#if>
</#function>
<#-- 解析问题答案 -->
<#function parseAnswer id answers=[]>
  <#list answers as x>
    <#if x.question.id==id>
      <#return x.answer>
    </#if>
  </#list>
</#function>
<#-- 模版集合 -->
<#macro groupTemplateCollection group={} host={}>
  <@template host=host iptable=iptable>
    <textarea name="js">
      window.config.page = function(p){return '/${(group.homepage)!"group"}'+(p||'');};
      <#if (group.id)??>
      window.data.group = ${json(group)};
      </#if>
    </textarea>
    <#nested>
  </@template>
</#macro>
<#-- 评论模版 -->
<#macro groupCommentTemplate group={} host={} role=0>
  <#switch role>
    <#case 0>
      <#-- 未登录 -->
	  <textarea name="txt" id="txt-comment-login">
	    <div class="tpx bd00 bg02">
	      <span>发布评论请先</span>
	      <a class="lgx fc03 js-xflag" href="/login/">登录</a>
	    </div>
	  </textarea>
	<#break>
	<#case 1>
      <#-- 非会员 -->
	  <textarea name="txt" id="txt-comment-login">
	    <div class="tpx bd00 bg02">
	      <span>发布评论请先</span>
	      <a class="lgx fc03 js-xflag" href="/${group.homepage}/join/">加入组织</a>
	    </div>
	  </textarea>
	<#break>
    <#case 2>
      <#-- 允许发表评论 -->
	  <textarea name="txt" id="txt-comment-publish">
	    <form class="rpx bd00 bg02 f-cb">
	      <input type="hidden" name="oid"/>
	      <input type="hidden" name="pid"/>
	      <input type="hidden" name="type"/>
	      <div class="fl img"><img class="w-rd5p pic-s" src="${host.thumbnail!p_portrait}"/></div>
	      <div class="ipx w-fom">
	        <div class="tax">
	          <textarea class="bd01 w-rd3 tax-s" name="content" maxlength="500" data-required="true" data-message="请输入评论内容" data-counter="true"><&#47;textarea>
	        </div>
	        <div class="acx f-cb">
	          <input type="button" name="btn-pub" class="fr w-rd3 t-btn t-btn-4" value="发布评论"/>
	          <label class="fr pic js-flag f-bg" title="选择图片">&nbsp;</label>
	          <img class="fr tmb js-flag" style="display:none;"/>
	        </div>
	        <div class="w-loading js-flag" style="display:none;">&nbsp;</div>
	      </div>
	    </form>
	    <form class="w-nvs">
	      <input type="hidden" name="oid"/>
	    </form>
	  </textarea>
	<#break>
  </#switch>
  <textarea name="txt" id="txt-comment-module">
    <div class="w-cmx">
      <div class="lbx js-zflag">
        <p class="w-loading">&nbsp;</p>
      </div>
      <div class="pgx js-zflag" style="visibility:hidden;"></div>
    </div>
  </textarea>
  <textarea name="ntp" id="ntp-comment-reply">
    <form class="w-rpx w-fom">
      <div class="gip">
        <textarea class="bd01 w-rd3" name="content" maxlength="500" data-required="true" data-message="请输入回复内容"><&#47;textarea>
      </div>
      <div class="gbt f-cb">
        <input type="button" class="fr w-rd3 t-btn t-btn-4" name="btn-ok" value="回复"/>
        <a class="cc fr js-flag" href="#">取消</a>
      </div>
    </form>
  </textarea>
  <textarea name="ntp" id="ntp-comment-item">
    <div class="w-lfac w-lfac-0 bd00">
      <div class="f-cb">
        <div class="fl img"><img class="w-rd5p js-zflag"/></div>
        <div class="dtl dtl-s">
          <div class="unm js-zflag"></div>
          <div class="utx fc05 f-cb">
            <div class="axt fr">
              <a class="fc03 x0 js-zflag" href="#">删除</a>
              <span class="t fc06 x0 x1">|</span>
              <a class="fc03 x1 js-zflag" href="#">回复</a>
            </div>
            <span class="fc05 js-zflag"></span>
          </div>
        </div>
      </div>
    </div>
  </textarea>
  <#noparse>
  <textarea name="jst" id="jst-comment-content">
    {if !xcmt.replied}
    <a class="fc02" href="#">${xcmt.poster.nickname}</a>
    {else}
    <a class="fc02" href="#">${xcmt.poster.nickname}</a>
    <span class="fc06 t">回复</span>
    <a class="fc02" href="#">${xcmt.replied.poster.nickname}</a>
    {/if}
    <span>：</span>
    <span>${xcmt.content|escape}</span>
    {if !!xcmt.image}
    <a href="/${group.homepage}/photo/${xcmt.image.id}/"><img class="ixg" src="${xcmt.image.thumbnailURL}"/></a>
    {/if}
  </textarea>
  </#noparse>
</#macro>
<#-- 标签/问题编辑项模版 -->
<#macro groupTagItemTemplate>
  <textarea name="ntp" id="ntp-tag-item">
    <div class="w-txg bg01 bd00 w-rd3">
      <div class="wip">
        <input type="text" class="txt bd01 w-rd3 js-flag" maxlength="20"/>
      </div>
      <div class="wsw">
        <span class="wdl bg03 fc06 w-rd5p js-flag" title="删除">×</span>
        <p class="wnm fc07 js-flag f-tf"></p>
      </div>
      <p class="wtp fc06 f-tf js-flag">&nbsp;</p>
    </div>
  </textarea>
</#macro>
<#-- 活动回复状态按钮 -->
<#macro groupMeetingStateTemplate>
  <#noparse>
  <textarea name="jst" id="jst-meeting-state">
    {if relation<0}
      <a class="w-rd3 t-btn t-btn-2" href="/login/?target=/${homepage}/meeting/${meeting.id}/">加入&回复</a>
    {elseif meeting.joinPermission>0&&relation<1}
      <a class="w-rd3 t-btn t-btn-2" href="/${homepage}/join/?target=/${homepage}/meeting/${meeting.id}/">加入&回复</a>
    {elseif meeting.signupStartTime!=0&&meeting.signupStartTime>now}
      <input class="w-rd3 t-btn t-btn-6 js-btn-disabled" type="button" value="报名未开始"/>
    {elseif meeting.signupEndTime!=0&&meeting.signupStartTime<now}
      <input class="w-rd3 t-btn t-btn-6 js-btn-disabled" type="button" value="报名已结束"/>
    {elseif meeting.joinLimit!=0&&meeting.joinLimit<=meeting.joinCount}
      <input class="w-rd3 t-btn t-btn-6 js-btn-disabled" type="button" value="名额已满"/>
    {elseif state==0}
      <a class="w-rd3 t-btn t-btn-2" href="/${homepage}/meeting/${meeting.id}/">回复活动</a>
    {else}
      <a class="w-rd3 t-btn t-btn-4" href="/${homepage}/meeting/${meeting.id}/">已接受邀请</a>
    {/if}
  </textarea>
  </#noparse>
</#macro>
<#-- 组织页面结构 -->
<#macro groupBody group={} options={}>
  <@header user=options.user/>
  <#local homepage=(group.homepage)!"group">
  <div class="t-gbx">
    <div class="t-wrp t-top">
      <div class="t-bdy">
        <div class="gsn fc00 f-tf"><span>${group.name}</span></div>
      </div>
    </div>
    <div class="t-wrp t-nav">
      <div class="t-bdy f-cb">
        <div class="mlnk fl w-nlst f-cb">
          <a class="itm nit fl fx0<#if options.index==1> js-selected</#if>" href="/${homepage}/" hidefocus="true">首页</a>
          <a class="itm nit fl fx0<#if options.index==2> js-selected</#if>" href="/${homepage}/members/" hidefocus="true">会员</a>
          <a class="itm nit fl fx0<#if options.index==3> js-selected</#if>" href="/${homepage}/album/" hidefocus="true">照片</a>
          <#if options.relationship&gt;0>
          <a class="itm nit fl fx0<#if options.index==4> js-selected</#if>" href="/${homepage}/invite/" hidefocus="true">邀请</a>
          </#if>
        </div>
        <#if options.relationship==0>
        <a class="join t-btn t-btn-3 fc00" href="/${group.homepage}/join/" id="group-top-join" data-target="/${group.homepage}/join/">加入我们</a>
        <#else>
        <div class="alnk fr w-nlst w-nlst-0 f-cb" id="group-menu-card">
          <#if options.relationship!=0>
          <div class="itm fr">
            <span class="fc16">个人中心</span>
            <div class="w-menu bg00">
              <a class="mit fc00 bg07" href="/${homepage}/member/${user.id}/">组织名片</a>
              <a class="mit fc00 bg07" href="/${homepage}/setting/message/">通知设置</a>
              <a class="mit fc00 bg07" href="#" data-gid="${group.id}" id="group-menu-exit">退出组织</a>
            </div>
          </div>
          </#if>
          <#if options.relationship==3>
          <div class="itm fr">
            <span class="fc16">组织工具</span>
            <div class="w-menu bg00">
              <a class="mit fc00 bg07" href="/${homepage}/meeting/create/">创建活动</a>
              <a class="mit fc00 bg07" href="/${homepage}/inform/">通知会员</a>
              <a class="mit fc00 bg07" href="/${homepage}/setting/">组织设置</a>
            </div>
          </div>
          </#if>
        </div>
        </#if>
      </div>
    </div>
    <div class="t-wrp t-man">
      <div class="t-bdy f-cb">
        <@groupLeftSide group=group options=options/>
        <#nested>
      </div>
    </div>
  </div>
  <@footer/>
</#macro>
<#-- 组织左列模块 -->
<#macro groupLeftSide group={} options={}>
  <div class="fl l-lsd">
    <@module id="1" class="s-srd">
      <div class="logo">
        <img class="js-flag" src="${group.thumbnail!p_logo}"/>
        <#if options.relationship==3>
        <form class="act">
          <label class="b fc00 js-flag">[上传]</label>
          <input type="hidden" name="gid" value="${group.id}"/>
        </form>
        <div class="w-loading js-flag" style="display:none;">&nbsp;</div>
        </#if>
      </div>
      <div class="t-cnt">
        <div class="blk-0">
          <p class="fc02">${group.province}&nbsp;&nbsp;${group.city}</p>
          <p>创立于${group.createTime?number_to_datetime?string("yyyy年MM月dd日")}</p>
          <#if options.relationship==0>
          <p><a class="w-rd3 t-btn t-btn-0" href="/${group.homepage}/join/">加入我们</a></p>
          </#if>
        </div>
        <#if options.relationship!=0>
          <p><a class="w-rd3 t-btn t-btn-0" href="/${group.homepage}/about/">关于我们</a></p>
        </#if>
        <div class="blk-2 bd00">
          <table class="w-stat">
            <tr><td class="c0">会员</td>
                <td class="c1"><a class="fc02" href="/${group.homepage}/members/">${(group.memberCount)!0}</a></td></tr>
            <tr><td class="c0">照片</td>
                <td class="c1"><a class="fc02" href="/${group.homepage}/album/">${(options.photoCount)!0}</a></td></tr>
            <tr><td class="c0">即将开始的活动</td>
                <td class="c1"><a class="fc02" href="/${group.homepage}/#0">${(options.upcomingCount)!0}</a></td></tr>
            <tr><td class="c0">已经结束的活动</td>
                <td class="c1"><a class="fc02" href="/${group.homepage}/#1">${(options.pastCount)!0}</a></td></tr>
          </table>
        </div>
      </div>
    </@module>
    <@module id="2" title="组织者" class="s-srd">
      <#local owner=(group.owner)!{}>
      <div class="w-lfac f-cb bd00">
        <div class="fl img"><img src="${(owner.thumbnail)!p_portrait}" class="w-rd5p"></div>
        <div class="dtl">
          <p class="unm f-tf"><a class="fc02" href="/${group.homepage}/member/${owner.id}/">${(owner.nickname)!(owner.username)}</a></p>
          <p class="utx fc05">${owner.bio!"个人简介"}</p>
        </div>
      </div>
    </@module>
    <@module id="3" title="组织标签" class="s-srd">
      <#if group.tags??&&group.tags?size&gt;0>
        <#list group.tags as xx>
        <a class="w-tag w-rd3 fl" href="#">${xx.name}</a>
        </#list>
      <#else>
        <p class="w-message">该组织还没有加标签</p>
      </#if>
    </@module>
    <#local groups=options.groups>
    <#if groups??&&groups?size&gt;0>
    <@module id="4" title="这个组织的会员还在" class="s-srd">
      <#list groups as xx>
      <div class="w-lfac f-cb bd00">
        <div class="fl img"><a href="/${xx.homepage}/"><img src="${(xx.thumbnail)!p_logo}"></a></div>
        <div class="dtl">
          <p class="unm f-tf"><a class="fc02" href="/${xx.homepage}/">${xx.name}</a></p>
          <p class="utx fc05">${(xx.memberCount)!0}名会员</p>
        </div>
      </div>
      </#list>
    </@module>
    </#if>
  </div>
</#macro>
</#escape>