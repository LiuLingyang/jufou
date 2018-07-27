/* 
 * 关于页面逻辑
 * @author:lly
 */
var gid = $.jStorage.get("groupid"),
	groupObj = $.jStorage.get("groupObj"),
	basicurl = "http://www.hijufou.com",
	desBox = $("#description");
   
groupObj&&($('#groupTitle').text(groupObj.name));
//组织信息预填
setGroupInfo(groupObj);

//tab切换
var list = $(".itm",".g-ban")
list.on("click",function(){
	list.removeClass("js-selected");
	$(this).addClass("js-selected");
	var type = +$(this).attr("type");
	switch(type){
		case 0:
			desBox.html(groupObj.description);
		break;
		case 1:
			desBox.text("暂时没有组织章程！");
		break;
		case 2:
			desBox.text("暂时没有组织构架！");
		break;
	}
	
})
	
function setGroupInfo(data){
	if(data.lastPhoto){
		var laPhoto = "<div class='pic' style='background:#282e39 url("+ basicurl + data.lastPhoto + ") center center;background-size:cover;'></div>"
	}
	$("#lsPhoto").append(laPhoto);
	$("#groupname").text(data.name);
	$("#city").text(data.city + data.area);
	desBox.html(data.description);
}