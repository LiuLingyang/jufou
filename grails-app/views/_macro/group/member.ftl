<#escape x as x!""?html>
<#-- 模块ID 60-69 -->
<#-- 群通知成员模块 -->
<#macro groupMember group={} host={} relationship=0 counts={}>
  <@module title="组织成员" id="60" class="t-mdi s-srd">
    <div class="xact">
      <#if relationship==2||relationship==3||relationship==4>
      <a class="xi fc02 f-bg xi-01" href="/${group.homepage}/member/${host.id}/">查看组织名片</a>
      <a class="xi fc02 f-bg xi-02" href="/${group.homepage}/setting/message/">消息推送设置</a>
      <a class="xi fc02 f-bg xi-03" href="/rest/group/exportanswers?gid=${group.id}&type=EXCEL">导出会员列表</a>
      <#else>
      <a class="xi fc02 f-bg xi-01" href="/${group.homepage}/member/${host.id}/">查看组织名片</a>
      <a class="xi fc02 f-bg xi-02" href="/${group.homepage}/setting/message/">消息推送设置</a>
      </#if>
    </div>
    <#local items=["所有成员(${counts.all!0})","管理团队(${counts.admin!0})"]>
    <#if relationship&gt;=2>
      <#local items=["所有成员(${counts.all!0})","管理团队(${counts.admin!0})",
                     "申请加入(${counts.join!0})","黑名单(${counts.ban!0})"]>
    </#if>
    <@taber items=items id="member-tab" index=-1>
      <form class="sbox w-fom f-cb js-xflag bg04" style="visibility:hidden;">
        <div class="fl">
          <label class="sort">排序</label>
          <select class="bd01 w-rd3" data-index="3" name="sort">
            <option value="1">姓名升序</option>
            <option value="2">姓名降序</option>
            <option value="3">加入时间升序</option>
            <option value="4" selected="selected">加入时间降序</option>
          </select>
        </div>
        <div class="fr">
          <p class="tip"><input type="text" name="keyword" class="txt2 bd01 w-rd3l wd0" placeholder="搜索会员"/><#--
                      --><input type="button" class="sch bd01 w-rd3r f-bg" name="btn-search" value=" "/></p>
        </div>
      </form>
      <div class="lbox js-xflag">
        <p class="w-loading">&nbsp;</p>
      </div>
      <div class="pbox js-xflag"></div>
    </@taber>
  </@module>
</#macro>
<#-- 成员模块模版 -->
<#macro groupMemberTemplate relationship=relationship>
  <textarea name="ntp" id="ntp-member-item">
    <div class="w-mitx bd00 f-cb">
      <div class="img fl"><img class="js-xflag w-rd5p"/></div>
      <div class="act fr f-cb js-xflag"></div>
      <div class="dtl fc07">
        <p class="ln ln0"><a class="fc02 js-xflag wrd" href="#"></a></p>
        <p class="ln ln2 js-xflag f-bg"></p>
        <p class="ln ln1 js-xflag"></p>
        <div class="ln ln3 fc06 js-xflag"></div>
      </div>
    </div>
  </textarea>
  <textarea name="jst" id="jst-member-action">
    {var host_role=${relationship}}
    {if host_role==3&&user_role==1}
    <p class="ln ln1"><a class="fc02" href="#" data-action="cocreate-a">加为共同创建者</a></p>
    {/if}
    {if (host_role==4||host_role==3)&&user_role==1}
    <p class="ln ln1"><a class="fc02" href="#" data-action="admin-a">加为管理员</a></p>
    {/if}
    {if host_role==3&&user_role==4}
    <p class="ln ln1"><a class="fc02" href="#" data-action="cocreate-c">取消共同创建者</a></p>
    {/if}
    {if (host_role==4||host_role==3)&&user_role==2}
    <p class="ln ln1"><a class="fc02" href="#" data-action="admin-c">取消管理员</a></p>
    {/if}
    {if ((host_role==4||host_role==2)&&user_role==1)||((host_role==4||host_role==3)&&(user_role==2||user_role==1))}
    <p class="ln ln1"><a class="fc02" href="#" data-action="cancel">取消会员</a></p>
    {/if}
    {if (host_role==4||host_role==3)&&(user_role==4||user_role==2||user_role==1)}
    <p class="ln ln1"><a class="fc02" href="#" data-action="message">发消息</a></p>
    {/if}
    {if host_role>1&&user_role==-2}
    <p class="ln ln1"><a class="fc02" href="#" data-action="member-a">加为会员</a></p>
    <p class="ln ln1"><a class="fc02" href="#" data-action="delete">删除</a></p>
    {/if}
    {if host_role>1&&user_role==-1}
    <a class="fr w-rd3 t-btn t-btn-4" href="#" data-action="member-a">批准</a>
    <a class="fr w-rd3 t-btn t-btn-2" href="#" data-action="member-r">拒绝</a>
    {/if}
  </textarea>
</#macro>
</#escape>