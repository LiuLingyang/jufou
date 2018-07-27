<!DOCTYPE html>
<html>
  <head>
    <title>下载 - 聚否</title>
    <@head/>
    <!-- @STYLE -->
    <link href="${css_root}base.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}system/download.css" rel="stylesheet" type="text/css"/>
    <link href="/res/theme/default/style.css" rel="stylesheet" type="text/css"/>
  </head>
  <body id="www-jufou-com">
    <@page user=host index=0 class="g-download t-gbx">
      <div class="ttl fc14 bd08">客户端下载</div>
      <div class="con pr">
        <div class="iphone pa"></div>
        <a href="${ios}"><p class="d-iphone pa">iphone客户端下载</p></a>
        <div class="android pa"></div>
        <a href="${android}"><p class="d-android pa">android客户端下载</p></a>
      </div>
    </@page>
    <#noparse>
    <!-- @DEFINE -->
    </#noparse>
    <script src="${lib_root}define.js${cfg_root}"></script>
    <script>
        define(['{pro}module/system/download.js'],
        function(){
            var _ = NEJ.P;
            _('mu.x')._$setup(
                _('mu.m.u')._$$ModuleDownload);
        });
    </script>
  </body>
</html>