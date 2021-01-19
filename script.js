//search bar for city
var cityName; //get from search button or on click past city
var cityArray = [];
var APIKey = "04bb749b9ebcf8398aa868406de732cf";
var today = moment().format("dddd, MMMM Do YYYY");

cityName = localStorage.getItem("City");
currInfo();
foreInfo();

//on click of search button
$(".searchBtn").click(function () {

    cityName = $(".searchCity").val();
    cityArray.push(cityName);
    localStorage.setItem("City", [cityName]);
    currInfo();
    renderButtons();
})

//previous search city buttons, recall info again
$(".previous").click(function(){
    var btnCity = $(this).attr("data-city");
    cityName = btnCity.val();
    cityArray.push(cityName);
    localStorage.setItem("City", [cityName]);
    currInfo();
    renderButtons();

})

//get and display current weather info
function currInfo() {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=Imperial&appid=" + APIKey;
    
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        //console.log(response);
        var fore = response.weather[0].main
            var icon = $("#icon")
            $(".city").text(cityName);
            $(".date").text(today);
            $(".temp").text("Temperature: " + response.main.temp);
            $(".feels").text("Feels Like: " + response.main.feels_like);
            $(".hum").text("Humidity: " + response.main.humidity);
            $(".wind").text("Wind Speed: " + response.wind.speed);
                if (fore === "rain"){
                icon.addClass("rain");
                }
                 else if (fore === "clouds"){
                icon.addClass("clouds");
                }
                else if (fore === "snow"){
                icon.addClass("snow");
                }
                else{
                icon.addClass("clear");
                }
            
            $(".fore").text(fore).append(icon);       
        //get, post and add color for uv rating 
            function uvInfo() {
            var lat = response.coord.lat;
            var lon = response.coord.lon;
            
            var uvURL = "http://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
            

            $.ajax({
                url: uvURL,
                method: "GET"
            }).then(function (response2) {
                console.log(response2)
                var rating = response2.current.uvi
                $(".uv").text("UV Rating: " + response2.current.uvi)
                if (rating <= 2) {
                    $(".uv").addClass("text-success");
                }
                else if (rating > 2 && rating < 6) {
                    $(".uv").addClass("text-warning");
                }
                else if (rating >= 6) {
                    $(".uv").addClass("text-danger");
                }
            })
        }
        uvInfo();
    })
}

//get and display 5 day forecast info
function foreInfo() {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=Imperial&appid=" + APIKey;
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        //console.log(response);
        var dailyArray = [response.daily];
        console.log(dailyArray);
       
    })
}

//add previously searched cities to buttons for reuse
function renderButtons() {
    var newCity = cityArray[cityArray.length - 1];
    var button = $("<button>");
    var buttonDiv = $("<div>")

    button.text(newCity);
    button.addClass("previous");
    button.attr("data-city", newCity)
    buttonDiv.append(button);
    $("#prevSearch").append(buttonDiv);
    $(".searchCity").val("");
}




//city name date and weather icon, temperature, humidity, wind speed, and uv
    //uv index color indicates whether favorable moderate or severe
//below show 5 day forecast with date icon of weather temp, humidity 

//clicking search history displays current and 5 day for that city again

//upon open, show last city searched as beginning point

