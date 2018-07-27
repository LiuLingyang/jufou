window.onload = function() {
	$("#img-load").hide();
	$(".ctn-sy").show();
};
$(function() {
		$("#btn1").click(function() {
			location = "http://www.hijufou.com/m/system/group.html?meid=1013&groupid=1013&groupcode=njlydxsl";
		});
		$("#btn2").click(
						function() {
							location = "http://www.hijufou.com/m/icard/nlc.html";
						});
		$("#btn3").click(
						function() {
							location = "http://www.hijufou.com/m/system/meet.html?meid=1013&groupid=1013&groupcode=njlydxsl";
						});

		function onBridgeReady() {
			var mainTitle = "南京林业大学社团联合会", mainDesc = "发布最新社团活动动态，分享缤纷校园文化", mainURL = "http://www.hijufou.com/m/icard/nlsy.html", mainImgUrl = "http://www.hijufou.com/res/mobile/pic/cardpic/nlwxlogo.jpg";

			WeixinJSBridge.on("menu:share:timeline", function(e) {
				var data = {
					img_url : mainImgUrl,
					img_width : "120",
					img_height : "120",
					link : mainURL,
					desc : mainDesc,
					title : mainTitle
				};
				WeixinJSBridge.invoke("shareTimeline", data, function(res) {
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