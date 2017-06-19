import config from "../config";
import {
  START_GEOLOCATION,
  RECEIVE_GEOLOCATION
} from "../constants/ActionTypes";

function getGeocoderUrl(coords) {
  return `https://api.mapbox.com/geocoding/v5/mapbox.places/${coords.longitude},${coords.latitude}.json?access_token=${config.mapboxAccessToken}`;
}

export function performGeolocation(dispatch) {
  dispatch({
    type: START_GEOLOCATION
  });

  navigator.geolocation.getCurrentPosition(
    success => {
      fetch(getGeocoderUrl(success.coords), { mode: "cors" })
        .then(response => response.json())
        .then(data => {
          dispatch({
            type: RECEIVE_GEOLOCATION,
            result: {
              placeName: data.features[0].place_name,
              accuracy: success.coords.accuracy,
              altitude: success.coords.altitude,
              altitudeAccuracy: success.coords.altitudeAccuracy,
              heading: success.coords.heading,
              latitude: success.coords.latitude,
              longitude: success.coords.longitude,
              speed: success.coords.speed,
              timestamp: success.timestamp
            }
          });
        });
    },
    error => {
      console.error(error);
    },
    config.geolocationOptions
  );
}
