/* 
 * 找活动页面逻辑
 * @author:lly
 */
var gid = $.jStorage.get("groupid"),
	gcode = $.jStorage.get("groupcode"),
	fatherObj = $.jStorage.get("fatherObj"),
	basicurl = "http://www.hijufou.com",
	offset = 0,   //懒加载数量标示
	meetBox = $("#meetsElments"),   //活动加载容器
	keyword,   //搜索
	sortt = "startTime",     //排序
	areaa,     //地区
	categ,     //类别
	lazyStop = false,   //懒加载是否停止标记
	noresultBox = $("#noresult"),   //无结果容器
	useSection = false, //使用section字段代替area字段
	useArea ; //标识是否直辖市

fatherObj&&($('#sysGroupTitle').text(fatherObj.name));
//活动首页返回按钮url
$.jStorage.set("meet_back_url",location.href);

//区域、类别初始化
//initlocation('meet',gid);
initCategory('meet',gid);

var opts=initMeetSection(meid);
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

//懒加载方法
$(window).scroll(function () {
	if($(window).scrollTop()>=$(document).height()-$(window).height()-50){
		if(lazyStop == false){
			//加载小提示显示
			$("#loading_bottom").show();
			offset = offset + 6;
			getMeets(false);
		}
	}
});

//找活动初始化
getMeets(true);

//渲染单个活动方法
function renderMeet(data){
	var commentCount = data.commentCount||0;
	var joinCount = data.joinCount||0;
	var startTime = new Date(data.startTime);
	var time = dateFormat(startTime, "isoDateTime");
	var day = getWeekday(startTime.getDay());
	time = time + " " + day;
	var str = "";
	str ="<div class='w-imet bd06 bg04'>\
		    <a href='../meeting/detail.html?meetid=" + data.id + "'>\
			  <img src='" + basicurl + data.cover + "' class='pic'>\
			  <img src='../../../../res/mobile/pic/meetingmask.png' class='mask'>\
			  <div class='dtl fc00'>\
			    <p class='ttl fs04'>" + data.title + "</p>\
			    <div class='inf fs01 bd05'>\
			      <p>" + time + "<span class='loc'>" + data.area + "</span></p>\
			      <p class='ln'>" + joinCount + "人参加<span class='point'>·</span>" + commentCount + "条评论</p>\
			    </div>\
			    <p class='pos'>\
			      <img src='" + basicurl + data.group.thumbnail + "' class='logo br1 bg04 f-sd'>\
			      <span class='gnam f-tf fs01'>" + data.group.name + "</span>\
			    </p>\
			  </div>\
			</a>\
	      </div>"
	return str;
}

//获取活动接口封装
function getMeets(isempty){
	var d = new Date();
	var month = d.getMonth() + 1;
	var stime = d.getFullYear() + "-" + month + "-" + d.getDate();
	var etime = d.getFullYear()+1 + "-" + month + "-" + d.getDate();
	var opt = {
		tag : gcode,
		order : "desc",
		limit : 6,
		sort : sortt,
		category : categ,
		startTime : stime,
		endTime:etime,
		offset : offset,
		total : true,
		keyword : keyword
	}

	//hijufouzz展示从过去到未来的所有活动
	if(gcode=="hijufouzz"){
		opt.tag="";
		opt.sort="joinCount";
		opt.startTime="";
		opt.endTime="";
	}

	//工商大学，浙传媒定制
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
	    url: "http://www.hijufou.com/rest/open/meeting/search",
	    type: "GET",
	    dataType: "json",
	    xhrFields: {withCredentials: true},
	    data:opt,
	    success: function(data) {
	        if(data.code == 1){
				$("#loading_bottom").hide();
	        	$("#loading").hide();
	        	if(data.result.list.length == 0){
	        		lazyStop = true;
	        		if(isempty == true){
	        			noresultBox.show();
	        		}
	        	}else{
	        		lazyStop = false;
	        		noresultBox.hide();
	        	}
				var meetHtml = [];
				$.each(data.result.list, function(k,v) {
					meetHtml.push(renderMeet(v));
				});
				if(isempty == false){
					meetBox.append(meetHtml.join(" "));
				}else{
					meetBox.html(meetHtml.join(" "));
				}
	        }
	    }
	});
};

//排序选择
var resort = function() {
	sortt = $("#order").val();
	var tsort = $("#order").find("option:selected").text();
	$("#txtorder").text(tsort);
	offset = 0;
	getMeets(true);
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
	getMeets(true);
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
	getMeets(true);
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
	getMeets(true);
}
var searchcancel = function(){
	$("#searchShow").hide();
	keyword = "";
	offset = 0;
	getMeets(true);
};