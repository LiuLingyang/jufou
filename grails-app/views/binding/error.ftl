<html>
  <head>
    <title>绑定失败</title>
    <script>
      function a(){
          top.onsnsbind();
      }
    </script>
  </head>
  <body>
    <p>${error.description}</p>
    <p><input type="button" value="关闭" onclick="a();"/></p>
  </body>
</html>