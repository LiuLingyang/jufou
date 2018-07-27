  	//http://www.hijufou.com/rest/open/comment/list?type=1&oid=20&offset=0&limit=10&total=true
  	var oid = $.jStorage.get("meetid");
  	var imag = "http://www.hijufou.com";
  	var title = $.jStorage.get("meettitle");
  	
  	$("#meettitle").text(title);
  	$.getJSON("http://www.hijufou.com/rest/open/comment/list",
  	         {oid:oid,type:1,limit:10,offset:0,total:true},
  	         function(data) {
  	         	var meetinfo = data.result;
  	         	
				$.each(meetinfo.list, function(i, item) {
				    var picURL = imag + item.poster.portrait;
				    var time = dateFormat(item.postTime,"isoDateTime");
					var xdiv = "<div class='w-intf w-intf-1 f-cb'><img class='fl fac f-sd br1' src='" + picURL + "'></img>"  
			         + "<div class='dtl'><p class='ln0'>" + item.poster.nickname + "</p><div class='ln3 f-tf'>" + item.content + "</div><p class='ln2'>"
			         + time +"</p></div></div>"; 
			         xdiv = xdiv.replace("NaN","");
	    			$("#commentList").append(xdiv);
				});
  	         }
  	);
  	
  	//http://hijufou.com/rest/comment/add?oid=8&type=1&content=test
  	
  	$("#addbtn").click(
  		function(){
  			var user = $.jStorage.get("userObj");
  		    if (user == null) {
  		    	var preURL = location.href;
				$.jStorage.set("preLink",preURL);
				location.href = "../user/login.html";
  		    } else {
	  			var cmt = $("#newcomment").val();
	  			$.ajax({
				url: "http://www.hijufou.com/rest/comment/add",
				type: "POST",
				xhrFields: {withCredentials: true},
				data: {"oid": oid, "type": 1, "content" : cmt},
				success: function(data) {
				    data = jQuery.parseJSON(data);
					if (data.code == -3) {
						alert("抱歉，您无法发表言论");
					} else if (data.code == 1){
						var user = data.result;
						location.reload();
					}
				},
				
				error : function(data) {
					if (data.status == 401) {
						alert("抱歉，您无法发表言论");
					}
				}
				
				});
			}
  		}
  	);

