<#escape x as x!""?html>
<#-- 毫秒转日期 -->
<#function parseDateTime timestamp=0>
  <#if timestamp!=0>
    <#return timestamp?number_to_datetime>
  <#else>
    <#return .now>
  </#if>
</#function>
<#-- config root -->
<#setting number_format="0.##########">
<#assign css_root="/src/css/"
         pro_root="/src/javascript/"
         lib_root="/src/javascript/com/lib/"
         cfg_root="?pro=${pro_root}&com=/src/javascript/com/pro/"
         ftl_root=(env=="production"||env=="test")?string("/_prd/","/_dev/")>
<#-- config data -->
<#include ftl_root+"config.ftl">
<#assign d_role_name=["","会员","管理员","创建者","共同创建者"]
         d_group_category=categories!["聚会","讲座","展览","公益","运动","旅行","休闲娱乐","美食","文学","单身交友","社区","摄影","商务职场","时尚美容","其他"]>
<#-- theme config -->
<#macro theme id="default">
  <link href="/res/theme/${id}/style.css" rel="stylesheet" type="text/css"/>
</#macro>
<#-- page head -->
<#macro head>
  <meta charset="utf-8"/>
  <link rel="shortcut icon" href="/res/icon.jpg" />
</#macro>
<#-- page header -->
<#macro header user={} index=-1>
  <noscript>请使用支持脚本的浏览器！</noscript>
  <div class="g-wrp g-hxd">
    <div class="g-bdy f-cb">
      <div class="logo f-bg">&nbsp;</div>
      <div class="menu fl f-cb f-mh">
        <a class="itm fl<#if index==0> js-selected</#if>" href="/">首页</a>
        <a class="itm fl<#if index==1> js-selected</#if>" href="/search/">找组织</a>
        <a class="itm fl<#if index==2> js-selected</#if>" href="/create/">建组织</a>
      </div>
      <#if (user.id)??>
      <ul class="link fr f-cb">
        <li class="itm fr"><a href="/contact/">通讯录</a></li>
        <li class="itm fr"><a href="/setting/">设置</a></li>
        <li class="itm fr"><a href="/message/">消息<span style="display:none;" id="www-jufou-com-message" class="mnew">(新)</span></a></li>
        <li class="itm fr"><a href="/group/">我的组织</a></li>
        <li class="itm fr">
          <img class="prt w-rd5p" id="www-jufou-com-portrait" src="${(user.portrait)!p_portrait}"/>
          <a class="unm" href="/personal/">${user.nickname!user.username}</a>
          <script>function logout(){var i=new Image();i.onerror=function(){location.reload();};i.src='/rest/user/logout';return !1;}</script>
          <a class="ext" href="#" onclick="return !!logout();">[退出]</a>
        </li>
      </ul>
      <#else>
      <ul class="link fr f-cb">
        <li class="itm fr"><a href="/login/">登录</a></li>
        <li class="itm fr"><a href="/regist/">注册</a></li>
      </ul>
      </#if>
    </div>
  </div>
</#macro>
<#-- page main -->
<#macro page user={} index=-1 class="">
  <@header user=user index=index/>
  <div class="g-wrp g-man">
    <div class="g-bdy ${class}" id="page-box">
      <#nested>
    </div>
  </div>
  <@footer/>
</#macro>
<#-- page module -->
<#macro module title="" menu="" id="" class="">
  <div class="t-mdl ${class} t-mdl-${id}" id="module-${id}">
    <#if title!="">
    <div class="t-ttl">
      <span class="mtx fc09">${title}</span>
      <#noescape>${menu}</#noescape>
    </div>
    </#if>
    <div class="t-cnt f-cb"><#nested></div>
  </div>
</#macro>
<#-- page footer -->
<#macro footer>
  <div class="g-wrp g-fot f-mh">
    <div class="g-bdy fwrp f-cb">
      <div class="fl blk">
        <p><a href="/about/">关于聚否</a></p>
        <p><a href="/job/">招贤纳士</a></p>
        <!--p>开放平台</p-->
        <p><a href="/address/">联系我们</a></p>
      </div>
      <div class="fl blk">
        <p><a href="/help/">使用帮助</a></p>
        <p><a href="/license/">服务条款</a></p>
        <p><a href="/feedback/">意见反馈</a></p>
        <!--p>关注我们</p-->
      </div>
      <div class="fl cpy">
        <p>&copy;${.now?string("yyyy")} 杭州聚否网络科技有限公司</p>
        <p>浙ICP备13004896号</p>
      </div>
    </div>
  </div>
</#macro>
<#-- page helper -->
<#assign links=[{"href":"/about/","text":"关于聚否"},{"href":"/job/","text":"招贤纳士"},{"href":"/address/","text":"联系我们"}]>
<#macro left_tab index=0>
  <div class="sid">
  <#list links as x>
    <div class="lat <#if index==x_index>js-select</#if>"><a class="fc14" href="${x.href}">${x.text}</a></div>        
  </#list>
  </div>
</#macro>
<#assign link=[{"href":"/help/","text":"使用帮助"},{"href":"/license/","text":"服务条款"},{"href":"/feedback/","text":"意见反馈"}]>
<#macro left_tabs index=0>
  <div class="sid">
  <#list link as x>
    <div class="lat <#if index==x_index>js-select</#if>"><a class="fc14" href="${x.href}">${x.text}</a></div>
  </#list>
  </div>
</#macro>
<#-- page tab -->
<#macro taber items=[] index=0 id="tab" flag="" append="">
  <div class="w-wtb">
    <div class="tbox f-cb ${flag}" id="${id}-btn">
      <#list items as x>
      <div class="tit fl<#if x_index==index> js-selected</#if>">${x}</div>
      </#list>
      ${append}
    </div>
    <div class="abox ${flag}" id="${id}-box">
      <#nested>
    </div>
  </div>
</#macro>
<#-- page template -->
<#macro template host={} iptable={"province":"浙江省","city":"杭州市","district":"上城区"}>
  <div id="template-box" style="display:none;">
    <textarea name="js">
      Date.serverTime = new Date(${.now?long});
      window.config = {
          url:{
            logo:'${p_logo}',
            portrait:'${p_portrait}',
            album_cover:'${p_album_cover}'
          }
      };
      if (!window.data) window.data = {};
      <#if (host.id)??>
      window.data.host = ${json(host)};
      window.data.host.relationship = ${relationship!0};
      </#if>
      window.data.iptable = ${json(iptable)};
    </textarea>
    <#nested>
  </div>
</#macro>
<#-- message box -->
<#macro messagebox>
  <div id="message-box" style="display:none;"></div>
</#macro>
</#escape>