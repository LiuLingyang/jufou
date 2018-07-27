/* 
 * 组织投票页面逻辑
 * @author:lly
 */
var objs = parseURL();
var vid = objs.vid;
// var gid = $.jStorage.get("groupid"),
// 上一行为下一行修改前的版本，修改的目的是 有需求（需要将投票界面链接单独拿出来绑定微信按钮），而此时jStorage中的groupid为null，用户点击按钮进去一片空白，原因就是groupid为空。所以绑定微信的链接search部分我加上&groupid=[id]，然后通过objs.groupid得到
var gid = objs.groupid?objs.groupid:$.jStorage.get("groupid"), 
    itemcount=0;

renderVoteDetail();

//设置查看结果链接
$("#result_link").attr("href","../group/vote.show.html?vid="+vid)

function renderVoteDetail(){
	var opt = {
		order : "desc",
		sort : "startTime",
		gid : gid,
		type : 0,
		limit : 1000,
		offset : 0
	}
	$.ajax({
	    url: "http://www.hijufou.com/rest/vote/list",
	    type: "POST",
	    dataType: "json",
	    xhrFields: {withCredentials: true},
	    data:opt,
	    success: function(data) {
	    	if (data.code == 1) {
				var arr = data.result.list;
				$.each(arr, function(i, item) {
					if (item.id == vid) {
						var arr1=item.items;
						var xdiv = "";
						var typestring=item.type;
						if(typestring==1){
							$("#grade").hide();
							$("#singleSelection").show();
							$("#mutiselection").hide();
							$("#title").text(item.title);
							$("#discription1").text(item.description);
							var jsonarr1=JSON.parse(arr1);
							$.each(jsonarr1, function(id, eachitem) {
							xdiv=xdiv+"<div class='blk bd03'><div class='fs03 ln1'><input type='radio' class='f-bg grop' name='group1' value='"+id+"'/>"+eachitem+"</div></div>"
							});
							$("#items1").append(xdiv);
						}else if(typestring==2){
							$("#grade").hide();
							$("#singleSelection").hide();
							$("#mutiselection").show();
							$("#title1").text(item.title);
							$("#discription2").text(item.description);
							var jsonarr1=JSON.parse(arr1);
							$.each(jsonarr1, function(id, eachitem) {
							xdiv=xdiv+"<div class='blk bd03'><div class='fs03 ln1'><input type='checkbox' class='f-bg chek' name='group2' value='"+id+"'/>"+eachitem+"</div></div>"
							});
							$("#items2").append(xdiv);
						}else if(typestring==3){
							$("#grade").show();
							$("#singleSelection").hide();
							$("#mutiselection").hide();
							$("#title2").text(item.title);
							$("#discription3").text(item.description);
							var jsonarr1=JSON.parse(arr1);
							$.each(jsonarr1, function(id, eachitem) {
							xdiv=xdiv+"<div class='blk bd03'>" +
									"<div class='fs03 ln1'>"+eachitem+"</div>" +
									"<div class='pos'>" +
									"<div class='bd02 fc05 fs04 mid bg00' name='attendnumber' id='attendnumber"+id+"'>10</div>" +
									"<div class='bd02 fc05 fs04 lft bg00' name='subtract' onclick='javascript:subtract("+id+")' id='subtract"+id+"'>-</div>"+
									"<div class='bd02 fc05 fs04 rgh bg00' name='add' onclick='javascript:add("+id+")' id='add"+id+"'>+</div>" +
									"</div></div>";
							itemcount=Number(itemcount)+1;
							});
							$("#items3").append(xdiv);
						}
					}
				});
			}
	    }
	});
};

var cast=function(index){
	//临时修改
	//var total=0;
	var objs = {};
	if(index==1){
		var id=$("input[name='group1']:checked").val();
		if(id==null||id==""){
			alert("您还没有做出选择！");
			return;
		}
		objs[id]=1;
	}
	else if(index==2){
		var id=-1;
		$("input[name='group2']:[checked]").each(function(){
	    if ($(this).attr("checked")=="checked") {
	          id=$(this).attr('value');
	          objs[id]=1;
	          //临时修改
	          //total++;
	    }});
		if(id==-1){
			alert("您还没有做出选择！");
			$("#errorMsg2").show();
			return;
		}
		//临时修改
		/*if(total>5){
			alert("投票数不允许超过5个");
			return;
		}*/
	}else if(index==3){
		for(var i=1;i<=itemcount;i++){
			objs[i]=Number($("#attendnumber"+i).text());
		}
	}
	$.ajax({
		url : "http://www.hijufou.com/rest/vote/cast",
		type : "POST",
		xhrFields : {withCredentials : true},
		dataType : "json",
		data : {
			"sid" : vid,
			"choice" : JSON.stringify(objs)
		},
		success : function(data) {
			if (data.code == -601) {
				alert("已过投票时间期限！");
			}else if(data.code==-602){
				alert("您已经投过票了！");
			}else if (data.code > 0){
				location.href = "vote.show.html?vid="+vid;
			}
		}
	});
};

//打分加减
var add=function(id){
	var name="attendnumber"+id;
	var count=Number($("#"+name).text());
	if (count <10) {
		count = count + 1;
		$("#"+name).text(count);
	}
};
var subtract=function(id){
	var name="attendnumber"+id;
	var count=Number($("#"+name).text());
	if (count >0) {
		count = count - 1;
		$("#"+name).text(count);
	}
};