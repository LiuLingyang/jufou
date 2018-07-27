  	$("#okbtn").click(function(){
  		var phone = $("#phone").val();
  		$.jStorage.set("phone",phone);
		$.ajax({
			url: "http://www.hijufou.com/rest/open/user/sendCaptcha",
			type: "GET",
			data: {"mobile": phone},
			success: function(data) {
				location.href = "../user/phoneStepTwo.html";
			}
		});
	});