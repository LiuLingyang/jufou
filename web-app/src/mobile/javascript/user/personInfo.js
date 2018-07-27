var user;
function infoInitialize(){
	//头像
	var picURL = "../../../../res/mobile/pic/face50.jpg";
	if (user.thumbnail) {
		picURL = user.thumbnail;
	}
	else if(user.portrait)
		picURL = user.portrait;
	$("#photo").attr("src", picURL);
	//昵称生日性别城市
	$("#nickname").val(user.nickname);
	var pro=user.province;
	var city=user.city;
	$("#selectProvince").val(pro);
	change_city($('#selectProvince'),$('#selectCity'));
	$("#selectCity").val(city);
	if(user.gender==0)
		$("#male").attr("checked", "checked");
	else
		$("#female").attr("checked", "checked");
	var birth=new Date(user.birthday);
	$("#birthday").val(birth.getFullYear()+'/'+(birth.getMonth()+1)+'/'+birth.getDate());
	$("#bio").val("");
}

$(document).ready(function(){
	$('#birthday').mobiscroll().date({
		dateFormat: 'yy/mm/dd',
		setText: '确定', 
        cancelText: '取消',
        dateOrder: 'yymmdd', 
        dayText: '日', 
        monthText: '月', 
        yearText: '年',
        startYear: 1940,
        theme: 'android-holo light', 
        display: 'modal',
        animate:'fade',
        fixedWidth:150,
        height:100,
    });  

	$("#infoSubmit").click(function(){
		var nickname=$("#nickname").val();
		if(nickname=="")
			nickname=user.nickname;
		var province=$("#selectProvince").val();
		if(province=="")
			province=user.province;
		var city=$("#selectCity").val();
		if(city=="")
			city=user.city;
		var gender;
		if(($("#male")[0].checked)==true)
			gender=0;
		else
			gender=1;
		var birthday=Date.parse($("#birthday").val());
		var bio=$("#bio").val();
		if(bio=="")
			bio=user.bio;
		
		$.ajax({
				url:"http://www.hijufou.com/rest/user/profile",
				type: "POST",
				xhrFields: {withCredentials: true},
				data: {
					"nickname": nickname, 
					"province": province,
					"city": city,
					"gender":gender,
					"birthday":birthday,
					"bio":bio
					},
				success: function(data) {
					data = jQuery.parseJSON(data);
					user = data.result;
					$.jStorage.deleteKey("userObj");
					$.jStorage.set("userObj",user);
					location.href = "./setUp.html";
				}
			});
	});
	user=$.jStorage.get("userObj");
	if(user==null){
		$.ajax({
			url:"http://www.hijufou.com/rest/open/user/get",
			type: "POST",
			xhrFields: {withCredentials: true},
			success: function(data) {
				data = JSON.parse(data);
				user = data.result;
				$.jStorage.set("userObj",user);
				infoInitialize();
			}
		});
	}
	infoInitialize();
});
