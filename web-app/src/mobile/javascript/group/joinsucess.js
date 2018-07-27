//获取加入组织回调链接
var url = $.jStorage.get("groupJoinUrl");
var groupid = $.jStorage.get("groupid");
var groupcode = $.jStorage.get("groupcode");
var meid = $.jStorage.get("meid");
var groupObj = $.jStorage.get("groupObj");    
groupObj&&($('#groupTitle').text(groupObj.name));

//设置链接
$("#backToHome").attr("href","../group/home.html?groupid="+groupid);
if(groupcode){
	$("#backToSearch").attr("href","../system/group.html?meid=" + meid + "&groupcode=" + groupcode);
}else{
	$("#backToSearch").hide();
}
$("#backToPrev").attr("href",url);



