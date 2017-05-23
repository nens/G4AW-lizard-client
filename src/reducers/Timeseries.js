import * as ActionTypes from "../constants/ActionTypes";

import omit from "lodash/omit";

let defaultState = {};

export default function(state = defaultState, action) {
  let newState = { ...state };
  let newTimeseries;

  switch (action.type) {
    case ActionTypes.FETCH_TIMESERIES:
      if (action.parcelId in newState) {
        newTimeseries = { ...newState[action.parcelId] };
      } else {
        newTimeseries = {
          isFetching: true,
          data: null,
          error: null
        };
      }
      newState[action.parcelId] = newTimeseries;
      return newState;
    case ActionTypes.RECEIVE_TIMESERIES:
      newTimeseries = { ...newState[action.parcelId] };
      newTimeseries.isFetching = false;
      if (action.data === null) {
        newTimeseries.data = null;
        newTimeseries.error = "Error while fetching timeseries!";
      } else {
        newTimeseries.data = action.data;
        newTimeseries.error = null;
      }
      newState[action.parcelId] = newTimeseries;
      return newState;
    case ActionTypes.REMOVE_TIMESERIES:
      return omit(newState, action.parcelId);
    default:
      return state;
  }
}
