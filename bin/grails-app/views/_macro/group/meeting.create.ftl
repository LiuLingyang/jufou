<#escape x as x!""?html>
<#-- 模块ID 10-19 -->
<#-- 创建活动设置块 -->
<#macro groupMeetingCreateBlock title="" open=false display=true>
  <div class="w-mblk <#if open>js-toggle</#if>" <#if !display>style="display:none;"</#if>>
    <div class="obar bg04 js-bbar">
      <span class="btl">${title}</span>
      <span class="arw w-arw w-arw-b bd03">&nbsp;</span>
      <span class="arw w-arw w-arw-t bd03">&nbsp;</span>
    </div>
    <div class="obox js-block">
      <#nested>
    </div>
  </div>
</#macro>
<#-- 时间选择 -->
<#macro groupMeetingTimeSelect name="" value="" end=23>
  <select class="bd01 w-rd3 wd3" name="${name}">
    <#list 0..end as x>
    <option value="${x}"<#if x?string==value> selected="selected"</#if>>${x}</option>
    </#list>
  </select>
</#macro>
<#-- 问题项 -->
<#macro groupMeetingQuestionItem value="" action="add" ndel=false>
  <div class="lnx nxd js-xdel <#if ndel>js-ndel</#if>">
    <input name="question" type="text" class="txt txt-s bd01 w-rd3 wd0" maxlength="250" value="${value}"/>
    <a class="abt fc02" href="#" data-action="del">删除</a>
  </div>
</#macro>
<#-- 标签项 -->
<#macro groupMeetingTagItem value="" action="add" ndel=false>
  <div class="lnx nxd js-xdel <#if ndel>js-ndel</#if>">
    <input name="tag" type="text" class="txt bd01 w-rd3 wd7" maxlength="20" value="${value}"/>
    <a class="abt fc02" href="#" data-action="del">删除</a>
  </div>
</#macro>
<#-- 费用项 -->
<#macro groupMeetingFeeItem value="">
  <#assign feeList=value?split("@")>
  <div class="tr nxd f-cb js-xdel">
    <span class="fl c1"><input name="feeName" type="text" class="txt bd01 w-rd3 wd5" maxlength=150 value="${feeList[0]}"/></span>
    <span class="fl c2"><input name="feeMony" type="text" class="txt bd01 w-rd3 wd2" maxlength=6 value="<#if feeList?size&gt;1>${feeList[1]}</#if>"/>&nbsp;元/人</span>
    <span class="fl c4"><a class="t-btn t-btn-5" href="#" data-action="del">删除</a></span>
  </div>
</#macro>
<#-- 创建活动 -->
<#macro groupMeetingCreate group={} meeting={} repeat={} fee={}>
  <form class="l-lmc w-fom meeting-create">
    <@messagebox/>
    <@module title="创建活动" id="10" class="t-mdi t-mdf s-srd">
      <@groupMeetingCreateBlock title="基本信息" open=true>
        <div class="sti">
          <p class="itl">分类<span class="itp fc06">（必填）</span></p>
          <div class="ptl">
            <select class="bd01 w-rd3 wd2 mr5" name="category" 
                    data-required="true" data-message="请选择分类">
              <option value="">- 选择分类 -</option>
              <#list d_group_category as x>
              <option value="${x}" <#if (meeting.category!"")==x>selected="selected"</#if>>${x}</option>
              </#list>
            </select>
          </div>
        </div>
        <div class="sti">
          <p class="itl">活动主题<span class="itp fc06">（必填）</span></p>
          <div class="ptl title">
            <input type="text"
                   name="title"
                   class="txt bd01 w-rd3 wd0"
                   maxlength="80"
                   data-required="true"
                   data-message="请输入活动主题"
                   placeholder="输入活动内容"
                   value="${meeting.title}"/>
          </div>
        </div>
        <#local dateTime=parseDateTime(meeting.startTime)>
        <div class="sti">
          <p class="itl tip1">活动时间</p>
          <div class="ptl ptl-2">
            <div class="tme">
              <input type="text" 
                     readonly="true"
                     name="startDate"
                     class="w-mdat txt bd01 w-rd3 f-bg"
                     value="${dateTime?string("yyyy-MM-dd")}"
                     data-message="请选择活动开始时间" />
              <@groupMeetingTimeSelect name="startHour" value="${dateTime?string(\"H\")}"/>
              <span class="f-fw1">:</span>
              <@groupMeetingTimeSelect name="startMinute" value="${dateTime?string(\"m\")}" end=59/>
              <a class="abt fc02 js-flag" href="#">设置一个结束时间</a>
            </div>
          </div>
        </div>
        <#local dateTime=parseDateTime(meeting.endTime)>
        <div class="sti js-flag" <#if (meeting.endTime!0)==0>style="display:none;"</#if>>
          <p class="itl tip1">活动结束时间</p>
          <div class="ptl ptl-1">
            <div class="tme1">
              <input type="text"  
                     name="endDate" 
                     readonly="true" 
                     class="w-mdat txt bd01 w-rd3 f-bg"
                     value="${dateTime?string("yyyy-MM-dd")}"/>
              <@groupMeetingTimeSelect name="endHour" value="${dateTime?string(\"H\")}"/>
              <span class="f-fw1">:</span>
              <@groupMeetingTimeSelect name="endMinute" value="${dateTime?string(\"m\")}" end=59/>             
              <a class="abt fc02 js-flag" href="#">移除结束时间</a>
            </div>
          </div>
        </div>
        <div class="sti">
          <p class="itl tip1">活动地点<span class="itp fc06">（必填）</span></p>
          <div class="pti">
            <select name="province" class="bd01 w-rd3 wd2 mr5"></select>
            <select name="city" class="bd01 w-rd3 wd2 mr5"></select>
            <select name="area" class="bd01 w-rd3 wd2 mr5"></select>
          </div>
          <div class="ptl">
            <input type="text" 
                   name="address" 
                   data-required="true" 
                   maxlength="50"
                   data-message="请输入地址"                                      
                   placeholder="输入详细地址"
                   class="txt bd01 w-rd3 wd0" 
                   value="${meeting.address}"/>
          </div>
        </div>
        <#--div class="sti nxd">
          <input value="1"
                 data-value="0" 
                 type="checkbox" 
                 data-type="number"
                 id="viewPermission" 
                 name="viewPermission"
                 <#if (meeting.viewPermission!0)==1>checked="checked"</#if>/>
          <label for="viewPermission">活动只有会员可见</label>
        </div-->
        <div class="sti sti-x">
          <p class="itl tip1">怎么找到该地址？</p>
          <div class="ptl nxd">
            <input type="text" 
                   name="addressTip" 
                   class="txt bd01 w-rd3 wd0" 
                   maxlength="100"
                   placeholder="怎么找到该地址？"
                   value="${meeting.addressTip}"/>
          </div>
        </div>
        <div class="sti">
          <p class="itl tip2">活动详情</p>
          <div class="ptl">
            <textarea name="details"
                      class="bd01 w-rd3 wd4 ht0">${meeting.details}</textarea>
          </div>
        </div>
      </@groupMeetingCreateBlock>
      <@groupMeetingCreateBlock title="活动重复" display=false>
        <#local dateTime=parseDateTime(repeat.endTime)>
        <div class="sti ick nxd">
          <#assign repeatType=repeat.type!0>
          <label><input type="radio" class="cbx js-flag" name="repeatType" value="0" data-type="number" <#if repeatType==0>checked="checked"</#if>/>不重复</label>
          <label><input type="radio" class="cbx js-flag" name="repeatType" value="1" data-type="number" <#if repeatType==1>checked="checked"</#if>/>按天重复</label>
          <label><input type="radio" class="cbx js-flag" name="repeatType" value="2" data-type="number" <#if repeatType==2>checked="checked"</#if>/>按周重复</label>
          <label><input type="radio" class="cbx js-flag" name="repeatType" value="3" data-type="number" <#if repeatType==3>checked="checked"</#if>/>按月重复</label>
        </div>
        <div class="brp byd nxd nxd-s" style="display:none;">
          <div class="sti lnx">
            <span class="lb">每隔几天重复</span>
            <select name="repeatInterval" class="bd01 w-rd3 wd8" data-type="number">
              <#list 1..6 as x>
              <option value="${x}"<#if (repeat.interval!0)==x> selected="selected"</#if>>${x}天</option>
              </#list>
            </select>
          </div>
          <div class="sti lnx">
            <span class="lb">停止重复直到</span>
            <input type="text" 
                   readonly="true" 
                   name="repeatEnd0Date" 
                   class="w-mdat txt bd01 w-rd3 f-bg" 
                   value="${dateTime?string("yyyy-MM-dd")}"/>
          </div>
        </div>
        <div class="brp byw nxd nxd-s" style="display:none;">
          <div class="sti lnx">
            <span class="lb">每隔几周重复</span>
            <select name="repeatInterval" class="bd01 w-rd3 wd8" data-type="number">
              <#list 1..4 as x>
              <option value="${x}"<#if (repeat.interval!0)==x> selected="selected"</#if>>${x}周</option>
              </#list>
            </select>
          </div>
          <div class="sti lnx sti-1">
            <p>每周的周几重复？</p>
            <div class="ick">
              <#local weekdays=["日","一","二","三","四","五","六"]>
              <#list weekdays as x>
              <label><input class="cbx" 
                            type="checkbox" 
                            name="repeatExt0" 
                            value="${x_index}"
                            <#if (repeat.type!0)==2&&
                                 (repeat.ext!"")?contains(x_index?string)>checked="checked"</#if>/>周${x}</label>
              </#list>
            </div>
          </div>
          <div class="sti lnx">
            <span class="lb">停止重复直到</span>
            <input type="text" 
                   readonly="true" 
                   name="repeatEnd1Date" 
                   class="w-mdat txt bd01 w-rd3 f-bg" 
                   value="${dateTime?string("yyyy-MM-dd")}"/>
          </div>
        </div>
        <div class="brp bym nxd nxd-s" style="display:none;">
          <div class="sti lnx">
            <span class="lb">每隔几月重复</span>
            <select name="repeatInterval" class="bd01 w-rd3 wd8" data-type="number">
              <#list 1..11 as x>
              <option value="${x}"<#if (repeat.interval!0)==x> selected="selected"</#if>>${x}月</option>
              </#list>
            </select>
          </div>
          <div class="sti lnx">
            <span class="lb">每月重复日期</span>
            <select class="bd01 w-rd3 wd8" name="repeatExt1">
              <#local nweek=["一","二","三","四"]>
              <#list nweek as x>
              <option value="${x_index+1}"
                      <#if (repeat.type!0)==3&&
                           (repeat.ext!"")?contains((x_index+1)?string+",")>checked="checked"</#if>>第${x}周</option>
              </#list>
            </select>
            <span>的</span>
            <select class="bd01 w-rd3 wd8" name="repeatExt1">
              <#local weekdays=["一","二","三","四","五","六","日"]>
              <#list weekdays as x>
              <#local index=(x_index+1)%7>
              <option value="${index}"
                      <#if (repeat.type!0)==3&&
                           (repeat.ext!"")?contains(","+index?string)>checked="checked"</#if>>周${x}</option>
              </#list>
            </select>
          </div>
          <div class="sti lnx">
            <span class="lb">停止重复直到</span>
            <input type="text" 
                   readonly="true" 
                   name="repeatEnd2Date" 
                   class="w-mdat txt bd01 w-rd3 f-bg" 
                   value="${dateTime?string("yyyy-MM-dd")}"/>
          </div>
        </div>
      </@groupMeetingCreateBlock>
      <@groupMeetingCreateBlock title="费用及相关">
        <div class="sti">
          <p class="itl">活动费用</p>
          <div class="ick nxd">
            <#assign feeType=fee.type!0>
            <label><input type="radio" class="cbx js-flag" name="feeType" value="0" data-type="number" <#if feeType==0>checked="checked"</#if>/>免费</label>
            <label><input type="radio" class="cbx js-flag" name="feeType" value="1" data-type="number" <#if feeType==1>checked="checked"</#if>/>AA制</label>
            <label><input type="radio" class="cbx js-flag" name="feeType" value="2" data-type="number" <#if feeType==2>checked="checked"</#if>/>收费</label>
          </div>
        </div>
        <div class="sti fes lbk" style="display:none;">
          <div class="ftb">
            <div class="th f-cb">
              <span class="fl bg01 c1">费用类型</span>
              <span class="fl bg01 c2">金额</span>
              <span class="fl c3"><a class="fc02" href="#" data-action="add">+添加一种费用</a></span>
            </div>
            <#assign feeTypeList=(fee.item!"")?split("|")>
            <#list feeTypeList as x>
              <@groupMeetingFeeItem value=x/>
            </#list>
          </div>
          <p class="fdt">费用说明</p>
          <textarea name="feeDesc" class="bd01 w-rd3 wd6 ht1">${fee.desc}</textarea>
        </div>
        <div class="sti sti-2 sti-y lbk">
          <#assign signupTime=meeting.signupStartTime!0>
          <p class="itl">报名开始时间</p>
          <div class="ick ick-1">
            <input name="signupStartType" type="radio" class="cbx" id="immediateon" value="0" <#if signupTime==0>checked="checked"</#if>/>
            <label for="immediateon">马上</label>
          </div>
          <div class="ick signup">
            <input name="signupStartType" type="radio" class="cbx" value="1" <#if signupTime!=0>checked="checked"</#if>/>
            <input type="text" 
                   readonly="true"  
                   name="signupStartDate"
                   class="w-mdat txt bd01 w-rd3 f-bg"
                   value="${.now?string("yyyy-MM-dd")}"/>
            <@groupMeetingTimeSelect name="signupStartHour" value="${.now?string(\"H\")}"/>
            <span class="f-fw1">:</span>
            <@groupMeetingTimeSelect name="signupStartMinute" value="${.now?string(\"m\")}" end=59/>
            <a class="abt fc02 js-flag" href="#">设置一个结束时间</a>
          </div>
        </div>
        <div class="sti sti-1 lbk" style="display:none">
          <#assign signupTime=meeting.signupEndTime!0>
          <p class="itl itl-1">
            <span>报名结束时间</span>          
          </p>
          <div class="ick ick-4">
            <label><input name="signupEndType" type="radio" class="cbx" value="0" <#if signupTime==0>checked="checked"</#if>/>活动开始时</label>
          </div>
          <div class="ick  ick-5 signup">
            <input name="signupEndType" type="radio" class="cbx" value="1" <#if signupTime!=0>checked="checked"</#if>/>
            <input type="text" 
                   readonly="true" 
                   name="signupEndDate" 
                   class="w-mdat txt bd01 w-rd3 f-bg"
                   value="${.now?string("yyyy-MM-dd")}"/>
            <@groupMeetingTimeSelect name="signupEndHour" value="${.now?string(\"H\")}"/>
            <span class="f-fw1">:</span>
            <@groupMeetingTimeSelect name="signupEndMinute" value="${.now?string(\"m\")}" end=59/>
            <a class="abt fc02 js-flag" href="#">移除结束时间</a>
          </div>
        </div>
        <div class="sti lbk">
          <#assign joinLimit=meeting.joinLimit!0>
          <p class="itl itl-2">人数限制</p>
          <div class="ick ick-2">
            <label><input name="joinLimitType" type="radio" class="cbx" value="0" <#if joinLimit==0>checked="checked"</#if>/>没有人数限制</label>
          </div>
          <div class="ick-3 xx xmx">
            <label>
              <input name="joinLimitType" type="radio" class="cbx" value="1" <#if joinLimit!=0>checked="checked"</#if>/>最多
            </label>
            <input type="text" class="txt bd01 w-rd3 wd3" name="joinLimit" value="${joinLimit}" data-type="number" maxlength="5" data-message="人数必须为数字"/>人
          </div>
          <div class="ick-3 xx xmx">
            <#assign observerLimit=meeting.observerLimit!0>
            <label>
              <input name="observerLimitType" type="checkbox" class="cbx" value="1" <#if observerLimit!=0>checked="checked"</#if>/>每人可携带
            </label>
            <input type="text" class="txt bd01 w-rd3 wd3" name="observerLimit" value="${observerLimit}" data-type="number" maxlength="5" data-message="人数必须为数字"/>人
          </div>
        </div>
      </@groupMeetingCreateBlock>
      <@groupMeetingCreateBlock title="消息推送" open=editMeeting>
        <div class="sti ick">
          <label><input name="message" type="checkbox" class="cbx cbx-s" value="1" data-value="0" <#if meeting.message!true>checked="checked"</#if>/>当有会员参加时，通知组织者</label>
        </div>
      </@groupMeetingCreateBlock>
      <@groupMeetingCreateBlock title="当会员回复参加时需要提交的问题" open=editMeeting>
        <div class="sti nxd">        
          <#assign qlist=meeting.questions![]>
          <#if qlist?size==0>
            <#assign qlist=[{"question":""}]>
          </#if>
          <#list qlist as x>
            <@groupMeetingQuestionItem value=x.question ndel=(x_index==0)&&qlist?size==1/>
          </#list>
        </div>
        <p class="mqst"><a class="abt fc02" href="#" data-action="add">+添加更多问题</a></p>
      </@groupMeetingCreateBlock>
      <@groupMeetingCreateBlock title="让更多人知道这次活动" open=editMeeting>
        <div class="sti sti-s lbk">
          <#assign joinPermission=meeting.joinPermission!2>
          <p class="itl">活动参加权限</p>
          <div class="ick ick-4 nxd">
            <label><input type="radio" class="cbx" name="joinPermission" value="0" data-type="number" <#if joinPermission==0>checked="checked"</#if>/>所有人</label>
            <label><input type="radio" class="cbx" name="joinPermission" value="1" data-type="number" <#if joinPermission==1>checked="checked"</#if>/>仅会员</label>
            <label><input type="radio" class="cbx" name="joinPermission" value="2" data-type="number" <#if joinPermission==2>checked="checked"</#if>/>会员加邀请</label>
          </div>
        </div>     
        <p class="itl">活动标签</p>
        <div class="sti sti-s nxd">
          <#assign tlist=meeting.tags![]>
          <#if tlist?size==0>
            <#assign tlist=[{"name":""}]>
          </#if>
          <#list tlist as x>
            <@groupMeetingTagItem value=x.name ndel=(x_index==0)&&tlist?size==1/>
          </#list>
        </div>
        <p class="mtag"><a class="abt fc02" href="#" data-action="add">+添加更多标签</a></p>       
      </@groupMeetingCreateBlock>
    </@module>
    <div class="w-tbar w-tbar-tip bd02 bg01 f-cb">
      <input name="btn-publish" type="button" class="fr w-rd3 t-btn t-btn-4" value="发布活动"/>
      <input name="btn-draft" type="button" class="fr w-rd3 t-btn t-btn-6" value="存为草稿"/>
      <a class="fr w-rd3 t-btn t-btn-6" href="/${group.homepage}/">取消</a>
    </div>
  </form>
</#macro>
<#-- 创建活动模版 -->
<#macro groupMeetingTemplate meeting={} edit=false fee={} repeat={}>
  <#if meeting.id??>
  <textarea name="js">
    window.data.meeting = ${json(meeting)};
    <#if meeting.id??>
    window.data.meeting.repeatType = ${repeat.type};
    window.data.meeting.repeatInterval = ${repeat.interval};
    window.data.meeting.repeatEndTime = ${repeat.endTime};
    window.data.meeting.repeatExt = '${(repeat.ext!"")?js_string}';
    window.data.meeting.feeType = ${fee.type};
    window.data.meeting.feeDesc = '${(fee.desc!"")?js_string}';
    window.data.meeting.feeList = '${(fee.item!"")?js_string}';
    </#if>
    <#if edit??>
    window.data.edit = ${edit?string("true","false")};
    </#if>
  </textarea>
  </#if>
  <textarea name="txt" id="txt-fee-item">
    <@groupMeetingFeeItem/>
  </textarea>
  <textarea name="txt" id="txt-question-item">
    <@groupMeetingQuestionItem action="del"/>
  </textarea>
  <textarea name="txt" id="txt-tag-item">
    <@groupMeetingTagItem action="del"/>
  </textarea>
</#macro>
</#escape>
