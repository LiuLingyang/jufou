var meetObj = $.jStorage.get("meetObj");
var meetQuestions = $.jStorage.get("meetQuestions");
var userObj = $.jStorage.get("userObj");

var personTaken = 0;    //用户选择的可携带人数
var touched=false; //防止重复发送
//页面信息初始化
showPage();

//携带人数逻辑添加
observerLimit();

$("#btn-ok").on("click",function(){
	reply();
})

meetObj&&($('#meetTitle').text(meetObj.title));
//手机验证正则表达式
var regex = {
	mobile : /^0?(13[0-9]|15[012356789]|18[02356789]|14[57])[0-9]{8}$/
};

function reply(){
	if(touched){
		return;
	}
	var truename = $("#truename").val();
	var phone = $("#phone").val();
	var company = $("#company").val();
	var gender=($("#man")[0].checked==true)?0:1;
	var observerLimit = personTaken;
	var regcheck = regex.mobile.test(phone);
	if (!regcheck) {
		$("#errorMsg").text("请输入正确的手机号码").show();
		return;
	}
	
	touched=true;
	$.ajax({
		url : "http://www.hijufou.com/rest/meeting/reply",
		type : "POST",
		xhrFields : {withCredentials : true},
		dataType : "json",
		data : {
			mid : meetObj.id,
			state : 1,
			observer : observerLimit,
		},
		success : function(data) {
			switch(data.code){
				case 1:
					//更新个人信息
					$.ajax({
						url:"http://www.hijufou.com/rest/user/profile",
						type: "POST",
						xhrFields: {withCredentials: true},
						dataType: "json",
						data: {
							"realname": truename,
							"company":company,
							"gender":gender,
							"mobile" : phone,
						},
						success: function(data) {
							user = data.result;
							$.jStorage.deleteKey("userObj");
							$.jStorage.set("userObj",user);
							if(meetQuestions.length != 0){
								location.href = "../meeting/reply.html";
							}else{
								location.href = "../meeting/applySuccess.html";
							}
						}
					});
				break;
				case -3:
					$("#errorMsg").text("抱歉，您没有权限参加此次活动！");
				break;
				default:
					$("#errorMsg").text("暂时无法回复活动，请稍后再试！");
				break;
			}
			touched=false;
		},
		error : function(){
			touched=false;
		}
	});
};

function showPage(){
	if (userObj != null) {
		var user = userObj;
		$("#grp2").show();
		$("#grp1").hide();
		$("#name").text(user.nickname);
		if(user.realname != null){
			$("#truename").val(user.realname);
		}else{
			$("#truename").val(user.nickname);
		}
		$("#company").val(user.company);
		$("#phone").val(user.mobile);
		
		if (user.gender == 0) {
			$("#man").attr("checked", "checked");
		}
		if (user.gender == 1) {
			$("#woman").attr("checked", "checked");
		}
	} else {
		$("#grp2").hide();
		$("#grp1").show();
	}
};

function observerLimit(){
	$("#subtract").click(function() {
		if (personTaken > 0) {
			personTaken = personTaken - 1;
			var text = "" + personTaken + "位";
			$("#attendnumber").text(text);
		}
	});
	
	$("#add").click(function() {
		var observerLimit = meetObj.observerLimit;    //可携带人数
		personTaken = personTaken + 1;
		if (observerLimit > 0 && personTaken > observerLimit) {
			alert("您的邀请人数超过可携带人数");
			personTaken = personTaken - 1;
		}
		var text = "" + personTaken + "位";
		$("#attendnumber").text(text);
	});
}