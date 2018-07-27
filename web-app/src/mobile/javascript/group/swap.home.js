/* 
 * 互动交流页面逻辑
 * @author:lly
 */
var gid = $.jStorage.get("groupid");

var getlist = function() {
	$.getJSON("http://www.hijufou.com/rest/open/share/list", {
		order : "desc",
		sort : "pubishTime",
		gid : gid,
		limit : 1000,
		offset : 0
	}, function(data) {
		switch(data.code){
			case 1:
				var arr = data.result.list;
				if (arr.length == 0){
					$("#nomessage").show();
				}else{
					$("#nomessage").hide();
				}
				$.each(arr, function(i, item) {    	
					var createTime = new Date(item.pubishTime);
					var time = dateFormat(createTime, "isoDateTime");
					var xdiv="";
					var photo = "";
					var uploader = "";
					var content="";
					var thumbnail="";
					if(item.image!=null)
					{
						thumbnail="http://www.hijufou.com"+item.image.uploader.thumbnail;
					}
					else
					{
						thumbnail="../../../../res/mobile/pic/face50.jpg";
					}
					if(item.content.length>60)
					{
						content=item.content.substring(0,60)+"...";
					}
					else
					{
						content=item.content;
					}
      	
					if (item.image != null) {
						photo = "<img src='http://www.hijufou.com"+item.image.thumbnailURL+"' class='pic'/>"
						      + "<img src='../../../../res/mobile/pic/groupmask.png' class='mask'/>";
					}
					if (item.publiser != null) {
						var pic = "<img src='../../../../res/mobile/pic/face50.jpg' class='br1 fl bg04'>";
						if (item.publisher.thumbnail != null) {
							pic = "http://www.hijufou.com" + item.publisher.thumbnail;
						}
						uploader = "<img src='"+ pic +"' class='br1 fl bg04'><div class='fl nam fc00'>" + 
						           item.publisher.nickname + "</div>";
					}
					xdiv="<div class='w-swap bg04'>"+
			      	  "<a href='swap.person.html?sid="+item.id+"'>"+
			      	  photo +
			      	  "<div class='dtl'>"+
			      	  	"<p class='fc00 fs03 ln1'>"+item.title+"</p>"+
			      	  	"<p class='fc08 fs02 ln2'>"+content+"</p>"+
			      	  	"<p class='fc08 fs08 ln3'>"+item.commentCount+"条评论</p>"
			      	  "</div>"+
			      	  "<div class='inf bd04 f-cb fs08'>"+
			      	    uploader +
			      	    "<div class='fr fc04'>"+time+"</div>"+
			      	  "</div>"+
			      	  "</a>"+
			      	"</div>";
          			$("#items").append(xdiv);
				});			
				break;
		}		
	});
};
getlist();