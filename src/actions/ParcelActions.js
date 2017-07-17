import i18next from "i18next";
import {
  SHOW_SNACKBAR,
  GET_ATTRIBUTES_FROM_GEOSERVER,
  RECEIVE_ATTRIBUTES_FROM_GEOSERVER_SUCCESS,
  RECEIVE_ATTRIBUTES_FROM_GEOSERVER_ERROR,
  DESELECT_PARCEL
} from "../constants/ActionTypes";
import { theStore } from "../store/Store";

import { getParcelAttributes } from "../tools/wfs";

import { changeView, showSnackBar } from "./UiActions";

export const getAttributesFromGeoserverAction = parcelId => ({
  type: GET_ATTRIBUTES_FROM_GEOSERVER,
  parcelId: parcelId
});

export const receiveAttributesFromGeoserverSuccessAction = (
  parcelId,
  data
) => ({
  type: RECEIVE_ATTRIBUTES_FROM_GEOSERVER_SUCCESS,
  parcelId: parcelId,
  data: data
});

export const receiveAttributesFromGeoserverErrorAction = (parcelId, error) => ({
  type: RECEIVE_ATTRIBUTES_FROM_GEOSERVER_ERROR,
  parcelId,
  error
});

export function deselectParcel(dispatch) {
  dispatch({ type: DESELECT_PARCEL });
}

function handleInvalidDataFormatError(
  dispatch,
  placeName,
  parcelId,
  parcelGeoserverId
) {
  console.error(`Returned geoserver data for parcel with hydracoreID=${parcelId}
    / GeoserverID=${parcelGeoserverId} is not in correct format`);
  dispatch(
    receiveAttributesFromGeoserverErrorAction(parcelId, "Invalid data format")
  );
  showSnackBarParcelReceiveError(dispatch, placeName);
}

function handleGeoserverError(
  dispatch,
  placeName,
  parcelId,
  parcelGeoserverId,
  errorMsg
) {
  console.error(`"Error while fetching parcel with hydracoreID="${parcelId} /
    GeoserverID=${parcelGeoserverId}: ${errorMsg}`);
  dispatch(receiveAttributesFromGeoserverErrorAction(parcelId, errorMsg));
  showSnackBarParcelReceiveError(dispatch, placeName);
}

function showSnackBarParcelReceiveError(dispatch, placeName) {
  const subMessage = i18next.t("No details found for");
  const options = {
    isError: true,
    message: i18next.t("There was an error while fetching the parcel details."),
    subMessage: `${subMessage} placeName`
  };
  showSnackBar(dispatch, options);
}

export function selectPreviousParcel(dispatch) {
  const state = theStore.getState();
  const oldJsId = state.search.results.indexOf(state.ui.selectedParcel);
  const newJsId = oldJsId === 0 ? state.search.results.length - 1 : oldJsId - 1;
  const newParcelId = state.search.results[newJsId];
  getAttributesFromGeoserver(dispatch, newParcelId);
  state.ui.selectedParcel = newParcelId;
}

export function selectNextParcel(dispatch) {
  const state = theStore.getState();
  const oldJsId = state.search.results.indexOf(state.ui.selectedParcel);
  const newJsId = oldJsId === state.search.results.length - 1 ? 0 : oldJsId + 1;
  const newParcelId = state.search.results[newJsId];
  getAttributesFromGeoserver(dispatch, newParcelId);
  state.ui.selectedParcel = newParcelId;
}

export function getAttributesFromGeoserver(dispatch, parcelId) {
  const state = theStore.getState();
  const currentData = state.parcels[parcelId];
  if (
    !currentData ||
    !currentData.parcelGeoserverId ||
    currentData.isFetchingGeoserver
  ) {
    // We can't find the Geoserver featureID//already busy
    return;
  }

  const parcelGeoserverId = currentData.parcelGeoserverId;

  dispatch(getAttributesFromGeoserverAction(parcelId));

  getParcelAttributes(parcelGeoserverId).then(
    data => {
      if (
        data &&
        data.features &&
        data.features.length &&
        data.features[0].properties
      ) {
        dispatch(
          receiveAttributesFromGeoserverSuccessAction(
            parcelId,
            data.features[0].properties
          )
        );
        if (state.ui.currentView !== "DetailView") {
          changeView(dispatch, "DetailView");
        }
      } else {
        handleInvalidDataFormatError(
          dispatch,
          currentData.name,
          parcelId,
          parcelGeoserverId
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
