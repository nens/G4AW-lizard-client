import config from "../config";
import {
  SET_GEOLOCATION_AVAILABILITY,
  START_GEOLOCATION,
  RECEIVE_GEOLOCATION_SUCCESS,
  RECEIVE_GEOLOCATION_ERROR,
  CLEAR_GEOLOCATION
} from "../constants/ActionTypes";

import { showSnackBar } from "./UiActions";

function getGeocoderUrl(coords) {
  return `https://api.mapbox.com/geocoding/v5/mapbox.places/${coords.longitude},${coords.latitude}.json?access_token=${config.mapboxAccessToken}`;
}

function showSnackbarGeolocationSuccess(dispatch) {
  const options = {
    message: "Successfully retrieved your location",
    subMessage: "Your search-results will be based on your current location",
    autoHideDuration: 3000
  };
  showSnackBar(dispatch, options);
}

function showSnackbarGeolocationError(dispatch) {
  const options = {
    message: "There was an error while retrieving your location",
    subMessage: "Your search-results can not be based on your location",
    autoHideDuration: 3000,
    negative: true
  };
  showSnackBar(dispatch, options);
}

function showSnackbarGeolocationTurnedOff(dispatch) {
  const options = {
    message: "Turned off geolocation awareness",
    subMessage: "Your search-results will no longer be based on your location",
    autoHideDuration: 3000
  };
  showSnackBar(dispatch, options);
}

export function setGeolocationAvailability(dispatch) {
  dispatch({
    type: SET_GEOLOCATION_AVAILABILITY,
    value: !!navigator.geolocation
  });
}

export function clearGeolocation(dispatch) {
  dispatch({ type: CLEAR_GEOLOCATION });
  showSnackbarGeolocationTurnedOff(dispatch);
}

export function performGeolocation(dispatch) {
  dispatch({ type: START_GEOLOCATION });
  setTimeout(() => {
    navigator.geolocation.getCurrentPosition(
      success => {
        fetch(getGeocoderUrl(success.coords), { mode: "cors" })
          .then(response => response.json())
          .then(data => {
            showSnackbarGeolocationSuccess(dispatch);
            const placeName = data.features[0].place_name;
            const result = { ...success.coords, placeName };
            dispatch({ type: RECEIVE_GEOLOCATION_SUCCESS, result });
          });
      },
      error => {
        console.error(error);
        showSnackbarGeolocationError(dispatch);
        dispatch({ type: RECEIVE_GEOLOCATION_ERROR, error });
      },
      config.geolocationOptions
    );
  }, 500);
}
