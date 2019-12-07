$("#findCity").on("click", function(event) {
  event.preventDefault();
  searchForCityByName();
});

function searchForCityByName() {
  var city = $("#autocomplete-input").val();

  var APIKey = "089100f1dce99fc69ca132b28b1e31ea";
  var queryURLWeather =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&appid=" +
    APIKey;

  $.ajax({
    url: queryURLWeather,
    method: "GET"
  }).then(function(response) {
    $(".temp").text("Temperature (F) " + response.main.temp);
    console.log();
    var lat = response.coord.lat;
    var lon = response.coord.lon;
    console.log(lat);
    console.log(lon);

    myMap(lat, lon);
  });

  let googleAPIKey = "AIzaSyAwPtnt5c8q3p2D4R6axYe1PKhCTVkawcI";
  let placeQuery = "https://maps.googleapis.com/maps/api/place/textsearch/json?query=" + city + "+city+point+of+interest&language=en&key=" + googleAPIKey;


  $.ajax({
    url: placeQuery,
    method: "GET"
  }).then(function(response) {
    console.log('google api response', response);
  })
};



function myMap(lat, lon) {
  var mapProp = {
    center: new google.maps.LatLng(lat, lon),
    zoom: 10
  };
  return new google.maps.Map(document.getElementById("map"), mapProp);
}

$('input').keypress(event => {
  if (event.which == 13) {
    searchForCityByName();
  }
})
