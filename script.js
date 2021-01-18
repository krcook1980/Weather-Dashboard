//search bar for city
var cityName; //get from search button or on click past city
var cityArray = [];
var APIKey = "04bb749b9ebcf8398aa868406de732cf";
var today = moment().format("dddd, MMMM Do YYYY");

cityName = localStorage.getItem("City");
callInfo();

//on click of search button
$(".searchBtn").click(function () {
    cityName = $(".searchCity").val();
    cityArray.push(cityName);
    localStorage.setItem("City", [cityName]);

})

function callInfo() {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=Imperial&appid=" + APIKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $(".city").text(cityName + "|" + today)
        $(".temp").text("Temperature: " + response.main.temp + "    Feels Like: " + response.main.feels_like);
        $(".hum").text("Humidity: " + response.main.humidity);
        $(".wind").text("Wind Speed: " + response.wind.speed);
        //$(".uv").text("UV Rating: " + response.main.)
    })
}

function renderButtons() {
    var newCity = cityArray[cityArray.length - 1];
    var button = $("<button>");
    button.text(newCity);
    var buttonDiv = $("<div>")
    buttonDiv.append(button);
    $("#prevSearch").append(buttonDiv);
    $(".searchCity").val("");
}




//Retrieve info from weather api

    // We then created an AJAX call



//city name date and weather icon, temperature, humidity, wind speed, and uv
    //uv index color indicates whether favorable moderate or severe
//below show 5 day forecast with date icon of weather temp, humidity 

//clicking search history displays current and 5 day for that city again

//upon open, show last city searched as beginning point

//https://codepen.io/jasesmith/pen/LbJrXx