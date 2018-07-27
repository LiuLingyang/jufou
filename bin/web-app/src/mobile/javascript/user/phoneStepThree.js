  	$("#nextstep").click(function(){
  	    var pwd = $("#pwd").val();
  	    var repwd = $("#repwd").val();
  	    if (pwd != repwd) {
  	    	alert("输入密码不一致");
  	    } else {
  			$.jStorage.set("pwd",pwd);
  			location.href = "../user/phoneStepFour.html";
  		}
	});