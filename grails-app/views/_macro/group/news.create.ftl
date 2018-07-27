<#escape x as x!""?html>
<#macro groupNewsCreate group={} news={}>
  <form class="l-lmc w-fom news-create">
    <@messagebox/>
    <@module title="创建文章" id="x1" class="t-mdi t-mdf s-srd">
      <div class="sti">
        <p class="itl">主题<span class="itp fc06">（必填）</span></p>
        <div class="ptl">
          <input type="text"
                 name="subject"
                 class="txt bd01 w-rd3 wd2"
                 maxlength="100"
                 data-required="true"
                 data-message="请输入文章主题"
                 placeholder="输入文章主题"
                 value="${news.subject}"/>
        </div>
      </div>
      <div class="sti">
        <p class="itl">正文<span class="itp fc06">（必填）</span></p>
        <div class="ptl">
          <textarea name="content"
                    class="bd01 w-rd3 wd4 ht0 wd2">
            ${news.content}
          </textarea>
        </div>
      </div>
      <div class="sti">
        <p class="itl">文章作者</p>
        <div class="ptl">
          <input type="text"
                 name="author"
                 class="txt bd01 w-rd3 wd2"
                 placeholder="输入文章作者"
                 value="${news.author}"/>
        </div>
      </div>
      <div class="sti">
        <p class="itl">封面</p>
        <div class="ptl nxd">
          <label><div id="news-cover" class="cvr" style="background-image:url(${news.cover!p_meeting_cover});">&nbsp;</div></label>
          <div class="w-loading" id="news-loading" style="display:none;">&nbsp;</div>
          <input type="hidden" name="cover_src"/>
          <input type="hidden" name="cover_clip"/>
        </div>
      </div>
    </@module>
    <div class="w-tbar bd02 bg01 f-cb">
      <input name="btn-publish" type="button" class="fr w-rd3 t-btn t-btn-4" value="发布文章"/>
      <a class="fr w-rd3 t-btn t-btn-6" href="/${group.homepage}/news/">取消</a>
    </div>
  </form>
</#macro>
<#macro groupNewsCreateTemplate news={}>
  <textarea name="js">
    window.data.news = ${json(news)};
  </textarea>
</#macro>
</#escape>