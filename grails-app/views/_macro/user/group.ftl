<#escape x as x!""?html>
<#-- 我的组织页面基本信息模块 -->
<#macro userPageGroupProfile user={}>
  <@module id="g0" class="s-srd">
    <div class="img"><img class="w-rd5p" src="${user.portrait!p_portraits}"/></div>
    <p class="nmn"><a href="/personal/" class="fc11">${user.nickname!user.username}</a></p>
    <p class="ln adr fc07">来自：${user.province}${user.city}${user.area}</p>
    <p class="ln reg fc07">注册时间：${parseDateTime(user.registTime!0)?string("yyyy年MM月dd日")}</p>
    <div class="bio bd00">
      <p class="fc05 f-tf">${user.bio}</p>
      <p class="edt"><a class="fc11" href="/setting/">添加个人介绍</a></p>
    </div>
  </@module>
</#macro>
<#-- 我的组织页面基本信息模块 -->
<#macro userPageGroupList>
  <@module id="g1" class="s-srd t-mdl-mygroup">
    <div class="blk">
      <p class="xyt bd01">我创建的组织</p>
      <div class="lbx f-cb js-flag"></div>
    </div>
    <div class="blk">
      <p class="xyt bd01">我加入的组织</p>
      <div class="lbx f-cb js-flag"></div>
    </div>
    <div class="blk">
      <p class="xyt bd01">未通过审核的组织</p>
      <div class="lbx f-cb js-flag"></div>
    </div>
  </@module>
</#macro>
<#-- 我的组织页面 -->
<#macro userPageGroup user={} host={}>
  <@page user=user index=-1 class="g-usrgrp g-xxx t-gbx">
    <div class="t-man f-cb">
      <@messagebox/>
      <div class="fl l-lsd">
        <@userPageGroupProfile user=host/>
      </div>
      <div class="l-lmc">
        <@userPageGroupList/>
      </div>
    </div>
  </@page>
</#macro>
<#-- 我的组织页面模版 -->
<#macro userPageGroupTemplate>
  <#noparse>
  <textarea name="ntp" id="ntp-group-item">
    <div class="fl w-git bd00">
      <div class="w-lfac f-cb bd00">
        <div class="fl img">
          <a class="js-flag" href="#"><img class="js-flag"/></a>       
        </div>
        <div class="dtl fc05 fl">
          <p class="nm"><a class="fc11 js-flag" href="#"></a></p>
          <p class="ln js-flag ine"></p>
          <p class="ine">|</p>
          <p class="ln js-flag ine"></p>
          <p class="ln js-flag"></p>
        </div>
        <div class="gat js-flag f-bg fl"></div>
      </div>
    </div>
  </textarea>
  <textarea name="jst" id="jst-group-list">
    {list beg..end as y}
      {var x=xlist[y]}
      <div class="fl w-git bd00">
          <div class="w-lfac f-cb bd00">
            <div class="fl img">
              <img src="${x.thumbnail|default:config.url.logo}"/>
            </div>
            <div class="dtl fc05 fl">
              <p class="nm">
                <a class="fc11" href="/${x.homepage}/apply/">${x.name}</a>
              </p>
              <p class="ln">{if x.state==-2}审核中...{elseif x.state==-3}申请被拒绝{/if}</p>
              {if x.state==-3}
              <p class="ln">拒绝理由：${x.apply.refuse}</p>
              {/if}
            </div>
          </div>
      </div>
    {/list}
  </textarea>
  </#noparse>
</#macro>
</#escape>