import { START_SEARCH, RECEIVE_SEARCH_RESULTS, CLEAR_SEARCH_RESULTS }
  from '../constants/ActionTypes';
import { theStore } from '../store/configureStore';

import { search } from 'lizard-api-client';

export const startSearch = () => ({
  type: START_SEARCH
});

export const receiveResults = (results) => ({
  type: RECEIVE_SEARCH_RESULTS,
  results: results
});

export const clearResults = () => ({
  type: CLEAR_SEARCH_RESULTS
});

export function doSearch(dispatch, q, types = null, exclude = []) {
  const currentData = theStore.getState().search;

  if (currentData && currentData.isFetching) {
    // Do nothing.
    return;
  }

  dispatch(startSearch());

  search(q, types, exclude).then(
    results => dispatch(receiveResults(results)));
}
