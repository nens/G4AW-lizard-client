import {
  SHOW_SNACKBAR,
  GET_ATTRIBUTES_FROM_GEOSERVER,
  RECEIVE_ATTRIBUTES_FROM_GEOSERVER_SUCCESS,
  RECEIVE_ATTRIBUTES_FROM_GEOSERVER_ERROR
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

function handleInvalidDataFormatError(
  dispatch,
  placeName,
  parcelId,
  parcelGeoserverId
) {
  const msg =
    "Returned geoserver data for parcel with hydracoreID=" +
    parcelId +
    " / GeoserverID=" +
    parcelGeoserverId +
    " is not in correct format";
  console.error(msg);
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
  const msg =
    "Error while fetching parcel with hydracoreID=" +
    parcelId +
    " / GeoserverID=" +
    parcelGeoserverId +
    ": " +
    errorMsg;
  console.error(msg);
  dispatch(receiveAttributesFromGeoserverErrorAction(parcelId, errorMsg));
  showSnackBarParcelReceiveError(dispatch, placeName);
}

function showSnackBarParcelReceiveError(dispatch, placeName) {
  const options = {
    isError: true,
    message: "There was an error while fetching the parcel details.",
    subMessage: "No details found for " + placeName
  };
  showSnackBar(dispatch, options);
}

export function getAttributesFromGeoserver(dispatch, parcelId) {
  const currentData = theStore.getState().parcels[parcelId];
  if (!currentData || !currentData.parcelGeoserverId) {
    // We can't find the Geoserver featureID
    return;
  }

  if (currentData.isFetchingGeoserver) {
    // Already busy
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
        changeView(dispatch, "DetailView");
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
