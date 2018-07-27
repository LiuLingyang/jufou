/*
 * 全局操作
 * set groupid groupcode meetid meid
 * set fatherObj groupObj groupQuestions userObj meetObj meetQuestions
 */
var objs = parseURL();
if(objs["groupid"]&&(objs["groupid"]!=$.jStorage.get("groupid"))){
	$.jStorage.set("groupid",objs["groupid"]);
	//子组织信息获取
	$.ajax({
	    url: "http://www.hijufou.com/rest/open/group/get",
	    type: "GET",
	    dataType: "json",
	    xhrFields: {withCredentials: true},
	    async: false,
	    data:{gid:$.jStorage.get("groupid")},
	    success: function(data) {
	        $.jStorage.set("groupObj",data.result.group);
	        $.jStorage.set("groupQuestions",data.result.questions);
	    }
	});
}

if(objs["groupcode"]&&(objs["groupcode"]!=$.jStorage.get("groupcode"))){
	$.jStorage.set("groupcode",objs["groupcode"]);
}

if(objs["meetid"]&&(objs["meetid"]!=$.jStorage.get("meetid"))){
	$.jStorage.set("meetid",objs["meetid"]);

	//活动信息获取
	$.ajax({
	    url: "http://www.hijufou.com/rest/open/meeting/get",
	    type: "GET",
	    dataType: "json",
	    xhrFields: {withCredentials: true},
	    async: false,
	    data:{mid:$.jStorage.get("meetid")},
	    success: function(data) {
	        $.jStorage.set("meetObj",data.result.meeting);
	        $.jStorage.set("meetQuestions",data.result.questions);
	    }
	});
}

if(objs["meid"]&&(objs["meid"]!=$.jStorage.get("meid"))){
	$.jStorage.set("meid",objs["meid"]);   //meid暂时作为父组织id使用，避免微信账号链接改动过大

	//父组织信息获取
	$.ajax({
	    url: "http://www.hijufou.com/rest/open/group/get",
	    type: "GET",
	    dataType: "json",
	    xhrFields: {withCredentials: true},
	    async: false,
	    data:{gid:$.jStorage.get("meid")},
	    success: function(data) {
	        $.jStorage.set("fatherObj",data.result.group);
	    },
		error:function(){
			$.jStorage.deleteKey("fatherObj");
		}
	});
}

/*else{
	if($("#sysGroupTitle").length&&$.jStorage.get("fatherObj")){
		if($.jStorage.get("meid") == 593){
			$("#sysGroupTitle").text("活动去哪儿");
		}else{
			$("#sysGroupTitle").text($.jStorage.get("fatherObj").name);
		}
	}
}*/


//用户信息获取
if(checkLogin() == true){
	$.ajax({
		url : "http://www.hijufou.com/rest/user/get",
		type : "GET",
		dataType : "json",
		xhrFields: {withCredentials: true},
		async: false,
		success : function(data) {
			if (data.code == 1) {
				$.jStorage.set("userObj",data.result);
			}else{
				$.jStorage.deleteKey("userObj");
			}
		}
	});
}


//全局登录操作  根据一个特定的class判断 
//节点需添加loginUrl参数配置作为登录回调，没有此参数表示表示当前页回调
$(".jf_need_login").on("click",function(){
	var url = $(this).attr("loginUrl");
	if(checkLogin() == false){
		//设置登录成功后的回调页面
		if(url){
			$.jStorage.set("loginCallback",url);
		}else{
			$.jStorage.set("loginCallback",location.href);
		}
		location.href = "../user/login.html";
	}else{
		if(url){
			location.href = url;
		}
	}
});


//全局加入组织操作  根据一个特定的class判断
//加入组织成功后的回调页面始终是location.href
//节点需添加joinGroupUrl参数配置作为登陆后的加入组织跳转页面，没有此参数则留在当前页进行后续操作
//注：组织首页加入组织按钮除外
$(".jf_join_group").on("click",function(){
	var url = $(this).attr("joinGroupUrl");
	if(checkLogin() == true){
		var code = getRelation($.jStorage.get("groupid"));
		switch(code){
			case -2:
				alert("组织申请被拒绝！");
			break;
			case -1:
				alert("组织申请审核中！");
			break;
			case 0:
				$("#group_join_tip_box").show();
				$(".g-wrp").css("opacity","0.3");
				$.jStorage.set("groupJoinUrl",location.href);
			break;
			default:
				if(url){
					location.href = url;
				}
			break;
		}
	}else{
		$.jStorage.set("loginCallback",location.href);
		location.href = "../user/login.html";
	}
})

//关闭加入组织弹窗事件
$(".close_icon","#group_join_tip_box").on("click",function(){
	$("#group_join_tip_box").hide();
	$(".g-wrp").css("opacity","1.0");
})