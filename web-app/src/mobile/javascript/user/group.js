/* 
 * 我的组织页面逻辑
 * @author:lly
 * Create on:2014-10-07
 */
var gid = $.jStorage.get("groupid"),
	userObj = $.jStorage.get("userObj"),
	renderBox = $("#tlist"),   //加载容器
	basicurl = "http://www.hijufou.com";
	
//加载我的组织主方法
renderGroups();

//设置组织首页返回按钮
$.jStorage.set("group_back_url",location.href);

function renderGroups(){
	$.ajax({
		url : "http://www.hijufou.com/rest/open/group/list",
		type : "POST",
		dataType : "json",
		xhrFields: {withCredentials: true},
		data : {uid:userObj.id,total:true},
		success : function(data) {
			if (data.code == 1) {
				$("#loading").hide();
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
	  	         	    var partHtml = "<a href='../group/home.html?groupid="+ item.id +"'><div class='w-mgrp fl'><div class='pto lazy' style='background:#868a8b url(" + img + ") center center;background-size:cover;'></div><img src='../../../../res/mobile/pic/groupmask.png' class='mask' id='mask"+ idx +"'/><p class='ln ln0 fs03 fc00'>" + item.name + "</p></div></a>";
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