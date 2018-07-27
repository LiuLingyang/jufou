<#-- 邮件头 -->
<#macro header>
  <table style="width:100%" cellspacing="0" cellpadding="0">
    <tbody>
        <tr>
          <td style="width:49%;padding:0 2px 0 0;"><div style="height:22px;background:#e6304c"></div></td>
          <td style="width:52px;padding:0;"><a href="http://www.hijufou.com/" target=_blank><img src="http://www.hijufou.com/res/img/email.jpg" width="52" height="52" style="margin-top:16px;"></a></td>
          <td style="width:49%;padding:0 0 0 2px;"><div style="height:22px;background:#e6304c"></div></td>
        </tr>        
    </tbody>
  </table>
</#macro>
<#-- 正文内容 -->
<#macro body>
  <div><#nested></div>
</#macro>
<#-- 邮件底 -->
<#macro footer>
  <div style="background:rgb(85, 85, 85);border:5px solid rgb(85, 85, 85);text-align:center;">
    <div style="background: rgb(85, 85, 85); text-align: center; clear: both; border-top-color: rgb(85, 85, 85); border-bottom-color: rgb(85, 85, 85); border-top-width: 20px; border-bottom-width: 20px; border-top-style: solid; border-bottom-style: solid;">
      <div style="width: 94%; text-align: left; color: rgb(204, 204, 204); line-height: 14px; font-family:'Microsoft Yahei'; font-size: 11px; border-right-color: rgb(85, 85, 85); border-left-color: rgb(85, 85, 85); border-right-width: 10px; border-left-width: 10px; border-right-style: solid; border-left-style: solid; min-width: 220px; max-width: 650px;">
      	<p style="color: rgb(204, 204, 204);margin-left:10px;">喜欢聚否？把聚否<a style="color: rgb(204, 204, 204);">hijufou@163.com</a>添加为你的联系人</p>     	
        <p style="color: rgb(204, 204, 204);margin-left:10px;">如果你错误的收到了此信息，请点击这个不是我的账号</p>
        <p style="color: rgb(204, 204, 204);margin-left:10px;">如果你不愿意收到聚否的邮件，请点击这里退订邮件</p>
        <p style="color: rgb(204, 204, 204);margin-left:10px;">聚否  |   杭州滨江区江南大道3850号创新大厦710 |（+86）8669 2595</p>
      </div>
    </div> 	
  </div>
</#macro>