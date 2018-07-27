$(document).ready(function(){
	$(".join").click(function(){
		location = "http://www.hijufou.com/m/icard/nlsy.html";
	});
});
function onBridgeReady() {
	var mainTitle = "必须得看！南林史无前例纳新宣传", mainDesc = "发布最新社团活动动态，分享缤纷校园文化", mainURL = "http://www.hijufou.com/m/icard/nlc.html", mainImgUrl = "http://www.hijufou.com/res/mobile/pic/cardpic/nlwxlogo.jpg";

	// 转发朋友圈
	WeixinJSBridge.on("menu:share:timeline", function(e) {
		var data = {
			img_url : mainImgUrl,
			img_width : "120",
			img_height : "120",
			link : mainURL,
			// desc这个属性要加上，虽然不会显示，但是不加暂时会导致无法转发至朋友圈，
			desc : mainDesc,
			title : mainTitle
		};
		WeixinJSBridge.invoke("shareTimeline", data, function(res) {
			WeixinJSBridge.log(res.err_msg)
		});
	});
	// 同步到微博
	WeixinJSBridge.on("menu:share:weibo", function() {
		WeixinJSBridge.invoke("shareWeibo", {
			"content" : mainDesc,
			"url" : mainURL
		}, function(res) {
			WeixinJSBridge.log(res.err_msg);
		});
	});
	// 分享给朋友
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
};
// 执行
document.addEventListener('WeixinJSBridgeReady', function() {
	onBridgeReady();
});