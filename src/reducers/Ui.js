import * as ActionTypes from "../constants/ActionTypes";
import { initialUiState } from "../store/Store";

export default function(state = initialUiState, action) {
  switch (action.type) {
    case ActionTypes.SHOW_SNACKBAR:
      return { ...state, showSnackBar: true, snackBarOptions: action.options };
    case ActionTypes.HIDE_SNACKBAR:
      return { ...state, showSnackBar: false, snackBarOptions: {} };
    case ActionTypes.GET_ATTRIBUTES_FROM_GEOSERVER:
      return { ...state, selectedParcel: action.parcelId };
    case ActionTypes.CHANGE_VIEW:
      return { ...state, currentView: action.newView };
    default:
      return state;
  }
}
