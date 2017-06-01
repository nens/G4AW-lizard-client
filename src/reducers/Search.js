import * as ActionTypes from "../constants/ActionTypes";
import { initialSearchState } from "../store/Store";

export default function(state = initialSearchState, action) {
  switch (action.type) {
    case ActionTypes.START_SEARCH:
      return {
        isFetching: true,
        results: null
      };
    case ActionTypes.RECEIVE_SEARCH_RESULTS:
      // Additionally, in the parcels reducer a parcel is created for each result
      // that doesn't have one yet.
      return {
        isFetching: false,
        results: action.results.map(result => result.id)
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
