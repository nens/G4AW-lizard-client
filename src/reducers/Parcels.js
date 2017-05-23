import * as ActionTypes from "../constants/ActionTypes";

import omit from "lodash/omit";

// These are the fields currently returned, 20170517
const GEOSERVER_ATTRIBUTES = [
  "IncomeTota",
  "LocTroi",
  "ProfitTota",
  "3CForce",
  "LaborSelf",
  "WaterSourc",
  "Farmer",
  "IncomeHa",
  "LaborHired",
  "Method",
  "SowingDay",
  "YieldWet",
  "Price",
  "Variety",
  "FarmerAdr",
  "Phone",
  "InputHa",
  "InputTotal",
  "FieldAdr",
  "HarvestDay",
  "ProfitHa",
  "RiceCost",
  "Pesticide",
  "MoistPerc",
  "Fertiliser",
  "Irrigation",
  "FarmID",
  "YieldDry",
  "Hectare",
  "Season"
];

export default function(state, action) {
  let newState;
  let newParcels;

  switch (action.type) {
    case ActionTypes.GET_ATTRIBUTES_FROM_GEOSERVER:
      newState = { ...state };
      newParcels = { ...newState.parcels };

      // parcelId must already exist
      newParcel = { ...newParcels[action.parcelId] };
      newParcel.isFetchingGeoserver = true;

      newParcels[action.parcelId] = newParcel;
      newState.parcels = newParcels;
      return newState;

    case ActionTypes.RECEIVE_ATTRIBUTES_FROM_GEOSERVER:
      newState = { ...state };
      newParcels = { ...newState.parcels };

      // parcelId must already exist
      newParcel = { ...newParcels[action.parcelId] };
      newParcel.isFetchingGeoserver = false;

      for (let attribute in GEOSERVER_ATTRIBUTES) {
        const value = action.data[attribute];

        if (!value) {
          // Empty string or missing
          newParcel[attribute] = null;
        } else {
          newParcel[attribute] = value;
        }
      }

      newParcels[action.parcelId] = newParcel;
      newState.parcels = newParcels;
      return newState;
    default:
      return state;
  }
}
