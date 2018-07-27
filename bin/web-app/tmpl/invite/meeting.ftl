<#-- 
    邀请加入组织 
    - meeting    活动信息
    - group      活动所属组织信息
    - url        邀请地址
    - content    邀请内容
-->
<#include "./macro.ftl">
<@header/>
<@body>
  ${content}<a href="${url}">参加活动</a>
</@body>
<@footer/>