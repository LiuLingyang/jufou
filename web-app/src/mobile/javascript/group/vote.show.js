/* 
 * 组织投票页面逻辑
 * @author:lly
 */
var objs = parseURL();
var vid = objs.vid;
var gid = $.jStorage.get("groupid");

renderVoteResult();

function renderVoteResult(){
	$.ajax({
	    url: "http://www.hijufou.com/rest/vote/result",
	    type: "POST",
	    dataType: "json",
	    xhrFields: {withCredentials: true},
	    data:{sid:vid},
	    success: function(data) {
	    	if (data.code == 1) {
				if(data.result.type!=3)
				{
					$("#score").hide();
					$("#selection").show();
					var itemarr = data.result.items;
					var jsonitemarr=JSON.parse(itemarr);
					var xdiv = "";
					var itemcountarr=data.result.result;
					var jsonitemcountarr=JSON.parse(itemcountarr);
					var votecount=data.result.voterCount;
					var title=data.result.title;
					$("#title").text(title);
					if(data.result.type==1)
					{
						$("#type").text("单选题");
					}
					else
					{
						$("#type").text("多选题");
					}
					$("#description1").text(data.result.description);
					$("#votecount").text("共有"+votecount+"人投票");
					
					//票数
					var pollcount=0;
					$.each(jsonitemarr, function(i, item) {
							if(jsonitemcountarr[i]==null||jsonitemcountarr[i]=='undefined')
							{
							   jsonitemcountarr[i]=0;
							}
							pollcount=pollcount+jsonitemcountarr[i];
					});
					
					$.each(jsonitemarr, function(i, item) {
							if(jsonitemcountarr[i]==null||jsonitemcountarr[i]=='undefined')
							{
							   jsonitemcountarr[i]=0;
							}
							var percent=Number((jsonitemcountarr[i]/pollcount)*100).toFixed(2)+"%";
							var itemcount=jsonitemcountarr[i];
							xdiv="<div class='blk bd03 f-cb'><p class='fs03 fc03 ln3'>"+item+"</p><div class='btn01 bd02 w-btn fl xbg'><div class='w-btn btn00 ln4' style='width:"+percent+";'></div></div><p class='fs03 fc03 fr'>"+itemcount+"票	  "+percent+"</p></div>";
							$("#items1").append(xdiv);
					});
				}
				else
				{
					$("#score").show();
					$("#selection").hide();
					var itemarr = data.result.items;
					var jsonitemarr=JSON.parse(itemarr);
					var xdiv = "";
					var itemcountarr=data.result.result;
					var jsonitemcountarr=JSON.parse(itemcountarr);
					var votecount=data.result.voterCount;
					var title=data.result.title;
					$("#title1").text(title);
					$("#description1").text(data.result.description);
					$("#votecount1").text("共有"+votecount+"人投票");
					$.each(jsonitemarr, function(i, item) {
							if(jsonitemcountarr[i]==null||jsonitemcountarr[i]=='undefined')
							{
							   jsonitemcountarr[i]=0;
							}
							var percent=(jsonitemcountarr[i]/10)*100+"%";
							var itemcount=jsonitemcountarr[i];
							xdiv="<div class='blk bd03 f-cb'><p class='fs03 fc03 ln3'>"+item+"</p><div class='btn01 bd02 w-btn fl xbg'><div class='w-btn btn00 ln4' style='width:"+percent+";'></div></div><p class='fs03 fc03 fr'>"+itemcount+"分</p></div>";
							$("#items2").append(xdiv);
					});
				}
			}
	    }
	});
};