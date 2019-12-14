# Weather Dashboard

For this homework, we had to create a weather dashboard that allows users to search for a city and get its current weather and a 5 day forecast. Searched cities appear on the side, so users can click back onto those cities if they want. The 5 day forecast includes the date, an icon image of the weather, the temperature, and the humidity. I utilized the openWeather API to get weather information and append it to the page dynamically
## Screenshot 
![site](screenshot.png)

## Built With

* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML): used for structuring and creating elements on the DOM
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS): used to style html elements on the page
* [Javascript](https://developer.mozilla.org/en-US/docs/Web/JavaScript): used to create responsive, interactive elements on the page
* [Jquery] (https://jquery.com/)
* [Moment.js] (https://momentjs.com/)

## Deployed Link

* [See Live Site](https://xrachhel.github.io/weatherDashboard/)


## Authors

Rachel Yeung 

- [Link to Portfolio Site](https://xrachhel.github.io/interactivePortfolio/)
- [Link to Github](https://github.com/xrachhel/weatherDashboard)
- [Link to LinkedIn](https://www.linkedin.com/in/rachel-yeung-814986159/)

## Code snippet 
```html
function displayWeather(city){
    
    console.log(city)
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=81481b28398acfb07db612f9d04e7e45" 

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response){
      console.log(response)
      
      $("#name").html("<h2>" + response.name + " " + date + "</h2>")
      $("#temp").html("<p> Temperature: " + response.main.temp + "°F")
      $("#humidity").html("<p> Humidity: " + response.main.humidity + "%</p>")
      $("#wind").html("<p> Wind Speed: " + response.wind.speed + " MPH</p>")
      console.log(response.weather[0].main)

      var main = response.weather[0].main
      if(main === "Rain"){
          var icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/09d.png")
          $("#img").html(icon)
      }
      else if (main === "Clear"){
        var icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/01d.png")
        $("#img").html(icon)
      }
      else if (main === "Mist"){
        var icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/50d.png")
        $("#img").html(icon)
      }
      else if (main === "Clouds"){
        var icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/03d.png")
        $("#img").html(icon)
      }
      else if (main === "Snow"){
        var icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/13d.png")
        $("#img").html(icon)
      }
      else if (main === "Drizzle"){
        var icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/10d.png")
        $("#img").html(icon)
      }

      var lat = response.coord.lat
      var lon = response.coord.lon
      console.log(lat)
      console.log(lon)
      var uvURL = "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=81481b28398acfb07db612f9d04e7e45&lat=" + lat + "&lon=" + lon 

    $.ajax({
        url: uvURL,
        method: "GET"
    }).then(function(response){
        console.log(response)
        console.log(response[0].value)
        if (response[0].value >= "8"){
            var uv = "UV Index:  " + response[0].value
            var uvBtn = $("<button></button>").text(uv)
            uvBtn.addClass("btn btn-danger")
            $("#uv").html(uvBtn)
        }
        else if (response[0].value >= "3" && response[0].value <= "7" ){
            var uv = "UV Index:  " + response[0].value
            var uvBtn = $("<button></button>").text(uv)
            uvBtn.addClass("btn btn-warning")
            $("#uv").html(uvBtn)
        }
        else if (response[0].value < "3"){
            var uv = "UV Index:  " + response[0].value
            var uvBtn = $("<button></button>").text(uv)
            uvBtn.addClass("btn btn-success")
            $("#uv").html(uvBtn)
        }
        
        
    })
    })
    
}
```
This was the function I used to display the daily weather based on the city searched by the user. I first made the AJAX call to grab the information from the openweather API, then displayed the information needed in dynamically made heading and paragraph tags. I used if-else statements to set the image icons, and set the source attribute of a dynamically created image tag as an icon from the openweather website. I nested another AJAX call within my original AJAX call to get the UV index, and grabbed the longitude and latitude from the first AJAX call and set those as variables for my UV AJAX call. I created if else statements to set the color of the UV info button based on the number(red for high, orange for middle, and green for low values)