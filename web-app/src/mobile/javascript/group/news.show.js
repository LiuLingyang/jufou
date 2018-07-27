/* 
 * 新闻动态页面逻辑
 * @author:lly
 */
var objs = parseURL();
var nid = objs.nid;
var	basicurl = "http://www.hijufou.com";

newsDetailRender();
			
function newsDetailRender() {
	$.ajax({
	    url: "http://www.hijufou.com/rest/open/news/get",
	    type: "POST",
	    dataType: "json",
	    xhrFields: {withCredentials: true},
	    data:{nid:nid},
	    success: function(data) {
	        if(data.code == 1){
	        	var item=data.result;
				var createTime = new Date(item.createTime);
				var time = dateFormat(createTime, "isoDateTime");
				var title=item.subject;
				var author = item.author;
				var content=item.content;
				$("#title").append(title);
				$("#date").append(time);
				$("#author").append(author);
				$("#content").append(content);
				$("#groupTitle").text(item.subject);
	        }
	    }
	});
};