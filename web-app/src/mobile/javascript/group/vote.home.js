/* 
 * 组织投票页面逻辑
 * @author:lly
 */
 if(!checkLogin()){
 	$.jStorage.set("loginCallback",location.href);
 	location.href="../user/login.html";
 }

var gid = $.jStorage.get("groupid"),
	renderBox = $("#tlist");  //容器

//tab切换及初始化
getlist(0);
$("#finish").click(function() {
	getlist(1);
});
$("#going").click(function() {
	getlist(0);
});

function getlist(type){
	if (type == 0) {
		$("#finish").removeClass("js-selected");
		$("#going").addClass("js-selected");
	} else {
		$("#going").removeClass("js-selected");
		$("#finish").addClass("js-selected");
	}
	var opt = {
		order : "desc",
		sort : "startTime",
		gid : gid,
		type : type,
		limit : 1000,
		offset : 0
	}
	$.ajax({
	    url: "http://www.hijufou.com/rest/vote/list",
	    type: "POST",
	    dataType: "json",
	    xhrFields: {withCredentials: true},
	    data:opt,
	    success: function(data) {
	    	if(data.code == 1){
	    		var _list = data.result.list;
				if (_list.length == 0){
					renderBox.hide();
					$("#nomessage").show();
				}else{
					var voteHtml = [];
					$("#nomessage").hide();
					renderBox.show();
					$.each(_list, function(i, item) {
						var partHtml = "";
						var startTime = new Date(item.startTime);
						var time = dateFormat(startTime, "isoDateTime");
						partHtml += "<div class='w-vote bd03'><p class='fs04 ln1 fc03'>" + item.title +"</p>";
						partHtml += "<p class='fs08 ln2 fc04'>" + item.voterCount + "人投票</p>";
						partHtml += "<p class='fs08 ln2 fc04'>"+time+"</p>";
						if(type==0){
							partHtml += "<a href='vote.cast.html?vid="+item.id+"' class='w-btn btn05 vot'>我要投票</a></div>";
						}else{
							partHtml += "<a href='vote.show.html?vid="+item.id+"' class='w-btn btn05 vot'>查看结果</a></div>";
						}
						voteHtml.push(partHtml);
					});
					renderBox.html(voteHtml.join(""));
				}
	    	}
	    }
	});
};