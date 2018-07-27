<#escape x as x!""?html>
<html>
  <head>
    <title>聚否 - ${meeting.title}</title>
    <meta http-equiv="x-dns-prefetch-control" content="off"> 
    <meta name="viewport" content="width=device-width,user-scalable=no">
    <style>
      *{padding:0;margin:0;border:0;}
      html,body{width:100%;height:100%;overflow:hidden;}
      body{overflow:auto;font-size:14px;line-height:160%;}
      table,img{max-width:100%;}
    </style>
  </head>
  <body>
    ${meeting.details}
  </body>
</html>
</#escape>