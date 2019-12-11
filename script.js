

// function displayWeather(){


// var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city +  "&units=imperial&appid=81481b28398acfb07db612f9d04e7e45"
// var city = "London"
// $.ajax({
//     url: queryURL,
//     method: "GET"
// }).then(function(response){
//     console.log(response)
// })
// }
// displayWeather()
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Bujumbura,Burundi&units=imperial&appid=81481b28398acfb07db612f9d04e7e45" 

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response){
  console.log(response)
  
  
})