<#escape x as x!""?html>
<#macro groupVoteCreate group={} vote={}>
  <form class="l-lmc w-fom vote-create">
    <@messagebox/>
    <@module title="添加投票" id="61" class="t-mdi t-mdf s-srd">
      <div class="sti">
        <p class="itl">类型</p>
        <div class="ptl">
          <#local type=(vote.type)!1>
          <select name="type" class="bd01 w-rd3 wd1">
            <option value="1" <#if type==1>selected="selected"</#if>>单选题</option>
            <option value="2" <#if type==2>selected="selected"</#if>>多选题</option>
            <option value="3" <#if type==3>selected="selected"</#if>>打分题</option>
          </select>
        </div>
      </div>
      <div class="sti">
        <p class="itl">请输入投票主题<span class="itp fc06">（必填）</span></p>
        <div class="ptl">
          <input type="text"
                 name="title"
                 class="txt bd01 w-rd3 wd2"
                 maxlength="100"
                 data-required="true"
                 data-message="请输入投票名称"
                 placeholder="输入投票名称"
                 value="${vote.title}"/>
        </div>
      </div>
      <div class="sti">
        <p class="itl">具体说明<span class="itp fc06">（必填）</span></p>
        <div class="ptl">
          <textarea name="description"
                    class="bd01 w-rd3 wd4 ht0 wd2"
                    data-message="请输入投票说明"
                    data-required="true">
            ${vote.description}
          </textarea>
        </div>
      </div>
      <div class="sti">
        <p class="itl">投票选项</p>
        <div class="ptl" id="vote-list-box"></div>
        <div><a href="#" data-action="add" class="fc02">+添加更多项</a></div>
      </div>
    </@module>
    <div class="w-tbar bd02 bg01 f-cb">
      <input name="btn-publish" type="button" class="fr w-rd3 t-btn t-btn-4" value="发布投票"/>
      <a class="fr w-rd3 t-btn t-btn-6" href="/${group.homepage}/vote/">取消</a>
    </div>
  </form>
</#macro>
<#macro groupVoteCreateTemplate vote={}>
  <textarea name="js">
    window.data.vote = ${json(vote)};
  </textarea>
  <#noparse>
  <textarea name="jst" id="group-vote-item">
    <div class="lnx nxd js-xdel">
      <input type="text" class="txt txt-s bd01 w-rd3 wd0" maxlength="250" value="${vote.value||''}" data-id="${vote.id||''}"/>
      <a class="abt fc02" href="#" data-action="del">删除</a>
    </div>
  </textarea>
  </#noparse>
</#macro>
</#escape>