  	$("#nextstep").click(function(){
  		var phone = $.jStorage.get("phone");
  		var captcha = $("#captcha").val();
		$.jStorage.set("captcha",captcha);
		location.href = "../user/phoneStepThree.html";
	});
	
	$("#resent").click(function(){
  		var phone = $.jStorage.get("phone");
		$.ajax({
			url: "http://www.hijufou.com/rest/open/user/sendCaptcha",
			type: "GET",
			data: {"mobile": phone},
			success: function(data) {
				alert("发送成功");
			}
		});
	});