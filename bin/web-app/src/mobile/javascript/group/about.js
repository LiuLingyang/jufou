  	var oid = $.jStorage.get("groupid");
  	$.getJSON("http://www.hijufou.com/rest/open/group/get",
  	         {gid:oid},
  	         function(data) {
  	         	var ginfo = data.result;
  	         	var gname = ginfo.name;
  	         	var city = ginfo.city;
  	         	var time = dateFormat(ginfo.createTime,"fullDate");
  	         	var description = ginfo.description;
  	         	$.jStorage.set("groupObj",ginfo);
  	         	
  	         	$("#groupname").text(gname);
  	         	$("#city").text(city);
  	         	$("#createtime").text(time);
  	         	$("#description").html(TransferString(description));
  	         }
  	);