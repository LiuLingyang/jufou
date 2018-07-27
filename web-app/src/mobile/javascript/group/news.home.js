/* 
 * 新闻动态页面逻辑
 * @author:lly
 */
var gid = $.jStorage.get("groupid"),
	groupObj = $.jStorage.get("groupObj"),
	basicurl = "http://www.hijufou.com";
	
//新闻渲染主方法
newsRender();

function newsRender(){
	var opt = {
		order : "desc",
		sort : "createTime",
		gid : gid,
		limit : 1000,
		offset : 0
	}
	$.ajax({
	    url: "http://www.hijufou.com/rest/open/news/list",
	    type: "POST",
	    dataType: "json",
	    xhrFields: {withCredentials: true},
	    data:opt,
	    success: function(data) {
	        if(data.code == 1){
	        	var newsHtml = [];
	        	$("#loading").hide();
	        	var arr = data.result.list;
				if (arr.length == 0){
					$("#nomessage").show();
				}else{
					$("#nomessage").hide();
				}
				$.each(arr, function(i, item) {
					var createTime = new Date(item.createTime);
					var time = dateFormat(createTime, "isoDateTime");
					var xdiv="";
					if(item.cover==null||item.cover==""){
						xdiv="<div class='w-dyna f-cb bg00 bd02'>"+
          	                 "<a href='news.show.html?nid="+item.id+"'>"+
          						"<div class='dtl'>"+
          	  						"<p class='fc03 fs04 ln0'>"+item.subject+"</p>"+
          	  						"<p class='fc05 fs08 ln0'>"+item.author+"</p>"+
          	  					"</div>";
          	  			if(item.digest.length>86){
          	  				var string=item.digest.substring(0,86)+'...';
          	  				xdiv=xdiv+
          	  					"<p class='fs02 fc03 dig'>"+string+"</p>"+
          	                    "<p class='fc04 fs08 xti'>"+time+"</p>"+
          					  "</a>"+
          					  "</div>"; 
          	  			}else{
          	  				xdiv=xdiv+
          	  					"<p class='fs02 fc03 dig'>"+item.digest+"</p>"+
          	                    "<p class='fc04 fs08 xti'>"+time+"</p>"+
          					  "</a>"+
          					  "</div>"; 
          	  			}
					}else{
						var xdiv="<div class='w-dyna f-cb bg00 bd02'>"+
          	                 "<a href='news.show.html?nid="+item.id+"'>"+
          	                 "<div class='dtl'>"+
          	 					 "<p class='fc03 fs04 ln0'>"+item.subject+"</p>"+
          	 					 "<p class='fc05 fs08 ln0'>"+item.author+"</p>"+
          				     "</div>"+
          				     "<div class='img'><img src='"+ basicurl+item.cover+"'/></div>"+
          						"<div class='dtl'>"+
          	  					
          	                    "<p class='fc04 fs08 xti'>"+time+"</p>"+
          						"</div>"+
          					  "</a>"+
          					  "</div>"; 
					}
					newsHtml.push(xdiv);
				});
				$("#items").append(newsHtml.join(" "));
	        }
	    }
	});
}