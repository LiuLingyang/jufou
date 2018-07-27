	var obj = $.jStorage.get("meetObj");
	var sta = 1;
	var user = $.jStorage.get("userObj");
	var attendnb = 0;
	if (user == null) {
		$.jStorage.set("preLink",location.href);
		location.href = "../user/login.html";
	}
	
	$.getJSON("http://www.hijufou.com/rest/open/meeting/attendees",
  	         {mid:obj.id,type:0},
  	         function(data) {
  	            var meetinfo = data.result;
  	         	var attendnb = meetinfo.list.length;
  	         }
  	);
  	  
	
  	$("#submitbtn").click(function(){
			var n = $("#attendnumber").val();
			var d = $("#intr").val();
			
			if (sta == 1) {
			var joinLimit = obj.joinLimit;
			var observerLimit = obj.observerLimit;
			var limit = 0;
			if (joinLimit > 0) {
				limit = joinLimit - attendnb;
			}
			
			
			if (isNaN(n) == true) {
				alert("参加人员为数字");
				return false;
			} 
			
			if (limit > 0) {
				if (n > limit ) {
					alert("没有足够的剩余名额");
					return false;
				}
			}
			
			if (observerLimit > 0 && n > observerLimit) {
				alert("您的邀请人数超过可携带人数");
					return false;
			}
			}
			$.ajax({
				url: "http://www.hijufou.com/rest/meeting/reply",
				type: "POST",
				xhrFields: {withCredentials: true},
				data: {mid:obj.id, state:sta, observer:n, content:d},
				success: function(data) {
				    if (data.code == 1) {
						$.jStorage.set("joinedMeet",obj.id);
						if (sta == 1) {
							location.href = "../meeting/reply.html";
						} else {
							location.href = "../meeting/show.html";
						}
					}
				},
				error : function(data) {
					if (data.status == 401) {
						alert("抱歉，您无法参加此次活动");
					} else {
						alert("报名参加失败");
					}
				}
				});
			
		});

var isAttend = function(act){
	if (act == 1) {
		$("#att1").removeClass();
		$("#att1").addClass('tip tip1 w-btn');
		$("#att2").removeClass();
		$("#att2").addClass('tip tip2 w-btn');
		sta = 1;
	} else if (act == 0) {
		$("#att2").removeClass();
		$("#att2").addClass('tip tip1 w-btn');
		$("#att1").removeClass();
		$("#att1").addClass('tip tip2 w-btn');
		sta = 0;
	}
};