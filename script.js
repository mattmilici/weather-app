$(document).ready(function() {


    $("#submitButton").on("click", callCityData)



    function callCityData() {
        var userSearch = $("#cityInput").val()
        values = userSearch.split(', ');
        let userCity = values[0];
        let userState = values[1];


        console.log(userCity);
        console.log(userState);






        console.log(userSearch)

        if (userSearch !== "") {
            $.ajax({
                url: 'http://api.openweathermap.org/data/2.5/weather?q=' + userCity + '&units=imperial&APPID=e6f4fe18625540e700ef27c1af0d7303',
                method: "GET",

            }).then(function(response) {
                console.log(response)

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


            })
        }
    }



    // var city = "SanDiego"
    // var state = "Ca"
    // var country = "US"
    // var queryURL = 'http://api.openweathermap.org/data/2.5/weather?q=SanDiego,Ca,US&appid=a95c3e94300036f201b6d648704ea5a8';

    // console.log(queryURL)

    // $.ajax({
    //     url: queryURL,
    //     method: "GET",
    // }).then(function(response) {
    //     for (var i = 0; i < 10; i++) {
    //         titles = response.response.docs[i].headline.main;
    //         console.log(titles);

    //         var newElement = $("<p>");
    //         newElement.text(titles);
    //         $("#resultsField").prepend(newElement);
    //     }
    // });

});