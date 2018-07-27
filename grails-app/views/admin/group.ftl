<!DOCTYPE html>
<html>
  <head>
    <title>权限开通 - 聚否</title>
    <meta charset="utf-8"/>
    <!-- @STYLE -->
    <style>
    .tab{height:30px;line-height:30px;margin:10px 0;border-bottom:1px solid #aaa;overflow:hidden;}
    .tab .item{float:left;padding:0 10px;margin-right:10px;cursor:pointer;}
    .tab .item.js-selected{background:#aaa;}
    
    table{table-layout:fixed;width:100%;}
    table th,table td{padding:5px 10px;text-align:left;}
    
    .sch{margin:40px 0 10px;}
    .sch .x{height:19px;padding:2px 5px;}
    .sch .xx{margin-left:-11px;border:1px solid #ccc;background:#eee;width:50px;height:27px;cursor:pointer;}
    
    .empty td,.w-loading{text-align:center;padding:50px 0;}
    </style>
  </head>
  <body id="www-jufou-com">
    <div class="wrp">
      <div class="tab" id="admin-group-tab">
        <div class="item" data-value="-2">待审核组织</div>
        <div class="item" data-value="-3">已拒绝组织</div>
        <div class="item" data-value="0">已开通组织</div>
      </div>
      <div class="sch">
        <input type="text" name="keyword" placeholder="输入组织id" class="x" id="key"/>
	    <input type="button" name="btn-ok" value="搜索" class="xx" onclick="sch()"/>
      </div>
      <div class="lbox" id="admin-group-list">
        <p class="w-loading">&nbsp;</p>
      </div>
      <div class="pager" id="admin-group-pager"></div>
    </div>
    <#noparse>
    <div id="template-box" style="display:none;">
        <textarea name="jst" id="jst-group-list">
          <table class="glst">
            <tr><th>组织名称</th>
                <th>组织地址</th>
                <th>操作</th></tr>
            {list beg..end as y}
              {var x=xlist[y]}
              <tr>
                <td class="c0">${x.name}</td>
                <td class="c1"><a href="/${x.homepage}/" target="_blank">${x.homepage}</a></td>
                <td class="c2">
                  <a href="#" data-action="view" data-id="${x.id}" id="${x.id}-view">查看申请信息</a>
                </td>
              </tr>
              <tr style="display:none;"><td colspan="3" id="detail-${x.id}"></td></tr>
            {/list}
          </table>
        </textarea>
        <textarea name="jst" id="jst-admin-search">
          <table class="glst">
            <tr><th>组织名称</th>
                <th>组织地址</th>
                <th>操作</th></tr>
              <tr>
                <td class="c0">${x.name}</td>
                <td class="c1"><a href="/${x.homepage}/" target="_blank">${x.homepage}</a></td>
                <td class="c2">
                  <a href="#" data-action="view" data-id="${x.id}" id="${x.id}-view">查看申请信息</a>
                </td>
              </tr>
              <tr style="display:none;"><td colspan="3" id="detail-${x.id}"></td></tr>
          </table>
        </textarea>
        <textarea name="jst" id="jst-admin-detail">
          <div>
            <p>联系人：${contact}</p>
            <p>联系方式：${means}</p>
            <p>申请理由：${reason}</p>
          </div>
          <div>
            <p>
              <label><input type="radio" value="1" name="${gid}" id="${gid}-allow" checked="checked" data-action="close" data-id="${gid}"/>开通</label>
              <label><input type="radio" value="-1" name="${gid}" id="${gid}-refuse" data-action="open" data-id="${gid}"/>拒绝</label>
            </p>
            <p>父标签<input id="${gid}-tag"/></p>
            <p><input type="checkbox" id="${gid}-sub" checked="checked" value="1"/>是否是子组织</p>
            <p style="display:none;vertical-align:middle;">拒绝理由<textarea id="${gid}-result" style="vertical-align:middle;"><&#47;textarea></p>
            <p>
              <a href="#" data-action="submit" data-id="${gid}">提交</a>
              <a href="#" data-action="cancel" data-id="${gid}">取消</a>
            </p>
          </div>
        </textarea>
        <textarea name="txt" id="txt-admin-empty">
          <table class="empty">
            <tr><th>组织名称</th>
                <th>组织地址</th>
                <th>操作</th></tr>
            <tr><td colspan="3">没有数据</td></tr>
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
           
           // cache
           _p._$$Cache = NEJ.C();
           _pro = _p._$$Cache._$extend(_y._$$AbstractListCache);
           _pro.__doLoadList = function(_options){
               var _key = _options.key.split('-')[0];
               _j._$request(
                   '/rest/admin/groups',{
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
                    parent:'admin-group-list',
                    item:{klass:'jst-group-list'},
                    cache:{klass:_p._$$Cache,data:{},clear:!0},
                    pager:{parent:'admin-group-pager'},
                    onbeforelistload:function(_event){
                        _event.value = '<p class="w-loading">数据加载中...</p>';
                    },
                    onemptylist:function(_event){
                        _event.value = _e._$getTextTemplate('txt-admin-empty');
                    }
               };
           
           var _doApply = function(_data){
               _j._$request(
                   '/rest/admin/approve',{
                       method:'POST',
                       type:'json',
                       data:_u._$object2query(_data),
                       onload:function(_json){
                           if (_json.code==1){
                               if (!!_xmdl) _xmdl._$recycle();
                               _xmdl = _y._$$ListModulePG._$allocate(_mopt);
                           }else{
                               alert('操作失败');
                           }
                       },
                       onerror:function(){
                           alert('操作失败');
                       }
                   }
               );
           };
           var _doView = function(_id){
               _j._$request(
                   '/rest/admin/application',{
                       method:'POST',
                       type:'json',
                       data:_u._$object2query({gid:_id}),
                       onload:function(_json){
                           var _node = _e._$get('detail-'+_id),
                               _result = _json.result||{};
                           _result.gid = _id;
                           _e._$renderHtmlTemplate(
                               _node,'jst-admin-detail',_result
                           );
                           _node.parentNode.style.display = '';
                       }
                   }
               );
           };
           
           window.sch = function(){
				var _groupname = _e._$get('key').value;
		    	_j._$request('/rest/admin/group',{
		        	method:'POST',
					type:'json',
					data:_u._$object2query({group:_groupname}),
					onload:function(_json){
				    	_e._$renderHtmlTemplate('admin-group-list','jst-admin-search',{x:_json.result});
					},
					onerror:function(_json){
						alert('暂时只支持组织id搜索！');
				    }
				});
			}
			
           _v._$addEvent(
               'admin-group-list','click',function(_event){
                   var _node = _v._$getElement(_event,'d:action');
                   if (!_node) return;
                   if (_node.tagName=='A')
                       _v._$stop(_event);
                   var _id = _e._$dataset(_node,'id');
                   switch(_e._$dataset(_node,'action')){
                       case 'open':
                           _e._$get(_id+'-result').parentNode.style.display = '';
                           _e._$get(_id+'-tag').parentNode.style.display = 'none';
                           _e._$get(_id+'-sub').parentNode.style.display = 'none';
                       return;
                       case 'close':
                           _e._$get(_id+'-result').parentNode.style.display = 'none';
                           _e._$get(_id+'-tag').parentNode.style.display = '';
                           _e._$get(_id+'-sub').parentNode.style.display = '';
                       return;
                       case 'view':
                           _doView(_id);
                           _e._$setStyle(_id+'-view','display','none');
                       return;
                       case 'cancel':
                           _e._$setStyle(_id+'-view','display','');
                           _e._$setStyle(_e._$get('detail-'+_id).parentNode,'display','none');
                       return;
                       case 'submit':
                           var _elm = _e._$get(_id+'-allow');
                           if (_elm.checked){
                               var _chid = _e._$get(_id+'-sub');
                               var _sub;
                               if(_chid.checked){
                                   _sub = 1
                               }else{
                                   _sub = 0
                               }
                               _doApply({
                                   gid:_id,
                                   state:1,
                                   tag:_e._$get(_id+'-tag').value,
                                   sub:_sub
                               });
                           }else{
                               _doApply({
                                   gid:_id,
                                   state:-1,
                                   reason:_e._$get(_id+'-result').value
                               });
                           }
                       return;
                   }
               }
           );
           
           _y._$$Tab._$allocate({
               list:_e._$getChildren('admin-group-tab'),
               onchange:function(_event){
                   _mopt.cache.data.state = _event.data;
                   _mopt.cache.lkey = 'groups-'+_event.data;
                   if (!!_xmdl) _xmdl._$recycle();
                   _xmdl = _y._$$ListModulePG._$allocate(_mopt);
               }
           });
           
       });
    </script>
  </body>
</html>