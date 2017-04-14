import * as ActionTypes from '../constants/ActionTypes';

const defaultState = {};

export default function (state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.START_SEARCH:
      return {
        isFetching: true,
        results: null
      };
    case ActionTypes.RECEIVE_SEARCH_RESULTS:
      return {
        isFetching: false,
        results: action.results
      };
    case ActionTypes.CLEAR_SEARCH_RESULTS:
      return {
        isFetching: false,
        results: null
      };
    default:
      return state;
  }
}
