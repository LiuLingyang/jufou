$("#pwSubmit").click(function(){
	$("#errorText").css("background-color","#dfdfdf");
	var oldPw=$("#oldPassword").val();
	if (oldPw==""){
		$("#errorText").text("请输入原密码");
		$("#errorText").css("background-color","white");
		$("#oldPassword").focus();
		return;
	}
	var newPw=$("#newPassword").val();
	if (newPw==""){
		$("#errorText").text("请输入新密码");
		$("#errorText").css("background-color","white");
		$("#newPassword").focus();
		return;
	}
	var pwAgain=$("#passwordAgain").val();
	if (pwAgain==""){
		$("#errorText").text("请输入确认密码");
		$("#errorText").css("background-color","white");
		$("#passwordAgain").focus();
		return;
	}
	if(newPw!=pwAgain){
		$("#errorText").text("两次密码输入不一致");
		$("#errorText").css("background-color","white");
		$("#newPassword").val("");
		$("#passwordAgain").val("");
		$("#newPassword").focus();
		return;
	}
	if(newPw.length<6){
		$("#errorText").text("密码位数不少于6位");
		$("#errorText").css("background-color","white");
		$("#newPassword").val("");
		$("#passwordAgain").val("");
		$("#newPassword").focus();
		return;
	}
	oldPw=md5(oldPw);
	newPw=md5(newPw);
	$.ajax({
			url:"http://www.hijufou.com/rest/user/password",
			type: "POST",
			xhrFields: {withCredentials: true},
			data: {"oldPassword": oldPw, "password": newPw},
			success: function(data) {
				data = jQuery.parseJSON(data);
				if(data.code==-106){
					$("#errorText").text("原密码错误");
					$("#errorText").css("background-color","white");
					$("#oldPassword").val("");
					$("#newPassword").val("");
					$("#passwordAgain").val("");
					$("#oldPassword").focus();
				}
				else{
					location.href = "./setUp.html";
				}
			}
		});
});
