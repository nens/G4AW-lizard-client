import * as ActionTypes from "../constants/ActionTypes";
import { initialSessionState } from "../store/Store";

export default function(state = initialSessionState, action) {
  switch (action.type) {
    case ActionTypes.FETCH_BOOTSTRAP:
      return {
        isFetching: true,
        hasBootstrap: state.hasBootstrap,
        bootstrap: state.bootstrap,
        error: null,
        isOnline: state.isOnline
      };
    case ActionTypes.RECEIVE_BOOTSTRAP_SUCCESS:
      return {
        isFetching: false,
        hasBootstrap: true,
        bootstrap: action.bootstrap,
        error: null,
        isOnline: state.isOnline
      };
    case ActionTypes.RECEIVE_BOOTSTRAP_ERROR:
      return {
        isFetching: false,
        hasBootstrap: false,
        bootstrap: null,
        error: action.error,
        isOnline: state.isOnline
      };
    case ActionTypes.SET_INTERNET_AVAILABILITY:
      return { ...state, isOnline: action.isOnline };
    default:
      return state;
  }
}
