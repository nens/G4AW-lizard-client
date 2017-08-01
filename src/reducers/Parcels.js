import * as ActionTypes from "../constants/ActionTypes";
import { initialParcelsState } from "../store/Store";

import omit from "lodash/omit";

import { SECTIONS } from "../constants/detailview-attributes";

const allGeoserverAttributes = [];

for (const key in SECTIONS) {
  SECTIONS[key].sectionAttrs.forEach(sectionAttr => {
    allGeoserverAttributes.push(sectionAttr.attr);
  });
}

// console.log("allGeoserverAttributes:", allGeoserverAttributes);

const initialParcel = {
  parcelGeoserverId: null,
  isFetchingLizard: false,
  isFetchingGeoserver: false,
  errorsLizard: null,
  errorsGeoserver: null,
  hasLizardData: false,
  hasGeoserverData: false
};

export default function(state = initialParcelsState, action) {
  const newParcels = { ...state };
  let newParcel;

  switch (action.type) {
    case ActionTypes.GET_ATTRIBUTES_FROM_GEOSERVER:
      if (newParcels[action.parcelId]) {
        newParcel = { ...newParcels[action.parcelId] };
      } else {
        newParcel = { ...initialParcel };
      }
      newParcel.isFetchingGeoserver = true;
      newParcels[action.parcelId] = newParcel;

      return newParcels;

    case ActionTypes.RECEIVE_ATTRIBUTES_FROM_GEOSERVER_SUCCESS:
      // parcelId must already exist, otherwise the request to geoserver
      // couldn't have been made.
      newParcel = {
        ...newParcels[action.parcelId],
        isFetchingGeoserver: false,
        hasGeoserverData: true
      };

      allGeoserverAttributes.forEach(attribute => {
        newParcel[attribute] = action.data[attribute] || null;
      });

      newParcels[action.parcelId] = newParcel;
      return newParcels;

    case ActionTypes.RECEIVE_ATTRIBUTES_FROM_GEOSERVER_ERROR:
      // parcelId must already exist, otherwise the request to geoserver
      // couldn't have been made.
      newParcel = {
        ...newParcels[action.parcelId],
        isFetchingGeoserver: false,
        hasGeoserverData: false,
        errorsGeoserver: action.error
      };

      newParcels[action.parcelId] = newParcel;
      return newParcels;

    case ActionTypes.RECEIVE_SEARCH_RESULTS_SUCCESS:
      // For each search recult, if it's not in parcels yet, also
      // create a parcel.

      action.results.forEach(result => {
        if (!newParcels.hasOwnProperty(result.id)) {
          newParcel = { ...initialParcel };
        } else {
          newParcel = { ...newParcels[result.id] };
        }

        newParcel.parcelGeoserverId = result.external_id;
        newParcel.name = result.name;
        newParcel.geometry = result.geometry;
        newParcel.hasLizardData = true;

        newParcels[result.id] = newParcel;
      });

      return newParcels;
    default:
      return state;
  }
}
