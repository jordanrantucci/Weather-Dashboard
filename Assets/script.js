$(document).ready(function(){

const cityArray = []; 
getLocalStorage(); 



    $("#search-button").on("click", function(){ 
        
        const apiKey = config.key
        const cityName = $("#search-value").val() // creates a variable for the user's input
        
        const queryURLweather = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey 
        const queryURLforecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=" + apiKey
       
    $.ajax({ 
        url: queryURLweather,
        method: "GET"
    }).then(function(response) {
        $.ajax({
            url:queryURLforecast,
            method: "GET"
        }).then(function(responseForecast){

        const cityName = response.name
        const cityNameDiv = $("<div>"); // generating a div for appending the city name
        const date = new Date //using the JS Date object to display the date
        const dateDisplay = (date.getMonth()+1)+"/"+date.getDate()+"/"+date.getFullYear()
        const iconDay = "https://openweathermap.org/img/wn/" + response.weather[0].icon + ".png" //creating const for adding icon image from API

        cityNameDiv.text(cityName + " (" +dateDisplay+ ")") //creates text of the city name and date display
        cityNameDiv.css("font-size", "28px").css("font-weight", "bold") //adds CSS styling to the display
        $("#today").empty();
        $("#today").append(cityNameDiv); //appends city name
        $("#today").append("<br><img src='" + iconDay + "'>"); //appends the icon image below the city name

            const lat = response.coord.lat
            const long = response.coord.lon
            const queryURLuv = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&appid=" + apiKey 

        $.ajax({
            url: queryURLuv,
            method: "GET"
        }).then(function(responseOneCall){  //ajax request for the UV index portion of the API

        const cityInput = $("#search-value").val()
        cityArray.push(cityInput) //pushes the city to the list into the city Array

            //for loop creating buttons of the list of the cities.  I still need to figure out how to make the buttons clickable so the information is displayed on click
        $(".list-group").empty()
        for (i = 0; i < cityArray.length; i++) {
            let cityButtonsDiv = $("<button>")
            cityButtonsDiv.attr("class", "cityBtns").attr("id", cityArray[i] + "btn")
            cityButtonsDiv.text(cityArray[i])
            $(".list-group").append(cityButtonsDiv)
            localStorage.setItem("City" + [i + 1], cityArray[i])
        }    

        const uvIndex = responseOneCall.current.uvi // const for the uvINdex to call current UV Index levels

        const temperature = response.main.temp;
        const temperature2 = temperature.toFixed(0); //rounding the temp off
        const tempDiv = $("<div>");
        tempDiv.text("Temperature: " + (temperature2) + "°F"); //creating individual divs to add temp, humidity and windspeed
        $("#today").append(tempDiv);
        const humidity = response.main.humidity;
        const humidityDiv = $("<div>");
        humidityDiv.text("Humidity: " + (humidity) + "%");
        $("#today").append(humidityDiv);
        const windSpeed = response.wind.speed;
        const windSpeedDiv = $("<div>");
        windSpeedDiv.text("Windspeed: " + (windSpeed) + " MPH");
        $("#today").append(windSpeedDiv);

        const uvDiv = $("<div id=uvDiv>"); //adding UV index and styling the color in the if statement to have a range of UV safety
        uvDiv.text("UV Index: " + uvIndex)
        $("#today").append(uvDiv);
        if(uvIndex>=0 && uvIndex <=4){
            $("#uvDiv").css("background-color", "aqua").css("width", "110px")
        } else if (uvIndex>4 && uvIndex <=9){
            $("#uvDiv").css("background-color", "yellow").css("width", "110px")
        } else if (uvIndex>9){
            $("#uvDiv").css("background-color", "red").css("width", "110px")
        }
            //creating consts for the 5 day forecast for the date and the image icon
            const day1 = (date.getMonth() + 1) + "/" + (date.getDate() + 1) + "/" + date.getFullYear() 
            const day2 = (date.getMonth() + 1) + "/" + (date.getDate() + 2) + "/" + date.getFullYear()
            const day3 = (date.getMonth() + 1) + "/" + (date.getDate() + 3) + "/" + date.getFullYear()
            const day4 = (date.getMonth() + 1) + "/" + (date.getDate() + 4) + "/" + date.getFullYear()
            const day5 = (date.getMonth() + 1) + "/" + (date.getDate() + 5) + "/" + date.getFullYear()
            const icon1 = "http://openweathermap.org/img/wn/" + responseForecast.list[3].weather[0].icon + ".png"
            const icon2 = "http://openweathermap.org/img/wn/" + responseForecast.list[11].weather[0].icon + ".png"
            const icon3 = "http://openweathermap.org/img/wn/" + responseForecast.list[19].weather[0].icon + ".png"
            const icon4 = "http://openweathermap.org/img/wn/" + responseForecast.list[27].weather[0].icon + ".png"
            const icon5 = "http://openweathermap.org/img/wn/" + responseForecast.list[35].weather[0].icon + ".png"   

        $("#forecast").empty(); //empty clears the forecast div so when a new city is called it doesn't overlap
        $("#forecast").append("<h4>5-day Forecast:</h4>")

        const forecastOneTemp = responseForecast.list[3].main.temp;
        const forecastOneTemp2 = forecastOneTemp.toFixed(0);
        const forecastOneHumidity = responseForecast.list[3].main.humidity //calling information from the array with an index of 3 which would be noon, I had to increase each one by 8 as the hours counted by 4 in the API so the forecast displays at noon each day
        const forecastOneDiv = $("<div>");
        forecastOneDiv.attr("class" , "col-2")
        forecastOneDiv.css("border", "solid 3px blue").css("background-color", "lightblue").css("float", "left")
        $("#forecast").append(forecastOneDiv);
        (forecastOneDiv).append(day1+"<br>" + "Temp: " + forecastOneTemp2 + "°F" +"<br>"+ "Humidity: " + forecastOneHumidity + " %<br><img src ='" + icon1+"'>");

        const forecastTwoTemp = responseForecast.list[11].main.temp;
        const forecastTwoTemp2 = forecastTwoTemp.toFixed(0);
        const forecastTwoHumidity = responseForecast.list[11].main.humidity
        const forecastTwoDiv = $("<div>");
        forecastTwoDiv.attr("class", "col-2")
        forecastTwoDiv.css("border", "solid 3px blue").css("background-color", "lightblue").css("float", "left")
        $("#forecast").append(forecastTwoDiv);
        (forecastTwoDiv).append(day2+"<br>" + "Temp: " + forecastTwoTemp2 + "°F" + "<br>" + "Humidity: " + forecastTwoHumidity + " %<br><img src ='" + icon2+"'>")

        const forecastThreeTemp = responseForecast.list[19].main.temp;
        const forecastThreeTemp2 = forecastThreeTemp.toFixed(0);
        const forecastThreeHumidity = responseForecast.list[19].main.humidity
        const forecastThreeDiv = $("<div>");
        forecastThreeDiv.attr("class", "col-2")
        forecastThreeDiv.css("border", "solid 3px blue").css("background-color", "lightblue").css("float", "left")
        $("#forecast").append(forecastThreeDiv);
            (forecastThreeDiv).append(day3+"<br>" + "Temp: " + forecastThreeTemp2 + "°F" + "<br>" + "Humidity: " + forecastThreeHumidity + " %<br><img src ='" + icon3 + "'>")

        const forecastFourTemp = responseForecast.list[27].main.temp;
        const forecastFourTemp2 = forecastFourTemp.toFixed(0);
        const forecastFourHumidity = responseForecast.list[27].main.humidity
        const forecastFourDiv = $("<div>");
        forecastFourDiv.attr("class", "col-2")
        forecastFourDiv.css("border", "solid 3px blue").css("background-color", "lightblue").css("float", "left")
        $("#forecast").append(forecastFourDiv);
            (forecastFourDiv).append(day4 + "<br>" + "Temp: " + forecastFourTemp2 + "°F" + "<br>" + "Humidity: " + forecastFourHumidity + " %<br><img src ='" + icon4 + "'>")

        const forecastFiveTemp = responseForecast.list[35].main.temp;
        const forecastFiveTemp2 = forecastFiveTemp.toFixed(0);
        const forecastFiveHumidity = responseForecast.list[35].main.humidity
        const forecastFiveDiv = $("<div>");
        forecastFiveDiv.attr("class", "col-2")
        forecastFiveDiv.css("border", "solid 3px blue").css("background-color", "lightblue").css("float", "left")
        $("#forecast").append(forecastFiveDiv);
            (forecastFiveDiv).append(day5 + "<br>" + "Temp: " + forecastFiveTemp2 + "°F" + "<br>" + "Humidity: " + forecastFiveHumidity + " %<br><img src ='" + icon5 + "'>")

        })
    })
    }).catch(function(){  //catch any errors
        alert ("Please enter a valid city, Thank you.") //alert if a non-valid city is entered

    })

    })
    function getLocalStorage() {  //calling local storage
        // cityArray = []
        for (i = 0; i < localStorage.length; i++) {
            cityArray.push(localStorage.getItem("City" + [i + 1]))
        }
        returnButtons()
        function returnButtons() { 
            for (i = 0; i < cityArray.length; i++) {
                $(".list-group").append("<button>" + cityArray[i] + "</button>")
            }
        }
    }

})