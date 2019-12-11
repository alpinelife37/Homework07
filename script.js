var service;
var map;
var instance;

$("#findCity").on("click", function(event) {
  event.preventDefault();
  searchForCityByName();
});

$("input").keypress(event => {
  if (event.which == 13) {
    searchForCityByName();
  }
});

document.addEventListener('DOMContentLoaded', function() {
  var options = {
    dismissible: true,
    inDuration: 500,
    outDuration: 500
  }
  var elem = document.querySelector('.modal');
  instance = M.Modal.init(elem, options);
});

function convertToTitleCase(str) {
  let words = str.toLowerCase().split(" ");
  words.forEach(function(item, index) {
    words[index] = item[0].toUpperCase() + item.slice(1);
  })
  return words.join(" ");
}

function searchForCityByName() {
  var city = $("#search-input").val();
  var APIKey = "089100f1dce99fc69ca132b28b1e31ea";
  var queryURLWeather =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=imperial&appid=" +
    APIKey;
  $.ajax({
    url: queryURLWeather,
    method: "GET",
    error: (function(err) {
      return instance.open();
    })
  }).then(function(response) {
    $(".temp").text(
      "Current Temperature " +
        response.main.temp +
        String.fromCharCode(176) +
        "F in " +
        convertToTitleCase(city)
    );
    var lat = response.coord.lat;
    var lon = response.coord.lon;
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
      var latLon = { lat: lat, lng: lon };
      service.nearbySearch(
        { location: latLon, radius: 5000, type: ["tourist_attraction"] },
        function(results, status) {
          if (status !== "OK") return;
          $(".name").text(results[0].name);
          $(".address").text(results[0].vicinity);
          $(".rating").text("Rating: " + results[0].rating);
          $(".name1").text(results[1].name);
          $(".address1").text(results[1].vicinity);
          $(".rating1").text("Rating: " + results[1].rating);
          $(".name2").text(results[2].name);
          $(".address2").text(results[2].vicinity);
          $(".rating2").text("Rating: " + results[2].rating);
        }
      );
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
