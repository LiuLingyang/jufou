var sc = 0;
var oid = $.jStorage.get("meetid");
var mark = function(score) {
	$.getJSON("http://www.hijufou.com/rest/meeting/graded?mid=" + oid, function(data) {
		if (data.result.graded == true) {
			$("#errorMsg").text("您已经打过分数了");
		} else {
			sc = score;
			if (score == 0) {
				alert("给个分数吧");
			} else if (score == 1) {
				$("#s1").addClass("str-x");
				$("#s2").removeClass("str-x");
				$("#s3").removeClass("str-x");
				$("#s4").removeClass("str-x");
				$("#s5").removeClass("str-x");
				$("#desp").text("很差");
			} else if (score == 2) {
				$("#s1").addClass("str-x");
				$("#s2").addClass("str-x");
				$("#s3").removeClass("str-x");
				$("#s4").removeClass("str-x");
				$("#s5").removeClass("str-x");
				$("#desp").text("较差");
			} else if (score == 3) {
				$("#s1").addClass("str-x");
				$("#s2").addClass("str-x");
				$("#s3").addClass("str-x");
				$("#s4").removeClass("str-x");
				$("#s5").removeClass("str-x");
				$("#desp").text("一般");
			} else if (score == 4) {
				$("#s1").addClass("str-x");
				$("#s2").addClass("str-x");
				$("#s3").addClass("str-x");
				$("#s4").addClass("str-x");
				$("#s5").removeClass("str-x");
				$("#desp").text("较好");
			} else if (score == 5) {
				$("#s1").addClass("str-x");
				$("#s2").addClass("str-x");
				$("#s3").addClass("str-x");
				$("#s4").addClass("str-x");
				$("#s5").addClass("str-x");
				$("#desp").text("很好");
			}
		}
	});

};

var flag=0;//解决先刷新后提交问题
var submitScore = function() {
	var cmt = $("#newcomment").val();
	if (cmt != '' && cmt != null) {
	$.ajax({
		url : "http://www.hijufou.com/rest/comment/add",
		type : "POST",
		xhrFields : {
			withCredentials : true
		},
		data : {
			"oid" : oid,
			"type" : 1,
			"content" : cmt
		},
		success : function(data) {
			data = jQuery.parseJSON(data);
			if (data.code == -3) {
				$("#errorMsg").text("抱歉，您无法发表言论");
			} 
			else
			{
				flag=1;
			}
		}
	});
	}
	if (sc > 0) {
	$.ajax({
		url : "http://www.hijufou.com/rest/meeting/grade",
		type : "POST",
		xhrFields : {
			withCredentials : true
		},
		data : {
			"mid" : oid,
			"grade" : sc
		},
		success : function(data) {
			data = jQuery.parseJSON(data);
			if (data.code == 1) {

			} else if (data.code == -3) {
				alert("抱歉，您无法打分");
			}
		}

		//error : function(data) {
			//if (data.status == 401) {
				//alert("抱歉，您无法打分");
			//}
			//else if(flag==1)
			//{
				//location.href = "../meeting/end.html";
			//}
		//}
		
		
	});
	}
	setInterval(function(){                
           location.href = "../meeting/end.html";
            },1000);
};
