/* 
 * 加入组织页面逻辑
 * @author:lly
 */
var gid = $.jStorage.get("groupid"),
    groupQuestions = $.jStorage.get("groupQuestions"),
    userObj = $.jStorage.get("userObj"),//1
    touched = false;


showPage();//2

var groupObj = $.jStorage.get("groupObj");    
groupObj&&($('#groupTitle').text(groupObj.name));

var regex = {
	mobile : /^0?(13[0-9]|15[012356789]|18[02356789]|14[57])[0-9]{8}$/,
	email : /^[^\s]+@[^\s]*[^\s]+\.[^\s]+$/
};

$("#btn-ok").click(
	function(){
		$("#btn-ok").unbind('click');
		if(touched){
			return;
		}
		var truename = $("#truename").val();
		var phone = $("#phone").val();
		var email=$("#email").val();
		var company = $("#company").val();
		var gender=($("#man")[0].checked==true)?0:1;
		var regcheck = regex.mobile.test(phone);
		var regcheck2 = regex.email.test(email);
		if (!regcheck) {
			$("#errorMsg").text("请输入正确的手机号码").show();
			return;
		}
		if (!regcheck2) {
			$("#errorMsg").text("请输入正确的邮箱地址").show();
			return;
		}
		if (!truename){
			$("#errorMsg").text("请输入您的姓名").show();
			return;
		}
		if (!company){
			$("#errorMsg").text("请输入您的单位或者学院").show();
			return;
		}
		touched=true;


		var sGender=gender==1?"女":"男";


			$.ajax({
				url:"http://www.hijufou.com/rest/user/profile",
				type: "POST",
				xhrFields: {withCredentials: true},
				dataType: "json",
				data: {
					"realname": truename,
					"company":company,
					"gender":gender,
					"email":email,
					"mobile" : phone
				},
				success: function(data) {
					user = data.result;
					$.jStorage.deleteKey("userObj");
					$.jStorage.set("userObj",user);
					
					if(groupQuestions.length != 0){
						$.jStorage.set("selfintroduce",truename+" "+sGender+" ("+company+") ("+phone+") "+email);
						location.href = "../group/join.html";
					}else{
						$.ajax({
							url: "http://www.hijufou.com/rest/group/join",
							type: "POST",
							xhrFields: {withCredentials: true},
							data: {"gid": gid, "intro": truename+" "+sGender+" ("+company+") ("+phone+") "+email, "update" : false},
							success: function(data) {

								location.href = "../group/joinsucess.html";
							}
						});
					}	
					
				}
			});
			
		
	}
);

function showPage(){//3
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
		$("#email").val(user.email);
		
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
}