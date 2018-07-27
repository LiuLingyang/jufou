<!DOCTYPE html>
<html>
  <head>
    <title>创建组织 - 聚否</title>
    <@head/>
    <!-- @STYLE -->
    <link href="${css_root}base.css" rel="stylesheet" type="text/css"/>    
    <link href="${css_root}group.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}window.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}group/setting.tag.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}group/setting.join.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}group/setting.basic.css" rel="stylesheet" type="text/css"/>
    <link href="${css_root}group/create.css" rel="stylesheet" type="text/css"/>
    <@theme/>
  </head>
  <body id="www-jufou-com">
    <@page user=host index=2 class="g-gnw t-gbx g-xxx">
      <@messagebox/>
      <form class="w-fom s-srd">
        <@module title="创建属于你的组织" id="a0" class="t-mdi t-mdf">
          <@groupCreateStep index=1/>
          <div class="inrx"><@groupFormSettingBasic check=true/></div>
        </@module>
	    <div class="w-tbar bd02 bg01 f-cb">
	      <input type="button" class="fr w-rd3 t-btn t-btn-4" name="btn-ok" value="下一步"/>
	      <a class="fr w-rd3 t-btn t-btn-2" href="/">取消</a>
	    </div>
      </form>
    </@page>
    <@groupTemplateCollection host=host>
      <@groupCreateTemplate/>
      <@groupTagItemTemplate/>
      <@groupSettingTagTemplate/>
    </@groupTemplateCollection>
    <#noparse>
    <!-- @DEFINE -->
    </#noparse>
    <script src="${lib_root}define.js${cfg_root}"></script>
    <script>
	    define(['{lib}util/template/tpl.js'
	           ,'{lib}util/dispatcher/dispatcher.2.js'
		       ,'{pro}module/group/create/step1.js'
		       ,'{pro}module/group/create/step2.js'
		       ,'{pro}module/group/create/step3.js'],
		function(){
		    var _  = NEJ.P,
		        _e = _('nej.e'),
		        _t = _('nej.ut'),
		        _m = _('mu.m.g');
		    _e._$parseTemplate('template-box');
		    window.dispatcher = _t._$$Dispatcher
		        ._$getInstance()._$regist({
		              '/?/m/s1/':{gid:'abc',module:_m._$$ModuleStep1},
		              '/?/m/s2/':{gid:'abc',module:_m._$$ModuleStep2},
		              '/?/m/s3/':{gid:'abc',module:_m._$$ModuleStep3}
		        })._$redirect('/?/m/s1/');
		});
    </script>
  </body>
</html>