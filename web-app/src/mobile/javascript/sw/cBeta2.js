//page initialize
var bgm;
var ac;
var autoplay=true;
var firsttouch=true;
var startX = 0,
	startY = 0;
	margin = 0;
var pages = null;
var curPage = 0;
var pageWidth = 0,
	pageHeight = 0;
var lineHeight = 0, secHeight = 0;
var scrollPrevent = false, movePrevent = false, touchDown = false;
var moveX,moveY;
$(function(){
	pageWidth = $(window).width();
	pageHeight = $(window).height();
	pages = $("section");
    $("section").css({
        "width": pageWidth + "px",
        "height": pageHeight + "px"
    });
	
	pages.bind('touchstart', function (e) {
		if(autoplay){
        	bgm&&bgm.play();
        }
	    e=e.originalEvent.targetTouches[0];
	    onStart(e);
	});
	    
	pages.bind('touchmove', function (e) {
		e=e.originalEvent.targetTouches[0];
	    onMove(e);
	});
	pages.bind('touchend', function (e) {
		e=e.originalEvent.changedTouches[0];
	    onEnd(e);
	});
	
	bgm = document.getElementById('bgm');
	ac = $('#btn-ac');
	$(bgm).one("canplaythrough", function() {
		this.play();
	});
	bgm.addEventListener('playing',function() {
		ac.addClass('playing');
	},false);

	ac.click(function(event) {
		if (bgm.paused == false) {
			bgm.pause();
		    autoplay=false;
			$(this).removeClass('playing');
		}
		else {
			bgm.play();
			$(this).addClass('playing');
		}
	});
	$(".bmimg").bind('touchend', function (e) {
		location="http://www.hijufou.com/m/meeting/show.html?meetid=240";
	});
});

onload=function(){
	$("#img-load").hide();
	$("#ctn").show();
	$(pages[0]).addClass("showing");
};
//transition animation
function onStart (e) {
	event.preventDefault();
    if(movePrevent == true){
        return false;
    }
    touchDown = true;    
    startX = e.pageX;
    startY = e.pageY;
    moveX=0;
    moveY=0;
    pt_sx_s();
}
function onMove (e) {
	event.preventDefault();
    if(movePrevent == true || touchDown != true)
        return false;
  
    if( scrollPrevent == false && e.pageY != startY)
    {
    	moveX=e.pageX - startX;
    	moveY=e.pageY - startY;
    	pt_sx_m(moveX,moveY);
    }
}
function onEnd (e) {
	event.preventDefault();
    if(movePrevent == true)
        return false;
    touchDown = false;
    movePrevent = true;
    setTimeout("movePrevent=false;", 500);
    if( scrollPrevent == false ){
    	moveX=e.pageX - startX;
    	moveY=e.pageY - startY;
    	pt_sx_e(moveX,moveY);
    }
}

function pt_sx_s(){
	$(pages).css("-webkit-transform-origin","50% 0%");
	$(pages).css("-webkit-transition-duration","0s");
	$(pages[curPage]).css("z-index","9");
	$(pages[curPage-1]).css("z-index","10");
	$(pages[curPage+1]).css("z-index","10");
}
function pt_sx_m(moveX,moveY){
	var scale;
	var curTranslate;
	var nextTranslate;
	var prevTranslate;
	scale=Math.max(0.7,1-0.0012*Math.abs(moveY));
	if(moveY<=0){
		pages[curPage+1]&&$(pages[curPage+1]).addClass("active");
		pages[curPage-1]&&$(pages[curPage-1]).removeClass("active");
		curTranslate=moveY*1.0/20;
		nextTranslate=Math.max(pageHeight*scale+moveY,0);
		$(pages[curPage]).css("-webkit-transform","translate(0px,"+curTranslate+"px) scale("+scale+")");
		pages[curPage+1]&&$(pages[curPage+1]).css("-webkit-transform","translate(0px,"+nextTranslate+"px)");
	}
	else{
		pages[curPage-1]&&$(pages[curPage-1]).addClass("active");
		pages[curPage+1]&&$(pages[curPage+1]).removeClass("active");
		curTranslate=(1-scale)*pageHeight+moveY*1.0/20;
		prevTranslate=Math.min(-pageHeight*scale+moveY,0);
		$(pages[curPage]).css("-webkit-transform","translate(0px,"+curTranslate+"px) scale("+scale+")");
		pages[curPage-1]&&$(pages[curPage-1]).css("-webkit-transform","translate(0px,"+prevTranslate+"px)");
	}
}
function pt_sx_e(moveX,moveY){
	$(pages).css("-webkit-transition-duration",".3s");
	var endscale=0.7;
	if(moveY<-50&&pages[curPage+1]){
		curPage=curPage+1;
		$(pages[curPage-1]).css("-webkit-transform","translate(0px,"+(-endscale*pageHeight)+"px) scale("+endscale+")");
	}
	else if(moveY>50&&pages[curPage-1]){
		curPage=curPage-1;
		$(pages[curPage+1]).css("-webkit-transform","translate(0px,"+pageHeight+"px) scale("+endscale+")");
	}
	else{
		if(moveY<=0){
			pages[curPage+1]&&$(pages[curPage+1]).css("-webkit-transform","translate(0px,"+pageHeight+"px)");
		}
		else{
			pages[curPage-1]&&$(pages[curPage-1]).css("-webkit-transform","translate(0px,"+(-pageHeight)+"px)");
		}			
	}
	$(pages[curPage]).css("-webkit-transform","");
	setTimeout(function(){
		$(pages[curPage]).addClass("showing");
		$(pages[curPage - 1]).removeClass("showing");
	    $(pages[curPage + 1]).removeClass("showing");
	    $(pages[curPage - 1]).removeClass("active");
	    $(pages[curPage + 1]).removeClass("active");
	    $(pages[curPage - 1]).css("-webkit-transform","");
	    $(pages[curPage + 1]).css("-webkit-transform","");
	},300);
}

function onBridgeReady() {
    var mainTitle="海创沙龙",
        mainDesc="80后新生代海归创业明星专场",
        mainURL="http://www.hijufou.com/m/sw/cBeta2.html",
        mainImgUrl= "http://www.hijufou.com/res/mobile/pic/sw/wxhclogo.jpg";

    //转发朋友圈
    WeixinJSBridge.on("menu:share:timeline", function(e) {
        var data = {
            img_url:mainImgUrl,
            img_width: "120",
            img_height: "120",
            link: mainURL,
            //desc这个属性要加上，虽然不会显示，但是不加暂时会导致无法转发至朋友圈，
            desc: mainDesc,
            title: mainTitle
        };
        WeixinJSBridge.invoke("shareTimeline", data, function(res) {
            WeixinJSBridge.log(res.err_msg)
        });
    });
    //同步到微博
    WeixinJSBridge.on("menu:share:weibo", function() {
        WeixinJSBridge.invoke("shareWeibo", {
            "content": mainDesc,
            "url": mainURL
        }, function(res) {
            WeixinJSBridge.log(res.err_msg);
        });
    });
    //分享给朋友
    WeixinJSBridge.on('menu:share:appmessage', function(argv) {
        WeixinJSBridge.invoke("sendAppMessage", {
            img_url: mainImgUrl,
            img_width: "120",
            img_height: "120",
            link: mainURL,
            desc: mainDesc,
            title: mainTitle
        }, function(res) {
            WeixinJSBridge.log(res.err_msg)
        });
    });
};
//执行
document.addEventListener('WeixinJSBridgeReady', function() {
    onBridgeReady();
});