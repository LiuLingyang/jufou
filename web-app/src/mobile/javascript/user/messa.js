/* 
 * 消息系统页面逻辑
 * @author:lly
 */

var gid = $.jStorage.get("groupid"),
	basicurl = "http://www.hijufou.com",
	loadingBox = $("#loading"),   //loading容器
	renderBox = $("#tlist"),      //数据容器
	noresultBox = $("#nomessage"), //无结果容器
	notifyBtn = $("#notifyTab"),   //群通知按钮
	systemBtn = $("#systemTab"),   //消息系统按钮
	newMessageBox = $("#newMessage");  //新消息个数容器

//获取新消息
getNewMessage();
//tab切换及初始化
renderNotify();
notifyBtn.click(function() {
	systemBtn.removeClass("js-selected");
	notifyBtn.addClass("js-selected");
	renderNotify();
});
systemBtn.click(function() {
	type = 0;
	notifyBtn.removeClass("js-selected");
	systemBtn.addClass("js-selected");
	renderSystem();
});
function getNewMessage(){
	$.ajax({
	    url: "http://www.hijufou.com/rest/message/new",
	    type: "POST",
	    dataType: "json",
	    xhrFields: {withCredentials: true},
	    success: function(data) {
	        if(data.code == 1){
	        	var count = data.result[4];
	        	if(count){
	        		newMessageBox.text(count);
	        	}else{
	        		newMessageBox.hide();
	        	}
	        }
	    }
	});
}
function renderNotify(){
	renderBox.hide();
	noresultBox.hide();
	loadingBox.show();
	var opt = {
		type : 0,
		limit : 1000,
		offset : 0,
		total : true
	}
	$.ajax({
	    url: "http://www.hijufou.com/rest/message/getInformList",
	    type: "POST",
	    dataType: "json",
	    data : opt,
	    xhrFields: {withCredentials: true},
	    success: function(data) {
	        if(data.code == 1){
	        	loadingBox.hide();
	        	if(data.result.list.length == 0){
	        		renderBox.hide();
	        		noresultBox.show();
	        	}else{
	        		noresultBox.hide();
	        		renderBox.show();
	        		totalHtml = [];
	        		$.each(data.result.list, function(i, item) {
						var glogo = "";
						if (item.message.content) {
							var content = $.parseJSON(item.message.content);
							glogo = basicurl + content.glogo;
							gname = content.gname;
						}
						var time = dateFormat(item.message.createTime, "isoDateTime");
						var partHtml = "<a href='../user/notify.html?rid="+ item.message.id +"'><div class='w-intf w-intf-1 f-cb bd03'><div class='fl img bg00 bd04'><img src='" + glogo + "' class='bg03'/></div><div class='dtl'>" + "<p class='ln0 fs04 fc03'>" + gname + "</p><div class='ln1 fs03 fc01'>" + item.message.title + "</div><p class='ln2 fs08 fc04'>" + time + "</p></div></div></a>";
						totalHtml.push(partHtml);
					});
					renderBox.html(totalHtml.join(""));
	        	}	
	        }
	    }
	});
}
function renderSystem(){
	renderBox.hide();
	noresultBox.hide();
	loadingBox.show();
	var opt = {
		type : 0,
		limit : 1000,
		offset : 0,
		total : true
	}
	$.ajax({
	    url: "http://www.hijufou.com/rest/message/list",
	    type: "POST",
	    dataType: "json",
	    data : opt,
	    xhrFields: {withCredentials: true},
	    success: function(data) {
	        if(data.code == 1){
	        	loadingBox.hide();
	        	if(data.result.list.length == 0){
	        		renderBox.hide();
	        		noresultBox.show();
	        	}else{
	        		noresultBox.hide();
	        		renderBox.show();
	        		totalHtml = [];
	        		$.each(data.result.list, function(i, item) {
						var time = dateFormat(item.message.createTime, "isoDateTime");
						var partHtml = "<div class='w-intf w-intf-0 f-cb bd03'><div class='f-bg fl icn'>&nbsp;</div><div class='dtl'>" + "<div class='ln1 fs03 fc03'>" + item.message.body + "</div><p class='ln2 fs08 fc04'>" + time + "</p></div></div>";
						totalHtml.push(partHtml);
					});
					renderBox.html(totalHtml.join(""));
	        	}
	        }
	    }
	});
}

