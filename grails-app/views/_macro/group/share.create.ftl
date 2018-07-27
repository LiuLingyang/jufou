<#escape x as x!""?html>
<#macro groupShareCreate group={} share={}>
  <form class="l-lmc w-fom share-create">
    <@messagebox/>
    <@module title="创建分享" id="w1" class="t-mdi t-mdf s-srd">
      <div class="sti">
        <p class="itl">主题<span class="itp fc06">（必填）</span></p>
        <div class="ptl">
          <input type="text"
                 name="title"
                 class="txt bd01 w-rd3 wd2"
                 maxlength="100"
                 data-required="true"
                 data-message="请输入分享主题"
                 placeholder="输入分享主题"
                 value="${share.title}"/>
        </div>
      </div>
      <div class="sti">
        <p class="itl">正文<span class="itp fc06">（必填）</span></p>
        <div class="ptl">
          <textarea name="content"
                    class="bd01 w-rd3 wd"
                    data-required="true"
                    data-message="请输入分享内容">
            ${share.content}
          </textarea>
        </div>
      </div>
      <div class="sti">
        <p class="itl">上传图片</p>
        <div class="ptl nxd">
          <label><img src="${p_meeting_cover}" class="cvr js-flag"/></label>
          <div class="w-loading js-flag" style="display:none;">&nbsp;</div>
        </div>
      </div>
    </@module>
    <div class="w-tbar bd02 bg01 f-cb">
      <input name="btn-publish" type="button" class="fr w-rd3 t-btn t-btn-4" value="发布分享"/>
      <a class="fr w-rd3 t-btn t-btn-6" href="/${group.homepage}/share/">取消</a>
    </div>
  </form>
</#macro>
<#macro groupShareCreateTemplate share={}>
  <textarea name="js">
    window.data.share = ${json(share)};
  </textarea>
</#macro>
</#escape>