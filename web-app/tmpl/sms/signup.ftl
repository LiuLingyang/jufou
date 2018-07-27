<#assign startTime = meeting.startTime?number_to_datetime?string("yyyy年MM月dd日 HH:mm")>
<#assign endTime = meeting.endTime?number_to_datetime?string("yyyy年MM月dd日 HH:mm")>
<#if endTime?substring(0, "yyyy年MM月dd日"?length) == startTime?substring(0, "yyyy年MM月dd日"?length)>
	<#assign endTime = endTime?substring("yyyy年MM月dd日"?length + 1)>
<#elseif endTime?substring(0, "yyyy年MM月"?length) == startTime?substring(0, "yyyy年MM月"?length)>
	<#assign endTime = endTime?substring("yyyy年MM月"?length + 1)>
<#elseif endTime?substring(0, "yyyy年"?length) == startTime?substring(0, "yyyy年"?length)>
	<#assign endTime = endTime?substring("yyyy年"?length + 1)>
</#if>
<#assign address = meeting.province + meeting.city + meeting.area + meeting.address>
<#assign contact = meeting.organizer.nickname>
<#if meeting.organizer.mobile!""?trim != "">
	<#assign contact = contact + " " + meeting.organizer.mobile?trim>
<#else>
	<#assign contact = contact + " " + meeting.organizer.email?trim>
</#if>
<#assign url = "www.hijufou.com/" + meeting.group.homepage + "/meeting/" + meeting.id + "/">
报名成功：${meeting.title}，时间：${startTime}-${endTime}，地点：${address}，联系人：${contact}。活动信息：${url}