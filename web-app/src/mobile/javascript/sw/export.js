$("#submit").click(function(){
	var gid=$("#gid").val();
	if(!gid){
		return false;
	}
	$.getJSON("http://www.hijufou.com/rest/open/group/members",{gid: gid,role: 0,offset: 0,limit: 1000},function(data){
		if (data.code == 1) {
			var members=data.result.list;
			var str="";
			var i,j,member,answers;
			var ques=0;
			var questitle=$(".ques");
			for (i = 0; i<members.length; i++) {
				member=members[i];
				str+='<tr><td>'+member.attendee.nickname+'</td>';
				if(member.bio){
					str+='<td>'+member.bio+'</td>';
				}else{
					str+='<td></td>'
				}
				answers=member.answers;
				for(j=0;j<answers.length;j++){
					if(ques<5&&j==ques){
						$(questitle[ques]).text(answers[ques].question.question);
						ques++;
					}
					str+='<td>'+answers[j].answer+'</td>';
				}
				for(;j<5;j++){
					str+='<td></td>';
				}
				str+='</tr>';
			};
			$("#tbl").append(str);
		}
		else{
			alert("opt error");
		}
	});
});
