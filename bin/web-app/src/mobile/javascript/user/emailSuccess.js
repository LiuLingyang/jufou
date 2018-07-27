	//$.mobile.changePage("#loginPage","pop");
	var email = $.jStorage.get("actemail");
	$("#emailaddress").text(email);
  	$("#resent").click(function(){
		$.ajax({
			url: "http://www.hijufou.com/rest/open/user/resendemail",
			type: "GET",
			data: {"email": email },
			success: function(data) {
				location.href = "../user/emailSuccess.html";
			},
			failure : function(data) {
				location.href = "../user/emailFail.html";
			}
		});
	});