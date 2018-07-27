    //$.jStorage.flush();
    var url = location.href;
    $.jStorage.set("preLink", url);
    $.jStorage.set("enter", 1);
    var objs = parseURL();
    var oid;
    var reflag = 0;
    if (objs != null) {	
	    var oid = objs["groupid"];
	    var userid= objs["userid"];
	    if (userid != null) {
	    	$.jStorage.set("userid",userid);
	    }
	    reflag = objs["re"];
	    if (oid != null && userid != null) {
	  		$.jStorage.set("groupid", oid);
	  	} else {
	  		oid = $.jStorage.get("groupid");
	  	}
  	} else {
    	oid = $.jStorage.get("groupid");
    }
    var imag = "http://www.hijufou.com";
 
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
  	   
    $.getJSON("http://www.hijufou.com/rest/open/group/get",
    		 {gid:oid},
  	         function(data) {
  	         	var ginfo = data.result;
  	         	var gname = ginfo.name;
  	         	var city = ginfo.city;
  	         	var time = dateFormat(ginfo.createTime,"fullDate");
  	         	var img = "http://www.hijufou.com" + ginfo.logo;
				
				$("#logo").attr("src", img);
				$("#title").text(gname);
  	         	$("#groupname").text(gname);
  	         	$("#city").text(city);
  	         	$("#createtime").text(time);
  	         	
  	         	$.jStorage.set("groupObj", ginfo);
  	         }
  	);
    

var getlist = function(type) {
		var oid = $.jStorage.get("groupid");
		$("#tlist").empty();
        if (type == 0) {
            $("#finish").removeClass("js-selected");
        	$("#upcome").addClass("itm fl js-selected");
        	$("#finish").addClass("itm fl");
        } else {
            $("#upcome").removeClass("js-selected");
        	$("#upcome").addClass("itm fl");
        	$("#finish").addClass("itm fl js-selected");        	
        }
	 	$.getJSON("http://www.hijufou.com/rest/open/meeting/list",
  	         {order:"desc", sort: "startTime",gid:oid,
  	          type:type, limit:10, offset:0, total:true},
  	         function(data) {
  	         	var arr = data.result.list;
  	         	$.each(arr, function(i, item) {
  	         		var startTime = new Date(item.startTime);
  	         		var time = dateFormat(startTime,"default");
  	         		var dtime = dateFormat(startTime,"default");
  	         		var dd = dtime.split(",")[0].split(" ");
					var xdiv = "<li class='w-imet w-imet-0 f-cb'><a href='javascript:gotoPage("+ item.id + ")'><div class='fl w-txm f-sd'><p class='m'>" + dd[1] + "</p><div class='d'><span>" + dd[2] + "</span>"
                  			 + "<span class='c'>&nbsp;</span></div></div><div class='dtl'><p class='ln ln0'>"+ item.title +"</p><p class='ln lnx f-bg'>"
                  			 + time + "</p><p class='ln lnx-01 f-bg'>"+ item.address +"</p><p class='ln ln4'><span class='fc3'>"
                  			 + item.joinCount + "人参加</span></p></div></a></li>"; 
	    			$("#tlist").append(xdiv);
				});
  	         }
  	); 
	};  	
  	getlist(0); //comingupmeeting
  	
  	$.getJSON("http://www.hijufou.com/rest/open/group/get",
  	         {gid:oid},
  	         function(data) {
  	         	var mb = data.result.memberCount;
  	         	$("#membership").text("共有会员"+ mb + "个");
  	         }
  	);
  	
  	$.getJSON("http://www.hijufou.com/rest/open/group/members",
  	         {gid:oid, role:0},
  	         function(data) {
  	         	var users = data.result.list;
  	         	$.each(users, function(i, item) {
  	         	    var portrait = "<img class='fl f-sd br1' src='" + imag + item.attendee.portrait + "'/>"
  	         		$("#membership").parent().append(portrait);
  	         	});
  	         }
  	);
  	
  	$("#finish").click(
  		function(){
  			getlist(1);
  		}
  	);
  	
  	$("#upcome").click(
  		function(){
  			getlist(0);
  		}
  	);
  	
  	$("#membership").click(
  		function(){
  			location.href = "../group/member.html";
  		}
  	);

var gotoPage = function(meetid) {
    $.jStorage.deleteKey("meetid");
	$.jStorage.set("meetid", meetid);
	location.href = "../meeting/show.html";
}


