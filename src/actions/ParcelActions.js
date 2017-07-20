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

function selectParcel(dispatch, selectedParcel) {
  dispatch({ type: SELECT_PARCEL, selectedParcel });
}

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

function selectParcelAndGoToDetailView(dispatch, parcelId) {
  selectParcel(dispatch, parcelId);
  if (theStore.getState().ui.currentView !== "DetailView") {
    changeView(dispatch, "DetailView");
  }
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

  selectParcelAndGoToDetailView(dispatch, parcelId);

  if (isParcelAlreadyPresent(parcelId)) {
    // No need to retrieve data that is already present in client!
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
        // selectParcel(dispatch, parcelId);
        // if (state.ui.currentView !== "DetailView") {
        //   changeView(dispatch, "DetailView");
        // }
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

// export function getParcelByLatLng(dispatch, lat, lng) {
//   getParcels({
//     dist: 5, // 5 meter search radius
//     point: `${lng},${lat}`
//   }).then(
//     results => {
//       if (results.length > 0) {
//         dispatch(receiveResultsSuccess(results));
//         (dispatch, parcelId)
//         getAttributesFromGeoserver(dispatch, results[0].id);
//       }
//     },
//     error => {
//       const place = t("parcel at ") + `${lat},${lng}`;
//       showSnackBarParcelReceiveError(dispatch, place);
//     }
//   );
// }
