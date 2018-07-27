/* 
 * 组织会员页面逻辑
 * @author:lly
 */
var objs = parseURL();
var uid = objs.uid;
var gid = $.jStorage.get("groupid"),
	renderBox = $("#groupsElments"),   //加载容器
	basicurl = "http://www.hijufou.com";

//设置用户信息
setUserInfo();

//他的组织
otherGroups();

//tab切换
$("#relatedGroup").parent().click(function() {
	$("#relatedGroup").parent().addClass("js-selected");
	$("#profile").parent().removeClass("js-selected");
	$("#tab2").show();
	$("#tab1").hide();
});
$("#profile").parent().click(function() {
	$("#relatedGroup").parent().removeClass("js-selected");
	$("#profile").parent().addClass("js-selected");
	$("#tab1").show();
	$("#tab2").hide();
});

function setUserInfo(){
	$.ajax({
		url : "http://www.hijufou.com/rest/open/user/get",
		type : "POST",
		dataType : "json",
		xhrFields: {withCredentials: true},
		data : {uid:uid},
		success : function(data) {
			if (data.code == 1) {
				var user = data.result;
				var picURL = "../../../../res/mobile/pic/face50.jpg";
				if (user.thumbnail) {
					picURL = user.thumbnail;
				}
				var province = "浙江";
				var city = "杭州";
				if (user.province) {
					province = user.province;
				}
				if (user.city) {
					city = user.city;
				}
				$("#portrait").attr("src", picURL);
				$("#nickname").text(user.nickname);
				$("#sex").text(getSex(user.gender));
				$("#address").text(province + " " + city);
				$("#time").text(dateFormat(user.createTime, "yyyy-mm-dd"));
				$("#description").text(user.bio);
			}
		}
	});
}

function otherGroups(){
	$.ajax({
		url : "http://www.hijufou.com/rest/open/group/list",
		type : "POST",
		dataType : "json",
		xhrFields: {withCredentials: true},
		data : {uid:uid,total:true},
		success : function(data) {
			if (data.code == 1) {
				$("#relatedGroup").text(data.result.total + "个组织");
				if(data.result.list.length == 0){
					renderBox.hide();
					$("#nogroup").show();
				}else{
					$("#nogroup").hide();
					renderBox.show();
					var groupHtml = [];
					$.each(data.result.list,function(i, item) {
	  	       			var img = "";
	  	         		if (item.thumbnail != null) {
							img = basicurl + item.thumbnail;
						}
						var idx = i;
	  	         	    var partHtml = "<div class='w-mgrp fl'><div class='pto lazy' style='background:#868a8b url(" + img + ") center center;background-size:cover;'></div><img src='../../../../res/mobile/pic/groupmask.png' class='mask' id='mask"+ idx +"'/><p class='ln ln0 fs03 fc00'>" + item.name + "</p></div>";
	  	         		if (item.lastPhoto == null) {
							$("#mask"+idx).remove();
						}
						groupHtml.push(partHtml);
	  	         	});
	  	         	renderBox.html(groupHtml.join(""));
				}
			}
		}
	});	
}