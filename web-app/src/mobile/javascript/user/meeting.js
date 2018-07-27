/* 
 * 我的活动页面逻辑
 * @author:lly
 */
var gid = $.jStorage.get("groupid"),
	userObj = $.jStorage.get("userObj"),
	basicurl = "http://www.hijufou.com",
	loadingBox = $("#loading"),   //loading容器
	renderBox = $("#tlist"),      //数据容器
	noresultBox = $("#nomeeting"), //无结果容器
	upcomeBtn = $("#upcome"),     //即将开始按钮
	finishBtn = $("#finish"),     //已经结束按钮
    filter = 0,   //初始化为所有活动
    grop = "all",   //我的组织初始化为所有
    type = 0;     //初始化为即将开始活动
    
//直接进入我的活动时的登录操作
if(checkLogin() == false){
	$.jStorage.set("loginCallback",location.href);
	location.href = "../user/login.html";
}

//活动首页返回按钮url
$.jStorage.set("meet_back_url",location.href);

//我的组织
$.ajax({
	url : "http://www.hijufou.com/rest/group/list",
	type : "POST",
	dataType : "json",
	xhrFields: {withCredentials: true},
	data : {uid:userObj.id},
	success : function(data) {
		if (data.code == 1) {
			var arr = data.result.list;
			$.each(arr, function(i, item) {
				var itm = "<option value='" + item.id + "'>" + item.name + "</option>";
				$("#groupall").append(itm);
			});
		}
	}
});

//tab切换及初始化
renderMyMeeting();
finishBtn.click(function() {
	type = 1;
	upcomeBtn.removeClass("js-selected");
	finishBtn.addClass("js-selected");
	renderMyMeeting();
});
upcomeBtn.click(function() {
	type = 0;
	finishBtn.removeClass("js-selected");
	upcomeBtn.addClass("js-selected");
	renderMyMeeting();
});


var remeet = function() {
	filter = $("#meetingall").val();
	var tfilt = $("#meetingall").find("option:selected").text();
	$("#meetingname").text(tfilt);
	renderMyMeeting();
};

var regroup = function() {
	grop = $("#groupall").val();
	var tgrop = $("#groupall").find("option:selected").text();
	$("#groupname").text(tgrop);
	renderMyMeeting();
};

function renderMyMeeting(){
	renderBox.hide();
	noresultBox.hide();
	loadingBox.show();
	var opt = {
		filter : filter,
		type : type,
		limit : 1000,
		offset : 0,
		total : true
	}
	$.ajax({
	    url: "http://www.hijufou.com/rest/meeting/host",
	    type: "POST",
	    dataType: "json",
	    xhrFields: {withCredentials:true},
	    data: opt,
	    success: function(data) {
	        if(data.code == 1){
	        	loadingBox.hide();
        		var meetHtml = [];
        		$.each(data.result.list, function(i, item) {
					var time = dateFormat(new Date(item.startTime), "isoDateTime");
					var joinCount = item.joinCount||0;
					var commentCount = item.commentCount||0;
					var photoCount = item.photoCount||0;
					
					var partHtml = "<a href='../meeting/detail.html?meetid="+ item.id +"'><div class='w-mlst f-cb bg00 bd07'><div class='fl bg04 img' style='background:url("+ basicurl + item.cover +") center center;background-size:cover;'></div>" + 
		          	"<div class='dtl'><p class='fs04 ln1 fc03'>"+ item.title +"</p><p class='fs02 fc04 ln2 f-bg'>"+time+"</p>" + 
		          	"<p class='fs02 fc04 ln3 f-bg'>" + item.address +"</p><div class='pos fc05 fs02'>"+joinCount +"人参加<span class='point'>·</span>" + 
		          	 commentCount +"评论<span class='point'>·</span>" + photoCount +"图片</div></div></div></a>";
					
					//选择我的组织时过滤
					if(grop == "all"){
						meetHtml.push(partHtml);
					}else{
						if(grop == item.group.id){
							meetHtml.push(partHtml);
						}
					}
				});
				if(meetHtml.length == 0){
					renderBox.hide();
        			noresultBox.show();
				}else{
					noresultBox.hide();
        			renderBox.show();
					renderBox.html(meetHtml.join(""));
				}
	        }
	    }
	});
};