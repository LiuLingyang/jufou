var mid = $.jStorage.get("meetid");
var groupcode = $.jStorage.get("groupcode");
var meetplace = "未知区域";
var attendBtn = $("#attendLink");
var basicurl = "http://www.hijufou.com";

//报名按钮状态
attendState();

//返回按钮设置
console.log($.jStorage.get("meet_back_url"))
$("#meet_back_btn").attr("href",$.jStorage.get("meet_back_url"));

function attendState(){
	if(checkLogin() == false){
		attendBtn.text("请先登录");
		attendBtn.addClass("jf_need_login");
		attendBtn.attr("loginUrl",location.href);
		$(".jf_need_login").bind("click",function(){
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
	}else{
		$.ajax({
		    url: "http://www.hijufou.com/rest/meeting/attendable",
		    type: "POST",
		    dataType: "json",
		    xhrFields: {withCredentials: true},
		    data:{mid:mid},
		    success: function(data) {
		        var code = data.code;
				if(code == 1){
					attendBtn.attr("href","apply.html");
					var sta = data.result.state;
					if (sta == 0) {
						attendBtn.text("我要报名");
					} else if (sta == 1) {
						attendBtn.text("不参加");
					} else if (sta == 2) {
						attendBtn.text("已参加");
					}
				}else if (code == -303) {
					attendBtn.text("人员已满");
					attendBtn.attr("href","#");
				} else if (code == -307) {
					attendBtn.text("报名未开始");
					attendBtn.attr("href","#");
				} else if (code == -308) {
					attendBtn.text("报名已结束");
					attendBtn.attr("href","#");
				} else if (code == -305) {
					attendBtn.text("已被拒绝");
					attendBtn.attr("href","#");
				} else if (code == -309) {
					attendBtn.text("仅允许会员加入");
					attendBtn.attr("href","#");
				} else if (code == -310) {
					attendBtn.text("仅允许邀请加入");
					attendBtn.attr("href","#");
				} else if (code == -306) {
					attendBtn.text("已取消");
					attendBtn.attr("href","#");
				}
		    }
		});
	}
}

$.getJSON("http://www.hijufou.com/rest/open/meeting/get", {
	mid : mid,
	details : 1
}, function(data) {
	var meetinfo = data.result.meeting;
	var title = meetinfo.title;
	var groupname = meetinfo.group.name;
	var address = meetinfo.city + meetinfo.area + meetinfo.address;
	var details = meetinfo.details;
	if(details == null){
		$("#detail").hide();
	}
	meetplace = address;
	$("#grouptitle").text(groupname);
	$("#meettitle").text(title);
	$("#address").text(address);
	$("#linkgroupname").text(groupname);
	var feedesc = "";
	if (meetinfo.fee.desc != null) {
		feedesc = meetinfo.fee.desc;
	}
	var feeitem = "";
	if(meetinfo.fee.type == 0){
		feeitem = "免费";
	}else if(meetinfo.fee.type == 1){
		feeitem = "AA制";
	}else{
		var fees = meetinfo.fee.item.split("|");
		$.each(fees, function(i, item) {
			if (feeitem == "") {
				feeitem = item.replace("@", "") + "元/人";
			} else {
				feeitem = feeitem + "<br/>" +item.replace("@", "") + "元/人";	
			}
		});
	}

	if (meetinfo.commentCount == 0) {
		$("#commentCount").remove();
	}
	var ccot = meetinfo.commentCount;
	if (meetinfo.photoCount == 0) {
		$("#photoCount").remove();
	}
	var pcot = meetinfo.photoCount;

	var jpre = meetinfo.joinPermission;
	switch (jpre) {
		case 0:
			$("#permission").parent().remove();
			break;
		case 1:
			$("#permission").text("*仅限会员");
			break;
		case 2:
			$("#permission").text("*会员+邀请");
			break;
	}

	if (meetinfo.joinLimit == 0) {
		$("#joinLimit").parent().remove();
	}
	var jlimit = meetinfo.joinLimit - meetinfo.joinCount;
	if (meetinfo.observerLimit == 0) {
		$("#observerLimit").parent().remove();
	}
	var olimit = meetinfo.observerLimit;
	var jcot = meetinfo.joinCount;
	if(jcot == 0){
		$("#member").hide();
	}
	
	//活动时间设置
	var meetingTime;
	var eTime,endTime,eday;
	var sTime = dateFormat(meetinfo.startTime, "isoDateTime");
	var startTime = new Date(meetinfo.startTime);
	var sday = getWeekday(startTime.getDay());
	if (meetinfo.endTime != 0) {
		eTime = dateFormat(meetinfo.endTime, "isoDateTime");
		endTime = new Date(meetinfo.endTime);
		eday = getWeekday(endTime.getDay());
		meetingTime = sTime + " " + sday + "--" + eTime + " " + eday;
	}else{
		meetingTime = sTime + "--23:59" + " " + sday;
	}
	
	var cover = "";
	if (meetinfo.cover != null) {
		cover = basicurl + meetinfo.cover;
		$("#meetingcover").attr("src", cover);
	}
	else
	{
		$("#meetingcover").hide();
	}
	var logo = basicurl + meetinfo.group.thumbnail;
	$.jStorage.set("groupid", meetinfo.group.id);
	var url = "../group/home.html?groupid=" + meetinfo.group.id;
	$("#grouplogo").attr("src", logo);
	$("#grouplink").attr("href", url);
	$("#feeItem").html(feeitem);
	$("#feeDesc").text(feedesc);
	$("#time").text(meetingTime);
	$("#commentCount").text(ccot);
	$("#photoCount").text(pcot);
	$("#joinLimit").text(jlimit);
	$("#observerLimit").text(olimit);
	$("#joinCount").text(jcot);
	$("#dtls").html(details);

});

$.getJSON("http://www.hijufou.com/rest/open/meeting/attendees", {
	mid : mid,
	type : 0,
	limit : 4
}, function(data) {
	var users = data.result.list;
	$.each(users, function(i, item) {
		var meetjoin = "../../../../res/mobile/pic/face50.jpg";
		if (item.attendee.thumbnail != null) {
			meetjoin = item.attendee.thumbnail;
		}
		var portrait = "<img class='f-sd br1' src='" + meetjoin + "'/>";
		$("#membership").append(portrait);
	});
});