/* 
 * 组织会员页面逻辑
 * @author:lly
 */
var gid = $.jStorage.get("groupid");
var offset=0,lazyStop,lazyLoad;

var groupObj = $.jStorage.get("groupObj");
groupObj&&($('#groupTitle').text(groupObj.name));
function renderMemberList(){
	var opt = {
		gid : gid,
		role : 0,
		offset : offset,
		limit : 6,
	}
	$.ajax({
	    url: "http://www.hijufou.com/rest/open/group/members",
	    type: "POST",
	    dataType: "json",
	    xhrFields: {withCredentials: true},
	    data: opt,
	    success: function(data) {
	        if(data.code == 1){
	        	$("#totalNbr").text(data.result.total);
	        	var memberHtml = [];
	        	$.each(data.result.list, function(i, item) {
	        		var partHtml = "";
	        		partHtml += '<div>'
	        		partHtml += '<a href="../group/member.profile.html?uid='+ item.attendee.id +'">'
	        		partHtml += '<div class="w-lui f-cb bd03">'
	        		if(item.attendee.thumbnail){
	        			partHtml += '<img class="fl img f-sd br1" src="' + item.attendee.thumbnail + '"/>'
	        		}else{
	        			partHtml += '<img class="fl img f-sd br1" src="../../../../res/mobile/pic/face50.jpg"/>'
	        		}
	        		partHtml += '<div class="dtl">'
	        		partHtml += '<p class="ln ln0 fs04 fc03">' + item.attendee.nickname + '<span class="fc05 fs08 role">' + getRole(item.role) + '</span></p>'
	        		if(item.bio){
	        			partHtml += '<p class="ln lnx fs08 fc03">' + item.bio + '</p>'
	        		}
	        		partHtml += '</div></div></a></div>'
	        		memberHtml.push(partHtml);
				});
				$("#memberList").append(memberHtml.join(""));
				if(data.result.list.length<6){
               		lazyStop=true;
          		}
          		$("#loading_bottom").hide();
          			lazyLoad=false;
	        	}
	    }
	});
};
renderMemberList();

$(window).scroll(function () {
     if($(window).scrollTop()>=$(document).height()-$(window).height()-50){
          if((!lazyStop)&&(!lazyLoad)){
               //加载小提示显示
               lazyLoad=true;
               $("#loading_bottom").show();
               offset = offset + 6;
               renderMemberList(); 
          }
     }
});

