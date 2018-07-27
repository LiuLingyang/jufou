$(function() {
	//initialize province,city
	var provinces = dmap.p;
	var province=$('#selectProvince');
	var city=$('#selectCity');
	
	province[0].options[0] = new Option("省份", "");
	city[0].options[0] = new Option("城市", "");
	for (var i = 0; i < provinces.length; i++) {
		province[0].options[i + 1] = new Option(provinces[i], provinces[i]);
	}
	
	province.change(function() {
		city.val("");
		change_city(province,city);
	});
});
function change_city(province,city) {
	var cityOptions = dmap.c[province.val()];
	for(var i=city[0].options.length-1;i>0;i--)
		city[0].options.remove(i);
	if (cityOptions) {
		for (var i = 0; i < cityOptions.length; i++) {
			city[0].options[i + 1] = new Option(cityOptions[i], cityOptions[i]);
		}
	}
}