((function(){var e=$("section"),p=640,d=$(window).height(),m=e.length-1,i=0,b=0,a,j,g,o=true,n,l,q;$.ajax({url:"http://www.hijufou.com/rest/open/meeting/search?keyword=xxxxxx",dataType:"json",error:function(){document.write("   ")}});if(/Windows Phone/.test(navigator.userAgent)){alert("抱歉，暂不支持windows phone:)");throw new Error("windows phone!")}$("section").css({width:p,height:d});window.onload=function(){$(".i-load").hide();$(e[0]).addClass("show");$("#ac").show();r();k()};document.ondragstart=function(){return false};window.onorientationchange=function(){alert("竖屏观看更佳哦！")};function r(){for(var s=0;s<3;s++){if(i>m){break}var t=$(e[i]);t.hasClass("lazy")&&t.css("background-image","url("+t.data("src")+")");t.find(".lazy").each(function(){switch($(this).data("lazyrole")){case"bg":$(this).css("background-image","url("+$(this).data("src")+")");break;case"img":$(this).attr("src",$(this).data("src"));break}});i++}}bgm=document.getElementById("bgm");if(bgm){ac=$("#ac");ac.bind("touchstart",function(s){s.preventDefault();if(bgm.paused==false){bgm.pause();$(this).removeClass("playing")}else{bgm.play();$(this).addClass("playing")}})}var f=(function(){var s=new RegExp("(Android|iPad|iPhone|Windows Phone|Symbian)");return s.test(navigator.userAgent)})();function k(){var s=$("html");if(f){s.bind("touchstart",function(t){t.preventDefault();if(o){bgm&&bgm.play();ac.addClass("playing");o=false}q=undefined;g=true;l=t.originalEvent.targetTouches[0].pageY;$(e).css("-webkit-transition-duration","0s");j=b<m?b+1:0;a=b>0?b-1:(i>m?m:-1)});s.bind("touchmove",function(t){t.preventDefault();if(!g){return false}h(t.originalEvent.targetTouches[0].pageY-l)});s.bind("touchend",function(t){t.preventDefault();if(!g){return false}s.unbind("touchstart touchmove touchend");c(t.originalEvent.changedTouches[0].pageY-l);g=false;switch(q){case 1:setTimeout(function(){$(e[b]).removeClass("show");$(e[j]).addClass("show");$(e[j]).removeClass("active");b=j;r();k()},300);break;case 2:setTimeout(function(){$(e[b]).removeClass("show");$(e[a]).addClass("show");$(e[a]).removeClass("active");b=a;k()},300);break;case 3:setTimeout(function(){$(e[j]).removeClass("active");k()},300);break;case 4:setTimeout(function(){$(e[a]).removeClass("active");k()},300);break}})}else{s.bind("mousedown",function(t){if(o){bgm&&bgm.play();ac.addClass("playing");o=false}q=undefined;g=true;l=t.pageY;$(e).css("-webkit-transition-duration","0s");j=b<m?b+1:0;a=b>0?b-1:(i>m?m:-1)});s.bind("mousemove",function(t){if(!g){return false}h(t.pageY-l)});s.bind("mouseup",function(t){if(!g){return false}s.unbind("mousedown mousemove mouseup");c(t.pageY-l);g=false;switch(q){case 1:setTimeout(function(){$(e[b]).removeClass("show");$(e[j]).addClass("show");$(e[j]).removeClass("active");b=j;r();k()},300);break;case 2:setTimeout(function(){$(e[b]).removeClass("show");$(e[a]).addClass("show");$(e[a]).removeClass("active");b=a;k()},300);break;case 3:setTimeout(function(){$(e[j]).removeClass("active");k()},300);break;case 4:setTimeout(function(){$(e[a]).removeClass("active");k()},300);break}})}}function h(t){var v;var u;var s;if(!q){if(t<0){q=1;$(e[j]).css("-webkit-transform","translate3d(0px,100%,0px)");$(e[j]).addClass("active")}else{if(t>0){if(a==-1){g=false;return false}q=2;$(e[a]).css("-webkit-transform","translate3d(0px,-100%,0px)");$(e[a]).addClass("active")}}}if(q==1){if(t<0){v=Math.max(0.7,1+0.0006*t);u=Math.max(0,100+t/5);$(e[b]).css("-webkit-transform","translate3d(0px,"+t/10+"%,0px) scale("+v+")");$(e[j]).css("-webkit-transform","translate3d(0px,"+u+"%,0px)")}}else{if(t>0){s=Math.min(0,-100+t/5);v=Math.max(0.6,1-0.0006*t);$(e[b]).css("-webkit-transform","translate3d(0px,"+t/10+"%,0px) scale("+v+")");$(e[a]).css("-webkit-transform","translate3d(0px,"+s+"%,0px)")}}}function c(s){$(e).css("-webkit-transition-duration",".3s");if(q==1){if(s<-50){$(e[b]).css("-webkit-transform","translate3d(0px,-80%,0px) scale(0.6)");$(e[j]).css("-webkit-transform","none")}else{$(e[b]).css("-webkit-transform","none");$(e[j]).css("-webkit-transform","translate3d(0px,100%,0px)");q=3}}else{if(s>50){$(e[b]).css("-webkit-transform","translate3d(0px,80%,0px) scale(0.6)");$(e[a]).css("-webkit-transform","none")}else{$(e[b]).css("-webkit-transform","none");$(e[a]).css("-webkit-transform","translate3d(0px,-100%,0px)");q=4}}}})());