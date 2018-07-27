		var uid = $.jStorage.get("memberid");
		var imag = "http://www.hijufou.com";
	  	$.getJSON("http://www.hijufou.com/rest/open/user/get",
  	         {uid:uid},
  	         function(data) {
  	            var user = data.result;
  	            $("#portrait").attr("src", imag + user.portrait);
  	         	$("#nickname").text(user.nickname);
  	         	$("#sex").text(getSex(user.gender));
  	         	$("#address").text(user.province + " " + user.city);
  	         	$("#time").text(dateFormat(user.attendTime,"longDate"));
  	         	//$("#description").text();
  	         	
  	         }
  	);
  	
  	$("#relatedGroup").click(
  		function(){
  			location.href = "../group/member.group.html";
  		}
  	);