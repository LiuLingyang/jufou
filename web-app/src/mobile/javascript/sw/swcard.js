$(document).ready(function(){document.write("本页暂不开放:)");throw new Error();});
var bgm;
var ac;
var autoplay=true;

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
		console.log("start:"+e.originalEvent.targetTouches[0].pageY);
    	e=e.originalEvent.targetTouches[0];
        onStart(e);     
        if(autoplay){
        	bgm&&bgm.play();
        }
    });
    
    pages.bind('touchmove', function (e) {
		console.log("move:"+e.originalEvent.targetTouches[0].pageY);
    	e=e.originalEvent.targetTouches[0];
        onMove(e);
    });
    
    pages.bind('touchend', function (e) {
		console.log("end:"+e.originalEvent.changedTouches[0].pageY);
    	e=e.originalEvent.changedTouches[0];
        onEnd(e);
    });

}
function orientationChange(){
	initPage();
}
$(document).ready(function(){
	initPage();
	$(pages[0]).addClass("showing");
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

	$("#swtext2").bind('touchend', function (e) {
		location="wsy.html";
		 e.stopPropagation();
    });
	
});

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
	var endscale=0.1;
	if(moveY<-50&&pages[curPage+1]){
	
		curPage=curPage+1;
		$(pages[curPage-1]).css("-webkit-transform","translate(0px,"+(-endscale*pageHeight)+"px) scale("+endscale+")");
	}
	else if(moveY>50&&pages[curPage-1]){
	
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

function pt_sxh_s(){
	$(pages).css("-webkit-transform-origin","0% 50%");
	$(pages).css("-webkit-transition-duration","0s");
	$(pages[curPage]).css("z-index","9");
	$(pages[curPage-1]).css("z-index","10");
	$(pages[curPage+1]).css("z-index","10");
}
function pt_sxh_m(moveX,moveY){
	var scale;
	var curTranslate;
	var nextTranslate;
	var prevTranslate;
	scale=1-0.0012*Math.abs(moveX);
	if(moveX<=0){
		
		pages[curPage+1]&&$(pages[curPage+1]).addClass("active");
		pages[curPage-1]&&$(pages[curPage-1]).removeClass("active");
		curTranslate=moveX*1.0/20;
		nextTranslate=Math.max(pageWidth*scale+moveX,0);
		$(pages[curPage]).css("-webkit-transform","translate("+curTranslate+"px,0px) scale("+scale+")");
		pages[curPage+1]&&$(pages[curPage+1]).css("-webkit-transform","translate("+nextTranslate+"px,0px)");
	}
	else{
	
		pages[curPage-1]&&$(pages[curPage-1]).addClass("active");
		pages[curPage+1]&&$(pages[curPage+1]).removeClass("active");
		curTranslate=(1-scale)*pageWidth+moveX*1.0/20;
		prevTranslate=Math.min(-pageWidth*scale+moveX,0);
		$(pages[curPage]).css("-webkit-transform","translate("+curTranslate+"px,0px) scale("+scale+")");
		pages[curPage-1]&&$(pages[curPage-1]).css("-webkit-transform","translate("+prevTranslate+"px,0px)");
	}
}
function pt_sxh_e(moveX,moveY){
	$(pages).css("-webkit-transition-duration",".3s");
	var endscale=0.1;
	if(moveX<-50&&pages[curPage+1]){
		
		curPage=curPage+1;
		$(pages[curPage-1]).css("-webkit-transform","translate("+(-endscale*pageWidth)+"px,0px) scale("+endscale+")");
	}
	else if(moveX>50&&pages[curPage-1]){
	
		curPage=curPage-1;
		$(pages[curPage+1]).css("-webkit-transform","translate("+pageWidth+"px,0px) scale("+endscale+")");
	}
	else{
		if(moveX<=0)
			pages[curPage+1]&&$(pages[curPage+1]).css("-webkit-transform","translate("+pageWidth+"px,0px)");
		else
			pages[curPage-1]&&$(pages[curPage-1]).css("-webkit-transform","translate("+(-pageWidth)+"px,0px)");
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