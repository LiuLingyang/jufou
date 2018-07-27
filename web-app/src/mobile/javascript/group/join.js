/* 
 * 加入组织页面逻辑
 * @author:lly
 */
var gid = $.jStorage.get("groupid"),
    groupQuestions = $.jStorage.get("groupQuestions"),
    cmt = $.jStorage.get("selfintroduce"),
    touched = false;   //自我介绍
    
var groupObj = $.jStorage.get("groupObj");    
groupObj&&($('#groupTitle').text(groupObj.name));

$.each(groupQuestions, function(i, item) {
	var xdiv = "<p class='ln0 fc03 fs03'>问题" + (i + 1) + "/" + groupQuestions.length + ":" + item.question + "</p><div class='blk'>" + "<textarea class='ln1 br0 bg00 fc04 bd02 fs03' placeholder='回答' id='" + item.id + "'></textarea></div>";
	$("#questions").append(xdiv);
});

$("#submitbtn").click(function() {
	$("#submitbtn").unbind('click');
	if(touched){
		return;
	}
	touched=true;
	var objs = {};
	$.each(groupQuestions, function(i, item) {
		var ans = $("#" + item.id).val();
		if(!ans){
			alert('答案不能为空');
			return;
		}
		objs[item.id] = ans;
	});
	$.ajax({
		url : "http://www.hijufou.com/rest/group/join",
		type : "POST",
		xhrFields : {withCredentials : true},
		dataType : "json",
		data : {
			"gid" : gid,
			"intro" : cmt,
			"update" : false,
			answer : JSON.stringify(objs)
		},
		success : function(data) {
			switch(data.code){
				case 1:
					location.href = "../group/joinsucess.html";
				break;
				case -203:
					alert("您提供的信息不完整！");
				break;
				case -204:
					alert("您还没有参加该组织！");
				break;
				case -205:
					alert("您已经加入了该组织！");
				break;
			}
		}
	});
});