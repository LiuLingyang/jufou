$("#save").click(function() {
	var nickname = $("#nickname").val();
	nickname||(nickname="无");//昵称为空串后台会有异常
	var province = "浙江省";//$("#txtprovince").val();
	var city = "杭州市";    //$("#txtcity").val();
	var area = $("#area").val();
	var gender=($("#man")[0].checked==true)?0:1;
	var pwd = md5($.jStorage.get("pwd"));
	var phone = $.jStorage.get("phone");
	var captcha = $.jStorage.get("captcha");
	$.ajax({
		url : "http://www.hijufou.com/rest/open/user/regist",
		type : "GET",
		data : {
			"gender":gender,
			"nickname" : nickname,
			"mobile" : phone,
			"province" : province,
			"city" : city,
			"area" : area,
			"captcha" : captcha,
			"password" : pwd
		},
		success : function(d) {
			var data = JSON.parse(d);
			if (data.code == -101) {
				$("#errorMsg").text("请输入邮箱或手机号码");
			} else if (data.code == -102) {
				$("#errorMsg").text("账号已经存在");
			} else if (data.code == -103) {
				$("#errorMsg").text("邮箱地址已经存在");
			} else if (data.code == -104) {
				$("#errorMsg").text("手机号码已经存在");
			} else if (data.code == -107) {
				$("#errorMsg").text("用户未激活");
			} else if (data.code > 0) {
				location.href = "../user/registsuccess.html";
			} else {
				$("#errorMsg").text("注册失败");
			}
		}
	});
});

var setArea = function() {
	var a = $("#selArea").val();
	$("#area").val(a);
};


