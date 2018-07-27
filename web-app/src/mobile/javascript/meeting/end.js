var objs = parseURL();
var oid;
$.jStorage.set("enter", 1);
var url = location.href;
$.jStorage.set("preLink", url);
var reflag = 0;
var meetplace = "未知区域";
var details = ""
var userid;

$("#mapdiv").hide();
if (objs != null) {
	oid = objs["meetid"];
	if (oid != null) {
		$.jStorage.set("meetid", oid);
	} else {
		oid = $.jStorage.get("meetid");
	}
} else {
	oid = $.jStorage.get("meetid");
}
var joinedMeet = $.jStorage.get("joinedMeet");

var latitude = 39.982163;
var longitude = 116.306070;

var baseURL = "http://www.hijufou.com";
$('img.lazy').attr('src', '../../../../res/mobile/pic/loading.gif');

$.getJSON("http://www.hijufou.com/rest/open/meeting/get", {
	mid : oid,
	details : 1
}, function(data) {
	var meetinfo = data.result.meeting;
	var title = meetinfo.title;
	var groupname = meetinfo.group.name;
	var address = meetinfo.city + meetinfo.area + meetinfo.address;
	var digest = '';
	if(!!meetinfo.digest){
		digest = htmlDecode(meetinfo.digest);
	}
	details = meetinfo.details;
	meetplace = address;
	if(details == null){
		$("#detail").hide();
	}
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
		cover = baseURL + meetinfo.cover;
		$("#meetingcover").attr("src", cover).trigger("show");
	}
	else
	{
		$("#meetingcover").hide();
	}
	var logo = baseURL + meetinfo.group.thumbnail;
	$.jStorage.set("groupid", meetinfo.group.id);
	var url = "../group/home.html?userid=" + userid + "&groupid=" + meetinfo.group.id + "&re=1";
	var graderCount = meetinfo.graderCount;
	var gradeTotal = meetinfo.gradeTotal;
	var score = 0;
	if (graderCount > 0) {
		score = Math.round(gradeTotal/graderCount);
	}
	 
	$("#grouplogo").attr("src", logo);
	$("#grouplink").attr("href", url);
	$("#grouptitle").text(groupname);
	$("#grouptitle2").text(groupname);
	$("#meettitle").text(title);
	$("#address").text(address);
	$("#linkgroupname").text(groupname);
	$("#feeItem").html(feeitem);
	$("#feeDesc").text(feedesc);
	$("#time").text(meetingTime);
	//$("#endTime").text("结束:" + eTime);
	$("#commentCount").text(ccot);
	$("#photoCount").text(pcot);
	$("#joinLimit").text(jlimit);
	$("#observerLimit").text(olimit);
	$("#joinCount").text(jcot);
	$("#dtls").text(digest);
	$("#scoreNbr").text(graderCount);
	$.jStorage.set("meettitle", title);
	$.jStorage.set("meetObj", meetinfo);
	
	$("#weixinTitle").text(title);
	//var map = new qq.maps.Map(document.getElementById('container'), {zoom: 15});
	//var myLatLng = new qq.maps.LatLng( meetinfo.latitude,meetinfo.longitude);
	//map.panTo(myLatLng);
	var count=0;
	for (var i = 1; i <= score; i++) {
		var star = "<div class='f-bg str'></div>";
		$("#score").append(star);
		count++;
	}
	if(score-count>=0.5)
	{
		var star = "<div class='f-bg str strs'></div>";
		$("#score").append(star);
		count++;
	}
	for(var i=count;i<5;i++)
	{
		 var star="<div class='str strx f-bg'></div>";
		 $("#score").append(star);
	}
	latitude = meetinfo.latitude;
	longitude = meetinfo.longitude;
	$("#mainPage").show();
	//$('#Spinloading').spin(false);

});

$.getJSON("http://www.hijufou.com/rest/open/meeting/attendable", {
	mid : oid
}, function(data) {
	var code = data.code;
	if (code == 1) {
		var sta = data.result.state;
		if (sta < 2) {
			$("#scoreLink").attr("href","javascript:alert('只限参加人员打分')");
		}else{
			$("#scoreLink").attr("href","../meeting/score.html")
		}
	} else if(checkLoginReturn() == false){
		$.jStorage.set("preLink",location.href);
		$("#scoreLink").attr("href","../user/login.html");
	}else{
		$("#scoreLink").attr("href","javascript:alert('只限参加人员打分')");
	}
});

$.getJSON("http://www.hijufou.com/rest/open/meeting/attendees", {
	mid : oid,
	type : 0,
	limit : 7
}, function(data) {
	var users = data.result.list;
	$.each(users, function(i, item) {
		var meetjoin = "../../../../res/mobile/pic/face50.jpg";
		if (item.attendee.portrait != null) {
			meetjoin = item.attendee.thumbnail;
		}
		var portrait = "<img class='f-sd br1' src='" + meetjoin + "'/>";
		$("#membership").append(portrait);
	});
});

var setMap = function(latitude, longitude) {
	var center = new qq.maps.LatLng(latitude, longitude);
	var map = new qq.maps.Map(document.getElementById("container"), {
		center : center,
		zoom : 16
	});
	var anchor = new qq.maps.Point(0, 39), size = new qq.maps.Size(42, 68), origin = new qq.maps.Point(0, 0), icon = new qq.maps.MarkerImage("http://open.map.qq.com/doc/img/nilt.png", size, origin, anchor);
	var marker = new qq.maps.Marker({
		map : map,
		position : center
	});
	marker.setIcon(icon);
};

$("#addressmap").click(function() {
	setMap(latitude, longitude);
	$("#mapdiv").show();
});

$("#closeBtn").click(function() {
	$("#mapdiv").hide();
}); 

var showDetail = function() {
	$("#dtls").html(details);
	$("#dtlsBtn").hide();
};
