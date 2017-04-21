// Initialize required data points

// App Specific
units = "I"; // (I)mperial || (M)etric

// Location
zip = "";
city = "";
region = "";

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
wind_mph = -1;      // Wind Speed (MPH)
wind_kph = -1;      // Wind Speed (KPH)
wind_dir = "";      // Wind Direction
icon_url = "";      // Weather Icon ID
icon = "";          // String Representation of Icon




getLocation();

function getLocation() {
    // Get location based on IP address (http://ipinfo.io/developers)
    $.getJSON("https://ipinfo.io/json?callback=?", function(response) {
        returnLocation(response);
    }, "jsonp")
};

function returnLocation(location) {
    zip = location.postal;
    city = location.city;
    region = location.region;
    getWeather();
}

function getWeather() {
// Get weather local weather based on location (https://www.wunderground.com/weather/api/d/docs/)
    app_id = "bbc79e56a30ffa2c";
    conditions_url = "https://api.wunderground.com/api/" + app_id + "/conditions/q/" + zip + ".json";
    forecast_url = "https://api.wunderground.com/api/" + app_id + "/forecast/q/" + zip + ".json";
    $.getJSON(conditions_url, function(response) {
        returnWeather(response);
    }, "jsonp");
    $.getJSON(forecast_url, function(response) {
        returnForecast(response);
    }, "jsonp");
};

function returnWeather(weather) {
    temp_f = weather.current_observation.temp_f;
    feelslike_f = weather.current_observation.feelslike_f;

    temp_c = weather.current_observation.temp_c;
    feelslike_c = weather.current_observation.feelslike_c;

    conditions = weather.current_observation.weather;

    wind_mph = weather.current_observation.wind_mph;
    wind_kph = weather.current_observation.wind_kph;
    wind_dir = weather.current_observation.wind_dir;

    icon_url = weather.current_observation.icon_url

    displayData();
}

function returnForecast(forecast) {
    maxtemp_f = forecast.forecast.simpleforecast.forecastday[0].high.fahrenheit;
    mintemp_f = forecast.forecast.simpleforecast.forecastday[0].low.fahrenheit;

    maxtemp_c = forecast.forecast.simpleforecast.forecastday[0].high.celsius;
    mintemp_c = forecast.forecast.simpleforecast.forecastday[0].low.celsius;
    displayData();
}

function displayData() {
    if (units == "I") {
        $("#temperature").text(Math.round(temp_f, 0) + String.fromCharCode(176));
        $("#feels-like").text("Feels like " + Math.round(feelslike_f, 0) + String.fromCharCode(176));
        $("#high-temp").text(Math.round(maxtemp_f, 0) + String.fromCharCode(176));
        $("#low-temp").text(Math.round(mintemp_f, 0) + String.fromCharCode(176));
    } else {
        $("#temperature").text(Math.round(temp_c, 0) + String.fromCharCode(176));
        $("#feels-like").text("Feels like " + Math.round(feelslike_c, 0) + String.fromCharCode(176));
        $("#high-temp").text(Math.round(maxtemp_c, 0) + String.fromCharCode(176));
        $("#low-temp").text(Math.round(mintemp_c, 0) + String.fromCharCode(176));
    }
    // chooseIcon();

    // $("#weather-icon").addClass("wi wi-fw wi-4x wi-" + icon);
    $("#weather-icon").attr("src", icon_url.replace("/k/", "/i/"));
    $("#conditions").text(conditions);

    $("#weather-header h1").text(city + ", " + region);

    $("#weather-form").removeClass("hidden");

}

$("#imperial").click(function() {
    if (units == "M") {
        units = "I";
        switchUnits();
        displayData();
    }
})


$("#metric").click(function() {
    if (units == "I") {
        units = "M";
        switchUnits();
        displayData();
    }
})

function switchUnits() {
    $("#imperial").toggleClass("selected unselected");
    $("#metric").toggleClass("selected unselected");
}
