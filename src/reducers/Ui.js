import * as ActionTypes from "../constants/ActionTypes";
import { initialUiState } from "../store/Store";

export default function(state = initialUiState, action) {
  console.log("[F] UiReducer");
  switch (action.type) {
    case ActionTypes.CHANGE_VIEW:
      console.log(
        "[dbg] UiReducer => case ActionTypes.CHANGE_VIEW; action =",
        action
      );
      let newState = { ...state };
      return newState;
    default:
      console.log("[dbg] UiReducer => case default");
      return state;
  }
}
