/*
 * 微信分享api
 * 需在分享html页面的body标签上添加data-wx-title,data-wx-desc,data-wx-img,
 * @author:wt
 */
$(function(){
	var body=$("body");
	var mainTitle,mainDesc,mainImgUrl,mainURL=location.href;
	var wxshare=(mainTitle=body.data("wxTitle"))&&(mainDesc=body.data("wxDesc"))&&(mainImgUrl=body.data("wxImg"));
	function onBridgeReady() {
	    WeixinJSBridge.on("menu:share:timeline",
	    function(e) {
	        var data = {
	            img_url: mainImgUrl,
	            img_width: "120",
	            img_height: "120",
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
	            img_width: "120",
	            img_height: "120",
	            link: mainURL,
	            desc: mainDesc,
	            title: mainTitle
	        },
	        function(res) {
	            WeixinJSBridge.log(res.err_msg)
	        });
	    });
	};
	if(wxshare){
		document.addEventListener('WeixinJSBridgeReady',onBridgeReady);
	}
});
