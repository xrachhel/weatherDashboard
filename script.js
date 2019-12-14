
var date = moment().format("l")
var day1 = moment(new Date()).add(1, "days").format("l")
var day2 = moment(new Date()).add(2, "days").format("l")
var day3 = moment(new Date()).add(3, "days").format("l")
var day4 = moment(new Date()).add(4, "days").format("l")
var day5 = moment(new Date()).add(5, "days").format("l")

$(".ch1").append("<h5>" + day1 + "</h5>")
$(".ch2").append("<h5>" + day2 + "</h5>")
$(".ch3").append("<h5>" + day3 + "</h5>")
$(".ch4").append("<h5>" + day4 + "</h5>")
$(".ch5").append("<h5>" + day5 + "</h5>")


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
      
      var uvURL = "http://api.openweathermap.org/data/2.5/uvi/forecast?appid=81481b28398acfb07db612f9d04e7e45&lat=" + lat + "&lon=" + lon 

    $.ajax({
        url: uvURL,
        method: "GET"
    }).then(function(response){
        console.log(response)
        
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


function displayForecast(city){
    
    
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+ city +"&units=imperial&appid=81481b28398acfb07db612f9d04e7e45"
    

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response){
        console.log(response)
        results = response.list
        $(".row").empty()

        
        for (var i = 0; i < results.length; i+=8){
            var card = $("<div class='card text-white bg-info mb-3' style='width: 9.5rem; height: 10rem'>")
            var date = results[i].dt_txt
            var res = date.substr(0,10)
            var temp = results[i].main.temp
            var humidity = results[i].main.humidity
            
            
            var dates = $("<h5>").text(res)
            var temps = $("<p>").text("Temp: " + temp + "°F")
            var humiditys = $("<p>").text("Humidity: " + humidity + "%")
            
            var main = results[i].weather[0].main
            
            if (main === "Rain") {
               var icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/09d.png")
               icon.attr("style", "height: 30px; width: 30px;")
                
            }
            else if (main === "Clear") {
                var icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/01d.png")
                icon.attr("style", "height: 30px; width: 30px;")
            }
            else if (main === "Mist") {
                var icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/50d.png")
                icon.attr("style", "height: 30px; width: 30px;")
            }
            else if (main === "Clouds") {
                var icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/03d.png")
                icon.attr("style", "height: 30px; width: 30px;")
            }
            else if (main === "Snow") {
                var icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/13d.png")
                icon.attr("style", "height: 30px; width: 30px;")
            }
            else if (main === "Drizzle"){
                var icon = $("<img>").attr("src", "http://openweathermap.org/img/wn/10d.png")
                icon.attr("style", "height: 30px; width: 30px;")
              }
             
            
            
            card.append(dates,icon, temps, humiditys)

            
            
            $(".row").append(card)
        
        }
        
  
      })
}



$("#submit").on("click", function(){
    event.preventDefault()
    var city = $("#searchBar").val()
    displayWeather(city)
    displayForecast(city)
    
    cities.push(city)
    
    localStorage.setItem("city", JSON.stringify(cities))
    createButton();
})

createButton()
var cities = [];
function createButton(){
    $("#buttonsGoHere").empty()
    var city = JSON.parse(localStorage.getItem("city"))
    

    if(city === null){
        return false;
    }
    else{
        for (var i = 0; i < city.length; i ++){
            var newButton = $("<button></button>")
            newButton.text(city[i])
            newButton.attr("data-name", city[i])
            newButton.addClass("btn btn-light newCity")
            $("#buttonsGoHere").append(newButton)
            
        }
    }

}


$(document).on("click", ".newCity", function(){
var thisCity = $(this).attr("data-name")
displayWeather(thisCity)
})
$(document).on("click", ".newCity", function(){
    var thisCity = $(this).attr("data-name")
    displayForecast(thisCity)
})

getStoredCities()
function getStoredCities(){
    
    var cities = localStorage.getItem("city")
    var newButton = $("<button></button>")
    newButton.text(cities)
    newButton.attr("data-name", cities)
    newButton.addClass("btn btn-light newCity")
   

}

getWeather()
getForecast()
function getWeather(){
    var city = JSON.parse(localStorage.getItem("city"))
    displayWeather(city[0])
}
function getForecast(){
    var city = JSON.parse(localStorage.getItem("city"))
    displayForecast(city[0])
}