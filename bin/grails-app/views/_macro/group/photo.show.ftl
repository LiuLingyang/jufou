<#escape x as x!""?html>
<#-- 模块ID 40-49 -->
<#-- 相片详情模块 -->
<#macro groupPhotoShow group={} album={} photo={} relation=0>
  <@module id="40" title="${photo.uploadTime?number_to_datetime?string(\"yyyy-MM-dd\")}"
                menu="<a class=\"mnu fc02\" href=\"/${group.homepage}/album/${album.id}/\">返回相册</a>">
    <div class="xtp bd00 js-yflag">
      <p class="xtl">${album.name}</p>
      <div class="xab f-cb">
        <#if relation&gt;=2>
        <a class="xi fl fc02 f-bg" href="#" data-action="upload">上传照片</a>
        <a class="xi fl fc02 f-bg xi-01" href="#" data-action="rename">重命名相册</a>
        <a class="xi fl fc02 f-bg xi-02" href="#" data-action="delete">删除相册</a>
        </#if>
      </div>
    </div>
    <div class="xmn">
      <#if relation&gt;=2>
      <div class="xab js-yflag">
        <#--span class="fc04">3</span>
        <span class="fc06">/${album.photoCount!0}</span>
        <span class="sp fc06">|</span>
        <a class="xi fc03" href="#" data-action="slide">幻灯片放映</a>
        <span class="sp fc06">|</span-->
        <a class="xi fc02" href="#" data-action="cover">设为封面</a>
        <span class="sp fc06">|</span>
        <a class="xi fc02" href="#" data-action="delete">删除</a>
        <span class="sp fc06">|</span>
        <a class="xi fc02" href="#" data-action="move">照片移至</a>
      </div>
      </#if>
      <div class="xhw f-cb">
        <div class="rhw fr">
          <div class="xrl xbx f-cb js-xflag">
            <p class="w-loading">&nbsp;</p>
          </div>
          <div class="xrl xpg w-pager js-xflag" style="visibility:hidden;">
            <a href="#">1</a>
            <a href="#">2</a>
            <a href="#">3</a>
            <a href="#">4</a>
            <a href="#">5</a>
          </div>
          <div class="xrl xmr">
            <a class="w-rd3 t-btn t-btn-b" href="/${group.homepage}/album/${album.id}/">查看所有照片</a>
          </div>
        </div>
        <div class="lhw">
          <img src="${photo.originalURL}"/>
        </div>
        <div class="xcm js-xflag"></div>
      </div>
    </div>
  </@module>
</#macro>
<#-- 相片显示页模版 -->
<#macro groupPhotoShowTemplate album={} photo={}>
  <textarea name="js">
    window.data.album = ${json(album)};
    window.data.photo = ${json(photo)};
  </textarea>
  <#noparse>
  <textarea name="jst" id="jst-photo-list">
    {list beg..end as y}
      {var x = xlist[y]}
      <a class="xit fl" href="${config.page()}/photo/${x.id}/" hidefocus="true">
        <img src="${x.thumbnailURL}"/>
      </a>
    {/list}
  </textarea>
  </#noparse>
</#macro>
</#escape>