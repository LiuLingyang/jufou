		var uid = $.jStorage.get("memberid");
		var imag = "http://www.hijufou.com";
	  	$.getJSON("http://www.hijufou.com/rest/open/user/get",
  	         {uid:uid},
  	         function(data) {
  	            var user = data.result;
  	            $("#portrait").attr("src", imag + user.portrait);
  	         	$("#nickname").text(user.nickname);
  	         	$("#sex").text(getSex(user.gender));
  	         }
  	);
  	
  	$("#profile").click(
  		function(){
  			location.href = "../group/member.profile.html";
  		}
  	);
  	var imag = "http://www.hijufou.com";
  	$.getJSON("http://www.hijufou.com/rest/open/group/list",
  	         {uid:uid},
  	         function(data) {
  	           	$("#groupsElments").empty();
  	            var groups = data.result.list;
  	       		$.each(groups, function(i, item) {
  	         	    var groupHtml = "<div class='w-igrp fl'><div class='mbd'><img src='" + imag+item.logo + "'/><p class='ln ln0'>"+ item.name +"</p><p class='ln ln1 f-bg'>"
  	         	    + item.province + item.city + "<span class='fc3'>" + item.memberCount  + "</span>会员</p></div></div>";
  	         		$("#groupsElments").append(groupHtml);
  	         	});
  	         }
  	);
