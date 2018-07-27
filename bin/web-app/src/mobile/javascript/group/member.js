		var oid = $.jStorage.get("groupid");
		var imag = "http://www.hijufou.com";
	  	$.getJSON("http://www.hijufou.com/rest/open/group/members",
  	         {gid:oid, role:0},
  	         function(data) {
  	         	var users = data.result.list;
  	         	$("#memberList").empty();
  	         	$.each(users, function(i, item) {
  	         	    var vhtml = "<li><a href='javascript:showDetail("+ item.attendee.id +")'><div class='w-lui w-lui-0 f-cb'>"
  	         	    + "<img class='fl img f-sd br1' src='" + imag + item.attendee.portrait +"'/><div class='dtl'><p class='ln ln0'>" + item.attendee.nickname 
  	         	    +"</p><p class='ln lnx'>" + getRole(item.role) +"</p>"
  	         	    + "<p class='ln ln1 f-bg'>" + getSex(item.attendee.gender)+"</p></div></div></a></li>"
  	         		$("#memberList").append(vhtml);
  	         	});
  	         }
  	);

var showDetail = function(uid) {
	$.jStorage.set("memberid",uid);
	location.href = "member.profile.html";
}

        	
			
            
            
              
              
              
            
          
          
          