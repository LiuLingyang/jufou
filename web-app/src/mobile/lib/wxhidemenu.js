//隐藏微信右上角按钮
((function(){
	if(typeof WeixinJSBridge == 'object'){
		WeixinJSBridge.call('hideOptionMenu');
	}else{
		document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
			WeixinJSBridge.call('hideOptionMenu');	
		});
	}
})());