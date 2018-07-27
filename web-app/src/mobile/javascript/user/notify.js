/* 
 * 群通知详细页面逻辑
 * @author:lly
 */
var objs = parseURL();
var rid = objs.rid;
var gid = $.jStorage.get("groupid"),
	basicurl = "http://www.hijufou.com";
	
//获取通知详细
getNotifyDetail();

//设置已读
$.ajax({
	url : "http://www.hijufou.com/rest/message/read",
	type : "GET",
	data : {"mids" : rid},
	xhrFields: {withCredentials: true},
	success : function(data) {

	}
});

function getNotifyDetail(){
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
	        	$.each(data.result.list, function(i, item) {
	        		if(rid == item.message.id){
	        			var glogo = "";
						if (item.message.content) {
							var content = $.parseJSON(item.message.content);
							glogo = basicurl + content.glogo;
							gname = content.gname;
						}
						var time = dateFormat(item.message.createTime, "isoDateTime");
						$("#msgTitle").text(content.title);
						$("#msgdetail").text(content.content);
						$("#msgLogo").attr("src", glogo);
						$("#msgOrg").text(gname);
						$("#msgTime").text(time);
	        		}
	        	})
	        }
	    }
	});
}