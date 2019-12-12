
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


