$(document).ready(function(){

const searchButton =  $("#search-button")


    $("#search-button").on("click", function(){
        const apiKey = config.key
        const cityName = $("#search-value").val()
        //console.log(cityName)
        const queryURLweather = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey
        const queryURLforecast = "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=" + apiKey
   


    $.ajax({
        url: queryURLweather,
        method: "GET",
        // success: function (data) {
        //     console.log(data);
        // },
        // error: function (error) {
        //     console.log(`Error ${error}`);
        // }
    }).then(function(response) {

        // console.log(queryURLweather);
        // console.log(response);
        const temperature = response.main.temp;
        const cityDiv = $("<div>");
        cityDiv.text("Temperature: " + (temperature) + "&#8457");
        $("#today").append(cityDiv);


    }).catch(function(){
        alert ("Please enter a valid city, Thank you.")

    })

    })

})