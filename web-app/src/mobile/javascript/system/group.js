/* 
 * 找组织页面逻辑
 * @author:lly
 */
var gid = $.jStorage.get("groupid"),
	meid = $.jStorage.get("meid"),
	gcode = $.jStorage.get("groupcode"),
	fatherObj = $.jStorage.get("fatherObj"),
	basicurl = "http://www.hijufou.com",
	offset = 0,   //懒加载数量标示
	groupBox = $("#groupsElments"),   //组织加载容器
	keyword,   //搜索
	sortt = "memberCount",     //排序
	areaa,     //地区
	categ,     //类别
	lazyStop = false,   //懒加载是否停止标记
	useSection = false, //使用section字段代替area字段
    useArea ; //标识是否直辖市

fatherObj&&($('#sysGroupTitle').text(fatherObj.name));
//区域、类别初始化
initCategory('group',meid);
//initlocation('group',meid);

var opts=initGroupSection(meid);
if(opts){
	useSection=true;
	$("#txtArea").text(opts[0]);
	opts=opts[1];
}else{
	if(fatherObj){
		opts=initArea(fatherObj.province,fatherObj.city);
	}
	else{
		opts=[true,["滨江区","上城区","下城区","江干区","拱墅区","西湖区","萧山区","余杭区"]];
	}
	useArea=opts[0];
	opts=opts[1];
}
$("#area").append(opts);
initGroupSection=null;
initMeetSection=null;
initArea=null;
dmap=null;

//设置组织首页返回按钮
$.jStorage.set("group_back_url",location.href);

//父组织初始化
if(fatherObj){
	groupBox.before(renderGroup(fatherObj));
}

//懒加载方法
$(window).scroll(function () {
	if($(window).scrollTop()>=$(document).height()-$(window).height()-50){
		if(lazyStop == false){
			//加载小提示显示
			$("#loading_bottom").show();
			offset = offset + 6;
			getGroups(false);
		}
	}
});

//找组织初始化
getGroups();

//渲染单个组织方法
function renderGroup(data){
	var meetingCount = data.meetingCount||0;
	var str = "";
	str += "<div class='w-igrp bd06 bg04'><a href='../group/home.html?groupid="+ data.id +"'>";
	if(data.lastPhoto){
		str += "<div class='pic' style='background:#282e39 url("+ basicurl + data.lastPhoto + ") center center;background-size:cover;'></div>";
		str += "<img src='../../../../res/mobile/pic/groupmask.png' class='mask'>";
	}
	str += "<div class='dtl fc00'><p class='ttl fs04'>"+ data.name+"</p>";
	str += "<div class='par' id='grp-"+ data.id +"'></div>";
	str += "<p class='fs03'><span class='count'>"+data.memberCount+"</span>位成员<span class='point'>·</span><span>"+meetingCount+"个活动</span></p></div></a></div>"
	groupMember(data.id);
	return str;
}

//获取组织接口封装
function getGroups(isempty){
	var d = new Date();
	var month = d.getMonth() + 1;
	var time = d.getFullYear() + "-" + month + "-" + d.getDate();
	var opt = {
		tag : gcode + "#sub",
		order : "desc",
		limit : 6,
		sort : sortt,//"memberCount"
		category : categ,
		time : time,
		offset : offset,
		total : true,
		keyword : keyword
	}
	//工商大学，浙传媒定制
//	if (gcode == 'zjgsu'||gcode == 'zjicm'||gcode == 'wzdxstl') {
//		opt.section = areaa;
//	}else {
//		opt.area = areaa;
//	}
	
	//hijufouzz展示全部社团
	if(gcode== 'hijufouzz'){
		opt.tag="";
	}
	
	if (useSection) {
		opt.section = areaa;
	}else {
		if(useArea){
			opt.area = areaa;
		}else{
			opt.city = areaa;
		}
	}
	$.ajax({
	    url: "http://www.hijufou.com/rest/open/group/search",
	    type: "GET",
	    dataType: "json",
	    xhrFields: {withCredentials: true},
	    data:opt,
	    success: function(data) {
	        if(data.code == 1){
	        	$("#loading").hide();
				$("#loading_bottom").hide();
	        	if(data.result.list.length == 0){
	        		lazyStop = true;
	        	}else{
	        		lazyStop = false;
	        	}
				var groupHtml = [];
				$.each(data.result.list, function(k,v) {
					groupHtml.push(renderGroup(v));
				});
				if(isempty == false){
					groupBox.append(groupHtml.join(" "));
				}else{
					groupBox.html(groupHtml.join(" "));
				}
	        }
	    }
	});
};

//获取组织会员方法
function groupMember(id){
	$.ajax({
	    url: "http://www.hijufou.com/rest/open/group/members",
	    type: "GET",
	    dataType: "json",
	    xhrFields: {withCredentials: true},
	    data:{
	    	gid : id,
			role : 0,
			offset : 0,
			limit : 4
	    },
	    success: function(data) {
	        if(data.code == 1){
	        	var str = "";
	        	$.each(data.result.list, function(k,v) {
	        		if(v.attendee.thumbnail){
	        			str += "<img src='" + v.attendee.thumbnail + "' class='br1 f-sd'/>"
	        		}else{
	        			str += "<img src='../../../../res/mobile/pic/face50.jpg' class='br1 f-sd'/>"
	        		}
				});
				$("#grp-" + id).html(str);
	        }
	    },
	    error:function(){
	    	$("#grp-" + id).closest(".w-igrp").remove();
	    }
	});
}

//排序选择
var resort = function() {
	sortt = $("#order").val();
	var tsort = $("#order").find("option:selected").text();
	$("#txtorder").text(tsort);
	offset = 0;
	getGroups();
};
//区域选择
var reArea = function() {
	areaa = $("#area").val();
	if (areaa == null || areaa == '') {
		$("#txtArea").text("全部");
	} else {
		$("#txtArea").text(areaa);
	}
	offset = 0;
	getGroups();
};
//类别选择
var reCategory = function() {
	categ = $("#category").val();
	var categtext=document.getElementById("category");
	categtext=categtext.options[categtext.options.selectedIndex].text;
	if (categ == null || categ == '') {
		$("#txtCate").text("全部");
	} else {
		$("#txtCate").text(categtext);
	}
	offset = 0;
	getGroups();
};
//搜索
var search = function(){
	$("#searchBtn").hide();
	$("#search").show();
}
var searchResult = function(){
	var text = $("#searchInput").val();
	if(text == "") return;
	keyword = text;
	$("#searchShow p:last-child").text(text);
	$("#searchShow").show();
	$("#searchBtn").show();
	$("#search").hide();
	offset = 0;
	getGroups();
}
var searchcancel = function(){
	$("#searchShow").hide();
	keyword = "";
	offset = 0;
	getGroups();
}