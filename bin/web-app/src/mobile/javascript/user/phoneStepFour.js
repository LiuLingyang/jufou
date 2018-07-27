	var op = "<option value='选择省'>选择省</option>"; 
	$("#province").append(op);
$.each(dmap.p , function(i,item) {
 	var op = "<option value='" + item +"'>" + item + "</option>"; 
	$("#province").append(op);
});

$("#save").click(function(){
  		var nickname = $("#nickname").val();
  		var province = $("#txtprovince").val();
  		var city = $("#txtcity").val();
  		var area = $("#txtarea").val();
  		var pwd = md5($.jStorage.get("pwd"));
  		var phone = $.jStorage.get("phone");
  		var email = $.jStorage.get("actemail");
  		var captcha = $.jStorage.get("captcha");
		$.ajax({
			url: "http://www.hijufou.com/rest/open/user/regist",
			type: "GET",
			data: {"nickname":nickname, "mobile":phone, "province" : province, "city":city, "area":area, "captcha":captcha, "password": pwd, "email":email },
			success: function(data) {
				if (data.code == -10) {
					alert("账号已存在");
				} else if (data.code == -11) {
					alert("邮箱地址已经存在");
				} else if (data.code > 0) {
					location.href = "../user/registsuccess.html";
				} else {
					alert("注册失败");				
				}
			}
		});
});

var initCity = function() {
	var prov = $("#province").find("option:selected").text();
	$("#txtprovince").val(prov);
	$("#txtcity").val('');
	$("#txtarea").val('');
	$.each(dmap.c , function(i,item) {
		if (i == prov) {
			var op = "<option value='选择城市'>选择城市 </option>"; 
				$("#city").append(op);
			$.each(item, function(idx,it) {
		 		var op = "<option value='" + it +"'>" + it + "</option>"; 
				$("#city").append(op);
			});
		}
	});
};

var initArea = function() {
	var prov = $("#province").find("option:selected").text();
	var city = $("#city").find("option:selected").text();
	$("#txtcity").val(city);
	$("#txtarea").val('');
	var key = prov + "-" + city;
	$.each(dmap.a , function(i,item) {
		if (i == key) {
			var op = "<option value='选择区县'>选择区县</option>"; 
				$("#area").append(op);
			$.each(item, function(idx,it) {
		 		var op = "<option value='" + it +"'>" + it + "</option>"; 
				$("#area").append(op);
			});
		}
	});
};

var setArea = function() {
	var area = $("#area").find("option:selected").text();
	$("#txtarea").val(area);
};



