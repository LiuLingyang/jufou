$("#okbtn").click(function() {
	var captcha = $("#captcha").val();
	if (captcha == null || captcha.length == 0) {
		$("#errorMsg").text("请输入验证码");
	} else {
		$.jStorage.set("captcha", captcha);
		location.href = "../user/resetStepThree.html";
	}
});

$("#resendBtn").click(function(){
  		var phone = $.jStorage.get("phone");
		$.ajax({
			url: "http://www.hijufou.com/rest/open/user/sendCaptcha",
			type: "GET",
			data: {"mobile": phone},
			success: function(data) {
				$("#resendBtn").hide();
				$("#resendMsg").show();
				begin();
			}
		});
	});
	
var counter;
var begin = function () {
	var count = 60;
	counter = setInterval(function(){                
            if(count == 0) {
                $("#resendMsg").hide();
				$("#resendBtn").show();
				end();
            } 
                $("#count").text("没有收到?" + count);
				count--;
            },1000);	
};

var end = function () {
	clearInterval(counter);
};
begin();