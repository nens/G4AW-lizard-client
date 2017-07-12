import i18next from "i18next";
import config from "../config";
import { DEFAULT_BBOX } from "../constants/defaults";
import {
  SET_GEOLOCATION_SUPPORT,
  START_GEOLOCATION,
  RECEIVE_GEOLOCATION_SUCCESS,
  RECEIVE_GEOLOCATION_ERROR,
  CLEAR_GEOLOCATION
} from "../constants/ActionTypes";

import { showSnackBar } from "./UiActions";
import { updateMapBbox } from "./MapActions";

function getGeocoderUrl(coords) {
  return `https://api.mapbox.com/geocoding/v5/mapbox.places/${coords.longitude},${coords.latitude}.json?access_token=${config.mapboxAccessToken}`;
}

function showSnackBarGeolocationSuccess(dispatch) {
  const options = {
    message: i18next.t("Successfully retrieved your location"),
    subMessage: i18next.t(
      "Your search-results will be based on your current location"
    ),
    autoHideDuration: 3000
  };
  showSnackBar(dispatch, options);
}

function showSnackBarGeolocationError(dispatch) {
  const options = {
    message: i18next.t("There was an error while retrieving your location"),
    subMessage: i18next.t(
      "Your search-results can not be based on your location"
    ),
    autoHideDuration: 3000,
    isError: true
  };
  showSnackBar(dispatch, options);
}

function showSnackBarGeolocationTurnedOff(dispatch) {
  const options = {
    message: i18next.t("Turned off geolocation awareness"),
    subMessage: i18next.t(
      "Your search-results will no longer be based on your location"
    ),
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
  updateMapBbox(dispatch, DEFAULT_BBOX);
  showSnackBarGeolocationTurnedOff(dispatch);
}

const GRAD_OFFSET = 0.01;

export function performGeolocation(dispatch) {
  dispatch({ type: START_GEOLOCATION });
  setTimeout(() => {
    navigator.geolocation.getCurrentPosition(
      success => {
        fetch(getGeocoderUrl(success.coords), { mode: "cors" })
          .then(response => response.json())
          .then(data => {
            if (data.features.length > 0) {
              showSnackBarGeolocationSuccess(dispatch);
              const placeName = data.features[0].place_name;
              const lat = data.query[0];
              const lng = data.query[1];
              const result = { lat, lng, placeName };
              dispatch({ type: RECEIVE_GEOLOCATION_SUCCESS, result });
              const newBbox = [
                lng - GRAD_OFFSET,
                lat - GRAD_OFFSET,
                lng + GRAD_OFFSET,
                lat + GRAD_OFFSET
              ];
              updateMapBbox(dispatch, newBbox);
            } else {
              showSnackBarGeolocationError(dispatch);
              dispatch({
                type: RECEIVE_GEOLOCATION_ERROR,
                error: "Unable to perform reverse geocode"
              });
            }
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
