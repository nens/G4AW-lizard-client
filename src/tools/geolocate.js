const GEO_OPTIONS = {
  enableHighAccuracy: true,
  maximumAge: 30000,
  timeout: 27000
};

function getGeocoderUrl(coords) {
  return (
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    coords.longitude +
    "," +
    coords.latitude +
    ".json?access_token=pk.eyJ1IjoibmVsZW5zY2h1dXJtYW5zIiwiYSI6ImhkXzhTdXc" +
    "ifQ.3k2-KAxQdyl5bILh_FioCw"
  );
}

export function performGeolocation(callback) {
  navigator.geolocation.getCurrentPosition(
    success => {
      fetch(getGeocoderUrl(success.coords), { mode: "cors" })
        .then(response => response.json())
        .then(data => {
          callback({
            placeName: data.features[0].place_name,
            accuracy: success.coords.accuracy,
            altitude: success.coords.altitude,
            altitudeAccuracy: success.coords.altitudeAccuracy,
            heading: success.coords.heading,
            latitude: success.coords.latitude,
            longitude: success.coords.longitude,
            speed: success.coords.speed,
            timestamp: success.timestamp
          });
        });
    },
    error => {
      console.error(error);
      callback({ errorMessage: error.message });
    },
    GEO_OPTIONS
  );
}
