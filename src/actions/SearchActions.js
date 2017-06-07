import {
  START_SEARCH,
  RECEIVE_SEARCH_RESULTS,
  CLEAR_SEARCH_RESULTS
} from "../constants/ActionTypes";
import { theStore } from "../store/Store";

import { getParcelsByName } from "lizard-api-client";

export const startSearch = () => ({
  type: START_SEARCH
});

export const receiveResults = results => ({
  type: RECEIVE_SEARCH_RESULTS,
  results: results
});

export const clearResults = () => ({
  type: CLEAR_SEARCH_RESULTS
});

export function doSearch(dispatch, q) {
  const currentData = theStore.getState().search;

  if (currentData && currentData.isFetching) {
    // Do nothing.
    return;
  }

  dispatch(startSearch());

  getParcelsByName(q).then(results => dispatch(receiveResults(results)));
}
