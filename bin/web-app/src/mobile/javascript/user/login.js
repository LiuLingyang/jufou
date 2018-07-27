  	var userid = $.jStorage.get("userid");
  	if (userid != null) {
  		$("#username").val(userid);
  	}
  	
  	$("#loginsubmitbtn").click(function(){
  	    var returnURL =  $.jStorage.get("preLink");
		var user = $("#username").val();
		var password = $("#password").val();
		var p = md5(password);
		var idx = $.jStorage.get("enter");
		$.ajax({
			url: "http://www.hijufou.com/rest/user/login",
			type: "GET",
			xhrFields: {withCredentials: true},
			data: {"username": user, "password": p},
			success: function(data) {
			    data = jQuery.parseJSON(data);
				if (data.code == -105) {
				 location.href = "../user/regist.html";
				} else if (data.code == -106) {
					alert("密码错误");	
				} else if (data.code == -107) {
					alert("用户未激活");	
				} else {
				var user = data.result;
				$.jStorage.set("userObj",user);
				if (idx == 1) {
					location.href = returnURL + "&re=1";
					if ($.jStorage.get("enter") != null) {
						$.jStorage.deleteKey("enter");
						$.jStorage.deleteKey("preLink");
					}
				} else {
					location.href = returnURL;
				}
				}
			}
		});
	});