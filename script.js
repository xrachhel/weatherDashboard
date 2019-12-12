
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


function displayWeather(){
    var city = $("#searchBar").val()
    console.log(city)
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=81481b28398acfb07db612f9d04e7e45" 

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response){
      console.log(response)
      
      $("#name").html("<h3>" + response.name + " " + date + "</h3>")
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
        var uv = response[0].value
        var uvBtn = $("<button></button>").text(uv)
        uvBtn.addClass("btn btn-danger")
        $("#uv").html(uvBtn)
        // $("#uv").html("<p> UV index: " + uv + "</p>")
    })
    })
}
function displayWeathers(){
    var city = $(this).attr("data-name")
    console.log(city)
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=81481b28398acfb07db612f9d04e7e45" 

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response){
      console.log(response)
      
      $("#name").html("<h3>" + response.name + " " + date + "</h3>")
      $("#temp").html("<p> Temperature: " + response.main.temp + "°F")
      $("#humidity").html("<p> Humidity: " + response.main.humidity + "%</p>")
      $("#wind").html("<p> Wind Speed: " + response.wind.speed + " MPH</p>")

    })
}

function displayForecast(){
    var city = $("#searchBar").val()
    console.log(city)
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=81481b28398acfb07db612f9d04e7e45" 

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response){
        console.log(response)
    
  
      })
}

$("#submit").on("click", function(){
    event.preventDefault()
    displayWeather()
    displayForecast()
    var city = $("#searchBar").val()
    cities.push(city)
    createButton()
})


var cities = [];
function createButton(){
    $("#buttonsGoHere").empty()
for (var i = 0; i < cities.length; i ++){
    var newButton = $("<button></button>")
    newButton.text(cities[i])
    newButton.attr("data-name", cities[i])
    newButton.addClass("btn btn-light newCity")
    $("#buttonsGoHere").append(newButton)
}
}


$(document).on("click", ".newCity", displayWeathers)


