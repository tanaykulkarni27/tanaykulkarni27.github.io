var url = "https://api.weatherapi.com/v1/current.json?key=b174e5277ff44a7b9cd94407220801&q=Maharashtra";
fetch(url).then((response)=>{

	return response.json();
}).then((res)=>{
	console.log(res.current.condition);

	document.getElementById('img').src = 'https:'+res.current.condition.icon;
	document.getElementById('region').innerHTML = "Region : "+res.location.region;
	document.getElementById('temp').innerHTML = "Temperature : "+res.current.temp_c+"Deg";
	document.getElementById('wind_speed').innerHTML = "Wind Speed : "+res.current.wind_kph+"Km/h";
	document.getElementById('condition').innerHTML = "Wind condition : "+res.current.condition.text;
	document.getElementById('humidity').innerHTML = "Humidity : "+res.current.humidity+"%";
	
});
