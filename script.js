
var date = moment().format("l")

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
    newButton.addClass("btn btn-light")
    newButton.attr("id", "newCity")
    $("#buttonsGoHere").append(newButton)
}
}



