//search bar for city
var cityName; //get from search button or on click past city
var cityArray = [];
var APIKey = "04bb749b9ebcf8398aa868406de732cf";
var today = moment().format("dddd, MMMM Do YYYY");


//upon open of page, get last city search from local storage and display
cityName = localStorage.getItem("City");
currInfo();


//on click of search button get weather data and create button
$(".searchBtn").click(function () {
    cityName = $(".searchCity").val();
    cityArray.push(cityName);
    localStorage.setItem("City", [cityName]);
    currInfo();
    renderButtons();
})

//previous search city buttons, recall info again ***NOT WORKING
$(".previous").click(function () {
    alert("I was clicked");

    var btnCity = $(this).attr("data-city"); //should return city pushed by render button
    cityName = btnCity;
    cityArray.push(cityName);
    localStorage.setItem("City", [cityName]);
    currInfo();
   
})

//get and display current weather info, must use to get lat and lon for the uv and forecast
function currInfo() {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=Imperial&appid=" + APIKey;
    
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        //console.log("currInfo " + response);
        var fore = response.weather[0].main
            var icon = $("#icon")
            $(".city").text(cityName);
            $(".date").text(today);
            $(".temp").text("Temperature: " + response.main.temp);
            $(".feels").text("Feels Like: " + response.main.feels_like);
            $(".hum").text("Humidity: " + response.main.humidity + "%");
            $(".wind").text("Wind Speed: " + response.wind.speed);
            //     if (fore === "rain"){
            //     icon.addClass("rain");
            //     }
            //      else if (fore === "clouds"){
            //     icon.addClass("clouds");
            //     }
            //     else if (fore === "snow"){
            //     icon.addClass("snow");
            //     }
            //     else{
            //     icon.addClass("clear");
            //     }
            
            // $(".fore").text(fore).append(icon);       
        //get, post and add color for uv rating and forecast
            function uvInfo() {
            var lat = response.coord.lat;
            var lon = response.coord.lon;
            
            var uvURL = "http://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=Imperial&appid=" + APIKey;
            

            $.ajax({
                url: uvURL,
                method: "GET"
            }).then(function (response2) {
                console.log(response2)
                var rating = response2.current.uvi
                //UV rating and color
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

                //5 day forecast
//generate card rather than in html so we can use a for loop here but can we get the days added in there for the date moment?

                $(".date1").text(moment().add(1,'days').format("MMMM Do YYYY"));
                $(".temp1").text("Temp: " + response2.daily[0].temp.day);
                $(".hum1").text("Hum: " + response2.daily[0].humidity + "%");
                $(".icon1").text(response2.daily[0].weather[0].main);
            })
        }
        uvInfo();
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
