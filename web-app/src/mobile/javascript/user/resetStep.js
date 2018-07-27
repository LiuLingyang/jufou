
var regex = {
	mobile : /^0?(13[0-9]|15[012356789]|18[02356789]|14[57]|17[012356789])[0-9]{8}$/
};

$("#okbtn").click(function() {
	var phone = $("#phone").val();
	var regcheck = regex.mobile.test(phone);
	if (!regcheck) {
		$("#errorMsg").text("请输入正确的手机号码");
	} else {
		$.jStorage.set("phone", phone);
		$.ajax({
			url : "http://www.hijufou.com/rest/open/user/sendCaptcha",
			type : "GET",
			data : {
				"mobile" : phone
			},
			success : function(data) {
				location.href = "../user/resetStepTwo.html";
			}
		});

	}
});
