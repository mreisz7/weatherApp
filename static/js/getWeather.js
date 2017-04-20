// Initialize required data points

// App Specific
units = "I"; // (I)mperial || (M)etric

// Location
lat = 0;
long = 0;
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
is_day = -1;        // Day flag (1 = day, 0 = night)
wind_mph = -1;      // Wind Speed (MPH)
wind_kph = -1;      // Wind Speed (KPH)
wind_dir = "";      // Wind Direction
icon_id = 0;        // Weather Icon ID
icon = "";          // String Representation of Icon




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
    region = location.region;
    getWeather();
}

function getWeather() {
// Get weather local weather based on location (https://api.apixu.com/)
    app_id = "8b012c9e5f1f4be583004535171904";
    api_url = "https://api.apixu.com/v1/forecast.json?key=" + app_id + "&q=" + lat + "," + long + "&days=1"
    $.getJSON(api_url, function(response) {
        returnWeather(response);
    }, "jsonp")
};

function returnWeather(weather) {
    temp_f = weather.current.temp_f;
    feelslike_f = weather.current.feelslike_f;
    mintemp_f = weather.forecast.forecastday[0].day.mintemp_f;
    maxtemp_f = weather.forecast.forecastday[0].day.maxtemp_f;

    temp_c = weather.current.temp_c;
    feelslike_c = weather.current.feelslike_c;
    mintemp_c = weather.forecast.forecastday[0].day.mintemp_c;
    maxtemp_c = weather.forecast.forecastday[0].day.maxtemp_c;

    conditions = weather.current.condition.text;

    is_day = weather.current.is_day;
    wind_mph = weather.current.wind_mph;
    wind_kph = weather.current.wind_kph;
    wind_dir = weather.current.wind_dir;

    temp_icon = weather.current.condition.icon

    icon_id = Number(temp_icon.substring(temp_icon.length - 7, temp_icon.length - 4))
    console.log(icon_id);
    console.log(weather);

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
    chooseIcon();

    $("#weather-icon").addClass("wi wi-fw wi-4x wi-" + icon);
    $("#conditions").text(conditions);

    $("#weather-header h1").text(city + ", " + region);

    $("#weather-form").removeClass("hidden");

}

$("#temperature").click(function() {
    if (units == "I") {
        units = "M";
    } else {
        units = "I";
    }

    displayData();
})

function chooseIcon() {
    switch(icon_id) {
        case 113:
            if (is_day == 1) {
                icon = "day-sunny";
            } else {
                icon = "night-clear";
            }
            break;
        case 116:
            if (is_day == 1) {
                icon = "day-cloudy";
            } else {
                icon = "night-cloudy";
            }
            break;
        case 119:
            icon = "cloud";
            break;
        case 122:
            icon = "cloudy";
            break;
        case 143:
        case 185:
        case 248:
        case 260:
            icon = "fog";
            break;
        case 176:
        case 293:
        case 299:
        case 302:
        case 305:
        case 353:
        case 356:
            if (is_day == 1) {
                icon = "day-rain";
            } else {
                icon = "night-rain";
            }
            break;
        case 179:
        case 323:
        case 329:
        case 335:
        case 368:
        case 371:
        case 374:
        case 377:
            if (is_day == 1) {
                icon = "day-snow";
            } else {
                icon = "night-snow";
            }
            break;
        case 182:
        case 362:
        case 365:
            icon = "sleet";
            break;
        case 200:
        case 386:
        case 389:
        case 392:
        case 395:
            icon = "thunderstorm";
            break;
        case 227:
        case 230:
            icon = "snow-wind";
            break;
        case 263:
        case 266:
        case 296:
            icon = "sprinkle";
            break;
        case 281:
        case 284:
        case 308:
        case 311:
        case 314:
        case 359:
            icon = "rain";
            break;
        case 317:
            icon = "rain-mix";
            break;
        case 320:
            if (is_day == 1) {
                icon = "day-sleet";
            } else {
                icon = "night-sleet";
            }
            break;
        case 326:
        case 332:
        case 338:
        case 350:
            icon = "snow";
            break;
    }
}
