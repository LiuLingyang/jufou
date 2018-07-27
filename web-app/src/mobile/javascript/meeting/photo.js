/* 
 * 活动照片页面逻辑
 * @author:lly
 */
var mid = $.jStorage.get("meetid"),
	loadingBox = $("#loading"),
	renderBox = $("#Gallery"),
	noresultBox = $("#nophoto"),
	fileForm = $("#fileBox"),   //上传图片form
	basicurl = "http://www.hijufou.com";

var meetObj = $.jStorage.get("meetObj"); 
meetObj&&($('#meetTitle').text(meetObj.title));
//上传图片按钮显示隐藏控制
$.ajax({
    url: "http://www.hijufou.com/rest/open/meeting/attendable",
    type: "POST",
    dataType: "json",
    xhrFields: {withCredentials: true},
    data:{mid:mid},
    success: function(data) {
        if(data.code==1){
			if(data.result.state == 2){
				fileForm.show();
			}
		}
    }
});

//渲染照片
renderPhoto();

function renderPhoto(){
	$.ajax({
	    url: "http://www.hijufou.com/rest/open/photo/list",
	    type: "POST",
	    dataType: "json",
	    xhrFields: {withCredentials: true},
	    data:{mid:mid},
	    success: function(data) {
	        if(data.code==1){
	        	loadingBox.hide();
	        	if(data.result.list.length == 0){
	        		renderBox.hide();
	        		noresultBox.show();
	        	}else{
	        		noresultBox.hide();
	        		renderBox.show();
	        		photoHtml = [];
	        		$.each(data.result.list, function(i, item) {
				        var thumbnail = basicurl + item.thumbnailURL;
				        var xdiv = "<a href='javascript:showLarge();'><div class='img' style='background:#282e39 url(" + thumbnail + ") center center;background-size:cover;'></div></a>";
				        photoHtml.push(xdiv);
				    });
				    renderBox.html(photoHtml.join(""));
				    
				    $.each(data.result.list, function(i, item) {
				        var thumbnail = basicurl + item.thumbnailURL;
				        var xdiv = "<li class='pic-contain'><div class='img'><img class='i-photo' src='" + thumbnail + "' /></div></li>";
				        $("#slideDiv").append(xdiv);
				    });
				    var availHeight=$(window).height()-92;
				    $('.pic-contain').css('height',availHeight+'px');
				    $('.i-photo').css('max-height',availHeight+'px');	
	        	}
			}
	    }
	});
}

//大图查看
function showLarge(){
	$("#large").show();
	$("#small").hide();
	$("#fileBox").hide();
	$('.flexslider').flexslider({
	    animation: "slide",
	    start: function(slider) {
	        $('body').removeClass('loading');
        }
    });
};
$("#large").find(".back_link").on("click",function(){
	$("#large").hide();
	$("#small").show();
	$("#fileBox").show();
})

//上传图片
$("#imgupload").click(function(){
	if($("#file").val() == ""){
		alert("请先选择文件！")	
	}else{
		ajaxFileUpload();
	}
});
function ajaxFileUpload() {
	var xhr = new XMLHttpRequest();
	xhr.open('POST','http://www.hijufou.com/rest/photo/create?mid='+mid,true);
	xhr.withCredentials = true;
	xhr.onreadystatechange = function(e) {
		if(xhr.readyState==4){
			location.reload();
		}
	};
	xhr.send(new FormData(document.getElementById('fileBox')));
	loadingBox.show();
	renderBox.hide();
	noresultBox.hide();
    return false;
};