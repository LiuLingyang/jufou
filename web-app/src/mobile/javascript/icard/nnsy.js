$(function(){
		$("#btn1").click(function(){
			location="http://www.hijufou.com/m/system/group.html?meid=1073&groupid=1073&groupcode=njnydxgqt";
		});
		$("#btn2").click(function(){
			location="";
		});
		$("#btn3").click(function(){
			location="http://www.hijufou.com/m/system/meet.html?meid=1073&groupid=1073&groupcode=njnydxgqt";
		});
		function onBridgeReady() {
			var mainTitle = "南京农业大学社团联合会", mainDesc = "发布最新社团活动动态，分享缤纷校园文化", mainURL = "http://www.hijufou.com/m/icard/nnsy.html", mainImgUrl = "http://www.hijufou.com/res/mobile/pic/cardpic/nnwxlogo.jpg";

			WeixinJSBridge.on("menu:share:timeline", function(e) {
				var data = {
					img_url : mainImgUrl,
					img_width : "120",
					img_height : "120",
					link : mainURL,
					desc : mainDesc,
					title : mainTitle
				};
				WeixinJSBridge.invoke("shareTimeline", data, function(
						res) {
					WeixinJSBridge.log(res.err_msg)
				});
			});

			WeixinJSBridge.on("menu:share:weibo", function() {
				WeixinJSBridge.invoke("shareWeibo", {
					"content" : mainDesc,
					"url" : mainURL
				}, function(res) {
					WeixinJSBridge.log(res.err_msg);
				});
			});

			WeixinJSBridge.on('menu:share:appmessage', function(argv) {
				WeixinJSBridge.invoke("sendAppMessage", {
					img_url : mainImgUrl,
					img_width : "120",
					img_height : "120",
					link : mainURL,
					desc : mainDesc,
					title : mainTitle
				}, function(res) {
					WeixinJSBridge.log(res.err_msg)
				});
			});
		}
		;

		document.addEventListener('WeixinJSBridgeReady', function() {
			onBridgeReady();
		});		
	});
	window.onload=function(){
		$("#img-load").hide();
		$(".ctn-sy").show();
	};