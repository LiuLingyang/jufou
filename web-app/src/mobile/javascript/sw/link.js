$("#gpsearch").click(function(){
	var keyword=$("#gname").val();
	var groupcode=$("#gcode").val();
	var province=$("#gprov").val();
	var city=$("#gcity").val();
	var arguement={"keyword" : keyword};
	if(!(groupcode&&keyword)){
		alert("信息不完整");
		return false;
	}
	city&&(arguement.city=city);
	province&&(arguement.province=province);
	$.getJSON("http://www.hijufou.com/rest/open/group/search",arguement, function(data) {
		if(data.code==1)
		{
			data=data.result;
			if(data.total<1)
				alert("没有相应组织");
			else if(data.total>1)
				alert("组织数大于1，请填写更详细信息");
			else{
				var gid=data.list[0].id;
				$("#group").text("http://www.hijufou.com/m/system/group.html?meid="+gid+"&groupid="+gid+"&groupcode="+groupcode);
				$("#meet").text("http://www.hijufou.com/m/system/meet.html?meid="+gid+"&groupid="+gid+"&groupcode="+groupcode);
				$("#about").text("http://www.hijufou.com/m/group/about.html?groupid="+gid);
				$("#news").text("http://www.hijufou.com/m/group/news.home.html?groupid="+gid);
				$("#album").text("http://www.hijufou.com/m/group/album.html?groupid="+gid);
				$("#vote").text("http://www.hijufou.com/m/group/vote.home.html?groupid="+gid);
				$("a").attr("href",function(){return $(this).text();});
			}
		}
		else
			alert("code!=-1");
	});
});
