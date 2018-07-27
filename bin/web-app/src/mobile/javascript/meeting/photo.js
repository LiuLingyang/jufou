var oid = $.jStorage.get("meetid");
  		var title = $.jStorage.get("meettitle");
  		$("#meettitle").text(title);

  		$.getJSON("http://www.hijufou.com/rest/open/photo/list",
  	         {mid:oid},
  	         function(data) {
  	         	var meetinfo = data.result;
  	         	var imag = "http://www.hijufou.com"
				$.each(meetinfo.list, function(i, item) {
				    var picURL = imag + item.originalURL;
					var xdiv = "<li><a href='" + picURL+"'><img src='" + picURL+"' alt='Image 001'/></a></li>"; 
	    			$("#Gallery").append(xdiv);
				});
  	         }
  		);	
  	
  	
  	
  	
