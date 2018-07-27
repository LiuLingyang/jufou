$.jStorage.set("enter", 1);
$.jStorage.set("loginCallback",location.href);
var sta,oid,meetObj,desheight,fold=false,album,bascUrl="http://www.hijufou.com";
oid=$.jStorage.get("meetid");
meetObj=$.jStorage.get("meetObj");

var objs = parseURL();
if(objs.n==1){
	$("body").css("position","relative");
	$("body").append("<div id='mask' style='width:100%;height:100%;position:fixed;top:0;z-index:10000;background:url(../../../../res/mobile/pic/mask.png);background-size:100% 100%;'></div>");
	$("#mask").click(function(){
		$(this).hide();
	});
}

meetObj&&($('#meetTitle').text(meetObj.title));
if(!meetObj){
	document.write("出错了");
}
((function(meetinfo){
		$(".cover").attr("src", "/res/mobile/pic/coverloading.gif");
		$("#weixinTitle").text(meetinfo.title);
		$("#meettitle").text(meetinfo.title);
		$("#meetaddress").text(meetinfo.city + meetinfo.area + meetinfo.address);
		$(".grpname").text(meetinfo.group.name);
		$("#description").html(meetinfo.digest);
		//$("#description").html(meetinfo.details);
		var meettime="";
		var feedesc = "";
		var feeitem = "";
		var joinCount=parseInt(meetinfo.joinCount);
		var commentCount=meetinfo.commentCount;
		var gid=meetinfo.group.id;
		if(meetinfo.endTime!=0){
			meettime=dateFormat(meetinfo.startTime, "jftime")+" - "+dateFormat(meetinfo.endTime, "jftime");
		}
		else{
			meettime=dateFormat(meetinfo.startTime, "jftime");
		}
		if (meetinfo.fee.desc != null) {
			feedesc = meetinfo.fee.desc;
		}
		if(meetinfo.fee.type == 0){
			feeitem = "免费";
		}else if(meetinfo.fee.type == 1){
			feeitem = "AA制";
		}else{
			var fees = meetinfo.fee.item.split("|");
			$.each(fees, function(i, item) {
				if (feeitem == "") {
					feeitem = item.replace("@", "") + "元/人";
				} else {
					feeitem = feeitem + "<br/>" +item.replace("@", "") + "元/人";	
				}
			});
		}
		var olimit=parseInt(meetinfo.joinPermission);
		var jlimit=parseInt(meetinfo.joinLimit);
		$("#meettime").text(meettime);
		$("#meetfee").text(feedesc);
		$("#feeitem").html(feeitem);
		$("#joinCount").text(joinCount);
		$("#commentCount").text(commentCount);
		$("#groupdes").html(meetinfo.group.description);
		$(".img-grp").attr("src",meetinfo.group.thumbnail);
		if(jlimit>0){
			$("#joinlmt").text(jlimit);
			$("#applylmt").removeClass("nocontent");
		}
		if(olimit>0){
			$("#obslmt").text(olimit);
			$("#attendlmt").removeClass("nocontent");
		}
		switch (meetinfo.joinPermission) {
		case 1:
			$("#applycdt p").text("仅限会员");
			$("#attendlmt").removeClass("nocontent");
			break;
		case 2:
			$("#applycdt p").text("会员+邀请");
			$("#attendlmt").removeClass("nocontent");
			break;
		default:
			$("#applycdt p").text("所有人");	
		}
		if (meetinfo.cover != null) {
			$(".cover").attr("src", bascUrl+meetinfo.cover);
		}
		else{
			$(".cover").hide();
		}
		if(joinCount==0){
			$("#nojoin").removeClass("nocontent");
			$("#c-photo").hide();
		}
		else{
			$.getJSON("http://www.hijufou.com/rest/open/meeting/attendees", {
				mid : oid,
				type : 0,
				limit : 5
			}, function(data) {
				var users = data.result.list;
				$.each(users, function(i, item) {
					var meetjoin = "../../../../res/mobile/pic/face50.jpg";
					if (item.attendee.thumbnail != null) {
						meetjoin = item.attendee.thumbnail;
					}
					var portrait = '<img class="img-atte img-circle" src="' + meetjoin + '"/>';
					$("#c-photo").append(portrait);
				});
			});
			$("#c-photo").attr("href","member.html");
		}
		var isEnd=function(){
			var now=new Date();
			if(meetinfo.endTime>0){
				if(meetinfo.endTime<Date.parse(now)){
					return true;
				}
			}
			else{
				var start=new Date(meetinfo.startTime);
				var a=start.getFullYear();
				var b=now.getFullYear();
				if(b>a){
					return true;
				}
				else if(b==a){
					a=start.getMonth();
					b=now.getMonth();
					if(b>a){
						return true;
					}
					else if(b==a){
						a=start.getDate();
						b=now.getDate();
						if(b>a){return true;}
					}
				}
			}
			return false;
		};
		if(isEnd()){
			if(meetinfo.graderCount==0){
				$("#noscore").removeClass("nocontent");
				$("#c-str").hide();
			}
			else{
				$("#scoreCount").text(meetinfo.graderCount);
				var stars=$(".star");
				for(var i=0;i<Math.round(meetinfo.gradeTotal/meetinfo.graderCount);i++){
					$(stars[i]).addClass("yellow");
				}
			}
			$("#score").removeClass("nocontent");
		}
		if(commentCount==0){
			$("#nocomment").removeClass("nocontent");
			$(".controls").hide();
		}
		else{
			$.getJSON("http://www.hijufou.com/rest/open/comment/list", {
				oid : oid,
				type : 1,
				limit : 8,
				offset : 0,
				total : true,
				sort:'postTime',
			    order:'desc'
			}, function(data){
				var commentlist=data.result.list;
				var comlen=commentlist.length;
				var str="";
				var curcom=0;
				for (var i = 0; i<comlen; i++) {
					var comment=commentlist[i];
					if(i==0){
						str+='<div class="fs03 commentdetail" ><img class="img-circle commentphoto" src="';
					}
					else{
						str+='<div class="fs03 commentdetail hide" ><img class="img-circle commentphoto" src="';
					}
					if(comment.poster.thumbnail){
						str+=comment.poster.thumbnail;
					}
					else{
						str+="../../../../res/mobile/pic/face50.jpg";
					}
					str+='"></img><p class="commentname">'+comment.poster.nickname+'</p><p class="commenttime">'
					+dateFormat(comment.postTime, "commenttime")+'</p><p class="commentcontent">'+comment.content+'</p></div>'
				};
				$('#nocomment').after(str);
				var comments=$('.commentdetail');
				function changeComment(next){
					if(next==curcom){
						return;
					}
					$(comments[curcom]).addClass("hide");
					$(comments[next]).removeClass("hide");
					curcom=next;
				}
				$('#prevcom').bind('click',function(){changeComment((curcom!=0)?curcom-1:comlen-1);});
				$('#nextcom').bind('click',function(){changeComment((curcom!=comlen-1)?curcom+1:0);});
			});
		}
		$("#grpmore").attr("href","../group/home.html?groupid=" + gid + "&re=1");
		$("#photoshare").attr("href","photo.html");
		$("#cmtmore").attr("href","comment.html");
		desheight=parseInt($("#description").css("height"));
		if(desheight>120){
			$("#description").css("height","120px");
			$("#detailmore").attr("href","javascript:if(fold){$('#description').css('height','initial');$('#detailmore').hide();fold=false;}");
		}
		else{
			$("#detailmore").hide();
		}
		fold=true;
		$.jStorage.set("groupid", gid);
		$.jStorage.set("meettitle", meetinfo.title);
		$.jStorage.set("meetObj", meetinfo);
		$.getJSON("http://www.hijufou.com/rest/open/photo/list", {
		    mid: oid,
		}, function(data) {
			var plist=data.result.list;
			var len=plist.length;
			if (plist == null || len == 0) {
				$("#viewport").hide();
		    	$('#nophoto').removeClass("nocontent");
		    	return;
		    }
			var scroller=$("#scroller");
			var lazy=5;
			scroller.width(len*220);
			$.each(plist, function(i, item) {
				var picUrl;
				if(i<=4){
					picUrl=bascUrl+item.thumbnailURL;	
			    }else{
			    	picUrl='http://www.hijufou.com/res/mobile/pic/coverloading.gif';
			    }
				var xdiv ='<li class="slide"><img class="photo" src="'+picUrl+'" data-src="'+(bascUrl+item.thumbnailURL)+'" ></img></li>';
		        scroller.append(xdiv);
		    });
			    album = new IScroll('#c-pic', {
			        scrollX: true,
			        scrollY: false,
			        momentum: false,
			        snap: true,
			        snapSpeed: 400,
			        keyBindings: true,
			        probeType: 2,
			    });
			    album.on('scrollEnd', function(){
					var nowPic=scroller.css("transform")||scroller.css("-webkit-transform");
					nowPic=nowPic.substr(7,nowPic.length-8).split(",");
					nowPic=-parseInt(nowPic[4])/220;
					if(lazy>nowPic+6){
						return;
					}
					var photos=$('.photo');
					for(;(lazy<=nowPic+6)&&(lazy<photos.length);lazy++){
						var lzPic=$(photos[lazy]);
						lzPic.attr("src",lzPic.data("src"));
					}
				});
				setInterval(function(){album.next();},5000);
		});
		$.getJSON("http://www.hijufou.com/rest/open/meeting/list", {
			order : "desc",
			sort : "startTime",
			gid : gid,
			type : 0,
			limit : 1000,
			offset : 0,
			total : true
		}, function(data) {
			if(data.code==1)
				$("#meets").text(data.result.list.length);
		});
		
		var center = new qq.maps.LatLng(meetinfo.latitude, meetinfo.longitude);
		var map = new qq.maps.Map(
		    document.getElementById("map"),
		    {
		        center: center,
		        zoom: 18,
		        draggable: false,
		    }
		);
		var marker = new qq.maps.Marker({
		    position: center,
		    map: map,
		    icon: new qq.maps.MarkerImage("http://www.hijufou.com/res/mobile/pic/mapmarker.png"),
		});
})(meetObj));

/*var xhr=$.ajax({
	url:"http://www.hijufou.com/rest/open/meeting/get",
	dataType:"json",
	data:{mid : oid,details:1,},
	statusCode: {
	200: function(data){
		if(data===xhr){
			document.write("出错啦");
			return;
		}
		$(".cover").attr("src", "/res/mobile/pic/coverloading.gif");
		var meetinfo = data.result.meeting;
		$("#weixinTitle").text(meetinfo.title);
		$("#meettitle").text(meetinfo.title);
		$("#meetaddress").text(meetinfo.city + meetinfo.area + meetinfo.address);
		$(".grpname").text(meetinfo.group.name);
		$("#description").html(meetinfo.details);
		var meettime="";
		var feedesc = "";
		var feeitem = "";
		var joinCount=parseInt(meetinfo.joinCount);
		var commentCount=meetinfo.commentCount;
		var gid=meetinfo.group.id;
		if(meetinfo.endTime!=0){
			meettime=dateFormat(meetinfo.startTime, "jftime")+" - "+dateFormat(meetinfo.endTime, "jftime");
		}
		else{
			meettime=dateFormat(meetinfo.startTime, "jftime");
		}
		if (meetinfo.fee.desc != null) {
			feedesc = meetinfo.fee.desc;
		}
		if(meetinfo.fee.type == 0){
			feeitem = "免费";
		}else if(meetinfo.fee.type == 1){
			feeitem = "AA制";
		}else{
			var fees = meetinfo.fee.item.split("|");
			$.each(fees, function(i, item) {
				if (feeitem == "") {
					feeitem = item.replace("@", "") + "元/人";
				} else {
					feeitem = feeitem + "<br/>" +item.replace("@", "") + "元/人";	
				}
			});
		}
		var olimit=parseInt(meetinfo.joinPermission);
		var jlimit=parseInt(meetinfo.joinLimit);
		$("#meettime").text(meettime);
		$("#meetfee").text(feedesc);
		$("#feeitem").html(feeitem);
		$("#joinCount").text(joinCount);
		$("#commentCount").text(commentCount);
		$("#groupdes").html(meetinfo.group.description);
		$(".img-grp").attr("src",meetinfo.group.thumbnail);
		if(jlimit>0){
			$("#joinlmt").text(jlimit);
			$("#applylmt").removeClass("nocontent");
		}
		if(olimit>0){
			$("#obslmt").text(olimit);
			$("#attendlmt").removeClass("nocontent");
		}
		switch (meetinfo.joinPermission) {
		case 1:
			$("#applycdt p").text("仅限会员");
			$("#attendlmt").removeClass("nocontent");
			break;
		case 2:
			$("#applycdt p").text("会员+邀请");
			$("#attendlmt").removeClass("nocontent");
			break;
		default:
			$("#applycdt p").text("所有人");	
		}
		if (meetinfo.cover != null) {
			$(".cover").attr("src", bascUrl+meetinfo.cover);
		}
		else{
			$(".cover").hide();
		}
		if(joinCount==0){
			$("#nojoin").removeClass("nocontent");
			$("#c-photo").hide();
		}
		else{
			$.getJSON("http://www.hijufou.com/rest/open/meeting/attendees", {
				mid : oid,
				type : 0,
				limit : 5
			}, function(data) {
				var users = data.result.list;
				$.each(users, function(i, item) {
					var meetjoin = "../../../../res/mobile/pic/face50.jpg";
					if (item.attendee.thumbnail != null) {
						meetjoin = item.attendee.thumbnail;
					}
					var portrait = '<img class="img-atte img-circle" src="' + meetjoin + '"/>';
					$("#c-photo").append(portrait);
				});
			});
			$("#c-photo").attr("href","member.html");
		}
		var isEnd=function(){
			var now=new Date();
			if(meetinfo.endTime>0){
				if(meetinfo.endTime<Date.parse(now)){
					return true;
				}
			}
			else{
				var start=new Date(meetinfo.startTime);
				var a=start.getFullYear();
				var b=now.getFullYear();
				if(b>a){
					return true;
				}
				else if(b==a){
					a=start.getMonth();
					b=now.getMonth();
					if(b>a){
						return true;
					}
					else if(b==a){
						a=start.getDate();
						b=now.getDate();
						if(b>a){return true;}
					}
				}
			}
			return false;
		};
		if(isEnd()){
			if(meetinfo.graderCount==0){
				$("#noscore").removeClass("nocontent");
				$("#c-str").hide();
			}
			else{
				$("#scoreCount").text(meetinfo.graderCount);
				var stars=$(".star");
				for(var i=0;i<Math.round(meetinfo.gradeTotal/meetinfo.graderCount);i++){
					$(stars[i]).addClass("yellow");
				}
			}
			$("#score").removeClass("nocontent");
		}
		if(commentCount==0){
			$("#nocomment").removeClass("nocontent");
			$(".controls").hide();
		}
		else{
			$.getJSON("http://www.hijufou.com/rest/open/comment/list", {
				oid : oid,
				type : 1,
				limit : 8,
				offset : 0,
				total : true,
				sort:'postTime',
			    order:'desc'
			}, function(data){
				var commentlist=data.result.list;
				var comlen=commentlist.length;
				var str="";
				var curcom=0;
				for (var i = 0; i<comlen; i++) {
					var comment=commentlist[i];
					if(i==0){
						str+='<div class="fs03 commentdetail" ><img class="img-circle commentphoto" src="';
					}
					else{
						str+='<div class="fs03 commentdetail hide" ><img class="img-circle commentphoto" src="';
					}
					if(comment.poster.thumbnail){
						str+=comment.poster.thumbnail;
					}
					else{
						str+="../../../../res/mobile/pic/face50.jpg";
					}
					str+='"></img><p class="commentname">'+comment.poster.nickname+'</p><p class="commenttime">'
					+dateFormat(comment.postTime, "commenttime")+'</p><p class="commentcontent">'+comment.content+'</p></div>'
				};
				$('#nocomment').after(str);
				var comments=$('.commentdetail');
				function changeComment(next){
					if(next==curcom){
						return;
					}
					$(comments[curcom]).addClass("hide");
					$(comments[next]).removeClass("hide");
					curcom=next;
				}
				$('#prevcom').bind('click',function(){changeComment((curcom!=0)?curcom-1:comlen-1);});
				$('#nextcom').bind('click',function(){changeComment((curcom!=comlen-1)?curcom+1:0);});
			});
		}
		$("#grpmore").attr("href","../group/home.html?groupid=" + gid + "&re=1");
		$("#photoshare").attr("href","photo.html");
		$("#cmtmore").attr("href","comment.html");
		desheight=parseInt($("#description").css("height"));
		if(desheight>120){
			$("#description").css("height","120px");
			$("#detailmore").attr("href","javascript:if(fold){$('#description').css('height','initial');$('#detailmore').hide();fold=false;}");
		}
		else{
			$("#detailmore").hide();
		}
		fold=true;
		$.jStorage.set("groupid", gid);
		$.jStorage.set("meettitle", meetinfo.title);
		$.jStorage.set("meetObj", meetinfo);
		$.getJSON("http://www.hijufou.com/rest/open/photo/list", {
		    mid: oid,
		}, function(data) {
			var plist=data.result.list;
			var len=plist.length;
			if (plist == null || len == 0) {
				$("#viewport").hide();
		    	$('#nophoto').removeClass("nocontent");
		    	return;
		    }
			var scroller=$("#scroller");
			var lazy=5;
			scroller.width(len*220);
			$.each(plist, function(i, item) {
				var picUrl;
				if(i<=4){
					picUrl=bascUrl+item.thumbnailURL;	
			    }else{
			    	picUrl='http://www.hijufou.com/res/mobile/pic/coverloading.gif';
			    }
				var xdiv ='<li class="slide"><img class="photo" src="'+picUrl+'" data-src="'+(bascUrl+item.thumbnailURL)+'" ></img></li>';
		        scroller.append(xdiv);
		    });
			    album = new IScroll('#c-pic', {
			        scrollX: true,
			        scrollY: false,
			        momentum: false,
			        snap: true,
			        snapSpeed: 400,
			        keyBindings: true,
			        probeType: 2,
			    });
			    album.on('scrollEnd', function(){
					var nowPic=scroller.css("transform")||scroller.css("-webkit-transform");
					nowPic=nowPic.substr(7,nowPic.length-8).split(",");
					nowPic=-parseInt(nowPic[4])/220;
					if(lazy>nowPic+6){
						return;
					}
					var photos=$('.photo');
					for(;(lazy<=nowPic+6)&&(lazy<photos.length);lazy++){
						var lzPic=$(photos[lazy]);
						lzPic.attr("src",lzPic.data("src"));
					}
				});
				setInterval(function(){album.next();},5000);
		});
		$.getJSON("http://www.hijufou.com/rest/open/meeting/list", {
			order : "desc",
			sort : "startTime",
			gid : gid,
			type : 0,
			limit : 1000,
			offset : 0,
			total : true
		}, function(data) {
			if(data.code==1)
				$("#meets").text(data.result.list.length);
		});
		
		var center = new qq.maps.LatLng(meetinfo.latitude, meetinfo.longitude);
		var map = new qq.maps.Map(
		    document.getElementById("map"),
		    {
		        center: center,
		        zoom: 16,
		        draggable: false,
		    }
		);
		var marker = new qq.maps.Marker({
		    position: center,
		    map: map,
		    icon: new qq.maps.MarkerImage("http://www.hijufou.com/res/mobile/pic/mapmarker.png"),
		});
		},
    302: function() {
      alert( "活动已取消" );
    },
  	}
});*/
$.ajax({
	url:"http://www.hijufou.com/rest/meeting/attendable",
	dataType:"json",
	data:{mid : oid},
	xhrFields:{
		withCredentials : true
	},
	success: function(data) {
		var code = data.code;
		if (code == -303) {
			$("#btn-apply").text("人员已满");
		} else if (code == -307) {
			$("#btn-apply").text("报名未开始");
		} else if (code == -308) {
			$("#btn-apply").text("报名已结束");
		} else if (code == -305) {
			$("#btn-apply").text("已被拒绝");
		} else if (code == -309) {
			$("#btn-apply").text("仅允许会员加入");
		} else if (code == -310) {
			$("#btn-apply").text("仅允许邀请加入");
		} else if (code == -306) {
			$("#btn-apply").text("已取消");
		} else if (code == -110) {
			$("#btn-apply").attr("href","../user/login.html");
		} else if (code == 1) {
			sta = data.result.state;
			if (sta == 0) {
				$("#btn-apply").attr("href","apply.html");
			} else if (sta == 1) {
				$("#btn-apply").text("不参加");
			} else if (sta == 2) {
				$("#btn-apply").text("已参加");
			}
		}
	},
	error:function(){
		$("#btn-apply").attr("href","../user/login.html");
	},
});
$("#btn-apply").click(function(){
	if(sta==1){
		location.href="apply.html";
		/*$.ajax({
			url : "http://www.hijufou.com/rest/meeting/reply",
			type : "POST",
			xhrFields : {
				withCredentials : true
			},
			data : {
				mid : oid,
				qusetion : true,
				state : 1,
			},
			success : function(d) {
				var div=$("#applyed");
				div.animate({opacity:'1'},1000);
				div.animate({opacity:'0'},5000);
				$("#btn-apply").text("已参加");
				sta=2;
			}});*/
	}else if(sta==2){
		$.ajax({
			url : "http://www.hijufou.com/rest/meeting/reply",
			type : "POST",
			xhrFields : {
				withCredentials : true
			},
			data : {
				mid : oid,
				qusetion : true,
				state : 0,
			},
			success : function(d) {
				var div=$("#unapply");
				div.animate({opacity:'1'},1000);
				div.animate({opacity:'0'},5000);
				$("#btn-apply").text("不参加");
				sta=1;
			}});
	}
	
});
