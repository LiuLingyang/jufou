	var imag = "http://www.hijufou.com";
	var kw = "";
  	$.getJSON("http://www.hijufou.com/rest/open/group/search",
  	         {order: "desc", sort:"createTime", total:true, limit:10,offset:0},
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
  	
  	$("#latest").click(function(){
		location.href = "../system/group.moremember.html";	
	});
	
	$("#searchBox").change(function(){
		kw = $("#searchBox").val();
		$.getJSON("http://www.hijufou.com/rest/open/group/search",
  	         {order: "desc", sort:"createTime", total:true, limit:10,offset:0, keyword:kw},
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
	});

var showDetail = function(uid) {
	$.jStorage.set("groupid",uid);
	location.href = "../group/about.html";
}




