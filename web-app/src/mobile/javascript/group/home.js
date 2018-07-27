/* 
 * 组织首页页面逻辑
 * @author:lly
 * 
 * Update on 2014-10-12
 * @author:lly
 * @desc:组织名片、退出组织
 */
var gid = $.jStorage.get("groupid"),
	groupcode = $.jStorage.get("groupcode"),
	groupObj = $.jStorage.get("groupObj"),
	userObj = $.jStorage.get("userObj"),
	loadingBox = $("#loading"),
	renderBox = $("#tlist"),
	noresultBox = $("#noresult"),
	basicurl = "http://www.hijufou.com";

groupObj&&($('#groupTitle').text(groupObj.name));
//个人中心
$(".user_center").on("click",function(){
	$(this).next().show();
})
//组织名片链接添加
if(userObj){$(".group_card").attr("href","member.profile.html?uid="+userObj.id);}

//活动首页返回按钮url
$.jStorage.set("meet_back_url",location.href);

//返回按钮控制
if(!groupcode){
	$("#home_back_btn").hide();
}
var group_back_url = $.jStorage.get("group_back_url")
if(group_back_url){
	$("#home_back_btn").attr("href",group_back_url);
}

//退出组织
$(".group_exit").on("click",function(){
	$.ajax({
	    url: "http://www.hijufou.com/rest/group/exit",
	    type: "POST",
	    dataType: "json",
	    xhrFields: {withCredentials: true},
	    data: {gid:gid},
	    success: function(data) {
	        location.reload();
	    }
	});
})

//组织信息预填
function setGroupInfo(data){
	if (data.thumbnail) {
		var logo = '<img src="'+ basicurl + data.thumbnail +'">';
	}
	if(data.lastPhoto){
		var laPhoto = "<div class='pic' style='background:#282e39 url("+ basicurl + data.lastPhoto + ") center center;background-size:cover;'></div>"
	}
	$("#lsPhoto").append(laPhoto);  
	$("#logo").append(logo);
	$("#groupname").text(data.name);
	$("#city").text(data.city + data.area);
	$("#membership").text(data.memberCount);
	
	//组织会员预填
	var opt = {
		gid : gid,
		role : 0,
		offset : 0,
		limit : 4
	}
	$.ajax({
	    url: "http://www.hijufou.com/rest/open/group/members",
	    type: "POST",
	    dataType: "json",
	    xhrFields: {withCredentials: true},
	    data: opt,
	    success: function(data) {
	        if(data.code == 1){
	        	$.each(data.result.list, function(k,v) {
					var portrait = "../../../../res/mobile/pic/face50.jpg";
					if (v.attendee.thumbnail != null) {
						portrait = v.attendee.thumbnail;
					}
					var vhtml = "<img src='" + portrait +"' class='br1'>";
					$("#memeberall").append(vhtml);
				});
	        }
	    }
	});
}
setGroupInfo(groupObj);

//加入组织按钮状态判断
function linkbtnState(){
	var linkBtn = $("#joinLink");
	if(checkLogin() == false){
		linkBtn.on("click",function(){
			$.jStorage.set("loginCallback",location.href);
			location.href = "../user/login.html";
		})
	}else{
		var code = getRelation(gid);
		switch(code){
			case -2:
				linkBtn.text("申请已被拒绝");
				linkBtn.removeAttr("onclick");
			break;
			case -1:
				linkBtn.text("申请等待审批");
				linkBtn.removeAttr("onclick");
			break;
			case 0:
				$.jStorage.set("groupJoinUrl",location.href);
				linkBtn.on("click",function(){
					location.href = "../group/joinintroduce.html";
				});
			break;
			case 1:
			case 2:
			case 3:
				linkBtn.hide();
				$(".user_center").show();
			break;
		}
	}
}
linkbtnState();

//tab切换以及初始化
function getlist(type){
	renderBox.hide();
	noresultBox.hide();
	loadingBox.show();
	var opt = {
		order : "desc",
		sort : "startTime",
		gid : gid,
		type : type,
		limit : 1000,
		offset : 0,
		total : true
	}
	if (type == 0) {
		$("#finish").removeClass("js-selected");
		$("#upcome").addClass("js-selected");
	} else {
		$("#upcome").removeClass("js-selected");
		$("#finish").addClass("js-selected");
	}
	
	$.ajax({
	    url: "http://www.hijufou.com/rest/open/meeting/list",
	    type: "POST",
	    dataType: "json",
	    xhrFields: {withCredentials: true},
	    data: opt,
	    success: function(data) {
	        if(data.code == 1){
	        	loadingBox.hide();
	        	var arr = data.result.list;
				if(arr.length == 0){
					renderBox.hide();
					noresultBox.show();
				}else{
					noresultBox.hide();
					renderBox.show();
					var meetHtml = [];
					$.each(arr, function(i, item) {
						var str = "";
						var startTime = new Date(item.startTime);
						var time = dateFormat(startTime, "isoDateTime");
						var meetpic = "";
						if (item.cover != null) {
							meetpic = "http://www.hijufou.com" + item.cover;
						}
						if(item.joinCount == null){
							item.joinCount = 0;
						}
						if (item.commentCount == null) {
							item.commentCount = 0;
						}
						if (item.photoCount == null) {
							item.photoCount = 0;
						}
						str = "<a href='../meeting/detail.html?meetid="+ item.id +"'><div class='w-mlst f-cb bg00 bd07'><div class='fl bg04 img' style='background:#282e39 url("+ meetpic + ") center center;background-size:cover;'></div>" + 
			          	"<div class='dtl'><p class='fs04 ln1 fc03'>"+ item.title+"</p><p class='fs02 fc04 ln2 f-bg'>" + time +"</p><p class='fs02 fc04 ln3 f-bg'>"+ item.address+
			          	"</p><div class='pos fc05 fs02'>" + item.joinCount +"人参加<span class='point'>·</span>" + item.commentCount +"评论<span class='point'>·</span>" + item.photoCount + 
			          	"张图片</div></div></div></a>";
			          	meetHtml.push(str);
					});
					renderBox.html(meetHtml.join(""));
				}
	        }
	    }
	});
};



function display(type,arr){
	renderBox.hide();
	noresultBox.hide();
	loadingBox.show();
	if (type == 0) {
		$("#finish").removeClass("js-selected");
		$("#upcome").addClass("js-selected");
	} else {
		$("#upcome").removeClass("js-selected");
		$("#finish").addClass("js-selected");
	}
	loadingBox.hide();

	if(arr.length == 0){
		renderBox.hide();
		noresultBox.show();
	}else{
		noresultBox.hide();
		renderBox.show();
		var meetHtml = [];
		$.each(arr, function(i, item) {
			var str = "";
			var startTime = new Date(item.startTime);
			var time = dateFormat(startTime, "isoDateTime");
			var meetpic = "";
			if (item.cover != null) {
				meetpic = "http://www.hijufou.com" + item.cover;
			}
			if(item.joinCount == null){
				item.joinCount = 0;
			}
			if (item.commentCount == null) {
				item.commentCount = 0;
			}
			if (item.photoCount == null) {
				item.photoCount = 0;
			}
			str = "<a href='../meeting/detail.html?meetid="+ item.id +"'><div class='w-mlst f-cb bg00 bd07'><div class='fl bg04 img' style='background:#282e39 url("+ meetpic + ") center center;background-size:cover;'></div>" + 
          	"<div class='dtl'><p class='fs04 ln1 fc03'>"+ item.title+"</p><p class='fs02 fc04 ln2 f-bg'>" + time +"</p><p class='fs02 fc04 ln3 f-bg'>"+ item.address+
          	"</p><div class='pos fc05 fs02'>" + item.joinCount +"人参加<span class='point'>·</span>" + item.commentCount +"评论<span class='point'>·</span>" + item.photoCount + 
          	"张图片</div></div></div></a>";
          	meetHtml.push(str);
		});
		renderBox.html(meetHtml.join(""));
	}
}

//计算未开始或已开始活动的总数
function showMeetings(type){
	var opt = {
		order : "desc",
		sort : "startTime",
		gid : gid,
		type : type,
		limit : 1000,
		offset : 0,
		total : true
	};
	$.ajax({
	    url: "http://www.hijufou.com/rest/open/meeting/list",
	    type: "POST",
	    dataType: "json",
	    xhrFields: {withCredentials: true},
	    data: opt,
	    success: function(data) {
	    	if(data.code==1){
	    		var arr1 = data.result.list;
				if(arr1.length == 0){
					opt.type=0;
					$.ajax({
					    url: "http://www.hijufou.com/rest/open/meeting/list",
					    type: "POST",
					    dataType: "json",
					    xhrFields: {withCredentials: true},
					    data: opt,
					    success:function(data){
					    	var arr0=data.result.list;
					    	//显示即将开始的活动
					    	display(0,arr0);
					    	
					    }
					});
					//显示列表 
				}else{
					opt.type=0;
					$.ajax({
					    url: "http://www.hijufou.com/rest/open/meeting/list",
					    type: "POST",
					    dataType: "json",
					    xhrFields: {withCredentials: true},
					    data: opt,
					    success:function(data){
					    	var arr0=data.result.list;
					    	if(arr0.length==0){
					    		//显示已结束的活动
					    		display(1,arr1);
					    	}else{
					    		//显示即将开始的活动
					    		display(0,arr0);
					    	}

					    }
					});

				}
	    	}
	    }
	});    
}


showMeetings(1);

// getlist(0);
$("#finish").click(function() {
	getlist(1);
});
$("#upcome").click(function() {
	getlist(0);
});

//浙理工临时要求
if(groupObj.customTag=="zjlgdxstl#sub"||groupObj.customTag=="zjlgdxstl"){
	$("#joinLink").hide();
}