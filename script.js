$(document).ready(function() {

    // --------------------------- Global Variables ---------------------------
    var userTopCitiesArray = JSON.parse(localStorage.getItem("userCities")) || [];


    // --------------------------- Event Listeners ---------------------------
    $("#submitButton").on("click", callCityData)



    // --------------------------- Gathers first five cities on the users Array List ---------------------------
    favriteCities()


    // --------------------------- updates the users main city view ---------------------------
    function callCityData() {
        var userSearch = $("#cityInput").val()
        values = userSearch.split(', ');
        let userCity = values[0];
        let userState = values[1];

        if (userSearch !== "") {
            $.ajax({
                url: 'http://api.openweathermap.org/data/2.5/weather?q=' + userCity + '&units=imperial&APPID=e6f4fe18625540e700ef27c1af0d7303',
                method: "GET",

            }).then(function(response) {


                let cityName = response.name;
                let cityTemp = response.main.temp;
                let humidity = response.main.humidity;
                let windSpeed = response.wind.speed;

                console.log(cityName)

                let iconCode = response.weather[0].icon;
                let iconurl = "http://openweathermap.org/img/wn/" + iconCode + ".png";

                $('#currentIcon').attr('src', iconurl);

                $("#currentCityHeader").text(cityName);
                $("#currentCityTemp").text(cityTemp);
                $("#currentCityHumidity").text(humidity);
                $("#currentCityWind").text(windSpeed);

                userTopCitiesArray.unshift(cityName)
                localStorage.setItem("userCities", JSON.stringify(userTopCitiesArray))

                favriteCities()

            })
        }
    }

    function favriteCities() {
        for (let i = 0; i < 5; i++) {
            var cityNumber = "#city" + i;
            $(cityNumber).text(userTopCitiesArray[i])
        }

    }


});