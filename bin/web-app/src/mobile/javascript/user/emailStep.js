	//$.mobile.changePage("#loginPage","pop");
  	$("#resent").click(function(){
  		var email = $("#email").val();
  		var pwd = $("#pwd").val();
  		var repwd = $("#repwd").val();
  		if (pwd == repwd) {
  			$.jStorage.set("actemail",email);
  			$.jStorage.set("pwd",pwd);
  			location.href = "../user/phoneStepFour.html";
  		} else {
  			alert("输入密码不一致");
  		}
	});