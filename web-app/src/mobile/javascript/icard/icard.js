((function(){var m;var q;var b=true;var h=0,f=0;var c=null;var k=0,l,g;var n=0,e=0;var a;var i=5;var o=300;var d=false;$.ajax({url:"http://www.hijufou.com/rest/open/meeting/search?keyword=xxxxxx",dataType:"json",error:function(){document.write("   ")}});if(/Windows Phone/.test(navigator.userAgent)){alert("抱歉，暂不支持windows phone:)");throw new Error("windows phone!")}window.onload=function(){$("#img-load").hide();$(".ctn-page").show();$("#btn-ac").show();$(c[0]).addClass("showing")};document.ondragstart=function(){return false};window.onorientationchange=function(){alert("竖屏观看更佳哦！")};function j(){var r=new RegExp("(Android|iPad|iPhone|Windows Phone|Symbian)");return r.test(navigator.userAgent)}$(function(){n=$(window).width();e=$(window).height();c=$("section");a=$(".ctn-page");l=c.length;$("section").css({width:n+"px",height:e+"px"});m=document.getElementById("bgm");if(m){q=$("#btn-ac");q.click(function(r){if(m.paused==false){m.pause();$(this).removeClass("playing")}else{m.play();$(this).addClass("playing")}})}if(j()){c.on("touchstart",function(r){if(d){return false}if(b){m&&m.play();q.addClass("playing");b=false}h=window.event.touches[0].pageX;f=window.event.touches[0].pageY});c.on("touchmove",function(r){return false});c.on("touchend",function(r){if(d){return false}p(r.originalEvent.changedTouches[0].pageX-h,r.originalEvent.changedTouches[0].pageY-f)})}else{c.on("mousedown",function(r){if(b){m&&m.play();q.addClass("playing");b=false}if(d){return false}h=r.pageX;f=r.pageY});c.on("mousemove",function(r){return false});c.on("mouseup",function(r){if(d){return false}p(r.pageX-h,r.pageY-f)})}a.css("-webkit-transition-duration",o/1000+"s");c.css("-webkit-transition-duration",o/1000+"s");c.each(function(){$(this).addClass(($(this).data("pt")))})});function p(s,r){if(Math.abs(r)>i){if((r<0&&k==l-1)||(r>0&&k==0)){return false}d=true;$(c[k]).addClass("removing");g=k;if(r<0){k=(k==l-1)?0:(k+1);a.css("-webkit-transform","translateY("+(-e*(k))+"px)")}else{if(r>0){k=(k==0)?(l-1):(k-1);a.css("-webkit-transform","translateY("+(-e*(k))+"px)")}}setTimeout(function(){$(c[k]).addClass("showing");$(c[g]).removeClass("removing");$(c[g]).removeClass("showing");d=false},o+100)}}})());