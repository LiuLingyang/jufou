window.onload = function() {
	$("#img-load").hide();
	$(".ctn-sy").show();
};
$(function() {
		$("#btn1").click(function() {
			location = "nhc.html";
		});
		$("#btn2").click(function() {
			location = "http://www.hijufou.com/m/system/group.html?meid=2519&groupid=2519&groupcode=nhstl";
		});
		$("#btn3").click(function() {
			location = "http://www.hijufou.com/m/system/meet.html?meid=2519&groupid=2519&groupcode=nhstl";
		});
		$("#btn4").click(function() {
			location = "http://www.hijufou.com/m/group/about.html?groupid=2519";
		});
		function onBridgeReady() {
			var mainTitle = "南京航空航天大学社团联合会", mainDesc = "发布最新社团活动动态，分享缤纷校园文化", mainURL = "http://www.hijufou.com/m/icard/nhsy.html", mainImgUrl = "http://www.hijufou.com/res/mobile/pic/cardpic/nhwxlogo.jpg";

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