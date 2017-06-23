import * as ActionTypes from "../constants/ActionTypes";
import { initialGeolocationState } from "../store/Store";

export default function(state = initialGeolocationState, action) {
  switch (action.type) {
    case ActionTypes.SET_GEOLOCATION_AVAILABILITY:
      return { ...state, isGeolocationAvailable: action.value };
    case ActionTypes.START_GEOLOCATION:
      return { ...state, isFetching: true, data: null, error: null };
    case ActionTypes.RECEIVE_GEOLOCATION:
      return { ...state, isFetching: false, data: action.result, error: null };
    case ActionTypes.CLEAR_GEOLOCATION:
      return {
        ...initialGeolocationState,
        isGeolocationAvailable: state.isGeolocationAvailable
      };
    default:
      return state;
  }
}
