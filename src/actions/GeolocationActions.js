import config from "../config";
import {
  SET_GEOLOCATION_SUPPORT,
  START_GEOLOCATION,
  RECEIVE_GEOLOCATION_SUCCESS,
  RECEIVE_GEOLOCATION_ERROR,
  CLEAR_GEOLOCATION
} from "../constants/ActionTypes";

// TODO: translate english strings

import { showSnackBar } from "./UiActions";

function getGeocoderUrl(coords) {
  return `https://api.mapbox.com/geocoding/v5/mapbox.places/${coords.longitude},${coords.latitude}.json?access_token=${config.mapboxAccessToken}`;
}

function showSnackBarGeolocationSuccess(dispatch) {
  const options = {
    message: "Successfully retrieved your location",
    subMessage: "Your search-results will be based on your current location",
    autoHideDuration: 3000
  };
  showSnackBar(dispatch, options);
}

function showSnackBarGeolocationError(dispatch) {
  const options = {
    message: "There was an error while retrieving your location",
    subMessage: "Your search-results can not be based on your location",
    autoHideDuration: 3000,
    isError: true
  };
  showSnackBar(dispatch, options);
}

function showSnackBarGeolocationTurnedOff(dispatch) {
  const options = {
    message: "Turned off geolocation awareness",
    subMessage: "Your search-results will no longer be based on your location",
    autoHideDuration: 3000
  };
  showSnackBar(dispatch, options);
}

export function setGeolocationSupport(dispatch) {
  dispatch({
    type: SET_GEOLOCATION_SUPPORT,
    value: !!navigator.geolocation
  });
}

export function clearGeolocation(dispatch) {
  dispatch({ type: CLEAR_GEOLOCATION });
  showSnackBarGeolocationTurnedOff(dispatch);
}

export function performGeolocation(dispatch) {
  dispatch({ type: START_GEOLOCATION });
  setTimeout(() => {
    navigator.geolocation.getCurrentPosition(
      success => {
        fetch(getGeocoderUrl(success.coords), { mode: "cors" })
          .then(response => response.json())
          .then(data => {
            showSnackBarGeolocationSuccess(dispatch);
            const placeName = data.features[0].place_name;
            const result = { ...success.coords, placeName };
            dispatch({ type: RECEIVE_GEOLOCATION_SUCCESS, result });
          });
      },
      error => {
        console.error(error);
        showSnackBarGeolocationError(dispatch);
        dispatch({ type: RECEIVE_GEOLOCATION_ERROR, error });
      },
      config.geolocationOptions
    );
  }, 1000);
}
