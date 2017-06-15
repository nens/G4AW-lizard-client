import * as ActionTypes from "../constants/ActionTypes";
import { initialSessionState } from "../store/Store";

export default function(state = initialSessionState, action) {
  console.log("Action:", action);
  switch (action.type) {
    case ActionTypes.FETCH_BOOTSTRAP:
      return {
        isFetching: true,
        hasBootstrap: state.hasBootstrap,
        bootstrap: state.bootstrap
      };
    case ActionTypes.RECEIVE_BOOTSTRAP:
      return {
        isFetching: false,
        hasBootstrap: true,
        bootstrap: action.bootstrap
      };
    default:
      return state;
  }
}
