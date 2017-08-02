import i18next from "i18next";
import { getParcels } from "lizard-api-client";
import {
  SHOW_SNACKBAR,
  GET_ATTRIBUTES_FROM_GEOSERVER,
  RECEIVE_ATTRIBUTES_FROM_GEOSERVER_SUCCESS,
  RECEIVE_ATTRIBUTES_FROM_GEOSERVER_ERROR,
  SELECT_PARCEL,
  DESELECT_PARCEL
} from "../constants/ActionTypes";
import { theStore } from "../store/Store";

import { getParcelAttributes } from "../tools/wfs";
import { receiveResultsSuccess } from "./SearchActions";
import { changeView, showSnackBar } from "./UiActions";

export function receiveAttributesFromGeoserverErrorAction(
  dispatch,
  parcelId,
  error
) {
  dispatch({
    type: RECEIVE_ATTRIBUTES_FROM_GEOSERVER_ERROR,
    parcelId,
    error
  });
}

export function selectParcel(dispatch, selectedParcel) {
  dispatch({ type: SELECT_PARCEL, selectedParcel });
}

export function deselectParcel(dispatch) {
  dispatch({ type: DESELECT_PARCEL });
}

function handleInvalidDataFormatError(
  dispatch,
  placeName,
  parcelId,
  parcelGeoserverId,
  invalidData
) {
  // Inform the programmer:
  console.error(`Returned geoserver data for parcel with hydracoreID=${parcelId}
    / GeoserverID=${parcelGeoserverId} is not in correct format\nData looks like:
    ${JSON.stringify(invalidData)}`);
  // Update redux state:
  receiveAttributesFromGeoserverErrorAction(
    dispatch,
    parcelId,
    "Invalid data format"
  );
  // Inform the user:
  showSnackBarParcelReceiveError(dispatch, placeName);
}

function handleGeoserverError(
  dispatch,
  placeName,
  parcelId,
  parcelGeoserverId,
  errorMsg
) {
  // Inform the programmer:
  console.error(`"Error while fetching parcel with hydracoreID="${parcelId} /
    GeoserverID=${parcelGeoserverId}: ${errorMsg}`);
  // Update redux state:
  receiveAttributesFromGeoserverErrorAction(dispatch, parcelId, errorMsg);
  // Inform the user:
  showSnackBarParcelReceiveError(dispatch, placeName);
}

function showSnackBarParcelReceiveError(dispatch, placeName) {
  const subMessage = i18next.t("No details found for");
  const options = {
    isError: true,
    message: i18next.t("There was an error while fetching the parcel details."),
    subMessage: `${subMessage} ${placeName}`
  };
  showSnackBar(dispatch, options);
}

function getNextOrPreviousParcel(dispatch, next = true) {
  const state = theStore.getState();
  const oldJsId = state.search.results.indexOf(state.ui.selectedParcel);
  let newJsId;
  if (next) {
    newJsId = oldJsId === state.search.results.length - 1 ? 0 : oldJsId + 1;
  } else {
    newJsId = oldJsId === 0 ? state.search.results.length - 1 : oldJsId - 1;
  }
  const newParcelId = state.search.results[newJsId];
  getAttributesFromGeoserver(dispatch, newParcelId);
  selectParcel(dispatch, newParcelId);
}

export function selectPreviousParcel(dispatch) {
  getNextOrPreviousParcel(dispatch, false);
}

export function selectNextParcel(dispatch) {
  getNextOrPreviousParcel(dispatch, true);
}

export function isParcelAlreadyPresent(parcelId) {
  const state = theStore.getState();
  return (
    parcelId &&
    state.parcels[parcelId] &&
    state.parcels[parcelId].hasGeoserverData
  );
}

export function getAttributesFromGeoserver(dispatch, parcelId) {
  const state = theStore.getState();
  const currentData = state.parcels[parcelId];
  if (
    !currentData ||
    !currentData.parcelGeoserverId ||
    currentData.isFetchingGeoserver
  ) {
    // We can't find the Geoserver featureID/already busy
    return;
  }

  if (isParcelAlreadyPresent(parcelId)) {
    // No need to retrieve data that is already present in client.
    selectParcel(dispatch, parcelId);
    if (state.ui.currentView !== "DetailView") {
      changeView(dispatch, "DetailView");
    }
    return;
  }

  const parcelGeoserverId = currentData.parcelGeoserverId;

  dispatch({ type: GET_ATTRIBUTES_FROM_GEOSERVER, parcelId });

  getParcelAttributes(parcelGeoserverId).then(
    data => {
      if (
        data &&
        data.features &&
        data.features.length &&
        data.features[0].properties
      ) {
        dispatch({
          type: RECEIVE_ATTRIBUTES_FROM_GEOSERVER_SUCCESS,
          parcelId: parcelId,
          data: data.features[0].properties
        });
        selectParcel(dispatch, parcelId);
        if (state.ui.currentView !== "DetailView") {
          changeView(dispatch, "DetailView");
        }
      } else {
        handleInvalidDataFormatError(
          dispatch,
          currentData.name,
          parcelId,
          parcelGeoserverId,
          data
        );
      }
    },
    error => {
      handleGeoserverError(
        dispatch,
        currentData.name,
        parcelId,
        parcelGeoserverId,
        error
      );
    }
  );
}

export function getParcelByLatLng(dispatch, lat, lng) {
  showSnackBar(dispatch, {
    autoHideDuration: 2000,
    message: i18next.t("Looking for a parcel...")
  });
  getParcels({
    dist: 5, // 5 meter search radius
    point: `${lng},${lat}`
  }).then(results => {
    if (results.length > 0) {
      receiveResultsSuccess(dispatch, results);
      getAttributesFromGeoserver(dispatch, results[0].id);
    }
  });
}
