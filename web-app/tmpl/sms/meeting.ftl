<#if content?has_content>${content}<#else>${user.nickname}邀请你参加活动：${meeting.title}，时间：${meeting.startTime?number_to_datetime?string("MM月dd日 HH:mm")}，具体信息：http://${stub}</#if>