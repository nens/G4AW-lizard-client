import {
  GET_ATTRIBUTES_FROM_GEOSERVER,
  RECEIVE_ATTRIBUTES_FROM_GEOSERVER
} from "../constants/ActionTypes";
import { theStore } from "../store/Store";

import { getParcelAttributes } from "../tools/wfs";

export const getAttributesFromGeoserverAction = parcelId => ({
  type: GET_ATTRIBUTES_FROM_GEOSERVER,
  parcelId: parcelId
});

export const receiveAttributesFromGeoserverAction = (parcelId, data) => ({
  type: RECEIVE_ATTRIBUTES_FROM_GEOSERVER,
  parcelId: parcelId,
  data: data
});

export function getAttributesFromGeoserver(dispatch, parcelId) {
  console.log("[F] getAttributesFromGeoserver");
  const currentData = theStore.getState().parcels[parcelId];
  console.log("*** currentData =", currentData);

  if (!currentData || !currentData.parcelGeoserverId) {
    console.log("*** ...returning early!");
    // We can't find the Geoserver featureID
    return;
  }

  if (currentData.isFetchingGeoserver) {
    // Already busy
    return;
  }

  const parcelGeoserverId = currentData.parcelGeoserverId;

  dispatch(getAttributesFromGeoserverAction(parcelId));

  getParcelAttributes(parcelGeoserverId).then(data => {
    if (
      data &&
      data.features &&
      data.features.length &&
      data.features[0].properties
    ) {
      dispatch(
        receiveAttributesFromGeoserverAction(
          parcelId,
          data.features[0].properties
        )
      );
    }
  });
}
