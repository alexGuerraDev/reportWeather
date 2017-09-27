(function(){

	navigator.geolocation.getCurrentPosition(
		function localitation (position){
				$.ajax({
					type: 'GET',
					url : 'https://api.openweathermap.org/data/2.5/weather?lat='+ position.coords.latitude +'&lon=' + position.coords.longitude + "&units=metric&appid=9f50a805aa0089a1edd1829a5db029f0",
					dataType: 'jsonp'
				})
				.done(function( data ){
					mostrar_datos(data);

				})
				.fail(function(){
					console.log("Fail!");
				});
		}
	)


	// -----------------------------------------------------------------------------

	function mostrar_datos (data){
		var date = new Date();
		var arrayData = data;
		var html = "";
		for (var value in arrayData.weather) {
			var valor=arrayData.weather[value];
		}
		var minutes = date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes();
		var hours = date.getHours() < 10 ? "0"+date.getHours() : date.getHours();

		html+='<h1>'+arrayData.name+', <small>'+arrayData.sys.country+' '+date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()+' '+hours+': '+minutes+'</small></h1>';
		html+='<hr>';
		html+='<div class="weather col-md-6">';
			html+='<img src ="img/'+valor.icon+'.png">';
			html+='<p class="temperature">'+arrayData.main.temp+'°</p>';
			html+='<p><span>'+valor.main+'</span></p>';
			html+='<p>'+valor.description+'</p>';
			html+='<div class="col-md-6 div_temp"><span>Temp-Min: '+arrayData.main.temp_min+'°</span>	</div>	';
			html+='<div class="col-md-6 div_temp"><span>Temp-Max: '+arrayData.main.temp_max+'°</span>	</div>	';
		html+='</div>	';

		html+='<div class=" main col-md-5"> ';
			html+='<div class="main-text">';
				html+='<i class="wi wi-windy wi-fw"></i>';
				html+='<p> Wind Speed: '+arrayData.wind.speed+'</p>';
			html+='<div>';
			html+='<div class="main-text">';
				html+='<i class="wi wi-barometer wi-fw"></i>';
				html+='<p>Pressure:'+arrayData.main.pressure+'</p>';
			html+='</div>';
			html+='<div class="main-text">';
				html+='<i class="wi wi-raindrop wi-fw"></i>';
				html+='<p>Humidity: '+arrayData.main.humidity+'</p>';
			html+='</div>';
		html+='</div>';

		$(".container").append(html);
	}


})();
