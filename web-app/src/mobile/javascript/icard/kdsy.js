	$(function(){
	if ($(".ctn-sy").hasClass("zgkd")) {
		$("#btn1").click(function(){
			location="http://www.hijufou.com/m/icard/kdc.html";
		});
		$("#btn2").click(function(){
			location="http://www.hijufou.com/m/system/meet.html?meid=926&groupid=926&groupcode=zgkydxsl";
		});
		$("#btn3").click(function(){
			location="http://www.hijufou.com/m/system/group.html?meid=926&groupid=926&groupcode=zgkydxsl";
		});
		$("#btn4").click(function(){
			location="http://www.hijufou.com/m/group/about.html?groupid=926";
		});
		$(".ctn-mainmenu").click(function(){
			$(".mainmenu,.ctn-menu").toggleClass("click");
		});
		$("#menu1").click(function(){
			location="http://m.weibo.cn/u/2774331011";
		});
		$("#menu2").click(function(){
			location="http://m.qzone.com/infocenter?g_f=18171#903645588/mine";
		});
		$("#menu3").click(function(){
			location="http://tieba.baidu.com/f?kw=%E5%A4%9A%E5%BD%A9%E7%A4%BE%E8%81%94&mo_device=1&pn=0&";
		});
		$("#menu4").click(function(){
			location="http://mt.renren.com/page/600934133?mflag=8b8a9970";
		});
		function onBridgeReady() {
			var mainTitle = "中国矿业大学社团联合会", mainDesc = "发布最新社团活动动态，分享缤纷校园文化", mainURL = "http://www.hijufou.com/m/icard/kdsy.html", mainImgUrl = "http://www.hijufou.com/res/mobile/pic/cardpic/kdwxlogo.jpg";

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
		}
	});
	window.onload=function(){
		$("#img-load").hide();
		$(".ctn-sy").show();
	};