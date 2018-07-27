<!DOCTYPE html>
<html>
  <head>
    <title>权限开通 - 聚否</title>
    <meta charset="utf-8"/>
    <!-- @STYLE -->
    <style>
    .top{height:30px;background:#eee;}
    .top .out{float:right;padding:0 30px;line-height:30px;}
    
    .tab{float:left;width:200px;margin-top:30px;}
    .tab .itm{padding:10px 20px;cursor:pointer;margin-bottom:10px;}
    .tab .js-selected{background:#eee;}
    
    .mod{margin-left:220px;margin-top:30px;}
    .sch{margin:40px 0 10px;}
    .sch .x{height:19px;padding:2px 5px;}
    .sch .xx{margin-left:-11px;border:1px solid #ccc;background:#eee;width:50px;height:27px;cursor:pointer;}
    table{table-layout:fixed;width:100%;}
    table th,table td{padding:5px 10px;text-align:left;}
    
    .empty td,.w-loading{text-align:center;padding:50px 0;}
    
    </style>
  </head>
  <body id="www-jufou-com">
    <div class="top">
      <script>function logout(){var i=new Image();i.onerror=function(){location.reload();};i.src='/rest/admin/logout';return !1;}</script>
      <a href="#" class="out" onclick="return !!logout();">[退出]</a>
    </div>
    <div class="tab" id="admin-user-tab">
      <div class="itm" data-value="0">未激活用户</div>
      <div class="itm" data-value="1">已激活用户</div>
      <div class="itm" data-value="2">所有用户</div>
    </div>
    <div class="mod">
      <div class="sch">
        <input type="text" name="keyword" placeholder="输入用户名" class="x" id="key"/>
	    <input type="button" name="btn-ok" value="搜索" class="xx" onclick="sch()"/>
      </div>
      <div class="lbox" id="admin-user-list">
        <p class="w-loading">&nbsp;</p>
      </div>
      <div class="pager" id="admin-user-pager"></div>
    </div>
    <#noparse>
    <div id="template-box" style="display:none;">
      <textarea name="jst" id="jst-user-list">
        <table class="ulst">
          <tr><th>姓名</th>
	          <th>邮箱地址</th>
	          <th>手机号码</th>
	          <th>操作</th></tr>
	      {list beg..end as y}
            {var x=xlist[y]}
	        <tr><td>${x.nickname|default:''}</td>
		        <td>${x.email|default:''}</td>
		        <td>${x.mobile|default:''}</td>
		        <td>
		          {if x.state==0}
		          <a href="#" data-action="activate" data-id="${x.id}">激活</a>
		          {else}
		            <a href="#" data-action="open" data-id="${x.id}">修改建组织配额</a>
		            <div style="display:none;" id="${x.id}-sub"><input type="text" id="${x.id}-val"/><input type="button" value="提交"  data-action="submit" data-id="${x.id}"/></div>
		          {/if}
		        </td></tr>
		  {/list}
        </table>
      </textarea>
      <textarea name="txt" id="txt-admin-empty">
        <table class="empty">
          <tr><th>姓名</th>
              <th>邮箱地址</th>
              <th>手机号码</th>
              <th>操作</th></tr>
          <tr><td colspan="4">没有数据</td></tr>
        </table>
      </textarea>
      <textarea name="jst" id="jst-admin-search">
        <table class="ulst">
          <tr><th>姓名</th>
	          <th>邮箱地址</th>
	          <th>手机号码</th>
	          <th>操作</th></tr>
	      {if !!x}
	      <tr><td>${x.nickname|default:''}</td>
		      <td>${x.email|default:''}</td>
		      <td>${x.mobile|default:''}</td>
		      <td>
		          {if x.state==0}
		          <a href="#" data-action="activate" data-id="${x.id}">激活</a>
		          {else}
		            <a href="#" data-action="open" data-id="${x.id}">修改建组织配额</a>
		            <div style="display:none;" id="${x.id}-sub"><input type="text" id="${x.id}-val"/><input type="button" value="提交"  data-action="submit" data-id="${x.id}"/></div>
		          {/if}
		      </td></tr>
		  {else}
		  <tr><td colspan="4">搜索用户不存在</td></tr>
		  {/if}
        </table>
      </textarea>
    </div>
    </#noparse>
    <#noparse>
    <!-- @DEFINE -->
    </#noparse>
    <script src="/src/javascript/com/lib/define.js?pro=/src/javascript/&com=/src/javascript/com/pro/"></script>
    <script>
        define(['{lib}base/event.js'
               ,'{lib}util/tab/tab.js'
               ,'{lib}util/ajax/xdr.js'
               ,'{lib}util/template/tpl.js'
               ,'{lib}util/list/module.pager.js'
               ,'{lib}util/cache/cache.list.base.js'],
        function(){
            var _  = NEJ.P,
            	_o = NEJ.O,
                _e = _('nej.e'),
                _v = _('nej.v'),
                _u = _('nej.u'),
                _y = _('nej.ut'),
                _j = _('nej.j'),
                _x = _('mu.x'),
                _p = _('mu.ut'),
                _pro;
                
            _e._$parseTemplate('template-box'); 
                 
            //Cache
            _p._$$User = NEJ.C();
            _pro = _p._$$User._$extend(_y._$$AbstractListCache);
            _pro.__doLoadList = function(_options){
            	var _key = _options.key.split('-')[0];
            	_j._$request(
                   '/rest/admin/users',{
                       method:'POST',
                       type:'json',
                       data:_u._$object2query(_options.data),
                       onload:function(_json){
                           _options.onload(_json.result);
                       },
                       onerror:function(){
                           _options.onload(NEJ.O);
                       }
                   }
               );
            };
            
            var _xmdl,
	            _mopt = {
	            	limit:100,
	                parent:'admin-user-list',
	                item:{klass:'jst-user-list'},
	                cache:{klass:_p._$$User,data:{},clear:!0},
	                pager:{parent:'admin-user-pager'},
	                onbeforelistload:function(_event){
	                    _event.value = '<p class="w-loading">数据加载中...</p>';
	                },
	                onemptylist:function(_event){
	                    _event.value = _e._$getTextTemplate('txt-admin-empty');
	                }
	            };
            
            _y._$$Tab._$allocate({
                list:_e._$getChildren('admin-user-tab'),
                onchange:function(_event){
                    _mopt.cache.data.state = _event.data;
                    if(_event.data==2)
                    delete _mopt.cache.data.state;
                	_mopt.cache.lkey = 'users-'+_event.data;
		            if (!!_xmdl) _xmdl._$recycle();
		            _xmdl = _y._$$ListModulePG._$allocate(_mopt);
                }
            });
            
            window.sch = function(){
				var _username = _e._$get('key').value;
		    	_j._$request('/rest/admin/user',{
		        	method:'POST',
					type:'json',
					data:_u._$object2query({username:_username}),
					onload:function(_json){
				    	_e._$renderHtmlTemplate('admin-user-list','jst-admin-search',{x:_json.result});
					},
					onerror:function(_json){
						alert('搜索功能暂不可用！');
				    }
				});
			}
			
			_v._$addEvent(
				'admin-user-list','click',function(_event){
					var _node = _v._$getElement(_event,'d:action');
					if (!_node) return;
					var _id = _e._$dataset(_node,'id');
					switch(_e._$dataset(_node,'action')){
						case 'activate':
							_j._$request('/rest/admin/activate',{
						    	method:'POST',
							   	type:'json',
							   	data:_u._$object2query({uid:_id}),
							   	onload:function(_json){
							        if (!!_xmdl) _xmdl._$recycle();
			                    	_xmdl = _y._$$ListModulePG._$allocate(_mopt);
							   	},
							  	 onerror:function(_json){
								   	alert('暂时无法激活用户！');
							   	}
					   		});
						retrun;
						case 'open':
							_e._$get(_id+'-sub').style.display = '';
						return;
						case 'submit':
							var _limit = _e._$get(_id+'-val').value;
							_j._$request('/rest/admin/userQuota',{
						    	method:'POST',
							   	type:'json',
							   	data:_u._$object2query({
							   		uid:_id,
							   		groupLimit:_limit
							   	}),
							   	onload:function(_json){
							        if (!!_xmdl) _xmdl._$recycle();
			                    	_xmdl = _y._$$ListModulePG._$allocate(_mopt);
							   	},
							  	 onerror:function(_json){
								   	alert('暂时无法修改配额！');
							   	}
					   		});
						return;
					}
				}
			);
});
    </script>
  </body>
</html>