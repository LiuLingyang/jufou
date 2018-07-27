/* 
 * 组织相册页面逻辑
 * @author:lly
 */
var gid = $.jStorage.get("groupid"),
	renderBox = $("#groupsElments"),   //容器
    basicurl = "http://www.hijufou.com";

var groupObj = $.jStorage.get("groupObj");    
groupObj&&($('#groupTitle').text(groupObj.name));
//渲染相册主方法
renderAlbum();

function renderAlbum(){
	var opt = {
		gid : gid,
		offset : 0,
		limit : 10000,
		total : true
	}
	$.ajax({
	    url: "http://www.hijufou.com/rest/album/list",
	    type: "POST",
	    dataType: "json",
	    xhrFields: {withCredentials: true},
	    data: opt,
	    success: function(data) {
	        if(data.code == 1){
	        	if(data.result.list.length == 0){
	        		renderBox.hide();
	        		$("#nomessage").show();
	        	}else{
	        		var albumHtml = [];
	        		$("#nomessage").hide();
					renderBox.show();
					$.each(data.result.list, function(i, item) {
						var img = basicurl + item.coverUrl;
						var time = dateFormat(item.createTime, "isoDateTime");
						var groupHtml = "<div class='w-abum fl bd02 bg00'><a href='../group/photo.html?aid="+ item.id +"'><div class='img' style='background:#282e39 url(" + img + ") center center;background-size:cover;'></div></a><p class='fs03 fc03 f-tf ln1'>" + item.name + "</p><p class='fc04 ln2'>" + item.photoCount + "张照片<span>|</span>" + time + "</p></div>";
						albumHtml.push(groupHtml);
					});
					renderBox.append(albumHtml.join(" "));
	        	}
	        }
	    }
	});
};