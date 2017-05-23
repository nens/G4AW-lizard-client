import {
  FETCH_TIMESERIES,
  RECEIVE_TIMESERIES,
  REMOVE_TIMESERIES
} from "../constants/ActionTypes";
import { theStore } from "../store/Store";
import { getTimeseries as getTimeseriesLAC } from "lizard-api-client";

export const fetchTimeseries = parcelId => {
  return {
    type: FETCH_TIMESERIES,
    parcelId
  };
};

const receiveTimeseries = (parcelId, data) => {
  return {
    type: RECEIVE_TIMESERIES,
    parcelId,
    data
  };
};

export const removeTimeseries = parcelId => {
  return {
    type: REMOVE_TIMESERIES,
    parcelId
  };
};

export function getTimeseries(parcelId, dispatch) {
  const currentData = theStore.getState().timeseries[parcelId];

  if (currentData) {
    if (currentData.data) {
      // Already present.
      return true;
    }
    if (currentData.isFetching || currentData.error) {
      // It's not there, but we're not going to do anything either.
      return false;
    }
  }

  // We need to go fetch it.

  // Set isFetching to true.
  dispatch(fetchTimeseries(parcelId));
  getTimeseriesLAC(parcelId).then(data => {
    dispatch(receiveTimeseries(parcelId, data));
  });

  return false; // No data present yet.
}
