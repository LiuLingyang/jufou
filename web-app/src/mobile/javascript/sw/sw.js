$(document).ready(function(){document.write("本页暂不开放:)");throw new Error();});
window.onorientationchange = orientationChange;
window.onload=function(){
	$(".section-holder").css("visibility","visible");
	$(".wsy section").addClass("showing");
};
function initPage(){
	pageWidth = $(window).width();
    if(pageWidth>640)
        pageWidth=640;
	pageHeight = $(window).height();
}
function orientationChange(){
	initPage();
}
$(document).ready(function(){
	initPage();
});


$(function(){
	//var hX=0.5*pageWidth-30;
	var pX=0.5*(pageWidth-70);
	var pY=0.5*(pageHeight-70);
	var radius=pageWidth*0.25+30+35;
	$("#swlogo").css({
		"top":0.5*(pageHeight-0.5*pageWidth)+"px",
		"left":(0.25*pageWidth)+"px",
		"height":0.5*pageWidth+"px",
	});
	$("#mainmenu").css({
		"top":(pY+radius*Math.sin(Math.PI*30/180))+"px",
		"left":(pX+radius*Math.cos(Math.PI*30/180))+"px",
	});
	$("#menu1").css({
		"top":(pY-radius*Math.sin(Math.PI*0/180))+"px",
		"left":(pX+radius*Math.cos(Math.PI*0/180))+"px",
	});	
	$("#menu2").css({
		"top":(pY-radius*Math.sin(Math.PI*25/180))+"px",
		"left":(pX+radius*Math.cos(Math.PI*25/180))+"px",
	});	
	$("#menu3").css({
		"top":(pY-radius*Math.sin(Math.PI*50/180))+"px",
		"left":(pX+radius*Math.cos(Math.PI*50/180))+"px",
	});	
	$("#menu4").css({
		"top":(pY-radius*Math.sin(Math.PI*75/180))+"px",
		"left":(pX+radius*Math.cos(Math.PI*75/180))+"px",
	});
	
	$(".btn").css({
		"width":0.2*pageWidth+"px",
		"height":0.2*pageWidth+"px",
		"font-size":(0.04*pageWidth)+"px",
		"line-height":0.2*pageWidth+"px",
	});
	$("#btn1").css({
		"left":0.04*pageWidth+"px",
	});
	$("#btn2").css({
		"left":0.28*pageWidth+"px",
	});
	$("#btn3").css({
		"right":0.28*pageWidth+"px",
	});
	$("#btn4").css({
		"right":0.04*pageWidth+"px",
	});
//	$("#menu2").click(function(){return false;});
//	$("#menu3").click(function(){return false;});
//	$("#menu4").click(function(){return false;});
	function menuhandle(){
		if(hidden){
//			$("#menu2").unbind("click");
//			$("#menu3").unbind("click");
//			$("#menu4").unbind("click");
			$("#menu1").toggleClass("hidenmenu");
			setTimeout("$('#menu2').toggleClass('hidenmenu');",100);
			setTimeout("$('#menu3').toggleClass('hidenmenu');",200);
			setTimeout("$('#menu4').toggleClass('hidenmenu');",300);
			hidden=false;
		}
		else{
//			$("#menu2").click(function(){return false;});
//			$("#menu3").click(function(){return false;});
//			$("#menu4").click(function(){return false;});
			$("#menu4").toggleClass("hidenmenu");
			setTimeout("$('#menu3').toggleClass('hidenmenu');",100);
			setTimeout("$('#menu2').toggleClass('hidenmenu');",200);
			setTimeout("$('#menu1').toggleClass('hidenmenu');",300);
			hidden=true;
		}
	}
	//$("#mainmenu").bind('click',menuhandle);
	//$("#mainmenu").click(menuhandle);
	document.getElementById("mainmenu").onclick=menuhandle;
});

var hidden=true;
$(function(){
	$("#menu1").click(function(){
		if(!hidden)
			$("#dialog").css({
				"display":"block"
			});
	});
	$("#close-btn").click(function(){
		$("#dialog").css({
			"display":"none"
		});
	});
});

