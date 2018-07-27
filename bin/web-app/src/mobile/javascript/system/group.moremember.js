	var imag = "http://www.hijufou.com";
  	$.getJSON("http://www.hijufou.com/rest/open/group/search",
  	         {order: "desc", sort:"memberCount", total:true, limit:10,offset:0},
  	         function(data) {
  	           	$("#groupsElments").empty();
  	            var groups = data.result.list;
  	       		$.each(groups, function(i, item) {
  	         	    var groupHtml = "<div class='w-igrp fl'><a href='javascript:showDetail(" + item.id + ")'><div class='mbd'><img src='" + imag+item.logo + "'/><p class='ln ln0'>"+ item.name +"</p><p class='ln ln1 f-bg'>"
  	         	    + item.province + item.city + "<span class='fc3'>" + item.memberCount  + "</span>会员</p></div></a></div>";
  	         		$("#groupsElments").append(groupHtml);
  	         	});
  	         }
  	);
  	
  	$("#moremember").click(function(){
		location.href = "../system/group.html";	
	});

var showDetail = function(uid) {
	$.jStorage.set("groupid",uid);
	location.href = "../group/about.html";
}

