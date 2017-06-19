import {
  CLEAR_SEARCH_RESULTS,
  RECEIVE_SEARCH_RESULTS,
  SET_SEARCH_INPUT_TEXT,
  START_SEARCH
} from "../constants/ActionTypes";
import { theStore } from "../store/Store";

import { search } from "lizard-api-client";
import { getParcelsByName } from "lizard-api-client";

export const startSearch = () => ({
  type: START_SEARCH
});

export const receiveResults = results => ({
  type: RECEIVE_SEARCH_RESULTS,
  results
});

export const clearResults = () => ({
  type: CLEAR_SEARCH_RESULTS
});

export const setSearchInputText = inputText => ({
  type: SET_SEARCH_INPUT_TEXT,
  inputText: inputText
});

function doSearch(dispatch, q, types = null, exclude = []) {
  const currentData = theStore.getState().search;

  if (currentData && currentData.isFetching) {
    // Do nothing.
    return;
  }

  dispatch(startSearch());
  getParcelsByName(q).then(results => dispatch(receiveResults(results)));
}

export { doSearch };
