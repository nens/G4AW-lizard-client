import * as ActionTypes from "../constants/ActionTypes";
import { initialUiState } from "../store/Store";

export default function(state = initialUiState, action) {
  switch (action.type) {
    case ActionTypes.CHANGE_VIEW:
      return { ...state, currentView: action.newView };
    default:
      return state;
  }
}
