<#escape x as x!""?html>
<#-- 模块ID 50-59 -->
<#-- 群通知成员模块 -->
<#macro groupFormInfom>
  <@module title="群通知成员" id="50" class="t-mdi t-mdf s-srd">
    <div class="w-fom">
      <div class="blk">
        <p class="ybt fc07">主题</p>
        <div class="yip">
          <input type="text" 
                 name="title"
                 data-required="true"
                 data-message="请输入主题"
                 maxlength="80"
                 class="txt bd01 w-rd3 wd0"/>
        </div>
      </div>
      <div class="blk xbm">
        <p class="ybt fc07 tip">正文</p>
        <div class="yip">
          <textarea name="content"
                    data-required="true"
                    data-message="请输入正文内容"
                    class="bd01 w-rd3 wd1 ht0"></textarea>
        </div>
      </div>
    </div>
  </@module>
</#macro>
<#-- 群通知成员页面 -->
<#macro groupInfom group={}>
  <@groupFormInfom/>
  <div class="w-tbar bd02 f-cb w-tbar2 bg00">
    <input type="button" name="btn-ok" class="fr w-rd3 t-btn t-btn-4" value="发布"/>
    <a class="fr w-rd3 t-btn t-btn-2" href="/${group.homepage}/">取消</a>
  </div>
</#macro>
<#-- 群通知成员页面模版 -->
<#macro groupInfomTemplate meeting={}>
  <textarea name="js">
    window.data.meeting = ${json(meeting)};
  </textarea>
</#macro>
</#escape>