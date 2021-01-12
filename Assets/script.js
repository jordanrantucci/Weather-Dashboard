$(document).ready(function(){

const cityArray = [];
const searchButton =  $("#search-button");


    $("#search-button").on("click", function(){


        const apiKey = config.key
        const cityName = $("#search-value").val()
        //console.log(cityName)
        const queryURLweather = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey
        const queryURLforecast = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=" + apiKey
   


    $.ajax({
        url: queryURLweather,
        method: "GET",
    }).then(function(response) {
        $.ajax({
            url:queryURLforecast,
            method: "GET"
        }).then(function(responseForecast){

        // console.log(queryURLweather);
        // console.log(response);
        const cityName = response.name
        const cityNameDiv = $("<div>");
        cityNameDiv.text(cityName)
        cityNameDiv.css("font-size", "28px").css("font-weight", "bold")
        $("#today").append(cityNameDiv);

        const temperature = response.main.temp;
        const temperature2 = temperature.toFixed(0);
        const tempDiv = $("<div>");
        tempDiv.text("Temperature: " + (temperature2) + "°F");
        $("#today").append(tempDiv);
        const humidity = response.main.humidity;
        const humidityDiv = $("<div>");
        humidityDiv.text("Humidity: " + (humidity) + "%");
        $("#today").append(humidityDiv);
        const windSpeed = response.wind.speed;
        const windSpeedDiv = $("<div>");
        windSpeedDiv.text("Windspeed: " + (windSpeed) + " MPH");
        $("#today").append(windSpeedDiv);

        const forecastOneTemp = responseForecast.list[3].main.temp;
        const forecastOneTemp2 = forecastOneTemp.toFixed(0);
        const forecastOneHumidity = responseForecast.list[3].main.humidity
        const forecastOneDiv = $("<div>");
        forecastOneDiv.attr("class" , "col-2")
        forecastOneDiv.css("border" , "solid 2px blue").css("float", "left")
        $("#forecast").append(forecastOneDiv);
        (forecastOneDiv).append("Temp: " + forecastOneTemp2 + "°F" +"<br>"+ "Humidity: " + forecastOneHumidity + " %");

        const forecastTwoTemp = responseForecast.list[11].main.temp;
        const forecastTwoTemp2 = forecastTwoTemp.toFixed(0);
        const forecastTwoHumidity = responseForecast.list[11].main.humidity
        const forecastTwoDiv = $("<div>");
        forecastTwoDiv.attr("class", "col-2")
        forecastTwoDiv.css("border", "solid 2px blue").css("float", "left")
        $("#forecast").append(forecastTwoDiv);
        (forecastTwoDiv).append("Temp: " + forecastTwoTemp2 + "°F" + "<br>" + "Humidity: " + forecastTwoHumidity + " %")

        const forecastThreeTemp = responseForecast.list[19].main.temp;
        const forecastThreeTemp2 = forecastThreeTemp.toFixed(0);
        const forecastThreeHumidity = responseForecast.list[19].main.humidity
        const forecastThreeDiv = $("<div>");
        forecastThreeDiv.attr("class", "col-2")
        forecastThreeDiv.css("border", "solid 2px blue").css("float", "left")
        $("#forecast").append(forecastThreeDiv);
        (forecastThreeDiv).append("Temp: " + forecastThreeTemp2 + "°F" + "<br>" + "Humidity: " + forecastThreeHumidity + " %")

        const forecastFourTemp = responseForecast.list[27].main.temp;
        const forecastFourTemp2 = forecastFourTemp.toFixed(0);
        const forecastFourHumidity = responseForecast.list[27].main.humidity
        const forecastFourDiv = $("<div>");
        forecastFourDiv.attr("class", "col-2")
        forecastFourDiv.css("border", "solid 2px blue").css("float", "left")
        $("#forecast").append(forecastFourDiv);
        (forecastFourDiv).append("Temp: " + forecastFourTemp2 + "°F" + "<br>" + "Humidity: " + forecastFourHumidity + " %")

        const forecastFiveTemp = responseForecast.list[35].main.temp;
        const forecastFiveTemp2 = forecastFiveTemp.toFixed(0);
        const forecastFiveHumidity = responseForecast.list[35].main.humidity
        const forecastFiveDiv = $("<div>");
        forecastFiveDiv.attr("class", "col-2")
        forecastFiveDiv.css("border", "solid 2px blue").css("float", "left")
        $("#forecast").append(forecastFiveDiv);
        (forecastFiveDiv).append("Temp: " + forecastFiveTemp2 + "°F" + "<br>" + "Humidity: " + forecastFiveHumidity + " %")









    })
    }).catch(function(){
        alert ("Please enter a valid city, Thank you.")

    })

    })

})