$(document).ready(function() {
    // --------------------------- Global Variables ---------------------------
    var userTopCitiesArray = JSON.parse(localStorage.getItem("userCities")) || [];
    var userSearch = $("#cityInput ").val();
    var cityLat;
    var cityLon;

    // --------------------------- Event Listeners ---------------------------
    $("#submitButton").on("click", callCityData);

    // --------------------------- Gathers first five cities on the users Array List ---------------------------
    favriteCities();

    // --------------------------- Populates main screen with users most recent searched city ---------------------------
    callCityData();

    // --------------------------- updates the users main city view ---------------------------
    function callCityData() {
        if (userSearch !== "") {
            userSearch = $("#cityInput").val();
        } else if (userTopCitiesArray > 0) {
            userSearch = userTopCitiesArray[0];
        } else {
            userSearch = "greensburg";
        }

        values = userSearch.split(", ");
        let userCity = values[0];
        let userState = values[1];

        if (userSearch !== "") {
            $.ajax({
                url: "https://api.openweathermap.org/data/2.5/weather?q=" +
                    userCity +
                    "," +
                    userState +
                    "us&units=imperial&APPID=e6f4fe18625540e700ef27c1af0d7303",
                method: "GET",
            }).then(function(response) {
                let cityName = response.name;
                let cityTemp = response.main.temp;
                let humidity = response.main.humidity;
                let windSpeed = response.wind.speed;
                console.log(response);

                let iconCode = response.weather[0].icon;
                let iconurl = "https://openweathermap.org/img/wn/" + iconCode + ".png";

                $("#currentIcon").attr("src", iconurl);

                $("#currentCityHeader").text(cityName);
                $("#currentCityTemp").text(cityTemp);
                $("#currentCityHumidity").text(humidity);
                $("#currentCityWind").text(windSpeed);

                userTopCitiesArray.unshift(cityName);
                localStorage.setItem("userCities", JSON.stringify(userTopCitiesArray));

                favriteCities();
                cityLat = response.coord.lat;
                cityLon = response.coord.lon;
                $.ajax({
                    url: "https://api.openweathermap.org/data/2.5/onecall?lat=" +
                        cityLat +
                        "&lon=" +
                        cityLon +
                        "&units=imperial&APPID=e6f4fe18625540e700ef27c1af0d7303",
                    method: "GET",
                }).then(function(response) {
                    console.log(response);
                    for (let f = 1; f < 6; f++) {
                        let todayUVI = response.daily[0].uvi;
                        $("#currentCityUV").text(todayUVI);

                        if (todayUVI > 7) {
                            $("#currentCityUV").css("background-color", "red");
                        } else if (todayUVI < 4) {
                            $("#currentCityUV").css("background-color", "green");
                        } else {
                            $("#currentCityUV").css("background-color", "blue");
                        }

                        let currentDateNumber = response.daily[0].dt;
                        var CurrentTimestap = moment
                            .unix(currentDateNumber)
                            .format("MM/DD/YYYY");
                        $(".currentCityDate").text(CurrentTimestap);

                        let forecastDateId = ".forecastDate" + f;
                        let forecastIconId = ".forecastIcon" + f;
                        let forecastTempId = ".forecastTemp" + f;
                        let forecastHumidityId = ".forecastHumidity" + f;
                        // ---------------------------forecasted date ---------------------------
                        let forecastDate = response.daily[f].dt;
                        var timeStap = moment.unix(forecastDate).format("MM/DD/YYYY");
                        $(forecastDateId).text(timeStap);
                        // ---------------------------forecasted icon ---------------------------
                        let forecastIcon = response.daily[f].weather[0].icon;
                        let forecastIconURL =
                            "https://openweathermap.org/img/wn/" + forecastIcon + ".png ";
                        $(forecastIconId).attr("src", forecastIconURL);
                        // ---------------------------forecasted temp ---------------------------
                        let forecastTemp = response.daily[f].temp.day;
                        $(forecastTempId).text(forecastTemp);
                        // ---------------------------forecasted humidity ---------------------------
                        let forecastHumidity = response.daily[f].humidity;
                        $(forecastHumidityId).text(forecastHumidity);
                    }
                });
            });
        }
    }

    function favriteCities() {
        for (let i = 0; i < 5; i++) {
            var cityNumber = "#city" + i;
            $(cityNumber).text(userTopCitiesArray[i]);
        }
    }

    $(".cityName").on("click", cityHistoryButton);

    function cityHistoryButton() {
        $("#cityInput").val($(this).text());
        callCityData();
    }
});