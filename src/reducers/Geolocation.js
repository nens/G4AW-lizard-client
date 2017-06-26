import * as ActionTypes from "../constants/ActionTypes";
import { initialGeolocationState } from "../store/Store";

export default function(state = initialGeolocationState, action) {
  switch (action.type) {
    case ActionTypes.SET_GEOLOCATION_SUPPORT:
      return { ...state, isGeolocationSupported: action.value };
    case ActionTypes.START_GEOLOCATION:
      return { ...state, isFetching: true, data: null, error: null };
    case ActionTypes.RECEIVE_GEOLOCATION_SUCCESS:
      return { ...state, isFetching: false, data: action.result, error: null };
    case ActionTypes.RECEIVE_GEOLOCATION_ERROR:
      return { ...state, isFetching: false, data: null, error: action.error };
    case ActionTypes.CLEAR_GEOLOCATION:
      return {
        ...initialGeolocationState,
        isGeolocationSupported: state.isGeolocationSupported
      };
    default:
      return state;
  }
}
