/* 
 * 活动问题页面逻辑
 * @author:lly
 */
var mid = $.jStorage.get("meetid"),
    meetQuestions = $.jStorage.get("meetQuestions");

var meetObj = $.jStorage.get("meetObj"); 
meetObj&&($('#meetTitle').text(meetObj.title));
var touched=false; //防止重复发送
$.each(meetQuestions, function(i, item) {
	var xdiv = "<p class='ln0 fc03 fs03'>问题" + (i + 1) + "/" + meetQuestions.length + ":" + item.question + "</p><div class='blk'>" + "<textarea class='ln1 br0 bg00 fc04 bd02 fs03' placeholder='回答' id='" + item.id + "'></textarea></div>";
	$("#questions").append(xdiv);
});

$("#submitbtn").click(function() {
	if(touched){
		return;
	}
	var objs = {};
	$.each(meetQuestions, function(i, item) {
		var ans = $("#" + item.id).val();
		objs[item.id] = ans;
	});

	touched=true;
	$.ajax({
		url : "http://www.hijufou.com/rest/meeting/answer",
		type : "POST",
		xhrFields : {withCredentials : true},
		dataType : "json",
		data : {
			"mid" : mid,
			answer : JSON.stringify(objs)
		},
		success : function(data) {
			switch(data.code){
				case 1:
					location.href = "../meeting/applySuccess.html";
				break;
			}
			touched=false;
		},
		error : function(){
			touched=false;
		}
	});
});