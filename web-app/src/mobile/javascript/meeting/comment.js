/* 
 * 活动评论页面逻辑
 * @author:lly
 */
var gid = $.jStorage.get("groupid"),
	mid = $.jStorage.get("meetid"),
    offset = 0,   //懒加载数量标示
	lazyStop = false,   //懒加载是否停止标记
	noCommentBox = $("#nocomment"),   //无结果容器
	renderBox = $("#commentBox");     //渲染结果容器
	basicurl = "http://www.hijufou.com";
	
var meetObj = $.jStorage.get("meetObj");
meetObj&&($('#meetTitle').text(meetObj.title));
//评论列表初始化
renderCommentList(true);

//发表评论按钮
$("#addbtn").click(function() {
	var cmt = $("#newcomment").val();
	if($.trim(cmt) == ""){
		alert("评论内容不能为空！");
	}else{
		$.ajax({
			url : "http://www.hijufou.com/rest/comment/add",
			type : "POST",
			xhrFields : {withCredentials : true},
			dataType : "json",
			data : {
				"oid" : mid,
				"type" : 1,
				"content" : cmt
			},
			success : function(data) {
				if (data.code == 1) {
					location.reload();
				}else{
					alert("您没有权限发表评论！");
				}
			}
		});
	}
	
});

function renderCommentList(isempty){
	var opt = {
		oid : mid,
		type : 1,
		limit : 6,
		offset : offset,
		total : true
	}
	$.ajax({
		url : "http://www.hijufou.com/rest/open/comment/list",
		type : "POST",
		xhrFields : {withCredentials : true},
		dataType : "json",
		data : opt,
		success : function(data) {
			if (data.code == 1) {
				if(data.result.list.length == 0){
					lazyStop = true;
					if(isempty == true){
						renderBox.hide();
						noCommentBox.show();
					}
				}else{
					noCommentBox.hide();
					renderBox.show();
					$.each(data.result.list, function(i, item) {
						var thumbnail="../../../../res/mobile/pic/face50.jpg";
						if(item.poster.thumbnail){
							thumbnail=item.poster.thumbnail;
						}
						var posterInfo;
						if(item.replied){
							posterInfo = item.poster.nickname + "<span class='fc01'>回复</span>" + item.replied.poster.nickname;
						}else{
							posterInfo = item.poster.nickname;
						}
						var xdiv = "<div class='w-comt bg00 bd02'>"+
				      	  "<div class='fs03 fc03 ln1 f-cb'>"+
				      	  	"<img src='"+thumbnail+"' class='br1 fl bg03'/>"+
				      	  	"<div class='fl nam'>"+ posterInfo +"</div>"+
				      	  	"<div class='fr fc04'>"+dateFormat(item.postTime, "isoDateTime")+"</div>"+
				      	  "</div>"+
				      	  "<div class='fs03 fc03 bd02 ln0'>"+item.content+"</div>";
				      	  if(item.image){
				      	  	xdiv += "<img src='"+ basicurl + item.image.thumbnailURL +"' class='pto bg04'/>"
				      	  }
				      	  xdiv += "</div>";
				      	renderBox.append(xdiv);
					});	
				}
			}
		}
	});
}

//懒加载方法
$(window).scroll(function () {
	if ($(window).scrollTop()>=$(document).height()-$(window).height()){
		if(lazyStop == false){
			offset = offset + 6;
			renderCommentList(false);
		}
	}
});