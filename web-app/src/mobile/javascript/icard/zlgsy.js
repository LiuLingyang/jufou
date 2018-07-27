window.onload = function() {
	$("#img-load").hide();
	$(".ctn-sy").show();
};
$(function() {
		var fold=true;
		$("#btn1").click(function() {
			location = "http://www.hijufou.com/m/system/group.html?meid=1965&groupid=1965&groupcode=zjlgdxstl";
		});
		$("#btn2").click(function() {
			location = "http://www.hijufou.com/m/system/meet.html?meid=1965&groupid=1965&groupcode=zjlgdxstl";
		});
		$("#btn3").click(function() {
			location = "./zlgc.html";
		});
		$("#btn4").click(function() {
			if(fold){
				fold=false;
				$("#bc").show();
				setTimeout(function(){$("#bc").removeClass('fold');},0);
				//$("#bc").removeClass('fold');
			}
		});
		$("#bc").click(function() {
			if(!fold){
				fold=true;
				$("#bc").addClass('fold');
				setTimeout(function(){$("#bc").hide();},1000);
			}
		});
		$("#item1").click(function() {
			location = "http://weibo.com/u/2622362897";
		});
		$("#item2").click(function() {
			location = "http://t.qq.com/stlhhcmb?preview ";
		});
		$("#item3").click(function() {
			location = "http://page.renren.com/601036693?id=601036693";
		});
		$("#item4").click(function() {
			$(".dia-wx").fadeIn();
		});
		$("#item5").click(function() {
			$(".dia-wx").fadeOut();
			$(".ctn-item").fadeOut();
			$(".btn-contact").fadeIn();
		});
		$(".btn-contact").click(function() {
			$(".ctn-item").fadeIn();
			$(".btn-contact").fadeOut();
		});
		$(".btn-close").click(function() {
			$(".dia-wx").fadeOut();
		});
		function onBridgeReady() {
			var mainTitle = "浙江理工大学社团之窗", mainDesc = "发布最新社团活动动态，分享缤纷校园文化", mainURL = "http://www.hijufou.com/m/icard/zlgsy.html", mainImgUrl = "http://www.hijufou.com/res/mobile/pic/cardpic/zlgwxlogo.jpg";

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