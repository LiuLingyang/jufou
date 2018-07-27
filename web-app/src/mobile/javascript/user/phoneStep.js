$("#okbtn").click(function() {
	var phone = $("#phone").val();
	var regcheck = regex.mobile.test(phone);
	if (!regcheck) {
		$("#errorMsg").text("请输入正确的手机号码");
	} else {
		$.ajax({
			url : "http://www.hijufou.com/rest/open/user/exist",
			type : "GET",
			data : {
				"username" : phone
			},
			success : function(data) {
				var d = JSON.parse(data);
				if (d.code == -105) {
					$.jStorage.set("phone", phone);
					$.ajax({
						url : "http://www.hijufou.com/rest/open/user/sendCaptcha",
						type : "GET",
						data : {
							"mobile" : phone
						},
						success : function(data) {
							var data1 = JSON.parse(data);
							if(data1.code==-7)
							{
								$("#errorMsg").text("发送过于频繁");
							}
							else if(data1.code==1)
							{
								location.href = "../user/phoneStepTwo.html";
							}
						}
					});
				} else if (d.code == -9) {
					$("#errorMsg").text("邀请链接过期");
				} else {
					$("#errorMsg").text("手机号码已经注册");
				}
			}
		});
	}

});

var regex = {
	mobile : /^0?(13[0-9]|15[012356789]|18[02356789]|14[57]|17[012356789])[0-9]{8}$/
}; 