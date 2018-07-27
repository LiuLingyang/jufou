<#escape x as x!""?html>
<#-- 消息分类模块 -->
<#macro userPageMessageType>
  <@module id="m0" class="s-srd">
    <div class="w-tit f-nl">
      <#local msType=[{"t":"最新活动","h":"meeting","i":1,"ii":1},
                      {"t":"我的评论","h":"comment","i":2,"ii":2},
                      {"t":"系统消息","h":"system","i":4,"ii":3},
                      {"t":"我的通知","h":"inform","i":3,"ii":4},
                      {"t":"我的私信","h":"private","i":5,"ii":5}]>
      <#list msType as x>
      <a class="itm js-flag" href="#/${x.h}/" data-value="/m/${x.i}/" data-type="${x.ii}">${x.t}<span class="j-fwg fr">0</span></a>
      </#list>
    </div>
  </@module>
</#macro>
<#-- 消息中心页面 -->
<#macro userPageMessage user={}>
  <@page user=user index=-1 class="g-message g-xxx t-gbx">
  <div class="t-man f-cb">
    <@messagebox/>
    <div class="fl l-lsd">
      <@userPageMessageType/>
    </div>
    <div class="l-lmc" id="module-box"></div>
  </div>
  </@page>
</#macro>
<#-- 消息中心页面模版 -->
<#macro userPageMessageTemplate>
  <textarea name="txt" id="txt-mdl-meeting">
    <@module id="m1" title="最新活动" class="t-mda w-mlst s-srd">
      <div class="lbox js-flag"></div>
      <div class="pbox js-flag"></div>
    </@module>
  </textarea>
  <textarea name="txt" id="txt-mdl-comment">
    <@module id="m2" title="我的评论" class="t-mda w-mlst s-srd">
      <div class="lbox js-flag"></div>
      <div class="pbox js-flag"></div>
    </@module>
  </textarea>
  <textarea name="txt" id="txt-mdl-inform">
    <@module id="m3" title="我的通知" class="t-mda w-mlst s-srd">
      <p class="tpx">
        <a href="#/inform/?type=0" class="js-inf bd02">收到通知</a>
        <a href="#/inform/?type=1" class="js-inf bd02">发出通知</a>
      </p>
      <div class="lbox js-flag"></div>
      <div class="pbox js-flag"></div>
    </@module>
  </textarea>
  <textarea name="txt" id="txt-mdl-system">
    <@module id="m4" title="系统消息" class="t-mda w-mlst s-srd">
      <div class="lbox js-flag"></div>
      <div class="pbox js-flag"></div>
    </@module>
  </textarea>
  <textarea name="txt" id="txt-mdl-private">
    <@module id="m5" title="我的私信" class="t-mda w-mlst s-srd">
      <div class="lbox js-flag"></div>
      <div class="pbox js-flag"></div>
    </@module>
  </textarea>
  <#noparse>
  <textarea name="jst" id="jst-list-meeting">
    {list beg..end as y}
      {var x=xlist[y]}
      {var m=x.message}
      {var g=JSON.parse(m.content)}
      <div class="w-lfac f-cb bd00">
        <div class="fl img"><img src="${g.thumbnail|default:config.url.logo}"/></div>
        <div class="dtl">
          ${m.body}
          <p class="fc05">${m.createTime|format:'yyyy年MM月dd日 HH:mm'}</p>
        </div>
      </div>
    {/list}
  </textarea>
  <textarea name="jst" id="jst-list-comment">
    {list beg..end as y}
      {var x=xlist[y]}
      {var m=x.message}
      <div class="w-lfac f-cb bd00">
        <div class="fl img"><img src="/res/test/face50.jpg"/></div>
        <div class="dtl">
          ${m.body}
          <p class="fc05">${m.createTime|format:'yyyy年MM月dd日 HH:mm'}</p>
        </div>
      </div>
    {/list}
  </textarea>
  <textarea name="jst" id="jst-list-inform">
    {list beg..end as y}
      {var x=xlist[y]}
      {var m=x.message||x}
      {var g=JSON.parse(m.content)}
      <div class="w-lfac f-cb bd00">
        <div class="fl img"><img src="${g.glogo|default:config.url.logo}"/></div>
        <div class="dtl">
          <p><a class="fc11" href="/${g.ghomepage}/">${g.gname}：</a><span class="fc02">${m.title}</span></p>
          <p><span class="js-content" data-content="${m.body|escape}">${m.body.substr(0,200)|escape}</span>{if m.body.length>200}<a href="#" data-action="details" class="fc11 btn">详细&gt;&gt;</a>{/if}</p>
          <p class="fc05">${m.createTime|format:'yyyy年MM月dd日 HH:mm'}</p>
        </div>
      </div>
    {/list}
  </textarea>
  <textarea name="jst" id="jst-list-system">
    {list beg..end as y}
      {var x=xlist[y]}
      {var m=x.message}
      <div class="w-sit bd00">
        <p>${m.body}</p>
        <p class="fc05">${m.createTime|format:'yyyy年MM月dd日 HH:mm'}</p>
      </div>
    {/list}
  </textarea>
  <textarea name="jst" id="jst-list-private">
    {list beg..end as y}
      {var x=xlist[y]}
      {var m=x.message}
      <div class="w-lfac f-cb bd00">
        <div class="fl img"><img src="${m.sender.thumbnail|default:config.url.portrait}"/></div>
        <div class="dtl">
          <p>${m.sender.nickname}：${m.body}</p>
          <p class="fc05">${m.createTime|format:"yyyy年MM月dd日 HH:mm"}</p>
        </div>
      </div>
    {/list}
  </textarea>
  </#noparse>
</#macro>
</#escape>