/* 
 * 组织相册页面逻辑
 * @author:lly
 */
var objs = parseURL();
var aid = objs.aid;
var basicurl = "http://www.hijufou.com";

var groupObj = $.jStorage.get("groupObj");    
groupObj&&($('#groupTitle').text(groupObj.name));

showphoto();

function showphoto(){
	$.ajax({
	    url: "http://www.hijufou.com/rest/open/photo/list",
	    type: "POST",
	    dataType: "json",
	    xhrFields: {withCredentials: true},
	    data:{aid:aid},
	    success: function(data) {
	        var picList = data.result.list;
		    $.each(picList, function(i, item) {
		        var thumbnail = basicurl + item.thumbnailURL;
		        var xdiv = "<a href='javascript:showLarge();'><div class='img' style='background:#282e39 url(" + thumbnail + ") center center;background-size:cover;'></div></a>";
		        $("#Gallery").append(xdiv);
		    });
		    
		    $.each(picList, function(i, item) {
		        var thumbnail = basicurl + item.thumbnailURL;
		        var xdiv = "<li class='pic-contain'><div class='img'><img class='i-photo' src='" + thumbnail + "' /></div></li>";
		        $("#slideDiv").append(xdiv);
		    });
		    var availHeight=$(window).height()-92;
		    $('.pic-contain').css('height',availHeight+'px');
		    $('.i-photo').css('max-height',availHeight+'px');
	    }
	});
};


function showLarge(){
    $("#large").show();
    $("#small").hide();
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