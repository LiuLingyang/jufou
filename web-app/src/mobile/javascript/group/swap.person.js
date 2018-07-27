/* 
 * 互动交流页面逻辑
 * @author:lly
 * 
 * Updata 2014-09-21
 * @author:lly
 * @desc:大图查看逻辑添加
 */
var objs = parseURL();
var sid = objs.sid;
var gid = $.jStorage.get("groupid"),
    swapimg,   //图片
	bimgBox = $("#big_img_show_box"),   //大图查看容器
	basicurl = "http://www.hijufou.com";

//分享列表
getcontent();
//评论列表
getcomment();

function getcontent(){
	$.getJSON("http://www.hijufou.com/rest/open/share/get", {
				sid:sid
			}, function(data) {
				if (data.code == 1) {
					var xdiv = "";
					var title = data.result.title;
					var content=data.result.content;
					var createTime = new Date(data.result.pubishTime);
					var time = dateFormat(createTime, "isoDateTime");
					var portrait= "../../../../res/mobile/pic/face50.jpg";
					var nickname = "";
					if (data.result.publisher != null) {
						if (data.result.publisher.thumbnail != null) {
							portrait =  data.result.publisher.thumbnail;
						}
						nickname = data.result.publisher.nickname;
					}
					if(data.result.image != null){
						if(data.result.image.thumbnailURL != null){
							swapimg = basicurl + data.result.image.thumbnailURL;
							$("#swap_img").attr("src",swapimg);
						}
					}else{
						$("#swap_img").closest(".c3").hide();
					}
					$("#title").text(title);
					if (content != "") {
						$("#content").text(content);
					} else {
						$("#content").hide();
					}
					$("#portrait").attr("src", portrait);
					$("#nickname").text(nickname);
					$("#publishTime").text(time);
				}
			});
};

function getcomment(){
	$.getJSON("http://www.hijufou.com/rest/open/comment/list", {
				"offset":0,
				"total":true,
				"limit":1000,
				"oid":sid,
				"type":3
			}, function(data) {
				if (data.code == 1) {
					var xdiv = "";
					var arr=data.result.list;
				    $("#commentcount").text(arr.length+"条评论");
				    $.each(arr, function(i, item) {
				    var pic = "../../../../res/mobile/pic/face50.jpg";
				    if (item.poster.thumbnail != null) {
				    	pic = basicurl + item.poster.thumbnail;
				    }
					xdiv="<div class='w-pswp fc03 fs08 bd02 f-cb'>"+
			      	  	"<img src='"+ pic +"' class='br1 fl bg04'/>"+
			      	  	"<p class='fl nam'>"+item.poster.nickname+"</p>"+
			      	    "<p class='fr fc04'>"+dateFormat(item.postTime, "isoDateTime")+"</p>"+
			      	    "<p class='fs03 wrd'>"+item.content+"</p>"+
			      	  	"</div>";
			      	 $("#items").append(xdiv);
				});
				}
			});
};

//发表评论
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
				"oid" : sid,
				"type" : 3,
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

//大图查看
$("#swap_img").on("click",function(){
	var height = $(window).height();
	var img = bimgBox.find("img");
	$("body").css({
		"height":height,
		"overflow-y":"hidden"
	})
	$(".g-wrp").css("opacity","0.3")
	bimgBox.css({
		"height":height,
		"width":"100%"
	}).show()
	img.css({
		"max-height":height,
		"max-width":"100%"
	})
	img.attr("src",swapimg)
})
bimgBox.on("click",function(){
	$("body").css({
		"height":"auto",
		"overflow-y":"auto"
	})
	$(".g-wrp").css("opacity","1.0");
	$(this).hide();
})
