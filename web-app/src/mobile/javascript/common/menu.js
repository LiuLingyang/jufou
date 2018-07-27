/*
 * 加载这个js表示该页面将有菜单
 * @author:lly
 * 
 * updata on 2014-09-14
 * @author:lly
 * @desc:将先加载菜单,请将文件放在base.js前面
 */

var objs = parseURL(),
	meid,
	groupcode;

if($.jStorage.get("meid")){
	meid = $.jStorage.get("meid");
}else{
	meid = objs.meid;
}
if($.jStorage.get("groupcode")){
	groupcode = $.jStorage.get("groupcode");
}else{
	groupcode = objs.groupcode;
}

//菜单添加
createMenu();

//获取用户信息
getUserInfo();

function getUserInfo(){
	$.ajax({
		url:"http://www.hijufou.com/rest/user/get",
		type: "POST",
		dataType: "json",
		xhrFields: {withCredentials: true},
		success: function(data) {
			if(data.code == 1){
				menuLater(data.result);
			}
		},
		error:function(){
			menuLater();
		}
	});
}

function createMenu(){
	var str = 
    "<div class='g-lmenu js-time' id='hijufou-menu'>\
      <a href='javascript:closemenu()' class='close_menu_btn'><img src='../../../../res/mobile/pic/close_icon.png'/></a>\
	  <div class='fc00 menuhead'>\
	  	<div class='dtl'>\
	  	  <div class='img' id='menu_userlogo'></div>\
	  	  <p class='gna fc00' id='menu_username'>未登录</p>\
	  	</div>\
	  </div>\
	  <div class='f-cb'></div>\
	  <div class='itm'><a href='javascript:;' class='jf_need_login' loginUrl='http://www.hijufou.com/m/user/meeting.html'><p class='fc00 f-bg c c1 bd07'>我的活动</p></a></div>\
	  <div class='itm'><a href='javascript:;' class='jf_need_login' loginUrl='http://www.hijufou.com/m/user/group.html'><p class='fc00 f-bg c c7 bd07'>我的组织</p></a></div>\
	  <div class='itm'><a href='../system/group.html'><p class='fc00 f-bg c c2 bd07'>找组织</p></a></div>\
	  <div class='itm'><a href='../system/meet.html'><p class='fc00 f-bg c c3 bd07'>找活动</p></a></div>\
	  <div class='itm'><a class='jf_need_login' loginUrl='http://www.hijufou.com/m/user/message.html'><p class='fc00 f-bg c c4 bd07'>消息通知</p></a></div>\
	  <div class='itm'><a class='jf_need_login' loginUrl='http://www.hijufou.com/m/user/setUp.html'><p class='fc00 f-bg c c5 bd07'>设置</p></a></div>\
	  <div class='itm'>\
	  	<div id='menu_login'>\
	  	  <a href='javascript:;' class='fc04 jf_need_login'><p class='fc00 f-bg c c6 bd07'>登录</p></a>\
	  	</div>\
	  	<div id='menu_loginout' style='display:none;'>\
	  	  <a href='javascript:logout();' class='fc05'><p class='fc00 f-bg c c6 bd07'>登出</p></a>\
	  	</div>\
	  </div>\
	</div>"
	$("body").append(str);
}

function menuLater(userObj){
	if(userObj != null){
		$("#menu_loginout").show();
		$("#menu_login").hide();
		$("#menu_userlogo").html("<img class='bg00 portrait' src='"+ userObj.thumbnail +"'/>");
		$("#menu_username").text(userObj.nickname);
	}else{
		$("#menu_userlogo").html("<div class='bg00 portrait'></div>");
	}
};


/*现统一菜单，菜单可配置功能暂时取消
var menulist = function(types,oid,grpcode) {
	var arr = new Array();
	$.each(types, function(key, val) {
		
		if (val == 'meet') {//找活动
			var url = "../system/meet.html?groupid=" + oid + "&meid=" + oid + "&groupcode=" + grpcode;
			var m = $("<div class='itm'><a href='" + url +"'><p class='fc00 f-bg c c3 bd07'>找活动</p></a></div>");
			arr.push(m);
		}
		if (val == 'org') {//找组织	
			var url = "../system/group.html?groupid=" + oid + "&meid=" + oid + "&groupcode=" + grpcode;
			var m = $("<div class='itm'><a href='" + url +"'><p class='fc00 f-bg c c2 bd07'>找组织</p></a></div>");
			arr.push(m);
		}
		if (val == 'mymsg') {//消息通知
			var m = $("<div class='itm'><a href='javascript:checkLogin(\"../user/message.html?groupid="+oid + "&meid="+ oid + "&groupcode=" + grpcode + "\",true);'><p class='fc00 f-bg c c4 bd07'>消息通知</p></a></div>");
			arr.push(m);
		}
		if (val == 'mymeet') {//我的活动
			var m = $("<div class='itm'><a href='javascript:checkLogin(\"../user/meeting.html?groupid="+oid + "&meid=" + oid +"&groupcode=" + grpcode + "\",true);'><p class='fc00 f-bg c c1 bd07'>我的活动</p></a></div>");
			arr.push(m);
		}
		if (val == 'setting'){//设置
			var m = $("<div class='itm'><a href='javascript:checkLogin(\"../user/setUp.html?groupid="+oid + "&meid=" + oid +"&groupcode=" + grpcode + "\",true);'><p class='fc00 f-bg c c5 bd07'>设置</p></a></div>");
			arr.push(m);
		}
	});
	return arr;
};
*/