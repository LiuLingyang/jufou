/* 
 * 组织通讯录页面逻辑
 * @author:lly
 */
var gid = $.jStorage.get("groupid"),
	renderBox = $("#items");

var groupObj = $.jStorage.get("groupObj");    
groupObj&&($('#groupTitle').text(groupObj.name));

var getlist = function() {
	$.ajax({
	    url: "http://www.hijufou.com/rest/contact/list",
	    type: "POST",
	    dataType: "json",
	    xhrFields: {withCredentials: true},
	    data:{gid:gid},
	    success: function(data) {
	        switch(data.code){
				case 1:
					if (data.result.list.length == 0){
						renderBox.hide();
						$("#nomessage").show();
					}else{
						var contaceHtml = [];
						$("#nomessage").hide();
						renderBox.show();
						$.each(data.result.list, function(i, item) {
							var xdiv="";
							xdiv="<div class='w-tact bg00 bd02'>"+
		      	  				"<div class='bd02 ln0 f-cb'>"+
		      	   				 "<div class='fl fs03 nam'>"+item.name+"</div>"+
		      	  				"</div>"+
		      	  				"<div class='ln1 fs03'>"+
		      	  				"<p>公司：<span class='fc04'>"+item.company+"</span></p>"+
		      	  	            "<p>手机：<span class='fc04'>"+item.mobile+"</span></p>"+
		      	  				"<p>邮箱：<span class='fc04'>"+item.email+"</span></p>"+
		      	  				"<p>QQ：<span class='fc04'>"+item.qq+"</span></p>"+
		      	  				"</div>"+
		      					"</div>";
		      				contaceHtml.push(xdiv);
						});
						renderBox.html(contaceHtml.join(""));
					}		
				break;
			}
	    }
	});
};
getlist();

