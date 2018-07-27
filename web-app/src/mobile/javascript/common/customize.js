/*
 * section定制化 
 */
function initGroupSection(gid){
	var groupSectionCustomize={
			157:["学院","校团委#校管社团#体工部#财会学院#法学院#工商管理学院#公共管理学院#杭州商学院#环境学院#信电学院#金融学院#"
	        +"经济学院#旅游学院#人文学院#日语学院#食品学院#统计学院#外国语学院#信息学院#艺术学院#章乃器学院"],
	        480:["区域","下沙社团#桐乡社团"],
	        2362:["部门","学术科技中心#体育文化中心#实践服务中心#文娱艺术中心"],
	        1965:["挂靠单位","校团委#学工部#校毕业生就业指导中心#理学院#材料与纺织学院#服装学院#信息学院#机械与自动控制学院#建筑工程学院#生命与科学学院#艺术与设计学院#经济管理学院#法政学院#外国语学院#文化传播学院#启新学院#校国际交流处#体育教研部#艺术指导中心"],
	};
	
	var sections=groupSectionCustomize[gid];
	if(sections){
		var arr = sections[1].split("#");
		var str="";
		for(var i=0;i<arr.length;i++){
			str+="<option value='" + arr[i] + "'>" + arr[i] + "</option>";
		}
		return [groupSectionCustomize[gid][0],str];
	}
	else{
		return null;
	}
}
function initMeetSection(gid){
	var meetSectionCustomize={
			157:["学院","院级活动#校级活动"],
			480:["区域","下沙社团#桐乡社团"],
			2362:["部门","学术科技中心#体育文化中心#实践服务中心#文娱艺术中心"],
			1965:["挂靠单位","校团委#学工部#校毕业生就业指导中心#理学院#材料与纺织学院#服装学院#信息学院#机械与自动控制学院#建筑工程学院#生命与科学学院#艺术与设计学院#经济管理学院#法政学院#外国语学院#文化传播学院#启新学院#校国际交流处#体育教研部#艺术指导中心"],
	};
	var sections=meetSectionCustomize[gid];
	if(sections){
		var arr = sections[1].split("#");
		var str="";
		for(var i=0;i<arr.length;i++){
			str+="<option value='" + arr[i] + "'>" + arr[i] + "</option>";
		}
		return [meetSectionCustomize[gid][0],str];
	}
	else{
		return null;
	}
}

/*
 * 通过父组织确定位置菜单
 * @depend: lib/address.js
 * */
function initArea(province,city){
	var areas,useArea=true;
	if((dmap.s)[province]){
		//don't use area
		areas=(dmap.c)[province];
		useArea=false;
	}else{
		areas=(dmap.a)[province+'-'+city];
	}
	areas||(areas=(dmap.a)['浙江省-杭州市']);
	var str="";
	for(var i=0;i<areas.length;i++){
		str+="<option value='" + areas[i] + "'>" + areas[i] + "</option>";
	}
	return [useArea,str];
}