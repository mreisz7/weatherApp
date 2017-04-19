// Initialize required data points

// App Specific
metric_imperial = "imperial";

// Location
lat = 0;
long = 0;
city = "";

// Weather
temp_f = -1;        // Temperature (F)
feelslike_f = -1;   // Feels Like Temperature (F)
mintemp_f = -1;     // Min Temperature (F)
maxtemp_f = -1;     // Max Temperature (F)
temp_c = -1;        // Temperature (C)
feelslike_c = -1;   // Feels Like Temperature (C)
mintemp_c = -1;     // Min Temperature (C)
maxtemp_c = -1;     // Max Temperature (C)
conditions = "";    // Current Conditions
is_day = -1;        // Day flag (1 = day, 0 = night)
wind_mph = -1;      // Wind Speed (MPH)
wind_kph = -1;      // Wind Speed (KPH)
wind_dir = "";      // Wind Direction





getLocation();

function getLocation() {
    // Get location based on IP address (http://ipinfo.io/developers)
    $.getJSON("https://ipinfo.io/json?callback=?", function(response) {
        returnLocation(response);
    }, "jsonp")
};

function returnLocation(location) {
    lat = location.loc.split(',')[0];
    long = location.loc.split(',')[1];
    city = location.city;
    console.log("latitude: " + lat);
    console.log("longitude: " + long);
    $("#city").text("City: " + city);
    $("#latitude").text("Latitude: " + lat);
    $("#longitude").text("Longitude: " + long);
    getWeather();
}

function getWeather() {
// Get weather local weather based on location (https://home.openweathermap.org/api_keys)
//     API Key: 5d5f0142b86622e00150ad7d838a1ef5
    // app_id = "5d5f0142b86622e00150ad7d838a1ef5";
    // units = "imperial"
    // api_url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&units=" + units + "&APPID=" + app_id + "&callback=?";

    app_id = "8b012c9e5f1f4be583004535171904";
    api_url = "https://api.apixu.com/v1/forecast.json?key=" + app_id + "&q=" + lat + "," + long + "&days=1"
    // api_url = "https://api.apixu.com/v1/current.json?key=" + app_id + "&q=" + lat + "," + long + "&days=1"
    $.getJSON(api_url, function(response) {
        returnWeather(response);
    }, "jsonp")
};

function returnWeather(weather) {
    temp_f = weather.current.temp_f;
    feelslike_f = weather.current.feelslike_f;
    mintemp_f = weather.forecast.forecastday[0].mintemp_f;
    maxtemp_f = weather.forecast.forecastday[0].maxtemp_f;

    temp_c = weather.current.temp_c;
    feelslike_c = weather.current.feelslike_c;
    mintemp_c = weather.forecast.forecastday[0].mintemp_c;
    maxtemp_c = weather.forecast.forecastday[0].maxtemp_c;

    conditions = weather.current.condition.text;

    is_day = weather.current.is_day;
    wind_mph = weather.current.wind_mph;
    wind_kph = weather.current.wind_kph;
    wind_dir = weather.current.wind_dir;


    $("#temperature").text("Temperature (C): " + Math.round(temp_c, 0));
    // $("#temperature").text("Temperature (F): " + temperature);
    $("#weather").text("Weather: " + conditions);
}
