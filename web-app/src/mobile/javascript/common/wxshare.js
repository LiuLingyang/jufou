//微信分享设置
//@depend common/base.js
((function(){
	var mainImgUrl,mainURL=location.href,mainDesc,mainTitle,img_width=200,img_height=200;
	
	//配置分享时的图片，标题
	var directory=location.pathname.split("/")[3],basicUrl="http://www.hijufou.com",temp;
	switch(directory){
		case 'meet.html':
		case 'group.html':
			temp=$.jStorage.get("fatherObj");
			mainTitle=temp.name;
			mainImgUrl=basicUrl+temp.thumbnail;
			mainDesc=mainTitle+"-聚否小组";
			break;
		case 'home.html':
			temp=$.jStorage.get("groupObj");
			mainTitle=temp.name;
			mainImgUrl=basicUrl+temp.thumbnail;
			mainDesc=mainTitle+"-聚否小组";
			break;
		case 'detail.html':
			temp=$.jStorage.get("meetObj");
			mainURL=basicUrl+"/m/meeting/detail.html?meetid="+temp.id;
			mainTitle=temp.title;
			mainImgUrl=basicUrl+temp.cover;
			mainDesc=mainTitle+"-聚否活动";
			img_width=225;
			img_height=150;
			break;	
	}
	if(typeof WeixinJSBridge == 'object'){
		WeixinJSBridge.on("menu:share:timeline",
	    function(e) {
	        var data = {
	            img_url: mainImgUrl,
	            img_width: img_width,
	            img_height: img_height,
	            link: mainURL,
	            desc: mainDesc,
	            title: mainTitle
	        };
	        WeixinJSBridge.invoke("shareTimeline", data,
	        function(res) {
	            WeixinJSBridge.log(res.err_msg)
	        });
	    });

	    WeixinJSBridge.on("menu:share:weibo",
	    function() {
	        WeixinJSBridge.invoke("shareWeibo", {
	            "content": mainDesc,
	            "url": mainURL
	        },
	        function(res) {
	            WeixinJSBridge.log(res.err_msg);
	        });
	    });

	    WeixinJSBridge.on('menu:share:appmessage',
	    function(argv) {
	        WeixinJSBridge.invoke("sendAppMessage", {
	            img_url: mainImgUrl,
	            img_width: img_width,
	            img_height: img_height,
	            link: mainURL,
	            desc: mainDesc,
	            title: mainTitle
	        },
	        function(res) {
	            WeixinJSBridge.log(res.err_msg)
	        });
	    });
	}else{
		document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
		WeixinJSBridge.on("menu:share:timeline",
	    function(e) {
	        var data = {
	            img_url: mainImgUrl,
	            img_width: img_width,
	            img_height: img_height,
	            link: mainURL,
	            desc: mainDesc,
	            title: mainTitle
	        };
	        WeixinJSBridge.invoke("shareTimeline", data,
	        function(res) {
	            WeixinJSBridge.log(res.err_msg)
	        });
	    });

	    WeixinJSBridge.on("menu:share:weibo",
	    function() {
	        WeixinJSBridge.invoke("shareWeibo", {
	            "content": mainDesc,
	            "url": mainURL
	        },
	        function(res) {
	            WeixinJSBridge.log(res.err_msg);
	        });
	    });

	    WeixinJSBridge.on('menu:share:appmessage',
	    function(argv) {
	        WeixinJSBridge.invoke("sendAppMessage", {
	            img_url: mainImgUrl,
	            img_width: img_width,
	            img_height: img_height,
	            link: mainURL,
	            desc: mainDesc,
	            title: mainTitle
	        },
	        function(res) {
	            WeixinJSBridge.log(res.err_msg)
	        });
	    });	
		});
	}
})());