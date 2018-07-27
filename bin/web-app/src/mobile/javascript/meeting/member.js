  	var oid = $.jStorage.get("meetid");
  	var title = $.jStorage.get("meettitle"); 
  	$("#meettitle").text(title);
  	$.getJSON("http://www.hijufou.com/rest/open/meeting/attendees",
  	         {mid:oid,type:0},
  	         function(data) {
  	         	var meetinfo = data.result;
  	         	var attend = meetinfo.list.length;
  	         	$("#attend").text(attend);
  	         	$("#attendees").empty();
  	         	$.each(meetinfo.list, function(i, item) {
  	         		
  	         		var html = "<div class='w-lui w-lui-0 f-cb'><a href='javascript:showDetail("+ item.attendee.id +")'><img class='fl f-sd br1' src='http://www.hijufou.com"+ item.attendee.thumbnail +"'/><div class='dtl'><p class='ln ln0'>"+ item.attendee.nickname+"</p>"
  	         		+ "<p class='ln lnx'>"+ getRole(item.attendee.state) +"</p><p class='ln ln1 f-bg'>"+getSex(item.attendee.gender) +"</p></div></a></div>";
  	         		$("#attendees").append(html);
  	         	});
  	         }
  	);
  	
  	 $.getJSON("http://www.hijufou.com/rest/open/meeting/attendees",
  	         {mid:oid,type:1},
  	         function(data) {
  	            var meetinfo = data.result;
  	         	var absent = meetinfo.list.length;
  	         	$("#absent").text(absent);
  	         }
  	  );

var showDetail = function(uid) {
	$.jStorage.set("memberid",uid);
	location.href = "../group/member.profile.html";
}