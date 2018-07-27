	var sy=$('#sy');
	var height=$(window).height(),t=0,timeout;
	var str="";
	function repaint(){
	if(t==11){
		// sy.style.webkitMask="initial";
		// str+=sy.style.webkitMaskPositionY;
		// alert(str);
		sy.css('-webkit-mask',"initial");
		clearInterval(timeout);
	}
	else{
		// sy.style.webkitMaskPositionY="-"+t*height+"px";
		// str+=sy.style.webkitMaskPositionY;
		sy.css('-webkit-mask-position-y',"-"+t*height+"px");
	}
	t++;
	}
	window.onload=function() {
	$("#img-load").hide();
	$(".ctn-sy").show();
	timeout=setInterval("repaint()",50);
	};