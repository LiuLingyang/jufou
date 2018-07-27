    var objs = parseURL();
    var oid;
    $.jStorage.set("enter", 1);
    var url = location.href;
    $.jStorage.set("preLink", url);
    var reflag = 0;
    
    var userid;
    
    if (objs != null) {
	    oid = objs["meetid"];
	    userid= objs["userid"];
	    if (userid != null) {
	    	$.jStorage.set("userid",userid);
	    }
	    reflag = objs["re"];
	    if (oid != null && userid != null) {
	    	$.jStorage.set("meetid",oid);
	    } else {
	    	oid = $.jStorage.get("meetid");
	    }
	}  else {
	    	oid = $.jStorage.get("meetid");
	 }
  	var joinedMeet = $.jStorage.get("joinedMeet");
  	
  	//user check 
    if (reflag == undefined) {
	  	$.getJSON("http://www.hijufou.com/rest/open/user/check",
	  	         {username:userid},
	  	         function(data) {
	  	         	if (data.code == -10) {
	  	         	    location.href = "../user/regist.html";
	  	         	} else {
	  	         		location.href = "../user/login.html";
	  	         	}
	  	         }
	  	);
  	}
  	
  	$.getJSON("http://www.hijufou.com/rest/open/meeting/get",
  	         {mid:oid},
  	         function(data) {
  	         	var meetinfo = data.result;
  	         	var title = meetinfo.title;
  	         	var groupname = meetinfo.group.name;
  	         	var address = meetinfo.address;
  	         	var details = meetinfo.details;
  	         	var desc = meetinfo.feeList;
  	         	var sTime = dateFormat(meetinfo.startTime, "isoDateTime");
  	         	var eTime = dateFormat(meetinfo.endTime,"isoDateTime");
  	         	
  	         	$.jStorage.set("groupid",meetinfo.group.id);
  	         	
  	         	var url = "../group/home.html?userid=" + userid +"&groupid=" + meetinfo.group.id + "&re=1";
  	         	
  	         	$("#linkgroupname").attr("href",url);
  	         	$("#grouptitle").text(title);
  	         	$("#meettitle").text(title);
  	         	$("#address").text(address);
  	         	$("#details").html(details);
  	         	$("#linkgroupname").text(groupname);
  	         	$("#feeDesc").text(desc);
  	         	$("#beginTime").text("开始:" + sTime);
  	         	$("#endTime").text("结束:" + eTime);
  	         	$.jStorage.set("meettitle", title);
				$.jStorage.set("meetObj",meetinfo);
				
				location.href = "#mainPage";
				if (joinedMeet == oid) {
					$("#attendLink").text("已参加");
					//$("#attendLink").setAttribute("rel",$("#attendLink").href);
					$("#attendLink").removeAttr("href");
				}
  	         }
  	);