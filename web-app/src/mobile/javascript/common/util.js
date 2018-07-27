
/*
 * getRole:获取用户在组织里的身份
 * getSex:获取用户性别
 * parseURL:解析地址，如果有键值对则返回一个数组，否则返回地址
 * getWeekday:获取星期
 * initlocation:地区初始化
 * initCategory:类别初始化
 * htmlDecode:
 * htmlEncode:实体转换
 * getRelation:获取用户在组织中的身份
 * showmenu:滑出菜单
 * closemenu:关闭菜单
 * checkLogin:登录判断
 * logout:登出
 * 
 */

var getRole = function(rid) {
	if (rid == 0)
		return "非会员";
	if (rid == 1)
		return "会员";
	if (rid == 2)
		return "管理员";
	if (rid == 3)
		return "创建者";
};

var getSex = function(sid) {
	if(sid == 1)
		return "女";
	if(sid == 0)
		return "男";
};

var parseURL = function (){
    var url = location.href;
    var i = url.indexOf('?');
    if(i == -1){
    	return url;
    }else{
    	var querystr = url.substr(i+1);
    	querystr=querystr.replace(/\#/g,'&');  
	    var arr1 = querystr.split('&');
	    var arr2=new Object();
	    for  (i in arr1){
	        var ta = arr1[i].split('=');
	        arr2[ta[0]] = ta[1];
	    }
	    return arr2;
    }
};

var getWeekday = function(n){
	switch (n) {
		case 1 : return '周一';
		case 2 : return '周二';
		case 3 : return '周三';
		case 4 : return '周四';
		case 5 : return '周五';
		case 6 : return '周六';
		case 0 : return '周日';
		default : return '';
	}
};

var initlocation = function (type,gid) {
	var location = "";
	$("#txtArea").text("区域");
	switch (gid) {
		case "157" : 
			$("#txtArea").text("学院");
			if (type == 'meet') {
				location = "院级活动#校级活动";
			} else if (type == 'group') {
				location = "校团委#校管社团#体工部#财会学院#法学院#工商管理学院#公共管理学院#杭州商学院#环境学院#信电学院#金融学院#"
			          +"经济学院#旅游学院#人文学院#日语学院#食品学院#统计学院#外国语学院#信息学院#艺术学院#章乃器学院";
			}
		break;
		case "480" :
			if(type == 'group') {
				location = "下沙社团#桐乡社团";
			}
		break;
		case "2362":
			$("#txtArea").text("部门");
			location = "学术科技中心#体育文化中心#实践服务中心#文娱艺术中心";
		break;
		default : 
			location = "滨江区#上城区#下城区#江干区#拱墅区#西湖区#萧山区#余杭区";
		break;
	}
	droplocation(location);
};

var initCategory = function (type,gid) {
	var category = "";
	switch (gid) {
		case "157" : 
			if (type == 'meet') {
				category = "公益服务#公益服务#创业就业#创业就业#职场商务#职场商务#互动讲座#互动讲座#理论研究#理论研究#文娱兴趣#文娱兴趣";
			} else if (type == 'group') {
				category = "商贸实践#商贸实践#理论学习#理论学习#公益服务#公益服务#文娱兴趣#文体兴趣#学术科技#学术科技";
			}
		break;
		case "1965":
			category="文娱兴趣#文娱兴趣#理论学习#理论学习#学术科技#学术科技#公益服务#公益服务";
		break;
		default : 
			category = "文娱兴趣#体育运动#公益服务#理论学习#学术科技#商贸实践#创业就业#职场商务#展览讲座#电影音乐#戏剧舞台#聚会沙龙#户外旅行#其他";
		break;
	}
	dropCategory(category,gid);
};

var droplocation = function (location) {
	var arr = location.split("#");
	$.each(arr, function(i, item) {
		var op = "<option value='" + item + "'>" + item + "</option>";
		$("#area").append(op);
	});
};

var dropCategory = function (category,gid) {
	var arr = category.split("#");
	switch (gid) {
	case "1965":
	case "157" : 
		for(var i=0;i<arr.length;i=i+2){
			var op = "<option value='" + arr[i] + "'>" + arr[i+1] + "</option>";
			$("#category").append(op);
		}
		break;
	default:
		$.each(arr, function(i, item) {
			var op = "<option value='" + item + "'>" + item + "</option>";
			$("#category").append(op);
		});	
	}
	
};

var htmlDecode = function(b) {
    var a = "";
    if (b.length == 0) {
        return ""
    }
    a = b.replace(/&amp;/g, "&");
    a = a.replace(/&lt;/g, "<");
    a = a.replace(/&gt;/g, ">");
    a = a.replace(/&#040;/g, "(");
    a = a.replace(/&#041;/g, ")");
    a = a.replace(/&nbsp;/g, " ");
    a = a.replace(/'/g, "'");
    a = a.replace(/&quot;/g, '"');
    a = a.replace(/<br>/g, "\n");
    return a
};

var htmlEncode = function(b) {
    var a = "";
    if (b.length == 0) {
        return ""
    }
    a = b.replace(/\&/g, "&amp;");
    a = a.replace(/</g, "&lt;");
    a = a.replace(/>/g, "&gt;");
    a = a.replace(/\(/g, "&#040;");
    a = a.replace(/\)/g, "&#041;");
    a = a.replace(/ /g, "&nbsp;");
    a = a.replace(/\'/g, "'");
    a = a.replace(/\"/g, "&quot;");
    return a
};

/* 返回值说明：
 * -2:申请被拒绝
 * -1:审核中
 *  0:非会员
 *  1:会员
 *  2:管理员
 *  3:创建者
 */
var getRelation = function(gid) {
	var code;
	$.ajax({
        url: "http://www.hijufou.com/rest/group/relation",
        type: "POST",
        dataType: "json",
        xhrFields: {withCredentials: true},
        async: false,
        data:{gid:gid},
        success: function(data) {
            if(data.code==1){
				code = data.result;
			}
        }
    });
    return code;
};

var showmenu = function() {
	$("#hijufou-menu").addClass('js-out');
	$("#hijufou-menu").find(".close_menu_btn").show();
};

var closemenu = function(){
	$("#hijufou-menu").removeClass('js-out');
	$("#hijufou-menu").find(".close_menu_btn").hide();
};

var checkLogin = function(){
	var logined = false;
	$.ajax({
        url: "http://www.hijufou.com/rest/open/user/session",
        type: "POST",
        dataType: "json",
        xhrFields: {withCredentials: true},
        async: false,
        success: function(data) {
            if (data.result == true) {
        		logined = true;
         	}
        }
    });
    return logined;
}

var logout = function() {
	$.ajax({
		url : "http://www.hijufou.com/rest/user/logout",
		type : "POST",
		dataType: "json",
		xhrFields: {withCredentials: true},
		success : function(data) {
			if (data.code == 1) {
		    	$.jStorage.deleteKey("userObj");
				location.reload();
			}
		}
	});
};