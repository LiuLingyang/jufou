window.onload = function() {
	$("#img-load").hide();
	$(".ctn-sy").show();
};
$(function() {
	if ($(".ctn-sy").hasClass("dhdx")) {
		$("#btn1").click(function() {
		});
		$("#btn2")
				.click(
						function() {
							location = "http://www.hijufou.com/m/system/group.html?meid=1057&groupid=1057&groupcode=dhdx";
						});
		$("#btn3")
				.click(
						function() {
							location = "http://www.hijufou.com/m/system/meet.html?meid=1057&groupid=1057&groupcode=dhdx";
						});
		$("#btn4").click(function() {
			location = "http://www.hijufou.com/m/group/about.html?groupid=1057";
		});
		
		function onBridgeReady() {
			var mainTitle = "东华大学社团发展中心", mainDesc = "发布最新社团活动动态，分享缤纷校园文化", mainURL = "http://www.hijufou.com/m/icard/dhsy.html", mainImgUrl = "http://www.hijufou.com/res/mobile/pic/cardpic/dhwxlogo.jpg";

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
	}
});