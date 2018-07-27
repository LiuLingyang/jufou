/* 
 * 互动交流页面逻辑
 * @author:lly
 */
var gid = $.jStorage.get("groupid"),
	pid = "",
	imgBox = $("#img_box");    //图片容器
	loadingImg = $("#loading");   //loading图片
	basicurl = "http://www.hijufou.com";
	
function ajaxFileUpload() {
	imgBox.hide();
	loadingImg.show();
	var xhr = new XMLHttpRequest();
	xhr.open('POST','http://www.hijufou.com/rest/photo/create?gid='+gid,true);
	xhr.withCredentials = true;
	xhr.onreadystatechange = function(e) {	
		if(xhr.readyState==4){
			var json = JSON.parse(xhr.responseText);
			var url = basicurl + json.result.thumbnailURL;
			loadingImg.hide();
			imgBox.html('<img src="'+ url +'">').show();
			pid=json.result.id;
		}
	};
	xhr.send(new FormData(document.getElementById('file')));
	return false;
};

$("#cast").click(function(){
     cast();
});
var cast=function(){
	var titletemp=$("#title").val();
	if(titletemp==null||titletemp=="")
	{
		alert("标题不能为空！")
	}else{
		var contenttemp=$("#content").val();
		$.ajax({
			url : "http://www.hijufou.com/rest/open/share/create",
			type : "POST",
			xhrFields : {
				withCredentials : true
			},
			data : {
				"gid" : gid,
				"title" : titletemp,
				"content":contenttemp,
				"pid":pid
			},
			success : function(d) {
				location.href = "swap.home.html"
			}
		});
	}
};