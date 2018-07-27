var meetinfo = $.jStorage.get("meetObj"); 
meetinfo&&($('#meetTitle').text(meetinfo.title));
if (meetinfo != null) {
	var sTime = dateFormat(meetinfo.startTime, "isoDateTime");
    var eTime = dateFormat(meetinfo.startTime, "isoDate") + " 23:59" ;
    if (meetinfo.endTime != 0) {
        eTime = dateFormat(meetinfo.endTime, "isoDateTime");
    }
    var title = meetinfo.title;
    var address = meetinfo.city + meetinfo.area + meetinfo.address;
	$("#meetcontent").text(title);
	$("#meettime").text(sTime + '--' + eTime);
	$("#meetaddress").text(address);
}

//发送手机短信   功能待完善
$("#sms").click(function(){
	$("#check").toggle();
	$("#checked").toggle();
});

//设置链接
$("#btn-ok").attr("href","../meeting/detail.html?meetid="+ meetinfo.id);


