/*
 * 不喜欢用a标签嵌套（在变换的时候可能有bug+延迟重）
 * 需要连接跳转的地方添加id、dhref类和data-href
 * @author:wt
 */

$(function(){
	var hrefLocation={},hrefElements=$(".dhref");
	$.each(hrefElements,function(index,item){
		hrefLocation[item.id]=$(item).data("href");
	});
	
	if(hrefElements.length){
		$("body").bind("touchstart mousedown",function(e){
			var targetId=e.target.id;
			if(hrefLocation.hasOwnProperty(targetId)){
				e.preventDefault();
				location.href=hrefLocation[targetId];
			}
		});
	}
});
