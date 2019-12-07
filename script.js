$("#findCity").on("click", function(event) {
  event.preventDefault();
  searchForCityByName();
});
var service;
var map;
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
    var lat = response.coord.lat;
    var lon = response.coord.lon;
    console.log("lat", lat);
    console.log("long", lon);
    map = myMap(lat, lon);
    var request = {
      query: city,
      fields: ["name", "geometry"]
    };
    service = new google.maps.places.PlacesService(map);
    service.findPlaceFromQuery(request, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }
        map.setCenter(results[0].geometry.location);
      }
    });
  });
}
function createMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
  google.maps.event.addListener(marker, "click", function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}
function myMap(lat, lon) {
  var mapProp = {
    center: new google.maps.LatLng(lat, lon),
    zoom: 10
  };
  return new google.maps.Map(document.getElementById("map"), mapProp);
}
$("input").keypress(event => {
  if (event.which == 13) {
    searchForCityByName();
  }
});
