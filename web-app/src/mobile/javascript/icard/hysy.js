
		window.onload = function() {
			$("#img-load").hide();
			$(".ctn-sy").show();
		};
		$(function() {
			if ($(".ctn-sy").hasClass("shhy")) {
				$("#btn1").click(function() {
					location = "http://mp.weixin.qq.com/s?__biz=MzA5NTk2NTMwMg==&mid=200553786&idx=1&sn=b817423fbfb786baa40f3d4b099f6659#rd";
				});
				$("#btn2").click(function() {
					location = "http://www.hijufou.com/m/system/group.html?meid=784&groupid=784&groupcode=shhydx";
				});
				$("#btn3").click(function() {
					location = "http://www.sojump.com/m/3741934.aspx";
				});
				$("#btn4").click(function() {
					location = "http://mp.weixin.qq.com/s?__biz=MzA5NTk2NTMwMg==&mid=200567126&idx=1&sn=ff6e1fbe1ad2c982e5496011a2dd1e6e#rd";
				});
				if ($(window).height() < $(window).width())
					alert("使用竖屏观看效果更佳");

				var scale = 30;
				function btninit() {
					function btnShift() {
						$(".btn-main").each(
								function() {
									var s = "translate(" + Math.random()
											* scale + "px," + Math.random()
											* scale + "px)";
									$(this).css("-webkit-transform", s);
								});
					}
					setInterval(btnShift, 2000);
				}
				setTimeout(btninit, 2000);
				function onBridgeReady() {
					var mainTitle = "上海海洋大学社团联合会", mainDesc = "发布最新社团活动动态，分享缤纷校园文化", mainURL = "http://www.hijufou.com/m/icard/hysy.html", mainImgUrl = "http://www.hijufou.com/res/mobile/pic/cardpic/hywxlogo.jpg";

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