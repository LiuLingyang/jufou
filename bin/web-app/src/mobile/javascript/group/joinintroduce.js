	$("#nextStep").click(
  		function(){
  			var intr = $("#introduce").val();
  			$.jStorage.set("selfintroduce",intr);
  			location.href = "../group/join.html";
  		}
  	);