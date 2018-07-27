  	var oid = $.jStorage.get("groupid");
  	var obj = $.jStorage.get("groupObj");
  	$("#title").text(obj.name);
  	var user = $.jStorage.get("userObj");
  	
  	if (user == null) {
		$.jStorage.set("preLink",location.href);
		location.href = "../user/login.html";
	} else if (obj.questions.length == 0) {
	    var cmt = $.jStorage.get("selfintroduce");
	    $.ajax({
				url: "http://www.hijufou.com/rest/group/join",
				type: "POST",
				xhrFields: {withCredentials: true},
				data: {"gid": oid, "intro": cmt, "update" : false},
				success: function(data) {
					location.href = "../group/joinsucess.html";
				},
				error: function(data) {
					alert(data);
				}
				});
	} else if (obj.questions.length > 0){
		$.each(obj.questions, function(i, item) {
			var xdiv = "<div class='blk'><p class='ln2'>" + item.question
			         + "</p><textarea class='ln1 br0' id='" + item.id +"'></textarea></div>"; 
	    	$("#questions").append(xdiv);
		});
		
		$("#submitbtn").click(function(){
			location.href = "../group/joinsucess.html";
		});
	}

