// declare a few variables to give them global accessibility
var current_time;
var time;
var hours;
var minutes;
var iconURLPrefix = "http://openweathermap.org/img/wn/";
var iconURLSuffix = ".png";
var currentDisplayed;
var data;
var currentBlock;
var forecastBlock;

// function to provide the weather page content upon execution of json fetching
function displayWeatherDublin(data){

    // html block for current weather
    currentBlock =  `<div class="forecast_type"><button class="weather_button" id="current_button" style="background-color:#aabdbd">Currently in Dublin</button><button class="weather_button" id="forecast_button" type="button" onclick="changeWeather();">Forecast</button></div>
                    <div class="hours_forecast">
                        <div class="small_forecast_box" id="current_icon_box">
                            <img src='` + iconURLPrefix + data.current.weather[0].icon + iconURLSuffix + `' alt='weather icon'>
                        </div>
                        <div class="small_forecast_box">
                            <p><span class="hr_font">` + hours + ":" + minutes + "</span><br><br>"+ data.current.temp + `°C<br><br>
                            <span class='description'>` + data.current.weather[0].description + `</span><br><br>
                            rain: ` + data.minutely[0].precipitation + `mm</p>
                        </div>
                    </div>`

    // html block for forecasted weather
    forecastBlock = `<div class="forecast_type"><button class="weather_button" id="current_button" type="button" onclick="changeWeather();">Currently in Dublin</button><button class="weather_button" id="forecast_button" style="background-color:#aabdbd">Forecast</button></div>
                    <div class="hours_forecast">
                    <div class= "small_forecast_box">
                        <p class="hr_font">2hr</p>
                            <p id="2hr">
                            <img src='` + iconURLPrefix + data.hourly[2].weather[0].icon + iconURLSuffix + `' alt='weather icon'><br><br>
                            <p><span class='description'>` + data.hourly[2].weather[0].description + `</span><br><br>
                            chance of rain: ` + Math.round(data.hourly[2].pop * 100) + `%</p>
                        </p>
                    </div>
                    <div class= "small_forecast_box">
                        <p class="hr_font">4hr</p>
                            <p id="4hr">
                            <img src='` + iconURLPrefix + data.hourly[4].weather[0].icon + iconURLSuffix + `' alt='weather icon'><br><br>
                            <p><span class='description'>` + data.hourly[4].weather[0].description + `</span><br><br>
                            chance of rain: ` + Math.round(data.hourly[4].pop * 100) + `%</p>
                        </p>
                    </div>
                    <div class= "small_forecast_box">
                        <p class="hr_font">6hr</p>
                            <p id="6hr">
                            <img src='` + iconURLPrefix + data.hourly[6].weather[0].icon + iconURLSuffix + `' alt='weather icon'><br><br>
                            <p><span class='description'>` + data.hourly[6].weather[0].description + `</span><br><br>
                            chance of rain: ` + Math.round(data.hourly[6].pop * 100) + `%</p>
                        </p>
                    
                    </div>
                    <div class= "small_forecast_box">
                        <p class="hr_font">8hr</p>
                            <p id="8hr">
                            <img src='` + iconURLPrefix + data.hourly[8].weather[0].icon + iconURLSuffix + `' alt='weather icon'><br><br>
                            <p><span class='description'>` + data.hourly[8].weather[0].description + `</span><br><br>
                            chance of rain: ` + Math.round(data.hourly[8].pop * 100) + `%</p>
                        </p>
                    </div>
                </div>`;

        // page should load current weather by default
        document.getElementById("show_weather").innerHTML = currentBlock;
}

// function to change the weather information shown
function changeWeather() {
        
    var content = document.getElementById("show_weather");
    
    // if total current weather is showing
    if (currentDisplayed == true){
        // change to forecase weather
        content.innerHTML = forecastBlock;
        currentDisplayed = false;

    // if forecast weather is showing
    } else {
        // change to current
        content.innerHTML = currentBlock;
        currentDisplayed = true;
    }
}

$.getJSON("https://api.openweathermap.org/data/2.5/onecall?lat=53.350140&lon=-6.266155&units=metric&exclude=daily&appid=C5826d96448b6ef028c87b0cf5da80b7", function(data){

    // set variables previously declared
    current_time = data.current.dt;
    time = new Date(current_time * 1000);
    hours = time.getHours();

    // handle for time values less than 10
    // otherwise the time 08:05 displays as 8:5
    if (hours < 10){
        hours = "0" + hours
    }
    minutes = time.getMinutes();
    if (minutes < 10){
        minutes = "0" + minutes
    }
    
    currentDisplayed = true;

    // invoke content function                                    
    displayWeatherDublin(data);
});