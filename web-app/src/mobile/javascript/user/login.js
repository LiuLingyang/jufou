//设置微信url
var redirectUrl=$.jStorage.get("loginCallback")
var weixinUrl = "http://www.hijufou.com/rest/weixin/authorize?redirectUrl=" + encodeURIComponent(redirectUrl);
$(".weixinlogin").attr("href",weixinUrl);

$("#loginsubmitbtn").click(function(){
	var user = $("#username").val();
	var password = $("#password").val();
	var p = md5(password);
	var errorEle = $("#loginError");   //提示错误容器
	$.ajax({
		url: "http://www.hijufou.com/rest/user/login",
		type: "GET",
		dataType:"json",
		xhrFields: {withCredentials: true},
		data: {"username": user, "password": p , "saveLogin":1},
		success: function(data) {
			switch(data.code){
				case 1:
					$.jStorage.deleteKey("userObj");
					$.jStorage.set("userObj",data.result);
					location.href = redirectUrl;
				break;
				case -105:
					errorEle.text("用户名不存在，请先注册").show();
				break;
				case -106:
					errorEle.text("密码错误").show();
					$("#password").val('');
				break;
				case -107:
					errorEle.text("用户未激活").show();
				break;
				case -2:
					errorEle.text("请用手机登录").show();
				break;
				default:
					errorEle.text("暂时无法登录，请稍后再试！").show();
				break;
			}
		}
	});
});