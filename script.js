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
    // $(".temp").text("Temperature (F) " + response.main.temp);
    // console.log();
    var lat = response.coord.lat;
    var lon = response.coord.lon;
    console.log(lat);
    console.log(lon);

    myMap(lat, lon);
  });
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
