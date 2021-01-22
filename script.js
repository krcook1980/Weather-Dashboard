//search bar for city
var cityName; //get from search button or on click past city
var cityArray = [];
var APIKey = "04bb749b9ebcf8398aa868406de732cf";
var today = moment().format("MM/DD/YYYY");

//upon open of page, get last city search from local storage and display
cityName = localStorage.getItem("City");
currInfo();

//on click of search button get weather data and create button
function searchNow (){
    cityName = $(".searchCity").val();
    cityArray.push(cityName);
    localStorage.setItem("City", [cityName]);
    currInfo();
    renderButtons();
};

$(".searchBtn").click(searchNow);


$(".searchCity").keypress(function(e){
    if(e.which == 13) {
        searchNow();
    }
})

//get and display current weather info, must use to get lat and lon for the uv and forecast
function currInfo() {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=Imperial&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var fore = response.weather[0].main;
        var icon = $(".icon");
        var imageUrl = "";
        console.log(response);
        $(".city").text(response.name, today);
        $(".date").append(" " + today);
        $(".temp").text("Temperature: " + response.main.temp + " °F");
        $(".feels").text("Feels Like: " + response.main.feels_like + " °F");
        $(".hum").text("Humidity: " + response.main.humidity + "%");
        $(".wind").text("Wind Speed: " + response.wind.speed + " mph");
        if (fore === "Rain" || fore === "Drizzle") {
            icon.attr("src", "./assets/iconRain.png");
            imageUrl = "./assets/rain.jpg";
            $("body").css("background-image", "url(" + imageUrl + ")");
        }
        else if (fore === "Thunderstorm") {
            icon.attr("src", "./assets/iconThunder.png");
            imageUrl = "./assets/thundert.jpg";
            $("body").css("background-image", "url(" + imageUrl + ")");
        }
        else if (fore === "Clouds") {
            icon.attr("src", "./assets/iconCloud.png");
            imageUrl = "./assets/clouds.jpg";
            $("body").css("background-image", "url(" + imageUrl + ")");
        }
        else if (fore === "Snow") {
            icon.attr("src", "./assets/iconSnow.png");
            imageUrl = "./assets/snow.jpg";
            $("body").css("background-image", "url(" + imageUrl + ")");
        }
        else if (fore === "Mist") {
            icon.attr("src", "./assets/iconMist.png");
            imageUrl = "./assets/mist.jpg";
            $("body").css("background-image", "url(" + imageUrl + ")");
        }
        else if (fore === "Clear") {
            icon.attr("src", "./assets/iconClear.png");
            imageUrl = "./assets/clear.jpg";
            $("body").css("background-image", "url(" + imageUrl + ")");
        }
        else {
            icon.attr("src", "./assets/iconFog.png");
            imageUrl = "./assets/fog.jpg";
            $("body").css("background-image", "url(" + imageUrl + ")");
        }
        

        $(".fore").text(response.weather[0].description);

        //get, post and add color for uv rating
        function uvInfo() {
            var lat = response.coord.lat;
            var lon = response.coord.lon;

            var uvURL = "http://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=Imperial&appid=" + APIKey;


            $.ajax({
                url: uvURL,
                method: "GET"
            }).then(function (response2) {

                var rating = response2.current.uvi;
                //UV rating and color
                $(".uv").text("UV Rating: " + response2.current.uvi);
                if (rating <= 2) {
                    $(".uv").addClass("text-success");
                }
                else if (rating > 2 && rating < 6) {
                    $(".uv").addClass("text-warning");
                }
                else if (rating >= 6) {
                    $(".uv").addClass("text-danger");
                }

                //5 day forecast card generation
                var daily = response2.daily;
                $(".card-deck").empty();
                for (var i = 1; i < daily.length - 2; i++) {

                    var card = $("<div></div>");
                    var date = $("<h5 class='card-title'>" + moment(response2.daily[i].dt, "X").format("MM/DD/YYYY") + "</h5>");
                    var temp = $("<p class='card-text'> Temp: " + response2.daily[i].temp.day + " °F </p>");
                    var hum = $("<p class='card-text'> Humidity: " + response2.daily[i].humidity + "%</p>");
                    var main = $("<p class='card-text'>" + response2.daily[i].weather[0].main + "</p>");
                    var foreMain = response2.daily[i].weather[0].main;
                    var icon = "";

                    if (foreMain === "Rain") {
                        icon = "<img src='./assets/iconRain.png' style='width: 30px;'>";
                    }
                    else if (foreMain === "Clouds") {
                        icon = "<img src='./assets/iconCloud.png' style='width: 30px;'>";
                    }
                    else if (foreMain === "Snow") {
                        icon = "<img src='./assets/iconSnow.png' style='width: 30px;'>";
                    }
                    else if (foreMain === "Fog") {
                        icon = "<img src='./assets/iconFog.png' style='width: 30px;'>";
                    }
                    else if (foreMain === "Mist") {
                        icon = "<img src='./assets/iconMist.png' style='width: 30px;'>";
                    }
                    else {
                        icon = "<img src='./assets/iconClear.png' style='width: 30px;'>";
                    }

                    card.addClass("card");
                    card.append(date, icon, temp, hum, main);
                    $(".card-deck").append(card);

                }
            });

        }
        uvInfo();
    });

}

//add previously searched cities to buttons for reuse
function renderButtons() {
    var newCity = cityArray[cityArray.length - 1];
    var button = $("<a>");
    var buttonDiv = $("<div class='row border search'>");

    button.text(newCity);
    button.addClass("previous btn btn-block");
    button.attr("role", "button");
    button.attr("data-city", newCity);
    buttonDiv.append(button);
    $("#prevSearch").prepend(buttonDiv);
    $(".searchCity").val("");
    //previous search city buttons, recall info again
    $(".previous").on("click", function () {
        var btnCity = $(this).attr("data-city"); //should return city pushed by render button
        cityName = btnCity;
        cityArray.push(cityName);
        localStorage.setItem("City", [cityName]);
        currInfo();

    });
}


