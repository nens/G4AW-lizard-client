import * as ActionTypes from "../constants/ActionTypes";
import { initialGeolocationState } from "../store/Store";

export default function(state = initialGeolocationState, action) {
  switch (action.type) {
    case ActionTypes.START_GEOLOCATION:
      return {
        isFetching: true,
        result: null
      };
    case ActionTypes.RECEIVE_GEOLOCATION:
      return {
        isFetching: false,
        result: action.result
      };
    case ActionTypes.CLEAR_GEOLOCATION:
      return {
        isFetching: false,
        results: null
      };
    default:
      return state;
  }
}
