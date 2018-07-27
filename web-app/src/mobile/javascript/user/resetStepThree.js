var password = $.jStorage.get("password");
if (password != null) {
	$("#pwd").val(password);
	$("#repwd").val(password);
}

$("#okbtn").click(function() {
	var pwd = $("#pwd").val();
	var repwd = $("#repwd").val();
	if (pwd != repwd) {
		$("#errorMsg").text("两次输入的密码不一致");
	} else {
		var captcha = $.jStorage.get("captcha");
		var phone = $.jStorage.get("phone");
		var p = md5(pwd);
		$.ajax({
			url: "http://www.hijufou.com/rest/open/user/reset",
			type: "GET",
			data: {"password":p, "mobile":phone, "captcha":captcha},
			success: function(d) {
				var data = JSON.parse(d);
				if (data.code == -2) {
					$("#errorMsg").text("验证码错误，请返回修改");
				} else {
					$("#success").show();
					//1s后显示
					$(function () {
					    setTimeout(function () {
					        location.href = "../user/login.html";
					    }, 1000);});
			    }
			}
		});
		
	}

});

