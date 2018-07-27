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
	scale=1-0.0012*Math.abs(moveY);
	if(moveY<=0){
		//下翻
		pages[curPage+1]&&$(pages[curPage+1]).addClass("active");
		pages[curPage-1]&&$(pages[curPage-1]).removeClass("active");
		curTranslate=moveY*1.0/20;
		nextTranslate=Math.max(pageHeight*scale+moveY,0);
		$(pages[curPage]).css("-webkit-transform","translate(0px,"+curTranslate+"px) scale("+scale+")");
		pages[curPage+1]&&$(pages[curPage+1]).css("-webkit-transform","translate(0px,"+nextTranslate+"px)");
	}
	else{
		//上翻
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
	var endscale=0.1;
	if(moveY<-50&&pages[curPage+1]){
		//下翻
		curPage=curPage+1;
		$(pages[curPage-1]).css("-webkit-transform","translate(0px,"+(-endscale*pageHeight)+"px) scale("+endscale+")");
	}
	else if(moveY>50&&pages[curPage-1]){
		//上翻
		curPage=curPage-1;
		$(pages[curPage+1]).css("-webkit-transform","translate(0px,"+pageHeight+"px) scale("+endscale+")");
	}
	else{
		if(moveY<=0)
			pages[curPage+1]&&$(pages[curPage+1]).css("-webkit-transform","translate(0px,"+pageHeight+"px)");
		else
			pages[curPage-1]&&$(pages[curPage-1]).css("-webkit-transform","translate(0px,"+(-pageHeight)+"px)");
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

var bgm;
var ac;
var autoplay=true;
var firsttouch=true;
function initPage(){
	pageWidth = $(window).width();
    if(pageWidth>640)
        pageWidth=640;
	pageHeight = $(window).height();
	pages = $(".wrap section");

    $(".wrap section").css({
        "width": pageWidth + "px",
        "height": pageHeight + "px"
    });
    secHeight = pageHeight * $(".wrap section").length;
    lineHeight = $(".wrap section").length * 832;
    pages.bind('touchstart', function (e) {
    	e=e.originalEvent.targetTouches[0];
        onStart(e);     
        if(autoplay){
        	bgm&&bgm.play();
        }
        if(firsttouch){
        	firsttouch=false;
        	$("#tip").hide();
        	$(pages[0]).addClass("showing");
        	$(pages[0]).removeClass("active");
        }
    });
    
    pages.bind('touchmove', function (e) {
    	e=e.originalEvent.targetTouches[0];
        onMove(e);
    });
    
    pages.bind('touchend', function (e) {
    	e=e.originalEvent.changedTouches[0];
        onEnd(e);
    });
//    $("#bm").bind('click', function (e) {
//    	location.href="http://www.baidu.com";
//    });
    
}
function orientationChange(){
	initPage();
}
$(document).ready(function(){
	initPage();
});

$(document).ready(function(){
	var bgm = document.getElementById('bgm');
	var ac = $('#music-control');

	playBgm();

	function playBgm() {
	    $(bgm).one("canplaythrough", function() {
	        this.play();
	    });
	}
	
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

	$("#bm").bind('touchend', function (e) {
		location="http://www.hijufou.com/m/meeting/show.html?meetid=240";
		e.stopPropagation();
    });
	

});
// 页面翻转
var startX = 0,
    startY = 0;
    margin = 0;
var pages = null;
var curPage = 0;
var pageWidth = 0,
    pageHeight = 0;
var lineHeight = 0, secHeight = 0;
var targetElement = null;
var scrollPrevent = false, movePrevent = false, touchDown = false;
var moveX,moveY;

function onStart (e) {
    if(movePrevent == true){
        event.preventDefault();
        return false;
    }
    touchDown = true;    
    // 起始点，移动距离
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
    setTimeout("movePrevent=false;", 300);
    if( scrollPrevent == false ){
    	moveX=e.pageX - startX;
    	moveY=e.pageY - startY;
    	pt_sx_e(moveX,moveY);
    }
}

