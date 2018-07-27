  	var obj = $.jStorage.get("meetObj");
  	var user = $.jStorage.get("userObj");
  	
  	if (user == null) {
		//$.mobile.changePage("../user/login.html#loginPage", rel=external);
		var preURL = location.href;
		$.jStorage.set("preLink",preURL);
		location.href = "../user/login.html";
	} else if (obj.questions.length == 0) {
		location.href = "../meeting/attendreply.html";
	} else {
		$.each(obj.questions, function(i, item) {
			var xdiv = "<div class='blk'><p class='ln2'>" + item.question
			         + "</p><textarea class='ln1 br0' id='" + item.id +"'></textarea></div>"; 
	    	$("#questions").append(xdiv);
		});
		
		$("#submitbtn").click(function(){
			var questions = $("textarea");
			var objs = {};
			$.each(questions, function(i, item) {
				objs[item.id] = item.value;
			});
			
			
			$.ajax({
				url: "http://www.hijufou.com/rest/meeting/answer",
				type: "POST",
				xhrFields: {withCredentials: true},
				data: {mid:obj.id, answer: JSON.stringify(objs)},
				success: function(data) {
					if (data.code == 1) {
						location.href = "../meeting/show.html";
					}
				},
				error : function(data) {
					alert("无法保存问题答案");
				}
				});
			
		});
	}