import { getGeocoderUrl } from "./mapbox";

const GEO_OPTIONS = {
  enableHighAccuracy: true,
  maximumAge: 30000,
  timeout: 27000
};

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
