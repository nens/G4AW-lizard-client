import * as ActionTypes from "../constants/ActionTypes";
import { initialSearchState } from "../store/Store";

export default function(state = initialSearchState, action) {
  switch (action.type) {
    case ActionTypes.SET_SEARCH_INPUT_TEXT:
      return Object.assign({}, state, {
        inputText: action.inputText
      });
    case ActionTypes.START_SEARCH:
      return Object.assign({}, state, {
        isFetching: true,
        results: null
      });
    case ActionTypes.RECEIVE_SEARCH_RESULTS:
      // Additionally, in the parcels reducer a parcel is created for each result
      // that doesn't have one yet.
      return Object.assign({}, state, {
        isFetching: false,
        results: action.results.map(result => result.id)
      });
    case ActionTypes.CLEAR_SEARCH_RESULTS:
      return Object.assign({}, state, {
        isFetching: false,
        results: null,
        inputText: ""
      });
    default:
      return state;
  }
}
