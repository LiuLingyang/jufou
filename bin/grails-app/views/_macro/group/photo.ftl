<#escape x as x!""?html>
<#-- 模块ID 30-39 -->
<#-- 相册列表 -->
<#macro groupAlbumList relation=0>
  <@module id="30" title="组织相册" class="s-srd t-mdi">
    <div class="xtl">
      <#if relation&gt;1>
      <a class="fc02 js-yflag" href="#">创建相册</a>
      </#if>
    </div>
    <div class="w-fom bg02" style="visibility:hidden;">
      <label class="xlb">排序</label>
      <select class="xtp bd01 w-rd3 js-zflag">
        <option value="1">上传时间升序</option>
        <option value="2">上传时间降序</option>
        <option value="3" selected="selected">相册名称升序</option>
        <option value="4">相册名称降序</option>
      </select>
    </div>
    <div class="xbx f-cb js-zflag">
      <p class="w-loading">&nbsp;</p>
    </div>
    <div class="pgx bd00 js-zflag" style="visibility:hidden;"></div>
  </@module>
</#macro>
<#-- 相片列表 -->
<#macro groupPhotoList group={} album={} relation=0>
  <@module id="31" 
    title="全${album.photoCount}张相片来自"
    menu="<a class=\"mnu fc02\" href=\"/${group.homepage}/album/\">返回相册</a>">
    <p class="anx bd00">
      <span class="js-yflag tls">${album.name}</span>
      <#if relation&gt;=2>
      <a class="atx fc02 f-bg" href="#" data-action="upload">上传相片</a>
      <a class="atx fc02 f-bg atx-01" href="#" data-action="rename">重命名相册</a>
      <a class="atx fc02 f-bg atx-02" href="#" data-action="delete">删除相册</a>
      </#if>
    </p> 
    <div class="xbx f-cb js-zflag">
      <p class="w-loading">&nbsp;</p>
    </div>
    <div class="pgx bd00 js-zflag" style="visibility:hidden;"></div>
  </@module>
</#macro>
<#-- 相册页模板 -->
<#macro groupAlbumTemplate group={}>
  <#noparse>
  <textarea name="jst" id="jst-album-list">
    {if xlist.length>0}
      {list beg..end as y}
      {var x = xlist[y]}
      {if !x}{break}{/if}
      <div class="fl w-xpt">
        <div class="img"><a href="/${group.homepage}/album/${x.id}/"><img src="${x.coverUrl|default:config.url.album_cover}"/></a></div>
        <div class="dtl">
          <p class="ln0"><a class="fc02" href="/${group.homepage}/album/${x.id}/">${x.name}</a></p>
          <p class="ln1 fc06">${x.photoCount}张照片</p>
          <p class="ln2 fc06">活动时间：${x.createTime|format:'yyyy年MM月dd日'}</p>
        </div>
      </div>
      {/list}
    {else}
      <p class="w-message">该组织还没有相册！</p>
    {/if}
  </textarea>
  </#noparse>
</#macro>
<#-- 相片页模板 -->
<#macro groupPhotoTemplate group={} album={}>
  <textarea name="js">
    window.data.album = ${json(album)};
  </textarea>
  <#noparse>
  <textarea name="jst" id="jst-photo-list">
    {if xlist.length>0}
      {list beg..end as y}
      {var x = xlist[y]}
      <div class="fl w-xpt">
        <div class="img"><a href="/${group.homepage}/photo/${x.id}/"><img src="${x.thumbnailURL}"/></a></div>
        <div class="dtl">
          <p class="ln0 fc06">上传会员：<a class="fc02" href="/${group.homepage}/member/${x.uploader.id}/">${x.uploader.nickname|default:x.uploader.username}</a></p>
          <p class="ln2 fc06">上传时间：${x.uploadTime|format:'yyyy年MM月dd日'}</p>
        </div>
      </div>
      {/list}
    {else}
      <p class="w-message">该相册还没有上传相片！</p>
    {/if}
  </textarea>
  </#noparse>
</#macro>
</#escape>