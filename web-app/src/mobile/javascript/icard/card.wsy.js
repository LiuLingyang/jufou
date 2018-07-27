window.onload = function() {
	$("#img-load").hide();
	$(".ctn-sy").show();
};
document.ondragstart = function() {
    return false;
};
window.onorientationchange = function() {
    alert("竖屏观看更佳哦！")
};